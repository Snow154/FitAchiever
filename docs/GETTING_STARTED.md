# FitAchiever — návrh prvého štartu

## Odporúčaný prvý vertical slice

Nezačneme databázou ani prípravou celého katalógu. Najprv postavíme najmenšiu cestu cez produkt s mock dátami:

```text
Home/hub: 2 pridané cviky + „Pridať cvik“
  → otvorenie offline katalógu
Katalóg: 6 mock cvikov
  → pridanie cviku do hubu
Hub: zobrazí nový cvik
  → klik na ExerciseCard
Detail cviku
  → klik na „Zapísať tréning“
Log modal: séria + váha + opakovania
  → uložiť do React state
Detail: zobrazí nový záznam v zozname histórie pod cvikom
```

Tým sa skoro ukáže, či je dátový model a ovládanie príjemné. Perzistenciu a lokálny katalóg 100–200 cvikov pridáme až na fungujúci tok. Aplikácia nebude na katalóg používať runtime API volania.

## Navrhnutá štruktúra

Aktuálny default Expo projekt používa `src` a file-based routing, preto navrhujem:

```text
src/
  app/
    _layout.tsx
    index.tsx
    exercises.tsx
    exercise/
      [exerciseId].tsx
      [exerciseId]/log.tsx
  components/
    exercise-card.tsx
    set-input-row.tsx
    ui/
  constants/
    theme.ts
  data/
    exercises.json
    mock-exercises.ts
  hooks/
    use-workout-logs.ts
  storage/
    workout-log-storage.ts
  types/
    exercise.ts
    user-exercise.ts
    workout-log.ts
  utils/
    workout-log.ts
docs/
```

Nevytváraj všetky súbory prvý deň. Priečinky pribudnú až s prvou konkrétnou zodpovednosťou.

## Pravidlo modularity

Route súbor, napríklad `src/app/index.tsx`, je skladateľ obrazovky. Má byť z neho rýchlo viditeľné, z akých častí sa obrazovka skladá:

```tsx
export default function HomeScreen() {
  return (
    <Screen>
      <HomeHeader />
      <UserExerciseList />
      <AddExerciseButton />
    </Screen>
  );
}
```

To je smer, nie požiadavka vytvoriť všetky tri komponenty hneď. Komponent oddeľujeme, keď:

- má jednu pomenovateľnú UI zodpovednosť,
- používa sa na viacerých miestach,
- má vlastné interakcie alebo lokálny stav,
- jeho JSX začína zakrývať hlavný tok obrazovky.

Komponent neoddeľujeme iba preto, že obsahuje niekoľko riadkov. Napríklad samotný názov a subtitle môžu pokojne zostať v route, kým z nich nevznikne skutočný `HomeHeader`.

### Typy a props

- Zdieľaný doménový typ patrí do `src/types`, napríklad `Exercise`, `UserExercise` a `ExerciseLog`.
- Props používané iba jedným komponentom patria priamo do súboru komponentu.
- Komponent dostane iba údaje a callbacky, ktoré potrebuje; nedostáva celý objekt alebo celý app state „pre istotu“.
- Presentational komponent nevie, ako sa dáta ukladajú. Napríklad `ExerciseCard` zavolá `onPress`, ale nerobí navigáciu ani zápis do storage sám.

Príklad stručných props:

```ts
type ExerciseCardProps = {
  name: string;
  muscle: string;
  lastPerformedAt?: string;
  onPress: () => void;
};
```

Takto zostane komponent znovupoužiteľný a jeho kontrakt sa dá pochopiť bez čítania celej aplikácie.

## UI smer podľa tvojich projektov

Pocketday už používa dobré stavebné prvky, ktoré sa oplatí zachovať:

- horizontálny padding `24`,
- rounded cards približne `16–18`,
- modal približne `24`,
- výrazný titulok a tlmený secondary text,
- samostatné theme colors pre light/dark,
- jedno primary tlačidlo a nenápadné secondary akcie.

Pre FitAchiever navrhujem pokojný tmavý fitness vizuál s energickým, ale nie neónovým accentom. Domovská karta môže mať:

```text
┌─────────────────────────────────────┐
│ [foto]  Barbell Bench Press         │
│         Chest · Barbell             │
│         Naposledy: 27. 9. · 70×8    │
└─────────────────────────────────────┘
```

Hub layout:

```text
FitAchiever                         ◐
Tvoj tréningový denník

[ + Pridať cvik                      ]

Naposledy cvičené
[ horizontálne 2–3 malé karty ]

Moje cviky
[ ExerciseCard                     ]
[ ExerciseCard                     ]
```

Vyhľadávanie a filtre patria na obrazovku katalógu, nie na hub. Na úplne prvý slice môže sekcia „Naposledy cvičené“ chýbať. Pribudne až vtedy, keď existujú logy.

## Prvé coding session — odporúčaný postup

### Krok 1: vytvor projekt

Použi aktuálny oficiálny Expo bootstrap s TypeScriptom. Expo dokumentácia odporúča:

```powershell
npx create-expo-app@latest .
```

Pred spustením skontroluj, že root obsahuje iba dokumentáciu, ktorú chce generátor zachovať. Ak CLI odmietne neprázdny priečinok, vytvor projekt do dočasného podpriečinka a presun naplánujeme vedome — nemaž dokumenty.

Oficiálne referencie:

- [Expo TypeScript guide](https://docs.expo.dev/guides/typescript/)
- [Start developing](https://docs.expo.dev/get-started/start-developing/)

### Krok 2: spusti default bez úprav

```powershell
npx expo start
```

Najprv potvrď, že default beží na telefóne. Až potom odstraňuj demo route; inak nebude jasné, či prípadná chyba pochádza zo setupu alebo z nášho kódu.

### Krok 3: prvá vlastná obrazovka

V `src/app/index.tsx` vytvor iba:

- `SafeAreaView`,
- názov FitAchiever,
- krátky subtitle,
- dočasný text „0 cvikov“.

Cieľ nie je dizajn, ale pochopiť route a prvý React component.

### Krok 4: prvý typ a mock dáta

Ako tvoje prvé zadanie navrhujem, aby si sám napísal:

1. `Exercise` a `UserExercise` typy podľa requirements,
2. pole šiestich katalógových cvikov,
3. pole dvoch pridaných cvikov obsahujúce iba ID a poradie,
4. výpis iba týchto dvoch cvikov v hub `FlatList`.

Zatiaľ bez obrázkov, filtrov, storage a modalu. Keď to bude fungovať, pošli kód/error a dostaneš review s vysvetlením.

## Prvý mini-checklist

- [ ] Expo default sa otvorí na telefóne.
- [ ] Vieš ukázať, ktorý súbor tvorí home route.
- [ ] `Exercise` nepoužíva `any`.
- [ ] `UserExercise` odkazuje na katalóg cez `exerciseId` a nekopíruje názov cviku.
- [ ] Mock pole spĺňa typ bez TypeScript errorov.
- [ ] `FlatList` má stabilný `keyExtractor` založený na ID.
- [ ] Každý cvik sa zobrazí práve raz.

## Čomu sa na začiatku vyhnúť

- nepridávať Redux/Zustand iba „pre istotu“,
- nerobiť Supabase ani login,
- nepripájať live exercise API; finálny katalóg bude zabalený lokálne,
- nezačať komplexnými animáciami,
- neukladať odvodené `lastWorkout` na viacerých miestach,
- nevytvoriť jeden obrovský `index.tsx` so všetkou logikou.

