import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, useInView } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBullseye, FaComments, FaPaperPlane } from "react-icons/fa";
import contactImg from "../assets/heropic.png";
import API_BASE_URL from "../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", postalCode: "", objectif: "", message: ""
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const validateField = (name, value) => {
    const newErrors = {};
    if (name === "name" && !value.trim()) newErrors.name = "Le nom est requis";
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) newErrors.email = "Email invalide";
    if (name === "phone" && value && !/^\+?\d{8,15}$/.test(value.replace(/\s/g, ""))) 
      newErrors.phone = "Numéro invalide";
    if (name === "postalCode" && !value.trim()) newErrors.postalCode = "Code postal requis";
    if (name === "objectif" && !value.trim()) newErrors.objectif = "Objectif requis";
    if (name === "message" && !value.trim()) newErrors.message = "Message requis";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, ...validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = Object.keys(form).reduce((acc, key) => ({
      ...acc, ...validateField(key, form[key])
    }), {});

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus("Veuillez corriger les erreurs");
      return;
    }

    setLoading(true);
    setStatus("Envoi en cours...");

    try {
      await axios.post(`${API_BASE_URL}/api/contact`, form);
      setStatus("Message envoyé avec succès !");
      setForm({ name: "", email: "", phone: "", postalCode: "", objectif: "", message: "" });
      setErrors({});
    } catch (err) {
      setStatus("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { name: "name", label: "Nom Complet", icon: <FaUser />, placeholder: "Jean Dupont" },
    { name: "email", label: "E-mail", icon: <FaEnvelope />, placeholder: "exemple@gmail.com" },
    { name: "phone", label: "Téléphone", icon: <FaPhone />, placeholder: "+216 12 345 678" },
    { name: "postalCode", label: "Code Postal", icon: <FaMapMarkerAlt />, placeholder: "75000" },
    { name: "objectif", label: "Objectif du projet", icon: <FaBullseye />, placeholder: "Rénovation, décoration..." },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
            Contactez-nous
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
            DONNONS VIE À VOTRE PROJET
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partagez votre vision, nous la réalisons avec passion et expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-amber-200">
              <img
                src={contactImg}
                alt="Décoration intérieure"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-200">
                <div className="text-4xl font-black text-amber-600">500+</div>
                <p className="text-gray-700 font-medium">Projets réalisés</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-200">
                <div className="text-4xl font-black text-amber-600">100%</div>
                <p className="text-gray-700 font-medium">Clients satisfaits</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {inputFields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label} {field.name !== "phone" && "*"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-amber-600">
                      {field.icon}
                    </div>
                    <input
                      type={field.name === "email" ? "email" : "text"}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.name !== "phone"}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                  </div>
                  {errors[field.name] && (
                    <span className="text-red-600 text-sm mt-1">{errors[field.name]}</span>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <div className="relative">
                  <div className="absolute top-4 left- left-4 text-amber-600"><FaComments /></div>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Décrivez votre projet..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                  />
                </div>
                {errors.message && <span className="text-red-600 text-sm">{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py- py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>Envoi en cours...</>
                ) : (
                  <>
                    Envoyer le Message <FaPaperPlane />
                  </>
                )}
              </motion.button>

              {status && (
                <div className={`p-4 rounded-xl text-center font-medium ${
                  status.includes("succès") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {status}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;