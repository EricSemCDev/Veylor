"use client";

/* Dependencias */
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* Imports */
import InputSenha from "@/components/Gerais/inputSenha";
import { useAuth } from "@/context/authContext";

export default function FormLogin({}) {
  const { login } = useAuth();
  const router = useRouter();
  const [erroGeral, setErroGeral] = useState("");
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  /* Função que altera os inputs do form */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Função que verifica se todos os campos foram preenchidos e finaliza etapa */
   const handleSubmit = async (e) => {
    e.preventDefault();

    const camposVazios = !form.email.trim() || !form.senha.trim();
    if (camposVazios) {
      setErroGeral("Preencha todos os campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          senha: form.senha,
        })
      });

      if (!res.ok) {
        const erro = await res.json();
        setErroGeral(erro.erro || "Erro ao fazer login");
        return;
      }

      const data = await res.json();

      // Chama o login do AuthContext (salva token e usuário)
      login({
        token: data.token,
        usuario: data.usuario
      });

      console.log("✅ Login efetuado com sucesso!");
      router.push("/painel"); // Redireciona para a home ou painel

    } catch (err) {
      console.error("❌ Erro ao enviar login:", err);
      setErroGeral("Erro inesperado ao fazer login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */} 
      <p className="font-semibold text-3xl">Entre em sua Conta</p>

      {/* Container Email */} 
      <div className="w-full max-w-[350px] space-y-1">
        {/* Title */} 
        <div className="flex justify-between">
          <p className="text-sm font-extralight">Email</p>
        </div>
        {/* Input */} 
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Digite seu Email" 
        className={`
        w-full h-12
        px-5
        appearance-none bg-transparent outline-none 
        font-light placeholder-white text-white 
        rounded-[10px] border-1 border-[rgba(147,51,234,0.50)]
        focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)] focus:placeholder-transparent
        transition-all duration-200 ease-in-out
        peer
        `}
        />
      </div>

      {/* Container Senha */} 
      <InputSenha 
      label="Senha"
      placeholder="Digite sua Senha"
      inputKey="senha"
      value={form.senha}
      onChange={handleChange}
      />

      {/* Mensagem de erro se algum campo no foi preenchido */} 
      {erroGeral && (
        <div className="text-red-500 text-sm font-medium text-center mt-3">
          {erroGeral}
        </div>
      )}

      <div>
        {/* Botão de envio ou próximos passos */}
        <button
          type="submit"
          className="
          w-full max-w-[350px] 
          bg-[rgba(147,51,234,1)] 
          py-2
          text-white text-xl font-semibold
          rounded-lg
          cursor-pointer
          hover:bg-purple-700 hover:scale-102
          transition-all transform duration-100 ease-in-out
          ">
          Faça Login
        </button>

        {/* Botão de redirecionamento para o login */}
        <div className="w-full max-w-[350px] mt-1 flex space-x-1 text-[14px] flex justify-end">
          <p>Não tem uma conta?</p>
          <Link href={"/cadastro"} className="text-[rgba(147,51,234,1)] hover:scale-110 hover:font-bold transition-all transform duration-50 ease-in-out">Registrar</Link>
        </div>
      </div>
      

    </form>
  );
}
