"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("User registered:", data);
          router.push("/employee");
        } else {
          console.error("Signup failed:", await response.json());
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      {/* Left Side - Image Section */}
      <div className="hidden md:flex w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bakery.jpg')" }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center text-white text-center p-6">
          <div>
            <h2 className="text-2xl font-bold">No Hazzles</h2>
            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black">
          <h2 className="text-2xl font-bold text-navy-900 text-center">Create your free account</h2>
          <p className="text-sm text-center mt-2">
            Already registered? <Link href="/login" className="text-green-500">Sign in</Link>
          </p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="border p-3 rounded w-full" required />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-3 rounded w-full" required />
            </div>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-3 rounded w-full mt-4" required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-3 rounded w-full mt-4" required />
            <button type="submit" className="bg-green-500 text-white py-3 rounded w-full mt-4">Continue</button>
          </form>
          <p className="text-xs text-center mt-4 text-gray-500">
            By signing up, you agree to our <Link href="/terms" className="text-green-500">Terms</Link> and <Link href="/privacy" className="text-green-500">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
