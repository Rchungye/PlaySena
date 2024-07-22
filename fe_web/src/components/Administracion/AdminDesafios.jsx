import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icono para ver la imagen
import Swal from 'sweetalert2';

const AdminDesafios = () => {
  const [desafios, setDesafios] = useState([
    { id: 1, nombre: 'Desafío 1', descripcion: 'Descripción del desafío 1', imagen: 'https://example.com/desafio1.jpg', tipo: 1 },
    { id: 2, nombre: 'Desafío 2', descripcion: 'Descripción del desafío 2', imagen: 'https://example.com/desafio2.jpg', tipo: 2 },
    // Añadir más desafíos según sea necesario
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDesafio, setCurrentDesafio] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    tipo: 1 // Valor por defecto
  });

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState('');

  const handleOpenDialog = (desafio = null) => {
    if (desafio) {
      setEditMode(true);
      setCurrentDesafio(desafio);
      setFormData({
        nombre: desafio.nombre,
        descripcion: desafio.descripcion,
        imagen: desafio.imagen,
        tipo: desafio.tipo
      });
    } else {
      setEditMode(false);
      setCurrentDesafio(null);
      setFormData({
        nombre: '',
        descripcion: '',
        imagen: '',
        tipo: 1 // Valor por defecto
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setImageModalOpen(false); // Cierra el modal de imagen al cerrar el diálogo
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
      const updatedDesafios = desafios.map((d) => (d.id === currentDesafio.id ? { ...currentDesafio, ...formData } : d));
      setDesafios(updatedDesafios);
    } else {
      const newDesafio = { id: desafios.length + 1, ...formData };
      setDesafios([...desafios, newDesafio]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar Desafío',
      text: `¿Está seguro que desea eliminar el desafío #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedDesafios = desafios.filter((d) => d.id !== id);
        setDesafios(updatedDesafios);
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
    { field: 'descripcion', headerName: 'Descripción', width: 300 },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 150,
      renderCell: (params) => (
        <span>{params.value === 1 ? 'Cierto/Falso' : 'Escoger Mejor Respuesta'}</span>
      )
    },
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
    <div>
      <h1>Administrar Desafíos</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Añadir Desafío</Button>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={desafios} columns={columns} pageSize={10} />
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Desafío' : 'Añadir Desafío'}</DialogTitle>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Tipo</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              label="Tipo"
            >
              <MenuItem value={1}>Cierto/Falso</MenuItem>
              <MenuItem value={2}>Escoger Mejor Respuesta</MenuItem>
            </Select>
          </FormControl>
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

export default AdminDesafios;
