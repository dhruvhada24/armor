import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VerifyUPI from "./pages/VerifyUPI";
import ReportFraud from "./pages/ReportFraud";
import { useEffect, useState } from "react";
import axios from "axios";

/* ====================== HOME PAGE ====================== */
function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 text-gray-800 flex flex-col min-h-screen"
    >
      {/* HERO SECTION */}
      <section className="text-center py-16 px-6 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to ARMOR</h1>
        <p className="text-gray-600 mb-10">
          Your trusted partner in fraud prevention and secure transactions.
        </p>

        <div className="max-w-3xl mx-auto h-64 bg-gray-200 rounded-xl flex items-center justify-center shadow-inner">
          <span className="text-gray-500">[ Banner Image / Animation Placeholder ]</span>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-10 text-center">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 hover:shadow-md transition text-center">
            <h3 className="text-xl font-semibold mb-2">Verify UPI</h3>
            <p className="text-gray-600 mb-4">
              Quickly verify UPI IDs to ensure safe and secure transactions.
            </p>
            <a
              href="/verify"
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Learn More
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 hover:shadow-md transition text-center">
            <h3 className="text-xl font-semibold mb-2">Report Fraud</h3>
            <p className="text-gray-600 mb-4">
              Report suspicious activities and help us combat fraud effectively.
            </p>
            <a
              href="/report"
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
        <h2 className="text-2xl font-semibold mb-10 text-center">User Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="italic text-gray-700 mb-3">
              “ARMOR has revolutionized how I handle online transactions. Highly recommend!”
            </p>
            <p className="text-gray-500 text-sm">– Dhruv Hada</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="italic text-gray-700 mb-3">
              “A must-have tool for anyone concerned about online security.”
            </p>
            <p className="text-gray-500 text-sm">– Sharanya Katna</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="italic text-gray-700 mb-3">
              “Efficient and reliable service. ARMOR gives me peace of mind.”
            </p>
            <p className="text-gray-500 text-sm">– Somil Nayak</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-gray-100">
        <h2 className="text-2xl font-semibold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">How does UPI verification work?</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              UPI verification checks the validity of a UPI ID by cross-referencing it with secure databases.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">What should I do if I suspect fraud?</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Immediately report any suspicious activity using the Report Fraud section and follow the provided guidelines to secure your account.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

/* ====================== ADMIN LOGIN ====================== */
function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "ArmorSecure@2025") {
      localStorage.setItem("armorAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Admin Login</h2>
        <p className="text-sm text-gray-500 mb-6">Authorized personnel only</p>

        <input
          type="password"
          placeholder="Enter admin password"
          className="border w-full p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}

/* ====================== ADMIN DASHBOARD ====================== */
function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("armorAdmin");
    if (!isAdmin) navigate("/admin");

    axios
      .get("http://localhost:5000/api/admin/reports")
      .then((res) => setReports(res.data))
      .catch(() => setReports([]));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("armorAdmin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {reports.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No reports available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-5 border">
              <h3 className="font-semibold text-blue-700 mb-2">{report.upiId}</h3>
              <p className="text-gray-700 mb-2">{report.description}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(report.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ====================== ROUTING ====================== */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify" element={<VerifyUPI />} />
        <Route path="/report" element={<ReportFraud />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

/* ====================== APP CONTAINER ====================== */
function AppContainer() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContainer />
    </Router>
  );
}
