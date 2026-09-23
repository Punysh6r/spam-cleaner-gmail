# PROMPT-LOG.md — Memoria de sesiones con IA (evidencia del proceso)

> Entregable 4 del curso. Registra cómo dirigimos al agente (Opencode / Muse Spark), qué le pedimos, qué devolvió y qué corregimos nosotros. Fechas en UTC.

## Sesión 1 — 23/09/2026 — Definición del MVP (15 min)
**Objetivo:** elegir idea útil y defendible en 5 min.
**Prompt:**
> "No tenemos idea. Propón 3 MVPs simples, útiles y desplegables antes del 9/10, con decisión técnica fácil de defender."
**Respuesta IA:** propuso ReservaFácil, GastoClaro, DudasClase.
**Nuestra decisión:** descartamos las 3. Propusimos idea propia: "limpiador de SPAM de Gmail". Motivo: problema real que sufrimos, demo muy visual (antes/después de bandeja) y permite hablar de privacidad.
**Dirección humana:** acotamos alcance para que fuera viable sin backend ni credenciales reales.

## Sesión 2 — 23/09/2026 — Diseño y decisión técnica (20 min)
**Prompt:**
> "Diseña MVP MailClean: clasificación explicable en cliente, demo + importar CSV + acciones lote + unsubscribe. Sin backend por privacidad. Dame alcance MVP vs fuera de alcance."
**Respuesta IA:** alcance cerrado + decisión "100% estático, reglas auditables vs IA externa".
**Nuestra aportación:** exigimos que cada veredicto muestre motivos (para el informe de errores) y que el borrado real quedara fuera del MVP por seguridad. Definimos umbrales: ≥70 spam, 45–69 promo, <45 inbox.

## Sesión 3 — 23/09/2026 — Generación del código (30 min)
**Prompt:**
> "Genera index.html + styles.css + app.js vanilla, sin dependencias, con 24 emails demo, función classify() con keywords ES/EN, y persistencia localStorage."
**Respuesta IA:** generó los 3 ficheros + 24 correos.
**Errores que detectamos (ver informe):**
1. Falsos positivos: marcaba facturas y correos de la universidad como promo por contener "oferta" en snippet → corregimos añadiendo lista de exclusión (`universidad|factura|pedido`) y bajamos peso.
2. `split(",")` rompía CSV con comas en asunto → documentamos formato simple y añadimos ejemplo en README.
3. Score >100 en correos con muchas keywords → añadimos `Math.min(100,…)`.
**Cómo los detectamos:** prueba manual con 3 casos: "factura luz", "aula defensa" y "SHEIN -80%". Los dos primeros no deben pasar de 45.

## Sesión 4 — 23/09/2026 — Documentación de entrega (20 min)
**Prompt:**
> "Genera README (problema, funciones, stack, run local, despliegue), PROMPT-LOG, informe reflexión 1-2 páginas y guion 5 min con 1 decisión técnica."
**Respuesta IA:** borradores de los 4 docs.
**Nuestra edición:** reescribimos problema con nuestras palabras, añadimos URL despliegue pendiente, fechas reales 9/10 y 13/10, y firmamos quién hizo qué.

## Sesión 5 — 23/09/2026 — Profesionalizar el repo (30 min)
**Objetivo:** que el repo se vea tan profesional como `btc-quant-analysis` (badges, tests, LICENSE, CI).
**Prompt:**
> "Mira mi repo btc-quant-analysis y deja spam-cleaner-gmail igual de profesional: badges, LICENSE MIT, tests y CI."
**Respuesta IA:** extrajo el clasificador a `classifier.js` (fuente única), creó 12 tests sin dependencias (`npm test`), workflow de CI, `LICENSE MIT`, `docs/DECISION_LOG.md` y README con badges + tabla de resultados verificados.
**Nuestra verificación:** `npm test` → 12 passed; comprobamos a mano los scores del README (SHEIN 92, phishing 67, factura 0).
**Error que cazamos:** al duplicar la lógica entre app y tests, un cambio de pesos podía romper la demo sin avisar → la CI lo impide ahora.

## Sesión 6 — Pendiente (antes del 9/10) — Despliegue y ensayo
**Plan:** subir a GitHub → Deploy en Vercel → pegar URL en README → ensayar demo 5 min con cronómetro → exportar plan CSV como evidencia.
**Prompts previstos:** "Dame pasos Vercel para sitio estático" / "Revisa este error de deploy: …".

## Sesión 6 — 23/09/2026 — Pack nota máxima (mejoras)
**Objetivo:** subir de 8 a 9+ con parser robusto, top-remitentes, favicon/OG y más tests.
**Respuesta IA:** `csv.js` + 4 tests, vista top-remitentes con selección de golpe, favicon SVG + meta OG, badge a 16 tests.
**Nuestra verificación:** `npm test` → 16 passed; importar CSV con comas entre comillas ya no se rompe.

## Resumen de dirección (para la defensa)
- Nosotros: idea, alcance, umbrales, casos de prueba, decisión privacidad, despliegue.
- IA: boilerplate, 24 datos demo, CSS base, borradores docs.
- Regla de trabajo: nunca aceptar código sin abrir `app.js`, probar 3 correos y pedir explicación de cada regla.
