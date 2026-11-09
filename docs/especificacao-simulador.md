# Prompt de construção — Simulador de imagem aérea por par de espelhos côncavos

> Documento de especificação. Contém a física já derivada e verificada numericamente,
> as regras de projeto, os requisitos do simulador e os limites do que se pode afirmar.
> Tudo que está marcado como **verificado** foi medido por traçado de raios, não deduzido.

---

## 0. Objetivo

Construir um simulador interativo do arranjo de dois espelhos côncavos frente a frente
(o superior com abertura central) que forma uma **imagem real aérea** do objeto colocado
no leito do espelho inferior — o efeito popularmente vendido como "Mirage".

O simulador deve ser um instrumento de projeto, não uma animação: toda imagem exibida
tem de ser resultado de traçado de raios sobre superfícies analíticas, nunca desenhada
a partir de uma fórmula de aparência.

**Regra de ouro:** nada da imagem é desenhado. A imagem é o resultado.

---

## 1. Fundamento físico

### 1.1 O par parabólico clássico

Dois paraboloides unidos pela borda, logo `D = s₁ + s₂` (separação de vértices = soma das flechas).

```
f = R²/(4s)            focal de um paraboloide de semi-abertura R e flecha s
```

Existe **um único** ponto sem aberração, quando o foco de cada espelho cai no vértice do
outro. Isso exige:

```
s = R/(2√2) ≈ 0,3536·R      D = 2s      f = D
```

- **Verificado:** nesse ponto o RMS axial dá 0,0000 mm com paraboloide; com esfera de
  mesma flecha salta para 7,8 mm.
- **Verificado:** aumento transversal `m_t = −1`, longitudinal `m_L = +1`.

> **Atenção a um erro comum.** `(−1, −1, +1)` **não é** uma imagem de cabeça para baixo
> nem espelhada. O determinante é positivo — duas reflexões devolvem a quiralidade.
> É o objeto **girado 180° em torno do eixo vertical**. É por isso que o brinquedo
> comercial engana tão bem. Nunca descrever como "imagem invertida" sem qualificar.

- Fora desse ponto a degradação **não é gradual**: o feixe converge fora do plano da
  abertura e 100% da luz bate na parte de trás do espelho superior. A imagem não borra,
  **some**.
- A altura da imagem é fixa no plano da abertura. Não há grau de liberdade sobrando.

### 1.2 O par elipsoidal estigmático

Para liberar a altura da imagem, trocar a família de superfícies. Um elipsoide prolato
leva luz de um foco ao outro com estigmatismo **exato** — é a definição geométrica da
elipse, não uma aproximação.

- **Espelho superior (M1):** focos no objeto `O(z=0)` e no foco intermediário `z₁`,
  vértice superior em `z = D`.
- **Espelho inferior (M2):** focos em `z₁` e na imagem final `z₂`, vértice inferior em `z = 0`.

```
M1:  c₁ = z₁/2          a₁ = D − z₁/2        b₁² = D(D − z₁)
M2:  c₂ = a₂ = (z₁+z₂)/2                     b₂² = z₁·z₂
```

Superfícies (eixo óptico = z, r = raio radial):

```
z_sup(r) = c₁ + a₁·√(1 − r²/b₁²)        (calota superior)
z_inf(r) = c₂ − a₂·√(1 − r²/b₂²)        (calota inferior)
```

Normais (não normalizadas):

```
n(P) = ( P_x/b² , P_y/b² , (P_z − c)/a² )
```

Validade: `0 < z₁ < D`. O caso parabólico é o limite degenerado `z₁ → ∞`, **fora**
desta família.

- **Verificado:** RMS axial da ordem de 10⁻¹⁴ mm em qualquer altura de imagem `z₂`.
  Estigmatismo exato, não aproximado.

### 1.3 Aumentos e o invariante de Lagrange

```
m_t = (D − z₁)·z₂ / (D·z₁)              aumento transversal (lateral)
m_L = m_t²                              aumento longitudinal (em altura)
ganho angular = 1/m_t                   direção de emissão → direção de visão
```

**Consequências que governam todo o projeto:**

1. **A imagem estica no eixo por um fator exatamente `m_t`.** Só é proporcional quando
   `m_t = 1`. Isso é teorema (invariante de Lagrange / Smith-Helmholtz para sistema com
   simetria de revolução num único meio), não limitação de projeto.
   - **Verificado:** esticamento medido 1,00 / 2,05 / 3,10 para `m_t` = 1 / 2 / 3.
2. **Para imagem proporcional com `m_t ≠ 1`, achatar a fonte por `1/m_t` no eixo**
   (largura intacta). É a única saída.
3. **O lóbulo de visão encolhe como `1/m_t`.** Ampliar estreita a janela do observador
   na mesma proporção.
4. **Em `m_t = 1` o ganho angular é exatamente 1,00 e o mapeamento direção→direção é
   monotônico.** O par vira um relé de campo de luz perfeito. Nenhum outro `m_t` tem
   essa propriedade.
   - **Verificado:** emissão 10,0°–39,0° → visão 10,0°–39,0°. Em modo "mais luz",
     ganho 0,77 = 1/1,31.

### 1.4 Escolhas de foco intermediário

