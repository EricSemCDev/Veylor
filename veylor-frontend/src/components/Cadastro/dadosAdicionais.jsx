"use client";
import { useState } from "react";
import { FaFileImage, FaCheck } from "react-icons/fa6";


export default function DadosAdiconais({ form, setForm }) {
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // 👈 isso impede o envio automático
    console.log(form);  // agora sim vai pro console!
  };
  
  const handleChange = async (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      // Gera preview
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);

      // Converte imagem para base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setForm((prev) => ({ ...prev, [name]: base64 }));
      };
      reader.readAsDataURL(file);

    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        {/* Title */} 
        <p className="font-semibold text-3xl">Informações Adicionais</p>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview da imagem"
            className="w-25 h-25 right-135 top-12 absolute object-cover rounded-full border-3 border-[rgba(147,51,234,0.5)]"
          />
        )}
      </div>

        {/* Container Username */} 
        <div className="w-full max-w-[350px] space-y-1">
          {/* Title */} 
          <div className="flex justify-between">
            <p className="text-sm font-extralight">Nome de Usuário</p>
          </div>
          {/* Input */} 
          <input type="text" name="username" value={form.username || ""} onChange={handleChange} placeholder="Digite seu nome de Usuário" 
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

        {/* Container Nome Completo */} 
        <div className="w-full max-w-[350px] space-y-1">
          {/* Title */} 
          <div className="flex justify-between">
            <p className="text-sm font-extralight">Nome Completo</p>
          </div>
          {/* Input */} 
          <input type="text" name="nomeCompleto" value={form.nomeCompleto || ""} onChange={handleChange} placeholder="Digite seu Nome Completo" 
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

        {/* Container Foto */} 
        <div className="w-full max-w-[350px] space-y-1">
          <p className="text-sm font-extralight">Foto de Perfil</p>

          <label
            htmlFor="foto"
            className="
              w-full h-12 px-5 flex items-center gap-2 cursor-pointer
              rounded-[10px] border border-[rgba(147,51,234,0.5)]
              hover:bg-[rgba(147,51,234,0.23)]
              transition-all duration-200 ease-in-out
            "
          >
            <span className="text-sm text-white font-light flex items-center gap-2">
              {form.foto ? (
                <>
                  <FaCheck className="text-[rgba(147,51,234,1)] animate-pop-in" />
                  Imagem Selecionada
                </>
              ) : (
                <>
                  <FaFileImage className="text-[rgba(147,51,234,1)] text-xl" />
                  Adicione uma Imagem de Perfil
                </>
              )}
            </span>

          </label>

          <input
            id="foto"
            name="foto"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
    
        {/* Botão de envio ou próximos passos */}
        <button
            type="submit"
            className="
            w-full max-w-[350px] 
            bg-[rgba(147,51,234,1)] 
            py-2 mt-2
            text-white text-xl font-semibold
            rounded-lg
            cursor-pointer
            hover:bg-purple-700 hover:scale-102
            transition-all transform duration-100 ease-in-out
            ">
            Finalizar Cadastro
        </button>
    </form>
  );
}
