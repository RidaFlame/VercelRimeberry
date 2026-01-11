import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Mail, Phone, User, X, Package, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const OrderForm = ({ product, onClose }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const translation = product?.translations[currentLang] || product?.translations.fr;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errors, setErrors] = useState({});

  // Get Formspree endpoint from environment or use default
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mjgkeqqq';

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('order.errors.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('order.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('order.errors.emailInvalid');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('order.errors.phoneRequired');
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t('order.errors.phoneInvalid');
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = t('order.errors.quantityInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      // Prepare form data for Formspree
      const formPayload = {
        _subject: `${t('order.emailSubject')}: ${translation.name}`,
        _replyto: formData.email,
        product_name: translation.name,
        product_id: product.id,
        product_category: product.category,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        quantity: formData.quantity,
        address: formData.address || t('order.notProvided'),
        message: formData.message || t('order.noMessage'),
        language: currentLang,
        order_date: new Date().toLocaleString(currentLang === 'ar' ? 'ar-MA' : currentLang === 'fr' ? 'fr-FR' : 'en-US'),
      };

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          quantity: 1,
          address: '',
          message: '',
        });

        // Auto-close after 4 seconds
        setTimeout(() => {
          setSubmitStatus(null);
          if (onClose) onClose();
        }, 4000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden flex flex-col"
        >
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 p-6 md:p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-tertiary/20 rounded-xl p-3 backdrop-blur-sm">
                <ShoppingCart className="text-tertiary" size={28} />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-white mb-1">
                  {t('order.title')}
                </h2>
                {product && (
                  <div className="flex items-center gap-2 text-white/90">
                    <Package size={16} />
                    <p className="font-body text-sm font-light arabic-text">
                      {translation.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="text-white hover:text-tertiary transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X size={24} />
            </motion.button>
          </div>

          {/* Scrollable Form Content */}
          <div className="overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Product Info Card */}
              {product && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-tertiary/10 to-tertiary/5 border border-tertiary/20 rounded-xl p-4 md:p-5"
                >
                  <h3 className="font-heading text-lg font-light text-secondary mb-3 flex items-center gap-2">
                    <Package size={20} className="text-primary" />
                    {t('order.productInfo')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-secondary/60 font-body font-light">{t('order.productName')}:</span>
                      <p className="text-secondary font-body font-light arabic-text">{translation.name}</p>
                    </div>
                    <div>
                      <span className="text-secondary/60 font-body font-light">{t('order.category')}:</span>
                      <p className="text-secondary font-body font-light">{product.category}</p>
                    </div>
                    {product.specs?.weight && (
                      <div>
                        <span className="text-secondary/60 font-body font-light">{t('order.availableSizes')}:</span>
                        <p className="text-secondary font-body font-light">{product.specs.weight}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-secondary mb-2 font-body font-light text-sm md:text-base">
                  <User size={18} className="text-primary flex-shrink-0" />
                  <span>{t('order.name')} <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all font-body font-light arabic-text ${
                    errors.name
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  } outline-none`}
                  placeholder={t('order.namePlaceholder')}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-body font-light flex items-center gap-1"
                  >
                    <AlertCircle size={14} />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-secondary mb-2 font-body font-light text-sm md:text-base">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <span>{t('order.email')} <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all font-body font-light ${
                    errors.email
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  } outline-none`}
                  placeholder={t('order.emailPlaceholder')}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-body font-light flex items-center gap-1"
                  >
                    <AlertCircle size={14} />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-secondary mb-2 font-body font-light text-sm md:text-base">
                  <Phone size={18} className="text-primary flex-shrink-0" />
                  <span>{t('order.phone')} <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all font-body font-light ${
                    errors.phone
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  } outline-none`}
                  placeholder={t('order.phonePlaceholder')}
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-body font-light flex items-center gap-1"
                  >
                    <AlertCircle size={14} />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Quantity with +/- buttons */}
              <div>
                <label className="flex items-center gap-2 text-secondary mb-2 font-body font-light text-sm md:text-base">
                  <ShoppingCart size={18} className="text-primary flex-shrink-0" />
                  <span>{t('order.quantity')} <span className="text-red-500">*</span></span>
                </label>
                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-primary text-white rounded-lg p-2 hover:bg-primary/90 transition-colors"
                  >
                    <span className="text-xl font-light">−</span>
                  </motion.button>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    required
                    className={`flex-1 px-4 py-3 rounded-lg border text-center transition-all font-body font-light ${
                      errors.quantity
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    } outline-none`}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-primary text-white rounded-lg p-2 hover:bg-primary/90 transition-colors"
                  >
                    <span className="text-xl font-light">+</span>
                  </motion.button>
                </div>
                {errors.quantity && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-body font-light flex items-center gap-1"
                  >
                    <AlertCircle size={14} />
                    {errors.quantity}
                  </motion.p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-secondary mb-2 font-body font-light text-sm md:text-base block">
                  {t('order.address')} ({t('order.optional')})
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body font-light arabic-text"
                  placeholder={t('order.addressPlaceholder')}
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-secondary mb-2 font-body font-light text-sm md:text-base block">
                  {t('order.message')} ({t('order.optional')})
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body font-light resize-none arabic-text"
                  placeholder={t('order.messagePlaceholder')}
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 border-2 border-green-200 text-green-800 p-4 rounded-lg font-body font-light flex items-center gap-3"
                  >
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('order.successTitle')}</p>
                      <p className="text-sm">{t('order.success')}</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-lg font-body font-light flex items-center gap-3"
                  >
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{t('order.errorTitle')}</p>
                      <p className="text-sm">{t('order.error')}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="btn-primary w-full py-4 md:py-5 text-base md:text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>{t('order.submitting')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>{t('order.submit')}</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderForm;
