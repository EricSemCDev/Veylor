"use client";

/* Dependencias */
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* Imports */

/* Icons */
import { FaHouse } from "react-icons/fa6";
import { FaBookTanakh } from "react-icons/fa6";
import { HiMap } from "react-icons/hi2";

export default function SideBar({setFuncaoAtual}) {
    const [barraTop, setBarraTop] = useState(0);
    const [barraHeight, setBarraHeight] = useState(0);
    const iconRefs = useRef({}); // objeto para armazenar refs dinamicamente
    const [isAnimando, setIsAnimando] = useState(false);

    const [iconeAtivo, setIconeAtivo] = useState(1);
    const icons = [
        {id: 1, nome: "home", Componente: FaHouse},
        {id: 2, nome: "regras", Componente: FaBookTanakh},
        {id: 3, nome: "mapa", Componente: HiMap},
    ]

    useEffect(() => {
        const el = iconRefs.current[iconeAtivo];
        if (el) {
            const rect = el.getBoundingClientRect();
            const parentRect = el.parentElement.getBoundingClientRect();
            setBarraTop(rect.top - parentRect.top + rect.height / 2);
            setBarraHeight(rect.height);
        }
    }, [iconeAtivo]);
  

    return (
        <section className="
        w-20 h-full 
        flex flex-col items-center
        relative select-none 
        py-15 space-y-15
        rounded-bl-[20px] rounded-tl-[20px] border-r-1 border-[rgba(147,51,234,0.30)]
        ">
        {/* Barra móvel */}
        <motion.div
        key={iconeAtivo}
        layout
        layoutId="barra-ativa"
        className="absolute left-0 w-1 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(0,255,231,0.8)] transform -translate-y-1/2 origin-top"
        style={{
            top: `${barraTop}px`,
            height: `${barraHeight * 2}px`,
        }}
        initial={{ scaleY: 0.2 }}
        animate={{ scaleY: 1 }}
        transition={{
            type: "spring",
            stiffness: 180,
            damping: 30,
            mass: 1.8,
        }}
        onAnimationStart={() => setIsAnimando(true)}
        onAnimationComplete={() => setIsAnimando(false)}
        />
        {icons.map(({id, Componente, nome}) =>(
            <div key={id} ref={(el) => (iconRefs.current[id] = el)} className="flex items-center justify-center">
                <Componente key={id}  onClick={() => {if (isAnimando) return;setIconeAtivo(iconeAtivo === id ? null : id); setFuncaoAtual?.(nome);}} className={`
                text-3xl
                cursor-pointer
                hover:scale-110
                transition-all duration-300 ease-in-out
                ${ iconeAtivo === id ? "text-[rgba(147,51,234,1)] scale-110 drop-shadow-[0_0_4px_rgba(0,255,255,0.3)]" : "text-[rgba(147,51,234,0.50)] hover:text-[rgba(147,51,234,0.9)] hover:drop-shadow-[0_0_6px_rgba(0,255,231,0.3)]"}
                `}/>
            </div>

        ))}
        </section>
    );
}
