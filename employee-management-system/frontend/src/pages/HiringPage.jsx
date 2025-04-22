import PageWrapper from "../components/PageWrapper";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Hiring() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    degreeCertificate: null,
    tenthGradeSheet: null,
    twelfthGradeSheet: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("position", form.position);
    formData.append("degreeCertificate", form.degreeCertificate);
    formData.append("tenthGradeSheet", form.tenthGradeSheet);
    formData.append("twelfthGradeSheet", form.twelfthGradeSheet);

    try {
      await axios.post("http://localhost:8080/api/candidates/apply", formData);
      toast.success("Application submitted successfully ✅");
      setForm({
        name: "",
        email: "",
        position: "",
        degreeCertificate: null,
        tenthGradeSheet: null,
        twelfthGradeSheet: null,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application ❌");
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-8 text-pink-600">Apply for Job 🎉</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-lg mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border"
        />
        <input
          type="text"
          name="position"
          placeholder="Position Applied For"
          value={form.position}
          onChange={handleChange}
          required
          className="w-full p-2 rounded-md border"
        />
        <div>
          <label>Degree Certificate</label>
          <input type="file" name="degreeCertificate" onChange={handleChange} required />
        </div>
        <div>
          <label>10th Grade Sheet</label>
          <input type="file" name="tenthGradeSheet" onChange={handleChange} required />
        </div>
        <div>
          <label>12th Grade Sheet</label>
          <input type="file" name="twelfthGradeSheet" onChange={handleChange} required />
        </div>
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
          Submit Application
        </button>
      </form>
    </PageWrapper>
  );
}
