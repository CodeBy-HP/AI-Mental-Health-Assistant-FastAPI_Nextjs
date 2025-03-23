"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData.username, formData.email, formData.password);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="h-10 w-10 rounded-md bg-gradient-to-r from-blue-400 to-indigo-700 flex items-center justify-center text-white font-bold mx-auto ">
          AI
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
          >
            Register
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login">
            <span className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