```
z₁ = D·z₂/(m·D + z₂)      →  aumento alvo m               [modo "aumento"]
z₁ = D·z₂/(D + z₂)        →  m_t = m_L = 1, cópia fiel     [caso m = 1 do anterior]
z₁ = D²/(D + z₂)          →  abertura útil máxima          [modo "mais luz"]
```

Semi-eixos em função do alvo:

```
b₁² = m·D³/(m·D + z₂)          b₂² = D·z₂²/(m·D + z₂)
```

**Inversão de tamanho dos espelhos:** `b₁ < b₂` se e só se `Δ > D(√m − 1)`.
Em ×1 o inferior é sempre o maior; em ×3 ele é menos da metade do superior.

### 1.5 Raio de vértice, cônica e o bônus de fabricação

```
Rv = b²/a           k = b²/a² − 1        (elipse: −1 < k < 0)
```

Em **modo cópia 1:1** e só nele:

```
k₁ = k₂ = 4D(D+z₂)/(2D+z₂)² − 1
espelho inferior = espelho superior × (z₂/D)
```

- **Verificado:** o fator `z₂/D` bate simultaneamente em `a`, em `b` e no raio de vértice.
  Uma única superfície torneada em duas escalas: um programa de CNC, uma placa de teste.
- Em ×2 as cônicas divergem (−0,040 e −0,264); em ×3, (−0,020 e −0,379). Dois ferramentais.

### 1.6 Lei de resolução

O relé é limitado por **aberração fora do eixo, não por difração** (difração ficaria em
~1 µm). O borrão cresce com o **quadrado do campo**:

```
borrão ≈ 0,0055·h²  mm          (h = raio de campo em mm, config D = 130 mm)
pontos resolvidos no diâmetro ≈ 180/h
```

- **Verificado ponto a ponto:** h = 1/2/4/6/8/10/14 mm → borrão 0,005/0,022/0,088/0,197/
  0,351/0,546/1,053 mm. Razão para h² constante em 0,0055.
- Consequência contraintuitiva: **objeto menor relaya mais nítido**. 4 mm de diâmetro dá
  91×91 pontos; 20 mm dá 18×18.

### 1.7 Cone de visão

A zona de visão **não é um cone, é um anel**. O furo do espelho superior abre um **ponto
cego bem acima da imagem**.

```
θ  = ângulo em relação ao eixo óptico
elevação sobre o plano da abertura = 90° − θ
zona visível: θ ∈ [θ_min, θ_max]
```

- `θ_max` vem da borda do espelho inferior. `θ_min` vem do furo.
- **Verificado (D=130, Δ=20, 1:1, ⌀sup 82%):** θ 9,8°–39,1°, mediano 25,9°.
- **A elevação típica fica notavelmente estável em ~64°** independente da altura da imagem.
  É o número de projeto para montar o aparato na bancada.
- Subir a imagem quase não mexe no limite rasante; o que acontece é o ponto cego engolir o
  anel por dentro (11° → 47° indo de Δ=5 para Δ=60 mm).
- O diâmetro do espelho superior é o botão do limite rasante. Ótimo perto de **90%** —
  em 94% o furo cresce mais rápido que o ganho e a janela piora.
- O anel é completo em azimute, então os dois olhos, lado a lado, caem sempre os dois
  dentro dele. **A estereopsia é automática; o que limita é subir e baixar a cabeça.**

---

## 2. Ergonomia do observador

```
Δh = altura do olho − altura da imagem
d  = Δh · tan θ                          distância horizontal ótima
altura do olho em pé   ≈ 0,936 × estatura
altura do olho sentado ≈ 45 cm + 0,445 × estatura
```

**Regra de correção** (cai direto da fórmula):
- `θ < θ_min` — agudo demais, caiu no ponto cego → **afastar-se**
- `θ > θ_max` — aberto demais, rasante demais → **aproximar-se**

**Verificado** para observador de 180 cm em pé, mesa de 80 cm, lóbulo padrão:

| distância | θ | elevação | situação |
|---|---|---|---|
| 30 cm | 22,4° | 67,6° | dentro, quase no ótimo |
| 60 cm | 39,5° | 50,5° | fora por 0,4° |
| 120 cm | 58,8° | 31,2° | muito fora |

- Janela útil 13–59 cm, ótimo em **35 cm**.
- Abrir o espelho superior para 90% leva a janela a 15–76 cm e resolve os 60 cm.
- **120 cm é inalcançável por óptica.** Exige baixar o aparato: com ele no chão (5 cm),
  Δh sobe para 148 cm e a janela vira 25–120 cm.
- Altura de mesa ideal: 30 cm → 91 cm de mesa; 60 cm → 29 cm; 120 cm → impossível
  (a conta pede −94 cm).
- **Sentado piora.** Δh cai para 29 cm e a janela encolhe para 5–24 cm.

---

## 3. Fontes emissivas e o limite do holograma

### 3.1 O que um sistema de imagem faz e não faz

Leva **superfície em superfície**. Não inventa volume. Um display cilíndrico no leito
produz uma casca cilíndrica de luz flutuando — com profundidade real, mas cilindro.

### 3.2 Pré-distorção geométrica

