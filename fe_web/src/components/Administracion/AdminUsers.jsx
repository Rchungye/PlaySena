import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icono para ver la imagen
import Swal from 'sweetalert2';
import * as usuarioService from '../../services/Usuario'; // Asegúrate de que esta ruta es correcta

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contra: '',
    fotoPerfil: '',
    exp: 0,
    tipo: 1 // Valor por defecto
  });

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usuarioService.obtenerUsuarios();
      setUsers(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditMode(true);
      setCurrentUser(user);
      setFormData({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        contra: user.contra,
        fotoPerfil: user.fotoPerfil,
        exp: user.exp,
        tipo: user.tipo
      });
    } else {
      setEditMode(false);
      setCurrentUser(null);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        contra: '',
        fotoPerfil: '',
        exp: 0,
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

  const handleSave = async () => {
    try {
      if (editMode) {
        await usuarioService.actualizarUsuario({ ...currentUser, ...formData });
      } else {
        await usuarioService.registrarUsuario(formData);
      }
      fetchUsers();
      handleCloseDialog();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `¿Está seguro que desea eliminar al usuario #${id}?`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cerrar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await usuarioService.eliminarUsuario(id);
          fetchUsers();
        } catch (error) {
          console.error(error);
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
    { field: 'apellido', headerName: 'Apellido', width: 200 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'contra', headerName: 'Contraseña', width: 200 },
    {
      field: 'fotoPerfil',
      headerName: 'Foto de Perfil',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleImageClick(params.value)}>
          <VisibilityIcon />
        </IconButton>
      )
    },
    { field: 'exp', headerName: 'Experiencia', width: 150 },
    {
      field: 'tipo',
      headerName: 'Tipo de Usuario',
      width: 150,
      renderCell: (params) => (
        <span>{params.value === 1 ? 'Jugador' : 'Administrador'}</span>
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
      <h1>Administrar Usuarios</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Añadir Usuario</Button>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={users} columns={columns} pageSize={10} />
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Editar Usuario' : 'Añadir Usuario'}</DialogTitle>
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
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Correo"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contraseña"
            name="contra"
            value={formData.contra}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Foto de Perfil"
            name="fotoPerfil"
            value={formData.fotoPerfil}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Experiencia"
            name="exp"
            type="number"
            value={formData.exp}
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
              <MenuItem value={1}>Jugador</MenuItem>
              <MenuItem value={2}>Administrador</MenuItem>
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

      <Dialog open={imageModalOpen} onClose={handleCloseDialog}>
        <DialogTitle>Foto de Perfil</DialogTitle>
        <DialogContent>
          <img src={imageToShow} alt="Foto de perfil" style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
