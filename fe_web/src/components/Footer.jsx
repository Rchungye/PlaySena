import PropTypes from "prop-types";

const Footer = ({ className = "" }) => {
  return (
    <div className={`landing-page-footer ${className}`}>
      <footer className="landing-page-footer-content">
        <div className="landing-page-footer-icon-container">
          <img
            className="landing-page-footer-icon"
            loading="lazy"
            alt="Icon"
            src="/icon.svg"
          />
        </div>
        <div className="landing-page-footer-socials">
          <img
            className="landing-page-social-icon"
            loading="lazy"
            alt="X Logo"
            src="/x-logo.svg"
          />
          <img
            className="landing-page-social-icon"
            loading="lazy"
            alt="Instagram Logo"
            src="/logo-instagram.svg"
          />
          <img
            className="landing-page-social-icon"
            loading="lazy"
            alt="YouTube Logo"
            src="/logo-youtube.svg"
          />
          <img
            className="landing-page-social-icon"
            loading="lazy"
            alt="LinkedIn Logo"
            src="/linkedin.svg"
          />
        </div>
      </footer>
      <div className="landing-page-footer-links">
        <div className="landing-page-footer-link">Recursos</div>
        <div className="landing-page-footer-link">Ayuda</div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
