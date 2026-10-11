# FitAchiever — requirements specification

## 1. Vízia

FitAchiever je jednoduchý osobný tréningový denník pre mobil. Má odstrániť papierové poznámky a umožniť zapísať výkon priamo počas tréningu s minimálnym počtom kliknutí.

Hlavný úspech MVP:

> Používateľ si pridá cvik do svojho hubu, zapíše jednu alebo viac sérií a po opätovnom otvorení aplikácie vidí jeho históriu aj posledný výkon.

## 2. Cieľový používateľ

- jeden používateľ na vlastnom telefóne,
- bez registrácie a účtu,
- primárne používanie v posilňovni,
- potrebuje rýchle ovládanie jednou rukou,
- chce sledovať progres, nie plánovať celý životný štýl.

## 3. Scope MVP

### A. Môj tréning — hlavná obrazovka/hub

Používateľ môže:

- vidieť iba cviky, ktoré si sám pridal do svojho hubu,
- na karte vidieť názov, partiu, malý obrázok/placeholder a dátum posledného tréningu,
- otvoriť detail cviku,
- rozlíšiť stav „ešte necvičené“ od skutočného dátumu,
- zmeniť poradie svojich cvikov,
- odobrať cvik z hubu bez vymazania jeho histórie,
- otvoriť katalóg cez výrazné tlačidlo „Pridať cvik“.

Ak používateľ ešte nemá žiadny cvik, hub zobrazí jednoduchý empty state s vysvetlením a tlačidlom „Pridať prvý cvik“.

### B. Výber cviku z offline katalógu

Po stlačení „Pridať cvik“ sa otvorí samostatná obrazovka alebo modal s offline katalógom. Používateľ môže:

- prezerať približne 100–200 najbežnejších cvikov,
- vyhľadávať podľa názvu,
- filtrovať aspoň podľa svalovej partie,
- pridať cvik do svojho hubu,
- vidieť, ktoré cviky už má pridané,
- vrátiť sa do hubu, kde sa nový cvik okamžite zobrazí.

Katalóg bude obsahovať približne 100–200 najbežnejších cvikov. Bude súčasťou aplikácie ako lokálny read-only súbor; aplikácia ho nebude sťahovať cez API.

Pre veľký zoznam sa použije `FlatList`, nie renderovanie celého poľa cez `map`.

### C. Detail cviku

Detail obsahuje:

- názov cviku,
- obrázok, ak je dostupný,
- svalovú partiu a potrebné vybavenie,
- posledný zaznamenaný výkon,
- zoznam celej histórie záznamov pre tento cvik, zoradený od najnovšieho,
- výraznú akciu „Zapísať tréning“.

Každá položka histórie zobrazí dátum, jednotlivé série vo formáte napr. `60 kg × 10` a voliteľný komentár. Detail cviku je zároveň jediná obrazovka potrebná na prezeranie jeho histórie.

### D. Zápis výkonu

Formulár/modal umožní:

- nastaviť dátum a čas (predvolene teraz),
- pridať jednu alebo viac sérií,
- pre každú sériu zadať váhu v kg a počet opakovaní,
- odstrániť omylom pridanú sériu,
- pridať voliteľný komentár k celému záznamu,
- uložiť alebo zrušiť zápis.

Validácia MVP:

- minimálne jedna platná séria,
- váha nesmie byť záporná; `0 kg` je platné pre cviky s vlastnou váhou,
- opakovania sú celé kladné číslo,
- prázdny komentár sa uloží ako `undefined`, nie ako medzery,
- neplatný formulár zrozumiteľne ukáže, čo treba opraviť.

### E. História a „naposledy cvičené“

- uloženie záznamu okamžite aktualizuje posledný dátum a posledný výkon cviku,
- po reštarte aplikácie záznamy zostanú zachované,
- používateľ môže záznam odstrániť až po potvrdení,
- po odstránení najnovšieho záznamu sa „naposledy“ prepočíta z ostávajúcej histórie.

## 4. Dátový model

Toto je kontrakt, nie hotová implementácia:

```ts
type Exercise = {
  id: string;
  name: string;
  primaryMuscle: string;
  equipment?: string;
  imageUrl?: string;
};

type WorkoutSet = {
  id: string;
  weightKg: number;
  reps: number;
};

type ExerciseLog = {
  id: string;
  exerciseId: Exercise["id"];
  performedAt: string; // ISO 8601
  sets: WorkoutSet[];
  comment?: string;
};

type UserExercise = {
  exerciseId: Exercise["id"];
  order: number;
  addedAt: string; // ISO 8601
};
```

Dôležité rozdelenie:

```text
Exercise (čo je bench press)
├── UserExercise (cvik je pridaný v mojom hube)
└── ExerciseLog (bench press v konkrétny deň)
    └── WorkoutSet (napr. 80 kg × 8)
```

`lastPerformedAt` nemusí byť uložený duplicitne. V MVP sa dá odvodiť z najnovšieho `ExerciseLog`; tým sa vyhneme nekonzistentným dátam.

