import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Análisis de Datos Médicos',
    description: 'Aplicación para análisis estadístico de datos médicos usando Python y Pandas.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    link: '#'
  },
  {
    id: 2,
    title: 'Portafolio Web Personal',
    description: 'Este sitio web construido con React y Vite, con diseño responsivo y moderno.',
    technologies: ['React', 'CSS3', 'Vite'],
    link: '#'
  },
  {
    id: 3,
    title: 'Visualizador de Espectros',
    description: 'Herramienta para visualizar y analizar espectros de radiación.',
    technologies: ['Python', 'Matplotlib', 'Data Science'],
    link: '#'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <h2 className="projects__title">Proyectos</h2>
        
        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>
                
                <div className="project-card__tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <a href={project.link} className="project-card__link">
                Ver más →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