Para a imagem ser uma esfera de raio ρ, a fonte precisa ser um elipsoide de semi-eixos
`ρ/m_t` lateral e `ρ/m_L` axial. Em modo 1:1 essa correção é a **identidade**.

### 3.3 Por que um mapa equirretangular não resolve

**Verificado** com a figura humana de 16 mm, envoltória de semi-eixos 6,4 × 8,5 × 13,4 mm:

| | elipsoide envolvente | cilindro |
|---|---|---|
| mapa preenchido | 81% | 81% |
| profundidade descartada | 21,3 mm | 20,6 mm |
| erro de posição da luz (RMS) | **9,03 mm** | **11,47 mm** |

Duas falhas independentes empilhadas:

1. **A envoltória já perde o objeto.** 19% do mapa não encosta em nada — são as
   concavidades (vão entre pernas, sob o braço, sob a aba do chapéu).
2. **Um mapa 2D joga a profundidade fora por definição.** Guarda cor em função de (θ, φ);
   a distância radial não cabe nele. E a paralaxe *é* essa distância radial.

Escala de comparação: a aberração do próprio relé nesse campo é **0,35 mm**. O erro do
mapeamento é 26× maior (elipsoide) e 33× maior (cilindro). **A óptica não é o gargalo.**

### 3.4 O que funciona

O cilindro é o suporte certo; falta uma dimensão. O dado precisa ser
`(θ, altura, vista)` — três eixos, não dois. Na prática: lenticular vertical enrolada no
cilindro, e o mapa vira uma pilha de mapas, um por vista.

```
~240 vistas em azimute   → posiciona a superfície dentro do borrão do relé
~630 vistas em azimute   → movimento sem salto perceptível (pupila 4 mm a 400 mm)
```

Orçamento **verificado**: cilindro de 1.440 mm², resolução espacial 0,35 mm →
~11.800 posições de microlente. Só paralaxe horizontal: **2,8 Mpx, passo de 23 µm**.
Paralaxe completa: 52 Mpx a 5,3 µm.

### 3.5 Orçamento de informação do relé

```
étendue = A_objeto × Ω_pupila ≈ 410 mm²·sr  →  1,6 × 10⁹ modos ópticos (λ = 500 nm)
vistas distinguíveis ≈ 16.600 (pupila 4 mm a 400 mm)
campo de luz completo ≈ 5,6 M amostras
```

**A óptica nunca é o elo fraco.** O gargalo é a aberração fora do eixo (§1.6) e o
display.

### 3.6 A fronteira do termo "holograma"

Um campo de luz relayado é **imagem integral autoestereoscópica**, não holograma.
A distinção é física, não terminológica:

- **Holograma** carrega **fase** — frente de onda reconstruída por interferência.
  Tem acomodação correta e não tem número finito de vistas.
- **Campo de luz** carrega **radiância por direção**. Número finito de vistas,
  acomodação errada.

Ironia útil: **espelhos aceitariam um holograma de verdade sem reclamar** — são
acromáticos e preservam fase, ao contrário de qualquer lente. Um SLM no leito seria
relayado fielmente; o limite passaria a ser o produto espaço-largura-de-banda do SLM
(~10⁷), duas ordens abaixo do que a óptica aguenta.

### 3.7 Gravura especular no leito

Uma fonte **passiva** que entrega o eixo que falta ao §3.4: uma placa espelhada riscada
(a técnica popular dos "riscos com compasso", de W. Beaty, e a holografia especular de
M. Brand), assentada no vértice do espelho inferior e iluminada por uma lâmpada pontual.
**Não é holograma** (§3.6): não há fase, só radiância por direção, com paralaxe contínua.

**Mesma física, três níveis.** Os três calculam a normal ao contrário,
`n̂ ∝ d_entrada − d_saída` (o `refl()` invertido). Muda só o que se exige dos raios:

| nível | exigência | superfície | profundidade |
|---|---|---|---|
| estigmático (este relé) | ponto → ponto, todos os raios | elipsoide contínuo | reproduz a que já existe |
| especular (gravura) | lâmpada → ponto P, um raio por vista | mosaico de micro-cônicas | cria pontos 3D |
| cáustico (lente de forma livre) | fluxo uniforme → distribuição | forma livre por transporte ótimo | nenhuma: é brilho num plano |

O micro-espelho ideal de cada ponto é uma cônica de focos na lâmpada e em P: **elipsoide**
se P está acima da placa (P é imagem real da lâmpada), **hiperboloide** se está abaixo
(virtual). O arco de compasso é uma aproximação dessa cônica.

**Projeto no espaço da imagem.** O alvo P é dado **na imagem flutuante**. Para cada X da
placa, o inverso do relé dá a direção `ô(X)` que, depois de M1 → M2 → abertura, passa por
P. Com a lâmpada em L, a normal exigida é `n ∝ L̂ − ô`. Um sulco (calha) só reflete se sua
tangente for perpendicular a n, então a tangente tem de seguir o campo

```
t̂(X) ∝ ẑ × (L̂(X) − ô(X))           no plano da placa
```

**O sulco correto é uma curva integral desse campo**, não um arco escolhido à mão. O
inverso do relé absorve sozinho a aberração fora do eixo, `m_t`/`m_L` (§3.2, §4.5) e o giro
de 180°. É a "pré-distorção" que o método manual não consegue fazer, mas exata.

