# FitAchiever — roadmapa učenia a vývoja

Roadmapa je rozdelená na malé vertikálne kroky. Každý krok má priniesť viditeľný výsledok a jeden hlavný React/TypeScript koncept. Codex vysvetľuje a reviewuje; používateľ píše logiku.

Pri každej fáze platí: route skladá obrazovku, samostatné UI časti majú vlastné komponenty, zdieľané doménové typy žijú v `src/types` a props ostávajú čo najmenšie. Refaktor robíme priebežne po fungujúcom kroku, nie vytvorením desiatok prázdnych súborov vopred.

## Aktuálny milestone — detail, zápis sérií, história a lokálne ukladanie logov

Aktualizované 12. októbra 2026.

Funguje navigácia medzi hubom, textovým offline katalógom so 62 cvikmi, dynamickým detailom a formulárom zápisu. `UserExercisesProvider` sprístupňuje zoznam aj `addUserExercise(exerciseId)` s immutable aktualizáciou a kontrolou duplicity. Katalóg skrýva pridané cviky. Hub ešte nemá perzistenciu: po reštarte sa obnovia dve počiatočné mock položky.

Formulár `exercise/[exerciseId]/log.tsx` sa otvára ako `formSheet`, umožňuje pridať a odstrániť série (aspoň jedna ostáva), validuje kg a opakovania a vytvára jeden `ExerciseLog` so všetkými sériami. `WorkoutLogsProvider` drží spoločnú históriu, načíta ju z AsyncStorage a po zmene ju ukladá cez front zápisov. Loading a chyba načítania blokujú obrazovky aj zápis; chyba uloženia ponúka opakovanie. Detail filtruje históriu podľa ID a zobrazuje najnovšie záznamy cez `WorkoutLogCard`.

Vizuál používa tmavé theme tokeny a zelený accent. Android preblik pri navigácii sa vyriešil cez `SystemUI.setBackgroundColorAsync(colors.background)`; animácie sú zapnuté. Formulár má `ScrollView` a `KeyboardAvoidingView`, detail zatiaľ dlhú históriu nescrolluje.

Najbližšie priority: perzistencia používateľovho hubu, manuálny test obnovy po úplnom reštarte, scrollovanie dlhej histórie a vyhľadávanie v katalógu. Potom posledný výkon na home, empty states a ďalší polish.

## Fáza 0 — rozhodnutia a setup

- [ ] uzavrieť otvorené otázky z requirements,
- [x] vytvoriť Expo + TypeScript projekt,
- [x] spustiť ho na fyzickom telefóne,
- [x] odstrániť demo obsah,
- [x] zapnúť/overiť strict TypeScript,
- [x] založiť základné route a priečinky,
- [x] vytvoriť prvý theme token (`colors`, `spacing`, `radius`).

Učíš sa: štruktúra Expo projektu, `.tsx` vs `.ts`, importy a prvý render.

Hotovo, keď: telefón zobrazí jednoduchú FitAchiever home obrazovku a typecheck prejde.

## Fáza 1 — statický osobný hub

- [x] ručne vytvoriť 6–10 mock cvikov typu `Exercise`,
- [x] vytvoriť 2–3 mock položky `UserExercise`,
- [x] v hube vykresliť iba pridané cviky cez `FlatList`,
- [x] presunúť používateľove cviky do spoločného React state cez provider a custom hook,
- [x] vytvoriť zdieľanú presentational kartu `ExerciseListItem` pre hub aj katalóg,
- [x] pridať button „Pridať cvik“ a nadpis „Moje cviky“ s počtom,
- [x] upraviť home layout: bočné odsadenie 24, medzery medzi kartami 12 a zoznam s `flex: 1`,
- [x] navrhnúť a aplikovať základ tmavého vizuálu cez spoločné tokeny,
- [ ] doplniť empty state hubu,
- [ ] obrázky a image placeholder — odložené, aktuálne používame textové karty,
- [ ] dokončiť konzistenciu farieb katalógu a podporu light theme.

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
- [x] pridať vybraný cvik do hubu bez duplicity,
- [x] skryť už pridané cviky pomocou odvodeného `availableExercises` (aktuálna voľba namiesto označovania).

Učíš sa: `useState`, odvodené dáta, `filter`, `some`, vzťahy cez ID, normalizácia textu a malé union typy.

Hotovo, keď: kombinácia search + muscle filter dá očakávaný výsledok a vybraný cvik možno pridať do hubu najviac raz.

## Fáza 3 — navigácia a detail

- [x] otvoriť dynamickú route detailu podľa `exerciseId` (`exercise/[exerciseId]/index.tsx`),
- [x] bezpečne prečítať route parameter,
- [x] nájsť cvik podľa ID,
- [x] vyriešiť stav neexistujúceho ID,
- [x] pridať tlačidlo na zápis výkonu,
- [x] pripraviť prázdnu sekciu histórie priamo pod detailom,
- [x] odstrániť Android biely preblik nastavením natívneho root pozadia cez SystemUI.

