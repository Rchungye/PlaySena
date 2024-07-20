import PropTypes from "prop-types";

const Header = ({ className = "" }) => {
  return (
<header className="landing-page-header">
  <img className="landing-page-header-icon" src="/path/to/icon.png" alt="Header Icon" />
</header>

  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
