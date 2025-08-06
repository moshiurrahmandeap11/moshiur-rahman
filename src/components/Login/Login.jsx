import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";


const Login = () => {
  const { googleLogin, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Successfully Logged In")
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-8 text-white"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide">
          Welcome Back
        </h2>

        <form onSubmit={handleEmailLogin} className="space-y-6">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition rounded-md py-3 font-semibold text-lg shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        <p>Don't have an account? <Link className="text-orange-500" to={"/signup"}>Sign Up</Link> Now</p>
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
          <span>{loading ? "Processing..." : "Continue with Google"}</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
