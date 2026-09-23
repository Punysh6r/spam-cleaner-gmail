// classifier.js — lógica pura del clasificador MailClean (sin DOM).
// Fuente única de verdad: la usa app.js en el navegador y tests/run-tests.js en Node.
// Decisión técnica: reglas explicables en cliente (privacidad + coste 0 + auditable).

const KEYWORDS = [
  "descuento","oferta","sale","saldos","gratis","gana","ganaste","premio","cripto","crypto",
  "préstamo","prestamo","viagra","casino","apuesta","shein","temu","aliexpress","cupón","cupon",
  "solo hoy","última hora","ultima hora","urgente","herencia","millonario","forex","trading",
  "resultado loteria","lotería","loteria","inversión garantizada","trabaja desde casa","onlyfans"
];

function norm(s){ return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }

// Clasificador explicable: devuelve {score, reasons, category}
// Umbrales: >=70 spam · 45–69 promo/newsletter · <45 bandeja principal
function classify(mail, all){
  all = all || [];
  let score = 0; const reasons = [];
  const subj = norm(mail.subject), snip = norm(mail.snippet), from = norm(mail.from);
  const hits = KEYWORDS.filter(k => subj.includes(norm(k)) || snip.includes(norm(k)));
  if(hits.length){ score += Math.min(30 + hits.length*5, 45); reasons.push(`Palabras promo/spam: ${hits.slice(0,4).join(", ")} (+${Math.min(30+hits.length*5,45)})`); }
  if(mail.hasUnsubscribe){ score += 25; reasons.push("Incluye enlace darse de baja / newsletter (+25)"); }
  if(/unsubscribe|darse de baja|date de baja|clic aqu|click aqu/.test(snip)){ score += 10; reasons.push("Texto típico de boletín masivo (+10)"); }
  if(/[A-ZÁÉÍÓÚ ]{12,}/.test(mail.subject||"") || /!!!|\$\$\$|🎁|€€/.test(mail.subject||"")){ score += 12; reasons.push("Asunto en mayúsculas / símbolos agresivos (+12)"); }
  const freq = all.filter(m => m.from===mail.from).length;
  if(freq>1){ score += 12; reasons.push(`Remitente repetido (${freq} correos) (+12)`); }
  if(/\.xyz$|\.top$|\.biz$|\.pro$|\.io$/.test(from.split("@")[1]||"")){ score += 14; reasons.push("Dominio sospechoso (.xyz/.top/.biz/.pro/.io) (+14)"); }
  if(/banco|cuenta.*bloqueada|verifica.*cuenta/.test(subj+snip) && !/universidad|factura|pedido/.test(subj+snip)){ score += 18; reasons.push("Posible phishing bancario (+18)"); }
  if(!reasons.length){ reasons.push("Sin señales de spam: remitente conocido y asunto normal (+0)"); }
  score = Math.max(0, Math.min(100, score));
  const category = score>=70 ? "spam" : score>=45 ? "promo" : "inbox";
  return {score, reasons, category};
}

if (typeof module !== "undefined" && module.exports){ module.exports = { KEYWORDS, norm, classify }; }