**Verificado** (preset ×1 · 1 cm, placa no plano z = 0, lâmpada no eixo em `z₂ + 100 mm`,
elevação de projeto θ = 15,9°, mediana do lóbulo):

- **Ponto no eixo → sulco circular fechado**, centrado no eixo. O lugar dos brilhos tem
  raio constante em azimute até 10⁻¹⁴ mm. É o caso do disco de vinil, o único em que o
  círculo é a curva exata.
- Raio do sulco `r ≈ δ·tan θ`, com θ a elevação de projeto: δ = 3 mm → R = 0,858 mm;
  δ = 10 mm → R = 2,869 mm. **Os sulcos são pequenos** porque o lóbulo deste preset é
  estreito (2,6–23,1°).
- Fora do plano conjugado o relé não é estigmático. A profundidade no espaço do objeto
  que reproduz δ = ±4 mm na imagem é +3,83 / −4,18 mm (m_L local ≠ 1 em ±4%). O projeto
  reverso já embute isso; um projeto feito no espaço do objeto erraria.
- Ponto fora do eixo (x = 4 mm, δ = +3; x = 6 mm, δ = −3) → laço fechado, a 9,6 µm e
  19 µm de um círculo com centro deslocado (3,845 mm e 6,237 mm). **Nesta geometria, a
  "forma errada do arco" fica abaixo da tolerância de fabricação.** O erro dominante é
  outro (abaixo).
- **Gêmeo conjugado.** Uma calha simétrica reflete pelos dois flancos, e cada sulco gera
  **dois** pontos: o projetado e um gêmeo espelhado no plano da placa (δ = +3 → gêmeo
  medido a Δz = −5,9 mm do alvo, isto é, ≈ −δ). A saída é um **perfil de faceta de um
  lado só** (sulco "blazed"): ponto acima → faceta tomba para fora; ponto abaixo → para
  dentro. Inclinação de faceta medida: **5–9°** (8,3° em δ = +3; 9,0° em δ = +10).
- **Paralaxe só horizontal.** O sulco acerta a profundidade na elevação de projeto
  (erro 0,15 mm em δ = 3; 0,69 mm em δ = 10, por convergência de 5 olhos, 16 mm de passo,
  a 350 mm). A ±6° de elevação o erro sobe para 1,36 / 0,94 mm em δ = 3 e 4,1 mm em δ = 10.
  **A profundidade escala com a altura da cabeça.** O anel tolera bem o azimute (§1.7);
  a elevação continua sendo o limite, agora também para a profundidade.
- **Um laço único não serve a uma elevação só.** Fora do eixo, a elevação servida varia
  ao longo do laço. Em φ = 90°–180° o erro é 0,8–1,6 mm mesmo na elevação de projeto. A
  saída é multiplexar: compor o sulco com segmentos de curvas integrais diferentes, cada
  um semeado na elevação de projeto do seu setor de azimute. Esse é o problema
  combinatório que Brand descreve.
  - **Verificado** (simulador, objeto "2 naves", 6 pontos amostrados, θ de projeto,
    φ = −90°): laço único, erro médio/máx **0,77 / 2,09 mm**; 12 setores, **0,33 / 0,66 mm**.
    A ±6° de elevação os dois modos ficam em 1,7–2,7 mm de média. A segmentação corrige o
    azimute, mas não a elevação.

**Disco girante** (o caso dos discos de vinil gravados com naves que giram). Relé, placa e
lâmpada no eixo têm simetria de revolução. Por isso **girar a placa de α em torno do eixo
gira a imagem inteira de α, rigidamente**, sem deformar nada. É teorema de simetria, não
aproximação, e vale para qualquer gravura, não só círculos. Consequências:
- Com a placa girando, um observador parado vê o objeto flutuante girar e percorre todos
  os azimutes do anel sem se mexer. O "todos em volta" do §1.7 vira "um parado vê tudo".
- Os sulcos são laços fechados (pontos no eixo dão círculos centrados; fora do eixo, laços
  quase circulares de centro deslocado). A gravura é uma superfície riscada sem começo nem
  fim, compatível com giro contínuo.
- Tirar a lâmpada do eixo quebra a simetria: o giro deixa de ser rígido e a imagem passa a
  se deformar com o ângulo. Isso só deve ser feito de propósito.
- Verificar no simulador: girar a placa de α e medir o giro da nuvem de pontos por
  `converge()`. Deve dar α com erro de arredondamento.
  **Verificado:** em 30°, resíduo de 3·10⁻¹² mm (laço) e 1·10⁻¹¹ mm (segmentado).

**Anel de LEDs com a placa parada** (a luz gira, não o disco). N LEDs num anel de raio ρ,
acesos em sequência. A placa é a união de N cópias do desenho, a cópia k girada de
β_k = 2πk/N e calculada para o LED k. Pela mesma simetria, LED k + cópia k mostram a imagem
girada de β_k. O preço é que as outras N − 1 cópias recebem a mesma luz fora de projeto.
- **Verificado** (preset ×1·1cm, ρ = 10, N = 24): a cópia certa dá a imagem girada com
  resíduo de 7·10⁻¹² mm.
