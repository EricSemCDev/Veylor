// src/utils/rollDice.js
import { randomFillSync } from "crypto";

// Retorna um float seguro entre 0 (inclusive) e 1 (exclusive)
export function randomFloat() {
  const buf = new Uint32Array(1);
  // no back-end, preenche o buffer de forma segura
  randomFillSync(buf);
  return buf[0] / (0xFFFFFFFF + 1);
}

// Rola um dado de 'faces' faces, devolvendo inteiro de 1 a faces
export function rollDie(faces) {
  return Math.floor(randomFloat() * faces) + 1;
}

// Parseia queries no formato "1d20+1d6+6" e retorna total + detalhes
export function rollQuery(query) {
  const parts = query
    .replace(/\s+/g, "")
    .split("+")
    .map((p) => {
      const m = p.match(/^(\d*)d(\d+)$/);
      if (m) {
        return { type: "dice", count: Number(m[1]) || 1, faces: Number(m[2]) };
      }
      return { type: "const", value: Number(p) };
    });

  let total = 0;
  const details = [];

  for (const part of parts) {
    if (part.type === "dice") {
      for (let i = 0; i < part.count; i++) {
        const v = rollDie(part.faces);
        total += v;
        details.push({ faces: part.faces, value: v });
      }
    } else {
      total += part.value;
      details.push({ constant: part.value });
    }
  }

  return { total, details };
}
