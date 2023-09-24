# 📋 Kapitel 5: Ein Formular zum Adoptieren hinzufügen

| **Ziel**                   | Implementiere ein Formular, um einen Hund zu adoptieren                                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Was du lernen wirst**    | Formulare in einer Vue-App erstellen und validieren                                                                                                                                                                                                                                                    |
| **Was du dafür benötigst** | Einen modernen Browser, z.B. Google Chrome. Ein Account bei CodeSandbox.io. Falls du nicht mehr weißt, wo du warst, kannst du die Basis für dieses Kapitel von [hier](https://github.com/FrontEndFoxes/projects/tree/main/chapter-4-end) importieren. Wie das geht, steht im [Anhang 1](appendix_1.md) |
| **Dauer**                  | 1 Stunde                                                                                                                                                                                                                                                                                               |

## Anleitung

Falls du das Projekt von vorn beginnen musst, klone [dieses Projekt](https://github.com/FrontEndFoxes/projects/tree/main/chapter-4-end) in Code Sandbox, nachdem du dich eingeloggt hast. Dafür klickst du auf den Link **Import form Github** unten links auf der Hauptseite und fügst die URL des Repositories in das Feld. Du kannst ebenfalls mit dem Projekt fortfahren, dass du in [Kapitel 4](ch4.md) erstellt hast.

In diesem Kapitel implementieren wir ein Formular, das man ausfüllen kann nachdem man Hunde auf die Favoriten-Liste gesetzt hat.
Zuerst müssen wir eine neue Komponente erstellen, die dieses Formular beinhaltet, und eine neue Route für dieses Formular im Router konfigurieren.

## Gerüst für die Formular-Komponente

Erstelle eine neue Datei `Form.vue` im `views`-Ordner.

Schreibe den `<template></template>` in die neue Datei. Füge ein `div`-Tag hinzu und schreibe dort hinein den Text `This form works!`. So sollte die Komponente jetzt aussehen:

```html
<template>
	<div>
		This form works!
	</div>
</template>
```

Jetzt kommt die Route für diese neue Komponente. Importiere die `Form`-Komponente in `main.js`:

```js
import Form from './views/Form';
```

Füge eine neue Option in der `routes`-Liste hinzu:

```js
{ path: "/form", component: Form }
```

Überprüfen wir mal, wie das funktioniert. Rufe die `/form`-Route auf, indem du `/form` and die Shop-URL anhängst. Du solltest den Text 'This form works!' zwischen dem Header und Footer sehen.

Fügen wir eine Klasse an das `div`, um es etwas zu gestalten.

```html
<div class="form-wrapper">
	This form works!
</div>
```

Füge einen `<style scoped></style>` Block unter den `<template>` Block ein. In diesem Tag werden wir ein paar Styles für unsere Formular-Komponente definieren. Zuerst ein Padding (=innerer Rand) für `form-wrapper`:

```css
<style scoped>
	.form-wrapper {
		padding: 40px;
	}
</style>
```

## Das Formular bauen

Jetzt ist es an der Zeit das eigentliche Formular zu bauen. Wir werden dafür die Vuetify-Komponente `v-form` nutzen.

::: tip 💡
Mehr über Vuetify-styled Formulare kannst du in der [Dokumentation](https://vuetifyjs.com/en/components/forms) nachlesen.
:::

Als erstes fügen wir eine leere `v-form` in den `form-wrapper` ein:

```html
<template>
	<div class="form-wrapper">
		<v-form> </v-form>
	</div>
</template>
```

So wird natürlich noch nichts angezeigt. Dazu müssen wir Formularfelder hinzufügen.

Für die Formularfelder nutzen wir die Vuetify-Komponente namens `v-text-field`. Diese hat ein Attribut `label`, mit dem wir ein Label (=Beschreibung/Namen) für das Feld definieren können. Wir erstellen Felder mit den Namen "Name", "Email" und "Phone" in `v-form`:

```html
<div class="form-wrapper">
	<v-form>
		<v-text-field label="Name"></v-text-field>
		<v-text-field label="Email"></v-text-field>
		<v-text-field label="Phone"></v-text-field>
	</v-form>
</div>
```

Sieht schon besser aus!

## Einen Absenden-Button hinzufügen

Irgendwie muss das Formular abgeschickt werden. Dafür fügen wir einen Absenden (=submit) Button unter die Formularfelder ein:

```html
<div class="form-wrapper">
	<v-form>
		<v-text-field label="Name"></v-text-field>
		<v-text-field label="Email"></v-text-field>
		<v-text-field label="Phone"></v-text-field>
		<v-btn>Submit</v-btn>
	</v-form>
</div>
```

Unser Button ist erstmal links ausgerichtet. Um ihn zu zentrieren, schreiben wir `text-align: center` in die `form-wrapper` Styles:

```css
.form-wrapper {
	padding: 40px;
	text-align: center;
}
```

Der `Submit`-Button macht erstmal noch nichts. Wir werden eine Methode hinzufügen, die alle Werte der Formularfelder in der Konsole ausgibt. Dafür müssen wir eine Property für jedes Feld in den Komponenten-`data` schreiben und diese mit den Feldern über die `v-model`-Direktive verknüpfen.

::: tip 💡
Die `v-model`-Direktive erzeugt eine bi-direktionale Verknüpfung zwischen Formular- und Textfeld-Elemente. Sie wählt automatisch den richtigen Weg basierend auf dem Feldtyp, um den Wert zu aktualisieren.
:::

## Daten-Verknüpfung

::: tip 💡
Was bedeutet `bi-direktionale Verknüpfung`? Das bedeutet, dass wir das `data`-Attribut entweder direkt über die verknüpfte Komponente oder innerhalb der Komponente selbst verändern können und der neue Wert wird automatisch an beiden Stellen aktualisiert.
:::

Fügen wir einen `<script></script>`-Block über die Styles ein, füge das `export dfault` ein und implementiere die `data`-Komponente (`data` sollte eine Funktion sein, die ein Objekt liefert):

```js
<script>
	export default {
	  data() {
	    return {

	    }
	  }
	}
</script>
```

Jetzt fügen wir die neuen Properties dem Objekt hinzu:

```js
data() {
	return {
	    name: "",
	    email: "",
	    phone: ""
	};
	}
```

Wie du siehst, sind alles zunächst leere Texte (=string).

Verknüpfe diese Properties mit den entsprechenden Formularfeldern im Template indem du die `v-model`-Direktive hinzufügst:

```html
<v-form>
	<v-text-field label="Name" v-model="name"></v-text-field>
	<v-text-field label="Email" v-model="email"></v-text-field>
	<v-text-field label="Phone" v-model="phone"></v-text-field>
	<v-btn>Submit</v-btn>
</v-form>
```

Ändere jetzt den Wert der `name`-Property in `data` anstelle des leeren Textes (z.B. zu deinem eigenen Namen). Das Formularfeld hat sich verändert! Wenn du etwas in das Textfeld schreibst, wird die verknüpfte `data`-Property ebenfalls aktualisiert. So funktioniert bi-direktionale Verknüpfung.

Jetzt können wir die Eingaben aus dem Formular in der Konsole ausgeben, wenn das Formular abgeschickt wird. Dafür implementieren wir eine Methode (erstelle die `methods` direkt nach der `data`-Funktion, vergiss nicht das Komma nach der schließenden Klammer von `data`):

```js
methods: {
  submit() {
    console.log(
      "Name:",
      this.name,
      "Email:",
      this.email,
      "Phone:",
      this.phone
    );
  }
}
```

and verknüpfe es mit dem Klick auf den Submit-Button:

```html
<v-btn @click="submit">Submit</v-btn>
```

Fülle das Formula mit Testdaten aus und klicke auf `Submit`. Du kannst sehen, dass die Daten aus dem Formular in der Code Sandbox Konsole ausgegeben werden.

## Die abgeschickten Informationen anzeigen

Ausgaben in der Konsole sind schon ganz gut, aber so sollte das nicht in der fertigen App funktionieren. Anstatt die Werte in der Konsole auszugeben, zeigen wir sie anstelle des Formulars an. Zuerst brauchen wir natürlich einen Indikator, der überprüft, ob das Formular bereits abgeschickt wurde.

Dafür erstellen wir eine neue Property in `data` names `submitted` und setzen diese initial auf `false` (wenn die Komponente erstellt wird, sollte das Formular noch nicht abgeschickt sein):

```js
data() {
  return {
    name: "",
    email: "",
    phone: "",
    submitted: false
  };
},
```

Jetzt müssen wir `submitted` auf `true` setzen, wenn das Formular abgeschickt wird. Diese Logik fügen wir in die `submit`-Methode ein anstelle der `console.log`-Befehle:

```js
methods: {
  submit() {
    this.submitted = true;
  }
}
```

Jetzt müssen wir noch ein `div` erstellen, das das Formular ersetzt. Kopiere diesen Code über das `<v-form>`-Tag:

```html
<div class="text-xs-center">
	<h2>Thank you for you interest, we will contact you soon</h2>
	<div class="details text-xs-left">
		<h3 class="blue-grey--text">Customer details</h3>
		<p><strong>Name:</strong> {{name}}</p>
		<p><strong>Email:</strong> {{email}}</p>
		<p><strong>Phone:</strong> {{phone}}</p>
	</div>
	<v-btn to="/">Go to homepage</v-btn>
</div>
```

und füge dafür ein paar Styles ein in den `<style>`-Tag:

```css
.details {
	padding-top: 30px;
}
h3 {
	padding-bottom: 20px;
}
```

## Daten von einer Bedingung abhängig anzeigen

Jetzt sehen wir sowohl das `div` mit unseren Informationen aus dem Formular als auch das Formular selbst. Das sieht komisch aus.

Wir wollen sie abhängig von einer Bedingung anzeigen lassen. Wir werden das `div` anzeigen, wenn `submitted` `true` ist; ansonsten wird das Formular angezeigt.

Also fügen wor ein `v-if="submitted"` dem `div` und ein `v-else` dem Formular `v-form` hinzu:

```html
<div class="text-xs-center" v-if="submitted">
	...
</div>
<v-form v-else>
	...
</v-form>
```

Jetzt wird das Formular nach dem Abschicken versteckt und die zuvor eingegebenen Informationen werden angezeigt.

## Validierung hinzufügen

Jetzt fehlt noch eine richtige Validierung für das Formular. Zunächst bauen wir aber erstmal einen Button ein, der zum Formular führt. Öffne die `Favorites.vue` und kopiere folgenden Code nach dem schließenden `</v-list-item>`-Tag.

```html
<v-btn to="/form">Adopt</v-btn>
```

Super! Jetzt können wir ganz einfach zum Formular navigieren. Die Validierung fehlt trotzdem noch. Im Moment können wir einfach irgendetwas in das E-Mail-Feld eintragen oder Buchstaben als Telefonnummer abschicken. Wir können sogar ein leeres Formular abschicken!

Um das zu ändern, müssen wir erstmal eine neue `data`-Property namens `valid` hinzufügen und diese mit der `v-model`-Direktive mit der `v-form`verknüpfen. Bearbeite in `Form.vue` das `data`-Objekt:

```js
data() {
	return {
	    name: "",
	    email: "",
	    phone: "",
	    submitted: false,
	    valid: true
	};
},
```

Verknüpfe das Formular mit der neuen `valid`-Property:

```html
<v-form v-else v-model="valid"></v-form>
```

Wir deaktivieren den Abschicken-Button, solange die eingegebenen Informationen nicht valide sind:

```html
<v-btn @click="submit" :disabled="!valid">Submit</v-btn>
```

Jetzt können wir Validierungsregeln schreiben.

::: tip 💡
Alle Eingabefelder in der `v-form` haben eine `rules`-Property, die eine Liste von Funktionen entgegen nimmt. Sobald sich der Eingabewert eines Feldes ändert, erhalten alle Funktionen in dieser Liste den neuen Wert. Die Validierung schlägt fehlt, sobald eine dieser Funktionen `false` oder einen String zurück liefert. Vuetify wird diese Ergebnisse dafür benutzen, um das `v-model` auf `true` oder `false` zu setzen. Indem wir also das Attrribut `v-model="valid"` in unserem Tag `v-form`, werden wir wissen, ob `data` in unserem Formular valide ist oder nicht. Wir werden diese Information benutzen, um den Submit Button zu deaktivieren, falls notwendig. Aktuell wäre unser Button niemals deaktiviert, da wir noch keine Regeln geschrieben haben, um das `v-model` zu validieren - daher ist die Form immer valide.
:::

## Validierung 1: Name

Zuerst wollen wir ein leeres `name`-Feld verbieten. Dazu schreiben wir eine `nameRules`-Eigenschaft in unsere `data`:

```js
data() {
  return {
    name: "",
    email: "",
    phone: "",
    submitted: false,
    valid: true,
    nameRules: []
  };
},
```

Jetzt kommt die erste Regel. Denk dran, Validierungsregeln sind Funktionen, die den Wert des Feldes erhalten und einen Bool'schen Wert zurück geben; `true` bedeutet, dass das Feld einen korrekten/validen Wert beinhaltet, `false` bedeutet, dass der Wert nicht korrekt ist. Also sieht die erste Regel so aus:

```js
nameRules: [(name) => !!name];
```

Was passiert hier? `!name` gibt `true` zurück, wenn der Name leer ist und andernfalls `false`. Mit der zweiten Verneinung kehren wir das noch einmal um. Die doppelte Verneinung wird oft genutzt, um zu überprüfen, ob ein String nicht-leer ist.

Füge `nameRules` zu der `rules`-Property des `name`-Feldes hinzu und markiere das Feld zusätzlich als `required` (=Pflichfeld):

```html
<v-text-field label="Name" required :rules="nameRules" v-model="name"></v-text-field>
```

Klicke jetzt in das Name-Feld und dann in ein anderes. Du sieht, wie Name rot wird und darunter der Text `false` erscheint. (Der Submit-Button ist immer noch deaktiviert.)

Fehlermeldungen können mit Hilfe des `||`-Operators in der Regel ergänzt werden. Der Wert der Validierung ist also `false OR <Fehlermeldung>`. Lass uns die Fehlermeldung für das Name-Feld verbessern:

```js
nameRules: [(name) => !!name || 'Name is required'];
```

Jetzt sieht die Fehlermeldung doch schon besser aus!

Wir fügen eine weitere Regel hinzu: Ein Name darf nicht kürzer als zwei Buchstaben sein:

```js
nameRules: [
	(name) => !!name || 'Name is required',
	(name) => name.length > 2 || 'Name must be longer than 2 characters',
];
```

Schreibe nur einen Buchstaben in das Name-Feld, die neue Fehlermeldung sollte angezeigt werden.

## Validierung 2: Email

Jetzt wechseln wir zum E-Mail-Feld. Zuerst erstellen wir die `emailRules`-Property in `data` und fügen den nicht-leeren Check wie zuvor auch beim Namen hinzu:

```js
emailRules: [(email) => !!email || 'Email is required'];
```

Vergiss nicht `required` und die `rules`-Property an das E-Mail-Feld zu schreiben:

```html
<v-text-field label="Email" required :rules="emailRules" v-model="email"></v-text-field>
```

Die zweite Regel für das E-Mail-Feld ist etwas komplizierter. Wir wollen überprüfen, ob die eingegebene E-Mail einem bestimmten Muster entspricht, diese Muster heißen _Reguläre Ausdrücke_ (=regular expressions / RegEx).

::: tip 💡
Reguläre Ausdrücke sind Muster, die Strings auf bestimmte Buchstaben/Zahlen-Kombinationen überprüfen. In JavaScript sind Reguläre Ausdrücke auch Objekte.

Mehr Informationen zu RegEx kannst du in diesem [MDN Artikel](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) nachlesen.
:::

Füge den Regulären Ausdruck zu den Validierungsregeln hinzu:

```js
emailRules: [
	(email) => !!email || 'Email is required',
	(email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'Email must be valid',
];
```

Gebe jetzt irgendwelche zufälligen Zeichen im E-Mail-Feld ein. Du siehst die Fehlermeldung; eine E-Mail muss ein `@`-Zeichen, einen Punkt und mindestens zwei Zeichen nach dem Punkt haben. Wenn du versuchst, deine eigene E-Mail-Adrresse einzufügen, wirst du sehen, dass ein Fehler angezeigt wird.

## Validierung 3: Telefon

Jetzt wechseln wir zum `phone`-Feld. Wir erstellen ein ähnliches Regelset wie für `name`. Die Telefonnummer sollte mindestens sieben Zeichen lang sein:

```js
phoneRules: [
	(phone) => !!phone || 'Phone is required',
	(phone) => phone.length >= 7 || 'Phone number should be at least 7 digits',
];
```

Aber man kann immer noch Buchstaben eingeben. Und die Telefonnummer wird nicht formatiert. Um das zu erreichen, werden wir die `vue-the-mask` hinzufügen. Dafür klicke in Code Sandbox auf den Reiter `Explorer` -> `Dependencies` -> `Add Dependency` und suche nach `vue-the-mask`. Wenn du es installiert hast, wirst du sehen, dass es zu deiner `package.json` hinzugefügt wurde. Nun wurde `vue-the-mask` installiert, wir müssen es nun noch der Komponente als Direkte hinzufügen.

Als erstes, fügst du `vue-the-mask` in deiner `Form.vue` hinzu:

```js
import { mask } from 'vue-the-mask';
```

Im Anschluss, fügst du die Direktive direkt vor `data` in deinem `<script>` Block hinzu:

```js
directives: {
  mask,
},
```

::: tip 💡
Indem das Objekt `directives` unserer Komponent mit einem Element `mask` hinzugefügt wurde, registieren wir `mask` in dieser Komponente. Das bedeutet, dass wir von nun an, in dieser Komponent, `v-mask` bei jedem beliebigen Element verwenden können. Alle Direktiven in Vue besetzen das Kürrzel `v-` am Anfang, Daher wird aus der Direktive `mask` dann automatisch `v-mask`. Mehr Information findest du [hier](https://vuejs.org/v2/guide/custom-directive.html).
:::

Nachdem wir nun `v-mask` als Direktive zur Verfügung stehen haben, können wirr folgendes in unser Tag `v-text-field` hinzufügen:

```html
v-mask="'(###) ### - ####'"
```

Indem wir `'(###) ### - ####'` als Input für die Maske benutzen, limitieren wir die Möglichkeiten der Eingabe zu Ziffern in diesem spezifischen Format. Das bedeutet, dass es möglich ist Nummern wir `(555) 555-1234` einzugeben, nicht aber Ziffern in einem anderen Format oder Charaktere, die keine Ziffern sind. Sollte dein Land ein anderes Format benutzen, ändere es nun gerne ab.

Im Ganzen sollte das Tag nun folgendermaßen aussehen:

```html
<v-text-field label="Phone" required :rules="phoneRules" v-mask="'(###) ### - ####'" v-model="phone"></v-text-field>
```

Jetzt kannst du nur Zahlen eingeben und die Telefonnummer wird direkt formatiert.

## Lösche alle Favoriten beim Absenden des Formulars

Als letztes möchten wir noch die Favoritenliste wieder leeren, wenn wir das Formular absenden. Gehe dazu in `store/store.js` und kopiere den folgenden Code in das `mutations`-Objekt:

```js
clearFavorites(state) {
  state.favorites = [];
}
```

Füge die Aktion zum Aufrufen der neuen Mutation zu `actions` hinzu:

```js
clearFavorites({ commit }) {
  commit("clearFavorites");
}
```

Gehe zurück in die `Form.vue`-Datei und rufe die neue Aktion in der `submit`-Methode auf:

```js
submit() {
  this.$store.dispatch("clearFavorites");
  this.submitted = true;
}
```

Jetzt wird die Favoritenliste geleert, nachdem das Formular abgesendet wird.

**🎊Herzlichen Glückwunsch, du hast das Projekt abgeschlossen!🎊**

## Ergebnis

![chapter 5 final](./images/petshop_chapter5.jpg)
