# 🖥️ 1 : Créer une petite application Web de récupération d'images d'animaux de compagnie

| **But du projet**                             | Démarrer avec les bases de Vue.js et les appels API simples                                                                                                                                 |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ce que vous apprendrez**                    | Configuration de votre application Vue, principes de base des composants, exécution d'appels API REST simples à l'aide d'Axios                                                              |
| **Outils dont vous aurez besoin**             | Un navigateur moderne comme Chrome. Un accès à [CodeSandbox](https://codesandbox.io) (assurez-vous de créer un compte dans CodeSandbox pour garder les versions de votre travail intactes.) |
| **Temps nécessaire pour terminer**            | 1 heure                                                                                                                                                                                     |
| **Vous voulez juste essayer l'application ?** | [lien vers CodeSandbox](https://codesandbox.io/s/web-1-mini-workshop-koj8w)                                                                                                                 |

# Instructions

## Créez votre application

Nous partirons de zéro dans [CodeSandbox](http://codesandbox.io). Créez un compte CodeSandbox et utilisez un template de démarrage Vue.js en cliquant [ici](https://codesandbox.io/s/vue).

Nous allons créer une application pour charger des images aléatoires de chiens et les stocker dans une liste de favoris :

![random dog app](./images/mini2_1.png)

Jetez un œil au code qui a été créé par CodeSandbox pour une application de base Vue.js. Le fichier `main.js` est ouvert par défaut. Il s'agit du point de départ principal d'une application Vue.js. Notez que dans ce fichier vous importez Vue depuis son package npm : `import Vue from "vue";`. CodeSandbox importe toutes les dépendances nécessaires à partir de npm pour créer l'application. Vous pouvez toujours consulter le fichier racine `package.json` pour savoir quelles dépendances sont nécessaires.

`main.js` initialise également l'application en tant que nouvelle application Vue.js et définit la div dans laquelle le code de l'application sera injecté.

```js
new Vue({
	render: (h) => h(App),
}).$mount('#app');
```

Ouvrez `App.vue`. Dans ce fichier, le composant 'home' est construit. Il contient les trois parties principales d'un composant monofichier Vue.js (Single File Component) : un modèle, un bloc de script et un bloc de style.

Notez que la première div dans le bloc template a l'ID _app_, c'est la div où le code de l'application sera injecté. Il y a aussi un composant `<HelloWorld>` inclus sous l'image du logo. Ceci est un exemple d'un composant monofichier inclus dans `App.vue`.

Ouvrez `components/HelloWorld.vue` et vous trouverez la source de la liste des liens qui apparaissent intégrés dans `App.vue`. Ce fichier comprend également un bloc de script avec une variable `msg` et quelques autres styles dans un bloc `<style>`.

Nous allons découper cet exemple d'application et le recréer !

## Ajouter les styles

Commençons par `App.vue`, car nous n'avons pas à apporter de modifications à `main.js`. Ajoutez le bloc de style suivant en bas du fichier, en remplaçant le bloc `<style>` actuel :

```css
<style>
img {
  max-width: 100%;
}

h1 {
  padding-bottom: 15px;
}

.dogs-layout {
  width: 100%;
  background: #fff center repeat;
  background-image: url("https://github.com/VueVixens/projects/blob/master/petshop/images/bg3.jpg?raw=true");
}

.dogs-overlay {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .dogs-overlay {
    margin: 0;
  }
}

.dog-card {
  width: 100%;
  max-width: 600px;
}
</style>
```

::: tip 💡
Notez que nous n'utilisons pas `<scoped>` dans le bloc de style. Le mot clé 'scoped' garantit que vos styles resteront valables uniquement pour le composant monofichier actuel, mais nous allons rendre ces styles universels.
:::

Ce bloc de style utilise un chemin vers une image externe hébergée sur Github, plutôt que vers un chemin relatif. En effet, CodeSandbox n'héberge pas facilement les images ; normalement, vous ajouteriez simplement une image sur un chemin relatif tel que `/images/monImage.png`.

L'ajout de la feuille de style n'a pas fait grand-chose à notre template, à part casser les styles existants. Corrigeons le !

::: warning ☕️ Pause! ☕️
C'est un bon moment de rejoindre un 'breakout room' sur Zoom!
:::

## Installer Vuetify

Avant de modifier le template, nous allons installer Vuetify. Vuetify est une bibliothèque populaire qui donne un style Material Design à vos applications Vue.

::: tip 💡
Vuetify est un framework de composants sémantiques pour Vue. Il vise à fournir des composants propres, sémantiques et réutilisables pour la construction de votre application. Vous pouvez trouver une documentation complète à ce sujet [sur leur site](https://vuetifyjs.com/en/getting-started/quick-start).
:::

Installez-le en cliquant sur le bouton « Add Dependency » dans la liste déroulante « Dependency » à gauche dans CodeSandbox. Recherchez « Vuetify ».

Cliquez ensuite sur la bibliothèque dans la liste pour l'installer.

Vérifiez si la dépendance est installée en ouvrant le fichier `package.json` et en vérifiant l'objet « dependencies ». Ça devrait ressembler à cela :

```json
"dependencies": {
    "vue": "^2.6.10",
    "vuetify": "^2.0.19"
},
```

Vuetify fonctionne via une structure de plugin. Dans le dossier `/src` de votre projet, créez un nouveau dossier appelé `plugins` et à l'intérieur de celui-ci un nouveau fichier appelé `vuetify.js`.

::: tip 💡
Dans CodeSandbox, faites un clic droit sur le nouveau dossier pour créer un nouveau fichier. Faites attention à bien les créez dans le dossier `/src` !
:::

Dans le nouveau fichier `vuetify.js`, ajoutez ce code pour initier le plugin:

```js
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

export default new Vuetify();
```

Ensuite, initialisez Vuetify en ouvrant le fichier `main.js` et en ajoutant ces lignes sous le deuxième `import` (ligne 3) :

```js
import vuetify from '@/plugins/vuetify';
```

Ensuite, modifiez l'initialisation de Vue en bas de `main.js` comme ceci :

```js
new Vue({
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
```

Cela garantit que les thèmes et composants de Vuetify seront disponibles dans l'application Vue.

Nous allons utiliser des icônes dans cette application, nous devons donc également ajouter les icônes Material Design dans la partie `head` du fichier `index.html`. Ce fichier se trouve dans le dossier `public`. Insérez cette ligne après la balise `<title>`:

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet" />
```

Modifions également le titre de la page en `Amoureux des chiens`. Pour ce faire, nous devons changer le contenu de la balise `title`:

```html
<title>Amoureux des chiens</title>
```

Ensuite, écrasez le template actuel dans `App.vue` avec ce code :

```html
<template>
	<v-app>
		<v-main class="dogs-layout">
			<v-container fill-height>
				<div class="dogs-overlay">
					<h1 class="display-2 text-xs-center">Choisissez vos chiens préférés</h1>
					<v-card class="dog-card">
						<v-img height="400px"></v-img>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-icon>favorite</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>forward</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</div>
			</v-container>
		</v-main>
	</v-app>
</template>
```

Votre application devrait s'être actualisée (si ce n'est pas le cas, utilisez le bouton d'actualisation dans la barre d'adresse d'aperçu de l'application). Wow, cela a fait un sacré changement !

::: tip 💡
Notez l'utilisation de `<v-app>` dans ce code, c'est un pré-requis de Vuetify et c'est un signe certain que vous aurez une application faite avec Vuetify. Nous utilisons également un tas d'éléments de présentation Vuetify comme `v-container` et des composants d'interface utilisateur comme`v-card` et `v-btn`.
:::

## Ajouter des données

À ce stade, nous devons commencer à remplir notre interface utilisateur avec des données. La première chose que nous voulons faire est d'afficher une image de chien à l'intérieur de notre `v-card`. Ajoutons un lien statique juste pour tester son apparence. Dans le fichier `App.vue`, modifiez la propriété `src` de `v-img` :

```html
<v-img height="400px" src="https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"></v-img>
```

Comme c'est mignon ! 🐶

Mais l'idée est de rendre ce lien dynamique, il est donc temps de créer votre première variable Vue. Tout d'abord, vous devez ajouter `data()` à votre composant Vue. Cette fonction doit renvoyer un objet de nos variables Vue. Créons-en une dans le bloc `<script>`. Remplacez le bloc `<script>` actuel dans `App.vue` :

```js
<script>
export default {
  data() {
    return {
      currentDogLink: ""
    };
  }
};
</script>
```

::: tip 💡
À ce stade, vous pouvez supprimer le fichier `HelloWorld.vue` du dossier `components` car nous n'en aurons pas besoin. Cliquez avec le bouton droit sur le fichier dans CodeSandbox et cliquez sur « delete ».
:::

Vous avez maintenant une variable appelée `currentDogLink` et sa valeur par défaut est une chaîne vide. Nous utiliserons cette variable pour fournir un lien vers l'image de chien dans `v-img`. Tout d'abord, nous allons définir la valeur de `currentDogLink` en écrasant le bloc de données que nous venons d'ajouter dans`App.vue` :

```js
data() {
  return {
    currentDogLink: "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
  };
}
```

Maintenant, nous devons modifier le template pour rendre la propriété `src` _dynamique_ afin qu'elle puisse utiliser la valeur de la variable que nous venons de créer ci-dessus. Pour ce faire, nous avons besoin d'une directive `v-bind` ou de son raccourci `:`. Encore une fois dans `App.vue`, modifiez la balise`<v-img>`pour supprimer sa valeur codée en dur :

```html
<v-img height="400px" :src="currentDogLink"></v-img>
```

::: tip 💡
La directive `v-bind` lie dynamiquement un ou plusieurs attributs, ou une propriété de composant à une expression. Ce petit `:` fait toute la différence !
:::

Génial ! Il est maintenant temps de charger des images de chiens depuis une API !

::: warning ☕️ Pause! ☕️
C'est un bon moment de rejoindre un 'breakout room' sur Zoom!
:::

## Ajouter Axios

Pour effectuer des appels API, nous aurons besoin d'une bibliothèque appelée [Axios](https://github.com/axios/axios). Il s'agit d'un client HTTP basé sur les promesses qui fonctionne à la fois dans le navigateur et dans d'autres environnements node.js.

::: tip 💡
À l'origine, Vue supportait sa propre façon de faire des appels API en utilisant .ajax ; mais cette ressource a été dépréciée car la bibliothèque axios fonctionnait très bien pour cela, supprimant le besoin d'une solution intégrée. En savoir plus sur cette décision [ici](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4).
:::

Tout d'abord, ajoutez la bibliothèque Axios à vos dépendances de projet. Pour ce faire, dans CodeSandbox, cliquez sur le bouton « Add Dependency » et recherchez « axios ». Installez la dernière version.

Importez Axios dans le composant où nous effectuerons notre appel d'API : `App.vue`. Dans le bloc de script de ce composant, ajoutez cette ligne juste en-dessous de `<script>` :

```js
import axios from 'axios';
```

À ce stade, votre partie script de `App.vue` devrait ressembler à ceci :

```js
<script>
import axios from "axios";
export default {
  data() {
    return {
      currentDogLink:
        "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
    };
  }
};
</script>
```

Nous sommes maintenant prêts à charger une image à partir de l'API.

## Appel API

Exécutons notre premier appel d'API. Pour ce faire, nous allons créer une _méthode_ `loadNewDog` à l'intérieur de notre composant.

::: tip 💡
La propriété `methods` est une liste de fonctions qui associées à un objet, généralement l'instance Vue elle-même ou un composant Vue.
:::

Ajoutons-la juste après la fonction `data` :

```js
data() {
  return {
    currentDogLink:
      "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
  };
},
methods: {
 loadNewDog() {}
}
```

Pour l'instant, cette méthode ne fait rien mais nous voulons qu'elle charge une nouvelle image de chien depuis l'API. Nous devons d'abord vérifier quel endpoint nous devons utiliser. En regardant la [documentation](https://dog.ceo/dog-api/) de l'API, nous apprenons que nous devons utiliser `https://dog.ceo/api/breeds/image/random`. Il fournira une image aléatoire de chien.

Pour effectuer une requête GET, Axios utilise la méthode `axios.get`. Le résultat sera une promesse JavaScript, nous devons donc fournir des fonctions de callback de réussite et d'échec pour gérer son cycle de vie. Pour l'instant, imprimons simplement le résultat de la requête dans la console. Toujours dans `App.vue`, modifiez la méthode `loadNewDog(){}` en plaçant ce code entre les accolades :

```js
axios
	.get('https://dog.ceo/api/breeds/image/random')
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.log(error);
	});
```

Nous voulons qu'une nouvelle image remplace l'ancienne lorsque le composant est créé, ajoutons donc un hook `created()` juste après `methods` :

```js
created() {}
```

::: tip 💡
Remarque : assurez-vous d'ajouter une virgule après l'objet `methods`, puis ajoutez le hook `created()` !
:::

::: tip 💡
Ceci est le premier hook de cycle de vie de notre application ! Ceux-ci sont très utiles lorsque vous souhaitez contrôler avec précision quand exécuter des blocs de code. [En savoir plus](https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie)
:::

À l'intérieur du hook créé, nous appellerons notre méthode.

```js
created() {
  this.loadNewDog();
}
```

Maintenant, après avoir cliqué sur le bouton actualiser dans la fenêtre du navigateur, vous devriez voir un objet dans votre console. Explorez-le en cliquant sur sa flèche gauche. Nous sommes intéressés par son champ `data`. Vous pouvez voir que nous avons un statut `success` et un message avec l'URL d'une image.

::: warning ☕️ Pause! ☕️
C'est un bon moment de rejoindre un 'breakout room' sur Zoom!
:::

## Utiliser l'API

Remplaçons notre `currentDogLink` par celui chargé. À ce stade, nous pouvons supprimer sa valeur statique :

```js
data() {
  return {
    currentDogLink: ""
  };
},
```

Dans la méthode `loadNewDog`, au lieu d'imprimer le résultat sur la console, nous assignerons `response.data.message` (qui est en fait l'URL de l'image) à la propriété `currentDogLink` :

```js
loadNewDog() {
  axios
    .get("https://dog.ceo/api/breeds/image/random")
    .then(response => {
      this.currentDogLink = response.data.message;
    })
    .catch(error => {
      console.log(error);
    });
}
```

Maintenant, chaque fois que vous actualiserez la page, vous aurez une nouvelle image de chien ! 🎉

Nous voulons également appeler la même méthode lorsque vous cliquez sur la flèche « Suivant ». Ajoutons un événement `click` à ce bouton. Nous pouvons utiliser la directive `v-on` ou sa syntaxe abrégée `@`. Dans le template, modifiez l'icône `forward` dans le `v-btn` :

```html
<v-btn icon @click="loadNewDog">
	<v-icon>forward</v-icon>
</v-btn>
```

Maintenant, nous pouvons charger de nouvelles images en cliquant simplement sur le bouton « Suivant ».

## Créer la liste de favoris

Nous voulons permettre à un utilisateur d'ajouter des images de chiens à une liste personnelle de favoris et d'afficher la galerie de ces images juste en-dessous de notre image de chien actuelle. Pour stocker les liens, nous avons besoin d'une autre propriété de données : un tableau appelé `favoriteDogs`. Ajoutons-le juste après `currentDogLink` et initialisons-le à vide par défaut :

```js
data() {
  return {
    currentDogLink: "",
    favoriteDogs: []
  };
},
```

Pour afficher les chiens mis en favoris, nous devons apporter des modifications à notre template. Ajoutons l'extrait de code suivant juste après la balise de fermeture `</v-card>` :

```html
<v-container grid-list-md fluid>
	<v-layout wrap>
		<v-flex xs6 sm4 md2>
			<v-card class="dog-card">
				<v-img height="150px"></v-img>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn icon>
						<v-icon>delete</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</v-container>
```

Vous pouvez voir une carte vide avec un bouton « Supprimer » juste après l'image de chien actuelle. Maintenant, nous devons trouver un moyen d'afficher les objets `favoriteDogs` à l'intérieur de ces cartes.

Pour afficher une liste d'éléments basée sur un tableau, Vue a une directive `v-for` qui parcourra ce tableau et rendra chaque élément. Ajoutons cette directive à notre balise d'ouverture `v-flex`, ce qui montrera le tableau des favoris dans le nouveau conteneur que vous venez d'ajouter :

```html
<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
```

Ici, `pet` est la référence à l'_élément de tableau actuel_ et `index` est l'_index de cet élément_ à l'intérieur du tableau.

::: tip 💡
N'oubliez pas, nous avons choisi ce nom dans la directive ; si nous avions écrit `v-for="(dog, number) in favoriteDogs"` chaque élément serait appelé `dog` et son index serait appelé `number`).
:::

Pour parcourir correctement votre tableau de chiens favoris et en ajouter un autre, vous devez fournir un attribut `key` unique pour chaque élément. Dans notre cas, l'objet `pet` lui-même sera la clé.

Vous pouvez voir que notre carte vide a disparu. C'est normal ! Nous avons un tableau vide `favoriteDogs`, donc il n'y a tout simplement rien à afficher pour le moment.

Une chose qui reste à faire est de lier `pet` (qui sera le lien de l'image) à la propriété`src` du composant `v-img` dans les cartes que vous construisez :

```html
<v-img height="150px" :src="pet"></v-img>
```

Il est maintenant temps de mettre en favoris certains chiens 💖🐶 !

::: warning ☕️ Pause! ☕️
C'est un bon moment de rejoindre un 'breakout room' sur Zoom!
:::

## Ajout aux favoris

Nous allons créer une nouvelle méthode appelée `addToFavorites`. Elle ajoutera la valeur de `currentDogLink` au tableau`favoriteDogs` (JavaScript a une méthode de tableau `push` prévue à cet effet). Plaçons-la après `loadNewDog` (n'oubliez pas la virgule !) :

```js
addToFavorites() {
  this.favoriteDogs.push(this.currentDogLink);
}
```

Et bien sûr, nous devons lier la méthode au bouton « J'aime » dans la carte du haut :

```html
<v-btn icon @click="addToFavorites">
	<v-icon>favorite</v-icon>
</v-btn>
```

Maintenant, essayez de cliquer sur le bouton « J'aime » ! Vous pouvez voir comment notre galerie se remplit d'images des chiens 🖼️

Il y a un problème : nous pouvons maintenant ajouter une image aux favoris plusieurs fois. Pour éviter cela, nous devons vérifier si le `currentDogLink` est déjà à l'intérieur du tableau `favoriteDogs`, et, s'il l'est, nous désactiverons le bouton « J'aime ». Au lieu de placer cette logique complexe à l'intérieur du modèle, nous allons créer une _propriété calculée_.

::: tip 💡
Les propriétés calculées peuvent être utilisées pour effectuer des calculs rapides des propriétés affichées dans la vue. Ces calculs seront mis en cache et ne seront mis à jour que lorsque leurs dépendances seront modifiées.
:::

Ajoutons l'objet `computed` juste après le hook `created()` (n'oubliez pas la virgule après la fermeture de `created()`) et créons une propriété nommée `isAlreadyInFavorites` dedans.

```js
  computed: {
    isAlreadyInFavorites() {}
  }
```

Toute propriété calculée doit être une fonction renvoyant le résultat des calculs. Vérifions l'index de `currentDogLink` à l'intérieur du tableau `favoriteDogs`. Si elle est supérieure à -1 (en d'autres termes si le tableau contient un tel élément), la fonction renverra `true`, sinon elle renverra`false` :

```js
computed: {
	isAlreadyInFavorites() {
	  return this.favoriteDogs.indexOf(this.currentDogLink) > -1;
	}
}
```

Maintenant, nous pouvons ajouter un attribut dynamique `disabled` au bouton « J'aime » dans la carte du dessus et le définir à `isAlreadyInFavorites`.

```html
<v-btn icon @click="addToFavorites" :disabled="isAlreadyInFavorites">
	<v-icon>favorite</v-icon>
</v-btn>
```

Essayez d'ajouter le chien aux favoris. Vous pouvez maintenant voir que le bouton « J'aime » est grisé et vous ne pouvez plus cliquer dessus.

## Suppression des favoris

Et si vous n'aimez plus une des images de chien ? Dans ce cas improbable, vous aurez besoin d'un moyen de la supprimer du tableau `favoriteDogs`. Nous avons besoin d'une méthode de plus pour cela, alors ajoutons-la après le `addToFavorites` (ajoutez une virgule après le crochet de fermeture de `addToFavorites`) :

```js
removeFromFavorites() {}
```

Bien sûr, nous devons spécifier en quelque sorte quel chien nous voulons supprimer du tableau. Heureusement, nous avons le paramètre `index`. Passons-le à notre méthode et supprimons l'élément avec l'index donné du tableau `favoriteDogs` :

```js
removeFromFavorites(index) {
  this.favoriteDogs.splice(index, 1);
}
```

::: tip 💡
Ici, la méthode `splice()` modifie le contenu d'un tableau en supprimant les éléments existants. Le premier argument est l'indice de l'élément avec lequel nous voulons commencer et le deuxième argument est le nombre d'éléments que nous voulons supprimer.
:::

Maintenant, nous devons lier cette nouvelle méthode au bouton « Supprimer » :

```html
<v-btn icon @click="removeFromFavorites(index)">
	<v-icon>delete</v-icon>
</v-btn>
```

::: tip 💡
N'oubliez pas de passer `index` à la méthode`removeFromFavorites` ! Lorsque nous ne transmettons aucun paramètre, nous pouvons simplement ignorer les parenthèses comme nous l'avons fait pour la méthode `addToFavorites`.
:::

Essayez d'ajouter et de supprimer certains chiens de vos favoris. ÇA FONCTIONNE !

**🎊 Félicitations, vous avez terminé le projet de base ! 🎊**

## Supplément 1 : Création d'un composant Dog

À ce stade, nous voulons extraire une carte de la grille des favoris dans un composant distinct pour apprendre comment les composants parents et enfants communiquent.

Nous avons un dossier `components` mais pour l'instant il est vide. Créons un nouveau fichier ici et appelons-le `Dog.vue`.

Ouvrez ce fichier et ajoutez les balises `<template></template>` et `<script></script>`. Maintenant, notre fichier ressemble à ceci :

```html
<template> </template>

<script></script>
```

Copiez maintenant tout le composant `v-card` qui contient les chiens favoris (il est près du bas, et a la classe CSS `dog-card`) depuis `App.vue` et collez-le dans la balise de modèle. Vous pouvez le supprimer de `App.vue`.

Nous avons maintenant besoin d'un moyen de transmettre l'image du chien que nous voulons voir du parent à l'enfant. Pour ce faire, Vue utilise des props.

::: tip 💡
Les props sont des attributs personnalisables que vous pouvez enregistrer dans un composant. Quand valeur est passée à un attribut prop, elle devient une _propriété_ de l'instance du composant. Dans notre cas, le composant `Dog` aura une propriété `dog`, transmise à partir de son composant parent `App`.
:::

Ajoutons une option `props` à notre composant `Dog.vue`. Tout d'abord, nous devons créer une déclaration d'exportation à l'intérieur de notre balise `script` (donc plus tard, nous pourrons importer notre composant `Dog` à l'intérieur de `App`). Ajoutez ce bloc de code à `Dog.vue` :

```html
<script>
	export default {};
</script>
```

Maintenant, nous pouvons ajouter une option `props` à cet objet et une propriété `dog`:

```html
<script>
	export default {
		props: {
			dog: {
				type: String,
			},
		},
	};
</script>
```

Ici, nous spécifions également le type de notre propriété `dog` : ce sera une chaîne de caractères contenant l'URL de l'image du chien.

Dans notre template dans `Dog.vue`, nous devons remplacer `pet` par `dog`, car nous n'avons aucun `pet` à l'intérieur du composant `Dog`, seulement une propriété `dog`. Maintenant, notre modèle devrait ressembler à ceci :

```html
<template>
	<v-card class="dog-card">
		<v-img height="150px" :src="dog"></v-img>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn icon @click="removeFromFavorites(index)">
				<v-icon>delete</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
```

Revenons maintenant à notre composant `App.vue` et apportons quelques modifications. Tout d'abord, nous devons importer notre composant `Dog` nouvellement créé dans `App.vue`. Ajoutez ce code avant l'instruction `export default` dans le bloc`<script>` :

```js
import Dog from './components/Dog';
```

Maintenant, nous devons « expliquer » au composant `App` qu'il contient un composant enfant. Vue utilise pour cela une option `components`. Ajoutons cette option au-dessus de celle de `data()` :

```js
export default {
  components: {
    appDog: Dog
  },
  data() {
    return {
      currentDogLink: "",
      favoriteDogs: []
    };
  },
```

::: tip 💡
Pour chaque propriété de l'objet `components`, la clé sera le nom de l'élément personnalisé, tandis que la valeur contiendra le composant.
:::

::: tip 💡
Pour le nom du composant, vous pouvez utiliser l'écriture camel-case (`appDog`) ou kebab-case (`'app-dog'`). Gardez à l'esprit qu'un nom écrit en camel-case sera « traduit » en écriture kebab-case dans les noms de balises HTML. Nous allons donc utiliser la balise HTML personnalisée `<app-dog>` et elle rendra un composant `Dog`.
:::

Dans `App.vue`, placez la balise personnalisée dans l'espace où vous avez supprimé la carte plus tôt, en écrasant la balise `<v-flex>` :

```html
<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
	<app-dog></app-dog>
</v-flex>
```

Nous devons passer une propriété `dog` à notre composant `Dog`. Cela se fait avec la directive `v-bind` (rappelez-vous, vous pouvez utiliser sa syntaxe abrégée `:`). Modifiez le code que vous venez d'ajouter à `App.vue` :

```html
<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
	<app-dog :dog="pet" @remove="removeFromFavorites(index)"></app-dog>
</v-flex>
```

Maintenant, si vous essayez d'ajouter un chien aux favoris, vous verrez à nouveau les chiens dans la grille ! Mais nous avons un problème : la suppression d'un chien entraînera un tas d'erreurs dans la console. La raison est que nous n'avons pas de méthode `removeFromFavorites` à l'intérieur de `Dog.vue` et qu'il ne sait rien du tout sur `index`.

Au lieu d'utiliser la méthode, nous la remplacerons par un _émetteur d'événement_ sur le bouton `delete` à l'intérieur du composant Dog.

```html
<v-btn icon @click="$emit('remove')"></v-btn>
```

En utilisant `$emit`, nous envoyons un message à notre composant parent (dans ce cas, c'est `App.vue`): « Bonjour, quelque chose se passe ici ! Veuillez lire ce message et y réagir ».

Maintenant, lorsque le composant `Dog` émet l'événement `remove` (c'est-à-dire lorsque vous cliquez sur le bouton « Supprimer »), son composant parent `App` appellera la méthode `removeFromFavorites` (qui supprime un chien du tableau de favoris).

**🎊 Vous avez terminé le supplément 1 ! 🎊**

## Supplément 2 : Ajout d'animations

Rendons maintenant notre application plus attrayante en y ajoutant des effets d'animation.

::: tip 💡
Vue fournit un composant wrapper `transition`, vous permettant d'ajouter des transitions d'entrée / sortie pour tout élément ou composant dans les contextes suivants :

-   Rendu conditionnel (en utilisant `v-if`)
-   Affichage conditionnel (en utilisant `v-show`)
-   Composants dynamiques
-   Nœuds racine des composants
    :::

Essayons d'animer l'image de chien actuelle. Tout d'abord, nous devons lui ajouter une directive `v-if` pour fournir le contexte approprié pour la future transition. Dans `App.vue`, modifiez la carte principale :

```html
<v-img v-if="currentDogLink" height="400px" :src="currentDogLink"></v-img>
```

Mais maintenant, `currentDogLink` retournera toujours `true` ! Mettons la chaîne à vide à chaque fois que nous cliquons sur le bouton « Suivant », donc avant que l'image suivante ne soit chargée, `currentDogLink` retournera`false` :

```js
loadNewDog() {
  this.currentDogLink = "";
  axios.get("https://dog.ceo/api/breeds/image/random").then(response => {
    this.currentDogLink = response.data.message;
  });
},
```

Vous pouvez maintenant observer cet effet laid : l'image disparaît à chaque fois que l'utilisateur clique sur « Suivant ». Nous allons corriger cela avec l'effet d'animation de fondu. Enveloppons le `v-img` dans une balise `<transition>`et mettons un attribut nom avec comme valeur `fade`.

```html
<transition name="fade">
	<v-img v-if="currentDogLink" height="400px" :src="currentDogLink"></v-img>
</transition>
```

Cela nous donnera un tas de classes CSS à partir de `fade-`. Il y aura `enter` / `leave` qui sont les positions avec lesquelles commence l'animation sur la première image, `enter-active` / `leave-active` pendant que l'animation est en cours d'exécution (c'est celle avec laquelle vous placez les propriétés d'animation elles-mêmes), et `enter-to` / `leave-to`, qui spécifient où l'élément doit être sur la dernière image.

Maintenant que nous avons nos hooks, nous pouvons créer la transition en les utilisant. Modifiez le CSS dans `App.vue` en ajoutant les classes suivantes :

```css
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1s ease;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
```

Les classes `.fade-enter-active` et `.fade-Leave-active` seront les endroits où nous appliquerons la transition réelle. Ce n'est rien de spécifique à Vue, juste du CSS normal. La propriété `ease` spécifie un effet de transition avec un démarrage lent, puis rapide, puis se terminant lentement.

Vous pouvez maintenant voir que l'image du chien a un bel effet de fondu lorsque vous cliquez sur « Suivant » !

Ajoutons également quelques effets à notre grille de favoris. Pour animer la liste rendue avec `v-for`, Vue utilise la balise`transition-group`.

::: tip 💡
Contrairement à `<transition>`, `transition-group` rend un élément réel : une balise `<span>` par défaut. Vous pouvez modifier l'élément rendu avec l'attribut tag.
Les éléments à l'intérieur doivent toujours avoir un attribut `key` unique.
:::

Dans `App.vue`, remplacez le composant `<v-layout>` entourant le composant imbriqué `<app-dog>` par `v-transition-group` et définissez-lui une classe et une balise appropriés :

```html
<transition-group name="slide" tag="v-layout" class="wrap">
	<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
		<app-dog :dog="pet" @remove="removeFromFavorites(index)"></app-dog>
	</v-flex>
</transition-group>
```

`transition-group` sera maintenant rendu en tant que composant `v-layout`. La classe `wrap` est nécessaire pour encapsuler les éléments de la grille à la ligne suivante (elle remplace l'attribut `wrap` de `v-layout`). Nous avons également donné à notre nouvelle transition le nom `slide`.

Maintenant, nous pouvons utiliser des classes CSS pour décrire la transition des diapositives. Ajoutez ces classes au CSS dans `App.vue` :

```css
.slide-enter-active {
	transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(10px);
	opacity: 0;
}
```

Génial ! Nous avons une belle animation lorsque nous ajoutons un nouveau favori à la grille. Mais il n'y a aucun effet sur la suppression. Il existe une classe `-move`, qui est ajoutée lorsque les éléments changent de position. Comme les autres classes, son préfixe correspondra à la valeur d'un attribut `name` fourni (`slide` dans notre cas). Nous devons donc ajouter quelques styles supplémentaires :

```css
.slide-leave-active {
	position: absolute;
}

.slide-move {
	transition: transform 0.5s;
}
```

::: tip 💡
Remarquez `position: absolute` sur les éléments qui partent ! C'est fait pour les retirer du flux naturel, déclenchant la transition de mouvement sur le reste des objets.
:::

Maintenant, notre liste a une belle animation de mouvement après avoir supprimé un de ses éléments !

**🎊 Vous avez terminé le supplément 2 ! 🎊**

## Auteure

Fait avec ❤️ par Natalia Tepluhina, mis à jour par Jen Looper
