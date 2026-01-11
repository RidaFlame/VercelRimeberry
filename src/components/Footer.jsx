import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-tertiary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-tertiary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-tertiary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 py-12 relative z-10">
        {/* Contact Information */}
        <div className="text-center mb-8">
          <h3 className="font-heading text-xl md:text-2xl font-light mb-6 text-white arabic-text">
            {t('footer.contact')}
          </h3>
          <div className="space-y-4 font-body text-base">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-tertiary flex-shrink-0" />
                <div className="text-tertiary/90 arabic-text text-left">
                  <a href="mailto:rimeberry.groupe@gmail.com" className="hover:text-white transition-colors">
                    rimeberry.groupe@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone size={20} className="text-tertiary flex-shrink-0" />
              <div className="text-tertiary/90 arabic-text">
                <a href="tel:+212661794630" className="hover:text-white transition-colors">
                  {t('footer.telephone')} 06 61 79 46 30
                </a>
              </div>
            </div>
            <div className="text-tertiary/90 arabic-text text-center text-sm mt-2">
              Rond-point Abaraz
            </div>
            <div className="text-tertiary/90 arabic-text text-center text-sm">
              CCWR+5VP, Agadir 80000
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-tertiary/30 pt-8 text-center">
          <p className="font-body text-sm text-tertiary/80 arabic-text">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
