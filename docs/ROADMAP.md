# FitAchiever — roadmapa učenia a vývoja

Roadmapa je rozdelená na malé vertikálne kroky. Každý krok má priniesť viditeľný výsledok a jeden hlavný React/TypeScript koncept. Codex vysvetľuje a reviewuje; používateľ píše logiku.

Pri každej fáze platí: route skladá obrazovku, samostatné UI časti majú vlastné komponenty, zdieľané doménové typy žijú v `src/types` a props ostávajú čo najmenšie. Refaktor robíme priebežne po fungujúcom kroku, nie vytvorením desiatok prázdnych súborov vopred.

## Aktuálny milestone — statický osobný hub

Aktualizované 5. októbra 2026.

Funguje Expo Router navigácia z home obrazovky do offline katalógu a späť. Katalóg vykresľuje osem typovaných mock cvikov cez `FlatList` a samostatný presentational `ExerciseListItem`. Najbližší krok je vytvoriť typ `UserExercise`, 2–3 mock používateľské položky a zobraziť ich na home obrazovke. Pridávanie kliknutím, spoločný state a storage zatiaľ neriešime.

## Fáza 0 — rozhodnutia a setup

- [ ] uzavrieť otvorené otázky z requirements,
- [x] vytvoriť Expo + TypeScript projekt,
- [x] spustiť ho na fyzickom telefóne,
- [x] odstrániť demo obsah,
- [x] zapnúť/overiť strict TypeScript,
- [x] založiť základné route a priečinky,
- [ ] vytvoriť prvý theme token (`colors`, `spacing`, `radius`).

Učíš sa: štruktúra Expo projektu, `.tsx` vs `.ts`, importy a prvý render.

Hotovo, keď: telefón zobrazí jednoduchú FitAchiever home obrazovku a typecheck prejde.

## Fáza 1 — statický osobný hub

- [x] ručne vytvoriť 6–10 mock cvikov typu `Exercise`,
- [ ] vytvoriť 2–3 mock položky `UserExercise`,
- [ ] v hube vykresliť iba pridané cviky cez `FlatList`,
- [ ] vytvoriť presentational `ExerciseCard`,
- [ ] pridať empty state, button „Pridať cvik“ a image placeholder,
- [ ] navrhnúť light/dark vizuál.

Učíš sa: type alias, props, `FlatList`, `renderItem`, `keyExtractor` a composition.

Hotovo, keď: hub zobrazuje iba pridané cviky, rovnaká karta funguje s obrázkom aj bez neho a prázdny hub má jasnú akciu.

## Fáza 2 — katalóg a pridávanie do hubu

- [x] vytvoriť samostatnú route/modal katalógu,
- [x] vykresliť lokálny katalóg cez `FlatList`, stabilný `keyExtractor` a samostatný `ExerciseListItem`,
- [x] pridať základný cell vizuál, medzery medzi položkami a návrat späť,
- [ ] pridať controlled `TextInput`,
- [ ] filtrovať podľa názvu bez mutácie zdrojového poľa,
- [ ] pridať filter svalovej partie,
- [ ] zobraziť zmysluplný stav pri nulových výsledkoch,
- [ ] pridať vybraný cvik do hubu bez duplicity,
- [ ] označiť už pridané cviky.

Učíš sa: `useState`, odvodené dáta, `filter`, `some`, vzťahy cez ID, normalizácia textu a malé union typy.

Hotovo, keď: kombinácia search + muscle filter dá očakávaný výsledok a vybraný cvik možno pridať do hubu najviac raz.

## Fáza 3 — navigácia a detail

- [ ] otvoriť dynamickú route detailu podľa `exerciseId`,
- [ ] bezpečne prečítať route parameter,
- [ ] nájsť cvik podľa ID,
- [ ] vyriešiť stav neexistujúceho ID,
- [ ] pridať tlačidlo na zápis výkonu,
- [ ] pripraviť prázdnu sekciu histórie priamo pod detailom.

Učíš sa: Expo Router, route params, `find`, optional hodnoty a guard clauses.

