// Leva o simulador do acessório (espelho-recorte-wide.html) para dentro do mirage-rotor-3d.html como a 4ª aba.
// Idempotente: substitui os blocos marcados se já existirem.
const fs = require("fs");
const path0 = require("path"), fR = path0.join(__dirname, "fonte", "acessorio-celular.html"), fM = path0.join(__dirname, "mirage-rotor-3d.html");
const R = fs.readFileSync(fR, "utf8"); let M = fs.readFileSync(fM, "utf8");
fs.writeFileSync(require("os").tmpdir() + "/mirage-antes-celular.html", M);   // cópia de segurança fora do projeto
const entre = (s, a, b) => { const i = s.indexOf(a), j = s.indexOf(b, i + a.length); if (i < 0 || j < 0) throw new Error("não achei " + a); return s.slice(i + a.length, j); };
const css = entre(R, "<style>", "</style>"), aside = entre(R, '<aside id="ui">', "</aside>"), main = entre(R, '<main id="cena">', "</main>");
const scrIni = R.indexOf("<script>", R.indexOf("three.min.js")), js = R.slice(scrIni + 8, R.lastIndexOf("</script>"));
// ids da página do acessório
const html = aside + main, ids = [...new Set([...html.matchAll(/id="([\w-]+)"/g)].map(m => m[1]).concat(["ui", "cena"]))];
const P = id => "cel_" + id;
let htmlA = aside.replace(/id="([\w-]+)"/g, (m, id) => `id="${P(id)}"`), htmlM = main.replace(/id="([\w-]+)"/g, (m, id) => `id="${P(id)}"`);
// a barra de abas também dentro do acessório, para voltar
htmlA = htmlA.replace(/(<p class="eyebrow">)/, `<div class="abasCel"><button data-v="rotor">rotor espiral</button><button data-v="display">display no leito</button><button data-v="parab">tela no espelho de cima</button><button data-v="celular" aria-pressed="true">acessório iPhone</button></div>\n  $1`);
// CSS restrito ao contêiner #celApp
const renomeiaIds = sel => sel.replace(/#([\w-]+)(?![\w-])/g, (m, id) => ids.includes(id) ? "#" + P(id) : m);
const cssA = css.split("}").map(r => r.trim()).filter(Boolean).map(r => {
  const k = r.indexOf("{"), sel = r.slice(0, k).trim(), corpo = r.slice(k + 1);
  const novos = sel.split(",").map(x => x.trim()).map(x => x === ":root" || x === "html" || x === "body" ? "#celApp" : x === "*" ? "#celApp *" : "#celApp " + renomeiaIds(x));
  return [...new Set(novos)].join(",") + "{" + corpo + "}";
}).join("\n");
const cssExtra = `#celApp{position:fixed;inset:0;z-index:60;display:none}
#celApp.on{display:grid}
#celApp .abasCel{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px}
#celApp .abasCel button{font-family:"IBM Plex Mono",monospace;font-size:10px;background:transparent;color:var(--paper);border:1px solid var(--line);padding:5px 6px;cursor:pointer;border-radius:2px}
#celApp .abasCel button[aria-pressed=true]{background:var(--amber);color:var(--ink);border-color:var(--amber)}`;
// o código do acessório, isolado: ids com prefixo, laço e teclas só com a aba ativa
let jsA = js.replace(/document\.getElementById\(/g, "$id(").replace(/"#" \+ id \+ /g, '"#cel_" + id + ');
const rep = (a, b) => { if (!jsA.includes(a)) throw new Error("js: " + a.slice(0, 60)); jsA = jsA.split(a).join(b); };
rep("function quadro(t) {\n", "function quadro(t) {\n  if (!window.CEL_ATIVO) { ultimoT = t; requestAnimationFrame(quadro); return; }   // aba do acessório fechada: não gasta nada\n");
rep("  if (!JOGO.ativo || /INPUT|TEXTAREA/", "  if (!window.CEL_ATIVO || !JOGO.ativo || /INPUT|TEXTAREA/");
if (/querySelector(All)?\("#(?!cel_)/.test(jsA)) console.warn("atenção: querySelector com id sem prefixo");
const jsFinal = `(() => {   // ===== acessório iPhone (código do espelho-recorte-wide.html, isolado) =====
const $id = k => document.getElementById("cel_" + k);
${jsA}
window.CEL = { ativar() { redim(); tudo(); } };
})();
if (location.hash === "#celular") setTimeout(() => { const b = document.querySelector("#abas button[data-v=celular]"); if (b) b.click(); }, 0);   // aberto (ou F5) direto na aba do acessório`;
const bloco = (nome, conteudo) => `<!-- CEL:${nome} -->\n${conteudo}\n<!-- /CEL:${nome} -->`;
const tira = (s, nome) => s.replace(new RegExp(`<!-- CEL:${nome} -->[\\s\\S]*?<!-- /CEL:${nome} -->\\n?`), "");
for (const n of ["CSS", "HTML", "JS"]) M = tira(M, n);
M = M.replace("</style>", "</style>\n" + bloco("CSS", `<style>\n${cssA}\n${cssExtra}\n</style>`));
M = M.replace("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js\"></script>",
  bloco("HTML", `<div id="celApp"><aside id="${P("ui")}">${htmlA}</aside>\n<main id="${P("cena")}">${htmlM}</main></div>`) + "\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js\"></script>");
const fimScript = M.lastIndexOf("</script>");
M = M.slice(0, fimScript + 9) + "\n" + bloco("JS", `<script>\n${jsFinal}\n</script>`) + M.slice(fimScript + 9);
// ganchos no Mirage (só na primeira vez)
const gancho = (a, b) => { if (M.includes(b)) return; if (!M.includes(a)) throw new Error("mirage: " + a.slice(0, 60)); M = M.replace(a, b); };
gancho(`<button data-v="parab">tela no espelho<br>de cima + olho</button></div>`, `<button data-v="parab">tela no espelho<br>de cima + olho</button><button data-v="celular">acessório iPhone<br>(fatia do espelho)</button></div>`);
gancho(`function quadro(agora) {
  const dt = Math.min(0.1, (agora - ultimo) / 1000); ultimo = agora;`, `function quadro(agora) {
  if (window.CEL_ATIVO) { ultimo = agora; requestAnimationFrame(quadro); return; }   // a aba do acessório tem o próprio laço
  const dt = Math.min(0.1, (agora - ultimo) / 1000); ultimo = agora;`);
gancho(`window.addEventListener("keydown", e => {
  if (!JOGO.ativo || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;`, `window.addEventListener("keydown", e => {
  if (window.CEL_ATIVO || !JOGO.ativo || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;`);
gancho(`document.getElementById("abas").addEventListener("click", e => { const b = e.target.closest("button"); if (b && b.dataset.v !== S.modo) mudarModo(b.dataset.v); });`,
`/* 4ª aba: o acessório do celular (simulador próprio, em cima de tudo) */
function abrirCelular() { window.CEL_ATIVO = true; document.getElementById("celApp").classList.add("on"); if (window.CEL) CEL.ativar(); history.replaceState(null, "", "#celular"); }   // F5 volta para esta aba
function fecharCelular() { window.CEL_ATIVO = false; document.getElementById("celApp").classList.remove("on"); history.replaceState(null, "", location.pathname); }
document.getElementById("abas").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.v === "celular") { abrirCelular(); return; } if (b.dataset.v !== S.modo) mudarModo(b.dataset.v); });
document.getElementById("celApp").addEventListener("click", e => { const b = e.target.closest(".abasCel button"); if (!b || b.dataset.v === "celular") return; fecharCelular(); if (b.dataset.v !== S.modo) mudarModo(b.dataset.v); else syncUI(); });`);
fs.writeFileSync(fM, M); console.log("ok", ids.length, "ids", jsA.length, "bytes de js");
