import './Contact.css';

const contactLinks = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:facusnchz30@gmail.com',
    icon: '✉️',
    external: false
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Facundosanchezz',
    icon: '🔗',
    external: true
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/facusanchezz30/',
    icon: '📱',
    external: true
  }
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <h2 className="contact__title">Ponte en contacto</h2>
        <p className="contact__subtitle">
          ¿Tienes una pregunta o propuesta? No dudes en escribirme.
        </p>
        
        <div className="contact__links">
          {contactLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="contact-link"
            >
              <span className="contact-link__icon">{link.icon}</span>
              <span className="contact-link__label">{link.label}</span>
              {link.external && <span className="contact-link__external">↗</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