Hotovo, keď: každá karta otvorí správny detail a neplatné ID appku nezrúti.

## Fáza 4 — formulár workout logu v pamäti

- [ ] navrhnúť typy `WorkoutSet` a `ExerciseLog`,
- [ ] otvoriť modal/form route,
- [ ] pridať a odstrániť riadky sérií,
- [ ] upravovať váhu a opakovania immutable spôsobom,
- [ ] validovať vstupy,
- [ ] uložiť prvý log zatiaľ iba do React state,
- [ ] zobraziť ho ako prvú položku histórie pod daným cvikom.

Učíš sa: arrays v state, `map`/`filter`, controlled inputs, callbacky, parsing čísiel a validácia.

Hotovo, keď: bez reloadu možno vytvoriť platný viac-sériový log a neplatné dáta sa neuložia.

## Fáza 5 — spoločný zdroj pravdy

- [ ] premiestniť používateľove cviky a logy nad obrazovky do hooku/providera,
- [ ] odvodiť posledný log pre kartu a detail,
- [ ] zobraziť históriu,
- [ ] odobrať cvik z hubu bez zmazania logov,
- [ ] umožniť zmenu poradia cvikov,
- [ ] implementovať odstránenie s potvrdením,
- [ ] overiť prepočet „naposledy“.

Učíš sa: lifting state up, Context vs. custom hook, derivovanie stavu a jednosmerný tok dát.

Hotovo, keď: hub, katalóg, detail aj formulár pracujú s rovnakými dátami bez duplikácie.

## Fáza 6 — perzistencia

- [ ] vybrať malé lokálne úložisko vhodné pre aktuálny scope,
- [ ] načítať dáta pri štarte,
- [ ] rozlíšiť loading od prázdnych dát,
- [ ] ukladať po zmene bez nekonečného efektu,
- [ ] ošetriť poškodené alebo staršie dáta,
- [ ] manuálne otestovať úplný reštart aplikácie.

Učíš sa: async funkcie, `useEffect`, serializácia, loading/error state a jednoduchá migrácia schémy.

Poznámka: pre malé MVP je rozumný začiatok AsyncStorage. Ak budú histórie a dotazy rásť, prehodnotíme SQLite; nerobíme túto optimalizáciu vopred.

## Fáza 7 — offline katalóg 100–200 cvikov

- [ ] dokončiť dataset spike z requirements,
- [ ] vybrať najpoužívanejšie cviky podľa svalových partií,
- [ ] jednorazovo ich previesť na interný formát,
- [ ] zachovať naše interné typy nezávislé od zdroja,
- [ ] pridať atribúciu/licenciu do obrazovky About,
- [ ] pridať optimalizované lokálne obrázky a placeholder,
- [ ] skontrolovať výkon zoznamu a veľkosť aplikácie,
- [ ] overiť celý katalóg v airplane mode.

Učíš sa: cudzie dáta vs. doménový model, mapping, licencie, lokálne assets a výkon zoznamov.

Hotovo, keď: 100–200 cvikov vrátane vybraných obrázkov funguje bez jediného sieťového volania.

## Fáza 8 — polish a prvé reálne používanie

- [ ] doladiť keyboard flow a focus ďalšieho inputu,
- [ ] pridať accessibility labels a veľké touch targets,
- [ ] otestovať light/dark mode,
- [ ] otestovať malé aj veľké telefóny,
- [ ] týždeň appku používať pri skutočnom tréningu,
- [ ] zapísať trenie a chyby bez okamžitého pridávania features.

Učíš sa: accessibility, UX testovanie a rozdiel medzi domnienkou a reálnou potrebou.

## Až po MVP

Poradie sa určí podľa reálneho používania:

1. úprava starého logu,
2. obľúbené a recent cviky,
3. vlastný cvik,
4. voliteľný koncept workout session s viacerými cvikmi,
5. PR a jednoduché grafy,
6. export/backup,
7. timer prestávok,
8. voliteľný cloud sync.

