import AuthLayout from "@/components/layout/Authlayout";
import { login } from "@/services";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { UserLoginDto } from "types";
import { Button, FormInput, IconGoogle } from "ui";
import * as Yup from "yup";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginPage = () => {
  const router = useRouter();
  let popup: Window | null = null;

  const handleGoogleAuth = () => {
    const authUrl = `${NEXT_PUBLIC_API_URL}/user/google`;
    popup = window.open(authUrl, "GoogleAuthPopup", "width=600,height=800");
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.isTrusted) {
      popup?.close();
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup]);

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
        const user = await login(values);
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
        Don&rsquo;t have an account?{" "}
        <Link href="/auth/register" className="text-primaryColor font-bold">
          Sign up
        </Link>
      </p>

      <h3 className="text-primaryColor mb-[40px] text-[28px] font-bold">
        Log in
      </h3>

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
          <Button
            type="submit"
            title="Log in"
            disabled={!isValid || isSubmitting}
            className="bg-primaryColor text-white"
            onClick={() => handleSubmit()}
          />

          <Button
            type="button"
            className="border border-gray-300"
            Icon={<IconGoogle />}
            title="Sign in with Google"
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

LoginPage.auth = { required: false };
LoginPage.Layout = AuthLayout;

export default LoginPage;
