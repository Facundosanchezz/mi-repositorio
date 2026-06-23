import './Nav.css';

export default function Nav() {
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            Sobre mí
          </a>
        </li>
        <li className="nav__item">
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>
            Proyectos
          </a>
        </li>
        <li className="nav__item">
          <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>
            Habilidades
          </a>
        </li>
        <li className="nav__item">
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
}
