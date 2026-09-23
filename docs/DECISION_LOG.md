# DECISION_LOG.md — decisiones de ingeniería (con alternativas descartadas)

## D1. App 100% estática, sin backend
**Decisión:** HTML + CSS + JS vanilla, todo en el navegador, persistencia en `localStorage`.
**Alternativas descartadas:** backend Node/Python con Gmail API (pide OAuth y verificación de Google en clase), LLM externo para clasificar (coste, latencia, caja negra, los correos saldrían del equipo).
**Por qué:** privacidad total con datos sensibles, coste 0, despliegue en 2 min y reglas auditables. Es la decisión que defendemos el 13/10.

## D2. Heurísticas explicables en vez de ML
**Decisión:** `classify()` con pesos fijos y motivos visibles por correo (keywords ES/EN, unsubscribe, mayúsculas, remitente repetido, TLD sospechoso, phishing).
**Alternativa descartada:** TF-IDF + regresión logística (necesita dataset etiquetado que no tenemos y no se explica en 5 min).
**Por qué:** cada veredicto muestra el porqué; un falso positivo se detecta y corrige en minutos.

## D3. Umbrales ≥70 / 45–69 / <45
**Decisión:** SPAM probable ≥70, promo/newsletter 45–69, bandeja <45.
**Por qué:** calibrado con 3 casos de prueba (SHEIN→spam, factura→inbox, profe→inbox). Fijados en `tests/run-tests.js` para que nadie los rompa sin darse cuenta.

## D4. Sin borrado real en Gmail (MVP)
**Decisión:** archivar/eliminar simulados + lista de enlaces unsubscribe + exportar plan CSV.
**Alternativa descartada:** `gmail.users.messages.modify` con OAuth (riesgo de borrar de verdad en una demo).
**Por qué:** seguridad en la defensa; el CSV es la evidencia entregable.

## D5. Lógica compartida `classifier.js` + 12 tests + CI
**Decisión:** el clasificador vive en `classifier.js` (fuente única) y se testea con `npm test` en cada push vía GitHub Actions.
**Por qué:** antes la lógica estaba duplicada entre app y tests; así un cambio de pesos que marque facturas como spam rompe la CI en vez de la demo.

## D6. CSV simple como puente con Gmail real
**Decisión:** importar `from,subject,snippet,date,sizeKB,hasUnsubscribe` en vez de OAuth directo.
**Por qué:** funciona sin credenciales (Takeout o copiar-pegar) y mantiene la privacidad del D1.
