const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tipo = req.params.tipo || 'geral';
    const userId = req.params.userId || 'temp'; // se não tem ID, salva em 'temp'
    const dir = path.resolve(__dirname, '..', 'uploads', tipo, `user_${userId}`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeArquivo = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, nomeArquivo);
  }
});

module.exports = multer({ storage });
