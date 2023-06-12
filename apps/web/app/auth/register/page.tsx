"use client";

import { User } from "types";
import { useFormik } from "formik";
import { Button, IconGoogle } from "ui";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { FormInput } from "@/components";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [isAgree, setIsAgree] = useState(false);

  const { handleSubmit, handleChange, isValid, isSubmitting, values, errors } =
    useFormik({
      validateOnChange: false,
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string()
          .email("Please enter your email")
          .required("This field is required"),
        password: Yup.string().required("This field is required"),
        name: Yup.string(),
      }),
      onSubmit: async (values) => {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          name: values.name,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result?.error);
        } else {
          toast.success("Login successful");
        }
      },
    });

  return (
    <div>
      <p className="text-grayColor mb-[30px] mt-[42px] hidden text-right md:block">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primaryColor font-bold">
          Login
        </Link>
      </p>
      <h3 className="text-textColor mb-5 text-[28px] font-bold md:mb-[40px]">
        Sign up
      </h3>

      <div className="grid w-full grid-cols-1 gap-5">
        <FormInput<User>
          errors={errors.name}
          value={values.name}
          onChange={handleChange}
          type="text"
          name="name"
          label="Name"
          placeholder="Eg. yushaku"
        />
        <FormInput<User>
          onChange={handleChange}
          errors={errors.email}
          value={values.email}
          type="email"
          name="email"
          label="Email"
          placeholder="Eg. abc@gmail.com"
        />
        <FormInput<User>
          onChange={handleChange}
          errors={errors.password}
          value={values.password}
          type="password"
          name="password"
          label="Password"
          placeholder="Eg.12*****"
        />

        <div className="mb-5 flex justify-between md:mb-[40px]">
          <label className="flexCenter gap-2">
            <input
              type="checkbox"
              className="accent-primaryColor h-5 w-5"
              onChange={() => setIsAgree(!isAgree)}
            />
            <p className="text-grayColor">
              I agree to the <LinkDocs title="Terms of Service" link="#" /> and{" "}
              <LinkDocs title="Privacy Policy" link="#" />.
            </p>
          </label>
        </div>

        <div className="flex flex-col gap-5">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="bg-primaryColor text-white"
            onClick={() => handleSubmit()}
            title="Sign Up"
          />

          <Button type="button" title="Sign up with Google" Icon={IconGoogle} />

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

export default RegisterPage;

const LinkDocs = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link
      href={link}
      className="text-primaryColor font-medium underline underline-offset-2"
    >
      {title}
    </Link>
  );
};
