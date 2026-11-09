// 3MF do console em L dos vídeos v6 e Short: gabinete, frente com abertura + passagem, degrau oco com chanfro,
// espelho meia-lua (parabolóide R 700, ⌀ 460, corda em y = −40) em 4 placas que cabem numa mesa de 256 mm,
// berço do iPhone e marcadores (celular, olho, imagem). Medidas tiradas do simulador (consoleL-dados.json).
// Simulador: z = eixo óptico (para o olho), y = para cima. 3MF: X = x, Y = −z, Z = y − y0 (mesa em Z = 0, sem espelhar).
const fs = require("fs"), path = require("path");
const d = JSON.parse(fs.readFileSync(path.join(__dirname, "consoleL-dados.json"), "utf8"));
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
// espelho meia-lua: z = r²/2R, disco ⌀ Wm, lado y ≥ oy; 4 placas (x < 0 / x > 0, metade de baixo / de cima)
const R = d.S.R, Rd = d.S.Wm / 2, oy = d.S.oy, zE = (x, y) => (x * x + y * y) / (2 * R), ym = (oy + Rd) / 2, ee = 3;
function placaEspelho(nome, xa, xb, ya, yb) {
  const o = malha(nome, 1), nx = 60, ny = 40, top = [], bot = [];
  const lim = x => Math.min(yb, Math.sqrt(Math.max(0, Rd * Rd - x * x)));
  const xs = []; for (let i = 0; i <= nx; i++) { const x = xa + (xb - xa) * i / nx; if (lim(x) - ya > 1) xs.push(x); }
  for (let i = 0; i < xs.length; i++) { top.push([]); bot.push([]); const x = xs[i], y1 = lim(x);
    for (let j = 0; j <= ny; j++) { const y = ya + (y1 - ya) * j / ny, z = zE(x, y); top[i].push(V(o, [x, y, z])); bot[i].push(V(o, [x, y, z - ee])); } }
  const n = xs.length - 1;
  for (let i = 0; i < n; i++) for (let j = 0; j < ny; j++) {
    T(o, top[i][j], top[i + 1][j], top[i + 1][j + 1]); T(o, top[i][j], top[i + 1][j + 1], top[i][j + 1]);
    T(o, bot[i][j], bot[i + 1][j + 1], bot[i + 1][j]); T(o, bot[i][j], bot[i][j + 1], bot[i + 1][j + 1]); }
  const borda = (pa, pb, qa, qb) => { T(o, pa, qb, qa); T(o, pa, pb, qb); };
  for (let i = 0; i < n; i++) { borda(top[i + 1][0], top[i][0], bot[i + 1][0], bot[i][0]); borda(top[i][ny], top[i + 1][ny], bot[i][ny], bot[i + 1][ny]); }
  for (let j = 0; j < ny; j++) { borda(top[0][j], top[0][j + 1], bot[0][j], bot[0][j + 1]); borda(top[n][j + 1], top[n][j], bot[n][j + 1], bot[n][j]); }
  return o;
}
placaEspelho("espelho meia-lua 1/4 (esq., baixo)", -Rd, 0, oy, ym); placaEspelho("espelho meia-lua 2/4 (dir., baixo)", 0, Rd, oy, ym);
placaEspelho("espelho meia-lua 3/4 (esq., cima)", -Rd, 0, ym, Rd); placaEspelho("espelho meia-lua 4/4 (dir., cima)", 0, Rd, ym, Rd);
// berço do iPhone: placa atrás do celular (presa à tampa do degrau) com 4 abas nas bordas do corpo, fora da área da tela
const [bw, bh, be] = d.corpo, Pc = d.Pc, zc = Pc[2] + be, br = malha("berço do celular (preto fosco)", 0), ab = 2;
caixa(br, -bw / 2 - ab, bw / 2 + ab, Pc[1] - bh / 2 - ab, Pc[1] + bh / 2 + ab, zc, ch.z1 - e);
caixa(br, -bw / 2 - ab, -bw / 2, Pc[1] - bh / 2, Pc[1] + bh / 2, Pc[2] + 2, zc); caixa(br, bw / 2, bw / 2 + ab, Pc[1] - bh / 2, Pc[1] + bh / 2, Pc[2] + 2, zc);
caixa(br, -bw / 2, bw / 2, Pc[1] - bh / 2 - ab, Pc[1] - bh / 2, Pc[2] + 2, zc); caixa(br, -bw / 2, bw / 2, Pc[1] + bh / 2, Pc[1] + bh / 2 + ab, Pc[2] + 2, zc);
// referências (não imprimir): celular com a tela virada para o espelho, olho, imagem aérea
const [tw, th] = d.tela, ce = malha("REFERÊNCIA: " + d.nomeTela + " (corpo)", 2, false), te = malha("REFERÊNCIA: tela (virada para o espelho)", 3, false);
caixa(ce, -bw / 2, bw / 2, Pc[1] - bh / 2, Pc[1] + bh / 2, Pc[2], Pc[2] + be); caixa(te, -tw / 2, tw / 2, Pc[1] - th / 2, Pc[1] + th / 2, Pc[2] - 0.3, Pc[2]);
const ol = malha("REFERÊNCIA: olho (140 mm de altura, 600 mm além da imagem)", 5, false), E = d.olho; caixa(ol, E[0] - 6, E[0] + 6, E[1] - 6, E[1] + 6, E[2] - 6, E[2] + 6);
const im = malha("REFERÊNCIA: imagem aérea " + Math.round(d.larg) + " × " + Math.round(d.alt) + " mm", 4, false), I = d.centro; caixa(im, -d.larg / 2, d.larg / 2, I[1] - d.alt / 2, I[1] + d.alt / 2, I[2] - 0.4, I[2] + 0.4);
// sim → 3MF: X = x, Y = −z, Z = y (rotação, não espelha); depois tudo positivo, mesa em Z = 0
const conv = p => [p[0], -p[2], p[1]];
let mn = [1e9, 1e9, 1e9]; for (const o of objs) for (const p of o.v) { const q = conv(p); for (let k = 0; k < 3; k++) mn[k] = Math.min(mn[k], q[k]); }
const desl = [-mn[0] + 5, -mn[1] + 5, -conv([0, C.y0, 0])[2]];
const P3 = p => { const q = conv(p); return [q[0] + desl[0], q[1] + desl[1], q[2] + desl[2]]; };
const cores = ["#141618FF", "#C9D3DCFF", "#2A2E33FF", "#1E5A8CFF", "#8FE3C8FF", "#F2668BFF"], nomes = ["preto fosco", "espelho", "corpo do celular", "tela", "imagem aérea", "olho"];
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xml:lang="pt-BR" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">\n <metadata name="Title">Holosion — console em L, meia-lua R 700 ⌀ 460 + iPhone 15 Pro</metadata>\n <metadata name="Designer">Anderson Alves dos Santos · projeto Holosion</metadata>\n <metadata name="Description">Medidas do simulador acessorio-celular (console L dos vídeos v6 e Short (agora com o iPhone)). Objetos REFERÊNCIA não são peças.</metadata>\n <resources>\n  <basematerials id="1">\n`;
cores.forEach((c, i) => xml += `   <base name="${nomes[i]}" displaycolor="${c}" />\n`); xml += `  </basematerials>\n`;
objs.forEach((o, k) => { xml += `  <object id="${k + 2}" name="${o.nome}" type="model" pid="1" pindex="${o.cor}">\n   <mesh>\n    <vertices>\n`;
  for (const p of o.v) { const q = P3(p); xml += `     <vertex x="${q[0].toFixed(3)}" y="${q[1].toFixed(3)}" z="${q[2].toFixed(3)}" />\n`; }
  xml += `    </vertices>\n    <triangles>\n`; for (const [a, b, c] of o.t) xml += `     <triangle v1="${a}" v2="${b}" v3="${c}" />\n`; xml += `    </triangles>\n   </mesh>\n  </object>\n`; });
xml += ` </resources>\n <build>\n`; objs.forEach((o, k) => xml += `  <item objectid="${k + 2}" printable="${o.peca ? 1 : 0}" />\n`); xml += ` </build>\n</model>\n`;
const out = path.join(__dirname, "m3mf-consoleL");   // console R 700 com o iPhone fs.rmSync(out, { recursive: true, force: true });
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
fs.writeFileSync(path.join(__dirname, "consoleL-pecas.json"), JSON.stringify(tab, null, 1));
