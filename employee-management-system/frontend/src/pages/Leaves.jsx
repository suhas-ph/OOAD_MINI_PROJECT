import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/leaves");
      setLeaves(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch leaves ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      try {
        await axios.delete(`http://localhost:8080/api/leaves/${id}`);
        toast.success("Leave deleted successfully ✅");
        fetchLeaves();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete leave ❌");
      }
    }
  };

  const handleEdit = (leave) => {
    navigate("/add-leave", { state: { leave } });
  };

  return (
    <PageWrapper>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-yellow-600"
      >
        Leaves Management 🌿
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Leave Requests</h2>
          <button
            onClick={() => navigate("/add-leave")}
            className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded transition"
          >
            Add Leave
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-white/40">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Employee ID</th>
                  <th className="px-6 py-3">Start Date</th>
                  <th className="px-6 py-3">End Date</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="bg-white/20 border-b hover:bg-white/30">
                    <td className="px-6 py-4">{leave.id}</td>
                    <td className="px-6 py-4">{leave.employeeId}</td>
                    <td className="px-6 py-4">{leave.startDate}</td>
                    <td className="px-6 py-4">{leave.endDate}</td>
                    <td className="px-6 py-4">{leave.reason}</td>
                    <td className="px-6 py-4">{leave.status}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEdit(leave)}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(leave.id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </PageWrapper>
  );
}
