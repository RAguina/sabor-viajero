'use client';
import Link from 'next/link';
import { ChefHat, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">Sabor Viajero</span>
            </div>
            <p className="text-gray-400">Descubre los mejores sabores de la ciudad en un solo lugar.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">Sobre Nosotros</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">Contacto</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-orange-500 transition-colors">Términos de Uso</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-500 transition-colors">Política de Privacidad</Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-orange-500 transition-colors">Cookies</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Newsletter</p>
              <form
                className="flex mt-2"
                onSubmit={e => {
                  e.preventDefault();
                  // Implementa lógica real o usa un servicio externo
                  alert('¡Te suscribiste!');
                }}
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors"
                  aria-label="Suscribirse al Newsletter"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sabor Viajero. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
