# Roteiro de vídeo — "Do Mirage ao celular: a imagem aérea passo a passo"

Duração prevista: 11–13 minutos. Formato: captura de tela dos simuladores (aba indicada em cada cena) com narração. Todos os números são medidas do traçado de raios; a narração nunca deve chamar a imagem de "holograma" nem de "invertida".

Convenções: **[TELA]** = o que aparece; **NARRAÇÃO** = texto falado; **[NÚMEROS]** = legendas a inserir; **[AÇÃO]** = o que fazer no simulador.

---

## Cena 0 — Abertura (0:00–0:35)

**[TELA]** `mirage-rotor-3d.html`, aba "rotor espiral". Vista 3D girando devagar em volta do par de espelhos com a imagem flutuando sobre o furo.

**NARRAÇÃO**
Dois espelhos côncavos, um furo no de cima, um objeto no leito do de baixo. A luz sobe, reflete duas vezes e forma uma imagem real que flutua no ar. É o brinquedo "Mirage". Neste vídeo, a pergunta que nos guiou por dezoito tentativas: dá para trocar o objeto, o motor e um dos espelhos por um celular e um pedaço de espelho, e ainda ter profundidade?

**[NÚMEROS]** "Tudo o que você vai ver é traçado de raios. Nada da imagem é desenhado."

---

## Cena 1 — O único ponto perfeito (0:35–1:20)

**[TELA]** Aba rotor. **[AÇÃO]** clicar em "verificar": o painel mostra o RMS no foco e os aumentos.

**NARRAÇÃO**
O par parabólico tem um único ponto sem aberração: quando o foco de cada espelho cai no vértice do outro. Ali o erro é zero até a precisão da máquina. O aumento é menos um nos dois eixos e mais um na profundidade. Isso não é uma imagem de cabeça para baixo: é o objeto girado 180 graus. Fora desse ponto a imagem não borra — ela some.

**[NÚMEROS]** "RMS no foco ≈ 10⁻¹⁴ mm · m_t = −1 · m_L = +1 · giro de 180°"

---

## Cena 2 — Voxels de verdade: o rotor espiral (1:20–2:10)

**[TELA]** Aba rotor, animação em câmera lenta de um pulso do galvo acendendo um ponto do arame e os raios saindo pelo furo. Depois a "vista do olho" com o toro.

**[AÇÃO]** Trocar o objeto em sequência: toro → cubo → hélice → estrela; aproximar a câmera 3D do leito para mostrar a escada helicoidal de arames e um pulso acendendo um ponto; ligar "objeto girando em 3D" no cubo.

**NARRAÇÃO**
Primeira ideia: um rotor de arames foscos em escada helicoidal girando no leito e um laser apontado pelo furo. Cada voxel é posicionado assim: conjugado para o espaço do objeto, recebe a pá cuja altura é a sua e a fase em que essa pá cruza o raio da sua posição; o pulso acende o ponto no lado do arame voltado para o feixe. Toro, cubo, hélice ou estrela — a escada se redesenha para cada objeto: o cubo pede 21 pás com passo de 0,67 milímetro, a estrela 11. O par de espelhos leva cada ponto para cima. Isso é um voxel de verdade, com paralaxe para todos os lados. Tentamos otimizar tudo — ordem das pás, alturas, posição de cada voxel — e quase não ajudou: o que sobra é a aberração do próprio brinquedo fora do foco.

**[NÚMEROS]** "erro do voxel 0,28 mm (spot 2 mm) · treino: 0,67 → 0,60 mm · precisa de motor + laser"

---

## Cena 3 — Trocando o espelho por uma tela (2:10–3:10)

**[TELA]** Aba "display no leito" (mostrar o mapa pré-compensado); depois aba "tela no espelho de cima" com o OLED curvo e os três quadros (olho esquerdo, direito, pessoa ao lado).

**NARRAÇÃO**
Sem motor: um display no leito. Funciona, mas a imagem é plana e o resíduo cresce com o quadrado do raio. Pusemos um display no lugar do espelho de baixo: nada — três quartos da luz volta para a própria tela. No lugar do espelho de cima, com um OLED curvo, funcionou — e descobrimos por quê: a tela fica perto do plano focal do espelho de baixo, então cada pixel vira uma direção. Com rastreio do olho, acendemos um pixel por ponto e por olho. O preço: a luz parece vir de 575 milímetros e os olhos convergem a 360.

