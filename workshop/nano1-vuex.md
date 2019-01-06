# 👩‍🎓 Nano Activity (number): Title of Activity

| **Project Goal**            | What we're going to build                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | *Vuex* is a state management library made for Vue, in this nano you will learn the basic concepts, and how to use it on a Vue application.
| **Tools you’ll need**       | A modern browser like Chrome. Access to [CodeSandbox](https://codesandbox.io). [Vue Developer tools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) extension for Chrome.
| **Time needed to complete** | 10-30 minutes


# We're going to create a Videogame Card Collection using Vuex

In this activity we will create a simple collection of card of some classic video game titles that will be powered by a Vuex state.
## 1. Get Started

Head over to our CodeSandbox at [![Edit Vuex 101 Nano - Start](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/ry03r15o9o)

There are three important files at play:

1. `App.vue` Our main file with some boilerplate code for looping through an array of games:
```html
<div class="col-12 col-md-6 col-lg-4" v-for="game in games">
  <card
    @click="removeGame(game);"
    :name="game.title"
    :image="game.img"
  ></card>
</div>

<ul class="list-group">
  <li class="list-group-item" v-for="title in gameTitles" :key="title">
    {{ title }}
  </li>
</ul>
```

2. `components/Card.vue` This will present our game information in a card. It will receive a `name` and `image` properties.

3. `data/data.json` Our mock-up games database, JSON format.

## 2. Step 1 - Installing Vuex

Since we are using codepen, the only thing we need to install Vuex is to add it to our list of 
dependencies, so go to the `Dependencies` button on the bottom left of your screen and add it to
our project.

::: tip 💡
When working on a local project, you should first add the dependency with `npm install vuex` or
`yarn add vuex`
:::

Now that we have our dependency, lets add it to our application.

First, create a new file on the project root `store.js`, this will hold our Vuex store.

Open the file, and lets import Vue and Vuex:

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
```

Dont forget to inject the dependency with `Vue.use(Vuex)`

Let's now create our store. Add this to the file:

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

We will cover everything in here in depth later on, but for now lets focus on `state`.

Vuex is a state management library, and so we need to declare our global state for our application.
Think of `state` on our store like a globally available `data() {}` in a Vue component. 

We will add a `games` array which will hold our data soon.

Go back to `main.js` and import our store:
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

## 3. Step 2 - Fetching our remote data

In this nano we will pretend as if we were fetching data from some remote API, and receiving the contents of `data.json` into our application.

You will notice that we are already importing it `import data from "./data/data.json";`, so head to our `getFromAPI()` method and add the following code:

```js
const apiData = data; // Our "pretend" ajax call
apiData.forEach(game => {
  this.$store.dispatch("addGame", game);
}); 
```

We are assigning our imported `data` into a constant as a pretend ajax call, and then we are using the
js array method `forEach` to loop through the array. 

What exactly then is `$store.dispatch`?

Vuex has three different state management types of methods.
1. **Getters**. For getting data from the store
2. **Mutations**. For mutating/changing the data in the store
3. **Actions**. Similar to mutations, but they *commit* the mutations, and can hold other logic.

In this case, we are using an **action** via *dispatch* to add a game to our store.

::: tip 💡
*Why am I not mutating the data with a commit?* It is a best practice to only commit from within actions.  
:::

Let's write our action and mutation to store our newly fetched data.

Head over to our `store.js` and add the following mutation and action:

```js
mutations: {
  addGame(state, game) {
    state.games.push(game);
  }
}

actions: {
  addGame(context, game) {
    if (typeof game !== Object && game !== null) return;
    
    context.commit("addGame", game);
  }
}
```

In our action, we are making a micro validation for the data we will insert. This is just an example
of what you can do inside this function, you could also make axios/ajax calls and commit data on the
responses!

`context.commit` will call our *addGame* **mutation** and pass the data after we validate it.

Inside our mutation, we simply push the game into our array.

## 4. Step 3 - Getting our data from the store
If you run the application at this point nothing will happen, but our data has already been 
added to our vuex store.

In order to use our Vue development tools, first click on the `Open in new window` button on the
right side toolbar (above the white canvas area). This will open a new browser tab where
you can navigate to your Vue devtools through the development console.

Open Vue, and click on the clock icon to switch to the Vuex view.

You will see that you have your `state` object with our array of games inside of it!

Head back to our code, and inside `App.vue` add a new **computed property**:

```js
games() {
  return this.$store.state.games;
}
```

Here, we are going inside our `$store` and fetching the *games* array from the **state**.

The cards will now populate with all our store data :)

Another way to fetch data from the store is by using **getters**.

Go to our `store.js` file and add the following getter:
```js
gameTitles(state) {
  return state.games.map(game => game.title);
}
```

You will notice that the difference between using a getter and accesing our state directly like above,
is that here we have a chance to parse or modify our data before sending it back to the caller. In
this case, were extracting an array of only the game titles. Lets output this on our app.

Add this computed property to `App.vue`:

```js
gameTitles() {
  return this.$store.getters.gameTitles;
}
```

Our `<ul>` element will now be populated with the titles of our games!

## 5. Step 4 - Modifying our data
At this point you have all the tools you need to be able to start using Vuex in your apps, but lets make one more 
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

Here we grab a copy of our `state.games` array into a `games` constant.
(It's important that we make a copy, since we should **NEVER** modify our state directly!).

We find the game that we want to delete by its title, and we commit a new mutation by the name of `setGames`
which will allow us to modify the whole array on one go.

::: tip 💡
Notice that we are using ES6 object destructuring in the first param. This way instead of having to pass
`context` and doing `context.commit` and `context.state` we can call them directly. 
:::

Finally, lets add our missing mutation:
```js
setGames(state, games) {
  state.games = games;
}
```

Now, we can finally go back to `App.vue` and modify our `removeGame` method to:
```js
removeGame(game) {
  this.$store.dispatch("removeGame", game);
}
```

Now we can remove data from our store as well :)

You can check out the complete code here if you need it:
[![Edit Vuex 101 Nano](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/r5rz75z1wq)

## Conclusion and challenge

This only scratches the surface of Vuex, and an ideal scenario would be to use it on a multi-component
app where the state needs to be shared.

Try adding a new component Form.vue in which you add new games to your library using what you have learned!

## Badge

Add the badge image here, available for download

## Author

Made with ❤️ by Marina Mosti







