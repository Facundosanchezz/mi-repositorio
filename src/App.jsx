import BiosignalAnalyzer from './BiosignalAnalyzer';


    <div className="app-container">
      {/* Tu código existente */}
      
      {/* NUEVA SECCIÓN - Proyecto Biosignal */}
      <section id="proyectos" className="section">
        <h2>Proyectos</h2>
        <BiosignalAnalyzer />
      </section>
    </div>
  ;


import './App.css';

const skillsData = [
  'Python',
  'Pandas',
  'NumPy',
  'React',
  'Git',
  'GitHub',
  'Física Médica',
  'JavaScript',
  'Data Science'
];

const projectsData = [
  {
    title: 'Análisis de Datos Médicos',
    description: 'Análisis estadístico de datos de pacientes usando Python y Pandas.',
    tech: ['Python', 'Pandas', 'NumPy']
  },
  {
    title: 'Portafolio Web',
    description: 'Sitio web personal desarrollado con React y Vite.',
    tech: ['React', 'JavaScript', 'CSS']
  },
  {
    title: 'Proyecto Académico',
    description: 'Trabajo relacionado con Física Médica y simulaciones.',
    tech: ['Python', 'Física Médica']
  }
];

export default function App() {
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('href');
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* HEADER / NAVEGACIÓN */}
      <header className="header">
        <nav className="navbar">
          <a href="#sobre" onClick={handleSmoothScroll}>Sobre mí</a>
          <a href="#proyectos" onClick={handleSmoothScroll}>Proyectos</a>
          <a href="#habilidades" onClick={handleSmoothScroll}>Habilidades</a>
          <a href="#contacto" onClick={handleSmoothScroll}>Contacto</a>
        </nav>
      </header>

      {/* HERO / PRESENTACIÓN */}
      <section className="hero">
        <div className="hero-content">
          <img
            src="/Foto pagina.jpg"
            alt="Facundo Sánchez"
            className="profile-image"
          />
          <div className="hero-text">
            <h1 className="title">Facundo Sánchez</h1>
            <p className="subtitle">
              Estudiante de Física Médica • Python • Data Science • Música
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* SOBRE MÍ */}
        <section id="sobre" className="section">
          <h2>Sobre mí</h2>
          <p>
            Soy estudiante de Licenciatura en Física Médica y me interesa
            desarrollar proyectos relacionados con tecnología, música y programación.
            Me apasiona resolver problemas complejos mediante el análisis de datos
            y la programación, combinando mis conocimientos en física con desarrollo
            de software.
          </p>
        </section>

  {/* PROYECTOS */}
<section id="proyectos" className="section">
  <h2>Proyectos</h2>
  <div className="projects-grid">
    {projectsData.map((project, index) => (
      <div key={index} className="project-card">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.tech.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
  
  {/* NUEVO: Proyecto Biosignal */}
  <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #2a2a2a' }}>
    <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>
      🧬 Biosignal-AI Analytics (Proyecto Featured)
    </h3>
    <BiosignalAnalyzer />
  </div>
</section>
        {/* HABILIDADES */}
        <section id="habilidades" className="section">
          <h2>Habilidades</h2>
          <div className="skills-container">
            {skillsData.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="section">
          <h2>Contacto</h2>
          <div className="contact-links">
            <a href="mailto:facusnchz30@gmail.com" className="contact-link">
              📧 facusnchz30@gmail.com
            </a>
            <a 
              href="https://www.instagram.com/facusanchezz30/" 
              target="_blank" 
              rel="noreferrer"
              className="contact-link"
            >
              📱 Instagram
            </a>
            <a 
              href="https://github.com/Facundosanchezz" 
              target="_blank" 
              rel="noreferrer"
              className="contact-link"
            >
              💻 GitHub
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2024 Facundo Sánchez. Hecho con React + Vite</p>
      </footer>
    </div>
  );
}
