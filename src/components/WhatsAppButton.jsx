import { MessageCircle, Instagram } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '212669657677'; // 06 69 65 76 77
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const instagramUrl = 'https://www.instagram.com/rimeberry.groupe?igsh=MW1iMjBicWM3Z2RnaQ%3D%3D&utm_source=qr';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="Follow us on Instagram"
      >
        <Instagram size={28} className="group-hover:rotate-12 transition-transform" />
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          1
        </span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
