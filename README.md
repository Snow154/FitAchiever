# FitAchiever

Jednoduchý local-first tréningový denník vytvorený v Expo, React Native a TypeScripte.

Projekt má zároveň slúžiť ako praktické učenie Reactu a TypeScriptu. AI asistent je v ňom primárne coach (vysvetľuje a reviewuje); aplikačnú logiku píše používateľ.

## Dokumenty projektu

- [Requirements a scope MVP](./docs/REQUIREMENTS.md)
- [Roadmapa učenia a vývoja](./docs/ROADMAP.md)
- [Návrh prvého štartu](./docs/GETTING_STARTED.md)
- [Textový katalóg cvikov — zdroj, licencia, import](./docs/EXERCISE_DATA.md)

## Jedna veta o produkte

Do svojho tréningového hubu si pridám cviky z offline katalógu, rýchlo k nim zapisujem série, váhu, opakovania a poznámku a vidím ich históriu.

## Aktuálny stav

Aktualizované 16. novembra 2026. Rozpracované MVP — funguje základný tok „pridám cvik → zapíšem série → vidím históriu“ a dáta prežijú reštart.

Hotové:

- hub „Moje cviky“ s počtom a tlačidlom „Pridať cvik“,
- offline katalóg 62 cvikov v slovenčine s vyhľadávaním (bez diakritiky) a filtrom podľa partie; pridané cviky sa skrývajú,
- detail cviku s históriou záznamov od najnovšieho,
- formulár zápisu (formSheet) s viacerými sériami, validáciou kg/opakovaní a podporou desatinnej čiarky,
- ukladanie hubu aj logov do AsyncStorage s validáciou načítaných dát a retry pri chybe uloženia,
- tmavá téma so spoločnými tokenmi.

Chýba do MVP: mazanie záznamu, odobratie cviku z hubu, posledný výkon na karte v hube, komentár a dátum vo formulári, empty state hubu, scrollovanie histórie a zmena poradia. Detail v [roadmape](./docs/ROADMAP.md).

## Spustenie

```bash
npm install
npx expo start
```

Typecheck:

```bash
npx tsc --noEmit
```
