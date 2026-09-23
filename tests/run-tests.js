// tests/run-tests.js — 12 tests del clasificador MailClean, sin dependencias.
// Ejecutar: npm test  (o: node tests/run-tests.js)
const assert = require("node:assert/strict");
const { norm, classify } = require("../classifier.js");

let passed = 0;
function t(name, fn) { fn(); passed++; console.log("ok - " + name); }

const spamSHEIN = {
  from: "shein-ofertas@promo.shein.com",
  subject: "-80% SOLO HOY!!! Cupón gratis",
  snippet: "Compra ya, últimos minutos, haz clic aquí para reclamar tu premio",
  hasUnsubscribe: true
};
const factura = {
  from: "facturas@energia-luz.es",
  subject: "Tu factura de septiembre disponible",
  snippet: "Puedes descargar tu factura en el área cliente.",
  hasUnsubscribe: false
};
const profe = {
  from: "prof.martin@universidad.es",
  subject: "Entrega final: instrucciones 9/10",
  snippet: "Adjunto rúbrica y fecha de defensa 13 de octubre.",
  hasUnsubscribe: false
};
const phishing = {
  from: "no-reply@banco-seguro.xyz",
  subject: "URGENTE: tu cuenta será bloqueada",
  snippet: "Verifica ya tu cuenta haciendo clic en este enlace externo",
  hasUnsubscribe: false
};

t("spam SHEIN puntúa >=70 y es categoría spam", () => {
  const r = classify(spamSHEIN, [spamSHEIN]);
  assert.ok(r.score >= 70, "score=" + r.score);
  assert.equal(r.category, "spam");
});

t("factura de la luz queda en bandeja principal (<45)", () => {
  const r = classify(factura, [factura]);
  assert.ok(r.score < 45, "score=" + r.score);
  assert.equal(r.category, "inbox");
});

t("email del profesor queda en bandeja principal", () => {
  const r = classify(profe, [profe]);
  assert.equal(r.category, "inbox");
});

t("phishing bancario se detecta y no es inbox", () => {
  const r = classify(phishing, [phishing]);
  assert.ok(r.reasons.join(" ").includes("phishing"));
  assert.notEqual(r.category, "inbox");
});

t("enlace unsubscribe suma exactamente +25", () => {
  const base = { from: "news@test.com", subject: "Novedades de la semana", snippet: "Hola, esto es una prueba normal", hasUnsubscribe: false };
  const con = { ...base, hasUnsubscribe: true };
  assert.equal(classify(con, [con]).score - classify(base, [base]).score, 25);
});

t("dominio sospechoso (.xyz) suma +14 con motivo", () => {
  const m = { from: "x@promo.xyz", subject: "Hola", snippet: "Mensaje normal", hasUnsubscribe: false };
  const r = classify(m, [m]);
  assert.equal(r.score, 14);
  assert.ok(r.reasons.join(" ").includes("sospechoso"));
});

t("asunto en mayúsculas suma +12", () => {
  const low = { from: "x@test.com", subject: "ganaste un premio increible hoy", snippet: "hola", hasUnsubscribe: false };
  const up = { ...low, subject: "GANASTE UN PREMIO INCREIBLE HOY" };
  assert.equal(classify(up, [up]).score - classify(low, [low]).score, 12);
});

t("el score nunca pasa de 100 aunque todo dispare", () => {
  const m = {
    from: "a@x.xyz", subject: "GRATIS OFERTA DESCUENTO PREMIO!!!",
    snippet: "date de baja, clic aquí, solo hoy, gana gratis", hasUnsubscribe: true
  };
  const r = classify(m, [m, { ...m }]);
  assert.equal(r.score, 100);
  assert.equal(r.category, "spam");
});

t("remitente repetido suma +12", () => {
  const m1 = { from: "news@test.com", subject: "Hola", snippet: "Qué tal?", hasUnsubscribe: false };
  const m2 = { ...m1 };
  assert.equal(classify(m1, [m1, m2]).score, 12);
});

t("correo limpio explica que no hay señales", () => {
  const r = classify(factura, [factura]);
  assert.ok(r.reasons.join(" ").includes("Sin señales"));
});

t("campos vacíos no rompen el clasificador", () => {
  const r = classify({ from: "", subject: "", snippet: "" }, []);
  assert.equal(r.score, 0);
  assert.equal(r.category, "inbox");
});

t("norm quita acentos para cazar keywords", () => {
  assert.equal(norm("cupón OFERTA"), "cupon oferta");
});

console.log(`\n${passed} passed`);
