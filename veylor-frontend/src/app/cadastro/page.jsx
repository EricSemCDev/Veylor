/* Depêndencias */
import BarraProgresso from "@/components/Cadastro/componentBarraProgresso";
import Link from 'next/link';

/* Icons */
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Login() {
  return (
    <main className="flex w-full h-full">

      <section className="w-1/2 border-r-1 border-[rgba(147,51,234,0.30)] relative">
        {/* Imagem de fundo */}
          <img src="/backgrounds/background-cadastro.png" alt="Fundo Veylor" className="absolute inset-0 w-full h-full rounded-tl-[20px] rounded-bl-[20px] object-cover z-0 brightness-[0.8]  drop-shadow-lg"/>
      </section>

      <section className="w-1/2 flex flex-col text-white">

        {/* Container Topo */} 
        <div className="flex justify-center relative w-full">
          {/* Barra de Progresso */} 
          <div className="z-10">
            <BarraProgresso />
          </div>
        
          {/* Prop do Dado */} 
          <img src="/props/propDado.png" alt="Dado" className="absolute right-0 top-0 w-[200px] z-0"/>
        </div>

        <Link href={"/"} className="cursor-pointer"><FaArrowCircleLeft/></Link>
        <p className="font-inter">Crie Sua Conta</p>

        <div>
          <p>Email</p>
          <input type="text" placeholder="Digite seu Email" className="w-50 font-extralight text-white" />
        </div>
        

        Cadastro
      </section>

    </main>
  );
}