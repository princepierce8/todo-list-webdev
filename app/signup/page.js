"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../_utils/auth-context";

export default function SignupPage() {
  const { signup } = useUserAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    try {
      await signup(email, password);
      router.push("/");
    } catch (err) {
      setError("Signup failed. Password must be at least 6 characters.");
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSignup} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full p-2 rounded cursor-pointer hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
        >
          Log in
        </a>
      </p>
    </main>
  );
}
