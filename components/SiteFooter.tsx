import { Mail, Phone, MapPin } from "lucide-react";

interface SiteFooterProps {
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export default function SiteFooter({ contact }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-grafito text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rio/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-bosque/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.webp" alt="Outdoor Ñuble" className="h-12 w-auto" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Outdoor Ñuble</h3>
            <p className="text-white/70 leading-relaxed">
              Vive la aventura del rafting en el majestuoso Río Ñuble. Experiencias inolvidables en el corazón de la
              Región de Ñuble, Chile.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6">Contacto</h3>
            <div className="space-y-4">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center text-white/80 hover:text-rio transition-colors group"
              >
                <div className="bg-rio/20 p-2 rounded-lg group-hover:bg-rio transition-colors mr-3">
                  <Phone className="h-5 w-5" />
                </div>
                <span>{contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center text-white/80 hover:text-bosque transition-colors group"
              >
                <div className="bg-bosque/20 p-2 rounded-lg group-hover:bg-bosque transition-colors mr-3">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="break-all">{contact.email}</span>
              </a>
              <div className="flex items-start text-white/80 group">
                <div className="bg-tierra/20 p-2 rounded-lg mr-3 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <nav className="space-y-3">
              <a
                href="/"
                className="block text-white/80 hover:text-rio transition-colors hover:translate-x-1 transform duration-200"
              >
                → Rafting
              </a>
              <a
                href="/nosotros"
                className="block text-white/80 hover:text-rio transition-colors hover:translate-x-1 transform duration-200"
              >
                → Nosotros
              </a>
              <a
                href="/contacto"
                className="block text-white/80 hover:text-rio transition-colors hover:translate-x-1 transform duration-200"
              >
                → Contacto
              </a>
              <a
                href="#faq"
                className="block text-white/80 hover:text-rio transition-colors hover:translate-x-1 transform duration-200"
              >
                → Preguntas Frecuentes
              </a>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Outdoor Ñuble. Todos los derechos reservados. Hecho con ❤️ en San Fabián de Alico.
          </p>
        </div>
      </div>
    </footer>
  );
}
