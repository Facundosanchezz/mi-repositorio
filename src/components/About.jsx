import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <h2 className="about__title">Sobre mí</h2>
        <div className="about__content">
          <p className="about__text">
            Soy estudiante de Licenciatura en Física Médica apasionado por la programación y el análisis de datos.
            Me fascinan los proyectos que combinan la ciencia con la tecnología, especialmente aquellos que pueden
            tener un impacto positivo en la salud y el bienestar.
          </p>
          <p className="about__text">
            Fuera del código, disfruto de la música como forma de expresión creativa y como manera de entender
            mejor el mundo que nos rodea.
          </p>
        </div>
      </div>
    </section>
  );
}
