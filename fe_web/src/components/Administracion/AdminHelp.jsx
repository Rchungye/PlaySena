import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Header from '../Header'; // Import Header component
import { obtenerAyuda, actualizarAyuda, eliminarAyuda } from '../../services/Ayuda'; // Actualiza la ruta según tu estructura

const AdminHelp = () => {
  const [ayudas, setAyudas] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAyuda, setCurrentAyuda] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  // Fetch ayudas data on component mount
  useEffect(() => {
    const fetchAyudas = async () => {
      try {
        const data = await obtenerAyuda();
        setAyudas(data);
      } catch (error) {
        console.error('Error fetching ayudas:', error);
      }
    };

    fetchAyudas();
  }, []);

  const handleOpenDialog = (ayuda = null) => {
    if (ayuda) {
      setEditMode(true);
      setCurrentAyuda(ayuda);
      setFormData({
        nombre: ayuda.nombre,
        descripcion: ayuda.descripcion
      });
    } else {
      setEditMode(false);
      setCurrentAyuda(null);
      setFormData({
        nombre: '',
        descripcion: ''
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
    try {
      if (editMode) {
        const result = await actualizarAyuda({ id: currentAyuda.id, ...formData });
        if (result) {
          const updatedAyudas = ayudas.map((a) => (a.id === currentAyuda.id ? { ...currentAyuda, ...formData } : a));
          setAyudas(updatedAyudas);
        }
      } else {
        const newAyuda = { id: ayudas.length + 1, ...formData };
        setAyudas([...ayudas, newAyuda]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving ayuda:', error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Eliminar Ayuda',
      text: `¿Está seguro que desea eliminar la ayuda #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarAyuda(id);
          setAyudas(ayudas.filter((a) => a.id !== id));
        } catch (error) {
          console.error('Error deleting ayuda:', error);
        }
      }
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
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
    <div className="admin-help-container">
      <Header />
      <div className="admin-help-content">
        <div className="admin-help-button-wrapper">
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Añadir Ayuda</Button>
        </div>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={ayudas} columns={columns} pageSize={10} />
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Ayuda' : 'Añadir Ayuda'}</DialogTitle>
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
    </div>
  );
};

export default AdminHelp;
