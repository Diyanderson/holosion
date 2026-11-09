// 3MF do console em L com um espelho COMPRADO (maquiagem esférico ou parabolóide de Mirascópio), sem Fresnel:
// uso: node gerar3mf-consoleComprado.js <dados.json> <pasta de saída> "<título>"
// gabinete, frente com abertura + passagem, degrau oco com chanfro, suporte do espelho (anel na borda + apoio atrás + 4 colunas),
// suporte do iPhone e referências (espelho, celular, olho, imagem). Medidas tiradas do simulador (consoleMaq-dados.json).
// Simulador: z = eixo óptico (para o olho), y = para cima. 3MF: X = x, Y = −z, Z = y − y0 (mesa em Z = 0, sem espelhar).
const fs = require("fs"), path = require("path");
const [ARQ, SAIDA, TITULO] = process.argv.slice(2), d = JSON.parse(fs.readFileSync(path.resolve(ARQ), "utf8"));
const objs = [], malha = (nome, cor, peca = true) => { const o = { nome, cor, peca, v: [], t: [] }; objs.push(o); return o; };
const V = (o, p) => (o.v.push(p), o.v.length - 1), T = (o, a, b, c) => o.t.push([a, b, c]);
function caixa(o, x0, x1, y0, y1, z0, z1) {
  const p = []; for (const z of [z0, z1]) for (const y of [y0, y1]) for (const x of [x0, x1]) p.push(V(o, [x, y, z]));
  for (const [a, b, c, e] of [[0, 2, 3, 1], [4, 5, 7, 6], [0, 1, 5, 4], [2, 6, 7, 3], [0, 4, 6, 2], [1, 3, 7, 5]]) { T(o, p[a], p[b], p[c]); T(o, p[a], p[c], p[e]); }
}
function prismaX(o, x0, x1, perfil) {             // polígono convexo (y, z) no sentido anti-horário, extrudado em x
  const n = perfil.length, a = perfil.map(([y, z]) => V(o, [x0, y, z])), b = perfil.map(([y, z]) => V(o, [x1, y, z]));
  for (let i = 1; i < n - 1; i++) { T(o, a[0], a[i + 1], a[i]); T(o, b[0], b[i], b[i + 1]); }
  for (let i = 0; i < n; i++) { const j = (i + 1) % n; T(o, a[i], a[j], b[j]); T(o, a[i], b[j], b[i]); }
}
function placaInclinada(o, x0, x1, A, B, e) {     // placa de espessura e entre os pontos (y, z) A e B, para dentro do degrau
  const dy = B[0] - A[0], dz = B[1] - A[1], L = Math.hypot(dy, dz), ny = -dz / L * e, nz = dy / L * e;   // normal para trás/baixo
  prismaX(o, x0, x1, [A, B, [B[0] + ny, B[1] + nz], [A[0] + ny, A[1] + nz]].reverse());
}
const C = d.CX, g = d.gav, ch = g.ch, e = 3;
// gabinete: fundo atrás do espelho (z0), paredes até a frente (zp)
const gb = malha("gabinete: fundo e 4 paredes (preto fosco)", 0);
caixa(gb, C.x0, C.x1, C.y0, C.y1, C.z0 - e, C.z0);
caixa(gb, C.x0, C.x0 + e, C.y0, C.y1, C.z0, C.zp); caixa(gb, C.x1 - e, C.x1, C.y0, C.y1, C.z0, C.zp);
caixa(gb, C.x0 + e, C.x1 - e, C.y0, C.y0 + e, C.z0, C.zp); caixa(gb, C.x0 + e, C.x1 - e, C.y1 - e, C.y1, C.z0, C.zp);
// frente: um furo só = janela (abertura da imagem) + passagem do degrau até ela
const fr = malha("frente com janela e passagem (preto fosco)", 0), hy0 = g.y0 + 7, hy1 = C.ay1;
caixa(fr, C.x0, C.x1, C.y0, hy0, C.zp, C.zp + e); caixa(fr, C.x0, C.x1, hy1, C.y1, C.zp, C.zp + e);
caixa(fr, C.x0, C.ax0, hy0, hy1, C.zp, C.zp + e); caixa(fr, C.ax1, C.x1, hy0, hy1, C.zp, C.zp + e);
// degrau oco: 2 laterais com o perfil chanfrado, fundo (embaixo), teto e o chanfro; aberto abaixo do lábio
const dg = malha("degrau do L com chanfro (preto fosco, oco, aberto embaixo do lábio)", 0), z0d = C.zp + e;
const perfil = [[g.y0, z0d], [ch.yl, z0d], [ch.yl, ch.zl], [ch.y1, ch.z1], [g.y0, ch.z1]];   // y para cima, z para o olho
prismaX(dg, C.x0, C.x0 + e, perfil); prismaX(dg, C.x1 - e, C.x1, perfil);
caixa(dg, C.x0 + e, C.x1 - e, g.y0, g.y0 + e, z0d, ch.z1);                         // base do degrau (sobre a mesa)
caixa(dg, C.x0 + e, C.x1 - e, g.y0 + e, ch.y1, ch.z1 - e, ch.z1);                    // tampa da frente do degrau (onde o celular encosta)
placaInclinada(dg, C.x0 + e, C.x1 - e, [ch.yl, ch.zl], [ch.y1, ch.z1], e);          // chanfro
// espelho de maquiagem (REFERÊNCIA, é comprado): calota esférica ⌀ Wm, raio R; espessura do vidro ESP (meça o seu)
const R = d.S.R, Rd = d.S.Wm / 2, ESF = d.S.esfera, ESP = ESF ? 4 : 2, zE = ESF ? (x, y) => R - Math.sqrt(R * R - x * x - y * y) : (x, y) => (x * x + y * y) / (2 * R), sagB = zE(Rd, 0);   // esfera do espelho de maquiagem ou parabolóide do Mirascópio (z = r²/2R)
{ const o = malha("REFERÊNCIA: espelho ⌀ " + d.S.Wm + " mm, " + (ESF ? "esférico" : "parabolóide") + " R " + R + " (foco " + R / 2 + ")", 1, false), na = 72, nr = 16, top = [], bot = [];
  for (let k = 0; k <= nr; k++) { top.push([]); bot.push([]); const r = Rd * k / nr;
    for (let a = 0; a < na; a++) { const x = r * Math.cos(2 * Math.PI * a / na), y = r * Math.sin(2 * Math.PI * a / na), z = zE(x, y); top[k].push(V(o, [x, y, z])); bot[k].push(V(o, [x, y, z - ESP])); if (k === 0) break; } }
  for (let a = 0; a < na; a++) { const b = (a + 1) % na; T(o, top[0][0], top[1][a], top[1][b]); T(o, bot[0][0], bot[1][b], bot[1][a]); }
  for (let k = 1; k < nr; k++) for (let a = 0; a < na; a++) { const b = (a + 1) % na;
    T(o, top[k][a], top[k + 1][a], top[k + 1][b]); T(o, top[k][a], top[k + 1][b], top[k][b]); T(o, bot[k][a], bot[k + 1][b], bot[k + 1][a]); T(o, bot[k][a], bot[k][b], bot[k + 1][b]); }
  for (let a = 0; a < na; a++) { const b = (a + 1) % na; T(o, top[nr][a], bot[nr][a], bot[nr][b]); T(o, top[nr][a], bot[nr][b], top[nr][b]); } }
