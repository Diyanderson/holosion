<h1 align="center">🖨️ Guia de Impressão — Holosion</h1>

<p align="center">
  <strong>Como imprimir o console em L dos vídeos (v6 e Short) e os acessórios, com filamento fosco e as opções de espelho</strong>
</p>

<p align="center">
  <a href="#-o-que-imprimir">Peças</a> •
  <a href="#-filamento-fosco-matte">Filamento fosco</a> •
  <a href="#-o-espelho-opções">Espelho</a> •
  <a href="#-quanto-a-superfície-do-espelho-pode-errar">Aberrações medidas</a> •
  <a href="#-montagem">Montagem</a> •
  <a href="#-outros-3mf">Outros 3MF</a>
</p>

---

> ⚠️ **Honestidade primeiro.** Tudo aqui vem do simulador por traçado de raios. **Nenhum protótipo físico foi construído ainda.**
> As medidas de aberração abaixo são do traçado (com um modelo de ondulação da superfície), não de um espelho real.

---

## 📦 O que imprimir

Arquivo: [`3mf/Console-L-meialua-iPhone.3mf`](../3mf/Console-L-meialua-iPhone.3mf) — milímetros, mesa em Z = 0, 12 objetos (8 peças + 4 referências).
Todas as malhas são sólidos fechados (verificado: 0 arestas sem par).

