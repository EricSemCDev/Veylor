"use client";

/* Depêndencias */
import BarraProgresso from "@/components/Cadastro/componentBarraProgresso";
import Link from 'next/link';
import { useState } from "react";

/* Icons */
import { FaArrowCircleLeft } from "react-icons/fa";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";

export default function Login() {
  /* Variavel de Controle de senha (Se esta visivel) */
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex w-full h-full">
      {/* Section lado esquerdo */}
      <section className="w-1/2 border-r-1 border-[rgba(147,51,234,0.30)] relative">
        {/* Imagem de fundo */}
          <img src="/backgrounds/background-cadastro.png" alt="Fundo Veylor" className="absolute inset-0 w-full h-full rounded-tl-[20px] rounded-bl-[20px] object-cover z-0 brightness-[0.8]  drop-shadow-lg"/>
      </section>
      {/* Section lado direito */}   
      <section className="w-1/2 flex flex-col items-center text-white">
        {/* Container Topo */} 
        <div className="flex justify-center relative w-full">
          {/* Barra de Progresso */} 
          <div className="z-10">
            <BarraProgresso />
          </div>
        
          {/* Prop do Dado */} 
          <img src="/props/propDado.png" alt="Dado" className="absolute right-0 top-0 w-[200px] z-0"/>
        </div>

        <div 
        className="
        w-2/3 h-full
        flex flex-col
        p-5 m-10 space-y-3
        
        ">
          {/* Voltar a HomePage */} 
          <Link href="/" className="inline-block w-fit">
            <FaArrowCircleLeft
              className="
                text-[rgba(147,51,234,1)] text-2xl
                hover:scale-130 hover:animate-pulse
                transition-transform duration-300 ease-in-out
                cursor-pointer
              "
            />
          </Link>

          {/* Title */} 
          <p className="font-semibold text-3xl">Crie Sua Conta</p>

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
          <div className="w-full max-w-[350px] space-y-1">
            {/* Title */} 
            <p className="text-sm font-extralight">Senha</p>
            {/* Input */} 
            <input type="text" placeholder="Digite sua Senha" 
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

        </div>

      </section>

    </main>
  );
}