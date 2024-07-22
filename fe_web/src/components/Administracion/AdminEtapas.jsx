import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import Header from '../Header'; // Import Header component
import { obtenerEtapas } from '../../services/Juego';
import { registrarEtapa, obtenerEtapa, actualizarEtapa, eliminarEtapa } from '../../services/Etapas'; // Importar las API

const AdminEtapas = () => {
  const [etapas, setEtapas] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEtapa, setCurrentEtapa] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    image_url: ''
  });

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState('');

  // Función para obtener todas las etapas del backend
  const fetchEtapas = async () => {
    const response = await obtenerEtapas();
    if (response.status === 200) {
      setEtapas(response.data);
    } else {
      console.error('Error fetching etapas:', response.data);
    }
  };

  useEffect(() => {
    fetchEtapas();
  }, []);

  const handleOpenDialog = (etapa = null) => {
    if (etapa) {
      setEditMode(true);
      setCurrentEtapa(etapa);
      setFormData({
        nombre: etapa.nombre,
        descripcion: etapa.descripcion,
        image_url: etapa.image_url
      });
    } else {
      setEditMode(false);
      setCurrentEtapa(null);
      setFormData({
        nombre: '',
        descripcion: '',
        image_url: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (editMode) {
      const updatedEtapa = { id: currentEtapa.id, ...formData };
      const response = await actualizarEtapa(updatedEtapa);
      if (response.status === 200) {
        fetchEtapas(); // Refrescar la lista de etapas después de la actualización
      } else {
        console.error('Error updating etapa:', response.data);
      }
    } else {
      const { nombre, descripcion } = formData;
      const response = await registrarEtapa(nombre, descripcion);
      if (response.status === 201) {
        fetchEtapas(); // Refrescar la lista de etapas después de la creación
      } else {
        console.error('Error creating etapa:', response.data);
      }
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar Etapa',
      text: `¿Está seguro que desea eliminar la etapa #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await eliminarEtapa(id);
        if (response.status === 200) {
          fetchEtapas(); // Refrescar la lista de etapas después de la eliminación
        } else {
          console.error('Error deleting etapa:', response.data);
        }
      }
    });
  };

  const handleImageClick = (image) => {
    setImageToShow(image);
    setImageModalOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    {
      field: 'image_url',
      headerName: 'Imagen',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleImageClick(params.value)}>
          <VisibilityIcon />
        </IconButton>
      )
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleOpenDialog(params.row)}><EditIcon /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}><DeleteIcon /></IconButton>
        </div>
      )
    }
  ];

  return (
    <div className="admin-etapas-container">
      <Header />
      <div className="admin-etapas-content">
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Añadir Etapa</Button>
        <div style={{ height: 600, width: '100%', marginTop: '20px' }}>
          <DataGrid rows={etapas} columns={columns} pageSize={10} />
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Etapa' : 'Añadir Etapa'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Imagen"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            {editMode ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={imageModalOpen} onClose={() => setImageModalOpen(false)}>
        <DialogTitle>Imagen</DialogTitle>
        <DialogContent>
          <img src={imageToShow} alt="Imagen" style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminEtapas;