**[NÚMEROS]** "display inferior: 75–86 % da luz volta → sem imagem · OLED curvo: 0,6 mm, vazamento 6 %, foco 575 vs 360 mm"

---

## Cena 4 — As pétalas (3:10–3:50)

**[TELA]** Aba 3, forma "plana": quatro celulares em cata-vento ao redor do furo; modo "seis" com os assentos.

**NARRAÇÃO**
Quatro telas planas de celular no plano focal, em cata-vento ao redor do furo. Reconstrução de 0,2 milímetro, nenhum vazamento entre os olhos, e com um giro de 9 graus das pétalas seis pessoas sentadas veem a imagem inteira. Guarde a regra desta cena: tela no plano focal, abertura menor que a distância entre os olhos. Ela volta no final.

**[NÚMEROS]** "0,20 mm · vazamento 0 · 6 assentos a 100 % (giro 9°)"

---

## Cena 5 — Um espelho só, bem grande (3:50–4:30)

**[TELA]** Aba "acessório", configuração do tablet com recorte R 700 (ou captura antiga). Mostrar o bojo antes e depois da pré-compensação.

**NARRAÇÃO**
E se fosse um espelho só? Um recorte de esfera de 700 milímetros de raio com um tablet forma uma imagem de 20 por 13 centímetros flutuando a quase 70 centímetros, nítida. A curvatura de 8 milímetros desaparece quando a tela é pré-distorcida para onde o olho está. Mas isso é um móvel, não um objeto de mesa.

**[NÚMEROS]** "199 × 128 mm a 685 mm · borrão 0,14 mm · bojo 8,3 → 0,0 mm"

---

## Cena 6 — O acessório portátil e a meia-lua (4:30–5:30)

**[TELA]** Aba acessório, botão "acessório portátil". Caixa semitransparente: meia-lua embaixo do iPhone deitado, abertura ao pé dele, projeção acima do tampo.

**NARRAÇÃO**
Portátil, então: um iPhone deitado de tela para baixo sobre uma meia-lua do espelho do Mirage, numa caixa preta de 5 a 7 litros, com a abertura ao pé do celular. A imagem sobe. Mas o olho vê só uma parte da tela. O motivo é geométrico: a imagem é maior que a tela, e o espelho, mais longe do olho, parece menor que ela. Aumentar o espelho só do lado do celular piora — o que faltava estava embaixo da abertura.

**[NÚMEROS]** "40 % da tela · 5,6 L · aumentar só atrás: 9 → 1–3 pontos em 55–125 L"

---

## Cena 7 — Pixel a pixel e o aprendizado (5:30–6:20)

**[TELA]** Botão "resultado do aprendizado". Mostrar o texto de medidas com a área projetada e a caixa "pixel a pixel".

**NARRAÇÃO**
Dois saltos. Primeiro, a lição da aba 3: em vez de encaixar um retângulo dentro da imagem curva, cada pixel visível mostra o que o olho deve ver naquela direção. A área útil cresce de 46 para 69 centímetros quadrados sem mudar nada no aparelho. Segundo, um recozimento simulado com o traçado como custo — e com semente fixa, para que o mesmo treino dê sempre o mesmo resultado.

**[NÚMEROS]** "46 → 69 cm² · aprendizado: 88 cm² em 9,5 L · repetível à 6ª casa decimal"

---

## Cena 7b — Os artistas da paralaxe (6:20–7:00)

**[TELA]** Cartões com texto (sem reproduzir obras): "anamorfose", nomes de Felice Varini, Georges Rousse, Julian Beever, Edgar Müller; depois "Lippmann 1908 · lenticular · Pepper 45°". Cortar para a tela do celular pré-distorcida endireitando no quadro do olho.

**NARRAÇÃO**
Essa ideia de distorcer para um olho só tem uma tradição longa na arte. Felice Varini pinta formas quebradas em prédios e salas que só se fecham num ponto de vista; Georges Rousse faz o mesmo com fotografia; Julian Beever e Edgar Müller desenham no chão buracos e precipícios que só existem de onde a câmera está. É a anamorfose: a obra é a distorção calculada para um observador — e se desfaz com a paralaxe, como a nossa tela quando o olho sai da janela. Lippmann, as impressões lenticulares e as ilusões de palco com vidro a 45 graus fazem o caminho inverso: usam a paralaxe a favor, uma vista para cada olho. O acessório estéreo está nessa segunda família — só que cada vista é calculada por traçado, não gravada.

