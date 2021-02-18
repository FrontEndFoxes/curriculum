# 📋 Kapitel 4: Eine Merkliste erstellen

| **Ziel**                   | Programmiere eine Favoriten-Funktion, so dass du Hunde einer Merkliste hinzufügen oder entfernen kannst.                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Was du lernen wirst**    | Zustandsmanagement in einer Vue-Anwendung mit Vuex                                                                                                                                                                                                                                                     |
| **Was du dafür benötigst** | Einen modernen Browser, z.B. Google Chrome. Ein Account bei CodeSandbox.io. Falls du nicht mehr weißt, wo du warst, kannst du die Basis für dieses Kapitel von [hier](https://github.com/FrontEndFoxes/projects/tree/main/chapter-3-end) importieren. Wie das geht, steht im [Anhang 1](appendix_1.md) |
| **Dauer**                  | 1 1/2 Stunden                                                                                                                                                                                                                                                                                          |

## Anleitung

Falls du das Projekt von vorn beginnen musst, klone [dieses Projekt](https://github.com/FrontEndFoxes/projects/tree/main/chapter-1-end) in Code Sandbox, nachdem du dich eingeloggt hast. Dafür klickst du auf den Link **Import form Github** unten links auf der Hauptseite und fügst die URL des Repositories in das Feld. Du kannst ebenfalls mit dem Projekt fortfahren, dass du in [Kapitel 3](ch3.md) erstellt hast.

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
import Favorites from './views/Favorites';
```

Füge danach die neue Route den `routes` hinzu:

```js
{ path: "/favorites", component: Favorites }
```

Navigiere im Browser zu der `favorites`-Seite. (Hänge dazu `/favorites` an die URL der Startseite.) Du solltest den Text 'My Favorites' zwischen dem Header und Footer sehen.

Lass uns einen Link zu der Liste der Navigation hinzufügen. Später zeigen wir dort noch die Anzahl der markierten Hunde an. Aber zunächst reicht ein einfaches Icon mit einem Link aus. Gehe dazu in die `App.vue`-Datei und kopiere folgenden Code in die `v-toolbar`-Komponente direkt nach dem schließendem Tag der `v-toolbar-items`:

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
	<v-list> </v-list>
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

Wir fügen zunächst ein Testelement der Liste hinzu: Ein Bild von einem Hund, seinen Namen und ein Löschen-Button. Wir brauchen dafür die `v-list-item`-Komponente für das Listenelement; `v-list-item-avatar` für das Bild; `v-list-item-content`für den Namen und `v-list-item-action` sowie `v-icon` für den Löschen-Button.

::: tip 💡
Mehr Info zu Listen findest du in der [Vuetify list component-Dokumentation](https://vuetifyjs.com/en/components/lists).
:::

So sieht das Template jetzt aus:

```html
<div>
	<v-list>
		<v-subheader>My Favorites</v-subheader>
		<v-list-item @click="{}">
			<v-list-item-avatar>
				<img src="https://images.dog.ceo/breeds/husky/n02110185_7888.jpg" />
			</v-list-item-avatar>
			<v-list-item-content>Fluffy</v-list-item-content>
			<v-list-item-action>
				<v-icon>delete</v-icon>
			</v-list-item-action>
		</v-list-item>
	</v-list>
</div>
```

## Den Zustand der Liste mit Vuex verwalten

Jetzt siehst du, wie das Template im Browser aussieht. Es ist Zeit, die Testdaten durch echte Daten zu ersetzen. Das Problem: Wie können wir ausgewählte Hunde von der `Pets`-Komponente der unabhängigen `Favorites`-Komponente übergeben? Wir können keine props nutzen, da die beiden Komponenten keine Eltern-Kind-Beziehung haben... für solche Fälle brauchen wir _Zustandsmanagement_. Die Bibliothek dafür heißt in Vue: `Vuex`.

::: tip 💡
Vuex ist eine Bibliothek, um Zustandsmanagement in einer Vue.js-Anwendung zu ermöglichen. Es dient als zentraler Speicher für alle Komponenten einer Anwendung und beinhaltet verschiedene Regeln, um den Zustand des Speichers nur über bestimmte Funktionen zu verändern. Es erlaubt dir, Daten zu verwalten, die zwischen den Komponenten deiner Applikation geteilt werden können. Mehr über Vues kannst du [hier](http://vuex.vuejs.org/en/) nachlesen.
:::

Um diesen zentralen Speicher zu nutzen, müssen wir zunächst Vuex als Abhängigkeit hinzufügen. Dafür klicke in Code Sandbox auf den Reiter `Explorer` -> `Dependencies` -> `Add Dependency` und suche nach `vuex`. Wenn du es installiert hast, wirst du sehen, dass es zu deiner `package.json` hinzugefügt wurde.

Erstelle jetzt einen `store`-Ordner in dem `src`-Ordner. Erstelle eine neue Datei namens `store.js` in diesem neuen Ordner. Hier werden alle Daten der Anwendung gespeichert.

Öffne die `store.js` und importiere Vuex:

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
```

Jetzt erzeugen wir den Speicher:

```js
export default new Vuex.Store({});
```

Was wollen wir eigentlich in diesem Speicher sichern? Eine Liste von Favoriten, in der die markierten Hunde stehen. Dazu fügen wir eine `favorites`-Liste in das initiale Zustandsobjekt. Füge dieses zwischen die geschweiften Klammern ein:

```js
export default new Vuex.Store({
	state: {
		favorites: [],
	},
});
```

Jetzt müssen wir den Speicher unserer Vue-Instanz hinzufügen. Öffne die `main.js`-Datei und importiere den Speicher unter den anderen Imports:

```js
import store from './store/store';
```

Füge den `store` dann den Properties der Vue-Instanz in `main.js` hinzu:

```js
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
```

Jetzt haben alle Komponenten der Anwendung Zugriff auf den Speicher in einer "berechneten Eigenschaft" (=computed property) über `this.$store.state`. Greifen wir darauf mal in der `Favorites`-Komponente zu:

::: tip 💡
Eine "berechnete Eigenschaft" kann genutzt werden, um schnelle Berechnungen von verschiedenen Eigenschaften durchzuführen, die im Template angezeigt werden. Diese Berechnungen werden gecached (=zwischengespeichert) und nur aktualisiert, wenn sich eine ihrer Abhängigkeiten verändert.
:::

Schreibe den `<script>` Block mit der `export default`-Anweisung in die `Favorites.vue` unterhalb des `<template>` Blocks:

```js
<script>export default {};</script>
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
      img: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg"
    },
    {
      name: "Rusty",
      breed: "shiba",
      img: "https://images.dog.ceo/breeds/shiba/shiba-13.jpg"
    },
    {
      name: "Rocco",
      breed: "boxer",
      img: "https://images.dog.ceo/breeds/boxer/n02108089_14112.jpg"
    },
  ]
},
```

In der `Favorites.vue`-Komponente iterieren wir über die `favorites`-Liste aus dem Speicher mit der schon bekannten `v-for`-Direktive. Ändere das `<div>` des `<template>` Blocks zu folgendem Markup:

```html
<div>
	<v-list>
		<v-subheader>My Favorites</v-subheader>
		<v-list-item v-for="(dog, index) in favorites" :key="index" @click="{}">
			<v-list-item-avatar>
				<img :src="dog.img" />
			</v-list-item-avatar>
			<v-list-item-content>{{dog.name}}</v-list-item-content>
			<v-list-item-action>
				<v-icon>delete</v-icon>
			</v-list-item-action>
		</v-list-item>
	</v-list>
</div>
```

::: tip 💡
Was hat sich verändert? Das `src`-Attribut nutzt jetzt die Kurzschreibweise für die `v-bind`-Direktive. `:src`, da der Wert nun dynamisch gesetzt wird und nicht mehr statisch ist. Wir haben ebenfalls sicher gestellt, dass der Name sich dynamisch zu `Fluffy` ändertn, in dem wir `dog.name` in je zwei geschweifte Klammern setzten.
:::

::: tip 💡
Außerdem haben wir das Attribut `:key` direkt zu unserem Attribut `v-for` in das Tag `v-list-item` hinzugefügt. Wir haben dies deshalb getan, weil Vue von uns erwartet, dass wir einen Schlüsselwert benutzen, wenn wir das Attribut `v-for` einsetzen. Indem wir `(dog, index) in favorites` (die runden Klammern sind wichtig) in unser Attribut `v-for` setzten, bekommen wir als zweiten Parameter zusätzlich den jeweiligen Index der Liste pro Hund. Zum Beispiel erhalten wir für Max den Index 0, für Rusty den Index 1 und so weiter. Wir können diesen Index als Schlüsselwert (`key`) benutzen. Mehr Informationen findest du [hier](https://vuejs.org/guide/list.html#Maintaining-State).
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
			<v-list-item v-for="(dog, index) in favorites" :key="index" @click="{}">
				<v-list-item-avatar>
					<img :src="dog.img" />
				</v-list-item-avatar>
				<v-list-item-content>{{dog.name}}</v-list-item-content>
				<v-list-item-action>
					<v-icon>delete</v-icon>
				</v-list-item-action>
			</v-list-item>
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

Das Favoriten-Icon wird jetzt innerhalb der `v-badge`-Komponente von Vuetify geschrieben und zeigt die Anzahl der Elemente an. Bearbeite den `<router-link>` Abschnitt im `<template>` Block in der `App.vue` so, dass der `favorites`-Teil am Ende folgendermaßen aussieht:

```html
<router-link to="/favorites">
	<v-badge color="grey lighten-1" overlap right v-model="favorites.length">
		<template #badge>
			{{favorites.length}}
		</template>
		<v-icon large>loyalty</v-icon>
	</v-badge>
</router-link>
```

::: tip 💡
Die `v-model`-Direktive bestimmt an dieser Stelle, ob die Zahl angezeigt wird. Wenn die Liste leer ist, versteckt die Anwendung das Badge. Da wir aktuell drei Elemente in unseren Testdaten im Speicher haben, wird die Nummer `3` angezeigt. Dieses Verhalten ist durch die offizielle Vuetify Badge Komponente definiert, die Dokumentation lässt sich [hier](https://vuetifyjs.com/en/components/badges) nachlesen.
:::

## Hunde hinzufügen und entfernen

Wir brauchen einen Weg, um Hunde zu markieren und der Favoriten-Liste hinzuzufügen und (leider) auch wieder zu entfernen. Das bedeutet: Wir müssen _den Zustand im Speicher verändern_. Den Zustand im Speicher kann man mit Hilfe einer sogenannten Mutation (=mutation) verändern. Vuex Mutationen sind ähnlich zu Ereignissen (=events): Jede Mutation hat eine Beschreibung (=type) und eine Funktion (=handler). Die Beschreibung ist eine Bezeichnung dafür, was die Mutation verändern wird. Den Namen können wir selber wählen. Da wir mit der Mutation Hunde zu unseren Favoriten hinzufügen möchten, nennen wir sie `addToFavorites`. In der Handler-Funktion wird der Zustand verändert. Sie erhält als ersten Parameter den Zustand (=state). Erstellen wir unsere erste Mutation. Lösche die Testdaten aus der `favorites`-Liste in `store.js`. Füge nach dem `state` das `mutations`-Objekt ein:

```js
export default new Vuex.Store({
	state: {
		favorites: [],
	},
	mutations: {},
});
```

In dieses Objekt schreiben wir die `addToFavorites`-Mutation:

```js
export default new Vuex.Store({
	state: {
		favorites: [],
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
Es ist nicht möglich eine Mutation direkt aufzurufen. Um eine Mutation auszuführen, musst du `store.commit` mit dem Namen der Mutation aufrufen: `store.commit('addToFavorites')` und du wirst sehen, dass die zum Payload hinzugefügt wurden.
:::

::: tip 💡
Normalerweise werden Mutationen über _actions_ ausgeführt. Aktionen sind ähnlich zu Mutationen, allerdings können sie asynchrone Funktionen, wie z.B. einen API-Aufruf, enthalten.
:::

Wir registeren jetzt die Aktion, um die `addToFavorites`-Mutation ausführen zu können. Füge die `actions`-Eigenschaft dem `store`-Objekt hinzu und in diese `actions` dann die `addToFavorites`-Aktion:

```js
export default new Vuex.Store({
	state: {
		favorites: [],
	},
	mutations: {
		addToFavorites(state, payload) {
			state.favorites.push(payload);
		},
	},
	actions: {
		addToFavorites({ commit }, payload) {
			commit('addToFavorites', payload);
		},
	},
});
```

::: tip 💡
Aktions-Funktionen erhalten ein Kontext-Objekt, welches die gleichen Methoden und Eigenschaften hat, wie der Store selbst. Du kannst `context.commit` aufrufen, um eine Mutation auszuführen. Wir nutzen hier ES6 [argument destructuring](https://github.com/lukehoban/es6features#destructuring), um die `commit`-Methode auf dem `content` auszuführen. Deshalb haben wir nicht `context` sondern `{ commit }` als erstes Argument. Würden die `context` als erstes Argument setzen, müssen wir stattdessen `context.commit(...)` aufrufen, um den gleichen Effekt zu erzeugen, wie wir stattdessen mit `commit(...)` erreichen.
:::

::: tip 💡
`payload` enthält hier die gleichen Daten, die wir von der Komponente an die Mutation übergeben wollen, um den `state` zu ändern.
:::

## Die UI bauen

Wir rufen jetzt die neue Aktion aus der `Pets.vue`-Komponente heraus auf. Zuerst brauchen wir einen Button, um einen Hund der Favoriten-Liste hinzuzufügen. Gehe in die `Dog.vue`-Komponente und füge den Button unter `v-card-title`, allerdings innerhalb des Tags `v-card`, ein:

```html
<v-btn @click="$emit('addToFavorites', dog)">Add to Favorites</v-btn>
```

Mit `$emit` senden wir ein Signal an die Eltern-Komponente (hier `Pets.vue`), um zu signalisieren, dass etwas in ihrer Kind-Komponente passiert und die Eltern-Komponente mit der Nachricht etwas tun soll.

Unsere Nachricht enthält einen zweiten Parameter: Es ist der Hund, den wir der Favoriten-Liste hinzufügen wollen.

::: tip 💡
Indem wir also `$emit('addToFavorites', dog)` aufrufen, senden wir das Ereignis (`event`) mit der Beschreibung (`type`) `addToFavorites` zusammen mit den Daten des Hundes, die der Nutzer zu seinen Favoriten hinzufügen möchte. Wir haben dementsprechend ein sog. `Custom Event` erzeugt, wie du [hier](https://vuejs.org/v2/guide/components-custom-events.html) nachlesen.
:::

In der `Pets.vue` fügen wir einen _listener_ (=Zuhörer) ein, der auf das Signal der Kind-Komponente wartet. Überschreibe den aktuellen `<app-dog>`-Tag mit folgendem Code:

```html
<app-dog :dog="pet" @addToFavorites=""></app-dog>
```

Bisher macht dieser Listener noch nichts. Aber wir wollen für dieses Event eine Aktion ausführen. Dafür müssen wir die Aktionen mit unserer Komponente verbinden.

::: tip 💡
Du kannst Aktionen aus Komponenten heraus anstoßen indem du `this.$store.dispatch('xxx')` aufrufst oder die `mapActions`-Hilfsfunktion nutzt. Diese verknüpft eine gleichnamige Methode in der Komponente mit den `store.dispatch`-Aufrufen.
:::

Wir werden den zweiten Weg nutzen. Importiere zuerst die `mapActions` in `Pets.vue`:

```js
import { mapActions } from 'vuex';
```

Erstelle dann einen `methods`-Block in der Komponente und füge dort die `mapActions` hinzu. (Dazu nutzen wir den [ES6 spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).)

```js
methods: {
  ...mapActions(["addToFavorites"])
},
```

::: tip 💡
Indem wir `mapActions` mit einem Parameter aufrufen, definieren wirr, welche Aktionen von unserem Store geholt werden. Bisher haben wir in dieser Liste nur `addToFavorites`, in der Zukunft könnte diese Liste allerdings wachen. Du brauchst nicht immer alle Aktionen von deinem Store in einer einzelnen Komponente. Deswegen benennen wir alle, die wir brauchen, in der Liste von `mapActions`. Mehr Informationen findest du [hier](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components).
:::

Diese Methode rufen wir jetzt auf, wenn das `addToFavorites`-Signal von `app-dog` gesendet wird. Bearbeite den `<app-dog>`-Tag in `Pets.vue`:

```html
<app-dog :dog="pet" @addToFavorites="addToFavorites"></app-dog>
```

Klicke nun auf die `Add to Favorites`-Buttons. Du kannst sehen, dass die Zahl in dem Badge sich erhöht. Öffne die Favoritenliste, in dem du auf ihr Icon klickst, und schau dir die Hunde in der Liste an.

## Die Logik verbessern

Bisher können wir jeden Hund mehrmals auf die Liste setzen. Aber wir haben ja gar nicht fünf Maxs! Um das zu verbessern, überprüfen wir erst den Payload in der Mutation in `store.js` bevor wir den Hund der Liste hinzufügen. Der Hund wird nur hinzugefügt, wenn er nicht bereits in der Liste ist:

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
import { mapActions } from 'vuex';
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

Jetzt kannst du Hunde der Liste hinzufügen oder entfernen!

**Whew! Kapitel 4 ist abgeschlossen!**

# Ergebnis

![chapter 4 final](./images/petshop_chapter4.jpg)
