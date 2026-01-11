import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Copy, Check, MapPin } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState({ email: false, phone: false, whatsapp: false });

  const email = 'rimeberry.groupe@gmail.com';
  const phone = '06 61 79 46 30';
  const whatsappNumber = '212661794630';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const instagramUrl = 'https://www.instagram.com/rimeberry.groupe?igsh=MW1iMjBicWM3Z2RnaQ%3D%3D&utm_source=qr';

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-4 md:mb-6 arabic-text">
            {t('contact.title')}
          </h1>
          <p className="font-body text-base md:text-lg text-secondary/70 max-w-2xl mx-auto arabic-text">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card-premium p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-light text-secondary arabic-text">
                {t('contact.info.email', 'Email')}
              </h3>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href={`mailto:${email}`}
                className="font-body text-secondary/80 hover:text-primary transition-colors break-all arabic-text"
              >
                {email}
              </a>
              <motion.button
                onClick={() => copyToClipboard(email, 'email')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Copy email"
              >
                {copied.email ? (
                  <Check size={20} className="text-green-600" />
                ) : (
                  <Copy size={20} className="text-secondary/60" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-premium p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-light text-secondary arabic-text">
                {t('contact.info.phone', 'Phone')}
              </h3>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href={`tel:+${whatsappNumber}`}
                className="font-body text-secondary/80 hover:text-primary transition-colors arabic-text"
              >
                {phone}
              </a>
              <motion.button
                onClick={() => copyToClipboard(phone, 'phone')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Copy phone"
              >
                {copied.phone ? (
                  <Check size={20} className="text-green-600" />
                ) : (
                  <Copy size={20} className="text-secondary/60" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* WhatsApp Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-premium p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#25D366]/10 p-3 rounded-full">
                <MessageCircle size={24} className="text-[#25D366]" />
              </div>
              <h3 className="font-heading text-xl font-light text-secondary arabic-text">
                {t('contact.info.whatsapp', 'WhatsApp')}
              </h3>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-secondary/80 hover:text-[#25D366] transition-colors arabic-text"
              >
                {phone}
              </a>
              <motion.button
                onClick={() => copyToClipboard(phone, 'whatsapp')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Copy WhatsApp"
              >
                {copied.whatsapp ? (
                  <Check size={20} className="text-green-600" />
                ) : (
                  <Copy size={20} className="text-secondary/60" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Instagram Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-premium p-6 md:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-light text-secondary arabic-text">
                {t('contact.info.instagram', 'Instagram')}
              </h3>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-secondary/80 hover:text-pink-600 transition-colors arabic-text"
              >
                @rimeberry.groupe
              </a>
            </div>
          </motion.div>
        </div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-premium p-6 md:p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin size={24} className="text-primary" />
            </div>
            <h3 className="font-heading text-xl font-light text-secondary arabic-text">
              {t('contact.info.location', 'Location')}
            </h3>
          </div>
          <div className="space-y-2">
            <p className="font-body text-secondary/80 arabic-text">Rond-point Abaraz</p>
            <p className="font-body text-secondary/80 arabic-text">CCWR+5VP, Agadir 80000</p>
          </div>
        </motion.div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 md:mt-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-light text-secondary mb-6 text-center arabic-text">
            {t('contact.map.title', 'Our Location')}
          </h2>
          <div className="card-premium p-0 overflow-hidden">
            <div className="w-full h-96 md:h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Rond-point+Abaraz+Agadir+80000&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Company Location"
              />
            </div>
          </div>
          <p className="text-center text-secondary/60 font-body text-sm mt-4 arabic-text">
            Rond-point Abaraz
          </p>
          <p className="text-center text-secondary/60 font-body text-sm mt-1 arabic-text">
            CCWR+5VP, Agadir 80000
          </p>
          <p className="text-center text-secondary/60 font-body text-sm mt-2 arabic-text">
            <a href="https://maps.app.goo.gl/QhKY328DuRDCJknS6" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {t('contact.map.viewOnMaps', 'View on Google Maps')}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
