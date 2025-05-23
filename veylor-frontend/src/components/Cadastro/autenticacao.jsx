"use client";
import { useRef } from "react";

export default function Autenticao({ email, onVerificado }) {
  const inputsRef = useRef([]);

  const handleChange = (e, i) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (i < inputsRef.current.length - 1) {
        inputsRef.current[i + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (i > 0) {
        inputsRef.current[i - 1].focus();
      }
    }
  };

  return (
    <form onSubmit={onVerificado} className="flex flex-col">
        {/* Title */} 
        <p className="font-semibold text-3xl">Autenticação</p>
        <div className="flex space-x-3 justify-center mt-5">
            {Array(4).fill(0).map((_, i) => (
            <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength={1}
                inputMode="numeric"
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="
                w-16 h-20
                text-center text-white text-2xl font-semibold
                border-1 border-[rgba(147,51,234,0.50)] rounded-lg
                outline-none appearance-none
                focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)]
                transition-all duration-200 ease-in-out
                [-moz-appearance:textfield]
                "
            />
            ))}
        </div>
        <p className="text-sm font-light mt-1">Insira o codigo de 4 digitos enviado para seu email.</p>
        {/* Botão de envio ou próximos passos */}
        <button
            type="submit"
            className="
            w-full max-w-[350px] 
            bg-[rgba(147,51,234,1)] 
            py-2 mt-5
            text-white text-xl font-semibold
            rounded-lg
            cursor-pointer
            hover:bg-purple-700 hover:scale-102
            transition-all transform duration-100 ease-in-out
            ">
            Avançar
        </button>
    </form>
  );
}
