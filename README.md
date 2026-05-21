
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

## Part C — GitHub i Vercel
1) Preparar el repositori local
- `git init` (només si encara no hi ha repo local).
- `git add .` i `git commit -m "IA4 + IA4 Part B completat"`.
- Crear la branca de treball: `git checkout -b dev`.

2) Crear el repositori a GitHub
- Crea un nou repositori públic o privat a GitHub.
- Connecta el remot local amb:
```
git remote add origin <URL-del-repo>
```
- Puja la branca `dev`:
```
git push -u origin dev
```

3) Fluix de treball amb `dev` i `main`
- Desenvolupa i fa commits a la branca `dev`.
- Quan la versió estigui estable, crea un pull request `dev → main` a GitHub.
- Revisa el PR i fes merge a `main`.
- `main` serà la branca de producció que desplegarà Vercel.

4) Desplegar a Vercel
- A Vercel, importa el projecte des de GitHub.
- Selecciona la branca `main` per al desplegament.
- Vercel detectarà que és una app estàtica i crearà la URL pública.
- Comprova que `index.html`, `styles.css` i `app.js` es carreguen correctament.

5) Què lliurar
- Enllaç del repositori GitHub.
- URL pública de Vercel operativa.
- Nota al README explicant que `main` és la branca de producció i `dev` la branca de desenvolupament.
- Opcional: llista breu del PR `dev -> main` i les passes de desplegament.

## Part D — Supabase (persistència)
1) Crear projecte Supabase
- Registra't a Supabase i crea un projecte nou.
- Agafa la URL del projecte i l'ANON KEY des de la secció `Settings -> API`.

2) Crear la taula `respostes`
- Taula: `respostes`
- Columnes:
  - `id` — integer, PK, autoincrement.
  - `grup` — text.
  - `puntuacio` — integer.
  - `comentari` — text.
  - `data` — timestamptz.

3) Configurar les credencials
- A `app.js`, reemplaça:
  - `https://YOUR-PROJECT.supabase.co` per la teva URL de Supabase.
  - `YOUR_SUPABASE_ANON_KEY` per la teva clau anònima.
- En Vercel, pots guardar aquests valors com a variables d'entorn si després fas servir un procés de build; per ara la clau anònima es pot usar en client perquè és pública.

4) Com funciona l'app
- `loadResponses()` llegeix la taula `respostes` des de Supabase cada vegada que carregues la pàgina.
- El formulari inserta una nova fila a la taula amb `grup`, `puntuacio`, `comentari` i `data`.
- Després d'inserir, l'app actualitza la llista local i mostra les dades al panell.

5) Verificar
- A Supabase, comprova la taula `respostes` després de guardar almenys una resposta.
- A l'app, comprova que les noves respostes apareixen al panell i que les gràfiques canvien.

Desplegado

Exemple curt de conclusions (a ajustar amb les teves dades)
- "La mitjana global és 3.8; DAW1A té la mitjana més alta i ASIX1 la més baixa."
- "El 60% de respostes són positives (4–5), per tant la majoria està satisfeta però cal millorar en grups amb mitjanes baixes."


