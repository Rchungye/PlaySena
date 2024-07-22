import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Header from '../Header'; // Import Header component

const AdminHelp = () => {
  const [ayudas, setAyudas] = useState([
    { id: 1, nombre: 'Ayuda 1', descripcion: 'Descripción de la Ayuda 1' },
    { id: 2, nombre: 'Ayuda 2', descripcion: 'Descripción de la Ayuda 2' },
    // Añadir más ayudas según sea necesario
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAyuda, setCurrentAyuda] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

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

  const handleSave = () => {
    if (editMode) {
      const updatedAyudas = ayudas.map((a) => (a.id === currentAyuda.id ? { ...currentAyuda, ...formData } : a));
      setAyudas(updatedAyudas);
    } else {
      const newAyuda = { id: ayudas.length + 1, ...formData };
      setAyudas([...ayudas, newAyuda]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar Ayuda',
      text: `¿Está seguro que desea eliminar la ayuda #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        setAyudas(ayudas.filter((a) => a.id !== id));
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
