// src/pages/Auth/Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipaths";
import { UserContext } from "../../context/usercontext";
import { validateEmail } from "../../utilis/helper";
import { Button } from "@/components/ui/button";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ new loading state

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter Password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      // ✅ use _id from backend
      const { token, name, email: userEmail, profileImageUrl, _id } =
        response.data;

      if (token) {
        updateUser({
          token,
          name,
          email: userEmail,
          profileImageUrl,
          id: _id, // ✅ mapped correctly
        });

        navigate("/dashboard"); // redirect
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response&& error.response.data.message) {
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try agian")
      }
    } 
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        please enter your details to login
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <Button
          type="submit"
          className="text-white  cursor-pointer"
          style={{ backgroundColor: '#7B9ACC' }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </Button>

        <p className="text-[13px] text-slate-800 mt-3">
          don&apos;t have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            type="button"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
