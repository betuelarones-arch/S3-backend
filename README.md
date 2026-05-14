# Backend - Gestión de Imágenes S3

## Descripción
API REST para gestión de imágenes en AWS S3 usando presigned URLs. El archivo se sube directamente del navegador a S3, sin pasar por el backend.

## Requisitos
- Node.js 18+
- AWS CLI configurado

## Instalación
```bash
npm install
```

## Configuración
1. Copiar `.env.example` a `.env`
2. Completar las variables en `.env`

## Configurar Bucket S3
```bash
aws s3 mb s3://lab-imagenes-tu-apellido-fecha
```

Aplicar CORS (necesario para PUT directo desde navegador):
```bash
aws s3api put-bucket-cors --bucket TU_BUCKET --cors-configuration file://cors.json
```

## Ejecutar
```bash
npm start
```

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/upload-url` | Genera presigned URL para subir imagen |
| GET | `/api/images` | Lista imágenes con URLs de visualización |
| GET | `/api/view-url/:key` | Genera URL de visualización para una imagen |
| DELETE | `/api/images/:key` | Elimina una imagen |

### POST /api/upload-url
```json
// Request
{ "fileName": "foto.jpg", "contentType": "image/jpeg", "sizeBytes": 1048576 }

// Response
{ "uploadUrl": "https://...", "key": "originales/...", "expiresIn": 300 }
```

### GET /api/images
```json
// Response
{
  "images": [
    { "key": "originales/...", "size": 1024, "lastModified": "...", "url": "https://..." }
  ],
  "count": 1
}
```

## Validaciones
- Tipos permitidos: image/jpeg, image/png, image/webp
- Tamaño máximo: 5MB
- Presigned URL upload: 5 minutos
- Presigned URL visualización: 15 minutos