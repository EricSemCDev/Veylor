"use client";

import dynamic from "next/dynamic";

const MapaMundi = dynamic(() => import("@/components/painel/mapaMundi/MapaMundi"), {
  ssr: false, // 👈 ESSENCIAL para não dar erro de 'window is not defined'
});

/* Dependencias */
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* Imports */
import { useAuth } from "@/context/authContext";

export default function PainelWrapper({}) {
  const { login, usuario } = useAuth();
  const router = useRouter();

  return (
    <section className="
    w-full h-full
    flex  
    ">
      <div className="w-20 bg-black rounded-bl-[20px] rounded-tl-[20px]">
        a
      </div>
      <div className="w-full h-full">
        <MapaMundi imagemURL="http://localhost:3001/upload/geral/mapaMundi/mapaMundi.jpg"/>
      </div> 
    </section>
  );
}
