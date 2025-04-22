import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Payroll() {
  const [employees, setEmployees] = useState([]);

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

  const handleUpdateSalary = async (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    const newSalary = prompt(`Current Salary: ₹${employee.salary}\nEnter new salary:`);

    if (!newSalary || isNaN(newSalary)) {
      toast.error("Please enter a valid salary amount ❌");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/payrolls/update-salary/${employeeId}`, {
        salary: parseFloat(newSalary),
      });

      toast.success("Salary updated successfully ✅");
      fetchEmployees();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update salary ❌");
    }
  };

  const handleHike = async (employeeId) => {
    try {
      await axios.put(`http://localhost:8080/api/payrolls/hike/${employeeId}`);
      toast.success("Hike applied successfully 🎉");
      fetchEmployees();
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply hike ❌");
    }
  };

  return (
    <PageWrapper>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-pink-600"
      >
        Payroll Section 💰
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Records</h2>

        <div className="overflow-x-auto">
          {employees.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No employees found.</p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-white/40">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Employee Name</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="bg-white/20 border-b hover:bg-white/30 transition"
                  >
                    <td className="px-6 py-4">{emp.id}</td>
                    <td className="px-6 py-4">{emp.name}</td>
                    <td className="px-6 py-4">₹ {emp.salary?.toLocaleString()}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleUpdateSalary(emp.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                      >
                        Update Salary
                      </button>
                      <button
                        onClick={() => handleHike(emp.id)}
                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                      >
                        Hike
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
