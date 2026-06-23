import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          © {currentYear} Facundo Sánchez. Hecho con ❤️ usando React + Vite
        </p>
        <p className="footer__tech">
          Diseño & Desarrollo
        </p>
      </div>
    </footer>
  );
}
