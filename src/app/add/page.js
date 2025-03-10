"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Staff",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/employees", formData); 
      router.push("/employee"); 
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-blue-900 text-lg font-bold mb-4">Add Employee</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 text-black">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}
