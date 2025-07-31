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
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
    const file = e.target.files[0];
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
      console.log(error);
    }
    finally {
      dispatch(setLoading(false));
    }
  };



  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <form onSubmit={submitHandler} className="w-full max-w-md sm:max-w-lg bg-card p-8 sm:p-10 rounded-md border border-border shadow-sm">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-foreground mb-6 sm:mb-8">
            Create Your Account
          </h1>
          <p className="text-center text-xs sm:text-sm text-muted-foreground  px-4 max-w-xs sm:max-w-md mx-auto">
            Join thousands of professionals and recruiters.</p>
          <p className="text-center text-xs sm:text-sm text-muted-foreground mb-8 px-4 max-w-xs sm:max-w-md mx-auto">
            Create your profile and find your next job or hire top talent with ease.
          </p>

          {/* Full Name */}
          <div className="mb-5">
            <Label htmlFor="name" className="block mb-2 text-sm sm:text-base font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Hardik Ashra"
              className="focus-visible:ring-primary py-2 sm:py-3 text-sm sm:text-base"

            />
          </div>

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

          {/* Mobile Number */}
          <div className="mb-5">
            <Label htmlFor="phone" className="block mb-2 text-sm sm:text-base font-medium">
              Mobile Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91 98765 43210"
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

          {/* Profile Photo Upload */}
          <div className="mb-9">
            <Label htmlFor="resume" className="block mb-2 text-sm sm:text-base font-medium">
              Upload Profile Photo
            </Label>
            <Input
              id="resume"
              type="file"
              accept="image/jpeg, image/png"
              onChange={changeFileHandler}
              className="file:bg-primary file:text-primary-foreground file:border-none file:rounded-md file:px-3 file:py-1.5 bg-background border border-border text-sm sm:text-base"
            />
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-xs">
              Max size 2MB. Helps recruiters recognize you.
            </p>
          </div>

          {/* Submit */}
          {
            loading ? <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 py-3 sm:py-4 text-base sm:text-lg font-semibold"
            disabled>
              <Loader2 className="mr-2 h-4 2-4 animate-spin" />Please Wait
            </Button>
              :
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 py-3 sm:py-4 text-base sm:text-lg font-semibold"
              >
                Sign Up
              </Button>
          }

          {/* Redirect */}
          <p className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
