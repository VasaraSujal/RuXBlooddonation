import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save to Redux and LocalStorage
      dispatch(setUser({ user: data.user, token: data.token }));

      onClose(); // close modal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
        <button onClick={onClose} className="mt-2 text-gray-500 w-full">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
