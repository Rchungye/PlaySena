package com.example.be.models;

public class NivelesDTO {
    private int id;
    private String nombre;
    private String Descricion;
    private int exp;

    private EtapasDTO etapa;


    //query
    public NivelesDTO(int id, String nombre, String descripcion, int exp, EtapasDTO etapa) {
        this.id = id;
        this.nombre = nombre;
        this.Descricion = descripcion;
        this.exp = exp;
        this.etapa = etapa;
    }

    //Crear y actualizar
    public NivelesDTO(String nombre, String descripcion) {
        this.nombre = nombre;
        this.Descricion = descripcion;
    }

    public String getDescricion() {
        return Descricion;
    }

    public void setDescricion(String descricion) {
        Descricion = descricion;
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
