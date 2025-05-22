"use client";

import { useState } from "react";
import InputSenha from "@/components/Cadastro/inputSenha";
import Link from "next/link";

export default function FormCadastro() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
    confirmarSenha: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="space-y-3">
        {/* Container Email */} 
        <div className="w-full max-w-[350px] space-y-1">
        {/* Title */} 
        <p className="text-sm font-extralight">Email</p>
        {/* Input */} 
        <input type="text" placeholder="Digite seu Email" 
        className="
        w-full h-12
        px-5
        appearance-none bg-transparent outline-none 
        font-light placeholder-white text-white 
        rounded-[10px] border-1 border-[rgba(147,51,234,0.50)]
        focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)] focus:placeholder-transparent
        transition-all duration-200 ease-in-out
        peer
        "/>
        </div>

        {/* Container Senha */} 
        <InputSenha 
        label="Senha"
        placeholder="Digite sua Senha"
        inputKey="senha"
        value={form.senha}
        onChange={handleChange}
        />

        {/* Confirmar Senha */} 
        <InputSenha 
        label="Confirmação"
        placeholder="Confirme sua Senha"
        inputKey="confirmarSenha"
        value={form.confirmarSenha}
        onChange={handleChange}
        />

      {/* Botão de envio ou próximos passos */}
      <button
        type="submit"
        className="
        w-full max-w-[350px] 
        bg-[rgba(147,51,234,1)] 
        py-2 mt-3
        text-white text-xl font-semibold
        rounded-lg
        cursor-pointer
        hover:bg-purple-700 hover:scale-102
        transition-all transform duration-100 ease-in-out
        ">
        Avançar
      </button>

      <div className="w-full max-w-[350px] flex space-x-1 text-[14px] flex justify-end">
        <p>Já tem uma Conta?</p>
        <Link href={"/login"} className="text-[rgba(147,51,234,1)] hover:scale-110 hover:font-bold transition-all transform duration-50 ease-in-out">Log In</Link>
      </div>
    </form>
  );
}
