import AuthLayout from "@/components/layout/Authlayout";
import { register } from "@/services";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { User } from "types";
import { Button, FormInput, IconGoogle } from "ui";
import * as Yup from "yup";

const RegisterPage = () => {
  const router = useRouter();
  const [isAgree, setIsAgree] = useState(false);

  const handleGoogleAuth = () => {
    window.location.href = "https://dev-api.meetstory.ai/auth/google";
  };

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
        const user = await register({
          email: values.email,
          password: values.password,
          name: values.name,
        });
        if (user.access_token) {
          router.push("/");
          toast.success("Login successful");
        } else {
          toast.error("wrong user email or password");
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

          <Button
            type="button"
            Icon={<IconGoogle />}
            className="border border-gray-300"
            title="Sign up with Google"
            onClick={() => handleGoogleAuth()}
          />

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

RegisterPage.auth = { required: false };
RegisterPage.Layout = AuthLayout;

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
