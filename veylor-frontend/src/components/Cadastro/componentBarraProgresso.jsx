export default function BarraProgresso() {
  return (
    <main className="flex">

        {/* Barra de Progresso */} 
        <div className="flex space-x-4">
          {/* Etapa 1 */} 
          <div className="w-30 h-20 flex justify-center items-center bg-[rgba(147,51,234,0.34)] border-r border-l border-b border-[rgba(147,51,234,0.34)] rounded-bl-[10px] rounded-br-[10px] hover:bg-black">
            <p></p>
          </div>
          {/* Etapa 2 */} 
          <div className="w-30 h-10 flex justify-center items-center bg-[rgba(21,1,51,0.34)] border-r border-l border-b border-[rgba(147,51,234,0.34)] rounded-bl-[10px] rounded-br-[10px] hover:bg-black">
            <p></p>
          </div>
          {/* Etapa 3 */} 
          <div className="w-30 h-10 flex justify-center items-center bg-[rgba(21,1,51,0.34)] border-r border-l border-b border-[rgba(147,51,234,0.34)] rounded-bl-[10px] rounded-br-[10px] hover:bg-black">
            <p></p>
          </div>
        </div>

    </main>
  );
}