**[NÚMEROS]** "anamorfose = pré-compensação para um olho · integral/lenticular = uma vista por direção"

---

## Cena 8 — O problema dos dois olhos (7:00–7:40)

**[TELA]** Ligar "dois olhos" no melhor dos mundos. Mostrar o erro por olho e a lâmina inclinada na vista 3D.

**NARRAÇÃO**
Até aqui medíamos um olho. Com dois, a imagem real cobra: os dois olhos veem os mesmos pixels. A imagem é uma lâmina inclinada de 36 graus, com 26 milímetros de profundidade ao longo da vista, e o conteúdo desenhado nela não tem volume próprio. Compensando para o olho do meio, cada olho fica milímetros fora do lugar.

**[NÚMEROS]** "erro por olho: 1,1 / 3,2 / 3,6 mm · lâmina de 26 mm, inclinada 36°"

---

## Cena 9 — Estéreo no foco (7:00–8:00)

**[TELA]** Botão "estéreo nítido". Quadro olho esquerdo | olho direito; quadro "tela do celular" com as duas imagens pré-distorcidas; vista 3D com o cubo refeito e as camadas do volume.

**NARRAÇÃO**
A regra das pétalas, agora com um celular só: ele desce para o plano focal e cada pixel vira uma direção; a abertura fica menor que a distância entre os olhos, então cada feixe chega a um olho só. O celular mostra duas imagens pré-distorcidas, uma por olho, cada uma com cerca de 15 por 16 milímetros. Os dois olhos refazem um cubo de 30 milímetros com 0,7 de erro. O volume existe de 4 centímetros dentro da caixa a 20 centímetros acima dela. O preço: a luz chega focada no infinito e os olhos convergem perto — de 2 a 4 dioptrias de conflito.

**[NÚMEROS]** "0 % de pixels em comum · erro 0,71 mm · volume −40 a +200 mm · conflito 2,0–4,3 D"

---

## Cena 10 — Paralaxe (8:00–8:40)

**[TELA]** Ligar "passeio": o olho anda sozinho para os lados; a imagem de três posições da cabeça (fig. paralaxe).

**NARRAÇÃO**
Para a cabeça poder andar, o celular em paisagem põe o lado comprido na direção do movimento, e a abertura cresce para 72 por 56. A excursão dobra, de 6 para 12 centímetros para cada lado. Alargar mais custa: o borrão cresce com o quadrado do ângulo fora do eixo e os olhos começam a dividir pixels.

**[NÚMEROS]** "±60 → ±120 mm · abertura 72 × 56 · 1–2 % compartilhados"

---

## Cena 11 — Três tentativas de nitidez (8:40–9:40)

**[TELA]** Botões "cata-vento", "nítido (vidro 45°)" e "estéreo nítido", em sequência, mostrando o campo "nitidez" de cada um.

**NARRAÇÃO**
O olhar precisava ser quase vertical. Tentamos o cata-vento, com a abertura no eixo: 2,3 milímetros de borrão, porque os pixels ficam longe do centro do foco. Tentamos o celular de pé com um vidro a 45 graus, como num visor de avião: nítido, 0,73, caixa de 1,9 litro, mas um quarto do brilho. E descobrimos que o mesmo resultado sai sem o vidro: celular deitado cobrindo o foco, abertura ao lado, brilho total.

**[NÚMEROS]** "cata-vento 2,3 mm · vidro 45°: 0,73 mm, brilho 25 % · deitado no foco: 0,71 mm, brilho 100 %"

---

## Cena 12 — Melhor dos mundos (9:40–10:30)

**[TELA]** Botão "melhor dos mundos": espelho cobrindo o fundo todo, abertura ao lado, texto mostrando 35/35 e a janela de 220 × 720. Depois "melhor dos mundos com duas imagens".

**NARRAÇÃO**
Para ver a tela inteira com um espelho só, ele tem de passar também por baixo da abertura. Com a mesma curvatura cobrindo o fundo da caixa e o celular a 15 centímetros, o olho vê os 35 pontos de teste, os dois olhos veem 48 de 49, e a cabeça pode andar numa janela de 22 por 72 centímetros. Sem conflito de foco — e sem profundidade própria. O mesmo espelho com o celular no foco dá volume numa caixa baixa, mas borra o dobro: a curvatura do próprio Mirage é mais nítida.