// suporte (imprimir em preto fosco): anel que segura a borda pela frente, cruz que apoia o centro por trás, 4 colunas até o fundo
function anel(o, rI, rE, z0, z1, n = 72) {
  const p = []; for (let a = 0; a < n; a++) { const c = Math.cos(2 * Math.PI * a / n), s2 = Math.sin(2 * Math.PI * a / n); p.push([V(o, [rI * c, rI * s2, z0]), V(o, [rE * c, rE * s2, z0]), V(o, [rE * c, rE * s2, z1]), V(o, [rI * c, rI * s2, z1])]); }
  for (let a = 0; a < n; a++) { const A = p[a], B = p[(a + 1) % n];
    T(o, A[0], B[0], B[1]); T(o, A[0], B[1], A[1]); T(o, A[3], A[2], B[2]); T(o, A[3], B[2], B[3]); T(o, A[1], B[1], B[2]); T(o, A[1], B[2], A[2]); T(o, A[0], A[3], B[3]); T(o, A[0], B[3], B[0]); }
}
const sp = malha("suporte do espelho: anel da borda (preto fosco)", 0); anel(sp, Rd - 2.5, Rd + 8, sagB, sagB + 3);
const ap = malha("suporte do espelho: cruz de apoio atrás + 4 colunas (preto fosco)", 0), zb = C.z0, zt = -ESP;
caixa(ap, -Rd - 4, Rd + 4, -6, 6, zb, zt); caixa(ap, -6, 6, -Rd - 4, -6, zb, zt); caixa(ap, -6, 6, 6, Rd + 4, zb, zt);   // cruz encostada no vidro por trás
for (const [cx2, cy2] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) { const q = (Rd + 4) / Math.SQRT2; caixa(ap, cx2 * q - 4, cx2 * q + 4, cy2 * q - 4, cy2 * q + 4, zb, sagB); }   // colunas até o anel
// celular inclinado (eixos da tela: ex, ey; nd aponta para o espelho; o corpo fica atrás, em −nd)
const ex = d.ex, ey = d.ey, nd = d.nd, Pc = d.Pc, [bw, bh, be] = d.corpo, [tw, th] = d.tela;
const ptl = (a, b, c) => [0, 1, 2].map(k => Pc[k] + a * ex[k] + b * ey[k] - c * nd[k]);       // (a, b) na tela, c para trás
function caixaTela(o, a0, a1, b0, b1, c0, c1) {                 // caixa orientada pelos eixos da tela
  const p = []; for (const c of [c0, c1]) for (const b of [b0, b1]) for (const a of [a0, a1]) p.push(V(o, ptl(a, b, c)));
  const sinal = (() => { const u = [ex[1] * ey[2] - ex[2] * ey[1], ex[2] * ey[0] - ex[0] * ey[2], ex[0] * ey[1] - ex[1] * ey[0]]; return u[0] * -nd[0] + u[1] * -nd[1] + u[2] * -nd[2] > 0; })();
  for (const [a, b, c, e2] of [[0, 2, 3, 1], [4, 5, 7, 6], [0, 1, 5, 4], [2, 6, 7, 3], [0, 4, 6, 2], [1, 3, 7, 5]]) { if (sinal) { T(o, p[a], p[b], p[c]); T(o, p[a], p[c], p[e2]); } else { T(o, p[a], p[c], p[b]); T(o, p[a], p[e2], p[c]); } }
}
// suporte do iPhone (preto fosco): placa atrás do corpo + 4 abas nas bordas (fora da área da tela); prender nas laterais do degrau
const br = malha("suporte do celular, inclinado como a tela (preto fosco)", 0), ab = 2;
caixaTela(br, -bw / 2 - ab, bw / 2 + ab, -bh / 2 - ab, bh / 2 + ab, be, be + 3);
caixaTela(br, -bw / 2 - ab, -bw / 2, -bh / 2, bh / 2, 2, be); caixaTela(br, bw / 2, bw / 2 + ab, -bh / 2, bh / 2, 2, be);
caixaTela(br, -bw / 2, bw / 2, -bh / 2 - ab, -bh / 2, 2, be); caixaTela(br, -bw / 2, bw / 2, bh / 2, bh / 2 + ab, 2, be);
// referências (não imprimir): celular e tela virada para o espelho
const ce = malha("REFERÊNCIA: " + d.nomeTela + " (corpo, inclinado " + d.S.tau + "°)", 2, false), te = malha("REFERÊNCIA: tela (virada para o espelho)", 3, false);
caixaTela(ce, -bw / 2, bw / 2, -bh / 2, bh / 2, 0, be); caixaTela(te, -tw / 2, tw / 2, -th / 2, th / 2, -0.3, 0);
const ol = malha("REFERÊNCIA: olho (" + d.S.ed + " mm além da imagem)", 5, false), E = d.olho; caixa(ol, E[0] - 6, E[0] + 6, E[1] - 6, E[1] + 6, E[2] - 6, E[2] + 6);
const im = malha("REFERÊNCIA: imagem aérea " + Math.round(d.larg) + " × " + Math.round(d.alt) + " mm", 4, false), I = d.centro; caixa(im, -d.larg / 2, d.larg / 2, I[1] - d.alt / 2, I[1] + d.alt / 2, I[2] - 0.4, I[2] + 0.4);
// sim → 3MF: X = x, Y = −z, Z = y (rotação, não espelha); depois tudo positivo, mesa em Z = 0
const conv = p => [p[0], -p[2], p[1]];
let mn = [1e9, 1e9, 1e9]; for (const o of objs) for (const p of o.v) { const q = conv(p); for (let k = 0; k < 3; k++) mn[k] = Math.min(mn[k], q[k]); }
const desl = [-mn[0] + 5, -mn[1] + 5, -conv([0, C.y0, 0])[2]];
const P3 = p => { const q = conv(p); return [q[0] + desl[0], q[1] + desl[1], q[2] + desl[2]]; };
const cores = ["#141618FF", "#C9D3DCFF", "#2A2E33FF", "#1E5A8CFF", "#8FE3C8FF", "#F2668BFF"], nomes = ["preto fosco", "espelho", "corpo do celular", "tela", "imagem aérea", "olho"];
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xml:lang="pt-BR" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">\n <metadata name="Title">${TITULO}</metadata>\n <metadata name="Designer">Anderson Alves dos Santos · projeto Holosion</metadata>\n <metadata name="Description">Medidas do simulador acessorio-celular (busca pelo traçado; espelho comprado: meça o foco do seu). Objetos REFERÊNCIA não são peças.</metadata>\n <resources>\n  <basematerials id="1">\n`;
cores.forEach((c, i) => xml += `   <base name="${nomes[i]}" displaycolor="${c}" />\n`); xml += `  </basematerials>\n`;
objs.forEach((o, k) => { xml += `  <object id="${k + 2}" name="${o.nome}" type="model" pid="1" pindex="${o.cor}">\n   <mesh>\n    <vertices>\n`;
  for (const p of o.v) { const q = P3(p); xml += `     <vertex x="${q[0].toFixed(3)}" y="${q[1].toFixed(3)}" z="${q[2].toFixed(3)}" />\n`; }
  xml += `    </vertices>\n    <triangles>\n`; for (const [a, b, c] of o.t) xml += `     <triangle v1="${a}" v2="${b}" v3="${c}" />\n`; xml += `    </triangles>\n   </mesh>\n  </object>\n`; });
