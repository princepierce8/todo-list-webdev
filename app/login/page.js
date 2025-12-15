"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../_utils/auth-context";

export default function LoginPage() {
  const { login } = useUserAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}

      <form onSubmit={handleLogin} className="space-y-3">
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
          className="bg-blue-600 text-white w-full p-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Log In
        </button>
      </form>

      {/* SIGN UP LINK */}
      <p className="text-center mt-4">
        Don’t have an account?{" "}
        <a
          href="/signup"
          className="text-blue-600 underline cursor-pointer hover:text-blue-800"
        >
          Sign up here
        </a>
      </p>
    </main>
  );
}
