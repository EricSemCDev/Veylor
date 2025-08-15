"use client";
/* Dependencias */
import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Imports */
import RolagemPersonagem from "../painel/Rolagem/rolagemPersonagem";

/* Icons */
import { FaDiceD20 } from "react-icons/fa";
import { RiEye2Line, RiEyeCloseLine } from "react-icons/ri";
import { GiRollingDices } from "react-icons/gi";
import { GiRollingDiceCup } from "react-icons/gi";


export default function BotaoDice({ setRodar, infoRolagem}) {
  
  const [ativo, setAtivo] = useState(true)
  const [dados, setDados] = useState([])
  const [rolagemSalva, setRolagemSalva] = useState([])
  const [oculto, setOculto] = useState(false)
  const [rolagem, setRolagem] = useState({
    resultado: "",
    indicadorResultado: "normal",
    query: "",
    detalhes: []
  });
  const [query, setQuery] = useState("");

  async function handleRolar(query) { 
    
    try{
      const res = await fetch("http://localhost:3001/roll/rollQuery", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ query }),
      })

      if (!res.ok) throw new Error("Falha no servidor");

      const {resultado, indicadorResultado, query: formatted, detalhes} = await res.json();

      console.log(indicadorResultado)

      const newRolagem = {
        resultado,
        indicadorResultado,
        query: formatted,
        detalhes,
      };
      setRolagem(newRolagem)
      infoRolagem(newRolagem)
      setQuery("")
    } catch(e){
      console.error("Erro ao rolar dados:", e);
    }
    setRodar(true);
  }

  /* Função para alterar os valores do inputs */
  const handleChange = (e) => {
    const { value } = e.target;
      setQuery(value);
  };

  useEffect(() => {
    setDados([
      { id: 1, user: "Caus", role: "jogador", rolagem: "1d20 + 1d6 + 6", resultado: 23, oculto: false },
      { id: 2, user: "Fontana", role: "jogador", rolagem: "1d20 + 1d6 + 2", resultado: 18, oculto: false },
      { id: 3, user: "Higor", role: "jogador", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
      { id: 4, user: "Mestre", role: "mestre", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
      { id: 5, user: "Gabs", role: "jogador", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
      { id: 6, user: "Gabs", role: "jogador", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
      { id: 7, user: "Gabs", role: "jogador", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
      { id: 8, user: "Gabs", role: "jogador", rolagem: "1d20 + 1d6 + 1", resultado: 26, oculto: false },
    ]);
    setRolagemSalva([
      {id: 1, nome: "Afinidade", query: "1d20"},
      {id: 2, nome: "Espada", query: "1d20 + 1"},
      {id: 3, nome: "Complexidade", query: "1d20 + 2"},
      {id: 4, nome: "Normal", query: "1d20 + 3"},
      {id: 5, nome: "Combo2", query: "1d20 + 4"},
    ])
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

        {/* Botão de Rolagem */}
        <div 
        onClick={() => { 
        // setAtivo(ativo === true ? false : true); 
        // handleToggle();
        }} 
        className={`
        h-11
        flex flex-col 
        bg-[rgba(13,1,31,0.60)]
        border-1 border-[rgba(147,51,234,0.30)] 
        text-white
        group
        transform transition-all duration-200 ease-in-out
        select-none
        ${ ativo === true ? "w-85 h-120 px-4 py-4 rounded-xl" : "w-11 justify-center items-center rounded-[30px]"}
        `}>
          {!ativo && (
            <FaDiceD20 className="text-lg transform transition-all duration-200 ease-in-outt" />
          )}

          {/* Container de cabeçalho */}
          <div className="
          flex items-center
          w-full h-full max-h-10
          gap-2
          ">

            {/* Logo do container */}
            <div className="
            h-10 w-10
            flex items-center justify-center
            bg-[rgba(147,51,234,0.30)]
            border-1 border-[rgba(147,51,234,0.30)] rounded-[30px]
            select-none
            ">
              <FaDiceD20 className="text-lg" />
            </div>

            {/* Container de Título */}
            <div className="
            flex flex-col
            justify-center
            w-full max-w-40
            leading-none text-left
            ">
              {/* Título */}
              <p className="text-sm">Rolagens</p>
              {/* Subtítulo */}
              <p className="text-[11px]">Clique em um item para ver o detalhe da rolagem</p>
            </div>
            
            {/* Container de Jogador que fará a rolagem */}
            <RolagemPersonagem/>

          </div>

          {/* Container de histórico de rolagens */}
          <div className="
          w-full h-full max-h-68  
          my-4 px-3 py-2
          bg-[rgba(13,1,31,1)]
          border-1 border-[rgba(147,51,234,0.30)] rounded-xl
          ">

            {/* Container para controlar barra de rolagem */}
            <div className="
            w-full h-full
            space-y-1
            overflow-y-auto scroll-behavior:smooth
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[rgba(147,51,234,0.3)] [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-track]:[background-clip:content-box] [&::-webkit-scrollbar-track]:border-l-[10px] [&::-webkit-scrollbar-track]:border-r-[10px] [&::-webkit-scrollbar-track]:border-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(147,51,234,0.2)] [&::-webkit-scrollbar-thumb]:border-1 [&::-webkit-scrollbar-thumb]:border-[rgba(147,51,234,0.8)]
            ">

              {/* Container de mapeamento do histórico */}
              {dados.map((dado, index) =>
                !dado.oculto ? (
                  /* Card de rolagem */
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
                      ${dados.filter(d => !d.oculto).length > 3 ? "max-w-65" : "max-w-50"}
                    `}
                  >
                    {/* Container do card */}
                    <p className="text-[14px] justify-center items-center font-light leading-relaxed">
                      O{" "}
                      {/* Nome do personagem */}
                      <span
                        className={`
                          transition-all duration-300 ease-in-out transform
                          ${ dado.role === "jogador" ? "text-[rgb(51,75,234)] drop-shadow-[0_0_3px_rgb(51,75,234)]" : "text-[rgba(234,51,51,1)] drop-shadow-[0_0_3px_rgb(234,51,51)]"}
                        `}
                      >
                        {dado.user}
                      </span>{" "}
                      rolou{" "}
                      {/* Query da rolagem */}
                      <span className="text-[rgb(255,234,0)] drop-shadow-[0_0_3px_rgb(255,221,0)] transition-all duration-300 ease-in-out transform">
                        {dado.rolagem}
                      </span>{" "}
                      e teve o resultado:{" "}
                      {/* Resultado da rolagem */}
                      <span className="drop-shadow-[0_0_3px_rgb(147,51,234)] font-normal text-[rgba(147,51,234,1)] transition-all duration-300 ease-in-out transform">
                        {dado.resultado}
                      </span>
                    </p>
                  </motion.div>
                ) : null
              )}

            </div>

          </div>

          {/* Container de rolagens salvas */}
          <div className="
          flex justify-center flex-wrap
          w-full
          gap-2
          ">
            {/* Container de mapeamento das rolagens salvas */}
            {rolagemSalva.map((item, index) => (
              /* Card */
              <motion.div key={item.id || index} className="
              px-2 py-0.5
              border-[1px] border-[rgba(147,51,234,0.7)]
              bg-[rgba(147,51,234,0.30)]
              rounded-lg
              hover:bg-[rgba(147,51,234,0.5)] hover:border-[rgba(147,51,234,1)]
              ">
                {/* Nome */}
                <p className="text-[12px] font-semibold">{item.nome}</p>
              </motion.div>
            ))}

            {/* Botão para adicionar novas rolagens salvas */}
            <motion.button className="
            px-2 py-0.5
            border-[1px] border-[rgba(147,51,234,0.7)]
            bg-[rgba(147,51,234,0.30)]
            rounded-lg
            hover:bg-[rgba(147,51,234,0.5)] hover:border-[rgba(147,51,234,1)]
            ">
              {/* Nome */}
              <p className="text-[12px] font-semibold">+</p>
            </motion.button>
          </div>

          {/* Container de Rolagem */}
          <div className="
          flex flex-col
          gap-2
          mt-2
          ">
            <div className="flex gap-2">

              {/* Container de input de rolagem + botão de rolagem */}
              <div className="relative w-full h-10">
                {/* Input */}
                <input
                  type="text"
                  name="queryRoll"
                  value={query || ""}
                  onChange={handleChange}
                  placeholder="Digite sua rolagem"
                  className="
                    w-full h-10
                    pl-5 pr-10 /* espaço extra à direita pro botão não sobrepor o texto */
                    text-[16px]
                    appearance-none bg-transparent outline-none 
                    font-light placeholder-white text-white text-xs
                    rounded-lg border-t-1 border-b-1 border-[rgba(147,51,234,0.50)]
                    focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)] focus:placeholder-transparent
                    transition-all duration-200 ease-in-out
                    peer
                  "
                />

                {/* Botão dentro do input */}
                <button
                  type="button"
                  onClick={() => handleRolar(query)}
                  className="
                    absolute right-2 top-1/2 -translate-y-1/2
                    flex items-center justify-center
                    text-white text-lg
                    cursor-pointer
                    hover:scale-110
                    transition-all duration-200 ease-in-out
                  "
                >
                  <GiRollingDices className="text-lg" />
                </button>
              </div>

              {/* Botão para fazer uma rolagem guiada */}
              <button onClick={() => {}} className="
              flex justify-center items-center
              py-2 px-3
              text-white text-lg font-semibold
              border-t-1 border-b-1 border-[rgba(147,51,234,0.50)] rounded-lg
              cursor-pointer
              hover:border-[rgba(147,51,234,1)] hover:scale-105
              transition-all duration-200 ease-in-out transform
              select-none
              ">
                <GiRollingDiceCup />
              </button>  

              {/* Botão para ocultar rolagem dos outros jogadores */}
              <button onClick={() => { setOculto(oculto === true ? false : true);  }} className="
              flex justify-center items-center
              py-2 px-3
              text-white text-lg font-semibold
              border-t-1 border-b-1 border-[rgba(147,51,234,0.50)] rounded-lg
              cursor-pointer
              hover:border-[rgba(147,51,234,1)] hover:scale-105
              transition-all duration-200 ease-in-out transform
              select-none
              ">
                {oculto ? <RiEyeCloseLine key="close" /> : <RiEye2Line key="open" />}
              </button>  

            </div>

          </div>

        </div>
    </div>
  );
}