xml += ` </resources>\n <build>\n`; objs.forEach((o, k) => xml += `  <item objectid="${k + 2}" printable="${o.peca ? 1 : 0}" />\n`); xml += ` </build>\n</model>\n`;
const out = path.resolve(SAIDA); fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "3D"), { recursive: true }); fs.mkdirSync(path.join(out, "_rels"), { recursive: true });
fs.writeFileSync(path.join(out, "3D", "3dmodel.model"), xml);
fs.writeFileSync(path.join(out, "[Content_Types].xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" /></Types>\n`);
fs.writeFileSync(path.join(out, "_rels", ".rels"), `<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" /></Relationships>\n`);
// verificação: sólidos fechados (cada aresta com o seu par) e tamanho de cada peça
const tab = [];
for (const o of objs) { const ar = {}; for (const [a, b, c] of o.t) for (const [p, q] of [[a, b], [b, c], [c, a]]) ar[p + "_" + q] = (ar[p + "_" + q] || 0) + 1;
  let aberto = 0; for (const k in ar) { const [p, q] = k.split("_"); if (!ar[q + "_" + p]) aberto++; }
  const Q = o.v.map(P3), mn2 = [0, 1, 2].map(k => Math.min(...Q.map(p => p[k]))), mx2 = [0, 1, 2].map(k => Math.max(...Q.map(p => p[k])));
  tab.push({ nome: o.nome, peca: o.peca, tam: mx2.map((v, k) => +(v - mn2[k]).toFixed(1)), aberto });
  console.log(o.nome.slice(0, 56).padEnd(56), mx2.map((v, k) => (v - mn2[k]).toFixed(0)).join(" × "), "mm | arestas sem par:", aberto); }
fs.writeFileSync(out + "-pecas.json", JSON.stringify(tab, null, 1));
