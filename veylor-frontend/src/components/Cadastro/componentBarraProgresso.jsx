export default function BarraProgresso() {
  return (
    <main className="flex">

        {/* Barra de Progresso */} 
        <div className="h-20 flex space-x-4">
          {/* Etapa 1 */} 
          <div className="
          w-30 h-10 
          group
          flex flex-col justify-center items-center 
          bg-[rgba(147,51,234,0.34)] 
          border-r border-l border-b border-[rgba(147,51,234,0.34)] rounded-bl-[10px] rounded-br-[10px]
          shadow-[0_0_5px_rgba(147,51,234,0.6)]
          hover:bg-[rgba(147,51,234,0.60)] hover:h-20
          transition-all duration-200 ease-in-out
          ">
          </div>
          {/* Etapa 2 */} 
          <div className="
          w-30 h-10 
          flex justify-center items-center 
          bg-[rgba(21,1,51,0.34)]
          border-r border-l border-b border-[rgba(147,51,234,0.34)] rounded-bl-[10px] rounded-br-[10px] 
          shadow-[0_0_5px_rgba(147,51,234,0.6)]
          hover:bg-[rgba(21,1,51,0.60)] hover:h-20
          transition-all duration-200 ease-in-out
          ">
            <p></p>
          </div>
          {/* Etapa 3 */} 
          <div className="
          w-30 h-10 
          flex justify-center items-center 
          bg-[rgba(21,1,51,0.34)]
          border-r border-l border-b border-[rgba(147,51,234,0.34)] rounded-bl-[10px] rounded-br-[10px] 
          shadow-[0_0_5px_rgba(147,51,234,0.6)]
          hover:bg-[rgba(21,1,51,0.60)] hover:h-20
          transition-all duration-200 ease-in-out
          ">
            <p></p>
          </div>
        </div>

    </main>
  );
}