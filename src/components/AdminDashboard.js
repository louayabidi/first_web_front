import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ServiceContext } from "../context/ServiceContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
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

  // ✅ Fetch services
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
      setForm({ ...form, image: files[0] });
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
    // Send boolean as string to avoid backend issues
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
        setSuccess("✅ Service updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/services`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setSuccess("✅ Service added successfully!");
      }

      setForm({ title: "", description: "", link: "", image: null, isActive: true });
      setEditingId(null);
      document.getElementById("image-input").value = "";
      fetchServices();
      triggerRefresh();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save service");
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
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess("✅ Service deleted successfully!");
      fetchServices();
      triggerRefresh();
    } catch (err) {
      setError("Failed to delete service");
      console.error(err);
    }
  };

  return (
    <section className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <h2>{editingId ? "Edit Service" : "Add Service"}</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Title
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>

        <label>
          Link
          <input type="text" name="link" value={form.link} onChange={handleChange} placeholder="Optional" />
        </label>

        <label>
          Image
          <input id="image-input" type="file" name="image" accept="image/*" onChange={handleChange} required={!editingId} />
        </label>

        <label>
          Active
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
        </label>

        <button type="submit">{editingId ? "Update" : "Add"} Service</button>
      </form>

      <h2>Services List</h2>
      <div className="services-list">
        {services.map((service) => (
          <div key={service._id} className="service-item">
            {service.image && <img src={`${API_BASE_URL}${service.image}`} alt={service.title} />}
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.link && <p>Link: {service.link}</p>}
            <p>Status: {service.isActive ? "Active" : "Inactive"}</p>
            <button onClick={() => handleEdit(service)}>Edit</button>
            <button onClick={() => handleDelete(service._id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;
