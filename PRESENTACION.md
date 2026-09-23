# PRESENTACION.md — Guion defensa 13/10 (5 min)

**MailClean — limpia tu Gmail en 2 minutos.** Traed portátil con la URL de Vercel abierta + CSV exportado como backup por si falla el wifi.

## Minuto a minuto
- **0:00–0:40 Problema:** "¿Quién tiene +2.000 correos sin leer? SHEIN, TEMU, casinos, phishing del 'banco'. Borrar a mano es eterno y da miedo borrar la factura o el email del profe." Mostrar bandeja demo sin filtrar.
- **0:40–2:30 Demo viva:** Cargar demo → Escanear → filtrar *SPAM probable* (enseñar scores 85–95 con motivos) → buscar "factura" para mostrar que NO la marca → seleccionar 5 → Ver bajas → Eliminar → Exportar plan CSV. Frase clave: "cada veredicto explica el porqué".
- **2:30–3:30 Decisión técnica (1 que nos piden):** "Todo en cliente, sin backend ni IA externa." Por qué: 1) privacidad (correos sensibles no salen del navegador), 2) coste 0 y despliegue estático en 2 min, 3) reglas auditables vs caja negra. Alternativa descartada: backend con Gmail API + LLM (caro, pide OAuth en clase, inexplicable).
- **3:30–4:20 Error de la IA y cómo lo cazamos:** "La IA marcaba la factura y el email de Secretaría como promo. Lo cazamos con 3 casos de prueba y lo corregimos con exclusiones y tope 100. Sin ese test, la demo borra lo importante." Enseñar PROMPT-LOG sesión 3.
- **4:20–5:00 Cierre:** roadmap (OAuth real, parser CSV robusto) + pedir preguntas. Mostrar README con URL despliegue + repo.

## Checklist
- [ ] URL Vercel en README pegada
- [ ] Repo GitHub público o ZIP listo
- [ ] CSV exportado en USB por si no hay internet
- [ ] Cronometrados 5 min exactos
