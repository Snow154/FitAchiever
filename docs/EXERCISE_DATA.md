# Textový katalóg cvikov

Aktualizované 12. októbra 2026.

Katalóg má 62 položiek: pôvodných 8 ručných položiek a 54 vybraných bežných cvikov importovaných z [free-exercise-db](https://github.com/yuhonas/free-exercise-db). Posledné rozšírenie pridalo 24 cvikov vrátane incline press, chin-up, hack squat a ďalších bežných variantov. Existujúce ID sa nemenili.

Zdroj dát: https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json

Repo deklaruje [Unlicense](https://github.com/yuhonas/free-exercise-db/blob/main/LICENSE.md). Importujeme iba názvy a faktické údaje o partii a vybavení, nie obrázky ani textové návody. Autor nepotvrdil pôvod a práva k fotografiám: https://github.com/yuhonas/free-exercise-db/issues/2

## Import a úpravy

- `scripts/import-exercises.mjs` obsahuje explicitný výber 54 zdrojových ID a vypisuje výsledný TypeScript cez `node scripts/import-exercises.mjs`.
- Výstup je uložený v `src/data/imported-exercises.ts` a pripojený do `src/data/exercises.ts`.
- Importér je vývojový nástroj; aplikácia ho neimportuje a nerobí žiadne sieťové volanie.
- `lats`, `middle back`, `lower back` a `traps` sa mapujú na `back`, `abdominals` na `core`, `body only` na `bodyweight`.
- ID sú odvodené zo zdrojových ID do lowercase kebab-case. Pôvodných 8 ID ostáva nezmenených, aby existujúce odkazy z hubu fungovali.
- Výber pokrýva všetkých 10 aktuálnych svalových skupín. Cviky na čas a vzdialenosť zatiaľ nepridávame.

Zdrojový dataset sa môže meniť. Pri ďalšom importe skontrolovať diff, stabilitu ID, duplicity a `npx.cmd tsc --noEmit`; výstup neprepisovať naslepo.

Obrázky sú odložené. Aktuálne karty zobrazujú iba názov, partiu a vybavenie.

## Slovenčina

Všetkých 62 názvov má slovenský preklad v `src/constants/exercise-labels.ts`. Export `exercises` aplikuje preklad podľa stabilného ID; importované zdrojové názvy ostávajú v angličtine, takže opakovaný import preklady neprepíše. Home, katalóg a detail používajú aj slovenské popisy partie a vybavenia. Formulár číta už preložený názov z katalógu.

Interné ID, hodnoty `primaryMuscle` a `equipment` ostávajú nezmenené; netreba migrovať uloženú históriu. Pri rozšírení katalógu doplniť slovenský názov pre nové ID a prípadné nové vybavenie.
