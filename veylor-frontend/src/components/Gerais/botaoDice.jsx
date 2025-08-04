"use client";
/* Dependencias */
import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Icons */
import { FaDiceD20 } from "react-icons/fa";
import { GiRollingDices } from "react-icons/gi";


export default function BotaoDice({ setRodar, infoRolagem}) {
  const [ativo, setAtivo] = useState(false)
  const [dados, setDados] = useState([])
  const [rolagem, setRolagem] = useState ({
    resultado: "40",
    indicadorResultado: "sucessoCritico",
    query: "[20] 1d20 + [1] [3] [6] 3d6 + [4] 1d6 + 6",
})
  const [mostrarMenu, setMostrarMenu] = useState(false)
  const [menuAnimado, setMenuAnimado] = useState(false);

  const handleRolar = () => setRodar(true);

  useEffect(() => {
    setDados([
      { id: 1, user: "Caus", role: "jogador", rolagem: "1d20 + 1d6 + 6", resultado: 23, oculto: false },
      { id: 2, user: "Fontana", role: "jogador", rolagem: "1d20 + 1d6 + 2", resultado: 18, oculto: false },
      { id: 3, user: "Higor", role: "jogador", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
      { id: 4, user: "Mestre", role: "mestre", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
      { id: 5, user: "Gabs", role: "jogador", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
    ]);
    infoRolagem(rolagem)
  }, []);

  const handleToggle = () => {
  if (ativo) {
    setMenuAnimado(false)
    setMostrarMenu(false); // esconde o menu antes de fechar o botão
    setTimeout(() => setAtivo(false), 300); // tempo suficiente para animação reversa
  } else {
    setAtivo(true);
    setTimeout(() => setMostrarMenu(true), 300); // tempo suficiente para a animação abrir
  }
}

  return (
    <div className="flex flex-col space-y-10 w-full h-full"> 
        <button onClick={() => { setAtivo(ativo === true ? false : true); handleToggle();}} className={`
        h-11
        flex items-center
        bg-[rgba(13,1,31,0.60)]
        border-1 border-[rgba(147,51,234,0.30)] 
        text-white
        cursor-pointer group
        hover:border-[rgba(147,51,234,1)] hover:bg-[rgba(147,51,234,0.60)] hover:scale-120
        transform transition-all duration-200 ease-in-out
        select-none
        ${ ativo === true ? "w-50 scale-120 px-1 rounded-lg" : "w-11 justify-center rounded-[30px]"}
        `}>
          {!ativo && (
            <FaDiceD20 className="text-lg transform transition-all duration-200 ease-in-outt" />
          )}
            {ativo && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 150, damping: 20, mass: 1, }}
                className="flex items-center space-x-2 px-1 w-full"
              >
              </motion.div>
            )}
        </button>

        <AnimatePresence mode="wait">

          {mostrarMenu  && (
              <motion.div
              key="info"
              initial={{ opacity: 0, width: 0, height: 0 }}
              animate={{ opacity: 1, width: 200, height: 250 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeInOut", type: "spring", stiffness: 150, damping: 20, mass: 1, }}
              onAnimationComplete={() => setMenuAnimado(true)}
              className="
              space-y-2
              flex flex-col justify-center items-center
              scale-120
              ">
                  <div className="
                  w-full max-w-50 h-full
                  py-1 px-2 
                  border-1 border-[rgba(147,51,234,0.3)]
                  bg-[rgba(13,1,31,0.30)]
                  rounded-xl
                  ">
                    <div className="
                    h-full max-h-50
                    space-y-1
                    overflow-y-auto scroll-behavior: smooth
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[rgba(147,51,234,0.3)]
                    [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(147,51,234,0.2)] [&::-webkit-scrollbar-thumb]:border-1 [&::-webkit-scrollbar-thumb]:border-[rgba(147,51,234,0.8)]
                    ">
                      {menuAnimado && dados.map((dado, index) =>
                        !dado.oculto ? (
                          <motion.div
                            key={dado.id || index}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05, ease: "easeInOut", type: "spring", stiffness: 150, damping: 20, mass: 1, }}
                            className={`
                              w-full 
                              px-3 py-1
                              group
                              rounded-xl border-t-1 border-b-1 border-[rgba(234,51,51,0.3)]
                              select-none
                              ${dados.filter(d => !d.oculto).length > 3 ? "max-w-42" : "max-w-50"}
                            `}
                          >
                            <p className="text-[12px] justify-center items-center font-light leading-relaxed">
                              O{" "}
                              <span
                                className={`
                                  transition-all duration-300 ease-in-out transform
                                  ${ dado.role === "jogador" ? "text-[rgb(51,75,234)] drop-shadow-[0_0_3px_rgb(51,75,234)]" : "text-[rgba(234,51,51,1)] drop-shadow-[0_0_3px_rgb(234,51,51)]"}
                                `}
                              >
                                {dado.user}
                              </span>{" "}
                              rolou{" "}
                              <span className="text-[rgb(255,234,0)] drop-shadow-[0_0_3px_rgb(255,221,0)] transition-all duration-300 ease-in-out transform">
                                {dado.rolagem}
                              </span>{" "}
                              e teve o resultado:{" "}
                              <span className="drop-shadow-[0_0_3px_rgb(147,51,234)] font-normal text-[rgba(147,51,234,1)] transition-all duration-300 ease-in-out transform">
                                {dado.resultado}
                              </span>
                            </p>
                          </motion.div>
                        ) : null
                      )}
                    </div>
                  
                  </div>

                  <button onClick={handleRolar} className="
                  w-full max-w-50
                  flex justify-center items-center
                  py-2 px-6 gap-x-3
                  text-white text-lg font-semibold
                  border-t-1 border-b-1 border-[rgba(147,51,234,0.30)] rounded-lg
                  cursor-pointer
                  hover:border-[rgba(147,51,234,1)] hover:scale-105
                  transition-all duration-300 ease-in-out transform
                  group
                  select-none
                  ">
                      <GiRollingDices className="text-lg group-hover:scale-120 group-hover:drop-shadow-[0_0_3px_rgb(147,51,234)] text-[rgba(147,51,234,1)] transition-all duration-300 ease-in-out transform"/>
                      <p className="text-sm font-light group-hover:drop-shadow-[0_0_3px_rgb(147,51,234)] transition-all duration-300 ease-in-out transform">Rolar Dados</p>
                  </button>
              </motion.div>
          )}

        </AnimatePresence>
        
    </div>
  );
}