`UserExercise` neobsahuje kópiu názvu ani obrázka. Cez `exerciseId` odkazuje na cvik v lokálnom katalógu. Odobratie `UserExercise` z hubu neodstráni žiadne `ExerciseLog`; po opätovnom pridaní cviku sa jeho história znovu zobrazí.

## 5. Offline katalóg cvikov

Katalóg cvikov a osobné logy majú odlišný životný cyklus:

- katalóg: kurátorovaný read-only JSON/TypeScript súbor so 100–200 cvikmi zabalený v aplikácii,
- používateľov hub: lokálne uložený zoznam `UserExercise`,
- logy: používateľove lokálne dáta uložené v zariadení,
- obrázky: iba vybrané optimalizované assets zabalené v aplikácii, aby fungovali bez internetu.

Ako jednorazový zdroj môžeme použiť [free-exercise-db](https://github.com/yuhonas/free-exercise-db), ale nebudeme pripájať jeho API ani načítavať celý dataset za behu. Z neho alebo podobného licenčne vhodného zdroja ručne či pomocným jednorazovým skriptom vyberieme iba hlavné cviky a prevedieme ich na náš interný formát.

Výber bude približne vyvážený medzi hlavné partie: hrudník, chrbát, ramená, biceps, triceps, nohy, core a full body. Duplicity, veľmi špecializované varianty a cviky vyžadujúce nezvyčajné vybavenie môžeme vynechať.

Výsledok:

- žiadne runtime API volania,
- žiadny účet, backend ani sync,
- katalóg funguje okamžite offline,
- osobné logy sa ukladajú oddelene a nikdy nemenia definíciu cviku.

### Dataset spike — definition of done

- najprv vybraných 20–30 reprezentatívnych cvikov na overenie formátu,
- zdokumentovaná licencia a požadovaná atribúcia,
- prevedenie cudzieho formátu na náš `Exercise`,
- otestovaný lokálny obrázok a chýbajúci obrázok,
- po overení rozšírenie na približne 100–200 hlavných cvikov,
- kontrola veľkosti aplikácie po pridaní optimalizovaných obrázkov.

## 6. Nefunkčné požiadavky

- Android a iOS cez Expo; web je iba príjemný bonus.
- TypeScript `strict` bez `any` v aplikačnom kóde.
- Základné logovanie funguje offline.
- Bežné pridanie série má byť pohodlné bez horizontálneho scrollovania.
- Vstupy majú primeranú klávesnicu (`decimal-pad` pre váhu, `number-pad` pre opakovania).
- Tlačidlá a dotykové plochy majú byť dostatočne veľké pre použitie v pohybe.
- Light a dark theme používajú spoločné design tokeny.
- Osobné dáta neopúšťajú zariadenie, kým vedome nepridáme sync/export.

## 7. Mimo MVP

- login, profil a cloud sync,
- sociálna sieť, leaderboardy a zdieľanie,
- automatické tréningové plány alebo AI coaching,
- kalórie, strava a meranie tela,
- timer prestávok,
- grafy, osobné rekordy a 1RM výpočty,
- Apple Health / Health Connect,
- vlastné cviky, supersety a celé workout templates,
- video prehrávač,
- online API katalógu a jeho synchronizácia.

Tieto položky patria do backlogu až po použiteľnom workout logu.

## 8. Acceptance scenár MVP

1. Spustím aplikáciu bez internetu a vidím prázdny osobný hub.
2. Stlačím „Pridať cvik“, v offline katalógu vyhľadám „Bench Press“ a pridám ho.
3. Bench Press sa zobrazí v hube so stavom „Ešte necvičené“.
4. Otvorím jeho detail a pridám série `60 × 10`, `70 × 8`, `70 × 7` a komentár.
5. Uložím záznam a ten sa okamžite zobrazí v histórii pod detailom cviku.
6. Vrátim sa do hubu a karta ukáže dnešný dátum a posledný výkon.
7. Aplikáciu úplne zavriem a znovu otvorím; cvik aj história zostanú zachované.
8. Odoberiem Bench Press z hubu a potvrdím akciu.
9. Znovu ho pridám z katalógu; pôvodná história sa opäť zobrazí.

## 9. Otvorené produktové rozhodnutia

- Chceme v MVP podporiť aj čas/sekundy, vzdialenosť a assisted weight, alebo iba kg + reps?
- Budú názvy cvikov v angličtine, slovenčine alebo oboch jazykoch?
- Má používateľ vedieť upraviť starý záznam, alebo v MVP stačí odstrániť a vytvoriť nový?
- Má byť zmena poradia cez drag-and-drop alebo jednoduchšie tlačidlá hore/dole?

Pevné rozhodnutie MVP: jeden `ExerciseLog` vždy patrí jednému cviku. Koncept celého tréningu s viacerými cvikmi zatiaľ nevytvárame.

