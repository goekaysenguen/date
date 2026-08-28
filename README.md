# Süße Date-Einladung für GitHub Pages 💕

Diese Seite fragt nach einem Date am **5. September 2026 um 17:00 Uhr** und bietet:

- Ja 💖
- Nein 🌷
- Andere Uhrzeit 🕰️
- Benachrichtigung per E-Mail über Formspree

## 1. Benachrichtigung aktivieren

Da GitHub Pages nur statische Webseiten hostet, kann die Seite selbst keine E-Mails verschicken.
Am einfachsten funktioniert das mit Formspree.

1. Öffne https://formspree.io/
2. Erstelle einen kostenlosen Account.
3. Erstelle ein neues Formular.
4. Kopiere deinen Endpunkt, z. B.:

   https://formspree.io/f/abcdwxyz

5. Öffne `script.js`.
6. Ersetze:

   const FORM_ENDPOINT = "DEIN_FORMSPREE_ENDPOINT";

   durch:

   const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";

Danach bekommst du die Antworten an die E-Mail-Adresse, die du bei Formspree hinterlegt hast.

## 2. Auf GitHub Pages veröffentlichen

1. Erstelle auf GitHub ein neues Repository, z. B. `date-einladung`.
2. Lade `index.html`, `style.css` und `script.js` hoch.
3. Öffne im Repository:
   `Settings` → `Pages`
4. Unter **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Speichern.

Nach kurzer Zeit erscheint deine öffentliche GitHub-Pages-Adresse.

## Datenschutz

Die Seite fragt keinen Namen ab und sendet nur:
- Antwort
- ggf. gewünschte Uhrzeit
- die Bezeichnung der Einladung

Wenn du möchtest, kannst du in Formspree zusätzlich Spam-Schutz aktivieren.


## Passwort ändern

Die Seite fragt jetzt zuerst nach einem Passwort.

Öffne `script.js` und ändere:

```js
const PAGE_PASSWORD = "liebe";
```

zum Beispiel zu:

```js
const PAGE_PASSWORD = "unserGeheimnis2026";
```

Hinweis: Da GitHub Pages eine statische Webseite ist, ist dieser Passwortschutz kein echter serverseitiger Login.
Er schützt gut vor zufälligen Besuchern, aber technisch versierte Personen könnten das Passwort im Quellcode finden.
