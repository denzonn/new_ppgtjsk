import React, { useEffect } from "react";
import Input from "../../../component/Input";
import Button from "../../../component/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validateLogin } from "../../../validation/auth";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: (values) => {
      axios
        .post("/login", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          Cookie.set("token", res?.data?.data?.token);

          toast.success("Berhasil Login");
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  const token = Cookie.get("token");

  useEffect(() => {
    if (token) {
      navigate("/admin-dashboard");
    }
  }, [token]);

  return (
    <div className="grid grid-cols-2">
      <div className="px-32 w-10/12 flex flex-col justify-center font-opensans">
        <div className="text-2xl text-[#344767] font-semibold mb-2 font-poppins">
          Sign In
        </div>
        <div className="text-base text-[#67748e] tracking-normal mb-4 font-thin">
          Enter your email and password to sign in
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Input
              login
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 focus:outline-red-500 text-sm font-normal mb-9 md:mb-4">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div>
            <Input
              login
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 focus:outline-red-500 text-sm font-normal mb-9 md:mb-4">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="mt-3">
            <Button
              label="Sign In"
              type="submit"
              className="w-full py-3 bg-[#5e72e4] font-semibold text-sm"
            />
          </div>
        </form>
        <div className="text-center text-[#67748e] mt-4 font-thin text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#5e72e4]">
            Sign up
          </Link>
        </div>
      </div>
      <div className="w-full h-[100vh] p-5 lg:block hidden">
        <div className="w-full h-full rounded-3xl bgImage relative">
          <div className="absolute top-0 left-0 w-full h-full bg-primaryButton rounded-3xl bg-opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-white text-center">
            <div className="text-3xl font-roboto">"Kader Siap Utus"</div>
            <div className="text-lg mt-2 font-poppins font-extralight">
              Website Resmi PPGT Jemaat Satria Kasih
            </div>
            <div className="text-lg font-poppins font-extralight">
              Klasis Makassar Timur
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
