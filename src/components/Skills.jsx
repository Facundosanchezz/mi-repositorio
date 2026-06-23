import './Skills.css';

const skillsData = {
  'Lenguajes': ['Python', 'JavaScript', 'HTML/CSS'],
  'Librerías & Frameworks': ['React', 'Pandas', 'NumPy', 'Vite'],
  'Herramientas': ['Git', 'GitHub', 'VS Code'],
  'Especialidades': ['Data Science', 'Física Médica', 'Análisis de Datos']
};

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills__container">
        <h2 className="skills__title">Habilidades</h2>
        
        <div className="skills__groups">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="skill-group">
              <h3 className="skill-group__title">{category}</h3>
              <div className="skill-group__items">
                {skills.map((skill) => (
                  <div key={skill} className="skill-item">
                    <span className="skill-item__text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
