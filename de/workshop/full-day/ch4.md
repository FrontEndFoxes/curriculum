# 📋 Kapitel 4: Eine Merkliste erstellen

| **Ziel** | Programmiere eine Favoriten-Funktion, so dass du Hunde einer Merkliste hinzufügen oder entfernen kannst.                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Was du lernen wirst**       | Zustandsmanagement in einer Vue-Anwendung mit Vuex                                                                                             |
| **Was du dafür benötigst**       | Einen modernern Browser, z.B. Google Chrome. Wenn du Chrome verwendest, installiere die Chrome DevTools für Vue.js. Ein Account bei CodeSandbox.io. Falls du nicht mehr weißt, wo du warst, kannst du die Basis für dieses Kapitel von [hier](https://github.com/VueVixens/projects/tree/master/chapter-3-end) importieren. Wie das geht, steht im [Anhang 1](appendix_1.md) |
| **Dauer** | 1 1/2 Stunden                                                                                                                                                                                     |

## Anleitung

Falls du das Projekt von vorn beginnen musst, clone [dieses Projekt](https://github.com/VueVixens/projects/tree/master/chapter-1-end) in Code Sandbox nachdem du dich eingeloggt hast.

In diesem Kapitel bauen wir eine Merkliste für Hunde, die wir mögen und vielleicht adoptieren möchten.
Zuerst benötigen wir eine neue, leere Datei im `views`-Ordner namens `Favorites.vue`.

## Die Merkliste bauen

Für die neue Komponente brauchen wir zuerst ein Template. Schreibe den `<template></template>` in die neue Datei.
Schreibe in den `template`-Tag ein `<div></div>`-Tag und darin den Text 'My Favorites'.

```html
<template>
	 <div>
	   My Favorites
	 </div>
</template>
```

Jetzt müssen wir diese neue Komponente mit dem Router verknüpfen. 

Gehe in die `main.js`-Datei und füge einen weiteren Import nach `Home` und `Pets` hinzu:

```js
import Favorites from "./views/Favorites";
```

Füge danach die neue Route den `routes` hinzu:

```js
{ path: "/favorites", component: Favorites }
```

Navigiere im Browser zu der `favorites`-Seite. (Hänge dazu `/favorites` an die URL der Startseite.) Du solltest den Text 'My Favorites' zwischen dem Header und Footer sehen.

Lass uns einen Link zu der Liste der Navigation hinzufügen. Später zeigen wir dort noch die Anzahl der markierten Hunde an. Aber zunächt reicht ein einfaches Icon mit einem Link aus. Gehe dazu in die `App.vue`-Datei und kopiere folgenden Code in die `v-toolbar`-Komponente direkt nach dem schließendem Taf der `v-toolbar-items`:

```html
<v-spacer></v-spacer>
<router-link to="/favorites">
	<v-icon large>loyalty</v-icon>
</router-link>
```

::: tip 💡
`v-spacer` ist eine Vuetify-Komponente, die den freien Platz zwischen zwei anderen Komponenten ausfüllt. `v-icon` ist eine Komponente, mit der man [Material icons](https://material.io/icons/) darstellen kann.
:::

Wenn du jetzt auf das Favoriten-Icon klickst, gelangst du zur `/favorites`-Seite.

Jetzt erstellen wir das Template für die `Favorites`-Komponente. Dafür nutzen wir die Listen-Komponente von Vuetify, um die markierten Hunde anzuzeigen. Anstelle des Platzhalter-Textes von vorhin schreiben wir jetzt den `<v-list></v-list`-Tag. Das Template sollte jetzt so aussehen:

```html
<div>
	<v-list>
	</v-list>
</div>
```

Die Liste braucht noch einen Namen. Dafür können wir die `v-subheader`-Komponente von Vuetify nutzen:

```html
<div>
	 <v-list>
	   <v-subheader>My Favorites</v-subheader>
	 </v-list>
</div>
```

Wir fügen zunächst ein Testelement der Liste hinzu: Ein Bild von einem Hund, seinen Namen und ein Löschen-Button. Wir brauchen dafür die `v-list-tile`-Komponente für das Listenelement; `v-list-tile-avatar` für das Bild; `v-list-tile-content`für den Namen und `v-list-tile-action` sowie `v-icon` für den Löschen-Button.

::: tip 💡
Mehr Info zu Listen findest du in der [Vuetify list component-Dokumentation](https://vuetifyjs.com/en/components/lists).
:::

So sieht das Template jetzt aus:

```html
	<div>
	  <v-list>
	      <v-subheader>My Favorites</v-subheader>
	      <v-list-tile avatar @click="{}">
	        <v-list-tile-avatar>
	          <img src="https://dog.ceo/api/img/husky/n02110185_1469.jpg">
	        </v-list-tile-avatar>
	        <v-list-tile-content>Fluffy</v-list-tile-content>
	        <v-list-tile-action>
	          <v-icon>delete</v-icon>
	        </v-list-tile-action>
	      </v-list-tile>
	  </v-list>
	</div>
```

## Den Zustand der Liste mit Vuex verwalten

Jetzt siehst du, wie das Template im Browser aussieht. Es ist Zeit die Testdaten durch echte Daten zu ersetzen. Das Problem: Wie können wir ausgewählte Hunde von der `Pets`-Komponente der unabhängigen `Favorites`-Komponente übergeben? Wir können keine props nutzen, da die beiden Komponenten keine Eltern-Kind-Beziehung haben... für solche Fälle brauchen wir _Zustandsmanagement_. Die Bibliothek dafür heißt in Vue: `Vuex`.

::: tip 💡
Vuex ist eine Bibliothek, um Zustandsmanagement in einer Vue.js-Anwendung zu ermöglichen. Es dient als zentraler Speicher für alle Komponenten einer Anwendung und beinhaltet verschiedene Regeln, um den Zustand des Speichers nur über bestimmte Funktionen zu verändern.
Mehr über Vues kannst du [hier](http://vuex.vuejs.org/en/) nachlesen.
:::

Um diesen zentralen Speicher zu nutzen, müssen wir zunächst Vuex als Abhängigkeit hinzufügen. Klicke auf `Add Dependency`, suche nach `vuex` und installiere diese Bibliothek.

Erstelle jetzt einen `store`-Ordner in dem `src`-Ordner. Erstelle eine neue Datei namens `store.js` in diesem neuen Ordner. Hier werden alle Daten der Anwendung gespeichert.

Öffne die `store.js` und importiere Vuex:

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
```

Jetzt erseugen wir den Speicher:

```js
export default new Vuex.Store({

})
```

Was wollen wir eigentlich in diesem Speicher sichern? Eine Liste von Favoriten, in der die markierten Hunde stehen. Dazu fügen wir eine `favorites`-Liste in das initiale Zustandsobjekt. Füge dieses zwischen die geschweiften Klammern ein:

```js
export default new Vuex.Store({
  state: {
    favorites: [],
  }
})
```

Jetzt müssen wir den Speicher unserer Vue-Instanz hinzufügen. Öffne die `main.js`-Datei und importiere den Speicher unter den anderen Imports:

```js
import store from "./store/store";
```
Füge den `store` dann den Properties der Vue-Instanz in `main.js` hinzu:

```js
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

Jetzt haben alle Komponenten der Anwendung Zugriff auf den Speicher in einer "berechneten Eigenschaft" (=computed property) über `this.$store.state`. Greifen wir darauf mal in der `Favorites`-Komponente zu:

::: tip 💡
Eine "berechnete Eigenschaft" kann genutzt werden, um schnelle Berechnungen von verschiedenen Eigenschaften durchzuführen, die im Template angezeigt werden. Diese Berechnungen werden gecached (=zwischengespeichert) und nur aktualisiert, wenn sich eine ihrer Abhängigkeiten verändert.
:::

Schreibe den `script`-Tag mit der `export default`-Anweisung in die `Favorites.vue`:

```js
<script>
	export default {

	};
</script>
```

... und dann die `computed property` in den export:

```js
<script>
	export default {
		computed: {
			favorites() {
				return this.$store.state.favorites;
			}
		}
	};
</script>
```

Du siehst, dass `favorites()` eine Funktion ist, die uns den Wert der `favorites`-Liste aus dem Speicher liefert. Das können wir jetzt in der Komponente benutzen.

## Favoriten hinzufügen

Wir ersetzen unsere Testdaten mit dem Inhalt der `favorites`-Komponente:

Zuerst schreiben wir ein paar Testdaten in den Speicher (wir kümmern uns später darum, dass dort echte Daten abgelegt werden). Kopiere die ersten drei Hunde aus der `data/dogs.js`-Datei in die `favorites`-Liste in `store.js`:

```js
	state: {
		favorites: [
		  {
		    name: "Max",
		    breed: "husky",
		    img: "https://dog.ceo/api/img/husky/n02110185_1469.jpg"
		  },
		  {
		    name: "Rusty",
		    breed: "shiba",
		    img: "https://dog.ceo/api/img/shiba/shiba-13.jpg"
		  },
		  {
		    name: "Rocco",
		    breed: "boxer",
		    img: "https://dog.ceo/api/img/boxer/n02108089_14112.jpg"
		  },
		]
	},
```

In der `Favorites.vue`-Komponente iterieren wir über die `favorites`-Liste aus dem Speicher mit der schon bekannten `v-for`-Direktive. Dieses Mal wollen wir den Index des Hundes kennen und fügen diesen als Key hinzu. Dafür müssen wir ein Alias für `index` in der `v-for`-Direktive hinzufügen.
Das `<template>` sollte nun so aussehen:

```html
	<div>
	  <v-list>
	      <v-subheader>My Favorites</v-subheader>
	      <v-list-tile avatar v-for="(dog, index) in favorites" :key="index" @click="{}">
	        <v-list-tile-avatar>
	          <img :src="dog.img">
	        </v-list-tile-avatar>
	        <v-list-tile-content>{{dog.name}}</v-list-tile-content>
	        <v-list-tile-action>
	          <v-icon>delete</v-icon>
	        </v-list-tile-action>
	      </v-list-tile>
	  </v-list>
	</div>
```

::: tip 💡
Was hat sich verändert? Das `src`-Attribut nutzt jetzt die Kurzschreibweise für die `v-bind`-Direktive. `:src`, da der Wert nun dynamisch gesetzt wird und nicht mehr statisch ist.
:::

Jetzt sehen wir unsere Testdaten aus dem Speicher auf der `favorites`-Seite. Wir passen die Ansicht (=UI) jetzt noch etwas an, damit die Seite hübscher aussieht.

## UI Anpassungen

Zuerst benötigen wir einen Platzhalter, wenn die Liste leer ist.

::: tip 💡
Die `v-if`-Direktive zeigt ein Element an, wenn ihre Bedingung wahr ist. Die `v-else`-Direktive dient als Alternative, wenn die Bedingung in `v-if` falsch ist.
:::

Wir werden die gesamte Liste in ein umfassendes `div` schreiben und nur anzeigen, wenn in der Liste Elemente sind. Ansonsten sieht der Nutzer einen Platzhalter Text. So müssen wir das Template dafür ändern:

```html
	<div>
	  <v-list>
	    <v-subheader v-if="!favorites.length">Your favorites list is empty</v-subheader>
	    <div v-else>
	      <v-subheader>Your favorites</v-subheader>
	      <v-list-tile avatar v-for="dog in favorites" :key="dog.name" @click="{}">
	        <v-list-tile-avatar>
	          <img :src="dog.img">
	        </v-list-tile-avatar>
	        <v-list-tile-content>{{dog.name}}</v-list-tile-content>
	        <v-list-tile-action>
	          <v-icon>delete</v-icon>
	        </v-list-tile-action>
	      </v-list-tile>
	    </div>
	  </v-list>
	</div>
```

::: tip 💡
Was passiert hier? Zuerst überprüft die Anwendung, ob die `favorites`-Liste Elemente beinhaltet. Dazu wird das Längen-Attribut (=length) genutzt. Eine leere Liste hat die Länge 0. Wenn die Länge 0 ist, zeigt die Anwendung den Platzhaltertext an und ignoriert den Teil mit der `v-else`-Direktive. Sofern die Liste aber nicht leer ist, d.h. ihre Länge größer als 0, zeigt die Anwendung stattdessen den Teil mit der `v-else`-Direktive an; das ist unsere Liste.
:::

Wir wollen auch die Anzahl der markierten Hunde am Favoriten-Icon in der Navigation anzeigen. Gehe dazu in die `App.vue` und füge eine `computed property` für `favorites` hinzu, so wie schon in der `Favorites.vue`-Komponente. Du kannst diese unter die `name`-Eigenschaft kopieren:

```js
computed: {
	favorites() {
		 return this.$store.state.favorites;
	}
},
```

Das Favoriten-Icon wird jetzt innerhalb der `v-badge`-Komponente von Vuetify geschrieben und zeigt die Anzahl der Elemente an. Bearbeite das Template in der `App.vue`, das der `favorites`-Teil am Ende so aussieht:

```html
<router-link to="/favorites">
  <v-badge color="grey lighten-1" overlap right v-model="favorites.length">
    <span slot="badge">{{favorites.length}}</span>
      <v-icon large>loyalty</v-icon>
  </v-badge>
</router-link>
```

::: tip 💡
Die `v-model`-Direktive bestimmt an dieser Stelle, ob die Zahl angezeigt wird. Wenn die Liste leer ist, versteckt die Anwendung das Badge. Da wir aktuell drei Elemente in unseren Testdaten im Speicher haben, wird die Nummer `3` angezeigt.
:::

## Hunde hinzufügen und entfernen

Wir brauchen einen Weg, um Hunde zu markieren und der Favoriten-Liste hinzuzufügen und (leider) auch wieder zu entfernen. Das bedeutet: Wir müssen _den Zustand im Speicher verändern_. Den Zustand im Speicher kann man mit Hilfe einer sogenannten Mutation (=mutation) verändern. Vuex Mutationen sind ähnlich zu Ereignissen (=events): Jede Mutation hat eine Beschreibung (=type) und eine Funktion (=handler). In der Handler-Funktion wird der Zustand verändert. Sie erhält als ersten Parameter den Zustand (=state). Erstellen wir unsere erste Mutation. Lösche die Testdaten aus der `favorites`-Liste in `store.js`. Füge nach dem `state` das `mutations`-Objekt ein:

```js
export default new Vuex.Store({
	 state: {
	   favorites: []
	 },
	 mutations: {
	 },
});
```

In dieses Objekt schreiben wir die `addToFavorites`-Mutation:

```js
	export default new Vuex.Store({
	  state: {
	    favorites: []
	  },
	  mutations: {
	    addToFavorites(state, payload) {
	      state.favorites.push(payload);
	    },
	  },
	});
```

Diese Mutation hat zwei Parameter: zuerst den State und als zweites die Daten (=data order payload), die zu unserem `state.favorites` hinzugefügt werden. Die `addFavorites`-Mutation nimmt das Element aus dem `payload` und fügt es der `state.favorites`-Liste hinzu.

::: tip 💡
Es ist nicht möglich eine Mutation direkt aufzurufen. Um eine Mutation auszuführen, musst du `store.commit` mit dem Namen der Mutation aufrufen: `store.commit('addToFavorites')`
:::

::: tip 💡
Normalerweise werden Mutationen über _actions_ ausgeführt. Aktionen sind ähnlich zu Mutationen, allerdings können sie asynchrone Funktionen, wie z.B. einen API-Aufruf, enthalten.
:::

Wir registeren jetzt die Aktion, um die `addToFavorites`-Mutation ausführen zu können. Füge die `actions`-Eigenschaft dem `store`-Objekt hinzu und in diese `actions` dann die `addToFavorites`-Aktion:

```js
export default new Vuex.Store({
	 state: {
	   favorites: []
	 },
	 mutations: {
	   addToFavorites(state, payload) {
	     state.favorites.push(payload);
	   },
	 },
	 actions: {
	   addToFavorites({ commit }, payload) {
	     commit("addToFavorites", payload);
	   },
	 }
});
```

::: tip 💡
Aktions-Funktionen erhalten ein Kontext-Objekt, welches die gleichen Methoden und Eigenschaften hat, wie der Store selbst. Du kannst `context.commit` aufrufen, um eine Mutation auszuführen. Wir nutzen hier ES6 [argument destructuring](https://github.com/lukehoban/es6features#destructuring), um die `commit`-Methode auf dem `content` auszuführen.
:::

::: tip 💡
`payload` enthält hier de gleichen Daten, die wir von der Komponente an die Mutation übergeben wollen, um den `state` zu ändern.
:::

## Die UI bauen

Wir rufen jetzt die neue Aktion aus der `Pets.vue`-Komponente heraus auf. Zuerst brauchen wir einen Button, um einen Hund der Favoriten-Liste hinzuzufügen. Gehe in die `Dog.vue`-Komponente und füge den Button unter `v-card-title` ein:

```html
<v-btn @click="$emit('addToFavorites', dog)">Add to Favorites</v-btn>
```

Mit `$emit` senden wir ein Signal an die Eltern-Komponente (hier `Pets.vue`), um zu signalisieren, dass etwas in ihrer Kind-Komponente passiert und die Eltern-Komponente mit der Nachricht etwas tun soll.

Unsere Nachricht enthält einen zweiten Parameter: Es ist der Hund, den wir der Favoriten-Liste hinzufügen wollen.

In der `Pets.vue` fügen wir einen _listener_ (=Zuhörer) ein, der auf das Signal der Kind-Komponente wartet. Überschreibe den aktuellen `<app-dog>`-Tag mit folgendem Code:

```html
<app-dog :dog="pet" @addToFavorites=""></app-dog>
```

Bisher macht dieser Listener noch nichts. Aber wir wollen für dieses Event eine Aktion ausführen. Dafür müssen wir die Aktionen mit unserer Komponente verbinden.

::: tip 💡
Du kannst Aktionen aus Komponenten heraus anstoßen indem du `this.$store.dispatch('xxx')` aufrufst oder den `mapActions`-Hilfsfunktion nutzt. Dieser verknüpft eine gleichnamige Methode in der Komponente mit den `store.dispatch`-Aufrufen.
:::

Wir werden den zweiten Weg nutzen. Importiere zuerst die `mapActions` in `Pets.vue`:

```js
import { mapActions } from "vuex";
```

Erstelle dann einen `methods`-Block in der Komponente und füge dort die `mapActions` hinzu. (Dazu nutzen wir den [ES6 spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).)

```js
methods: {
  ...mapActions(["addToFavorites"])
},
```

Jetzt können wir `addToFavorites` wie eine normale Komponenten-Methode aufrufen.

Diese Methode rufen wir jetzt auf, wenn das `addToFavorites`-Signal von `app-dog` gesendet wird. Bearbeite den `<app-dog>`-Tag in `Pets.vue`:

```html
<app-dog :dog="pet" @addToFavorites="addToFavorites"></app-dog>
```

Klicke nun auf die `Add to Favorites`-Buttons. Du kannst sehen, dass die Zahl in dem Badge sich erhöht. Öffne die Favoritenliste, in dem du auf ihr Icon klickst, und schau dir die Hunde in der Liste an.

## Die Logik verbessern

Bisher können wir jeden Hund mehrmals auf die Liste setzen. Aber wir haben ja gar nicht fünf Maxs! Um das zu verbessern, überprüfen wir erst den Payload in der Mutation in `sore.js` bevor wir den Hund der Liste hinzufügen. Der Hund wird nur hinzugefügt, wenn er nicht bereits in der Liste ist:

```js
addToFavorites(state, payload) {
    if (!state.favorites.includes(payload)) {
       state.favorites.push(payload);
     }
},
```

Wir überprüfen erst, ob das Element in `payload` in den `state.favorites` enthalten ist und fügen das Element nur hinzu, wenn das nicht der Fall ist.

## Favoriten von der Liste entfernen

Jetzt brauchen wir noch eine Möglichkeit Hunde wieder von der Liste zu entfernen. Dazu erstellen wir eine passende Aktion und Mutation.

Füge die `removeFromFavorites`-Mutation dem `mutations`-Objekt in der `store.js`-Datei hinzu:

```js
removeFromFavorites(state, payload) {
    state.favorites.splice(state.favorites.indexOf(payload), 1);
}
```

::: tip 💡
Die `splice()`-Methode verändert den Inhalt einer Liste, in dem sie ein bestehendes Element entfernt. Das erste Argument ist der Index des Elements, von dem an entfernt werden soll und das zweite Argument ist die Anzahl der Elemente, die entfernt werden sollen.
:::

Zuerst finden wir den Index des `payload`-Elements in der `store.favorites`-Liste heraus. Dann entfernen wir ab diesem Index genau ein Element, das entfernt nur das Element aus dem Payload.

Füge die Aktion hinzu, um die `removeToFavorites`-Mutation aufzurufen:

```js
removeFromFavorites({ commit }, payload) {
     commit("removeFromFavorites", payload);
  }
```

Jetzt müssen wir diese Aktion aufrufen, wenn jemand auf den Löschen-Button klickt. Öffne die `Favorites.vue`-Datei. Zuerst müssen wir die Aktionen mit Methoden verknüpfen. Importiere wie zuvor auch die `mapActions` am Anfang des `<script>`-Tags:

```js
import { mapActions } from "vuex";
```

und füge die `methods` unter den `computed`-Block ein:

```js
methods: {
   ...mapActions(["removeFromFavorites"])
  }
```

Und zum Schluss noch der Klick-Listener am Löschen-Icon:

```html
<v-icon @click="removeFromFavorites(dog)">delete</v-icon>
```

Jetzt kanns du Hunde der Liste hinzufügen oder entfernen!

**Whew! Kapitel 4 ist abgeschlossen!**

# Ergebnis
![chapter 4 final](./images/petshop_chapter4.jpg)
