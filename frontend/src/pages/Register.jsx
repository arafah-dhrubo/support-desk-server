import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUnlock,
  AiOutlineUser,
} from "react-icons/ai";
import { IoLogoGoogle } from "react-icons/io";
import { CgFacebook } from "react-icons/cg";
import { FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import Spinner from "./Spinner";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();

  const { username, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) {
      navigate("/support");
    }
    dispatch(reset());
  }, [isError, message, isSuccess, user, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      toast.error("Username required");
    }
    if (!email) {
      toast.error("Email required");
    }
    if (!password) {
      toast.error("Password required");
    }
    if (!password2) {
      toast.error("Confirm password required");
    }
    if (password && password2 && password !== password2) {
      toast.error("Passwords unmatched");
    }

    if (username && email && password === password2) {
      if (password.length < 6) {
        toast.error("Password length is lower than 6");
      } else {
        const userData = {
          username,
          email,
          password,
        };

        dispatch(register(userData));
      }
    }
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <section className="bg-blue-50 w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-2/6 p-10 mx-auto rounded">
        <h1 className="text-4xl font-bold text-center">Create Account</h1>
        <p className="text-center text-gray-500 font-semibold">
          Please create an account from here.
        </p>
        <form onSubmit={onSubmit} className="mt-6">
          <div className="flex items-center gap-2 my-2 w-full">
            <AiOutlineUser className="text-xl text-blue-600" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChange}
              className="border-2 rounded px-2 py-2 outline-none w-full duration-300 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 my-2 w-full">
            <AiOutlineMail className="text-xl text-blue-600" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="username"
              value={email}
              onChange={onChange}
              className="border-2 rounded px-2 py-2 outline-none  w-full duration-300 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 my-2 w-full">
            <AiOutlineLock className="text-xl text-blue-600" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={onChange}
              className="border-2 rounded px-2 py-2 outline-none duration-300 w-full focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 my-2 w-full">
            <AiOutlineUnlock className="text-xl text-blue-600" />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={password2}
              onChange={onChange}
              className="border-2 rounded px-2 py-2 outline-none  w-full duration-300 focus:border-blue-500"
            />
          </div>
          <input
            type="submit"
            value="Create Account"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-full py-2 rounded cursor-pointer"
          />
        </form>
        <p className="text-gray-600 my-3 text-center font-semibold">
          Already member?{" "}
          <Link to="/login" className="text-blue-600">
            login here
          </Link>
        </p>
        <div className="flex items-center gap-5 my-2">
          <hr className="w-full" />
          <p className="text-gray-600 font-semibold">Or</p>
          <hr className="w-full" />
        </div>
        <div className="flex items-center gap-5 justify-content-between">
          <div
            style={{ backgroundColor: "#4285F4" }}
            className="flex items-center w-full cursor-pointer p-2 gap-2 text-white rounded"
          >
            <IoLogoGoogle />
            Google
          </div>
          <div
            style={{ backgroundColor: "#4267B2" }}
            className="flex items-center w-full cursor-pointer p-2 gap-2 text-white rounded"
          >
            <CgFacebook />
            Facebook
          </div>
          <div
            style={{ backgroundColor: "#171515" }}
            className="flex items-center w-full cursor-pointer p-2 gap-2 text-white rounded"
          >
            <FiGithub />
            Github
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
