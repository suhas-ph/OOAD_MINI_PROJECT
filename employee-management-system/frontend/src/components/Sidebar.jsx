// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUserFriends, FaUserPlus, FaFileInvoiceDollar, FaClipboardList, FaUserCheck } from "react-icons/fa"; // ✅ Add icon

export default function Sidebar() {
  const links = [
    { path: "/", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/employees", name: "Employees", icon: <FaUserFriends /> },
    { path: "/add-employee", name: "Add Employee", icon: <FaUserPlus /> },
    { path: "/leaves", name: "Leaves", icon: <FaClipboardList /> },
    { path: "/payroll", name: "Payroll", icon: <FaFileInvoiceDollar /> },
    { path: "/hiring", name: "Hiring", icon: <FaUserCheck /> },
    { path: "/verify-dashboard", name: "Verification Requests", icon: <FaUserCheck /> },
  ];

  return (
    <div className="h-screen w-64 bg-white/20 backdrop-blur-lg shadow-xl border-r border-white/20 text-white p-5">
      <h1 className="text-2xl font-bold mb-10 text-white">Admin Panel 🚀</h1>
      <nav className="flex flex-col space-y-4">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className="flex items-center space-x-3 text-lg hover:bg-white/30 px-4 py-2 rounded-lg transition duration-300"
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
