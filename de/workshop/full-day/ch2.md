# 📋 Kapitel 2: Baue eine Haustier-Galerie

| **Ziel**           | Lerne wie du Daten in der Webanwendung verändern kannst                                                                                                                                                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Was du lernen wirst** | Verwendung von statischen Daten. Du baust eine Oberfläche aus Kacheln, die Adoptivhunde anzeigt                                                                                                                                                                                                                                             |
| **Was du dafür benötigst** | Einen modernern Browser, z.B. Google Chrome. Wenn du Chrome verwendest, installiere die Chrome DevTools für Vue.js. Ein Account bei CodeSandbox.io. Falls du nicht mehr weißt, wo du warst, kannst du die Basis für dieses Kapitel von [hier](https://github.com/VueVixens/projects/tree/master/chapter-1-end) importieren. Wie das geht, steht im [Anhang 1](appendix_1.md) |
| **Dauer**     | 1 Stunde                                                                                                                                                                                                                                                                                                                   |

## Anleitung

Falls du das Projekt von vorn beginnen musst, clone [dieses Projekt](https://github.com/VueVixens/projects/tree/master/chapter-1-end) in Code Sandbox nachdem du dich eingeloggt hast.

Aktuell hat unser Pet Shop nur eine Homepage. Wir möchten eine weitere Seite hinzufügen, auf der in mehreren Kacheln Haustiere angezeigt werden können. Wir erstellen eine Single-Page Anwendung mit einer Navigation und zwei Navigationspunkten: "home" und "pets" (=Haustiere). Wenn man auf "pets" klickt, wird die neue Seite angezeigt, die wir jetzt erstellen.

::: tip 💡
"A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server" ([Wikipedia](https://en.wikipedia.org/wiki/Single-page_application))
:::

Um eine SPA mit Vue zu bauen, benötigen wir den [vue-router](https://github.com/vuejs/vue-router). Der vue-router ist der offizielle Router für Vue.js, die Bibliothek mit der man einfach und effizient zwischen meheren Seiten navigieren kann. Der vue-router ist genau für die Verwendung mit SPAs gebaut. SPAs haben einige spezifische Anforderungen, wie z.B. verschachtelte Routen oder Datenübertragung.  
Füge den vue-router zu den Abhängigkeiten deiner Vue-App hinzu (Klicke auf `Add Dependency` und suche nach `vue-router`).

## Der Router

Öffne die Datei `main.js` und importiere vue-router:

```js
import VueRouter from 'vue-router';
```
Jetzt müssen wir das Plugin bei der Vue-App registrieren mit Hilfe der globalen `Vue.use()`-Methode:

```js
Vue.use(VueRouter);
```

::: tip 💡
Überlege für einen Moment, wie die App aufgebaut sein muss. Der Header und Footer sollen auf jeder Seite gleich sein. Der eigentliche Inhalt dazwischen soll sich verändern, je nach dem auf welchem Navigationspunkt man klickt.  
Die Komponente, die zu der Route (=dem geklickten Navigationspunkt) passt, wird in einem `<router-view>`-Tag angezeigt. Das heißt wir müssen unseren Code verändern, damit nicht mehr alles in der `App.vue` steht.
:::

## Eine Homepage erstellen

Wir erstellen eine separate Komponente für alle Elemente in `<div class="wrapper">`.

- Gehe in den `views`-Ordner in `src`, falls dieser nicht existiert, erstelle ihn zuerst. In diesem Ordner erstelle eine Datei namens `Home.vue`.
- Füge den `<template></template>`-Tag in diese Datei ein.
- Öffne die `App.vue`-Datei. Kopiere das `<div class="wrapper">` und alle Elemente darin in dem `template`-Tag in `Home.vue`. Du solltest dort nun allen Code, der zwischen `<header>` und `<footer>` stand, stehen haben. Lösche diesen Teil aus `App.vue`.

## Eine Haustier-Seite erstellen

Jetzt erstellen wir eine Seite für die Haustiere. Erstelle im `src/views`-Ordner eine neue Datei `Pets.vue`, genauso wie du es mit `Home.vue` gemacht hast. Kopiere Folgenden Code für das Layout der Seite. 

```html
<template>
  <v-container grid-list-md fluid>
    <v-layout wrap>
      <v-flex xs12 sm4 md3>
        <v-card color="grey lighten-2">
          <v-img src="https://goo.gl/6CQNDo" height="170px">
          </v-img>
          <v-card-title>
            <div>
              <h3>Looking for a dog?</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
p {
  margin: 0;
}
</style>
```

## Die Routen hinzufügen

Super! Jetzt haben wir zwei verschiedene Komponenten für unsere Startseite und die Haustier-Galerie. Wie du sicher schon bemerkt hast, wird das aber noch nicht in der App angezeigt. Dafür müssen wir zwei Routen erstellen.

- Zurück zur `main.js`. Zurerst importieren wir die neuen Kopmonenten nach den anderen Importen:

```js
import Home from './views/Home';
import Pets from './views/Pets';
```

- Jetzt erstellen wir die Routen. Jede Route ist ein Objekt, das einen Pfad und eine Komponente enthält. Füge die zwei Routen unter `Vue.use...` ein (eine ist für die Startseite, die andere für die Haustier-Galerie):

```js
const routes = [
  { path: '/', component: Home },
  { path: '/pets', component: Pets },
];
```

- Jetzt müssen wir eine `VueRouter`-Instanz erstellen und dieser unsere Routen übergeben. Kopiere diese Zeile unter `const routes`:

```js
const router = new VueRouter({ routes });
```

- Zum Schluss müssen wir den Router noch der Vue-App hinzufügen:

```js
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
```

- Öffne jetzt die `App.vue`-Datei. Schreibe an die Stelle, an der vorher `<div class="wrapper">` stand, den `<router-view></router-view>`-Tag. Er sollte zwischen dem Header und Footer stehen. Und nun wird in der App auch wieder etwas angezeigt! 

Teste deinen Code. Füge `/pets` an das Ende der URL, jetzt kannst du die Haustier-Galerie sehen anstelle der Startseite.

## Navigation hinzufügen

Um das Wechseln zwischen den beiden Seiten einfacher zu machen, bauen wir eine Navigation ein. Dafür werden wir Vuetify nutzen, was wir bereits in Kapitel 1 hinzugefügt haben.

Die Toolbar-Kompnente von Vuetify heißt `v-toolbar`. Kopiere sie direkt unter den `h1`-Tag in den Header:

```html
<v-toolbar>
    <v-toolbar-items>
        <v-btn to="/" flat>Home</v-btn>
        <v-btn to="/pets" flat>Pets</v-btn>
    </v-toolbar-items>
</v-toolbar>
```

Du siehst jetzt zwei Buttons in dieser Toolbar. Jeder hat ein `to`-Attribut: Das ist ein router-link, der auf eine bestimmte Route zeigt. Jetzt können wir ganz einfach zwischen den Seiten wechseln, probiere es aus!

Ok, schön. Aber da sind noch keine Haustiere. Die bauen wir jetzt ein!

## Daten erstellen

Wir werden zunächst ein paar Dummy-Daten hinzufügen. Erstelle dazu im `src`-Ordner einen neuen Ordner namens `data` und in diesem eine neue Datei namens `dogs.js`. Kopiere folgendes JSON-Objekt in die Datei:

```js
export const Dogs = [
  {
    name: 'Max',
    breed: 'husky',
    img: 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg',
  },
  {
    name: 'Rusty',
    breed: 'shiba',
    img: 'https://images.dog.ceo/breeds/shiba/shiba-13.jpg',
  },
  {
    name: 'Rocco',
    breed: 'boxer',
    img: 'https://images.dog.ceo/breeds/boxer/n02108089_14112.jpg',
  },
  {
    name: 'Zoey',
    breed: 'beagle',
    img: 'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg',
  },
  {
    name: 'Duke',
    breed: 'doberman',
    img: 'https://images.dog.ceo/breeds/doberman/n02107142_4653.jpg',
  },
  {
    name: 'Lily',
    breed: 'malamute',
    img: 'https://images.dog.ceo/breeds/malamute/n02110063_1104.jpg',
  },
  {
    name: 'Winston',
    breed: 'pug',
    img: 'https://images.dog.ceo/breeds/pug/n02110958_15626.jpg',
  },
  {
    name: 'Angel',
    breed: 'samoyed',
    img: 'https://images.dog.ceo/breeds/samoyed/n02111889_4470.jpg',
  },
];
```

Hier wird eine Konstante (`const`) names `Dogs` exportiert, die alle Daten beinhaltet, die wir benötigen.

- Jetzt importieren wir diese Daten in die `pets`-Komponente. Öffne die `Pets.vue`-Datei und kopiere den folgenden Skript-Block unter den `<template>`-Block.

```js
<script>
import {Dogs} from "../data/dogs";
</script>
```

Dieser Teil importiert die Daten der Hunde. Jetzt müssen wir diese Daten der `data()`-Funktion hinzufügen. Bearbeite den `<script>`-Tag:

```js
<script>
  import { Dogs } from "../data/dogs";
  export default {
    data() {
      return {
        dogs: Dogs
      };
    }
   };
  </script>
```

Dieses Skript stellt sicher, dass das `dogs`-Array ein Teil des Zustands ('state') der `Pets`-Komponente ist und im Template verwendet werden kann.

## Die Daten in einer Liste ausgeben

Jetzt möchten wir eine Liste von Hunden erzeugen. Der einfachste Weg, um das zu erreichen, ist, über das Array zu iterieren und die Daten an eine Liste anzuhängen. Unsere `dogs` sind ein Array (=Liste von Objekten) und damit bereit verarbeitet zu werden. Um eine Liste von Einträgen darzustellen, die in einem Array stehen, gibt es in Vue die `v-for` Direktive. Diese Direktive fügen wir dem `v-flex`-Element in `Pets.vue` hinzu:

```html
<v-flex xs12 sm4 md3 v-for="pet in dogs" :key="pet.breed">
```

Um korrekt über das Array zu iterieren und die Daten auszugeben, muss jedes Element ein eindeutiges Schlüsselattribut (=key attribute) haben. In unserem Fall wird die Art des Hundes dieses Schlüsselattribut sein.

Jetzt haben wir acht `v-card`s mit dem gleichen Text und Bild. Das stimmt so noch nicht.

In der `v-for`-Direktive wird der _aktuelle_ Hund `pet` genannt.

::: tip 💡
Wir haben diesen Namen in der Diretive zugewiesen; hätten wir geschrieben `v-for="dog in dogs"` würde das aktuelle Element `dog` heißen.
:::

In der `dog.js` kannst du sehen, dass jeder Hund drei Eigenschaften hat: Name, Art (breed) und Bild (img). Das Bild können wir mit der `v-img`-Komponente anzeigen.

Wenn wir `src` nur mit dem Attriubut `pet.img` ersetzen...

```html
<v-img src="pet.img" height="170px">
```
... werden noch keine Bilder angezeigt. Warum? Weil wir so einen statischen Wert einsetzen, die App erwartet eine Datei mit dem Namen `pet.img`. Diese Datei gibt es allerdings nicht. Um den Wert von `pet.img` dynamisch in das `src`-Attribut zu setzen, müssen wir die `v-bind`-Direktive (oder den Shortcut `:`) nutzen.

```html
<v-img :src="pet.img" height="170px"> </v-img>
```

::: tip 💡
Die `v-bind`-Direktive erzeugt dynamisch aus ein oder mehreren Attributen, oder sogar eine Komponenten-Variable einen JavaScript-Befehl. Den Unterschied macht der `:`!
:::

Es funktioniert!

Jetzt zeigen wir den Namen des Hundes an. Für Text wird in Vue die _"mustache"-Syntax_ (=Bart) genutzt - doppelte geschweifte Klammern: `{{` `}}`. Dieser Tag wird durch den Wert der zugewiesenen Eigenschaft ersetzt. Bearbeite den `<h3>`-Tag mit dem Namen des Hundes, nutze dafür die geschweiften Klammern:

```html
<h3>{{pet.name}}</h3>
```

Jetzt fehlt noch die Art des Hundes.
The only thing left is the dog's breed. Let's add one more `<p></p>` tag right below the name and display breed there:

```html
<p>{{pet.breed}}</p>
```
Soweit funktioniert alles, wie wir es uns vorgestellt haben. Nur das Template ist inzwischen etwas unübersichtlich geworden. Wir können es überarbeiten und etwas verschlanken. Dafür erstellen wir eine `Dog`-Komponente und übergeben das aktuelle Haustier als Eigenschaft (=property).

::: tip 💡
Eigenschaften (=properties) sind spezielle Attribute, die man einer Komponente zuweisen kann. Wenn ein Wert an ein Eigenschaftsattribut zugewiesen wird, wird dieser Wert eine Eigenschaft für diese eine Ausführung der Kompnente. In unserem Fall wird die `Dog`-Komponente eine `dog` Property haben, die sie von der Eltern-Komponente `Pets` übergeben bekommt.
:::

## Überarbeitung des Templates - Property!

Erstelle einen neuen Ordner `components` im `src`-Ordner.

Erstelle eine neue Datei `Dog.vue` in dem `components`-Ordner und schreibe die `<template></template>` und `<script></script>`-Tags hinein. So sieht die neue Datei jetzt aus:

```html
<template>

</template>

<script>

</script>
```

Kopiere die gesamte `v-card`-Komponente aus `Pets.vue` in den `<template>`-Tag der `Dogs`-Komponente. Den Teil kannst du nun aus dem `template` in `Pets.vue` löschen.

Wie bereits erwähnt, benötigen wir eine `dog`-Property in der `Dog`-Komponente. Füge dazu die `props` zu der Komponente hinzu: Zuerst muss in den `<script>`-Tag eine Export-Anweisung; das ermöglicht uns später die `Dogs`-Komponente in der `Pets`-Komponente zu importieren und nutzen. Kopiere diesen `<script>`-Block nach `Dogs.vue`:

```js
<script>export default {}</script>
```

Jetzt können wir die `props` und die Eigenschaft `dog` hinzufügen:

```js
<script>
	export default {
	  props: {
	    dog: {
	      type: Object
	    }
	  }
	};
</script>
```

An dieser Stelle definieren wir auch den Typ der Eigenschaft - es soll ein JavaScript-Objekt sein.

In dem Template von `Dog.vue` musst du `pet` mit `dog` ersetzen, weil es innerhalb der `Dog`-Komponente keine `pet`-Variable gibt. So sollte das Template jetzt aussehen:

```html
<template>
	<v-card color="grey lighten-2">
	  <v-img :src="dog.img" height="170px">
	  </v-img>
	    <v-card-title>
	      <div>
	        <h3>{{dog.name}}</h3>
	        <p class="breed">{{dog.breed}}</p>
	      </div>
	    </v-card-title>
	</v-card>
</template>
```

In der `Pets.vue`-Datei müssen wir noch ein paar Änderungen machen. Zuerst importieren wir die neue `Dog`-Komponente; kopiere dazu diese Zeile unter den Import der `Dogs`-Komponente:

```js
import Dog from '../components/Dog.vue';
```

Nun müssen wir der `Pets`-Komponente mitteilen, dass sie eine sogenannte Kind-Komponente beinhaltet. Vue nutzt die `components`-Option dafür; diese wird über `data()` deklariert:

```js
export default {
  components: {
    appDog: Dog,
  },
  data() {
    return {
      dogs: Dogs,
    };
  },
};
```

::: tip 💡
Jede Zuweisung in der `components`-Option besteht aus einem Schlüssel (=key) und einem Wert (=value). Der Key ist der Name des neuen Elementes und der Value beinhaltet `options`-Objekt für diese Komponente.
:::

::: tip 💡
Für den Namen der Komponente kannst du verschiedene Schreibweisen benutzen: camel-case (`appDog`) oder kebab-case (`'app-dog'`). Die Camel-case-Schreibweise wird im HTML-Tag in Kamel-Case "umgewandelt". Um die `appDog`-Komponente anzuzeigen, müssen wir den HTML-Tag `<app-dog>` nutzen und es wird das Template aus der `Dog`-Komponente angezeigt.
:::

Füge den neuen `<app-dog>`-Tag in `Pets.vue` an die Stelle ein, an der du zuvor die `<v-card>` gelöscht hast.

```html
<v-flex xs12 sm4 md3 v-for="pet in dogs" :key="pet.breed">
   <app-dog></app-dog>
</v-flex>
```

Jetzt müssen wir der `Dog`-Komponente noch die `dog`-Eigenschaft übergeben. Dafür nutzen wir wieder die `v-bind`-Direktive (oder den Shortcut `:`). Passe deinen gerade geschriebenen Code in `Pets.vue` entsprechend an:

```html
<v-flex xs12 sm4 md3 v-for="pet in dogs" :key="pet.breed">
  <app-dog :dog="pet"></app-dog>
</v-flex>
```

**Jetzt solltest du ein hübsches Kachel-Layout mit vielen Hunden haben! Kapitel 2 ist damit abgeschlossen!**

# Ergebnis

![final result chapter 2](./images/petshop_chapter2.jpg)