- **Verificado — com sulco comum o anel não funciona.** Com calha ou faceta (uma faixa de
  normais em cada ponto), a condição de brilho `n̂·t̂ = 0` é uma equação só sobre uma
  curva. Por isso **todo sulco brilha para qualquer LED**, só que deslocado, e todas as
  cópias aparecem juntas como um borrão girado. Medido: 94 % dos brilhos do quadro vêm de
  cópias erradas (N = 24, ρ = 10); com N = 6 e ρ = 14 a fração cai, mas os fantasmas
  ainda superam os brilhos certos ~5×.
- **Verificado — a fita resolve.** Uma face plana com normal única (a fita exportada em
  STL) exige duas condições, e a cópia de outro LED quase nunca as cumpre. Medido em modo
  segmentado, N = 6, ρ = 14: 29 certos / 2 fantasmas (ℓ = 2 mm) e 137 certos / 22
  fantasmas (ℓ = 4 mm). Com N = 24 os fantasmas voltam (139 / 341): a separação angular
  entre LEDs vizinhos, ρ·Δβ visto da placa, precisa ser bem maior que o tamanho aparente
  da lâmpada.
- **O custo da fita:** ela só brilha onde a elevação servida coincide com a do olho,
  dentro da tolerância da lâmpada. A imagem fica esparsa; com o laço único quase nada
  aparece. O par natural é o desenho segmentado ou o arame 3D que serve uma elevação
  exata.
- **No Holosion,** a luz do anel tem de passar pelo furo. Isso limita ρ ≤ (furo −
  r_placa(1 − D/z_L))·z_L/D, que dá 14,1 mm neste preset. Na versão sem espelhos (vinil
  direto) não há limite.

**Iluminação.** Lâmpada pontual no eixo, acima da imagem. Ela ilumina a placa pelo furo
(até r = 42,4 mm neste preset) e fica fora de qualquer linha de visada até a imagem.
**Isso não a esconde:** ela ainda é vista diretamente, a ~θ da imagem. Ela precisa de
capuz, emitindo só no cone que atravessa o furo. A luz parasita (reflexo da lâmpada em
M2 e sua imagem conjugada) tem de ser medida por traçado. *Não verificado.*

**Janela cáustica e diagrama de potência** (*proposto, não verificado*):
- Os sulcos cobrem uma fração pequena da placa, e quase toda a luz cai entre eles. Uma
  janela refrativa de forma livre no furo, calculada por transporte ótimo, pode mandar a
  luz só para onde há sulco. A densidade-alvo é o mapa de sulcos do projeto reverso.
  Refrativa e não espelhada: o erro de inclinação da superfície pesa `(n−1) ≈ 0,5` no
  desvio do raio, contra `2` num espelho, ou seja, 4× mais tolerante.
- Repartir a placa entre os pontos por **diagrama de potência**: cada ponto recebe área
  proporcional ao brilho-alvo dividido pela transmissão do relé naquele ponto do campo.
- Exibir o **pullback**: cada ponto da placa colorido pelo ponto da imagem que alimenta.
  É literalmente o que vai para a gravação, como o mapa do §4.4.

**Verificação independente.** O projeto é reverso; a conferência tem de ser direta e
**não pode usar o alvo P**. Para cada olho, achar no sulco onde a condição de cone
`(ô − L̂)·t̂ = 0` troca de sinal, pegar os raios de saída de vários olhos lado a lado e
aplicar `converge()`. O ponto medido contra o projetado é a métrica.

### 3.8 Espiral de Nipkow no leito (imagem volumétrica programável)

A gravura do §3.7 é passiva: o desenho fica fixo no metal e só tem paralaxe horizontal.
Aqui o objeto no leito é um **rotor** e a luz é **endereçada**. Cada pulso acende um ponto
real, e o relé reforma os pontos no ar. Isto continua não sendo holograma (§3.6): é uma
imagem volumétrica por varredura, relayada.

**Por que um rotor e não um arame só.** Uma curva girando varre apenas uma superfície de
revolução, um conjunto 2D. Para cobrir um volume, o rotor é uma **escada em espiral de M
raios de arame**:
- degrau k na altura `z_k = z₀ + (z_max − z₀)·k/(M − 1)` e no ângulo `φ_k = 2πk/M`;
- uma volta só, para que nenhum degrau fique em cima de outro.

É a espiral de furos de Nipkow com um eixo a mais.

**Endereçamento.**
- O feixe sai do pivô G (galvo ou pupila do projetor, no eixo, acima da imagem, passando
  pelo furo) e mira o conjugado Q° do voxel.
- Ele cruza a altura de cada degrau em `B_k = G + (z_k − G_z)/b̂_z · b̂`. Escolhe-se o
  degrau mais perto de Q°.
- O pulso dispara na fase `ψ = atan2(B_k) − φ_k`.
- A direção vem do galvo; a profundidade vem do tempo.
- Erro de profundidade ≤ ½·Δz/|b̂_z|.

**O arame tem de ser fosco.** Um arame polido reflete o feixe num cone de Keller em torno
do próprio eixo. Esse leque cruza o lóbulo de visão em só duas retas. Fosco, o ponto
aceso espalha para todo o lóbulo e é uma fonte real, com paralaxe completa.

