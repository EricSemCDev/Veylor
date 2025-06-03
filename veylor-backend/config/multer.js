import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Em ESM, precisamos simular o __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tipo = req.params.tipo || 'geral';
    const userId = req.params.userId || 'temp';
    const dir = path.resolve(__dirname, '../uploads', tipo, userId);

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

export default multer({ storage });
