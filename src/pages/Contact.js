import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, useInView } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBullseye, FaComments, FaPaperPlane } from "react-icons/fa";
import contactImg from "../assets/heropic.png";
import API_BASE_URL from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    objectif: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Real-time validation
  const validateField = (name, value) => {
    const errors = {};
    if (name === "name" && !value.trim()) errors.name = "Le nom est requis";
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value))
      errors.email = "Format d'email invalide";
    if (name === "phone" && !/^\+?\d{10,}$/.test(value.replace(/\s/g, "")))
      errors.phone = "Numéro de téléphone invalide";
    if (name === "postalCode" && !value.trim())
      errors.postalCode = "Code postal requis";
    if (name === "objectif" && !value.trim())
      errors.objectif = "Objectif requis";
    if (name === "message" && !value.trim())
      errors.message = "Message requis";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, ...validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Object.keys(form).reduce((acc, key) => {
      return { ...acc, ...validateField(key, form[key]) };
    }, {});
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus("⚠️ Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    setLoading(true);
    setStatus("Envoi en cours...");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact`, form);
      if (res.data.success) {
        setStatus("✅ Message envoyé avec succès!");
        setForm({
          name: "",
          email: "",
          phone: "",
          postalCode: "",
          objectif: "",
          message: "",
        });
        setErrors({});
      } else {
        setStatus("❌ Échec de l'envoi du message.");
      }
    } catch (err) {
      setStatus("⚠️ Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const inputFields = [
    { name: "name", label: "Nom Complet", type: "text", icon: <FaUser />, placeholder: "Jean Dupont" },
    { name: "email", label: "E-mail", type: "email", icon: <FaEnvelope />, placeholder: "exemple@gmail.com" },
    { name: "phone", label: "Numéro de Téléphone", type: "tel", icon: <FaPhone />, placeholder: "+216 12 345 678" },
    { name: "postalCode", label: "Code Postal", type: "text", icon: <FaMapMarkerAlt />, placeholder: "75000" },
    { name: "objectif", label: "Objectif", type: "text", icon: <FaBullseye />, placeholder: "Rénovation, Design..." },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-black min-h-screen flex items-center"
      aria-labelledby="contact-heading"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(218, 165, 32, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(218, 165, 32, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-amber-900/20" />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium tracking-wider uppercase">
              Contactez-Nous
            </span>
          </motion.div>

          <motion.h1 
            id="contact-heading"
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black mb-6"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #fbbf24 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DONNONS VIE À VOTRE PROJET
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Partagez votre vision et transformons-la en réalité
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur-xl opacity-50" />
              
              <div className="relative">
                <img
                  src={contactImg}
                  alt="Inspiration décor en gypse"
                  loading="lazy"
                  className="w-full h-[500px] object-cover rounded-2xl border border-amber-500/30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">Excellence & Passion</h3>
                  <p className="text-gray-200">20+ années de savoir-faire artisanal</p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-amber-400 mb-1">500+</div>
                <div className="text-sm text-gray-300">Projets Réalisés</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-black text-amber-400 mb-1">100%</div>
                <div className="text-sm text-gray-300">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} noValidate>
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={containerVariants}
                  className="space-y-6"
                >
                  {/* Input Fields */}
                  {inputFields.map((field, index) => (
                    <motion.div key={field.name} variants={itemVariants}>
                      <label htmlFor={field.name} className="block text-sm font-semibold text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400">
                          {field.icon}
                        </div>
                        <input
                          id={field.name}
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={form[field.name]}
                          onChange={handleChange}
                          required
                          aria-invalid={!!errors[field.name]}
                          aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        />
                      </div>
                      {errors[field.name] && (
                        <motion.span 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          id={`${field.name}-error`} 
                          className="text-red-400 text-sm mt-1 block"
                        >
                          {errors[field.name]}
                        </motion.span>
                      )}
                    </motion.div>
                  ))}

                  {/* Message Field */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 text-amber-400">
                        <FaComments />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Décrivez votre projet en détail..."
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                      />
                    </div>
                    {errors.message && (
                      <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="message-error" 
                        className="text-red-400 text-sm mt-1 block"
                      >
                        {errors.message}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      aria-busy={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="group relative w-full"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 group-disabled:opacity-50" />
                      <button 
                        className="relative w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <span>Envoyer le Message</span>
                            <FaPaperPlane className="text-sm" />
                          </>
                        )}
                      </button>
                    </motion.button>
                  </motion.div>

                  {/* Status Message */}
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-center font-semibold ${
                        status.includes("✅") 
                          ? "bg-green-500/20 border border-green-500/50 text-green-300" 
                          : "bg-red-500/20 border border-red-500/50 text-red-300"
                      }`}
                    >
                      {status}
                    </motion.div>
                  )}
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;