import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // TODO: Add API call

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //signup api call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      // handle successfull registration request

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

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
      <div className="flex items-center justify-center mt-28 min-h-[70vh] bg-gradient-to-r from-green-50 via-yellow-50 to-pink-50 p-4">
        <div className="w-96 border rounded-xl bg-white shadow-lg px-7 py-10 hover:shadow-2xl transition-shadow duration-300">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500">
              Sign Up
            </h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full mt-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-yellow-500 hover:from-yellow-500 hover:to-green-500 text-white transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Create Account
            </button>

            <p className="text-sm text-center mt-4 text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-800 underline transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
