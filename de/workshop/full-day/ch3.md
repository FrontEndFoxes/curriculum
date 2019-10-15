# 📋 Kapitel 3: Anbindung einer API

| **Ziel**                   | Lerne wie API-Aufrufe funktionieren und wie sie in einer Webapp genutzt werden können.                                                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Was du lernen wirst**    | Verwendung der [DogCEO API](https://dog.ceo/dog-api/) zum dynamischen Laden von Hundebildern anstelle von Dummy-Daten.                                                                                                                                                                                 |
| **Was du dafür benötigst** | Einen modernen Browser, z.B. Google Chrome. Einen Account bei CodeSandbox.io. Falls du nicht mehr weißt, wo du warst, kannst du die Basis für dieses Kapitel von [hier](https://github.com/VueVixens/projects/tree/master/chapter-2-end) importieren. Wie das geht, steht im [Anhang 1](appendix_1.md) |
| **Dauer**                  | 1 Stunde                                                                                                                                                                                                                                                                                               |

## Anleitung

Falls du das Projekt von vorn beginnen musst, klone [dieses Projekt](https://github.com/VueVixens/projects/tree/master/chapter-1-end) in Code Sandbox, nachdem du dich eingeloggt hast. Dafür klickst du auf den Link **Import form Github** unten links auf der Hauptseite und fügst die URL des Repositories in das Feld. Du kannst ebenfalls mit dem Projekt fortfahren, dass du in [Kapitel 2](ch2.md) erstellt hast.

Bisher haben wir Hundebilder über eine statische JSON-Datei, die wir in eine Komponente importiert haben, angezeigt. Für Demozwecke ist das sehr nützlich. In produktiven Anwendungen werden meistens Echtdaten genutzt, die entweder von internen Datenquellen oder einer API geliefert werden. Wir werden eine externe API dafür nutzen.

Um eine API anzufragen, benötigen wir eine weitere Bibliothek namens [axios](https://github.com/axios/axios). Axios arbeitet mit Promises (=Versprechen) und funktioniert sowohl im Browser als auch in Node.js-Umgebungen.

::: tip 💡
Zu Beginn hat Vue einen eigenen Weg für API-Aufrufe mit .ajax genutzt. Dies wurde jedoch verworfen, da die Axios-Bibliothek sehr gut funktioniert und als zusätzliches Paket geladen werden kann, sofern es gebraucht wird. Mehr Informationen zu dieser Veränderung kannst du [hier](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4) nachlesen.
:::

## Axios hinzufügen

Zuerst musst du Axios den Projekt-Abhängigkeiten hinzufügen. Dafür klicke in Coe Sandbox auf den Reiter `Explorer` -> `Dependencies` -> `Add Dependency` und suche nach `axios`. Wenn du es installiert hast, wirst du sehen, dass es zu deiner `package.json` hinzugefügt wurde.

Importiere Axios in der Komponenten, in der der API-Aufruf gemacht werden soll - `views/Pets.vue`. Kopiere folgende Zeile in den `<script>`-Block dieser Komponente:

```js
import axios from "axios";
```

Alle Aufrufe werde die gleiche Basis-URL mit verschiedenen Endpunkten nutzen. Konfiguriere direkt unter allen Imports, dem Axios-Import und möglichen anderen, die Basis-URL:

```js
axios.defaults.baseURL = "https://dog.ceo/api";
```

Mit dieser Zeile haben wir Axios so konfiguriert, dass jeder API-Aufruf mit der URL `https://dog.ceo/api` beginnen wird. Jetzt können wir den ersten API-Aufruf machen.

## API aufrufen

Wir ersetzen das erste statische Bild mit einem zufälligen Husky-Bild von der Dog CEO API. Zuerst müssen wir den Endpunkt dafür herausfinden. Wir müssen `/breed/husky/images/random` als Endpunkt hinzufügen, das steht in der [Dokumentation](https://dog.ceo/dog-api/) der API (der `api` Teil ist bereits in der Base-URL, die wir durch das Setzen von `axios.defaults.baseURL` konfigurierten).

Wir möchten das alte Bild durch ein neues ersetzen, wenn die Komponente geladen wird. Dafür implementieren wir einen `created()`-Anker (=hook) direkt nach `data()`.

```js
created() {}
```

::: tip 💡
Beachte, dass du nach dem `data`-Objekt ein Komma setzen musst, bevor du den `created()`-Hook hinzufügst.
:::

::: tip 💡
Das ist der erste Hook unserer App! Hooks sind sehr nützlich, wenn du bestimmte Code-Blöcke besser kontrollieren musst. Mehr Informationen zu Hooks kannst du [hier](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) finden.
:::

In dem neuen Hook werden wir nun die API aufrufen. Für eine GET-Anfrage (=request) muss `axios.get` genutzt werden. Das Ergebnis wird ein JavaScript-Promise sein (=Versprechen), in dem wir Maßnahmen (=callbacks) für einen erfolgreichen (=success) oder fehlerhaften (=failure) Aufruf implementieren müssen. Für den Moment geben wir das Ergebnis in der Konsole aus. Kopiere den folgenden Code, ein Axios Cide Snippet, zwischen die geschweiften Klammern von `created(){}`:

```js
axios
  .get("/breed/husky/images/random")
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```

Sieh dir in der Browseransicht von Code Sandbox die Seite an und wechsel auf die Pets-Seite. In der Konsole solltest du eine Ausgabe sehen. Untersuche das Objekt indem du auf den kleinen Pfeil an der linken Seite klickst. Suche das `data`-Feld. Hier siehst du (hoffentlich) den Status `success` und eine Nachricht (=message) mit einer URL zu einem Bild. Du kannst dir diese URL kopieren und in einem neuen Browserfenster aufrufen, es sollte dir ein Bild von einem Husky anzeigen.

## Die API nutzen 1 - Statischen Inhalt ersetzen

Wir wollen das Husky-Bild durch ein neues ersetzen. Zuerst müssen wir in der Liste der Hunde einen Husky finden. Dafür nutzen wir die `Array.find`-Methode. Es durchsucht die `dogs`-Liste, die wir bereits von `data/dogs.js` in die Komponente laden, bis es ein Element findet, dass die angegebene Bedingung erfüllt. In unserem Fall soll die Art (`breed`) dem Wert `husky` entsprechen. Ersetze die Zeile mit `console.log()` im `then`-Abschnitt des Axios-Aufrufs mit diesen Zeilen:

```js
const husky = this.dogs.find(dog => dog.breed === "husky");
console.log(husky);
```

Ok. Wir haben einen Husky gefunden. Das erkennst du in der Ausgabe in der Konsole. Du siehst diesen Hund auch auf der Pets-Seite, er heißt 'Max'. Jetzt wollen wir ihm das neue Bild von der API zuweisen. Füge diese Zeile unter die letzten zwei Zeilen ein:

```js
husky.img = response.data.message;
```

Du solltest jetzt sehen, wie sich das Bild von 'Max' ändert.

## Die API nutzen 2 - Zufällige Bilder anzeigen

Jetzt wollen wir allen Hunden in der Liste ein Bild von der API zuweisen. Als erstes benötigen wir wieder den korrekten Endpunkt für jede Hundeart. Erinnerst du dich, wie wir den Endpunkt `/breed/husky/images/random` für die Art `husky` aufgerufen haben? Lass' uns eine Liste von Links erstellen, in dem jeder Link spezifisch für eine Art ist. Wir werden eine Liste mit allen Endpunkten für alle Arten erstellen. Dafür nutzen wie die`map`-Methode.

::: tip 💡
Die `map()`-Methode erzeugt eine neue Liste. Die Elemente dieser Liste entstehen aus den Elementen der ersten Liste, die durch eine Funktion verändert werden.
:::

Überschreibe den Code in `created()`...`.then`, um die neue Liste zu bestimmen:

```js
const linksArray = this.dogs.map(
  dog => "/breed/" + dog.breed + "/images/random"
);
```

Wir nehmen die Art von jedem Hund in der Liste und fügen sie in den Endpunkt ein. (Zuvor haben wir den gleichen Endpunkt genutzt, nur mit `husky`, statt dem wechselnden Wert der Hundeart.)

Jetzt müssen wir die API für jeden Endpunkt der neuen Liste anfragen. Axios hat dafür Hilfsfunktionen namens `axios.all` und `axios.spread`. Der ersten übergeben wir die Liste mit den API-Anfragen und es gibt uns eine Liste mit den Antworten von der API zurück. Diese Liste teilen wir mit `axios.spread` auf, um die neuen Bilder den Hunden zuzuweisen.
Um alle API-Anfragen der Liste abzuarbeiten, nutzen wir wieder die `map`-Methode und werden mit jedem Wert der Liste einen API-Aufruf `axios.get` machen.
Kopiere den folgenden Code (Zeilen 5-12) dafür direkt unter die Definition des `linksArray`s.

```js {5-12}
created() {
  const linksArray = this.dogs.map(
        dog => "/breed/" + dog.breed + "/images/random"
      );
  axios.all(linksArray.map(link => axios.get(link)))
   .then(
     axios.spread((...res) => {
       this.dogs.forEach((dog, index) => {
         dog.img = res[index].data.message;
       });
     })
   );
  }
```

::: tip 💡
Was passiert hier? Die `forEach()`-Methode wendet eine Funktion auf jedes Element in der Liste an. Sie iteriert über die statische Liste unserer Hunde und ersetzt das fest definierte Bild durch das zufällige Bild von der API. Das passiert nachdem wir alle Bilder von der API bekommen haben.
:::

Jetzt werden bei jedem Aufruf der `Pets`-Komponente neue Bilder geladen. (Das kannst du sehen, in dem du die Seite aktualisierst oder zwischen der `pets` und der `home`-Seite hin und her wechselst.) Die Namen und Arten der Hunde werden immer noch von den statischen Daten aus `dogs.json` genommen, deshalb verändern sich diese nicht.

Ein Problem gibt es noch: Wenn wir die Seite aufrufen, sehen wir für einen kurzen Moment noch die alten Bilder. Dafür setzen wir alle Bilder zurück bevor wir die API nach neuen Bildern fragen.
Kopiere diesen Teil an die erste Stelle in den `created()`-Hook:

```js
this.dogs.forEach(dog => {
  dog.img = "";
});
```

**Jetzt sehen wir zunächst keine Bilder bevor die neuen Bilder von der API geladen werden. Es geht voran!**

# Ergebnise

![chapter 3 result](./images/petshop_chapter3.jpg)
