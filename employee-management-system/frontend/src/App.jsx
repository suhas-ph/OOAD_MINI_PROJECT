import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import AddLeave from "./pages/AddLeave"; 
import HiringPage from './pages/HiringPage.jsx';
import VerificationDashboard from "./pages/VerificationDashboard";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/add-leave" element={<AddLeave />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/verify-dashboard" element={<VerificationDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6">
            <AnimatedRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
