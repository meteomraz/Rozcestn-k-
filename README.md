# Martin Apps Hub

Jednoduchý statický rozcestník pro všechny aplikace na GitHub Pages.

## Co obsahuje

- moderní welcome stránku,
- karty aplikací se screenshotem/náhledem,
- vyhledávání,
- filtrování podle kategorií,
- tlačítko **Otevřít**,
- tlačítko **GitHub**,
- jednoduché přidávání dalších aplikací přes `apps.js`.

## Jak přidat další aplikaci

V souboru `apps.js` zkopíruj jeden blok v poli `apps` a uprav hodnoty:

```js
{
  name: "Název aplikace",
  description: "Krátký popis aplikace.",
  url: "https://TVUJ-GITHUB.github.io/nazev-repozitare/",
  githubUrl: "https://github.com/TVUJ-GITHUB/nazev-repozitare",
  image: "images/nazev-aplikace.jpg",
  icon: "🚀",
  category: "Kategorie",
  tags: ["tag1", "tag2"],
  updated: "2026-06-06",
  favorite: false
}
```

## Jak přidat obrázek stránky

1. Otevři svoji aplikaci v prohlížeči.
2. Udělej screenshot horní části stránky.
3. Ulož ho do složky `images/`, například:

```text
images/nutrition-coach.jpg
```

4. V `apps.js` nastav:

```js
image: "images/nutrition-coach.jpg"
```

Doporučený poměr obrázku je **16:9**, například 1280 × 720 px.

## Jak spustit na GitHub Pages

1. Nahraj soubory do nového GitHub repozitáře.
2. Otevři **Settings**.
3. Jdi na **Pages**.
4. V části **Build and deployment** vyber:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Ulož.
6. GitHub vytvoří adresu ve tvaru:

```text
https://TVUJ-GITHUB.github.io/NAZEV-REPOZITARE/
```

## Důležité

V ukázce jsou použité placeholder náhledy. Nahraď je vlastními screenshoty svých aplikací.
