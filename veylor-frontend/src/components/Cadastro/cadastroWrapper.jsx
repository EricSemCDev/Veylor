"use client";

/* Dependencias */
import { useState } from "react";
import { useRouter } from "next/navigation";
/* Import */
import FormCadastro from "./formCadastro";
import Autenticao from "./autenticacao";
import DadosAdiconais from "./dadosAdicionais";

/* Icons */
import { FaArrowCircleLeft } from "react-icons/fa";

export default function CadastroWrapper() {
  const router = useRouter();
  const [etapa, setEtapa] = useState("info");
  const [form, setForm] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    username: "",
    nomeCompleto: "",
    foto: ""
  });
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  /* Função para alterar etapa */
  const voltar = () => {
    if (etapa === "info") {
      router.push("/"); // voltar pra home
    } else if (etapa === "auth") {
      setEtapa("info");
    } else if (etapa === "final") {
      setEtapa("auth");
    }
  };

  /* Função para Finalizar cadastro */
  const enviarCadastro = async (e) => {
    /* Evita que o form aja de forma natural, apenas fazendo o submit */
    e.preventDefault();
    try {
        /* Fetch para enviar pro back e após validado para o banco */
        const res = await fetch("http://localhost:3001/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nomeCompleto: form.nomeCompleto,
            email: form.email,
            senha: form.senha,
            username: form.username
          })
        });

      if (!res.ok) throw new Error("Erro ao cadastrar usuário");

      const user = await res.json(); // Captura o ID
      const userId = user.id;

      // Agora envia a imagem
      if (imagemSelecionada) {
        const formData = new FormData();
        formData.append("imagem", imagemSelecionada);

        const imgRes = await fetch(`http://localhost:3001/user/upload/perfil/${userId}`, {
          method: "POST",
          body: formData
        });

        if (!imgRes.ok) {
          const erro = await imgRes.text();
          console.error("Erro ao enviar imagem:", erro);
          throw new Error("Falha no upload da imagem");
        }
      }

      router.push("/login");

    } catch (err) {

      console.error("❌ Erro ao enviar cadastro:", err);

    }
  };

  return (
    <>
      {/* Botão para voltar etapa */}
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

      {/* Etapa 1 - Dados de Login */}
      {etapa === "info" && (
        <FormCadastro form={form} setForm={setForm} onAvancar={() => setEtapa("auth")} />
      )}
      {/* Etapa 1 - Autenticação */}
      {etapa === "auth" && (
        <Autenticao email={form.email} onVerificado={() => setEtapa("final")} />
      )}
      {/* Etapa 1 - Dados Adicionais do usuário */}
      {etapa === "final" && (
        <DadosAdiconais form={form} setForm={setForm} handleSubmit={enviarCadastro} setImagemSelecionada={setImagemSelecionada} />
      )}

      {etapa === "sucesso" && (
        <div className="text-white text-center text-xl mt-10 font-bold">
          🎉 Conta criada com sucesso!
        </div>
      )}
    </>
  );
}
