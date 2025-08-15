// src/controllers/rollController.js
import { rollQuery } from "../utils/rollDice.js";

function formatQuery(rawQuery, details) {
  // 1) Filtra só os lançamentos de dados (aqueles que têm .faces)
  const diceDetails = details.filter(d => d.faces);

  // 2) Quebra a expressão em partes
  const parts = rawQuery.replace(/\s+/g, "").split("+");
  let detailIdx = 0;

  const formatted = parts.map(part => {
    const m = part.match(/^(\d*)d(\d+)$/);
    if (m) {
      const count = Number(m[1]) || 1;
      // 3) Pega do diceDetails, não do details inteiro
      const rolls = diceDetails
        .slice(detailIdx, detailIdx + count)
        .map(d => `[${d.value}]`)
        .join(" ");
      detailIdx += count;
      return `${rolls} ${part}`;
    } else {
      // constantes ficam sem colchetes
      return part;
    }
  });

  return formatted.join(" + ");
}


export function handleRoll(req, res) {
  const { query: rawQuery } = req.body;
  if (!rawQuery) {
    return res
      .status(400)
      .json({ error: "Falta o campo 'query' no body da requisição" });
  }

  try {
    const { total, details } = rollQuery(rawQuery);

    // 1) Indicador de crítico ou normal (baseado no primeiro d20)
    const firstD20 = details.find((d) => d.faces === 20);
    let indicadorResultado = "normal";
    if (firstD20?.value === 20) indicadorResultado = "sucessoCritico";
    else if (firstD20?.value === 1) indicadorResultado = "falhaCritica";

    // 2) Monta a query formatada
    const formattedQuery = formatQuery(rawQuery, details);

    return res.status(200).json({
      resultado: String(total),
      indicadorResultado,
      query: formattedQuery,
      detalhes: details,
    });
  } catch (err) {
    console.error("Erro em handleRoll:", err);
    return res.status(500).json({ error: "Falha ao processar a rolagem" });
  }
}
