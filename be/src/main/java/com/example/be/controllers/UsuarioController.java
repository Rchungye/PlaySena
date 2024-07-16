package com.example.be.controllers;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.be.models.UsuarioDTO;
import com.example.be.services.UsuarioService;

@RestController
public class UsuarioController {
    @GetMapping("/users/all")
    public List<UsuarioDTO> obtenerUsuarios() {
        return new UsuarioService().opbtenerUsuarios();
    }

    @PostMapping("/users/registrar")
    public int registrarUsuario(@RequestBody UsuarioDTO usuario) {
        return new UsuarioService().crearUsuario(usuario);
    }
}
