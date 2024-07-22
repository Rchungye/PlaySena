import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Header from '../Header'; // Import Header component

const AdminNiveles = () => {
  const [niveles, setNiveles] = useState([
    { id: 1, nombre: 'Nivel 1', descripcion: 'Descripción del Nivel 1', etapa: 'Etapa 1', experiencia: 100 },
    { id: 2, nombre: 'Nivel 2', descripcion: 'Descripción del Nivel 2', etapa: 'Etapa 2', experiencia: 200 },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNivel, setCurrentNivel] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    etapa: '',
    experiencia: ''
  });

  const handleOpenDialog = (nivel = null) => {
    if (nivel) {
      setEditMode(true);
      setCurrentNivel(nivel);
      setFormData({
        nombre: nivel.nombre,
        descripcion: nivel.descripcion,
        etapa: nivel.etapa,
        experiencia: nivel.experiencia
      });
    } else {
      setEditMode(false);
      setCurrentNivel(null);
      setFormData({
        nombre: '',
        descripcion: '',
        etapa: '',
        experiencia: ''
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
      const updatedNiveles = niveles.map((n) => (n.id === currentNivel.id ? { ...currentNivel, ...formData } : n));
      setNiveles(updatedNiveles);
    } else {
      const newNivel = { id: niveles.length + 1, ...formData };
      setNiveles([...niveles, newNivel]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar Nivel',
      text: `¿Está seguro que desea eliminar el nivel #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        setNiveles(niveles.filter((n) => n.id !== id));
      }
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'etapa', headerName: 'Etapa', width: 150 },
    { field: 'experiencia', headerName: 'Experiencia', width: 150 },
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
    <div className="admin-niveles-container">
      <Header />
      <div className="admin-niveles-content">
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Añadir Nivel</Button>
        <div style={{ height: 600, width: '80%', marginTop: '20px' }}>
          <DataGrid rows={niveles} columns={columns} pageSize={10} />
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Nivel' : 'Añadir Nivel'}</DialogTitle>
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
            label="Etapa"
            name="etapa"
            value={formData.etapa}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Experiencia"
            name="experiencia"
            value={formData.experiencia}
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

export default AdminNiveles;
