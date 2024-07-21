import Header from "../Header";
import RegisterForm from "../RegisterForm";
import Footer from "../Footer";

const Registro = () => {
  return (
    <div className="landing-page-login-page">
      <Header className="landing-page-header" />
      <main className="landing-page-main-content">
        <section className="landing-page-welcome-section">
          <h1 className="landing-page-bubble-effect landing-page-title">
            <p className="m-0">Bienvenido a</p>
            <p className="m-0">PlaySeña</p>
          </h1>
          <h1 className="landing-page-subtitle">
            Tu Lugar de Aprendizaje
          </h1>
        </section>
        <div className="landing-page-form-container">
          <RegisterForm className="landing-page-login-form" />
        </div>
      </main>
      <Footer className="landing-page-footer" />
    </div>
  );
};

export default Registro;
