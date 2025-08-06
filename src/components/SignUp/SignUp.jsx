import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Link } from "react-router";
import toast from "react-hot-toast";


const SignUp = () => {
  const { googleLogin, createUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

   const handleEmailSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await createUser(email, password);
      toast.success("Account created successfully!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google signup/login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Successfully logged in")
    } catch (error) {
      toast.error("Google signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-8 text-white"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
          Create an Account
        </h2>

        <form onSubmit={handleEmailSignUp} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-300">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-4 py-3 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition rounded-md py-3 font-semibold text-lg shadow-md"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p>Already have an account? <Link className="text-orange-500" to={"/login"}>Login</Link> now</p>
        </form>

        <div className="my-6 flex items-center justify-center gap-3">
          <span className="text-gray-500">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 transition rounded-md py-3 font-semibold text-lg shadow-md border border-gray-600"
        >
          <FaGoogle size={22} />
          <span>{loading ? "Processing..." : "Sign Up with Google"}</span>
        </button>
      </motion.div>
    </div>
  );
};

export default SignUp;
