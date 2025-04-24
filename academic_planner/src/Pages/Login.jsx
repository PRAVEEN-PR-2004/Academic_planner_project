import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios

const Login = ({ switchToSignup, closeModal }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5000/api/login", {
        email: form.email,
        password: form.password,
      });

      // ✅ Save token to localStorage after successful login
      localStorage.setItem("token", response.data.token);

      console.log("Login successful!");

      // Optionally close the modal and handle success
      closeModal();

      // You can now redirect or fetch user data using the token
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-md sm:p-10">
      <h2 className="mb-6 text-3xl font-extrabold text-center text-primary">
        Student Login
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <button type="submit" className="py-2 text-white rounded bg-primary">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <button
          onClick={switchToSignup}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
