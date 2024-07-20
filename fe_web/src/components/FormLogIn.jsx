import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FormLogIn = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., send data to a server)
  };

  const handleRegisterClick = () => {
    navigate("/registro");
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
          />
        </div>
      </div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Contraseña</label>
        <div className="landing-page-input-container">
          <input
            className="landing-page-form-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Introduzca su contraseña"
            type="password"
          />
        </div>
      </div>
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
