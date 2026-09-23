// csv.js — parser CSV robusto (comillas, comas dentro de campos, CRLF, cabecera).
// Puro, sin DOM: lo usa app.js y tests/run-tests.js.
function parseCSV(text){
  text = String(text || "").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [], val = "", q = false;
  for(let i = 0; i < text.length; i++){
    const c = text[i];
    if(q){
      if(c === '"'){ if(text[i+1] === '"'){ val += '"'; i++; } else { q = false; } }
      else { val += c; }
    } else if(c === '"'){ q = true; }
    else if(c === ","){ row.push(val); val = ""; }
    else if(c === "\n" || c === "\r"){
      if(c === "\r" && text[i+1] === "\n") i++;
      row.push(val); val = "";
      if(row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    }
    else { val += c; }
  }
  row.push(val);
  if(row.length > 1 || row[0] !== "") rows.push(row);
  if(!rows.length) return [];
  const head = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const o = {};
    head.forEach((h, j) => { o[h] = r[j] !== undefined ? r[j].trim() : ""; });
    return o;
  });
}

if (typeof module !== "undefined" && module.exports){ module.exports = { parseCSV }; }
