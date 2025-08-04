"use client";

import dynamic from "next/dynamic";
const MapaMundi = dynamic(() => import("@/components/painel/mapaMundi/MapaMundi"), {
  ssr: false, // 👈 ESSENCIAL para não dar erro de 'window is not defined'
});

/* Dependencias */
import { useState, useRef, useEffect } from "react";

/* Imports */
import SideBar from "./sideBar";
import BotaoPerfil from '@/components/Gerais/botãoPerfil';
import BotaoDice from "../Gerais/botaoDice";
import DadoD20 from "../Gerais/dado";

export default function PainelWrapper({}) {
  const [funcaoAtual, setFuncaoAtual] = useState("home");
  const [role, setRole] = useState("mestre");
  const [rodar, setRodar] = useState(false)
  const [rolagem, setRolagem] = useState();

  return (
    <section className="
    relative
    w-full h-full
    flex  
    ">
      <SideBar setFuncaoAtual={setFuncaoAtual}/>

      <div className="absolute top-4 right-8 flex gap-8 w-fit">
        <BotaoDice setRodar={setRodar} infoRolagem={setRolagem}/>
        {/* <BotaoPerfil role={role} setRole={setRole}/> */}
      </div>

      {rodar === true && (
        <div className="absolute w-full h-full">
          <DadoD20 valor={20} rodar={rodar} setRodar={setRodar} rolagem={rolagem}/>
        </div>
      )}

      {funcaoAtual === "home" && (
        <div className="flex-1">HOME PAGE</div>
      )}
      {funcaoAtual === "regras" && (
        <p>LIVRO DE REGRAS</p>
      )}
      {funcaoAtual === "mapa" && (
      <div className="flex-1 select-none shadow-inner-custom">
        <MapaMundi imagemURL="http://localhost:3001/upload/geral/mapaMundi/mapaMundi.jpg"/>
      </div>
      )}
      
    </section>
  );
}
