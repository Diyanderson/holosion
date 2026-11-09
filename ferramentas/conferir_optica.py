# Conferência independente do simulador (JavaScript) com Python puro: math + numpy, nada reaproveitado do JS.
# 1) equação do espelho (paraxial)  2) traçado de raios próprio no espelho esférico real  3) difração (disco de Airy da pupila)
import json, math, sys
import numpy as np

d = json.load(open(sys.argv[1], encoding="utf8"))
S, CX = d["S"], d["CX"]
R = S["R"]; f = R / 2; u = S["u"]; raio_esp = S["Wm"] / 2
W, H = d["tela"]
Pd, ex, ey, nd = (np.array(d[k], float) for k in ("Pd", "ex", "ey", "nd"))
C = np.array([0.0, 0.0, R])                              # centro da esfera; vértice na origem, espelho olha para +z

# ---------- 1) óptica paraxial clássica ----------
v_par = 1.0 / (1.0 / f - 1.0 / u)                         # 1/u + 1/v = 1/f
m_par = v_par / u
print(f"[1] paraxial: f = {f:.1f} mm, u = {u:.1f} mm -> v = {v_par:.1f} mm, |m| = {m_par:.3f}")

# ---------- 2) traçado de raios próprio ----------
def acerta_esfera(O, dr):
    oc = O - C; b = oc @ dr; c = oc @ oc - R * R; D = b * b - c
    if D < 0: return None
    for t in (-b - math.sqrt(D), -b + math.sqrt(D)):
        if t <= 1e-6: continue
        P = O + t * dr
        if P[2] >= R: continue                             # só a calota da frente
        if P[0] ** 2 + P[1] ** 2 > raio_esp ** 2: continue  # disco ⌀ Wm
        return P
    return None

def na_janela(P, r):                                        # o raio refletido passa pela frente do gabinete? (janela + passagem do degrau)
    if abs(r[2]) < 1e-12: return False
    t = (CX["zp"] - P[2]) / r[2]
    if t <= 0: return False
    X = P + t * r
    return CX["ax0"] <= X[0] <= CX["ax1"] and d["gav"]["y0"] + 7 <= X[1] <= CX["ay1"]

ns = 60
grade_esp = [np.array([x, y, R - math.sqrt(R * R - x * x - y * y)]) for x in np.linspace(-raio_esp, raio_esp, ns) for y in np.linspace(-raio_esp, raio_esp, ns) if x * x + y * y <= raio_esp ** 2]

def imagem(Q):
    A = np.zeros((3, 3)); bvec = np.zeros(3); n = 0; linhas = []
    for M in grade_esp:
        dr = M - Q; dr /= np.linalg.norm(dr)
        if dr @ nd <= 0: continue                           # a tela só emite pela frente
        P = acerta_esfera(Q, dr)
        if P is None: continue
        nrm = (C - P) / np.linalg.norm(C - P)
        r = dr - 2 * (dr @ nrm) * nrm
        if r[2] <= 0 or not na_janela(P, r): continue
        Pm = np.eye(3) - np.outer(r, r); A += Pm; bvec += Pm @ P; n += 1; linhas.append((P, r))
    if n < 6: return None, None
    I = np.linalg.solve(A, bvec)
    rms = math.sqrt(np.mean([np.sum(((I - P) - ((I - P) @ r) * r) ** 2) for P, r in linhas]))
    return I, rms

pts = {}
for i in range(7):
    for j in range(5):
        a = (i / 6 - 0.5) * W * 0.96; b = (j / 4 - 0.5) * H * 0.96
        pts[(i, j)] = imagem(Pd + a * ex + b * ey)
I_esq, I_dir, I_baixo, I_cima, I_c = pts[(0, 2)][0], pts[(6, 2)][0], pts[(3, 0)][0], pts[(3, 4)][0], pts[(3, 2)][0]
larg = np.linalg.norm(I_dir - I_esq) / 0.96; alt = np.linalg.norm(I_cima - I_baixo) / 0.96
incl = math.degrees(math.atan2(abs(I_cima[2] - I_baixo[2]), abs(I_cima[1] - I_baixo[1])))
rmsC = pts[(3, 2)][1]; rmsMax = max(p[1] for p in pts.values() if p[1] is not None)
print(f"[2] traçado Python: imagem {larg:.1f} × {alt:.1f} mm, |m| = {larg / W:.3f}, centro a {I_c[2]:.1f} mm do espelho, inclinação {incl:.1f}°, "
      f"pontos com imagem {sum(p[0] is not None for p in pts.values())}/35, rms do espelho todo: centro {rmsC:.2f}, pior {rmsMax:.2f} mm")
print(f"    simulador JS: imagem {d['larg']:.1f} × {d['alt']:.1f} mm, |m| = {d['m']:.3f}, centro a {d['flut']:.1f} mm, inclinação {d['inclImg']:.1f}°, "
      f"rms centro {d['rmsC']:.2f}, pior {d['rmsMax']:.2f} mm")
print(f"    diferença: largura {abs(larg - d['larg']):.2f} mm, altura {abs(alt - d['alt']):.2f} mm, distância {abs(I_c[2] - d['flut']):.2f} mm")
print(f"    por que o traçado dá |m| menor que o paraxial ({m_par:.3f}): celular {abs(S['dy']):.0f} mm fora do eixo e inclinado {S['tau']}°, espelho rápido (f/{f / (2 * raio_esp):.2f})")

# ---------- 3) difração ----------
lam = 550e-6; pupila = 4.0                                   # mm
th = 1.22 * lam / pupila                                     # raio angular do disco de Airy (rad)
dist_olho = S["ed"]
print(f"[3] difração (pupila ⌀{pupila:.0f} mm, 550 nm): raio de Airy {th * 1e3:.3f} mrad = {th * dist_olho:.3f} mm na imagem vista a {dist_olho:.0f} mm "
      f"(o borrão geométrico que o olho vê é ~0,3 mm: a difração é {0.29 / (th * dist_olho):.1f}× menor)")
