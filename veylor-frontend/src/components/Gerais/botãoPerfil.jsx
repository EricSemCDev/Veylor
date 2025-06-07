"use client";
/* Dependencias */
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

/* Icons */
import { BsPersonFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { FaHatWizard } from "react-icons/fa";
import { GiDiceShield } from "react-icons/gi";


export default function BotaoPerfil({ role, setRole }) {
  const { usuario, logout } = useAuth();
  const [ativo, setAtivo] = useState(false)
  const router = useRouter();

  return (
    <div> 
        <button onClick={() => setAtivo(ativo === true ? false : true)} className={`
        h-11 
        top-4
        absolute
        flex items-center
        bg-[rgba(13,1,31,0.60)]
        border-1 border-[rgba(147,51,234,0.30)] rounded-full
        text-white
        cursor-pointer group
        hover:border-[rgba(147,51,234,1)] hover:bg-[rgba(147,51,234,0.60)] hover:scale-120
        transition-all duration-300 ease-in-out transform
        select-none
        ${ ativo === true ? "right-10 w-full max-w-50 scale-120 px-1" : "right-6 w-full max-w-11 justify-center"}
        `}>
          {!ativo && (
            <BsPersonFill className="text-lg transform transition-all duration-400 ease-in-out" />
          )}
            {ativo && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 150, damping: 20, mass: 1, }}
                className="flex items-center space-x-2 px-1 w-full"
              >
                <img
                  src={`http://localhost:3001${usuario?.foto}`}
                  alt="ERRO"
                  className="w-full max-w-7 h-full max-h-7 rounded-full border-1 border-[rgba(147,51,234,1)]"
                />
                <div className="flex flex-col items-start justify-center w-fitx'">
                  <p className="text-[12px] font-medium">{usuario?.nomeCompleto}</p>
                  <div className="w-full h-[1px] bg-white/30 rounded-full"></div>
                  <p className="text-[9px] italic font-light text-white/80">{usuario?.email}</p>
                </div>
              </motion.div>
            )}
        </button>

        {ativo && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 150, damping: 20, mass: 1, }}
            className="
            w-full max-w-50
            right-10 top-20
            absolute
            flex justify-center items-center 
            space-x-2
            scale-120
            "
          >
            {/* Botão Minha Conta */}
            <ul className="w-full max-w-42 flex-col items-center space-y-1">
              <li className="
              px-6 py-2 w-full
              border-t-1 border-b-1 border-[rgba(147,51,234,0.30)] rounded-lg
              cursor-pointer
              flex items-center gap-x-3
              group
              hover:border-[rgba(147,51,234,1)] hover:scale-105
              transition-all duration-300 ease-in-out transform
              select-none
              ">
                <MdManageAccounts className="text-lg group-hover:scale-120 group-hover:drop-shadow-[0_0_3px_rgb(147,51,234)] text-[rgba(147,51,234,1)] transition-all duration-300 ease-in-out transform"/>
                <p className="text-sm font-light group-hover:drop-shadow-[0_0_3px_rgb(147,51,234)] transition-all duration-300 ease-in-out transform">Minha conta</p>
              </li>

              {/* Botão Troca de Role */}

                {role === "jogador" && (
                  <>
                    <li onClick={() => { setRole('mestre'); setAtivo(false);}} className="
                    px-6 py-2 w-full
                    border-t-1 border-b-1 border-[rgba(234,51,51,0.3)] rounded-lg
                    cursor-pointer
                    flex items-center gap-x-3
                    group
                    hover:border-[rgba(234,51,51,1)] hover:scale-105
                    transition-all duration-300 ease-in-out transform
                    select-none
                    ">
                      <FaHatWizard className="text-lg group-hover:scale-120 group-hover:drop-shadow-[0_0_3px_rgb(234,51,51)] text-[rgba(234,51,51,1)] transition-all duration-300 ease-in-out transform"/>
                      <p className="text-sm font-light group-hover:drop-shadow-[0_0_3px_rgb(234,51,51)] transition-all duration-300 ease-in-out transform select-none">Virar Mestre</p>
                    </li>
                  </>
                )}
                {role === "mestre" && (
                  <>
                    <li onClick={() => { setRole('jogador'); setAtivo(false);}} className="
                    px-6 py-2 w-full
                    border-t-1 border-b-1 border-[rgba(80,51,234,0.3)] rounded-lg
                    cursor-pointer
                    flex items-center gap-x-3
                    group
                    hover:border-[rgba(80,51,234,1)] hover:scale-105
                    transition-all duration-300 ease-in-out transform
                    select-none
                    ">
                      <GiDiceShield className="text-lg group-hover:scale-120 group-hover:drop-shadow-[0_0_3px_rgb(80,51,234)] text-[rgba(80,51,234,1)] transition-all duration-300 ease-in-out transform"/>
                      <p className="text-sm font-light group-hover:drop-shadow-[0_0_3px_rgb(80,51,234)] transition-all duration-300 ease-in-out transform">Virar Jogador</p>
                    </li>
                  </>
                )}
              

              {/* Botão Sair */}
              <li onClick={() => { router.push("/login"); logout(); }} className="
              px-6 py-2 w-full
              border-t-1 border-b-1 border-[rgba(147,51,234,0.30)] rounded-lg
              cursor-pointer
              flex items-center gap-x-3
              group
              hover:border-[rgba(147,51,234,1)] hover:scale-105
              transition-all duration-300 ease-in-out transform
              select-none
              ">
                <IoExit className="text-lg group-hover:scale-120 group-hover:drop-shadow-[0_0_3px_rgb(147,51,234)] text-[rgba(147,51,234,1)] transition-all duration-300 ease-in-out transform"/>
                <p className="text-sm font-light group-hover:drop-shadow-[0_0_3px_rgb(147,51,234)] transition-all duration-300 ease-in-out transform">Sair</p>
              </li>

            </ul>
          </motion.div>
        )}
        
    </div>
  );
}