**LEDs não substituem o rotor.** Iluminação de área acende o arame fosco inteiro. Num
arame especular, ela reproduz os fantasmas medidos no anel do §3.7. A profundidade só fica
programável com movimento mais luz estreita. Cor sai de lasers RGB, ou do próprio DLP,
modulados no mesmo endereçamento.

**Verificado** (`nipkow-espiral-no-leito.html`; preset ×1·1cm; M = 24, R = 8, z_max = 9,
arame 0,1 mm; galvo 100 mm acima da imagem; 116 voxels das 2 naves):
- Conjugado Q° traçado de volta ao ar: erro de 0,002 / 0,006 mm (médio / máx).
- Ponto realmente aceso no degrau → imagem: erro de 0,083 / 0,214 mm. Isso inclui o passo
  Δz = 0,37 mm.
- **Paralaxe vertical:** o mesmo ponto visto de baixo e de cima do lóbulo difere
  0,009 / 0,017 mm. A gravura erra 1,7–2,7 mm a ±6°.
- **Paralaxe horizontal:** lados opostos diferem 0,018 / 0,031 mm.
- Oclusão por outros degraus: 7,4 % da pupila em média, 23,5 % no pior caso.
- Girar o padrão de 40° usa o mesmo degrau, com o pulso 40° depois. Resíduo de fase 0.

**Orçamento de tempo** (o limite real):
- **Galvo.** Um ponto por vez. Voxels que caem na mesma fase (mesma linha radial, mesma
  altura) não cabem na mesma volta. Com assentamento de 150 µs, as 2 naves precisam de 10
  voltas a 30 voltas/s, ou seja 3 quadros/s. Mesmo com um defletor de 10 µs ainda são
  6 voltas, por causa de colisões exatas de fase.
- **Galvo ILDA vetorial** (padrão do simulador; galvos de show de laser, ~US$ 100–300).
  O galvo segue a sequência de pontos no relógio do DAC, sem assentar: um salto de Δθ
  ocupa ⌈Δθ/passo⌉ pontos. O campo inteiro tem só 1,16° óptico, então quase todo salto
  cabe em 1–3 pontos. Voxels que caem no mesmo ponto do mesmo degrau viram um pulso só
  (naves: 103 pulsos para 116 voxels). Medido a 30 k pontos/s, passo 0,5°:
  - naves: 20 quadros/s a 120 voltas/s;
  - cubo 120 voxels: 24 quadros/s a 120 voltas/s;
  - hélice 120 voxels: 60 quadros/s a 120 voltas/s;
  - onda 220 voxels: 30 quadros/s a 120 voltas/s com M = 25.

  O limite deixa de ser o galvo e passa a ser a colisão de fase: mesmo a 10 voltas/s
  ficam 3–4 voltas por quadro. M ímpar desfaz as colisões de objetos com simetria
  central (o degrau k + M/2 deixa de existir): naves com M = 25 sobem de 8 para
  10 quadros/s a 30 voltas/s. A rotação ótima com galvo é 90–150 voltas/s.
- **Projetor DLP** (quadros binários a 20 k/s, ~670 fatias de fase por volta). Todos os
  voxels de uma fatia acendem juntos. Medido: naves 116 e 298 voxels → 2 voltas,
  15 quadros/s; cubo 300 voxels → 1 volta, 30 quadros/s. Borrão de 75 µm.
- O DLP é o caminho para volume cheio; o galvo, para desenhos de poucos pontos.

**Segurança.** O feixe desce pelo furo e atravessa o espaço da imagem. A base do rotor
tem de ser preta e fosca, para não devolver reflexo especular ao público. Use laser
classe 2, ou o DLP.

---

## 4. Requisitos do simulador

### 4.1 Núcleo de traçado (obrigatório)

- Traçado 3D vetorial completo, **não paraxial**. Interseção analítica raio-elipsoide
  (quadrática), reflexão por `d' = d − 2(d·n̂)n̂`.
- Amostragem da pupila anular por espiral de ângulo áureo:
  `r = √(a² + u(R² − a²))`, `φ = i·2,399963…`
- Ponto de imagem por **convergência de mínimos quadrados sobre as retas de saída**
  (matriz `Σ(I − d̂d̂ᵀ)`), não por interseção com um plano. Isso captura a curvatura de
  campo automaticamente.
- Três pernas testadas contra oclusão: objeto→M1, M1→M2, M2→abertura. A terceira importa:
  os raios que vêm do miolo do anel passam rente à peça.
- Vinhetagem física: raio que cruza `z = D` fora do furo bate no verso do espelho superior.
  Marcar como barrado, com override opcional para estudar o borrão isolado.

### 4.2 Dimensionamento automático

- **Furo:** varrer o feixe de saída de **todo o campo**, não só do ponto axial. Em Δ
  pequeno o vínculo é a própria imagem, que fica no plano da abertura e seria recortada.
- **Espelho inferior:** dimensionar para interceptar todo o feixe que desce. **Os dois
  espelhos não precisam ter o mesmo diâmetro** — forçar isso derruba a transmissão para
  ~58%; dimensionar corretamente devolve 100%.
- Iterar furo ↔ espelho inferior 3 vezes (há dependência mútua).

### 4.3 Objeto

