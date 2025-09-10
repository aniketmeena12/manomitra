import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      {label && (
        <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      )}
      <div className="relative">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none border border-gray-300 rounded px-3 py-2 pr-10"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEye size={18} className="text-primary" />
            ) : (
              <FaRegEyeSlash size={18} className="text-slate-400" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
