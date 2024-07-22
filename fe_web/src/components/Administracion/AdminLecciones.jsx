import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Header from '../Header'; // Import Header component

const AdminLecciones = () => {
  const [lecciones, setLecciones] = useState([
    { id: 1, nombre: 'Lección 1', descripcion: 'Descripción de la Lección 1', nivel: 'Nivel 1', video: 'https://example.com/video1.mp4' },
    { id: 2, nombre: 'Lección 2', descripcion: 'Descripción de la Lección 2', nivel: 'Nivel 2', video: 'https://example.com/video2.mp4' },
    // Añadir más lecciones según sea necesario
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLeccion, setCurrentLeccion] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    nivel: '',
    video: ''
  });

  const handleOpenDialog = (leccion = null) => {
    if (leccion) {
      setEditMode(true);
      setCurrentLeccion(leccion);
      setFormData({
        nombre: leccion.nombre,
        descripcion: leccion.descripcion,
        nivel: leccion.nivel,
        video: leccion.video
      });
    } else {
      setEditMode(false);
      setCurrentLeccion(null);
      setFormData({
        nombre: '',
        descripcion: '',
        nivel: '',
        video: ''
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
      const updatedLecciones = lecciones.map((l) => (l.id === currentLeccion.id ? { ...currentLeccion, ...formData } : l));
      setLecciones(updatedLecciones);
    } else {
      const newLeccion = { id: lecciones.length + 1, ...formData };
      setLecciones([...lecciones, newLeccion]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar Lección',
      text: `¿Está seguro que desea eliminar la lección #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        setLecciones(lecciones.filter((l) => l.id !== id));
      }
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'nivel', headerName: 'Nivel', width: 150 },
    { field: 'video', headerName: 'Video', width: 200, renderCell: (params) => <a href={params.value} target="_blank" rel="noopener noreferrer">Ver Video</a> },
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
    <div className="admin-lecciones-container">
      <Header />
      <div className="admin-lecciones-content">
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Añadir Lección</Button>
        <div style={{ height: 600, width: '100%', marginTop: '20px' }}>
          <DataGrid rows={lecciones} columns={columns} pageSize={10} />
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Lección' : 'Añadir Lección'}</DialogTitle>
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
            label="Nivel"
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Video"
            name="video"
            value={formData.video}
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

export default AdminLecciones;
