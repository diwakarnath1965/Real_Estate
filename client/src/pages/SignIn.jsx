import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const { error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const API_URL = "/api/v1/auth/signin";
  const METHOD = "POST";
  const CONTENT_TYPE = "application/json";

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(signInStart());

    try {
      const res = await fetch(API_URL, {
        method: METHOD,
        headers: { "content-type": CONTENT_TYPE },
        body: JSON.stringify(formData),
      });

      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        dispatch(signInFailure("Please fill in all fields"));
        return;
      }

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error(error);
      }

      if (data.success === true) {
        dispatch(signInSuccess(data.user));

        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email@gmail.com"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? <div className="loader items-center"></div> : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
