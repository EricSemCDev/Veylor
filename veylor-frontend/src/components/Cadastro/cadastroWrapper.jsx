"use client";

/* Dependencias */
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
/* Import */
import FormCadastro from "./formCadastro";
import Autenticao from "./autenticacao";
import DadosAdiconais from "./dadosAdicionais";

/* Icons */
import { FaArrowCircleLeft } from "react-icons/fa";

export default function CadastroWrapper({ onEtapaChange }) {
  const router = useRouter();
  const [etapa, setEtapa] = useState("info");
  const [form, setForm] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    username: "",
    nomeCompleto: "",
    foto: "" // base64
  });

  const voltar = () => {
    if (etapa === "info") {
      router.push("/"); // voltar pra home
    } else if (etapa === "auth") {
      setEtapa("info");
    } else if (etapa === "final") {
      setEtapa("auth");
    }
  };

  const enviarCadastro = async () => {
    try {
      const payload = {
        email: form.email,
        senha: form.senha,
        nomeCompleto: form.nomeCompleto,
        username: form.username,
        foto: form.foto // já em base64
      };

      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao cadastrar usuário");

      const data = await response.json();
      console.log("✅ Usuário criado com sucesso:", data);
      setEtapa("sucesso");
    } catch (err) {
      console.error("❌ Erro ao enviar cadastro:", err);
    }
  };

  return (
    <>
      {/* Voltar a HomePage */}
      <button onClick={voltar} className="inline-block w-fit">
        <FaArrowCircleLeft
          className="
            text-[rgba(147,51,234,1)] text-2xl
            hover:scale-130 hover:animate-pulse
            transition-transform duration-300 ease-in-out
            cursor-pointer
          "
        />
      </button>

      {etapa === "info" && (
        <FormCadastro form={form} setForm={setForm} onAvancar={() => setEtapa("auth")} />
      )}

      {etapa === "auth" && (
        <Autenticao email={form.email} onVerificado={() => setEtapa("final")} />
      )}

      {etapa === "final" && (
        <DadosAdiconais form={form} setForm={setForm} onVerificado={enviarCadastro} />
      )}

      {etapa === "sucesso" && (
        <div className="text-white text-center text-xl mt-10 font-bold">
          🎉 Conta criada com sucesso!
        </div>
      )}
    </>
  );
}
