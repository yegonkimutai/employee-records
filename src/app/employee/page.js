"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import LogoutButton from "../../../components/LogoutButton";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "" });
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => {
        console.error('Error fetching data', error)
        setError(error.message)
      });
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
  };

  const deleteEmployee = async (id) => {
    console.log("Deleting employee with ID:", id); // Debugging
    await axios.delete(`/api/employees?id=${id}`);
    fetchEmployees();
  };

  const startEditing = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
    });
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    try {
      await axios.put(`/api/employees?id=${editingEmployee._id}`, formData);
      setEditingEmployee(null);
      router.push("/employee")
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-20 bg-white shadow-md flex flex-col items-center py-6">
        <div className="text-green-500 font-bold text-lg">☰</div>
        <div className="mt-8 text-green-500">📂</div>
        <div className="mt-8 text-green-500">⚙️</div>
      </aside>

      <div>
      <LogoutButton />
    </div>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-md">
          <h2 className="text-blue-900 text-xl font-bold">Employees</h2>
          <button 
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => router.push("/add")}
          >
            Add New
          </button>
        </header>

        <section className="bg-white mt-6 p-6 rounded-md shadow-md flex justify-between">
          <h3 className="text-blue-900 text-lg font-bold">Josh Bakery Ventures</h3>
          <p className="text-blue-900">62, Bode Thomas, Surulere, Lagos</p>
        </section>

        <div className="mt-6 bg-white p-6 rounded-md shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-blue-900 bg-gray-100">
                <th className="py-3 px-4 text-left">First Name</th>
                <th className="py-3 px-4 text-left">Last Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } text-blue-900`}
                >
                  <td className="py-3 px-4">{employee.firstName}</td>
                  <td className="py-3 px-4">{employee.lastName}</td>
                  <td className="py-3 px-4">{employee.email}</td>
                  <td className="py-3 px-4">{employee.phone}</td>
                  <td className="py-3 px-4">{employee.role}</td>
                  <td className="py-3 px-4">
                  <button 
                      className="text-gray-500 hover:text-blue-500"
                      onClick={() => startEditing(employee)}
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => deleteEmployee(employee._id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96 text-black">
              <h2 className="text-blue-900 text-lg font-bold mb-4">Edit Employee</h2>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleEditChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleEditChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleEditChange}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={() => setEditingEmployee(null)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={submitEdit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
