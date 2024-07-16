package com.example.be.models;

public class EtapasDTO {
    private int id;
    private String nombre;
    private String descricion;

    public EtapasDTO(int id, String nombre, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descricion = descripcion;
    }
    public EtapasDTO( String nombre, String descripcion) {
        this.nombre = nombre;
        this.descricion = descripcion;
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
}