| Peça | Tamanho (mm) | Material | Observação |
|------|--------------|----------|------------|
| Gabinete: fundo e 4 paredes | 540 × 479 × 455 | preto **fosco** | maior que qualquer mesa comum → ver abaixo |
| Frente com janela e passagem | 540 × 3 × 455 | preto **fosco** | um furo só: janela da imagem + passagem do degrau |
| Degrau do L com chanfro | 540 × 303 × 216 | preto **fosco** | oco, aberto embaixo do lábio (a luz da tela desce por ali) |
| Espelho meia-lua 1/4 e 2/4 | 230 × 42 × 135 (cada) | ver [espelho](#-o-espelho-opções) | imprimir deitado, face côncava para cima |
| Espelho meia-lua 3/4 e 4/4 | 207 × 34 × 135 (cada) | ver [espelho](#-o-espelho-opções) | idem |
| Berço do celular | 151 × 9 × 75 | preto **fosco** | prende o iPhone pelas bordas, fora da área da tela |
| *REFERÊNCIA* (não imprimir) | — | — | iPhone, tela, olho, imagem aérea (`printable="0"`) |

### O gabinete é um móvel (≈ 150 L)

O console dos vídeos mede **540 × 455 × 790 mm** (≈ 148 L) porque a tela fica no centro de curvatura do espelho (u = R = 700 mm) para dar imagem 1:1 do tamanho do celular.
Gabinete, frente e degrau **não cabem** numa impressora comum (mesa de 220–350 mm). Duas saídas:

| Opção | Como | Prós / contras |
|-------|------|----------------|
| **A — Painéis planos (recomendado)** | Cortar gabinete, frente e degrau em **MDF 3 mm, PVC expandido ou foam board preto**, nas medidas da tabela; pintar com **preto fosco** | rápido, barato, retas perfeitas; só o espelho e o berço são impressos |
| **B — Imprimir em partes** | No OrcaSlicer/Bambu Studio: ferramenta **Cortar** com conectores (cavilhas) até cada parte caber na mesa | tudo impresso; muitas emendas, muito filamento |

---

## 🖤 Filamento fosco (matte)

Por que **fosco**: o interior do gabinete e o degrau ficam dentro do campo de visão do espelho. Qualquer brilho vira **reflexo fantasma** na imagem aérea. O simulador conta com interior preto: atrás da imagem o olho vê só **1,7 %** do brilho do branco da imagem (com vidro fumê de 60 %).

| Parâmetro | Valor sugerido |
|-----------|----------------|
| Filamento | **PLA Matte preto** (ou PETG fosco preto) |
| Camada | 0,20 mm |
| Paredes | 3 |
| Preenchimento | 15 % giroide |
| Passar a ferro (*ironing*) | **desligado** (deixa a superfície brilhante) |
| Extra | revestir o interior com **papel flocado / veludo adesivo preto** (opcional, melhora o contraste) |

> Temperaturas e velocidades: siga o fabricante do filamento — não foram testadas aqui.

---

## 🪞 O espelho: opções

Forma exata (do simulador): **parabolóide z = r² / 2R, R = 700 mm (foco 350 mm)**, meia-lua de **⌀ 460 mm** com a corda em **y = −40 mm** (o lado y ≥ −40).
Profundidade máxima da curva (sagitta) ≈ **37,8 mm**. Vértice na origem; o eixo aponta para o olho.

| # | Opção | Refletância | Qualidade óptica | Situação |
|---|-------|-------------|------------------|----------|
| **1** | **Usar o espelho de baixo do próprio Mirage, inteiro, sem cortar** | ~90 % (alumínio de fábrica) | superfície de fábrica (sem ondulação de impressão) | ✅ **simulado**: outro console (botão *console em L com o espelho de baixo do Mirage*): iPhone a 150 mm, inclinado 30°; imagem **155 × 77 mm** a 148 mm fora da janela, borrão 0,72 mm, caixa **≈ 19,1 L** — ver [seção abaixo](#-console-com-o-espelho-do-mirage) |
| **2** | **ABS preto + vapor de acetona** | ~4 % (plástico preto: ((n−1)/(n+1))², n ≈ 1,53) | a acetona alisa as linhas, mas deixa ondulação | "espelho negro": imagem ~20× mais escura que alumínio; só demonstração em sala escura |
| **3** | **ABS metalizado a vácuo (luxo)** | ~85–90 % | herda a ondulação da peça de baixo | melhor opção impressa; serviço de metalização |
| **4** | **PLA → lixar → primer → verniz → metalizar** | ~85–90 % (metalizado) / menor com tinta "cromo" em spray | linhas do PLA exigem lixa fina; a ondulação que sobra domina | trabalhoso; PLA amolece ~55–60 °C |

**Correção sobre o amoníaco:** o alisamento de ABS é feito com **vapor de acetona**; amoníaco não dissolve ABS. Faça em local ventilado, longe de chamas, com EPI.

Sequência sugerida para as opções 3 e 4:
1. Imprimir as 4 placas **deitadas, face côncava para cima**, camada 0,10–0,12 mm, sem *ironing*.
2. ABS: vapor de acetona (rápido, para não escorrer). PLA: lixa d'água 220 → 400 → 800 → 1500.
3. Primer de enchimento, lixar de novo, verniz brilhante (de preferência 2K).
4. Metalizar (vácuo é muito melhor que spray "efeito cromo").
5. Colar as 4 placas num **berço impresso / gabarito** que garanta a curva; as emendas aparecem como linhas na imagem.

---

## 🪞 Console com o espelho do Mirage

Simulado com o espelho de baixo do Mirage 9″ **inteiro** (parabolóide f = 80,6 mm, ⌀ 229 mm), sem cortar e sem fita. Busca pelo traçado da maior imagem que fica à frente da janela, quase em pé, sem raio bloqueado pelo degrau:

| Item | Console R 700 (vídeos) | **Console com o espelho do Mirage** |
|------|------------------------|-------------------------------------|
| Espelho | meia-lua impressa ⌀ 460, R 700 | espelho do Mirage, inteiro |
| Celular (iPhone 15 Pro) | 700 mm, 110 mm abaixo do eixo | **150 mm, 55 mm abaixo, inclinado 30°** |
| Imagem | 142 × 65 mm (1,01×), 10° | **155 × 77 mm (1,10×), 15°** |
| Distância / fora da janela | 741 mm / 334 mm | 212 mm / **148 mm** |
| Borrão que o olho vê | 0,10 mm (superfície perfeita) | 0,72 mm (superfície de fábrica) |
| Distorção | 1,8 → 0,0 mm | 14,9 → 0,0 mm (pré-compensada) |
| Olho | 600 mm além da imagem | **900 mm** além da imagem (~1,1 m do console) |
| Janela do olho | 100 × 80 mm | 420 × 720 mm |
| Gabinete | 540 × 455 × 790 mm ≈ 148 L | **319 × 311 × 259 mm ≈ 19,1 L** |

**Fita preta na metade do espelho:** não ajuda. Fita na metade de baixo → o olho vê 28/35 pontos e a janela cai para 500 × 240 mm; na metade de cima → 7/35 pontos. O espelho já fica escondido (1,7 % do brilho) com ele inteiro.

O tamanho máximo visível é limitado pelo espelho visto do olho (≈ ⌀ 229 × D / (D + v)): por isso o olho fica mais longe.

---

## 💄 Console barato: espelho de maquiagem (sem Fresnel)

Arquivo: [`3mf/Console-L-maquiagem-iPhone.3mf`](../3mf/Console-L-maquiagem-iPhone.3mf) — botão no simulador: *console em L com espelho de maquiagem*.
Espelho de **aumento de maquiagem redondo ⌀ 20 cm**, **esférico**, foco ≈ 100 mm (raio 200 mm). **Meça o foco do seu** (sol + papel) e a espessura do vidro antes de imprimir o suporte.

| Item | Valor (traçado) |
|------|-----------------|
| Celular | iPhone 15 Pro a 210 mm do espelho, 60 mm abaixo do eixo, inclinado 20°, tela inteira |
| Imagem | **tela inteira 112 × 54 mm**, inclinada 15°, a 177 mm do espelho, **124 mm fora da janela** |
| Borrão / distorção | 0,29 mm / 7,2 → 0,0 mm compensada |
| Olho | 350 mm além da imagem (tamanho aparente ≈ 18°); janela da cabeça **140 × 200 mm** |
| Gabinete | **282 × 280 × 301 mm ≈ 16,6 L** — 0 raios bloqueados pelo degrau |

| Peça | Tamanho (mm) | Observação |
|------|--------------|------------|
| Gabinete (fundo + 4 paredes) | 282 × 113 × 280 | preto fosco (ou MDF/foam board) |
| Frente com janela e passagem | 282 × 3 × 280 | preto fosco |
| Degrau do L com chanfro | 282 × 180 × 146 | preto fosco |
| Anel da borda do espelho | ⌀ 216 × 3 | segura o espelho pela frente (2,5 mm de aba) |
| Cruz de apoio + 4 colunas | 208 × 84 × 208 | apoia o vidro por trás; ajuste `ESP` (espessura, 4 mm) em `ferramentas/gerar3mf-consoleMaq.js` |
| Suporte do celular | 151 × 34 × 73 | inclinado 20°, como a tela; prender nas laterais do degrau |

**Conferência independente** ([`ferramentas/conferir_optica.py`](../ferramentas/conferir_optica.py), Python com `math` + `numpy`, traçado escrito do zero):

| | Paraxial (1/u + 1/v = 1/f) | Traçado Python | Simulador |
|---|---|---|---|
| Distância da imagem | 190,9 mm | 177,3 mm | 177,0 mm |
| Aumento | 0,909× | 0,793× | 0,794× |
| Imagem | — | 111,6 × 54,3 mm | 111,7 × 54,2 mm |

O aumento real é menor que o da fórmula clássica porque ela só vale perto do eixo (aqui: celular 60 mm fora do eixo, inclinado 20°, espelho f/0,5). **Difração** (pupila ⌀ 4 mm, 550 nm): disco de Airy de 0,059 mm na imagem vista a 350 mm — 5× menor que o borrão geométrico; não muda as conclusões.

**Fresnel:** testada e descartada. Recortada em 160 × 80 mm ela só alargava a janela da cabeça; a A4 inteira tapa a luz que volta do espelho.

---

## 🛒 Consoles com espelhos que dá para comprar

Os anúncios não informam o foco, e as medidas abaixo partem de um foco **estimado**. **Meça o foco do seu antes de imprimir:** aponte o espelho para o sol e procure, com um papel, a distância em que o ponto de luz fica menor. Os dois arranjos saíram de uma busca pelo traçado no simulador, cada um com o seu botão, com iPhone 15 Pro e nenhum raio bloqueado pelo degrau.

> Links de afiliado do Mercado Livre: o autor pode ganhar uma comissão, sem custo extra para você.

### Espelho de maquiagem 3x, ⌀ 17 cm

Arquivo: [`3mf/Console-L-maquiagem3x-17cm-iPhone.3mf`](../3mf/Console-L-maquiagem3x-17cm-iPhone.3mf). Botão no simulador: *console em L com espelho de maquiagem 3x comprado*. Produto: https://meli.la/2pkx5vN

O espelho é esférico e "3x" ≈ 1 + 250/f, então o foco fica em torno de 125 mm (R 250).

| Item | Valor (traçado) |
|------|-----------------|
| Celular | iPhone 15 Pro a **300 mm** do espelho (≈ 2,4 f), 55 mm abaixo do eixo, inclinado 30°, tela inteira |
| Imagem | **tela inteira 96 × 44 mm** (0,68×), quase em pé (2°), a 208 mm do espelho, **145 mm fora da janela** |
| Borrão / distorção | **0,14 mm** / 4,4 → 0,0 mm compensada |
| Olho | 600 mm além da imagem; janela da cabeça **120 × 220 mm** |
| Gabinete | 253 × 256 × 378 mm (com o degrau) **≈ 16,5 L** |
| Se o seu foco for outro | mantenha o celular a ≈ 2,4 f: f 100 → 240 mm (imagem 93 mm); f 150 → 360 mm (97 mm, 18,7 L) |

| Peça | Tamanho (mm) | Observação |
|------|--------------|------------|
| Gabinete (fundo + 4 paredes) | 253 × 110 × 256 | preto fosco |
| Frente com janela e passagem | 253 × 3 × 256 | preto fosco |
| Degrau do L com chanfro | 253 × 266 × 141 | preto fosco |
| Anel da borda do espelho | ⌀ 186 × 3 | segura o vidro pela frente |
| Cruz de apoio + 4 colunas | 178 × 60 × 178 | apoia o vidro por trás (espessura do vidro: 4 mm) |
| Suporte do celular | 151 × 45 × 69 | inclinado 30°, como a tela |

O suporte do espelho foi feito para um vidro solto. Se o seu espelho tiver moldura e pé, tire o vidro ou ajuste o anel.

### Mirascópio de 15 cm (espelho de baixo)

Arquivo: [`3mf/Console-L-mirascopio-15cm-iPhone.3mf`](../3mf/Console-L-mirascopio-15cm-iPhone.3mf). Botão no simulador: *console em L com o espelho de baixo de um Mirascópio de 15 cm*. Produto: https://meli.la/1eSAPGq

O Mirascópio é a versão menor do Mirage. Usa-se só o espelho de **baixo**, que não tem furo: um parabolóide de ⌀ ≈ 140 mm. O foco ≈ 50 mm foi estimado pela proporção do Mirage, em que a borda fica em r = √2 f.

| Item | Valor (traçado) |
|------|-----------------|
| Celular | iPhone 15 Pro a 90 mm do espelho, 35 mm abaixo do eixo, inclinado 40°, **só a metade central da tela (70 × 32 mm)** |
| Imagem | **85 × 40 mm**, quase em pé (3°), a 134 mm do espelho, **94 mm fora da janela** |
| Borrão / distorção | 0,58 mm / 7,3 → 0,0 mm compensada |
| Olho | 560 mm além da imagem; janela da cabeça **280 × 440 mm** |
| Gabinete | 239 × 227 × 183 mm (com o degrau) **≈ 7,7 L**, o menor de todos |

O espelho tem quase o tamanho do iPhone. Por isso, com a tela inteira, nenhum arranjo da busca deixa o degrau passar entre os dois feixes. Se quiser a tela inteira, use o espelho de 9″ do Mirage (*Console com o espelho do Mirage*, acima).

| Peça | Tamanho (mm) | Observação |
|------|--------------|------------|
| Gabinete (fundo + 4 paredes) | 239 × 98 × 227 | preto fosco |
| Frente com janela e passagem | 239 × 3 × 227 | preto fosco |
| Degrau do L com chanfro | 239 × 82 × 106 | preto fosco |
| Anel da borda do espelho | ⌀ 156 × 3 | segura a casca de plástico pela frente |
| Cruz de apoio + 4 colunas | 148 × 79 × 148 | apoia o espelho por trás (casca de 2 mm) |
| Suporte do celular | 151 × 55 × 63 | inclinado 40°, como a tela |

Os dois 3MF foram gerados por [`ferramentas/gerar3mf-consoleComprado.js`](../ferramentas/gerar3mf-consoleComprado.js) a partir das medidas do simulador ([`consoleMaq17-dados.json`](../ferramentas/consoleMaq17-dados.json), [`consoleMirascopio-dados.json`](../ferramentas/consoleMirascopio-dados.json)). Se o seu foco for outro, refaça a busca no simulador e gere de novo com `node gerar3mf-consoleComprado.js <dados.json> <pasta> "<título>"`.

---

## 🔬 Quanto a superfície do espelho pode errar

Medido no simulador (`S.erroSup = {sig, lam}`: ondulação fixa da superfície, inclinação rms *sig*, período *lam*), console L com o iPhone 15 Pro, olho a 140 mm de altura, 600 mm além da imagem:

| Superfície | Borrão que o olho vê | Distorção (curvatura/trapézio) | Pontos da grade vistos |
|------------|----------------------|--------------------------------|------------------------|
| perfeita | **0,10 mm** | 1,8 mm (0,0 mm compensada) | 35/35 |
| 0,25 mrad, período 10 mm | 0,47 mm | 2,4 mm | 14/35 |
| 0,5 mrad, período 10 mm | 0,62 mm | 1,0 mm | 4/35 |
| 1 mrad, período 10 mm | 1,13 mm | — | 3/35 |
| 2 mrad, período 10 mm | 1,79 mm | 58,5 mm | 14/35 |
| 1 mrad, período 50 mm (empeno suave) | 0,48 mm | 5,2 mm | 35/35 |
| 3 mrad, período 50 mm | 1,28 mm | 21,1 mm | 16/35 |

**Leitura:** ondulações **curtas** (linhas de impressão, marcas de lixa, escorrido de acetona) quebram a imagem mesmo com erros minúsculos (0,25 mrad já derruba de 35 para 14 pontos visíveis e quase quintuplica o borrão). Um **empeno suave e longo** é tolerável e a pré-compensação corrige boa parte. Por isso a opção 1 (espelho de fábrica) é a única que chega perto do "perfeito"; as impressas exigem acabamento óptico de verdade.

**Teste caseiro da superfície:** aponte um laser a ~1 m do espelho e olhe o ponto refletido numa parede a distância **L**. Ao varrer o laser devagar, o ponto "treme" Δ (mm). A inclinação local ≈ **Δ / (2L)**. Ex.: L = 2 m e Δ = 1 mm → 0,25 mrad (já é o limite da tabela).

---

## 🔧 Montagem

| Item | Valor (do simulador) |
|------|----------------------|
| Celular | **iPhone 15 Pro** deitado em paisagem, **tela virada para o espelho**, a **700 mm** do vértice, centro **110 mm abaixo do eixo** |
| Imagem aérea | 142 × 65 mm, aumento 1,01×, a 741 mm do espelho, **334 mm para fora da janela**, inclinada 10° |
| Olho | 140 mm acima do eixo, 600 mm além da imagem; janela de onde se vê a imagem inteira: **100 × 80 mm** |
| Frente | a 408 mm do espelho; janela 316 × 178 mm com cantos arredondados (r = 10 mm) |
| Conteúdo | girado 180° e **pré-compensado** pelo simulador (`mirage-rotor-3d.html#celular`, botão "recalcular para onde o olho está agora") |

O 3MF já posiciona tudo: no fatiador, desmarque os objetos *REFERÊNCIA* e use-os só para conferir as distâncias.

---

## 📁 Outros 3MF

| Arquivo | O que é |
|---------|---------|
| [`Console-L-meialua-iPhone.3mf`](../3mf/Console-L-meialua-iPhone.3mf) | console em L dos vídeos v6 e Short (este guia) |
| [`Console-L-maquiagem-iPhone.3mf`](../3mf/Console-L-maquiagem-iPhone.3mf) | console em L com espelho de maquiagem ⌀ 20 cm, f 100 |
| [`Console-L-maquiagem3x-17cm-iPhone.3mf`](../3mf/Console-L-maquiagem3x-17cm-iPhone.3mf) | console em L com o espelho de maquiagem 3x ⌀ 17 cm à venda |
| [`Console-L-mirascopio-15cm-iPhone.3mf`](../3mf/Console-L-mirascopio-15cm-iPhone.3mf) | console em L com o espelho de baixo de um Mirascópio de 15 cm (metade da tela) |
| [`Model-iphone-estereo-ajustado.3mf`](../3mf/Model-iphone-estereo-ajustado.3mf) | acessório estéreo: fatia do espelho do Mirage (R 161,2) inclinada 16°, iPhone 15 Pro deitado no foco (77,48 mm), abertura 60 × 56 mm |
| [`Model-esboco-do-autor.3mf`](../3mf/Model-esboco-do-autor.3mf) | esboço original do autor (caixa comprida) |

Os mesmos cuidados valem para todos: **preto fosco** em tudo que não é espelho e acabamento óptico no espelho.
