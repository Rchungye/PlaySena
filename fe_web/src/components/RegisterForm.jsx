import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const RegisterForm = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
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
    // Add form submission logic here (e.g., send data to a server)

    // Navigate back to the login page
    navigate("/");
  };

  return (
    <form className={`landing-page-form ${className}`} onSubmit={handleSubmit}>
      <div className="landing-page-form-title">Registro</div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Nombre</label>
        <div className="landing-page-input-container">
          <input
            className="landing-page-form-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Introduzca su nombre"
            type="text"
          />
        </div>
      </div>
      <div className="landing-page-form-group">
        <label className="landing-page-form-label">Apellido</label>
        <div className="landing-page-input-container">
          <input
            className="landing-page-form-input"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Introduzca su apellido"
            type="text"
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
      <button className="landing-page-form-button register-button" type="submit">
        Registrarse
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
};

export default RegisterForm;
