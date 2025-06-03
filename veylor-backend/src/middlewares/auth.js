import jwt from 'jsonwebtoken';

export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Espera: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // salva os dados do usuário no request
    next();
  } catch (err) {
    console.error("Erro no token:", err.message);
    return res.status(403).json({ erro: "Token inválido ou expirado." });
  }
};
