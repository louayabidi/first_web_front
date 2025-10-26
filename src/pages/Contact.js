import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import contactImg from "../assets/heropic.png";

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

  // Real-time validation
  const validateField = (name, value) => {
    const errors = {};
    if (name === "name" && !value.trim()) errors.name = "Name is required";
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value))
      errors.email = "Invalid email format";
    if (name === "phone" && !/^\+?\d{10,}$/.test(value.replace(/\s/g, "")))
      errors.phone = "Invalid phone number";
    if (name === "postalCode" && !value.trim())
      errors.postalCode = "Postal code is required";
    if (name === "objectif" && !value.trim())
      errors.objectif = "Objective is required";
    if (name === "message" && !value.trim())
      errors.message = "Message is required";
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
      setStatus("⚠️ Please correct the errors in the form.");
      return;
    }

    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", form);
      if (res.data.success) {
        setStatus("✅ Message sent successfully!");
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
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      setStatus("⚠️ Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page" aria-labelledby="contact-heading">
      <div className="contact-card">
        <div className="contact-image">
          <img
            src={contactImg}
            alt="Gypsum decor inspiration"
            loading="lazy"
            className="contact-image__img"
          />
        </div>

        <div className="contact-form-area">
          <h1 id="contact-heading">Contactez-moi</h1>
          <p>Donnons vie à votre idée de design en gypse.</p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">
              Nom
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Le nom complet"
                value={form.name}
                onChange={handleChange}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error">
                  {errors.name}
                </span>
              )}
            </label>

            <label htmlFor="email">
              E-mail
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="error">
                  {errors.email}
                </span>
              )}
            </label>

            <label htmlFor="phone">
              Numéro de téléphone
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+216 12 345 678"
                value={form.phone}
                onChange={handleChange}
                required
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <span id="phone-error" className="error">
                  {errors.phone}
                </span>
              )}
            </label>

            <label htmlFor="postalCode">
              Code postal
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                placeholder="e.g. 75000"
                value={form.postalCode}
                onChange={handleChange}
                required
                aria-invalid={!!errors.postalCode}
                aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
              />
              {errors.postalCode && (
                <span id="postalCode-error" className="error">
                  {errors.postalCode}
                </span>
              )}
            </label>

            <label htmlFor="objectif">
              Objectif
              <input
                id="objectif"
                type="text"
                name="objectif"
                placeholder="Votre objectif"
                value={form.objectif}
                onChange={handleChange}
                required
                aria-invalid={!!errors.objectif}
                aria-describedby={errors.objectif ? "objectif-error" : undefined}
              />
              {errors.objectif && (
                <span id="objectif-error" className="error">
                  {errors.objectif}
                </span>
              )}
            </label>

            <label htmlFor="message">
              Message
              <textarea
                id="message"
                name="message"
                placeholder="Écrivez votre message ici..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span id="message-error" className="error">
                  {errors.message}
                </span>
              )}
            </label>

            <button type="submit" disabled={loading} aria-busy={loading}>
              {loading ? (
                <span className="loading-spinner">⏳ En cours d’envoi...</span>
              ) : (
                "Envoyer"
              )}
            </button>

            {status && (
              <p className={`status ${status.includes("✅") ? "success" : "error"}`}>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;