Učíš sa: Expo Router, route params, `find`, optional hodnoty a guard clauses.

Hotovo, keď: každá karta otvorí správny detail a neplatné ID appku nezrúti.

## Fáza 4 — formulár workout logu v pamäti

- [x] navrhnúť typy `WorkoutSet` a `ExerciseLog` v `src/types/workout.ts`,
- [x] otvoriť modal/form route ako `formSheet`,
- [x] pridať a odstrániť riadky sérií, ponechať minimálne jednu sériu,
- [x] upravovať váhu a opakovania immutable spôsobom cez `SetDraft[]`,
- [x] validovať vstupy (neprázdne, konečná nezáporná váha, kladné celé opakovania),
- [x] podporiť desatinnú čiarku aj bodku pri váhe,
- [x] uložiť prvý log do spoločného React state,
- [x] zobraziť ho ako prvú položku histórie pod daným cvikom,
- [x] pridať scrollovanie formulára a základné prispôsobenie klávesnici,
- [ ] doplniť voliteľný komentár a úpravu dátumu/času (aktuálne sa používa čas uloženia).

Učíš sa: arrays v state, `map`/`filter`, controlled inputs, callbacky, parsing čísiel a validácia.

Hotovo, keď: bez reloadu možno vytvoriť platný viac-sériový log a neplatné dáta sa neuložia.

## Fáza 5 — spoločný zdroj pravdy

- [x] premiestniť používateľove cviky a logy nad obrazovky do samostatných providerov a hookov,
- [ ] odvodiť posledný log pre kartu a detail,
- [x] zobraziť históriu podľa `exerciseId`, od najnovšieho záznamu,
- [x] vytvoriť presentational `WorkoutLogCard` s dátumom, časom, počtom a riadkami sérií,
- [ ] umožniť scrollovanie dlhej histórie na detaile,
- [ ] odobrať cvik z hubu bez zmazania logov,
- [ ] umožniť zmenu poradia cvikov,
- [ ] implementovať odstránenie s potvrdením,
- [ ] overiť prepočet „naposledy“.

Učíš sa: lifting state up, Context vs. custom hook, derivovanie stavu a jednosmerný tok dát.

Hotovo, keď: hub, katalóg, detail aj formulár pracujú s rovnakými dátami bez duplikácie.

## Fáza 6 — perzistencia

- [x] vybrať AsyncStorage pre aktuálny scope,
- [x] načítať workout logy pri štarte,
- [x] rozlíšiť loading, chybu načítania a prázdne dáta,
- [x] ukladať logy po zmene až po úspešnom načítaní,
- [x] serializovať zápisy cez front, chybu uloženia zobraziť s možnosťou retry,
- [x] validovať načítaný JSON a štruktúru logov/sérií; pri chybe neprepisovať úložisko,
- [ ] pridať načítanie a ukladanie `UserExercise` (hub je zatiaľ iba v pamäti),
- [ ] doplniť migráciu starších schém a obnovu pri poškodených dátach,
- [ ] zobraziť priebeh/potvrdenie zápisu (modal sa zatiaľ zavrie pred dokončením async zápisu),
- [ ] manuálne otestovať úplný reštart aplikácie.

Učíš sa: async funkcie, `useEffect`, serializácia, loading/error state a jednoduchá migrácia schémy.

Poznámka: AsyncStorage už používame pre workout logy pod kľúčom `fitachiever:workout-logs:v1`. Ak budú histórie a dotazy rásť, prehodnotíme SQLite. Manuálny reštartový test ešte nie je v konverzácii potvrdený.

## Fáza 7 — offline katalóg 100–200 cvikov

Textový výber má po rozšírení 12. októbra 2026 54 importovaných bežných cvikov + 8 pôvodných položiek (62 spolu). Zdroj, importér a mapovanie sú v `docs/EXERCISE_DATA.md`. Obrázky odkladáme; ich práva treba overiť samostatne. Dataset spike preto ešte nie je celý hotový.

- [ ] dokončiť dataset spike z requirements,
- [x] vybrať prvých 62 bežných cvikov pokrývajúcich aktuálne svalové skupiny,
- [x] jednorazovo previesť vybraných 54 zdrojových položiek na interný formát,
- [x] zachovať naše interné typy nezávislé od zdroja,
- [x] zdokumentovať zdroj, licenciu, mapovanie a vývojový importér v `docs/EXERCISE_DATA.md`,
- [x] preložiť všetkých 62 názvov a zobrazované partie/vybavenie do slovenčiny bez zmeny interných ID,
- [ ] podľa potreby rozšíriť textový katalóg na približne 100–200 cvikov,
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

