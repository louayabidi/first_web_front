import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ServiceContext } from "../context/ServiceContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, 
  FaSignOutAlt, FaSave, FaTimes, FaCheck 
} from "react-icons/fa";
import API_BASE_URL from "../services/api";

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const { triggerRefresh } = useContext(ServiceContext);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fetchServices = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/services`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setServices(res.data.services);
    } catch (err) {
      setError("Failed to fetch services");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchServices();
    }
  }, [user, navigate, fetchServices]);

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else if (type === "checkbox") {
      setForm({ ...form, isActive: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.link) formData.append("link", form.link);
    formData.append("isActive", form.isActive ? "true" : "false");
    if (form.image) formData.append("image", form.image);

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/services/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccess("✅ Service mis à jour avec succès!");
      } else {
        await axios.post(`${API_BASE_URL}/api/services`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccess("✅ Service ajouté avec succès!");
      }

      setForm({ title: "", description: "", link: "", image: null, isActive: true });
      setEditingId(null);
      setImagePreview(null);
      document.getElementById("image-input").value = "";
      fetchServices();
      triggerRefresh();
    } catch (err) {
      setError(err.response?.data?.error || "Échec de l'enregistrement du service");
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setForm({
      title: service.title,
      description: service.description,
      link: service.link || "",
      image: null,
      isActive: service.isActive,
    });
    setEditingId(service._id);
    setImagePreview(null);
  };

  const handleCancelEdit = () => {
    setForm({ title: "", description: "", link: "", image: null, isActive: true });
    setEditingId(null);
    setImagePreview(null);
    document.getElementById("image-input").value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess("✅ Service supprimé avec succès!");
      fetchServices();
      triggerRefresh();
    } catch (err) {
      setError("Échec de la suppression du service");
      console.error(err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(218, 165, 32, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(218, 165, 32, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-amber-900/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-black mb-2" style={{
              background: 'linear-gradient(135deg, #fff 0%, #fbbf24 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ADMIN DASHBOARD
            </h1>
            <p className="text-gray-400">Gérer vos services et contenu</p>
          </div>
          <motion.button
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl hover:bg-red-500/30 transition-all"
          >
            <FaSignOutAlt /> <span>Déconnexion</span>
          </motion.button>
        </motion.div>

        {/* Status Messages */}
        {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl">{error}</motion.div>}
        {success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-xl">{success}</motion.div>}

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-12 bg-gray-100 border border-amber-500/20 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            {editingId ? <FaEdit className="text-amber-400" /> : <FaPlus className="text-amber-400" />}
            {editingId ? "Modifier le Service" : "Ajouter un Nouveau Service"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder="Nom du service"
                />
              </div>
              {/* Link */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lien (optionnel)</label>
                <input type="text" name="link" value={form.link} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                  placeholder="/services/exemple"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                placeholder="Description détaillée du service"
              />
            </div>

            {/* Image & Active */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image {!editingId && "*"}</label>
                <input id="image-input" type="file" name="image" accept="image/*" onChange={handleChange} required={!editingId}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-white file:cursor-pointer hover:file:bg-amber-600 focus:outline-none"
                />
                {imagePreview && <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-amber-500/30" />
                </motion.div>}
              </div>

              {/* Active Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                <div className="flex items-center gap-4 px-4 py-3 bg-white border border-gray-300 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="sr-only" />
                    <div className="relative">
                      {form.isActive ? <FaToggleOn className="text-4xl text-amber-400" /> : <FaToggleOff className="text-4xl text-gray-600" />}
                    </div>
                    <span className={`font-semibold ${form.isActive ? 'text-amber-400' : 'text-gray-500'}`}>
                      {form.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2">
                {editingId ? <FaSave /> : <FaPlus />} {editingId ? "Mettre à Jour" : "Ajouter"}
              </motion.button>
              {editingId && <motion.button type="button" onClick={handleCancelEdit} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-all flex items-center gap-2">
                <FaTimes /> Annuler
              </motion.button>}
            </div>
          </form>
        </motion.div>

        {/* Services List */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
            Liste des Services
          </h2>

          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div key={service._id} variants={itemVariants} whileHover={{ y: -5 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all">
                {service.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={`${API_BASE_URL}${service.image}`} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                        service.isActive ? 'bg-green-500/80 text-white' : 'bg-gray-500/80 text-gray-200'
                      }`}>
                        {service.isActive ? <FaCheck /> : <FaTimes />}
                        {service.isActive ? 'Actif' : 'Inactif'}
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                  {service.link && <p className="text-amber-400 text-xs mb-4">Lien: {service.link}</p>}
                  <div className="flex gap-3">
                    <motion.button onClick={() => handleEdit(service)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2">
                      <FaEdit /> Modifier
                    </motion.button>
                    <motion.button onClick={() => handleDelete(service._id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="flex-1 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center gap-2">
                      <FaTrash /> Supprimer
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {services.length === 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500">Aucun service disponible. Ajoutez-en un pour commencer!</motion.div>}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
