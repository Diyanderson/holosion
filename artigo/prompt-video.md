# Prompt de vídeo — "Do Mirage ao celular: a imagem aérea passo a passo"

Prompt para gerador de vídeo por IA (texto → vídeo), cena a cena. Cada cena traz: **duração**, **prompt visual** (o que gerar), **texto em tela**, **narração** (voz em português do Brasil) e **áudio**. Os números são as medidas do traçado de raios do projeto; não os altere. Onde indicado, intercale capturas reais do simulador (`mirage-rotor-3d.html`), porque o gerador não reproduz os painéis com fidelidade.

**Estilo global (acrescentar a todo prompt):** render 3D fotorrealista com fundo escuro azul-petróleo (#0B1317), materiais pretos foscos e alumínio espelhado, luz suave de estúdio, câmera lenta e estável, estética de laboratório de óptica; raios de luz visíveis como linhas finas coloridas (verde-menta, âmbar, rosa) atravessando o ar; legendas em fonte monoespaçada branca; proporção 16:9; 24 qps. Nunca usar as palavras "holograma" ou "imagem invertida" na narração ou no texto em tela.

---

## Cena 0 — Abertura (0:00–0:35)
**Prompt visual:** Dois espelhos parabólicos côncavos de 23 cm unidos pela borda, o de cima com um furo central; sobre o furo flutua um pequeno toro colorido feito de pontos de luz. A câmera orbita devagar a 30° de elevação; raios finos sobem do leito, refletem duas vezes e convergem acima do furo.
**Texto em tela:** "Tudo o que você vai ver é traçado de raios. Nada da imagem é desenhado."
**Narração:** Dois espelhos côncavos, um furo no de cima, um objeto no leito do de baixo. A luz sobe, reflete duas vezes e forma uma imagem real que flutua no ar. É o brinquedo Mirage. Neste vídeo, a pergunta que nos guiou por dezoito tentativas: dá para trocar o objeto, o motor e um dos espelhos por um celular e um pedaço de espelho, e ainda ter profundidade?
**Áudio:** pad sintético grave e contínuo; um "ping" cristalino quando a imagem se forma.

## Cena 1 — O único ponto perfeito (0:35–1:20)
**Prompt visual:** Corte lateral animado do par de espelhos em linha fina; o foco de cada parábola (ponto brilhante) desliza até cair exatamente no vértice do outro espelho; nesse instante todos os raios se cruzam num ponto único acima do furo. Depois os espelhos se afastam 2 mm e o feixe bate por trás do espelho superior: a imagem apaga de uma vez.
**Texto em tela:** "RMS no foco ≈ 10⁻¹⁴ mm · m_t = −1 · m_L = +1 · giro de 180°"
**Narração:** O par parabólico tem um único ponto sem aberração: quando o foco de cada espelho cai no vértice do outro. Ali o erro é zero até a precisão da máquina. O aumento é menos um nos dois eixos e mais um na profundidade. Isso não é uma imagem de cabeça para baixo: é o objeto girado 180 graus. Fora desse ponto a imagem não borra — ela some.
**Áudio:** clique seco no encaixe; silêncio súbito quando a imagem apaga.

## Cena 2 — Voxels de verdade: o rotor espiral (1:20–2:10)
**Prompt visual:** Dentro do espelho inferior, uma escada espiral de arames foscos gira; um feixe verde de laser desce pelo furo e acende um ponto no arame no instante exato; câmera lenta de um pulso: do ponto aceso saem raios que refletem nos dois espelhos e convergem acima do furo. Pulsos sucessivos desenham um toro de luz.
**Prompt visual (continuação):** Close na escada helicoidal: pás de arame fosco saindo de um eixo fino, cada uma um degrau acima da anterior, completando uma volta; o laser verde desce pelo furo e acende um ponto no lado da pá voltado para o feixe no instante em que ela cruza o raio. Os objetos trocam em sequência — toro, cubo, hélice, estrela — e a escada muda de passo e de número de pás a cada troca; o cubo gira em 3D e cada aresta é reconjugada a cada passo.
**Intercalar:** capturas reais da aba "rotor espiral": `fig/mirage-helice.png` (a escada helicoidal de perto, com o ponto aceso de um pulso), `fig/mirage-cubo.png` e `fig/mirage-estrela.png` (cubo e estrela flutuando sobre o furo, com o gráfico ângulo × imagem visível). Manter cada captura por 3–4 s com zoom lento.
**Texto em tela:** "erro do voxel 0,28 mm (spot 2 mm) · treino: 0,67 → 0,60 mm · cubo: 21 pás, Δz 0,67 mm, 156 voxels, 20 qps · estrela: 11 pás, 15 qps · precisa de motor + laser"
**Narração:** Primeira ideia: um rotor de arames foscos em escada helicoidal girando no leito e um laser apontado pelo furo. Cada voxel é posicionado assim: ele é conjugado para o espaço do objeto, recebe a pá cuja altura é a sua e a fase de rotação em que essa pá cruza o raio da sua posição; o pulso acende o ponto no lado do arame voltado para o feixe. Toro, cubo, hélice ou estrela — a escada se redesenha para cada objeto: o cubo pede 21 pás com passo de 0,67 milímetro, a estrela 11. O par de espelhos leva cada ponto para cima. Isso é um voxel de verdade, com paralaxe para todos os lados. Tentamos otimizar tudo — ordem das pás, alturas, posição de cada voxel — e quase não ajudou: o que sobra é a aberração do próprio brinquedo fora do foco.
**Áudio:** zumbido do motor; estalos curtos a cada pulso do laser.

## Cena 3 — Trocando o espelho por uma tela (2:10–3:10)
**Prompt visual:** Três quadros em sequência: (a) um relógio redondo brilhando no centro do espelho inferior, com a imagem plana dele acima do furo; (b) o espelho inferior inteiro vira uma tela e os raios que saem dela voltam e batem na própria tela — a imagem acima do furo não aparece; (c) o espelho superior vira uma tela OLED curva com o furo, e de cada pixel sai um feixe paralelo numa direção única; dois olhos estilizados a 36 cm recebem feixes distintos.
**Intercalar:** capturas reais das abas "display no leito" e "tela no espelho de cima" (três quadros: olho esquerdo, direito, pessoa ao lado).
**Texto em tela:** "display inferior: 75–86 % da luz volta → sem imagem · OLED curvo: 0,6 mm, vazamento 6 %, foco 575 vs 360 mm"
**Narração:** Sem motor: um display no leito. Funciona, mas a imagem é plana e o resíduo cresce com o quadrado do raio. Pusemos um display no lugar do espelho de baixo: nada — três quartos da luz volta para a própria tela. No lugar do espelho de cima, com um OLED curvo, funcionou — e descobrimos por quê: a tela fica perto do plano focal do espelho de baixo, então cada pixel vira uma direção. Com rastreio do olho, acendemos um pixel por ponto e por olho. O preço: a luz parece vir de 575 milímetros e os olhos convergem a 360.
**Áudio:** tique-taque suave do relógio; "erro" grave no quadro (b); dois tons alternados (esquerdo/direito) no quadro (c).

## Cena 4 — As pétalas (3:10–3:50)
**Prompt visual:** Vista de cima: quatro celulares deitados com a tela para baixo, dispostos em cata-vento ao redor de uma abertura quadrada de 79 mm sobre o espelho inferior; seis pares de olhos em círculo a cada 60°; feixes finos de cada tela vão para os olhos de cada lugar sem se cruzarem. O cata-vento gira 9° e as faixas escuras das molduras saem da frente dos olhos.
**Intercalar:** captura real do modo "6 lugares estéreo".
**Texto em tela:** "0,20 mm · vazamento 0 · 6 assentos a 100 % (giro 9°)"
**Narração:** Quatro telas planas de celular no plano focal, em cata-vento ao redor do furo. Reconstrução de 0,2 milímetro, nenhum vazamento entre os olhos, e com um giro de 9 graus das pétalas seis pessoas sentadas veem a imagem inteira. Guarde a regra desta cena: tela no plano focal, abertura menor que a distância entre os olhos. Ela volta no final.
**Áudio:** acorde que se completa quando o giro de 9° termina.

## Cena 5 — Um espelho só, bem grande (3:50–4:30)
**Prompt visual:** Um gabinete preto do tamanho de um móvel de sala, com uma janela de vidro fumê de 55 × 34 cm; dentro, um recorte retangular de espelho esférico e um tablet; uma imagem de 20 × 13 cm flutua 30 cm para fora da janela. Sobreposição: a grade curvada se endireita quando a pré-compensação liga.
**Texto em tela:** "199 × 128 mm a 685 mm · borrão 0,14 mm · bojo 8,3 → 0,0 mm"
**Narração:** E se fosse um espelho só? Um recorte de esfera de 700 milímetros de raio com um tablet forma uma imagem de 20 por 13 centímetros flutuando a quase 70 centímetros, nítida. A curvatura de 8 milímetros desaparece quando a tela é pré-distorcida para onde o olho está. Mas isso é um móvel, não um objeto de mesa.
**Áudio:** "whoosh" curto quando a grade endireita.

## Cena 6 — O acessório portátil e a meia-lua (4:30–5:30)
**Prompt visual:** Sobre uma mesa de madeira escura, uma caixa preta fosca de 19 × 26 × 14 cm com as paredes semitransparentes: no fundo uma meia-lua de espelho, sobre ela um celular deitado com a tela para baixo, e ao pé dele uma abertura quadrada na tampa; uma imagem de pontos flutua 6 cm acima da tampa. Um olho estilizado olha de 65°; só parte da imagem acende.
**Intercalar:** captura real do botão "acessório portátil".
**Texto em tela:** "40 % da tela · 5,6 L · aumentar só atrás: 9 → 1–3 pontos em 55–125 L"
**Narração:** Portátil, então: um celular deitado de tela para baixo sobre uma meia-lua do espelho do Mirage, numa caixa preta de 5 a 7 litros, com a abertura ao pé do celular. A imagem sobe. Mas o olho vê só uma parte da tela. O motivo é geométrico: a imagem é maior que a tela, e o espelho, mais longe do olho, parece menor que ela. Aumentar o espelho só do lado do celular piora — o que faltava estava embaixo da abertura.
**Áudio:** ambiente de sala silenciosa; nota descendente no "piora".

## Cena 7 — Pixel a pixel e o aprendizado (5:30–6:20)
**Prompt visual:** A tela do celular vista de frente: dentro de uma figura curva, um retângulo pequeno; o retângulo some e toda a figura curva se preenche de conteúdo. Depois, um gráfico de otimização subindo em degraus enquanto a caixa 3D muda de proporções ao lado.
**Texto em tela:** "46 → 69 cm² · aprendizado: 88 cm² em 9,5 L · repetível à 6ª casa decimal"
**Narração:** Dois saltos. Primeiro, a lição da aba 3: em vez de encaixar um retângulo dentro da imagem curva, cada pixel visível mostra o que o olho deve ver naquela direção. A área útil cresce de 46 para 69 centímetros quadrados sem mudar nada no aparelho. Segundo, um recozimento simulado com o traçado como custo — e com semente fixa, para que o mesmo treino dê sempre o mesmo resultado.
**Áudio:** cliques de contador acelerando durante a otimização.

## Cena 7b — Os artistas da paralaxe (6:20–7:00)
**Prompt visual:** Montagem estilizada, sem reproduzir obras reais: um pátio onde formas geométricas pintadas em paredes, chão e colunas se fecham num círculo perfeito quando a câmera chega a um ponto exato e se desmancham quando ela anda; um desenho de giz na calçada que vira um buraco profundo só visto de um lado; um palco escuro onde um vidro inclinado a 45° faz uma figura translúcida aparecer ao lado de uma pessoa real; por fim uma impressão lenticular que muda de imagem quando inclinada. Transição para a tela do celular pré-distorcida, que se endireita no olho.
**Texto em tela:** "anamorfose: a imagem certa existe para um único olho · Lippmann 1908: uma vista para cada direção"
**Narração:** Essa ideia de distorcer para um olho só tem uma tradição longa na arte. Felice Varini pinta formas quebradas em prédios e salas que só se fecham num ponto de vista; Georges Rousse faz o mesmo com fotografia; Julian Beever e Edgar Müller desenham no chão buracos e precipícios que só existem de onde a câmera está. É a anamorfose: a obra é a distorção calculada para um observador — e se desfaz com a paralaxe, como a nossa tela pré-distorcida quando o olho sai da janela. A fotografia integral de Lippmann, as impressões lenticulares e as ilusões de palco com vidro a 45 graus fazem o caminho inverso: usam a paralaxe a favor, dando uma vista a cada olho. O nosso acessório estéreo está nessa segunda família — com a diferença de que cada vista é calculada por traçado, não gravada.
**Áudio:** música de câmara leve; um "clique" de encaixe quando a anamorfose se fecha.

## Cena 8 — O problema dos dois olhos (6:20–7:00)
**Prompt visual:** Dois olhos a 64 mm olhando a mesma lâmina de luz inclinada 36° que flutua sobre a caixa; linhas de visada dos dois olhos caem no mesmo pixel do celular; um cubo desenhado na lâmina aparece achatado, "pintado" nela.
**Texto em tela:** "erro por olho: 1,1 / 3,2 / 3,6 mm · lâmina de 26 mm, inclinada 36°"
**Narração:** Até aqui medíamos um olho. Com dois, a imagem real cobra: os dois olhos veem os mesmos pixels. A imagem é uma lâmina inclinada de 36 graus, com 26 milímetros de profundidade ao longo da vista, e o conteúdo desenhado nela não tem volume próprio. Compensando para o olho do meio, cada olho fica milímetros fora do lugar.
**Áudio:** dois tons quase iguais batendo (batimento), para sugerir o desalinhamento.

## Cena 9 — Estéreo no foco (7:00–8:00)
**Prompt visual:** Corte lateral: o celular desce até o plano focal do espelho; de cada pixel sai um feixe paralelo; a abertura estreita (60 mm) deixa cada feixe chegar a um olho só. Acima da abertura, um cubo de 30 mm de arestas de luz é refeito pelo cruzamento das linhas dos dois olhos; camadas horizontais verdes mostram o volume de −4 cm a +20 cm.
**Intercalar:** captura real "olho esquerdo | olho direito" e o quadro "tela do celular" com as duas imagens trapezoidais.
**Texto em tela:** "0 % de pixels em comum · erro 0,71 mm · volume −40 a +200 mm · conflito 2,0–4,3 D"
**Narração:** A regra das pétalas, agora com um celular só: ele desce para o plano focal e cada pixel vira uma direção; a abertura fica menor que a distância entre os olhos, então cada feixe chega a um olho só. O celular mostra duas imagens pré-distorcidas, uma por olho. Os dois olhos refazem um cubo de 30 milímetros com 0,7 de erro. O volume existe de 4 centímetros dentro da caixa a 20 centímetros acima dela. O preço: a luz chega focada no infinito e os olhos convergem perto — de 2 a 4 dioptrias de conflito.
**Áudio:** acorde aberto quando o cubo se forma; tom tenso sutil ao falar do conflito.

## Cena 10 — Paralaxe (8:00–8:40)
**Prompt visual:** A cabeça do observador desliza 11 cm para a esquerda e 11 cm para a direita sobre a caixa; o cubo flutuante permanece fixo no espaço e mostra faces diferentes; o celular, em paisagem, acende manchas em posições diferentes da tela a cada posição da cabeça.
**Intercalar:** captura real com as três posições da cabeça.
**Texto em tela:** "±60 → ±120 mm · abertura 72 × 56 · 1–2 % compartilhados"
**Narração:** Para a cabeça poder andar, o celular em paisagem põe o lado comprido na direção do movimento, e a abertura cresce para 72 por 56. A excursão dobra, de 6 para 12 centímetros para cada lado. Alargar mais custa: o borrão cresce com o quadrado do ângulo fora do eixo e os olhos começam a dividir pixels.
**Áudio:** deslizamento suave sincronizado com o movimento da cabeça.

## Cena 11 — Três tentativas de nitidez (8:40–9:40)
**Prompt visual:** Tríptico: (a) abertura no eixo e celular ao lado, pixel borrado em 2,3 mm; (b) celular de pé e um vidro semiespelhado a 45°, feixe nítido mas mais escuro; (c) celular deitado cobrindo o foco, abertura ao lado, feixe nítido e brilhante. Cada painel mostra um ponto de luz com o seu borrão.
**Texto em tela:** "cata-vento 2,3 mm · vidro 45°: 0,73 mm, brilho 25 % · deitado no foco: 0,71 mm, brilho 100 %"
**Narração:** O olhar precisava ser quase vertical. Tentamos o cata-vento, com a abertura no eixo: 2,3 milímetros de borrão, porque os pixels ficam longe do centro do foco. Tentamos o celular de pé com um vidro a 45 graus, como num visor de avião: nítido, 0,73, caixa de 1,9 litro, mas um quarto do brilho. E descobrimos que o mesmo resultado sai sem o vidro: celular deitado cobrindo o foco, abertura ao lado, brilho total.
**Áudio:** três notas: baixa e abafada, média e abafada, alta e clara.

## Cena 12 — Melhor dos mundos (9:40–10:30)
**Prompt visual:** A caixa cresce para 23 × 29 × 17 cm; o espelho curvo cobre o fundo inteiro, passando por baixo do celular e da abertura; o olho vê a tela inteira (grade 5 × 7 toda acesa) e uma janela grande de 22 × 72 cm marca onde a cabeça pode ficar. Corte: o mesmo espelho com o celular no foco, caixa baixa, cubo em volume porém mais borrado.
**Intercalar:** captura real do botão "melhor dos mundos".
**Texto em tela:** "35/35 · 48/49 · janela 220 × 720 mm · 11,7 L · duas imagens: 0,81 mm, borrão 1,34, 5,2 L"
**Narração:** Para ver a tela inteira com um espelho só, ele tem de passar também por baixo da abertura. Com a mesma curvatura cobrindo o fundo da caixa e o celular a 15 centímetros, o olho vê os 35 pontos de teste, os dois olhos veem 48 de 49, e a cabeça pode andar numa janela de 22 por 72 centímetros. Sem conflito de foco — e sem profundidade própria. O mesmo espelho com o celular no foco dá volume numa caixa baixa, mas borra o dobro: a curvatura do próprio Mirage é mais nítida.
**Áudio:** acorde cheio e estável.

## Cena 13 — Inclinação, pixel e aparelho (10:30–11:30)
**Prompt visual:** O espelho inclina 16° em direção ao observador e o celular desliza para acompanhar o foco; o olhar desce de quase vertical para 72°. Depois, quatro telas lado a lado com pixels de tamanhos diferentes e, acima, cubos refeitos com erro decrescente, todos com o mesmo borrão; um iPhone substitui o iPhone.
**Texto em tela:** "pixel 0,13 / 0,064 / 0,032 / 0,016 mm → erro 1,54 / 0,73 / 0,36 / 0,24 · borrão sempre 0,77 · foco ±0,03 mm"
**Narração:** Inclinamos o espelho 16 graus com o celular acompanhando o foco. O borrão não melhora — é um piso de 0,75 milímetro dado pelo espelho — mas o olhar desce de 88 para 72 graus, bem mais confortável. Trocamos o tamanho do pixel e separamos as duas causas: a tela governa a precisão da profundidade; o espelho governa a nitidez. Por isso o iPhone melhora o pior ponto em 15 por cento e nada mais. E um detalhe para quem for construir: 3 centésimos de milímetro fora do foco já pioram o erro em 15 por cento.
**Áudio:** quatro tons cada vez mais finos para os quatro pixels.

## Cena 14 — Jogando: "Proteja a Terra" (11:30–13:00)
**Prompt visual:** Acima da abertura da caixa, em luz de pontos traçados: um pequeno globo azul e verde girando com nuvens procedurais, meteoros rochosos com cauda de fogo chegando de todos os lados, uma nave de anéis e três asas orbitando o planeta com o nariz para fora. Jogabilidade visível: a nave trava um meteoro (linha tracejada rosa da nave ao alvo e um retículo girando ao redor do meteoro), salta em hipervelocidade por um arco deixando rastro ciano, dispara um tiro amarelo pela direção de interceptação; o meteoro explode em faíscas. Um meteoro escapa e atinge a Terra: clarão, cratera incandescente. Cortes rápidos para o mesmo jogo visto no rotor (voxels), nas três telas dos olhos do espelho de cima e no estéreo do acessório, com a tela do celular mostrando as duas vistas pré-distorcidas.
**Intercalar:** 20–30 s de captura real jogando, com áudio original do simulador.
**Texto em tela:** "rotor: ~110 voxels, galvo ~17 qps · espelho de cima: 14 000 pontos, 2 × 4 200 pixels, 79 qps · acessório estéreo: 57 qps · T trava · H hiper · espaço dispara"
**Narração:** Para provar que tudo isso aguenta conteúdo vivo, fizemos um jogo. A Terra gira no centro do volume; meteoros vêm da borda; a nave orbita o planeta nos três eixos. T trava o alvo — ouça o varrer e o bip de confirmação; o ping do radar acelera enquanto o meteoro se aproxima. H dá o salto em hipervelocidade pelo arco mais curto, com rastro. Espaço dispara pela direção de interceptação: abate travado vale o dobro, com fanfarra. Se um meteoro passa, o planeta ganha uma cratera, um clarão e a sirene. Trilha em lá menor, mais rápida a cada nível. E o essencial: nada disso é desenhado na imagem. No rotor cada peça vira voxels reconjugados dez vezes por segundo; no espelho de cima cada assento recebe só os pixels que veria; no acessório os dois olhos refazem a cena acima da abertura. O jogo só existe através dos raios traçados.
**Áudio:** trilha sintetizada em lá menor a 126 bpm; varredura ascendente + bip ao travar; ping de radar acelerando; "whoosh" crescente na hipervelocidade e sino na chegada; zap do tiro; fanfarra com brilho no abate; alarme de proximidade; estrondo grave + sirene no impacto.

## Cena 15 — O que fica (13:00–13:50)
**Prompt visual:** Três caixas lado a lado sobre a mesa, com suas projeções: a grande com a tela inteira plana, a baixa com o cubo em volume, a inclinada com o cubo nítido; sobre cada uma, três ícones (tela inteira, volume, foco) com um deles apagado. Fecha com a peça impressa em 3D saindo do fatiador e o jogo correndo acima da abertura.
**Texto em tela:** "tela inteira + foco correto: 11,7 L · profundidade real: 4,4 L, 0,64 mm, 2–4 D · 3MF prontos · tudo repetível"
**Narração:** Com um espelho e uma tela plana, não dá para ter ao mesmo tempo a tela inteira, o volume do conteúdo e o foco correto. Dá para escolher dois. Deixamos as três configurações finais medidas, exportadas em 3MF para impressão, e um jogo rodando em tempo real que só existe através dos raios traçados. Cada tentativa que falhou está no registro com o seu número — porque o método foi este: a mesma régua para todas as ideias, inclusive as que pareciam funcionar.
**Áudio:** o pad da abertura retorna e resolve num acorde maior.

---

## Créditos (texto em tela, 5 s)
Anderson Alves dos Santos · Inteligência Artificial e Machine Learning (IAM) · turma FLD6662753CET · Inteligência Artificial Simbólica (234976) · Universidade Leonardo da Vinci · Projeto Holosion, 2026.
