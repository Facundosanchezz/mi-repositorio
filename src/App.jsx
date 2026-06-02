export default function App() {
  return (
    <div
      style={{
        background: '#111',
        color: 'white',
        minHeight: '100vh',
        width: '100%',
        padding: '40px',
        boxSizing: 'border-box',
        fontFamily: 'Arial',
        textAlign: 'center'
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '40px'
        }}
      >
        <a href="#sobre">Sobre mí</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '30px'
  }}
>
  <img
    src="/Foto pagina.jpg"
    alt="Facundo"
    style={{
      width: '220px',
      borderRadius: '20%'
    }}
  />

  <div>
    <h1
      style={{
        fontSize: '70px',
        color: '#00ffcc',
        marginBottom: '10px'
      }}
    >
      Facundo Sánchez
    </h1>

    <p style={{ fontSize: '22px' }}>
      Física Médica • Música • Programación
    </p>
  </div>
</div>
      <h2 id="sobre">Sobre mí</h2>

      <p
        style={{
          maxWidth: '700px',
          margin: 'auto',
          lineHeight: '1.6'
        }}
      >
        Soy estudiante de Licenciatura en Física Médica y me interesa
        desarrollar proyectos relacionados con tecnología, música y programación.
      </p>

      <hr style={{ margin: '40px 0' }} />

      <h2 id="proyectos">Proyectos</h2>

      <div>
        <h3>Proyecto 1</h3>
        <p>Descripción del proyecto.</p>

        <h3>Proyecto 2</h3>
        <p>Descripción del proyecto.</p>
      </div>

      <hr style={{ margin: '40px 0' }} />
 
<h2 id="contacto">Contacto</h2>
<p>
  <a
    href="mailto:facusnchz30@gmail.com"
    style={{
      color: '#00ffcc',
      fontSize: '20px'
    }}
  >
    facusnchz30@gmail.com
  </a>
</p>
<p>
  <a
    href="https://www.instagram.com/facusanchezz30/"
    target="_blank"
    rel="noreferrer"
    style={{
          color: '#00ffcc',
          fontSize: '20px'
        }}
  >
    Instagram
  </a>
</p>

<p>
  <a
    href="https://github.com/Facundosanchezz"
    target="_blank"
    rel="noreferrer"
    style={{
          color: '#00ffcc',
          fontSize: '20px'
        }}
  >
    GitHub
  </a>
</p>












    </div>
  )
}