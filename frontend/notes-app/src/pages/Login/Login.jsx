import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address. ");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //login API call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      // handle successfull login request

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="w-96 border rounded-xl bg-white shadow-lg px-7 py-10 hover:shadow-2xl transition-shadow duration-300">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Login
            </h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full mt-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4 text-gray-700">
              Not registered yet?{""}
              <Link
                to="/signUp"
                className="font-medium text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
