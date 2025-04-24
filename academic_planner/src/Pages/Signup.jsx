import React, { useState } from "react";

const Signup = ({ switchToLogin, closeModal }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signed up as ${form.name}`);
    closeModal(); // Close the modal after successful signup
  };

  return (
    <div className="w-full max-w-md sm:p-10">
      <h2 className="mb-6 text-3xl font-extrabold text-center text-primary">
        Student Signup
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg"
          required
        />
        <button type="submit" className="py-2 text-white rounded bg-primary">
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="font-medium text-primary hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
