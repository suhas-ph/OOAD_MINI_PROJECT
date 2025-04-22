// src/pages/Employees.jsx
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch employees ❌");
    }
  };

  const handleDelete = async (employeeId, employeeName) => {
    if (window.confirm(`Are you sure you want to delete ${employeeName}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);
        toast.success(`${employeeName} deleted successfully ✅`);
        fetchEmployees();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete employee ❌");
      }
    }
  };

  const handleEdit = (employee) => {
    navigate("/add-employee", { state: { employee } });
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-green-600"
      >
        Employees Page 👥
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Employee List</h2>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded-md border shadow-sm focus:ring focus:ring-green-500 focus:border-green-500 bg-white/70 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          {filteredEmployees.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No employees found.</p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-white/40">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Join Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="bg-white/20 border-b hover:bg-white/30 transition"
                  >
                    <td className="px-6 py-4">{emp.id}</td>
                    <td className="px-6 py-4">{emp.name}</td>
                    <td className="px-6 py-4">{emp.department}</td>
                    <td className="px-6 py-4">{emp.email}</td>
                    <td className="px-6 py-4">₹ {emp.salary?.toLocaleString()}</td>
                    <td className="px-6 py-4">{emp.joinDate || "N/A"}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id, emp.name)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </PageWrapper>
  );
}
