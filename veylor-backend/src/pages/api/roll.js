import { rollQuery } from "../../utils/rollDice";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST only." });
  }

  const { query: rawQuery } = req.body;
  if (!rawQuery) {
    return res.status(400).json({ error: "Missing 'query' in request body" });
  }

  try {

    const { total, details } = rollQuery(rawQuery);

    return res.status(200).json({
      resultado: total,
      detalhes: details,
      query: rawQuery,
    });
  } catch (err) {
    console.error("Error in /api/roll:", err);
    return res.status(500).json({ error: "Failed to process roll" });
  }
}
