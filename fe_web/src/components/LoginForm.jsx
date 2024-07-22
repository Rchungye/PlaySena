import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { inicioUsuario } from "../services/Usuario"; // Asegúrate de ajustar la ruta al archivo correcto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FormLogIn = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    email: "",
    contra: "",
  });
  const [error, setError] = useState(""); // Estado para manejar el mensaje de error
  const [showPassword, setShowPassword] = useState(false); // Estado para manejar la visibilidad de la contraseña

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Limpiar el error cuando se cambian los campos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!formData.email || !formData.contra) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await inicioUsuario(formData.email, formData.contra);
      if (response) {
        // Redirigir a la página de Etapas si el login es exitoso
        navigate("/etapas");
      } else {
        setError("Correo electrónico o contraseña incorrectos.");
      }
    } catch (error) {
      setError("Hubo un problema con la autenticación. Inténtelo de nuevo.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/registro");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={`landing-page-login-form ${className}`} onSubmit={handleSubmit}>
      <div className="landing-page-form-title">Iniciar sesión</div>
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
      {error && <div className="landing-page-form-error">{error}</div>} {/* Mostrar mensaje de error */}
      <button className="landing-page-form-button" type="submit">
        Iniciar sesión
      </button>
      <button
        className="landing-page-form-button register-button"
        type="button"
        onClick={handleRegisterClick}
      >
        Registrarse
      </button>
    </form>
  );
};

FormLogIn.propTypes = {
  className: PropTypes.string,
};

export default FormLogIn;
