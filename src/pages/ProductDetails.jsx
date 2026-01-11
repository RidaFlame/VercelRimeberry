import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, MessageCircle, Thermometer, Package, MapPin, Award, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import OrderForm from '../components/OrderForm';
import { getImagePath } from '../utils/imagePath';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(1); // Always start at 1 (skip cover at index 0)
  const [showOrderForm, setShowOrderForm] = useState(false);
  const currentLang = i18n.language;

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === id);
    setProduct(foundProduct);
    if (foundProduct) {
      // CRITICAL: Always start with first non-cover image (index 1), NEVER show cover (index 0)
      if (foundProduct.images.length > 1) {
        setSelectedImage(1); // First non-cover image - NEVER use 0
      } else {
        setSelectedImage(1); // Even if only one image, use 1 (though it won't exist, we'll handle it)
      }
    }
  }, [id]);

  // CRITICAL SAFEGUARD: Ensure selectedImage is NEVER 0 when product has multiple images
  useEffect(() => {
    if (product && product.images && product.images.length > 1) {
      if (selectedImage === 0) {
        setSelectedImage(1); // Force to 1 if somehow it became 0
      }
    }
  }, [product, selectedImage]);

  // Get the image to display - NEVER show cover (index 0) if there are multiple images
  const getDisplayImage = () => {
    if (!product || !product.images || product.images.length === 0) {
      return getImagePath('/placeholder-food.jpg');
    }
    
    // CRITICAL: If product has multiple images, NEVER show index 0 (cover)
    if (product.images.length > 1) {
      // Ensure selectedImage is always >= 1 (never 0)
      const safeIndex = Math.max(1, selectedImage);
      // Double check: if safeIndex is somehow 0, use 1
      const finalIndex = safeIndex === 0 ? 1 : safeIndex;
      const imagePath = product.images[finalIndex] || product.images[1] || '/placeholder-food.jpg';
      return getImagePath(imagePath);
    }
    
    // If only one image exists (the cover), show placeholder instead of cover
    return getImagePath('/placeholder-food.jpg');
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-xl text-secondary mb-4">Product not found</p>
          <Link to="/catalogue" className="text-primary hover:underline">
            Back to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const translation = product.translations[currentLang] || product.translations.fr;
  const phoneNumber = '212522222222';
  const whatsappMessage = encodeURIComponent(
    `I am interested in ${translation.name}`
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  const scrollToContact = () => {
    navigate('/contact');
    setTimeout(() => {
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-secondary hover:text-primary mb-8 transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform flex-shrink-0" />
          <span className="font-body font-light text-sm md:text-base">{t('product.back')}</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="card-premium overflow-hidden group">
              <div className="relative h-96 lg:h-[500px] overflow-hidden bg-gradient-to-br from-tertiary/20 to-tertiary/10">
                {/* CRITICAL: NEVER show cover image (index 0) - only show fresh/frozen/etc images */}
                <img
                  src={getDisplayImage()}
                  alt={translation.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    console.error('Image failed to load');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
            {/* CRITICAL: Show ONLY non-cover images (fresh, frozen, etc.) - NEVER show cover (index 0) */}
            {product.images.length > 1 ? (
              <div className="grid grid-cols-4 gap-3">
                {/* slice(1) removes the cover image - only shows images from index 1 onwards */}
                {product.images.slice(1).map((image, index) => {
                  const actualIndex = index + 1; // actualIndex is 1, 2, 3... (NEVER 0)
                  return (
                    <motion.button
                      key={actualIndex}
                      onClick={() => {
                        // CRITICAL: Ensure we NEVER set selectedImage to 0 - always use index 1 or higher
                        if (actualIndex >= 1) {
                          setSelectedImage(actualIndex);
                        } else {
                          setSelectedImage(1); // Fallback to 1 if somehow 0
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === actualIndex
                          ? 'border-primary shadow-lg ring-2 ring-primary/20'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={getImagePath(image)}
                        alt={`${translation.name} ${index + 1}`}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          console.error('Image failed to load:', image);
                        }}
                      />
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              // If only cover image exists, show a message
              <div className="text-center py-4 text-secondary/60">
                <p className="font-body text-sm">No additional images available</p>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-4 md:mb-6 leading-tight">
                {translation.name}
              </h1>
              <p className="font-body text-lg lg:text-xl text-secondary/70 leading-relaxed">
                {translation.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="card-premium p-8 space-y-6">
              <h3 className="font-heading text-xl md:text-2xl font-light text-secondary mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
                {t('product.description')}
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-tertiary/20 hover:bg-tertiary/30 transition-colors">
                  <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                    <Package className="text-tertiary" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-body font-light text-secondary block mb-1 text-sm md:text-base">
                      {t('product.packaging')}
                    </span>
                    <p className="font-body text-secondary/70">{translation.packaging}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-tertiary/20 hover:bg-tertiary/30 transition-colors">
                  <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                    <MapPin className="text-tertiary" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-body font-light text-secondary block mb-1 text-sm md:text-base">
                      {t('product.origin')}
                    </span>
                    <p className="font-body text-secondary/70">{translation.origin}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-tertiary/20 hover:bg-tertiary/30 transition-colors">
                  <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                    <Thermometer className="text-tertiary" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-body font-light text-secondary block mb-1 text-sm md:text-base">
                      {t('product.storage')}
                    </span>
                    <p className="font-body text-secondary/70">{product.specs.temperature}</p>
                  </div>
                </div>

                {product.specs.certifications && (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-tertiary/20 hover:bg-tertiary/30 transition-colors">
                    <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                      <Award className="text-tertiary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-body font-light text-secondary block mb-1 text-sm md:text-base">
                        {t('product.certifications')}
                      </span>
                      <p className="font-body text-secondary/70">
                        {product.specs.certifications.join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                onClick={() => setShowOrderForm(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full text-lg py-5 flex items-center justify-center gap-3"
              >
                <ShoppingCart size={22} className="flex-shrink-0" />
                <span>{t('product.orderNow')}</span>
              </motion.button>
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-heading font-light py-4 md:py-5 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-base md:text-lg"
              >
                <Mail size={22} className="flex-shrink-0" />
                <span>{t('product.requestQuote')}</span>
              </motion.button>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:from-[#20BA5A] hover:to-[#1DA851] text-white font-heading font-light py-4 md:py-5 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-base md:text-lg"
              >
                <MessageCircle size={22} className="flex-shrink-0" />
                <span>{t('product.orderWhatsApp')}</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Order Form Modal */}
      <AnimatePresence>
        {showOrderForm && (
          <OrderForm product={product} onClose={() => setShowOrderForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;