- Figura humana articulada como **união de esferas** — a mesma representação desenha,
  amostra e testa oclusão, então não há divergência entre o que se vê e o que se traça.
- Esqueleto em frações da altura; ossos preenchidos por cadeias de esferas.
- Corpo rígido girando sobre o tornozelo (inclinação), braços com dois segmentos,
  chapéu de aba. Cores distintas por membro para ler orientação ao girar.
- Peça assentada no leito curvo (levantar até o ponto mais baixo tocar `z_inf(r)`).
- Esfera envolvente para descarte rápido na oclusão.
- Rejeitar amostras cuja normal aponte para longe do espelho (`d·n̂ < 0,06`).

### 4.4 Chaveador de fonte

| modo | o que emite | oclusão |
|---|---|---|
| Objeto | união de esferas | teste esfera a esfera |
| Elipsoide | envoltória + mapa equirretangular | convexo: `d·n̂ > 0` + segmento-elipsoide |
| Cilindro | cilindro + mesmo mapa | convexo + segmento-cilindro |

O mapa equirretangular deve ser **construído por traçado**: para cada (θ, φ) partir do
ponto na envoltória e caminhar até o centro, guardando cor e **fração radial**. Exibir o
bitmap resultante — é literalmente o que iria para o display. Reportar profundidade
descartada e erro de posição RMS.

### 4.5 Pré-compressão

Caixa "pré-comprimir a fonte por 1/m", aplicada às posições **no referencial do mundo**
(depois da rotação, antes do assentamento). Leitura **fidelidade de proporção** =
`aspecto_imagem / aspecto_original`; deve dar 1,00 quando ligada.

### 4.6 Painéis

1. **Cena 3D (Three.js)** — espelhos em corte, feixe traçado, nuvem de pontos da imagem,
   lóbulo anelar (limite externo verde, borda do ponto cego vermelha), família de lóbulos
   de outras aberturas, piso/mesa/observador em escala real.
2. **Ficha de fabricação** — tudo em cm: ⌀, flecha, raio de vértice, cônica, semi-eixos,
   furo, vértice a vértice, **vão entre bordas**, envelope L×P×A, altura total.
3. **Rodapé 2D** — elevação em escala com piso, mesa, aparato esquemático, lóbulo
   preenchido, observador e marcas de distância com ✓/✗.
4. **Botoneira de presets 3×3** com **coluna prevista contra medida** recalculada do
   traçado, não copiada.

### 4.7 Desempenho

Passe de rascunho durante o arrasto (metade da amostragem, 8 raios de pupila), passe fino
ao parar (~170 ms). Reconstruir a óptica só quando parâmetros de espelho mudam;
rotação da peça só reconstrói a imagem.

---

## 5. Presets calibrados

Todos com `D = 278 mm`, campo de projeto 8 mm, pré-compressão ligada.
`m_par` é o alvo **paraxial** necessário para que o aumento **real**, medido pelo
centroide do feixe, caia no valor pedido. A diferença de 4–5% é o deslocamento do
centroide pela coma.

| alvo | Δ | m_par | ρ₁ | ⌀ sup | ⌀ inf | furo | vão | estica | borrão | pontos | lóbulo θ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ×1 | 1 cm | 1,0000 | 0,539 | 21,0 | 23,4 | 2,4 | 20,6 | 1,000 | 0,10 | 81 | 2,6–23,1° |
| ×1 | 3 cm | 1,0000 | 0,575 | 22,0 | 26,0 | 4,1 | 19,3 | 1,000 | 0,10 | 79 | 4,3–24,5° |
| ×1 | 7 cm | 1,0000 | 0,696 | 25,8 | 34,0 | 9,2 | 14,1 | 1,000 | 0,12 | 65 | 9,7–30,1° |
| ×2 | 1 cm | 2,0739 | 0,515 | 23,4 | 13,7 | 3,4 | 22,7 | 2,048 | 0,52 | 31 | 1,8–12,4° |
| ×2 | 3 cm | 2,0727 | 0,515 | 23,1 | 14,4 | 4,0 | 22,7 | 2,048 | 0,50 | 32 | 2,0–12,3° |
| ×2 | 7 cm | 2,0828 | 0,551 | 24,2 | 16,8 | 5,4 | 21,7 | 2,056 | 0,55 | 29 | 2,7–12,9° |
| ×3 | 1 cm | 3,1529 | 0,516 | 24,9 | 10,2 | 5,1 | 23,1 | 3,104 | 1,01 | 24 | 1,7–8,7° |
| ×3 | 3 cm | 3,1491 | 0,514 | 24,6 | 10,7 | 5,0 | 23,1 | 3,101 | 0,98 | 24 | 1,7–8,6° |
| ×3 | 7 cm | 3,1622 | 0,540 | 25,4 | 12,2 | 5,6 | 22,5 | 3,111 | 1,05 | 23 | 1,8–8,9° |

Diâmetros, furo e vão em cm; borrão em mm no campo de 8 mm.

**Restrições usadas na otimização:** vão ≥ 5 mm, transmissão ≥ 92%,
largura de lóbulo ≥ 20°/m. Mérito maximizado: `m_t · campo / borrão`.
A resolução cresce monotonicamente com D — 27,8 cm é o teto prático adotado, não um
ótimo interior.

