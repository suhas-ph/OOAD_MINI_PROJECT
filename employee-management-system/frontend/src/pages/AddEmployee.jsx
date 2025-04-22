import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [form, setForm] = useState({
    id: null,
    name: "",
    department: "",
    email: "",
    salary: "",
    joinDate: new Date().toISOString().split("T")[0], // ✅ Auto-fill today's date
  });

  useEffect(() => {
    if (location.state && location.state.employee) {
      const employee = location.state.employee;

      setForm({
        id: employee.id,
        name: employee.name,
        department: employee.department,
        email: employee.email,
        salary: employee.salary,
        joinDate: employee.joinDate ? employee.joinDate : new Date().toISOString().split("T")[0],
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.id) {
        await axios.put(`http://localhost:8080/api/employees/${form.id}`, form);
        toast.success(`${form.name} updated successfully! 🎉`, { autoClose: 2000 });
      } else {
        await axios.post("http://localhost:8080/api/employees", form);
        toast.success(`${form.name} added successfully! 🎉`, { autoClose: 2000 });
      }

      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save employee ❌", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-purple-600"
      >
        {form.id ? "Update Employee ✏️" : "Add New Employee ➕"}
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-lg mx-auto space-y-6"
      >
        {["name", "department", "email", "salary", "joinDate"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field === "joinDate" ? "Join Date" : field}
            </label>
            <input
              type={
                field === "email"
                  ? "email"
                  : field === "salary"
                  ? "number"
                  : field === "joinDate"
                  ? "date"
                  : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              disabled={form.id && field === "joinDate"} // ✅ Disable joinDate if editing
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-white/70 p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          } text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              Saving...
            </>
          ) : form.id ? (
            "Update Employee"
          ) : (
            "Add Employee"
          )}
        </button>
      </motion.form>
    </PageWrapper>
  );
}
