// src/pages/Dashboard.jsx
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  useEffect(() => {
    toast.success("Dashboard Loaded Successfully 🎉", { autoClose: 2000 });
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Payroll Processed (%)",
        data: [80, 85, 90, 95, 100],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  };

  return (
    <PageWrapper>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-blue-600"
      >
        Welcome to the Dashboard 🚀
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          { title: "Total Employees", value: "120", color: "text-green-600" },
          { title: "Leaves Pending", value: "5", color: "text-red-500" },
          { title: "Payroll Processed", value: "95%", color: "text-blue-500" },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl text-center hover:scale-105 transition transform duration-300"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
            <p className={`text-2xl font-bold mt-2 ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payroll Progress Chart 📊</h2>
        <Bar data={data} />
      </motion.div>
    </PageWrapper>
  );
}
