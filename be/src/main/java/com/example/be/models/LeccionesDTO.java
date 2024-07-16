package com.example.be.models;

public class LeccionesDTO {
    private int id;
    private String nombre;
    private String descricion;
    private String imagen;
    private String video;
    private NivelesDTO nivel;

    public LeccionesDTO(int id, String nombre,String descricion, String imagen, String video, NivelesDTO nivel) {
        this.id = id;
        this.nombre = nombre;
        this.descricion = descricion;
        this.imagen = imagen;
        this.video = video;
        this.nivel = nivel;
    }
    public LeccionesDTO( String nombre,String descricion, String imagen, String video, NivelesDTO nivel) {
        this.nombre = nombre;
        this.descricion = descricion;
        this.imagen = imagen;
        this.video = video;
        this.nivel = nivel;
    }

    public String getDescricion() {
        return descricion;
    }

    public void setDescricion(String descricion) {
        descricion = descricion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public NivelesDTO getNivel() {
        return nivel;
    }

    public void setNivel(NivelesDTO nivel) {
        this.nivel = nivel;
    }
}
