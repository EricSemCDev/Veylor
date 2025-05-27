"use client";

/* Dependencias */
import Link from "next/link";
import { useState } from "react";
import PropTypes from 'prop-types';

/* Imports */
import InputSenha from "@/components/Cadastro/inputSenha";
import useValidaEmail from "@/hooks/useValidaEmail";

export default function FormCadastro({ form, setForm, onAvancar}) {
  const { email, setEmail, invalido: emailInvalido, validarEmail } = useValidaEmail();
  const [erroGeral, setErroGeral] = useState("");

  const [senhaInvalida, setSenhaInvalida] = useState(false);
  const [senhasDiferentes, setSenhasDiferentes] = useState(false);

  const [camposTocados, setCamposTocados] = useState({
    email: false,
    senha: false,
    confirmarSenha: false
  });


  /* Função que altera os inputs do form */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "senha") {
      const valida = validarSenhaForte(value);
      setSenhaInvalida(!valida);
    }

    if (name === "confirmarSenha") {
      setSenhasDiferentes(value !== form.senha);
    } else if (name === "senha") {
      setSenhasDiferentes(form.confirmarSenha && value !== form.confirmarSenha);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Função para validar se a senha é forte */
  const validarSenhaForte = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  };

  /* Função para evitar problema de messagem de erro constante enquanto escreve */
  const handleBlur = (e) => {
    const { name } = e.target;
    setCamposTocados((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (name === "email") {
      validarEmail(email); // ✅ agora sim!
    }
    if (name === "senha") {
      const valida = validarSenhaForte(form.senha);
      setSenhaInvalida(!valida);
    }
    if (name === "confirmarSenha") {
      const diferentes = form.confirmarSenha !== form.senha;
      setSenhasDiferentes(diferentes);
    }
  };

  /* Função que verifica se todos os campos foram preenchidos e finaliza etapa */
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = validarEmail(email);
    const senhaValida = validarSenhaForte(form.senha);
    const confirmacaoOk = form.senha === form.confirmarSenha;

    const camposVazios = !email.trim() || !form.senha.trim() || !form.confirmarSenha.trim();

    setCamposTocados({
      email: true,
      senha: true,
      confirmarSenha: true
    });

    if (camposVazios) {
      setErroGeral("Preencha todos os campos.");
      return;
    }

    if (!emailValido) {
      setErroGeral("Digite um email válido.");
      return;
    }

    if (!senhaValida) {
      setErroGeral("A senha não atende aos requisitos.");
      return;
    }

    if (!confirmacaoOk) {
      setErroGeral("As senhas não coincidem.");
      return;
    }

    // Se tudo ok, limpa erro e avança
    setErroGeral("");
    onAvancar();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Title */} 
      <p className="font-semibold text-3xl">Crie sua conta</p>

      {/* Container Email */} 
      <div className="w-full max-w-[350px] space-y-1">
        {/* Title */} 
        <div className="flex justify-between">
          <p className="text-sm font-extralight">Email</p>
        </div>
        {/* Input */} 
        <input type="email" name="email" value={email} onChange={handleChange} onBlur={handleBlur} placeholder="Digite seu Email" 
        className={`
        w-full h-12
        px-5
        appearance-none bg-transparent outline-none 
        font-light placeholder-white text-white 
        rounded-[10px] border-1 border-[rgba(147,51,234,0.50)]
        focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)] focus:placeholder-transparent
        transition-all duration-200 ease-in-out
        peer
        ${camposTocados.email && emailInvalido 
          ? "border-red-500 focus:border-red-500 focus:bg-red-500/20"
          : "border-[rgba(147,51,234,0.50)] focus:border-[rgba(147,51,234,1)] focus:bg-[rgba(147,51,234,0.23)]"
        }
        `}
        />
        {camposTocados.email && emailInvalido && (
          <p className="text-sm text-red-500 mt-1">Digite um email válido</p>
        )}
      </div>

      {/* Container Senha */} 
      <InputSenha 
      label="Senha"
      placeholder="Digite sua Senha"
      inputKey="senha"
      value={form.senha}
      onChange={handleChange}
      onBlur={handleBlur}
      error={camposTocados.senha && senhaInvalida && form.senha.trim() !== ""}
      errorMessage="A senha deve ter pelo menos 8 caracteres, com letra maiúscula, minúscula, número e símbolo."
      />

      {/* Confirmar Senha */} 
      <InputSenha 
      label="Confirmação"
      placeholder="Confirme sua Senha"
      inputKey="confirmarSenha"
      value={form.confirmarSenha}
      onChange={handleChange}
      onBlur={handleBlur}
      error={camposTocados.confirmarSenha && senhasDiferentes && form.confirmarSenha.trim() !== ""}
      errorMessage="As senhas não coincidem."
      />

      {/* Mensagem de erro se algum campo no foi preenchido */} 
      {erroGeral && (
        <div className="text-red-500 text-sm font-medium text-center mt-3">
          {erroGeral}
        </div>
      )}

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
        Avançar
      </button>

      {/* Botão de redirecionamento para o login */}
      <div className="w-full max-w-[350px] flex space-x-1 text-[14px] flex justify-end">
        <p>Já tem uma Conta?</p>
        <Link href={"/login"} className="text-[rgba(147,51,234,1)] hover:scale-110 hover:font-bold transition-all transform duration-50 ease-in-out">Log In</Link>
      </div>

    </form>
  );
}

FormCadastro.propTypes = {
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  onAvancar: PropTypes.func,
};
