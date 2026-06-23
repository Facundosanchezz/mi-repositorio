import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-label="Sección de presentación personal">
      <div className="hero__container">
        <div className="hero__image-wrapper">
          <img
            src="/Foto pagina.jpg"
            alt="Facundo Sánchez"
            className="hero__image"
          />
        </div>
        
        <div className="hero__content">
          <h1 className="hero__title">Facundo Sánchez</h1>
          <p className="hero__subtitle">
            Estudiante de Física Médica • Python • Data Science • Música
          </p>
          <p className="hero__description">
            Apasionado por desarrollar soluciones tecnológicas innovadoras en la 
            intersección de la física, programación y análisis de datos.
          </p>
        </div>
      </div>
    </section>
  );
}
