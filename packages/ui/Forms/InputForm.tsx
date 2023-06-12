"use client";

import { IconEyeSlash, IconEye } from "..";
import { useState } from "react";

type Props<TType> = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errors?: string;
  name: keyof TType;
};

export function FormInput<TType>({
  errors,
  type,
  label,
  ...props
}: Props<TType>) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  let className =
    "mt-3 h-[52px] w-full appearance-none rounded-[8px] border bg-white px-[20px] py-[15px] text-sm text-[#627480] placeholder-[#A3A9B1] focus:outline-none md:text-base";

  if (errors) {
    className += " border-red-700 text-red-700 placeholder-red-400";
  }

  return (
    <div className="relative">
      {label && (
        <label className="text-grayColor mb-3 text-base font-bold">
          {label}
        </label>
      )}

      <input
        type={isShowPassword ? "text" : type}
        className={className}
        {...props}
      />

      {type === "password" && (
        <span
          className="absolute right-5 top-12 z-10"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? <IconEyeSlash /> : <IconEye />}
        </span>
      )}
    </div>
  );
}
