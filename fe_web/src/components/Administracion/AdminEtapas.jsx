import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import Header from '../Header'; // Import Header component

const AdminEtapas = () => {
  const [etapas, setEtapas] = useState([
    { id: 1, nombre: 'Etapa 1', descripcion: 'Descripción de la Etapa 1', imagen: 'https://example.com/etapa1.jpg' },
    { id: 2, nombre: 'Etapa 2', descripcion: 'Descripción de la Etapa 2', imagen: 'https://example.com/etapa2.jpg' },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEtapa, setCurrentEtapa] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: ''
  });

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState('');

  const handleOpenDialog = (etapa = null) => {
    if (etapa) {
      setEditMode(true);
      setCurrentEtapa(etapa);
      setFormData({
        nombre: etapa.nombre,
        descripcion: etapa.descripcion,
        imagen: etapa.imagen
      });
    } else {
      setEditMode(false);
      setCurrentEtapa(null);
      setFormData({
        nombre: '',
        descripcion: '',
        imagen: ''
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

  const handleSave = () => {
    if (editMode) {
      const updatedEtapas = etapas.map((e) => (e.id === currentEtapa.id ? { ...currentEtapa, ...formData } : e));
      setEtapas(updatedEtapas);
    } else {
      const newEtapa = { id: etapas.length + 1, ...formData };
      setEtapas([...etapas, newEtapa]);
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
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEtapas = etapas.filter((e) => e.id !== id);
        setEtapas(updatedEtapas);
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
      field: 'imagen',
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
            name="imagen"
            value={formData.imagen}
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
