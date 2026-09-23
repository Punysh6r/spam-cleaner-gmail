// MailClean MVP — clasificador heurístico explicable, 100% cliente.
// Decisión técnica: sin backend ni IA externa (privacidad + coste 0 + auditable).

const KEYWORDS = [
  "descuento","oferta","sale","saldos","gratis","gana","ganaste","premio","cripto","crypto",
  "préstamo","prestamo","viagra","casino","apuesta","shein","temu","aliexpress","cupón","cupon",
  "solo hoy","última hora","ultima hora","urgente","herencia","millonario","forex","trading",
  "resultado loteria","lotería","loteria","inversión garantizada","trabaja desde casa","onlyfans"
];

const DEMO = [
  {from:"shein-ofertas@promo.shein.com",name:"SHEIN",subject:"-80% SOLO HOY!!! Cupón gratis 🎁",snippet:"Compra ya, últimos minutos, haz clic aquí para reclamar tu premio",date:"2026-09-20",sizeKB:180,hasUnsubscribe:true,unsub:"https://promo.shein.com/unsub?m=123"},
  {from:"temu-sale@deals.temu.com",name:"TEMU",subject:"Gana 100€ gratis, oferta última hora",snippet:"Solo hoy, descuento increíble, click aquí",date:"2026-09-19",sizeKB:210,hasUnsubscribe:true,unsub:"https://temu.com/unsubscribe"},
  {from:"newsletter@elcorteingles.es",name:"El Corte Inglés",subject:"Semana de descuentos en tecnología",snippet:"Suscripción semanal. Date de baja aquí si no quieres recibirlo.",date:"2026-09-18",sizeKB:320,hasUnsubscribe:true,unsub:"https://elcorteingles.es/baja"},
  {from:"no-reply@banco-seguro.xyz",name:"Banco Seguro",subject:"URGENTE: tu cuenta será bloqueada",snippet:"Verifica ya tu cuenta haciendo clic en este enlace externo",date:"2026-09-18",sizeKB:95,hasUnsubscribe:false,unsub:""},
  {from:"crypto-gains@forex-pro.io",name:"Forex Pro",subject:"Inversión garantizada 300% con crypto",snippet:"Trabaja desde casa y gana miles, sin riesgo",date:"2026-09-17",sizeKB:140,hasUnsubscribe:false,unsub:""},
  {from:"loteria-premios@lotto-win.top",name:"Lotto Win",subject:"GANASTE la lotería, reclama tu premio",snippet:"Has sido seleccionado, envía tus datos para recibir herencia",date:"2026-09-16",sizeKB:110,hasUnsubscribe:false,unsub:""},
  {from:"aliexpress@deals.mail.com",name:"AliExpress",subject:"Cupón $5 gratis + sale flash",snippet:"Ofertas, saldos, compra ahora",date:"2026-09-15",sizeKB:260,hasUnsubscribe:true,unsub:"https://aliexpress.com/unsub"},
  {from:"farmacia-online@descuentos.biz",name:"Farmacia Online",subject:"Viagra barato sin receta, OFERTA",snippet:"Descuento 90%, compra discreta aquí",date:"2026-09-14",sizeKB:130,hasUnsubscribe:false,unsub:""},
  {from:"apuestas@casino-vip.pro",name:"Casino VIP",subject:"Bono casino 500€ gratis solo hoy",snippet:"Apuesta y gana, premio seguro",date:"2026-09-13",sizeKB:170,hasUnsubscribe:true,unsub:"https://casino-vip.pro/baja"},
  {from:"linkedin-invitations@linkedin.com",name:"LinkedIn",subject:"Tienes 3 invitaciones nuevas",snippet:"Conecta con ex-compañeros. Gestiona tus notificaciones.",date:"2026-09-20",sizeKB:90,hasUnsubscribe:true,unsub:"https://linkedin.com/settings/email"},
  {from:"github@github.com",name:"GitHub",subject:"[curso-mvp] nuevo issue asignado",snippet:"Se te ha asignado revisar el README del proyecto",date:"2026-09-21",sizeKB:45,hasUnsubscribe:false,unsub:""},
  {from:"prof.martin@universidad.es",name:"Prof. Martín",subject:"Entrega final: instrucciones 9/10",snippet:"Adjunto rúbrica y fecha de defensa 13 de octubre, 5 minutos por grupo.",date:"2026-09-22",sizeKB:60,hasUnsubscribe:false,unsub:""},
  {from:"facturas@energia-luz.es",name:"Energía Luz",subject:"Tu factura de septiembre disponible",snippet:"Puedes descargar tu factura en el área cliente.",date:"2026-09-19",sizeKB:310,hasUnsubscribe:false,unsub:""},
  {from:"noreply@banco.es",name:"Tu Banco",subject:"Movimiento tarjeta ****1234",snippet:"Compra de 24,90€ en librería. Si no fuiste tú, contáctanos.",date:"2026-09-21",sizeKB:55,hasUnsubscribe:false,unsub:""},
  {from:"spotify@news.spotify.com",name:"Spotify",subject:"Tu resumen semanal + novedades",snippet:"Nuevas playlists. Date de baja de este boletín aquí.",date:"2026-09-17",sizeKB:190,hasUnsubscribe:true,unsub:"https://spotify.com/unsub"},
  {from:"ryanair@ofertas.ryanair.com",name:"Ryanair",subject:"Vuelos desde 9,99€, ¡solo hoy!",snippet:"Oferta flash, reserva ya. Para no recibir más, date de baja.",date:"2026-09-16",sizeKB:240,hasUnsubscribe:true,unsub:"https://ryanair.com/unsubscribe"},
  {from:"amazon@amazon.es",name:"Amazon",subject:"Tu pedido ha sido enviado",snippet:"Llega mañana antes de las 13h. Seguimiento disponible.",date:"2026-09-22",sizeKB:70,hasUnsubscribe:false,unsub:""},
  {from:"decathlon@newsletter.decathlon.es",name:"Decathlon",subject:"-30% en deporte esta semana",snippet:"Newsletter semanal con unsubscribe al pie.",date:"2026-09-15",sizeKB:280,hasUnsubscribe:true,unsub:"https://decathlon.es/baja-news"},
  {from:"info@herencia-abogado.com",name:"Abogado Herencia",subject:"Herencia millonaria a tu nombre, urgente",snippet:"Soy abogado, necesito tus datos bancarios para transferir",date:"2026-09-12",sizeKB:85,hasUnsubscribe:false,unsub:""},
  {from:"onlyfans-promo@spam.co",name:"Promo X",subject:"Contenido gratis, haz clic aquí",snippet:"Gana acceso premium gratis hoy",date:"2026-09-11",sizeKB:150,hasUnsubscribe:false,unsub:""},
  {from:"biblioteca@universidad.es",name:"Biblioteca",subject:"Préstamo: devolución el viernes",snippet:"Recuerda devolver el libro antes del viernes.",date:"2026-09-21",sizeKB:40,hasUnsubscribe:false,unsub:""},
  {from:"netflix@netflix.com",name:"Netflix",subject:"Novedades que te pueden gustar",snippet:"Nuevas series. Cambia tus preferencias de email aquí.",date:"2026-09-14",sizeKB:200,hasUnsubscribe:true,unsub:"https://netflix.com/emailprefs"},
  {from:"secretaria@universidad.es",name:"Secretaría",subject:"Aula defensa 13 octubre asignada",snippet:"Tu grupo defiende a las 10:20 en el aula B. Traed portátil.",date:"2026-09-22",sizeKB:50,hasUnsubscribe:false,unsub:""},
  {from:"uber-eats@promo.uber.com",name:"Uber Eats",subject:"20% descuento en tu próximo pedido",snippet:"Código solo hoy. Date de baja si no quieres promos.",date:"2026-09-13",sizeKB:160,hasUnsubscribe:true,unsub:"https://uber.com/unsub-eats"},
];

