# MailClean — Limpiador de SPAM de Gmail (MVP)

**Problema que resuelve:** la bandeja de Gmail se llena de SPAM, promociones agresivas (SHEIN, TEMU, casinos, phishing) y newsletters que nunca abrimos. Revisarlos uno a uno quita horas y es fácil borrar algo importante. MailClean los detecta, explica por qué son basura y genera un plan de limpieza en 2 minutos.

**Demo en 1 clic:** abre la app → pulsa *Cargar demo* → filtra por *SPAM probable* → selecciona → Archivar / Eliminar / Ver bajas → Exporta el CSV.

## Funcionalidades (MVP)
- [x] Carga demo con 24 correos realistas (spam, promos, newsletters, importantes)
- [x] Clasificador heurístico explicable 0–100 con motivos visibles (`classify()` en `app.js`)
- [x] Filtros: todos / spam / promos / bandeja / seleccionados + buscador + orden
- [x] Acciones en lote: archivar, eliminar (simulado y reversible), lista de enlaces unsubscribe
- [x] Dashboard: totales, % spam, MB liberables estimados
- [x] Importar CSV propio (`from,subject,snippet,date,sizeKB,hasUnsubscribe`)
- [x] Exportar plan de limpieza CSV (evidencia para el email de entrega)
- [x] Modal "Conectar Gmail real" con 3 vías (Takeout / copiar-pegar / OAuth API)
- [ ] Fuera de alcance MVP: borrado real en Gmail vía API (documentado, no implementado por seguridad)

## Stack
- HTML + CSS + JavaScript vanilla, **sin framework, sin backend, sin base de datos**
- Persistencia: `localStorage` (nada sale del navegador)
- Despliegue: sitio estático → Vercel / Netlify / GitHub Pages
- Por qué este stack (decisión técnica a defender el 13/10): privacidad total (los correos son sensibles), coste 0, despliegue en 2 min y reglas auditables frente a una IA caja negra.

## Cómo ejecutarlo en local
Opción 1 (más fácil, doble clic):
1. Descarga el repo o ZIP
2. Abre `index.html` en Chrome/Edge

Opción 2 (recomendada, como servidor):
```bash
# Python
python -m http.server 8000
# abre http://localhost:8000
```
```bash
# Node
npx serve .
```

## Cómo desplegarlo (2 min)
**Vercel:**
1. Sube este repo a GitHub
2. En vercel.com → New Project → importa el repo → Deploy (no requiere build, `vercel.json` ya incluido)

**Netlify:** arrastra la carpeta a app.netlify.com/drop → te da URL pública.

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` → `/ (root)`.

> Enlace al despliegue: _pega aquí tu URL de Vercel/Netlify una vez desplegado_  
> Ejemplo: `https://mailclean-mvp.vercel.app`

## Conectar Gmail real
- **A (recomendada):** `takeout.google.com` → solo Gmail → exportar → crea un CSV con cabecera `from,subject,snippet,date,sizeKB,hasUnsubscribe` e impórtalo con *Importar CSV*.
- **B:** en Gmail busca `unsubscribe`, copia remitente+asunto a CSV e importa.
- **C (avanzada):** Google Cloud → OAuth Client ID → habilitar Gmail API → usar `gapi.client.gmail.users.messages.list`. No incluida para no pedir credenciales en clase.

Ejemplo CSV:
```csv
from,subject,snippet,date,sizeKB,hasUnsubscribe
shein-ofertas@promo.shein.com,-80% SOLO HOY,compra ya clic aqui,2026-09-20,180,true
prof.martin@universidad.es,Entrega final 9/10,rubrica y defensa,2026-09-22,60,false
```

## Estructura
```
index.html            → UI
styles.css            → diseño
app.js                → datos demo + classify() + acciones
README.md             → este fichero
PROMPT-LOG.md         → memoria de sesiones con IA
INFORME-REFLEXION.md  → qué hizo la IA / qué hicimos / errores
PRESENTACION.md       → guion defensa 5 min (13/10)
vercel.json           → config despliegue estático
```

## Equipo y email de entrega (antes del 9/10 23:59)
Adjuntar en un solo email: 1) enlace GitHub o ZIP, 2) enlace Vercel/Netlify, 3) README (este), 4) PROMPT-LOG.md, 5) informe reflexión, 6) indicar hora defensa.
