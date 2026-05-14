import * as imageService from '../services/imageService.js';

export const getUploadUrl = async (req, res) => {
  try {
    const { fileName, contentType, sizeBytes } = req.body;

    if (!fileName || !contentType) {
      return res.status(400).json({ error: 'fileName y contentType son requeridos' });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(contentType)) {
      return res.status(400).json({ error: 'Tipo de contenido no permitido' });
    }

    const MAX_SIZE_MB = 5;
    if (sizeBytes > MAX_SIZE_MB * 1024 * 1024) {
      return res.status(400).json({ error: 'Archivo demasiado grande (máx 5MB)' });
    }

    const result = await imageService.generateUploadUrl(fileName, contentType);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getViewUrl = async (req, res) => {
  try {
    const { key } = req.params;

    if (!key) {
      return res.status(400).json({ error: 'Key es requerido' });
    }

    const result = await imageService.generateViewUrl(key);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listImages = async (req, res) => {
  try {
    const images = await imageService.listImages();
    res.json({ images, count: images.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { key } = req.params;

    if (!key) {
      return res.status(400).json({ error: 'Key es requerido' });
    }

    const result = await imageService.deleteImage(key);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};