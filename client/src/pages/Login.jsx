import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : location.state?.from?.pathname || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="font-display text-3xl text-espresso-800 mb-2 text-center">Welcome back</h1>
      <p className="text-espresso-500 text-center mb-8">Sign in to order, track, and reserve.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
        <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in..." : "Sign In"}</button>
      </form>

      <p className="text-center text-sm text-espresso-500 mt-6">
        Don't have an account? <Link to="/register" className="text-cinnamon-600 font-medium hover:underline">Create one</Link>
      </p>

      {/* <div className="mt-8 bg-cream-100 rounded-xl p-4 text-xs text-espresso-500">
        Admin demo login — email: <strong>admin@brewandbite.com</strong>, password: <strong>Admin@123</strong> (after running the seed script)
      </div> */}
    </div>
  );
};

export default Login;
