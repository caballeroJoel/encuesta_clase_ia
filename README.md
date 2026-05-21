
# Projecte 2 - Enquesta d'aula — Plan de treball

Objectiu
- Crear una pàgina web per recollir valoracions d'aula (1–5), comentaris i grup, i un panell d'analítica amb KPIs i gràfics.

Fases i temps estimat
- IA4 (App local, dades en memòria) — ~2 h
- IA3 (GitHub + Vercel) — ~1.5 h
- IA5 (Supabase, persistència) — ~1 h

Pla de treball detallat

1) IA4 — App local (array en memòria)
- Objetiu: app funcional en local amb `index.html` (HTML, CSS, JS).
- Tareas:
	- Crear formulari: `select` grup (DAW1A, DAW1B, ASIX1), puntuació 1–5, `textarea` comentari i botó `Guardar`.
	- Validar entrada (puntuació 1..5, grup obligatori).
	- Mantener un array `respostes` en memòria; cada resposta: `{ id, grup, puntuacio, comentari, data }`.
	- Actualitzar panell al afegir respostes: KPIs (count, mitjana, % 4–5), gràfica de barres (1–5), llistat de respostes i filtre per grup.
	- Usar Chart.js CDN per la gràfica (recomanat).

2) IA3 — GitHub i desplegament a Vercel
- Objetiu: controlar versions i tenir URL pública.
- Tareas:
	- Inicialitzar repo, crear branques `dev` i `main`.
	- Desenvolupar en `dev`, obrir PR `dev → main` i fer merge un cop revisat.
	- Configurar Vercel per desplegar des de `main`.
	- Afegir instruccions de desplegament al `README.md`.

3) IA5 — Persistència a Supabase
- Objetiu: substituir l'array en memòria per una taula Supabase.
- Tareas:
	- Crear projecte Supabase i taula `respostes` (id, grup, puntuacio, comentari, data).
	- Afegir client `@supabase/supabase-js` o CDN i fer les operacions `insert` i `select`.
	- Guardar `SUPABASE_URL` i `SUPABASE_ANON_KEY` com a variables d'entorn a Vercel (no pujar-les al repo).
	- Actualitzar el panell per llegir dades des de Supabase (ordre per data descendent).

Entregables
- Enllaç al repositori GitHub (amb branques `dev` i `main` i PR realitzat).
- URL de Vercel operativa (desplegament des de `main`).
- Captura o nota que demostri que Supabase guarda i mostra dades.
- README amb 5–8 línies i 2 conclusions basades en les dades.

Comandes i notes ràpides
- Iniciar servidor local (recomanat per provar):
```
python -m http.server 5500
```
- Git bàsic:
```
git checkout -b dev
git add .
git commit -m "IA4 app local"
git push -u origin dev
```
- Variables importants (no pujar al repo): `SUPABASE_URL`, `SUPABASE_ANON_KEY`.

Consells finals
- Comença per completar IA4 (app 100% funcional en memòria) abans de pujar a Git.
- Usa Chart.js per estalviar temps amb gràfiques.
- Prova amb 10–20 respostes reals per poder extreure conclusions vàlides.

Exemple curt de conclusions (a ajustar amb les teves dades)
- "La mitjana global és 3.8; DAW1A té la mitjana més alta i ASIX1 la més baixa."
- "El 60% de respostes són positives (4–5), per tant la majoria està satisfeta però cal millorar en grups amb mitjanes baixes."


