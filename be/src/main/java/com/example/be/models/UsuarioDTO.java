package com.example.be.models;

public class UsuarioDTO {
    private int id;
    private String nombre;
    private String apellido;
    private String email;
    private String contra;
    private String fotoPerfil;
    private int exp;

    //para query
    public UsuarioDTO(int id, String nombre, String apellido, String email, String contra, String fotoPerfil, int exp) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contra = contra;
        this.fotoPerfil = fotoPerfil;
        this.exp = exp;
    }


    //para updates
    public UsuarioDTO(String nombre, String apellido, String email, String contra, String fotoPerfil, int exp) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contra = contra;
        this.fotoPerfil = fotoPerfil;
        this.exp = exp;
    }

    //para registrar
    public UsuarioDTO(String nombre, String apellido, String email, String contra, String fotoPerfil) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contra = contra;
        this.fotoPerfil = fotoPerfil;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContra() {
        return contra;
    }

    public void setContra(String contra) {
        this.contra = contra;
    }

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }
}