**Leitura da tabela:** ×1 dá 81 pontos, proporção exata de graça, lóbulo de 20° e um
molde só. ×3 dá 24 pontos, exige fonte achatada a um terço, lóbulo de 7° e dois
ferramentais. **Ampliar custa caro em tudo ao mesmo tempo, e o preço está no invariante,
não na óptica.**

---

## 6. Métricas obrigatórias no painel

| métrica | o que é | verde quando |
|---|---|---|
| aumento lateral `m_t` | medido, não paraxial | — |
| aumento em altura `m_L` | medido | — |
| esticamento `m_L/m_t` | igual a `m_t` por teorema | ≈ 1,00 |
| fidelidade de proporção | aspecto imagem ÷ aspecto original | ≈ 1,00 |
| borrão médio | RMS da nuvem | < 0,4 mm |
| luz aproveitada | raios que passam ÷ disparados | > 75% |
| ⌀ sup / ⌀ inf / ⌀ furo | cm | furo < 70% do ⌀ sup |
| flecha sup / inf | cm | — |
| **vão entre bordas** | cota crítica | > 1 cm |
| envelope L×P×A | cm | — |
| elevação mín / típica / máx | graus sobre o plano da abertura | — |
| ponto cego no topo | `2·θ_min` | < 15° |
| folga do olho | arco em mm à distância escolhida | > 120 mm |

---

## 7. O que não afirmar

1. **Não é holograma.** Nem o objeto sólido, nem o display, nem o campo de luz.
   É imagem real aérea (ou campo de luz relayado). Não há registro nem reconstrução de
   frente de onda. A sensação de sólido vem de paralaxe binocular.
2. **Não descrever o par parabólico como "imagem invertida"** sem qualificar: é giro de
   180° em torno do eixo, com quiralidade preservada.
3. **Não prometer detalhe que o relé não entrega.** 16 mm de figura → ~23 pontos no
   diâmetro. Não resolve rosto, mão nem aba de chapéu. Entrega silhueta, pose e orientação.
4. **Não sugerir que pré-distorção geométrica cria informação.** Ela corrige forma, não
   natureza. Nenhum mapa 2D fabrica profundidade.
5. **Não usar semelhança de pessoa real e identificável** como objeto de teste. Figura
   genérica articulada cumpre todo o papel técnico — pose dramática, quiralidade clara,
   auto-oclusão pesada.
6. **Não chamar a gravura especular de holograma** (apesar do nome popular "scratch
   hologram"). Não prometer paralaxe vertical: a profundidade de cada ponto muda com a
   altura da cabeça (§3.7).
7. **Não vender lente cáustica como fonte 3D.** Ela produz brilho num plano. Relayada,
   vira uma figura chapada flutuando. No aparato ela serve como **iluminação**.

---

## 8. Ordem de construção sugerida

1. Traçado 2D meridional com paraboloides e esferas. Estabelecer o ajuste sem aberração
   e ver o penhasco de degradação.
2. Trocar para o par elipsoidal. Confirmar RMS ~10⁻¹⁴ em qualquer altura.
3. Separar os diâmetros dos dois espelhos e dimensionar o inferior. Confirmar 100% de
   transmissão.
4. Achar `z₁ = D·z₂/(m·D + z₂)` e confirmar `m_t` e `m_L` por diferenças centrais.
5. Cena 3D com objeto sólido, oclusão nas três pernas, nuvem por convergência.
6. Cone de visão anelar e ergonomia em escala real.
7. Chaveador de fonte e mapa equirretangular. Quantificar o erro.
8. Presets calibrados com conferência prevista × medida.
9. Gravura especular no leito (§3.7): inverso do relé, campo de tangentes, curva integral,
   perfil de faceta, conferência direta com olhos. Depois a janela cáustica.
10. Espiral de Nipkow no leito (§3.8): rotor em escada, conjugado por `converge()`,
    agenda de pulsos por fase, câmera somando uma volta, paralaxe medida por subconjuntos
    da pupila.

---

## 9. Verificações de sanidade

Rodar sempre que mexer no núcleo:

```
par parabólico ideal        → RMS axial 0,0000 mm, m_t = −1, m_L = +1
par elipsoidal, qualquer Δ  → RMS axial < 10⁻¹² mm
modo 1:1                    → ganho angular 1,00 monotônico; k₁ = k₂; b₂/b₁ = z₂/D
borrão vs campo             → razão borrão/h² constante
preset ×1 · 1 cm            → 81 pontos, esticamento 1,000, lóbulo 2,6–23,1°
preset ×3 · 7 cm            → 23 pontos, esticamento 3,111, lóbulo 1,8–8,9°
gravura, ponto axial        → sulco circular centrado, desvio de raio < 10⁻¹² mm
gravura ×1 · 1 cm, δ = 3    → R = 0,858 mm, faceta 8,3°, erro na elevação de projeto < 0,2 mm
gravura, calha simétrica    → gêmeo a ≈ −δ presente; faceta de um lado só → gêmeo some
nipkow ×1 · 1 cm, naves     → conjugado < 0,01 mm; paralaxe vertical < 0,02 mm; padrão girado α → pulso +α exato
```

Se qualquer uma falhar, o núcleo de traçado quebrou — não ajustar constantes para
mascarar.
