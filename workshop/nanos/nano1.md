# 👜 Nano Activity 1: Vuex 101 (intermediate)

| **Project Goal**            | A video game card collection app using Vuex                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | *Vuex* is a state management library made for Vue.js. In this nano you will learn the basic concepts of Vuex and how to use it in a Vue application.
| **Tools you’ll need**       | A modern browser like Chrome or Firefox. Access to [CodeSandbox](https://codesandbox.io). [Vue Developer tools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) extension for Chrome, or [Vue Developer tools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) from Firefox.
| **Time needed to complete** | 30 minutes

# Build a video game card collection using Vuex

In this activity we will create a simple collection of card of some classic video game titles that will be powered by a Vuex state.

## Get Started

Head over to our pre-prepared CodeSandbox by clicking this button: [![Edit Vuex 101 Nano - Start](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ry03r15o9o). You can fork a copy of this sandbox for yourself after logging in to CodeSandbox.

There are three important files to observe here:

1. `App.vue` This is our main file with some boilerplate code for looping through an array of games:

```html
<div class="col-12 col-md-6 col-lg-4" v-for="game in games">
  <card
    @click="removeGame(game);"
    :name="game.title"
    :image="game.img"
  >
  </card>
</div>

<ul class="list-group">
  <li class="list-group-item" v-for="title in gameTitles" :key="title">
    {{ title }}
  </li>
</ul>
```

2. `components/Card.vue` This file will present our game information in a card. It will receive `name` and `image` properties.

3. `data/data.json` This is our mock-up games database in JSON format.

## Install Vuex

Since we are using CodeSandbox, the only thing we need to install Vuex is to add it to our list of 
dependencies, so go to the `Dependencies` tab on the bottom left of your screen and add it to
your project.

::: tip 💡
When working on a local project, you should first add the dependency with `npm install vuex` or
`yarn add vuex`
:::

Now that we have our dependency, lets add it to our application.

First, create a new file on the project root called `store.js`. This file will hold our Vuex store.

Open the file, and import Vue and Vuex by adding the following code:

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
```

Don't forget to inject the dependency with `Vue.use(Vuex)`, as illustrated above.

Let's now create our store. Add this to the file under the code you just pasted in:

```js
const store = new Vuex.Store({
  state: {
    games: []
  },

  getters: {
  },

  mutations: {
  },

  actions: {
  }
});

export default store;
```

We will cover everything in here in depth later on, but for now let's focus on `state`.

Vuex is a state management library, so we need to declare our global state for our application. Think of `state` on our store like a globally available `data() {}` in a Vue component.

We will add a `games` array which will hold our data soon.

Go back to `main.js` and import the store:

```js
import store from "./store";
```

And finally add it to our Vue app:

```js
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  store
}); 
```

::: tip 💡
Instead of `store: store` we are using just `store`. This is the ES6 shorthand!
:::

## Fetch Some Remote Data and Store It

In this nano we will pretend that we were fetching data from some remote API, and receiving the contents of `data.json` into our application.

Take a look at `App.vue`. You will notice that we are already importing our data in this line: `import data from "./data/data.json";`, so head to the `getFromAPI()` method and add the following code:

```js
const apiData = data; // Our "pretend" ajax call
apiData.forEach(game => {
  this.$store.dispatch("addGame", game);
});
```

We are assigning our imported `data` into a constant as a pretend ajax call, and then we are using the
js array method `forEach` to loop through the array.

Let's learn a bit more about `$store.dispatch`?

Vuex has three different state management types of methods.
1. **Getters**. Used to get data from the store
2. **Mutations**. Used to mutate/change the data in the store
3. **Actions**. Similar to mutations, but they *commit* the mutations and can hold other logic.

In this case, we are using an **action** via *dispatch* to add a game to our store.

::: tip 💡
*Why am I not mutating the data with a commit?* This is considered good practice but is not mandatory.
You can commit directly from your components, but this way tends to be more maintainable since you can rest assured
that all your mutations are only being used within your store.
:::

Let's write our action and mutation to store our newly fetched data.

Head over to `store.js` and add the following mutation and action:

```js
mutations: {
  addGame(state, game) {
    state.games.push(game);
  }
},

actions: {
  addGame(context, game) {
    if (typeof game !== 'object' && game !== null) return;
    context.commit("addGame", game);
  }
}
```

In our action, we are making a micro validation for the data we will insert. This is just an example
of what you can do inside this function. You could also make axios/ajax calls and commit data on the
responses!

`context.commit` will call our *addGame* **mutation** and pass the data after we validate it.

Inside our mutation, we simply push the game into our array.

## Fetch Data from the Store

If you run the application at this point nothing will happen, but our data has already been added to our Vuex store. Let's use the Vue DevTools to watch this happen.

In order to use our Vue DevTools, click on the `Open in new window` button on the
right side toolbar (above the white canvas area). This will open a new browser tab where
you can navigate to your Vue DevTools through the development console.

Open Vue, and click on the clock icon to switch to the Vuex view.

You will see that you have your `state` object with our array of games inside of it! 😍

Head back to your code, and inside `App.vue` add a new **computed property**:

```js
games() {
  return this.$store.state.games;
}
```

Here, we are going inside our `$store` and fetching the *games* array from the **state**.

The cards will now populate with all our store data!

Another way to fetch data from the store is by using **getters**.

Go to `store.js` file and add the following getter:

```js
gameTitles(state) {
  return state.games.map(game => game.title);
}
```

You will notice that the difference between using a getter and accessing state directly as you did above
is that here you have a chance to parse or modify your data before sending it back to the caller. In
this case, we're extracting an array of only the game titles. Lets output this on our app.

Add this computed property to `App.vue`:

```js
gameTitles() {
  return this.$store.getters.gameTitles;
}
```

Our `<ul>` element will now be populated with the titles of our games!

## Modifying Data

At this point you have all the tools you need to be able to start using Vuex in your apps, but let's make one more 
change and give those **Delete** buttons some functionality.

Go to `store.js` and add this **action**:

```js
removeGame({ commit, state }, game) {
  const games = [...state.games];
  const storedGame = games.find(g => g.title === game.title);
  if (!storedGame) return;

  games.splice(games.indexOf(storedGame), 1);
  commit("setGames", games);
}
```

Here you grab a copy of our `state.games` array into a `games` constant. It's important to make a copy, since you should **NEVER** modify our state directly!.

You will find the game that you want to delete by its title, and you commit a new mutation by the name of `setGames`
which will allow you to modify the whole array in one go.

::: tip 💡
Notice that you are using [ES6 object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) in the first parameter. This way instead of having to pass `context` and doing `context.commit` and `context.state` you can call them directly.
:::

Finally, add that missing mutation:

```js
setGames(state, games) {
  state.games = games;
}
```

Now, you can finally go back to `App.vue` and modify the `removeGame` method:

```js
removeGame(game) {
  this.$store.dispatch("removeGame", game);
}
```

Now you can remove data from the store as well :)

You can check out the complete code here if you need it:

[![Edit Vuex 101 Nano](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/r5rz75z1wq)

## Conclusion and Challenge

This only scratches the surface of Vuex, and an ideal scenario would be to use it on a multi-component
app where the state needs to be shared.

Try adding a new component `Form.vue` in which you add new games to your library using what you have learned!

## Badge

Congratulations! You have earned a badge!

![Vuex 101 badge](./images/vuex-101-badge.png)



## Author

Made with ❤️ by Marina Mosti
