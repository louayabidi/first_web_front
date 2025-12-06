import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';


// Lazy-loaded components
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));

const Restauration = lazy(() => import('./components/service_static/Restauration'));
const Facades = lazy(() => import('./components/service_static/Facades'));
const Appartement = lazy(() => import('./components/service_static/Appartement'));
const Luxury = lazy(() => import('./components/service_static/luxury'));
const Galleries = lazy(() => import('./components/service_static/Galleries'));
const Mesure = lazy(() => import('./components/service_static/Mesure'));
const Design = lazy(() => import('./components/service_static/Design'));
const FabricationGypsum = lazy(() => import('./components/service_static/FabricationGypsum'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Forgot = lazy(() => import('./pages/Forgot'));

const Immeuble = lazy(() => import('./components/Immeuble'));
const Professionel = lazy(() => import('./components/Professionel'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Navbar isAdmin={user?.role === 'admin'} />
      </Suspense>

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/forgot" element={<Forgot />} />
      
            <Route path="/services/restauration" element={<Restauration />} />  
            <Route path="/services/Facades" element={<Facades />} /> 
             <Route path="/services/Appartement" element={<Appartement />} /> 
            <Route path="/services/Luxury" element={<Luxury />} />  
            <Route path="/services/mesure" element={<Mesure />} />  
            <Route path="/services/design" element={<Design />} /> 
            <Route path="/services/Galleries" element={<Galleries />} />  
            <Route path="/services/fabrication-gypsum" element={<FabricationGypsum />} />  
            <Route
              path="/admin"
              element={
                user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAdmin={user?.role === 'admin'}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/immeuble" element={<Immeuble />} />
            <Route path="/professionel" element={<Professionel />} />
            <Route path="/restauration" element={<Restauration />} />
            <Route path="/appartement" element={<Appartement />} />
           
          </Routes>
        </Suspense>
      </main>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;