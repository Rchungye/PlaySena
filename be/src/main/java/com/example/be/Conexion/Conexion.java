package com.example.be.Conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    static public Connection connectar() {
        try {
            Class.forName("org.mariadb.jdbc.Driver");
            return DriverManager.getConnection("jdbc:mariadb://localhost:3306/juegos_seniales", "root", "alejandro00");
        } catch (ClassNotFoundException e) {
            int x = 1;
        } catch (SQLException e) {
            int x = 1;
        }
        catch (Exception e) {
            int x = 1;
        }
        return null;
    }
}
