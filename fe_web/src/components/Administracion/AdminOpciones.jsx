import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icono para ver la imagen
import Swal from 'sweetalert2';

const AdminOpciones = () => {
  const [opciones, setOpciones] = useState([
    { id: 1, nombre: 'Opción 1', tipo: 1, desafio: 'Desafío 1', imagen: 'https://example.com/opcion1.jpg' },
    { id: 2, nombre: 'Opción 2', tipo: 0, desafio: 'Desafío 2', imagen: 'https://example.com/opcion2.jpg' },
    // Añadir más opciones según sea necesario
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOpcion, setCurrentOpcion] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 0,
    desafio: '',
    imagen: ''
  });

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState('');

  const handleOpenDialog = (opcion = null) => {
    if (opcion) {
      setEditMode(true);
      setCurrentOpcion(opcion);
      setFormData({
        nombre: opcion.nombre,
        tipo: opcion.tipo,
        desafio: opcion.desafio,
        imagen: opcion.imagen
      });
    } else {
      setEditMode(false);
      setCurrentOpcion(null);
      setFormData({
        nombre: '',
        tipo: 0,
        desafio: '',
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
      const updatedOpciones = opciones.map((o) => (o.id === currentOpcion.id ? { ...currentOpcion, ...formData } : o));
      setOpciones(updatedOpciones);
    } else {
      const newOpcion = { id: opciones.length + 1, ...formData };
      setOpciones([...opciones, newOpcion]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Eliminar Opción',
      text: `¿Está seguro que desea eliminar la opción #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOpciones = opciones.filter((o) => o.id !== id);
        setOpciones(updatedOpciones);
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
    { field: 'tipo', headerName: 'Tipo', width: 150, valueFormatter: ({ value }) => (value === 0 ? 'Incorrecto' : 'Correcto') },
    { field: 'desafio', headerName: 'Desafío', width: 200 },
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
      <h1>Administrar Opciones</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Añadir Opción</Button>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={opciones} columns={columns} pageSize={10} />
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Opción' : 'Añadir Opción'}</DialogTitle>
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
            label="Tipo"
            name="tipo"
            type="number"
            value={formData.tipo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Desafío"
            name="desafio"
            value={formData.desafio}
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

export default AdminOpciones;
