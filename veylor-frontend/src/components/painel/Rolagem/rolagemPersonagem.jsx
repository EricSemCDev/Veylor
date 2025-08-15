"use client";

/* Dependencias */
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* Imports */
import { useAuth } from "@/context/authContext";

/* Icons */

export default function RolagemPersonagem({}) {
    const [open, setOpen] = useState(false);
    const [personagens, setPersonagens] = useState([]);
    const { usuario } = useAuth();

    async function handleOpen(){
        setOpen(true);
    }

    return (
        <div onClick={() => {handleOpen();}} className="flex flex-col justify-center items-center ml-auto bg-[rgba(147,51,234,0.30)] p-1 rounded-xl cursor-pointer">
            {/* Imagem */}
            <img src={`http://localhost:3001${usuario?.foto}`} className="
            flex items-center
            w-full max-w-6 h-full max-h-6
            bg-[rgba(147,51,234,0.30)] 
            rounded-full
            ">
            </img>

            {/* Nome do personagem */}
            <div className="
            flex items-center
            px-2
            w-full max-w-23 h-full max-h-7 
            rounded-xl
            ">
            <p className="text-[10px]">Tama9n9</p>
            </div>

            {open && (
                <div className="absolute bg-black w-100 h-100">
                    a
                </div>
            )}

        </div>
    );
}