let state = { mails: [], selected: new Set(), archived: new Set(), deleted: new Set() };

function norm(s){ return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }

// Clasificador explicable: devuelve {score, reasons, category}
function classify(mail, all){
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

function catLabel(c){ return c==="spam"?"SPAM probable":c==="promo"?"Promo / newsletter":"Bandeja principal"; }
function catClass(c){ return c==="spam"?"b-spam":c==="promo"?"b-promo":"b-inbox"; }
function esc(s){ return (s||"").replace(/[&<>"]/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m])); }

function loadDemo(){
  state.mails = DEMO.map((m,i)=>({...m,id:"demo-"+i}));
  state.selected.clear(); state.archived.clear(); state.deleted.clear();
  persist(); render();
}

function persist(){
  try{ localStorage.setItem("mailclean-v1", JSON.stringify({ids:state.mails.map(m=>m.id),arch:[...state.archived],del:[...state.deleted]})); }catch(e){}
}

function visibleMails(){
  const q = norm(document.getElementById("q").value);
  const f = document.getElementById("filtro").value;
  const o = document.getElementById("orden").value;
  let arr = state.mails.map(m=>({...m, ...classify(m, state.mails)}));
  if(q) arr = arr.filter(m=>norm(m.from).includes(q)||norm(m.subject).includes(q));
  if(f==="spam"||f==="promo"||f==="inbox") arr = arr.filter(m=>m.category===f);
  if(f==="seleccionados") arr = arr.filter(m=>state.selected.has(m.id));
  arr.sort((a,b)=> o==="fecha"? String(b.date).localeCompare(String(a.date)) : o==="size"? (b.sizeKB-a.sizeKB) : (b.score-a.score));
  return arr;
}

function render(){
  const vis = visibleMails();
  document.getElementById("selCount").textContent = `${state.selected.size} seleccionados`;
  const totals = state.mails.map(m=>classify(m,state.mails));
  const n = t => totals.filter(x=>x.category===t).length;
  document.getElementById("stTotal").textContent = state.mails.length;
  document.getElementById("stSpam").textContent = n("spam");
  document.getElementById("stPromo").textContent = n("promo");
  document.getElementById("stInbox").textContent = n("inbox");
  const mb = state.mails.filter(m=>{const c=classify(m,state.mails);return c.category!=="inbox"&&!state.deleted.has(m.id);}).reduce((a,m)=>a+(+m.sizeKB||0),0)/1024;
  document.getElementById("stSize").textContent = mb.toFixed(1)+" MB";

  const box = document.getElementById("lista");
  if(!state.mails.length){ box.innerHTML = `<div class="mail"><div></div><div><div class="m-sub">Sin correos. Pulsa <b>Cargar demo</b> o importa un CSV.</div><div class="m-sn">Formato CSV: from,subject,snippet,date,sizeKB,hasUnsubscribe</div></div><div></div></div>`; return; }
  box.innerHTML = vis.map(m=>{
    const cls = state.selected.has(m.id)?" sel":"";
    const st = state.deleted.has(m.id)?" deleted":state.archived.has(m.id)?" archived":"";
    return `<div class="mail${cls}${st}">
      <div><input type="checkbox" data-id="${m.id}" ${state.selected.has(m.id)?"checked":""} /></div>
      <div>
        <div class="m-from">${esc(m.name)} <span class="muted">&lt;${esc(m.from)}&gt;</span></div>
        <div class="m-sub">${esc(m.subject)}</div>
        <div class="m-sn">${esc(m.snippet)}</div>
        <div class="m-meta"><span>📅 ${esc(m.date)}</span><span>📦 ${m.sizeKB} KB</span>
        ${m.hasUnsubscribe?`<span>🔕 tiene baja</span>`:""}
        ${state.archived.has(m.id)?"<span>📥 archivado</span>":""}${state.deleted.has(m.id)?"<span>🗑 eliminado</span>":""}</div>
        <ul class="reasons">${m.reasons.map(r=>`<li>• ${esc(r)}</li>`).join("")}</ul>
      </div>
      <div class="right"><div class="score">${m.score}</div><div><span class="badge ${catClass(m.category)}">${catLabel(m.category)}</span></div></div>
    </div>`;
  }).join("");
  box.querySelectorAll('input[type=checkbox]').forEach(c=>c.onchange=()=>{ c.checked?state.selected.add(c.dataset.id):state.selected.delete(c.dataset.id); render(); });
}

function exportCSV(){
  const rows = [["id","from","subject","score","category","action","unsubscribe"]];
  state.mails.forEach(m=>{
    const c = classify(m,state.mails);
    const act = state.deleted.has(m.id)?"eliminar":state.archived.has(m.id)?"archivar":(c.category!=="inbox"&&state.selected.has(m.id)?"pendiente":"revisar");
    rows.push([m.id, `"${(m.from||"").replace(/"/g,'""')}"`, `"${(m.subject||"").replace(/"/g,'""')}"`, c.score, c.category, act, m.unsub||""]);
  });
  const blob = new Blob([rows.map(r=>r.join(",")).join("\n")],{type:"text/csv"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "plan-limpieza-mailclean.csv"; a.click();
}

function renderUnsub(){
  const sel = state.mails.filter(m=>state.selected.has(m.id)&&m.hasUnsubscribe&&m.unsub);
  const panel = document.getElementById("unsubPanel");
  document.getElementById("unsubN").textContent = `(${sel.length})`;
  document.getElementById("unsubList").innerHTML = sel.map(m=>`<li><b>${esc(m.name)}</b> — <a href="${esc(m.unsub)}" target="_blank" rel="noopener">${esc(m.unsub)}</a></li>`).join("") || "<li>Selecciona correos con enlace de baja primero.</li>";
  panel.classList.remove("hidden"); panel.scrollIntoView({behavior:"smooth"});
}

function importCSV(text){
  const lines = text.trim().split(/\r?\n/); if(lines.length<2) return alert("CSV vacío. Cabecera: from,subject,snippet,date,sizeKB,hasUnsubscribe");
  const rows = lines.slice(1).map((ln,i)=>{
    const parts = ln.split(","); // formato simple sin comas escapadas salvo básico
    return {id:"csv-"+Date.now()+"-"+i, from:(parts[0]||"desconocido@mail.com").trim(), subject:(parts[1]||"Sin asunto").trim(), snippet:(parts[2]||"").trim(), date:(parts[3]||"2026-09-22").trim(), sizeKB:+(parts[4]||100), hasUnsubscribe:/true|1|si/i.test(parts[5]||""), name:(parts[0]||"").split("@")[0], unsub:""};
  });
  state.mails = rows; state.selected.clear(); state.archived.clear(); state.deleted.clear(); render();
  alert(`Importados ${rows.length} correos. Revisa el score y filtra por SPAM.`);
}

document.getElementById("btnDemo").onclick = loadDemo;
document.getElementById("btnScan").onclick = render;
document.getElementById("q").oninput = render;
document.getElementById("filtro").onchange = render;
document.getElementById("orden").onchange = render;
document.getElementById("btnGmail").onclick = ()=>document.getElementById("dlgGmail").showModal();
document.getElementById("btnExport").onclick = exportCSV;
document.getElementById("btnUnsub").onclick = renderUnsub;
document.getElementById("btnArchive").onclick = ()=>{ state.selected.forEach(id=>state.archived.add(id)); persist(); render(); };
document.getElementById("btnDelete").onclick = ()=>{ if(!state.selected.size) return alert("Selecciona al menos 1 correo."); if(confirm(`¿Eliminar ${state.selected.size} correos? (simulado, reversible con Restablecer)`)){ state.selected.forEach(id=>state.deleted.add(id)); persist(); render(); } };
document.getElementById("btnReset").onclick = loadDemo;
document.getElementById("selAll").onchange = e=>{ visibleMails().forEach(m=>e.target.checked?state.selected.add(m.id):state.selected.delete(m.id)); render(); };
document.getElementById("file").onchange = e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>importCSV(r.result); r.readAsText(f); e.target.value=""; };

// Arranque: demo automática para que la defensa funcione al abrir el enlace
loadDemo();
