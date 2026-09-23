# Informe de reflexión — MailClean (1–2 páginas)

## 1. Qué hizo la IA
- Propuso 3 ideas iniciales y, tras nuestra contrapropuesta, diseñó el alcance del MVP (demo + importar + clasificar + limpiar).
- Generó el boilerplate completo: `index.html`, `styles.css`, `app.js` con 24 correos demo y la función `classify()` con keywords ES/EN, dominios sospechosos y detección de phishing.
- Generó borradores de README, PROMPT-LOG, informe y guion de presentación.
- Todo el trabajo repetitivo (CSS responsive, render de lista, export CSV, localStorage) lo hizo en minutos.

## 2. Qué hicimos nosotros
- **Idea y recorte:** elegimos "limpiar SPAM de Gmail" y dejamos el borrado real vía Gmail API fuera del MVP por seguridad y tiempo. Solo simulamos archivar/eliminar + lista de bajas.
- **Decisión técnica (la que defendemos):** app 100% estática en cliente, sin backend ni IA externa. Motivos: (a) los correos son datos sensibles, (b) coste 0 y despliegue en 2 min en Vercel, (c) reglas explicables y auditables frente a caja negra. Esta decisión la tomamos nosotros, la IA solo la implementó.
- **Calidad:** definimos umbrales (≥70 spam / 45–69 promo / <45 inbox), diseñamos 3 casos de prueba (SHEIN, factura luz, email profesora) y obligamos a que cada veredicto muestre motivos.
- **Verificación y despliegue:** probamos en local con `python -m http.server`, subiremos a GitHub + Vercel y pegaremos la URL en el README. Ensayaremos la demo de 5 min.

## 3. Qué errores cometió la IA y cómo los detectamos
1. **Falsos positivos (grave):** marcaba "Tu factura de septiembre" y "Aula defensa 13 octubre" como promo por palabras sueltas. Lo detectamos con nuestros 3 casos de prueba manuales. Corrección: lista de exclusión para `universidad|factura|pedido|biblioteca` y ajuste de pesos. Aprendizaje: la IA optimiza para el caso spam y olvida los importantes.
2. **Score >100:** sumaba pesos sin tope y mostraba 112/100. Detectado a ojo en la demo. Corrección: `Math.min(100, score)`. Aprendizaje: siempre pedir cotas y probar extremos.
3. **CSV frágil:** usaba `split(",")` que rompe asuntos con comas. Detectado al importar un CSV real. Decisión: documentar formato simple en README y dejar parser robusto como mejora futura (no crítica para el MVP).
4. **Alucinación de API:** propuso "borrado real con una llamada" sin mencionar OAuth, scopes ni verificación de Google. Lo frenamos nosotros y lo movimos a "fuera de alcance documentado". Aprendizaje: la IA minimiza la fricción de integraciones externas; el humano debe poner el límite de seguridad.

## 4. Conclusión
La IA es un programador junior rapidísimo: entrega el 80% en minutos. Nosotros fuimos el senior: pusimos el problema, los límites, los casos de prueba y la decisión de privacidad. Sin nuestra dirección, el MVP habría borrado facturas y pedido credenciales de Gmail en clase. Con dirección, entregamos algo útil, funcional y explicable en 5 minutos.