**[NÚMEROS]** "35/35 · 48/49 · janela 220 × 720 mm · 11,7 L · duas imagens: 0,81 mm, borrão 1,34, 5,2 L"

---

## Cena 13 — Inclinação, pixel e aparelho (10:30–11:30)

**[TELA]** Botão "estéreo ajustado"; escolher iPhone 15 Pro nos botões de tela. Mostrar a tabela de pixels (pode ser um cartão).

**NARRAÇÃO**
Inclinamos o espelho 16 graus com o celular acompanhando o foco. O borrão não melhora — é um piso de 0,75 milímetro dado pelo espelho — mas o olhar desce de 88 para 72 graus, bem mais confortável. Trocamos o tamanho do pixel e separamos as duas causas: a tela governa a precisão da profundidade; o espelho governa a nitidez. Por isso o iPhone melhora o pior ponto em 15 por cento e nada mais. E um detalhe para quem for construir: 3 centésimos de milímetro fora do foco já pioram o erro em 15 por cento.

**[NÚMEROS]** "pixel 0,13 / 0,064 / 0,032 / 0,016 mm → erro 1,54 / 0,73 / 0,36 / 0,24 · borrão sempre 0,77 · foco ±0,03 mm"

---

## Cena 13b — Jogando: "Proteja a Terra" (11:30–13:00)

**[TELA]** Aba "tela no espelho de cima", modo 6 lugares, botão "jogo: chuva de meteoros 3D". Som ligado (M desliga). Depois cortar para a aba rotor com o mesmo jogo e para a aba acessório no estéreo.

**[AÇÃO]** Jogar de verdade por ~60 s: setas para orbitar, T para travar um meteoro (a linha tracejada e o retículo giratório aparecem), H para a hipervelocidade (arco com rastro ciano), espaço para disparar; deixar um meteoro atingir a Terra para mostrar a cratera, o clarão e a sirene; um abate travado para mostrar o combo dobrado e a fanfarra.

**NARRAÇÃO**
Para provar que tudo isso aguenta conteúdo vivo, fizemos um jogo. A Terra gira no centro do volume; meteoros vêm da borda; a nave orbita o planeta nos três eixos. T trava o alvo — ouça o varrer e o bip de confirmação; o ping do radar acelera enquanto o meteoro se aproxima. H dá o salto em hipervelocidade pelo arco mais curto, com rastro. Espaço dispara pela direção de interceptação: abate travado vale o dobro, com fanfarra. Se um meteoro passa, o planeta ganha uma cratera, um clarão e a sirene. Trilha em lá menor, mais rápida a cada nível. E o essencial: nada disso é desenhado na imagem. No rotor cada peça vira voxels reconjugados dez vezes por segundo; no espelho de cima cada assento recebe só os pixels que veria; no acessório os dois olhos refazem a cena acima da abertura. O jogo só existe através dos raios traçados.

**[NÚMEROS]** "rotor: ~110 voxels, galvo ~17 qps · espelho de cima: 14 000 pontos, 2 × 4 200 pixels, 79 qps · acessório estéreo: 57 qps · som: lock, radar, hiper, abate, impacto, trilha 126 bpm"

---

## Cena 14 — O que fica (13:00–13:50)

**[TELA]** Tabela final com as três configurações; o arquivo 3MF aberto num fatiador; o jogo rodando no modo estéreo.

**NARRAÇÃO**
Com um espelho e uma tela plana, não dá para ter ao mesmo tempo a tela inteira, o volume do conteúdo e o foco correto. Dá para escolher dois. Deixamos as três configurações finais medidas, exportadas em 3MF para impressão, e um jogo rodando em tempo real que só existe através dos raios traçados. Cada tentativa que falhou está no registro com o seu número — porque o método foi este: a mesma régua para todas as ideias, inclusive as que pareciam funcionar.

**[NÚMEROS]** "tela inteira + foco correto: 11,7 L · profundidade real: 4,4 L, 0,64 mm, 2–4 D · 3MF prontos"

---

## Observações de produção

- Gravar em 1366 × 768 ou maior; usar os botões "medidas / olho / tela" para esconder painéis quando a cena pedir a vista 3D limpa.
- No modo estéreo, ligar "pupila real" apenas na cena 11 (mostra o borrão); nas demais, deixar desligada para o quadro ficar limpo.
- A caixa "congelar o relógio" fixa a animação para capturas comparativas.
- Não usar as palavras "holograma" nem "imagem invertida" na locução.
