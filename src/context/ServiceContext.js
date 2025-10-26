import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../services/api";

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(res.data.services);
        setError("");
      } catch (err) {
        console.error("ServiceContext Error:", err.response?.status, err.response?.data);
        setError("Failed to load services. Please try again later.");
      }
    };
    fetchServices();
  }, [refresh]);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <ServiceContext.Provider value={{ services, error, triggerRefresh }}>
      {children}
    </ServiceContext.Provider>
  );
};
