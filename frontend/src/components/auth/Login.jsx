import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoginLoading, setUser } from "@/redux/authSlice";
// import store from "@/redux/store";
import { Loader2 } from "lucide-react";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",

  });
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoginLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.log(error);
      
    }
    finally {
     dispatch(setLoginLoading(false));

    }
  };
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <form onSubmit={submitHandler} className="w-full max-w-md sm:max-w-lg bg-card p-8 sm:p-10 rounded-md border border-border shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-foreground mb-1">
            Welcome Back to TalentHive
          </h1>
          <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 px-6 max-w-xs sm:max-w-md mx-auto">
            Log in to find your next job or manage your hiring process seamlessly.
          </p>
          {/* Email */}
          <div className="mb-5">
            <Label htmlFor="email" className="block mb-2 text-sm sm:text-base font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="hardik@email.com"
              className="focus-visible:ring-primary py-2 sm:py-3 text-sm sm:text-base"

            />
          </div>
          {/* Password */}
          <div className="mb-7">
            <Label htmlFor="password" className="block mb-2 text-sm sm:text-base font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Create a strong password"
              className="focus-visible:ring-primary py-2 sm:py-3 text-sm sm:text-base"
            />
          </div>

          {/* Role */}
          <fieldset className="mb-7">
            <legend className="mb-3 text-sm sm:text-base font-semibold text-foreground">
              Registering As
            </legend>
            <div className="flex gap-8 text-sm sm:text-base">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  value="student"
                  className="accent-primary w-4 h-4 sm:w-5 sm:h-5"

                />
                Job Seeker
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="accent-primary w-4 h-4 sm:w-5 sm:h-5"

                />
                Recruiter
              </label>
            </div>
          </fieldset>


          {
            loading ? <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 py-3 sm:py-4 text-base sm:text-lg font-semibold"
            >
              <Loader2 className="mr-2 h-4 2-4 animate-spin" />Please Wait
            </Button>
              :
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 py-3 sm:py-4 text-base sm:text-lg font-semibold"
              >
                Login
              </Button>
          }
          {/* Submit */}


          {/* Redirect */}
          <p className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
