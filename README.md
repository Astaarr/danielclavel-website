# Daniel Clavel Landing

Landing personal minimalista en Next.js, con foco en YouTube y carga automatica del ultimo video de cada canal.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Configuracion de YouTube Data API v3

### 1) API key

En `.env.local` define:

```bash
YOUTUBE_API_KEY=tu_api_key_de_youtube
```

Tambien se soporta `NEXT_PUBLIC_YT_API_KEY`, pero en este proyecto se recomienda `YOUTUBE_API_KEY` para mantener la clave solo en servidor.

### Vercel (produccion/preview)

Configura la misma variable en Vercel:

- Project Settings -> Environment Variables
- Name: `YOUTUBE_API_KEY`
- Environments: `Production`, `Preview` (y opcionalmente `Development`)

Despues de guardar, haz redeploy para que la variable quede activa.

### 2) Channel IDs

Edita `src/config/youtube.ts` y reemplaza los placeholders de `channelId`:

- `REPLACE_WITH_MAIN_CHANNEL_ID`
- `REPLACE_WITH_VLOGS_CHANNEL_ID`
- `REPLACE_WITH_GAMING_FINANZAS_CHANNEL_ID`

Tambien puedes ajustar `channelUrl` y `label` para cada canal.

### 3) Fallback manual (anti cuota/errores)

En `src/config/youtube.ts`, cada canal tiene `manualFallback`.

- `channelName`
- `channelThumbnail` (opcional)
- `latestVideo.title`
- `latestVideo.thumbnail` (opcional)
- `latestVideo.url`

Si la API falla (quota diaria, key invalida, error temporal), la app usa automaticamente esos datos locales para que la landing no se rompa.

## Arquitectura YouTube

- `src/config/youtube.ts`: configuracion central de canales y TTL de cache.
- `src/lib/youtube-api.ts`: helper/server service para llamar a YouTube API con manejo de errores.
- `app/api/youtube/channels/route.ts`: route handler en servidor para ocultar la API key al cliente.
- `src/components/youtube-section.tsx`: UI de la seccion YouTube con estados `loading`, `error`, `empty` y `ready`.

## Cache y quota

- Cache en servidor (memoria) y cliente (`localStorage`) con TTL de 15 minutos.
- Esto reduce llamadas repetidas y ayuda a conservar quota.
- Cada refresco fuera del TTL vuelve a consultar datos.
- El costo puede variar por endpoint, por lo que conviene mantener el TTL y evitar recargas innecesarias durante pruebas.

## Restricciones recomendadas para la API key

- Como la clave se usa en servidor (route handler), no es obligatorio restringir por dominio/referrer.
- Recomendado: restringir por API a `YouTube Data API v3`.
- Si aplicas restricciones muy estrictas y falla en Vercel, revisa en `api/youtube/channels` el mensaje de error y ajusta las restricciones.
