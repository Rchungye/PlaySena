import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { registrarUsuario } from "../services/Usuario"; // Asegúrate de ajustar la ruta al archivo correcto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contra: "",
    confirmacion: "",
  });
  const [error, setError] = useState(""); // Estado para manejar el mensaje de error
  const [showPassword, setShowPassword] = useState(false); // Estado para manejar la visibilidad de la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para manejar la visibilidad de la confirmación de contraseña

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Limpiar el error cuando se cambian los campos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.contra ||
      formData.contra !== formData.confirmacion
    ) {
      setError("Por favor, complete todos los campos correctamente.");
      return;
    }

    try {
      const response = await registrarUsuario(formData);
      if (response) {
        // Redirigir a la página de inicio de sesión si el registro es exitoso
        navigate("/");
      }
    } catch (error) {
      setError("Hubo un problema con el registro. Inténtelo de nuevo.");
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className={`landing-page-form ${className}`} onSubmit={handleSubmit}>
      <div className="landing-page-form-title">Registro</div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Nombre</label>
        <div className="landing-page-input-container">
          <input
            className="landing-page-form-input"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Introduzca su nombre"
            type="text"
            required // Campo obligatorio
          />
        </div>
      </div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Apellido</label>
        <div className="landing-page-input-container">
          <input
            className="landing-page-form-input"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Introduzca su apellido"
            type="text"
            required // Campo obligatorio
          />
        </div>
      </div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Email</label>
        <div className="landing-page-input-container">
          <input
            className="landing-page-form-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Introduzca su correo"
            type="email"
            required // Campo obligatorio
          />
        </div>
      </div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Contraseña</label>
        <div className="landing-page-input-container password-container">
          <input
            className="landing-page-form-input"
            name="contra"
            value={formData.contra}
            onChange={handleChange}
            placeholder="Introduzca su contraseña"
            type={showPassword ? "text" : "password"} // Cambia el tipo del input
            required // Campo obligatorio
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Confirmar Contraseña</label>
        <div className="landing-page-input-container password-container">
          <input
            className="landing-page-form-input"
            name="confirmacion"
            value={formData.confirmacion}
            onChange={handleChange}
            placeholder="Confirme su contraseña"
            type={showConfirmPassword ? "text" : "password"} // Cambia el tipo del input
            required // Campo obligatorio
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={toggleConfirmPasswordVisibility}
            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>
      {error && <div className="landing-page-form-error">{error}</div>} {/* Mostrar mensaje de error */}
      <button
        className="landing-page-form-button register-button"
        type="submit"
        disabled={
          !formData.nombre ||
          !formData.apellido ||
          !formData.email ||
          !formData.contra ||
          !formData.confirmacion ||
          formData.contra !== formData.confirmacion
        }
      >
        Registrarse
      </button>
      <button
        className="landing-page-form-button login-button"
        type="button"
        onClick={handleLoginClick}
      >
        Regresar a inicio de sesión
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
};

export default RegisterForm;
