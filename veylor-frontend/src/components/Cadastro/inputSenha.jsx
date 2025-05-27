"use client";

import { useState } from "react";
import PropTypes from 'prop-types';
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";

export default function InputSenha({ label, placeholder, inputKey, value, onChange, onBlur, error = false, errorMessage = ""}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[350px] space-y-1 relative">
      {/* Title */}
      <p className="text-sm font-extralight text-white">{label}</p>

      {/* Input container */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={inputKey}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full h-12
            px-5 pr-10
            appearance-none bg-transparent outline-none 
            font-light placeholder-white text-white 
            rounded-[10px] border border-[rgba(147,51,234,0.50)]
            focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)] focus:placeholder-transparent
            transition-all duration-200 ease-in-out
            peer
            ${error
              ? "border-red-500 focus:border-red-500 focus:bg-red-500/20"
              : "border-[rgba(147,51,234,0.50)] focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)]"
            }
          `}
        />

        {/* Ícone */}
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-200 transition-transform duration-300"
        >
        <span className="inline-block transition-transform duration-200 ease-in-out transform hover:scale-110">
            {showPassword ? <RiEyeCloseLine key="close" size={22} /> : <RiEye2Line key="open" size={22} />}
        </span>
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

InputSenha.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  inputKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};
