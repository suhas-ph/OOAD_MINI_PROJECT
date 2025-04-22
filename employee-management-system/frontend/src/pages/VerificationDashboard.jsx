import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ⬅️ Import useNavigate
import PageWrapper from "../components/PageWrapper";

export default function VerificationRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); // ⬅️ Hook for navigation

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/verifications");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch verification requests ❌");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const remarks = prompt(`Enter remarks for ${status} status:`);

    if (!remarks) {
      toast.warning("Remarks are required ❗");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/verifications/${id}`, null, {
        params: {
          status,
          remarks,
        },
      });
      toast.success(`Marked as ${status} ✅`);
      fetchRequests();

      // ⬅️ Navigate to Employees page if APPROVED
      if (status === "APPROVED") {
        setTimeout(() => {
          navigate("/employees");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status ❌");
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Background Verification Requests 📋
      </h1>

      <div className="overflow-x-auto bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-lg">
        {requests.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No requests found.</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-white/40 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Documents</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Remarks</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b bg-white/20">
                  <td className="px-6 py-4">{req.candidateName}</td>
                  <td className="px-6 py-4">{req.email}</td>
                  <td className="px-6 py-4">{req.position}</td>
                  <td className="px-6 py-4 space-y-1">
                    <a
                      href={`http://localhost:8080/${req.degreeCertificatePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline block"
                    >
                      Degree
                    </a>
                    <a
                      href={`http://localhost:8080/${req.tenthMarksheetPath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline block"
                    >
                      10th
                    </a>
                    <a
                      href={`http://localhost:8080/${req.twelfthMarksheetPath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline block"
                    >
                      12th
                    </a>
                  </td>
                  <td className="px-6 py-4">{req.status}</td>
                  <td className="px-6 py-4">{req.remarks || "—"}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleUpdateStatus(req.id, "APPROVED")}
                      disabled={req.status !== "PENDING"}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleUpdateStatus(req.id, "REJECTED")}
                      disabled={req.status !== "PENDING"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageWrapper>
  );
}
