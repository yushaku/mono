"use client";

import { UserLoginDto } from "types";
import { useFormik } from "formik";
import { IconGoogle } from "ui";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import { FormInput } from "@/components";
import { login } from "@/services/auth";

const LoginPage = () => {
  const { handleSubmit, handleChange, isValid, isSubmitting, values, errors } =
    useFormik({
      validateOnChange: false,
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .email("Please enter your email")
          .required("This field is required"),
        password: Yup.string().required("This field is required"),
      }),
      onSubmit: async (values) => {
        console.log(values);
        login(values);
      },
    });

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-5">
        <FormInput<UserLoginDto>
          errors={errors.email}
          onChange={handleChange}
          value={values.email}
          type="email"
          name="email"
          label="Email"
          placeholder="Eg. abc@gmail.com"
        />

        <FormInput<UserLoginDto>
          errors={errors.password}
          value={values.password}
          onChange={handleChange}
          type="password"
          name="password"
          label="Password"
          placeholder="Eg.12*****"
        />

        <div className="mb-[40px] flex justify-between">
          <Link href="#" className="baseText">
            Forgot Password?
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`flexCenter h-[52px] rounded-lg border text-xl font-bold text-white lg:w-[275px] ${
              isValid ? "bg-primaryColor" : "bg-primaryColor/50"
            }`}
            onClick={() => handleSubmit()}
          >
            Log in
          </button>

          <button
            type="button"
            className="flexCenter text-grayColor h-[52px] gap-3 rounded-lg border text-lg font-medium lg:w-[275px]"
          >
            <IconGoogle />
            Log in with the Google
          </button>

          <p className="text-grayColor mt-[22px] text-center md:hidden">
            Don&rsquo;t have an account?{" "}
            <Link href="/auth/register" className="text-primaryColor font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
