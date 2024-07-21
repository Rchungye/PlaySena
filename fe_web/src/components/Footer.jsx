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
            src="/src/assets/images//logo.png"
          />
        </div>

      </footer>
      <div className="landing-page-footer-links">
        <div className="landing-page-footer-link">PlaySeña ®</div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
