# 📋 Kapitel 1: Die My Pet Shop Web App

| **Ziel**            | Lerne Vue.js kennen mit einer statischen Webanwendung                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Was du lernen wirst**       | Setup einer Vue.js App, Styling in Vue, Struktur und Aufbau des Quellcodes.              |
| **Was du dafür benötigst**       | Einen modernen Browser, z.B. Google Chrome. Einen Account bei CodeSandbox.io. |
| **Dauer** | 1/2 Stunde                                                                                                          |

## Anleitung

Da dies dein allererstes Vue.js Webprojekt ist, werden wir mit einem ganz neuen Projekt in [Code Sandbox](http://codesandbox.io) beginnen.
Erstelle dir einen Account bei Code Sandbox und erstelle ein Vue.js Startertemplate [hier](https://codesandbox.io/s/vue).

Wir werden die Webseite für einen fiktiven Pet Shop bauen. Das sieht dann so aus:

![pet store](./images/petshop_chapter1_1.jpg)

Zusätzlich fügen für einen Schalter hinzu, der das Aussehen ändern kann. In etwa so:

![pet store](./images/petshop_chapter1_2.jpg)

Schau dir den Quellcode an, den Code Sandbox für eine Vue.js App generiert hat. Die erste Datei, die du siehst, ist `main.js`.
Diese ist der Startpunkt einer Vue.js App. Hier importierst du Vue aus dem npm-Paket: `import Vue from "vue";`. Code Sandbox importiert alle notwendigen Abhängigkeiten aus npm, um die App zu erzeugen. Die Abhängigkeiten sind alle in der `package.json`aufgelistet, wenn du sie dir ansehen möchtest.

`main.js` initialisiert die App als neue Vue.js App und benennt das `div`, in welches der App-Code eingesetzt wird, das `div` mit der ID `app`. Hier wird auch definiert, welche Komponente als Startpunkt benutzt wird, in diesem Fall `App`:

```js
new Vue({
  render: h => h(App)
}).$mount("#app");
```

Öffne `App.vue`. In dieser Datei wird die `home`-Komponente gebaut. Sie beinhaltet die drei Hauptbestandteile einer Vue.js "Single File Component (SFC)": ein `<template>` Block, ein `<script>` Block und ein `<style>` Block.
(Wortwörtlich übersetzt bedeutet "Single File Component" "Ein-Datei-Komponente", d.h. alle notwendigen Bestandteile, um diese Komponente zu bauen, befinden sich in einer Datei.)

Beachte: Das erste `div` im Template-Block hat die ID `app` - hier wird der App-Code von Vue eingesetzt. Es gibt außerdem die `<HelloWorld>`-Komponente, die unter dem Logo-Bild eingebunden wird. Dies ist ein Beispiel dafür, wie eine SFC in `App.vue` eingebunden wird.

Öffne `components/HelloWorld.vue`. Hier ist der Quellcode der Linkliste, die in `App.vue` angezeigt wird. In dieser Datei gibt es außerdem einen Script-Block mit einer `msg`-Variable und einige Styles in einem `<style>`-Block.

Wir werden diese Beispielapp nun nach und nach verändern, um unseren Pet Shop zu bauen. Los geht's!

## Erzeuge die Styles

Da wir in der `main.js` keine Änderungen vornehmen müssen, beginnen wir in `App.vue`. Kopiere den folgenden Style-Block an das Ende der Datei, ersetze den aktuellen `<style>`-Block:

```scss
	<style lang="scss">
	@import url("https://fonts.googleapis.com/css?family=Roboto");

	/*brown and mint*/
	/*dark brown 32292F
	light mint 99E1D9
	bisque F0F7F4
	dark mint 70ABAF
	light brown 705D56*/

	*,
	*:before,
	*:after {
	  box-sizing: border-box;
	}

	body {
	  margin: 0;
	  padding: 0;
	}

	main {
	  padding: 40px;
	  font-family: "Roboto", "sans-serif";
	  background: #fff top center repeat;
	  color: #444;
	  background-image: url("https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/bg.jpg");
	}

	h1,
	p {
	  margin: 0 0 1em 0;
	}

	img {
	  max-width: 100%;
	  display: block;
	  margin: 0 auto;
	}

	.app-container {
	  max-width: 940px;
	  margin: 0 auto;
	  background-color: #fff;
	}

	.app-container > * {
	  border-radius: 5px;
	  font-size: 150%;
	  margin-bottom: 10px;
	}

	.wrapper {
	  display: grid;
	  grid-gap: 10px;
	  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	  grid-auto-rows: minmax(150px, auto);
	}

	.wrapper > * {
	  padding: 15px;
	  border-radius: 5px;
	}

	.light-mint {
	  background-color: #99e1d9;
	}

	.dark-mint {
	  background-color: #70abaf;
	}

	.light-brown {
	  background-color: #705d56;
	  color: #f0f7f4;
	}

	.dark-brown {
	  background-color: #32292f;
	  color: #f0f7f4;
	}

	.bisque {
	  background-color: #f0f7f4;
	}

	/*orange and green*/
	/*
	dark orange 771100
	orange CC6633
	light orange FF9900
	dark green 689980
	light green 86a193
	*/

	.orange-green {
	  background-image: url("https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/bg2.jpg");
	  .light-mint {
	    background-color: #86a193;
	  }

	  .dark-mint {
	    background-color: #689980;
	  }

	  .light-brown {
	    background-color: #cc6633;
	  }

	  .dark-brown {
	    background-color: #771100;
	  }

	  .bisque {
	    background-color: #ff9900;
	  }
	}

	.panel {
	  /* needed for the flex layout*/
	  margin-left: 5px;
	  margin-right: 5px;
	  flex: 1 1 200px;
	}

	.tall-panel {
	  grid-row-end: span 2;
	}

	.app-header,
	.app-footer {
	  flex: 0 1 100%;
	  padding: 15px;
	  text-align: center;
	}

	/* We need to set the margin used on flex items to 0 as we have gaps in grid.  */
	@supports (display: grid) {
	  .wrapper > * {
	    margin: 0;
	  }
	}
	</style>
```

::: tip 💡
Bachte, dass wir in dem `<style>` Block nicht das Attribut `scoped` setzen. Das `scoped`-Schlüsselwort hat zur Folge, dass die Styles in dem `<style>` Block nur für die aktuelle SFC angewendet werden. Da wir die Styles aberr für die gesamte App nutzen wollen, lassen wir 'scoped' an dieser Stelle weg.
Wir haben allerdings angegeben, dass wir Sass benutzen, indem wir `lang="scss"` hinzugefügt haben. Es ist eine Methode, CSS einfacher zu benutzen. Mehr über Scss/Sass kannst du [hier](http://www.sass-lang.com) nachlesen.
:::

In diesem Style-Block finden sich einige unerwartete Anweisungen:

- Es wird ein Pfad zu einem extern gehosteten Bild auf Github genutzt, anstelle eines relativen Pfades. Das liegt daran, dass Code Sandbox keine Bilder hostet; normalerweise würde man das Bild über einen relativen Pfad wie `/images/myImage.png` hinzufügen.
- Es gibt einige Anweisungen die 'grid' benutzen. Wir werden die App mit Hilfe von CSS Grid bauen, eine moderne Art, um flexible und responsive Layout mit aufeinander folgenden "Inhaltsblöcken" wie dieses zu bauen. Mehr über CSS Grid kannst du [hier](https://css-tricks.com/snippets/css/complete-guide-grid/) nachlesen.
- Es gibt zwei Styles!? Es gibt zwei verschiedene Styles, eines in grün und eines in orange. Das werden wir gleich benutzen.

Die Styles hinzuzufügen hat unsere App nicht viel verändert. Die `<li>`-Liste sieht jetzt merkwürdig aus. Lass uns das Template angehen!

## Vuetify installieren

Bevor wir das Template bearbeiten, installieren wir Vuetify. Vuetify ist eine Bibliothek, die unsere Vue Apps im Material Design styled. In diesem Kapitel werden wir Vuetify nur für einen Schalter benutzen. In den folgenden Kapiteln werden wir Vuetify noch für weitere Komponenten nutzen.


::: tip 💡
Vuetify ist eine Komponentenbibliothek für Vue. Vuetify liefert sauber implementierte, semantische und wiederverwendbare Komponenten, um eine App zu bauen. Die Standard Anleitung und Dokumentation für Vuetify findest du [hier](https://vuetifyjs.com/en/getting-started/quick-start)
:::

Installiere Vuetify indem du auf den `Add Dependency`-Button in dem Dependency Dropdown auf der linken Seite in Code Sandbox klickst (eventuell musst du hinunter scrollen!). Suche nach 'Vuetify' und installiere es.

Überprüfe, ob die neue Abhängigkeit installiert wurde. Öffne die Datei `package.json` und suche Vuetify unter `dependencies`. Es sollte so aussehen:

```json
"dependencies": {
  "vue": "^2.5.22",
  "vuetify": "^2.0.19"
},
```

Als nächstes müssen wir Vuetify unserer Vue-App hinzufügen. Erstelle dazu einen `plugins` Ordner im `src` Verzeichnis. In dem neu erstellten Verzeichnis unter `src/plugins` erstellst du nun eine neue Datei `vuetify.js`. Kopiere den untenstehenden Code in die Datei.

```js
// src/plugins/vuetify.js
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

export default new Vuetify();
```

Diese Datei ist die Initialisierer-Datei für das Vuetify Plugin. Was in diesen Codezeilen eigentlich passiert, ist, dass wir Vue, Vuetify und das default Styling von Vuetify importieren. Dadurch, dass wir `Vue.use(Vuetify);` aufrufen, lassen wir Vue wissen, dass es das Vuetify Plugin auch benutzen soll, dass wir vorher importieten. Mit der Zeile `export default new Vuetify();` exportieren wir eine Instanz von Vuetify.

In dieser Initialisierer-Datei wirst du Vuetify Themes, Komponenten und CSS importieren können und musst in deinem `main.js` nur 2 Zeilen dafür einfügen. Mithilfe dieser Datei kann die Konfiguration von Vuetify in einer Datei fü das ganze Projekt gesetzt werden.

Öffne deine `main.js` Datei und füge diesen Code auf der 3. Zeile hinzu:
```js
import vuetify from "@/plugins/vuetify";
```
Jetzt solltest du 3 `import` Befehle in deiner `main.js` Datei haben, die so aussehen:
```js
import Vue from 'vue';
import App from './App';
import vuetify from "@/plugins/vuetify";
```
Als nächstes suchst du in `main.js` nach diesem Codeblock:
```js
new Vue({
  render: h => h(App)
}).$mount("#app");
```

Füge hier nach `new Vue({` eine neue Zeile ein und setze hier die vorhin importierte Variable `vuetify` ein, direkt vor der `render` Funktion. Du musst die `vuetify` Variable hier importieren, damit all die Designs von deiner Vuetify Plugin Datei hier importiert werden. Dein Codeblock um Vue zu initialisieren sollte nun so aussehen:
```js
new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
```

Um sicherzustellen, dass die Themes und Komponenten von Vuetify überall in der Vue-App verfügbar sind, importieren wir auch die Styles (CSS) von Vuetify.

Mit den Material Icons können wir einheitliche und hübsche Icons in der Vue-App benutzen. Diese müssen wir in der `index.html` hinzufügen. Öffne die `public/index.html` und kopiere Folgendes an das Ende des `<head></head>` Tags:

```html
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
```

Überschreibe den aktuellen `<template>` Block in der `App.vue` mit diesem Code:

```html
<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header dark-brown">
          <h1>My Pet Store</h1>
        </header>
        <div class="wrapper">
          <div class="panel tall-panel light-mint">
              <h2>Pet Products</h2>
              <p>Premium Puppy Chow</p>
              <p>Kibble, sale in bulk, $20/lb</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/food.png"/>
          </div>
          <div class="panel bisque">
              <h2>Donate</h2>
          </div>
          <div class="panel tall-panel light-brown">
              <h2>Adoptable Pets</h2>
              <p>Fisher, Chihuahua, age 3</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/chihuahua.jpg"/>
          </div>

          <div class="panel bisque">
              <h2>Contact Us</h2>
          </div>
          <div class="panel tall-panel dark-mint">
              <h2>Pet of the Month</h2>
              <p>Meet Stanley, A young French Bulldog</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/bulldog.jpg"/>
          </div>
          <div class="panel tall-panel light-mint">
              <h2>Success Stories</h2>
              <p>Bennie found his forever home!</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/collie.jpg"/>
          </div>

          <div class="panel bisque">
              <h2>Special Events</h2>
          </div>

          <div class="panel bisque">
              <h2>Learn About Pet Ownership</h2>
          </div>
        </div>
        <footer class="app-footer dark-brown">
          <p>123 Main Street | Smithfield, RI 90987 | 345-456-5678</p>
        </footer>
      </div>
    </main>
  </v-app>
</template>
```

Wow, das hat viel geändert! Wir haben einen Shop!

::: tip 💡
Bachte die Verwendung von `<v-app>` -  dieser Tag wird von Vuetify benötigt, damit alle Komponenten korrekt angezeigt werden können. Ein `<v-app>`-Tag ist ein sicheres Zeichen dafür, dass Vuetify in der App genutzt wird.
:::

Nun werden wir endlich Vuetify benutzen und einen Schalter einbauen. Über diese Schalter verändern wir das Aussehen unseres Shops und können zwischen dem Orangenen und Grünen Theme wechseln.

- In den Styles siehst du die `orange-green` Klasse. Füge diese dem `<main>`-Element in dem `<template>` Block der `App.vue` hinzu und sieh dir an, wie alle Farben und der Hintergrund verändert werden:
  ```html
  <main class="orange-green">
  ```

- Jetzt werden wir diese Klasse mit Hilfe der sogenannten Vue class bindings. Dafür können die `v-bind` Direktive oder den Shortcut `:` benutzen. Ersetze die einfache Klasse (class) in `<main>` mit dem dynamischen class binding.

```html
<main :class="{'orange-green': false}">
```

Tausche das `false` mit `true`; du siehst, dass die Klasse angewendet wird, an der Farbe oder wenn du dir das HTML in den Chrome DevTools ansiehst.

- Jetzt wird's spannend! Es ist Zeit deine erste Vue-Variable zu deklarieren. Zuerst musst du `data()` in deiner Vue-Komponente hinzufügen. `data()` ist eine Funktion, die ein Objekt liefert, welches aus deinen Variablen besteht. Überschreibe den aktuellen Skript-Block mit folgendem Code, um die data-Funktion zu definieren:

```js
<script>
export default {
  name: "App",
  data() {
    return {
      themeSwitched: false
    };
  }
};
</script>
```

::: tip 💡
Jeztt kannst du die HelloWorld.vue-Komponenten aus dem `components`-Ordner löschen, da wir sie nicht mehr benötigen.
:::

Jetzt hast du eine Variable namens `themeSwitched`(=Theme gewechselt) mit dem Standardwert `false`.

- Ersetze im `<main>`-Tag das class binding mit der neu erstellten Variable:

```html
<main :class="{'orange-green': themeSwitched}">
```

- Ändere den Wert von `themeSwitched` in `data` von `false` auf `true`. Du siehst wieder wie sich die Farbe im Pet Shop ändert.
- Jetzt brauchen wir den Schalter, um die Farbe zu wechseln. Zuerst werden wir einen Button einbauen. Da wir Vuetify nutzen, wird dies eine Vuetify Button-Komponente. Wir erstellen einen Vuetify Button mit dem Text 'Switch theme' mit: `<v-btn>Switch theme</v-btn>`. Setze den Button direkt in den `header` nach dem `h1`-Tag.

```html
<header class="app-header dark-brown">
    <h1>My Pet Store</h1>
    <v-btn>Switch theme</v-btn>
</header>
```

- Jetzt benötigt der Button einen Klick-Event-Handler. Dafür nutzen wir entweder die `v-on` Direktive oder den Shortcut `@`. Dieser Handler wird den Wert von `themeSwitched` und damit die Klasse für den Farbwechsel ändern.

  ```html
  <v-btn @click="themeSwitched = !themeSwitched">Switch theme</v-btn>
  ```

Klicke auf den Button und teste deine Änderungen. Sieht gut aus, oder?

**Herzlichen Glückwunsch! Du hast gerade das Kapitel 1 abgeschlossen!**

# Ergebnis

![final result chapter 1](./images/petshop_chapter1_1.jpg)
