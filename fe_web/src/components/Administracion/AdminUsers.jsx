import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icono para ver la imagen
import * as usuarioService from '../../services/Usuario'; // Asegúrate de que esta ruta es correcta
import Swal from 'sweetalert2';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewImageOpen, setViewImageOpen] = useState(false); // Estado para abrir el modal de imagen
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    foto: '',
    experiencia: 0,
    tipoUsuario: 1
  });
  const [imageToView, setImageToView] = useState(''); // Estado para la imagen a ver

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
        correo: user.correo,
        contrasena: user.contrasena,
        foto: user.foto,
        experiencia: user.experiencia,
        tipoUsuario: user.tipoUsuario
      });
    } else {
      setEditMode(false);
      setCurrentUser(null);
      setFormData({
        nombre: '',
        correo: '',
        contrasena: '',
        foto: '',
        experiencia: 0,
        tipoUsuario: 1
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setViewImageOpen(false); // Cierra el modal de imagen al cerrar el diálogo
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
        await usuarioService.actualizarUsuario(currentUser.id, formData);
      } else {
        await usuarioService.agregarUsuario(formData);
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
    setImageToView(image);
    setViewImageOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'correo', headerName: 'Correo', width: 250 },
    { field: 'contrasena', headerName: 'Contraseña', width: 200 },
    {
      field: 'foto',
      headerName: 'Foto de Perfil',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleImageClick(params.value)}>
            <VisibilityIcon />
          </IconButton>
          <img src={params.value} alt="Foto de perfil" style={{ width: '50px', height: '50px' }} />
        </div>
      )
    },
    { field: 'experiencia', headerName: 'Experiencia', width: 150 },
    {
      field: 'tipoUsuario',
      headerName: 'Tipo de Usuario',
      width: 150,
      valueFormatter: (params) => (params.value === 1 ? 'Jugador' : 'Administrador')
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
            label="Correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contraseña"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Foto de Perfil"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Experiencia"
            name="experiencia"
            type="number"
            value={formData.experiencia}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Tipo de Usuario"
            name="tipoUsuario"
            type="number"
            value={formData.tipoUsuario}
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

      <Dialog open={viewImageOpen} onClose={handleCloseDialog}>
        <DialogTitle>Foto de Perfil</DialogTitle>
        <DialogContent>
          <img src={imageToView} alt="Foto de perfil" style={{ width: '100%' }} />
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
