# 🃏 1: Build an Accessible Memory Game

| **Project Goal**            | Build A Memory Game                                      with accessibility in mind!                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | How to build a memory game and about accessibility principles. You can play with the [finished project](https://codesandbox.io/s/vuevixens-memorygame-complete-650zb)                                                                                                                     |
| **Tools you’ll need**       | A modern browser like Chrome. An account at CodeSandbox.io. If you get lost, import the starting point for this chapter [here](https://github.com/mlama007/Vue-Memory-Game/tree/start). Instructions on how to do this are in [Appendix 1](appendix_1.md). Or you can go to the [Memory Game Code Sandbox](https://codesandbox.io/s/vuevixens-memorygame-start-6g0cj).
| **Time needed to complete** | 4 hours
|

## What You'll Build

![sketchnote](./images/halfday1.png)

# Instructions

If you need to restart your project, clone [this repo](https://github.com/mlama007/Vue-Memory-Game/tree/start). To start this project, sign into your Code Sandbox account and fork this [Memory Game Code Sandbox](https://codesandbox.io/s/vuevixens-memorygame-start-6g0cj). You'll work in Code Sandbox to build out a memory game.

# Getting Started

## Add a Component

Let's start by adding a set of instructions to the game by editing `Instructions.vue` inside the views folder. We want to create instructions for our users so they can access them via a link.

![instructions](./images/halfday1-instructions.png)

Let's first create a section for the rules. Edit `views/Instructions.vue` by adding this text under the `h2`'s closing tag:

```html
<section>
    <h3>Rules</h3>
    <p>This is a memory game. The cards are shuffled and laid face down. The point of the game is to find all the matches; there are a total of 16 cards to match.</p>
    <ul class="list-instruct">
        <li>rules...</li>
    </ul>
</section>
```

Next create some data to loop inside the `<li>` to build the instructions. Edit the `data` block in the `Instructions.vue` file to add the `instructions` array inside the curly brackets:

```js
data() {
    return {
        instructions: [
        "Click on a card to flip it over.",
        "If the two cards match, they will remain flipped.",
        "If they don't match, they will be turned over.",
        "Remember what was on each card and where it was.",
        "The game is over when all the cards have been matched.",
        "Every flipped card counts as a move."
        ]
    };
}
```

Now, add a `v-for` to the `<li>` in `views/Instructions.vue` to display the array of data. We can use the v-for directive to render a list of items based on an array. [Learn about `v-for`](https://vuejs.org/v2/guide/list.html).

```html
<ul class="list-instruct">
    <li v-for="(instruction, index) in instructions" :key="index">{{instruction}}</li>
</ul>
```

You should see the rules listed. Let's do the same for the Score section. Add this `<section>` block after the closing `</section>` tag that lists the instructions:

```html
<section>
    <h3>Scoring</h3>
    <ul class="list-instruct">
        <li v-for="(score, index) in scores" :key="index">
        <p class="star-category">{{score.value}} Stars</p>
        <span>{{score.description}}</span>
        </li>
    </ul>
</section>
```

Now create the data for the scores by adding this array after the closing bracket of the instructions array in the `<script>` block. Don't forget to add a comma after the close of the instructions array!

```js
scores: [
    { value: 3, description: "30 moves or less" },
    { value: 2, description: "40 moves or less" },
    { value: 1, description: "50 moves or less" }
]
```

Finally add styles at the bottom of the document, after the closing `</script> tag. Feel free to update any of these styles!

```html
<style lang='scss'>
    .main-instruction {
      width: 80vw;
      max-width: 600px;
      margin: auto;
    }
    .list-instruct {
      list-style: none;
      padding: 0;
    }
    .star-category {
      font-weight: bold;
      margin-bottom: 0;
    }
</style>
```

## Setting Up the Board

### Controllers 

Let's build out our game's home page!

We can start by building the section above the Memory game; the reset button, stars and number of moves. Switch to `/views/Home.vue` and overwrite the content in `<div class="home">` in the template:

```html
<div class="home">
    <main class="container">
        <section>
        <button class="restart buttonGray">
            <i class="fa fa-repeat"></i>
            <span class="reset">Reset</span>
        </button>
        <div>
            <ul class="stars">
            <li>
                <i class="fa fa-star"></i>
            </li>
            </ul>
            <p class="moves">Moves: 0</p>
        </div>
        </section>
    </main>
</div>
```

::: tip 💡
We are importing `font-awesome` in the `index.html` file inside the `public` folder. So we have access to all the icons from there. [Check out the font-awesome icons](https://fontawesome.com/icons?from=io)!
:::

Add styles to the bottom of this file:

```html
<style lang="scss">
.gameController .stars {
  padding: 0px;
  display: inline-block;
  margin: 2em auto 0;
}

.star {
  list-style: none;
  display: inline-block;
  margin: 0 0.2em;
  font-size: 1.5em;
}
.moves {
  font-weight: bold;
}

.gameController .restart {
  float: right;
  cursor: pointer;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1em;
}
</style>
```

Where's the data? We will be using data stored in a Vuex store. 

::: tip 💡
Vuex is a state management pattern and library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. [Learn more about Vuex](https://vuex.vuejs.org/)
:::

Inside the `store` folder, open the `index.js` file. This holds all the content of our store which we will use to build our game. Let's start by adding some data that we can use to make Game Controller section dynamic!

Add some data to the state by overwriting the `state` object in `/store/index.js`:

```js
state: {
    stars: 3,
    numMoves: 0
},
```

Go back to `Home.vue` and bring that data over by importing the store state and adding the state data you want to access in a computed property. Overwrite the entire `<script>` block in `/views/Home.vue`:

```js
<script>
import { mapState } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapState([
      "stars",
      "numMoves",
    ])
  }
};
</script>
```

This will allow us to use the data from the store as you would use data from that component. Update the `stars` and `numMoves` in our content to reflect the data in our Vuex store by overwriting the `<div>` under the closing `</button>` tag in `/views/Home.vue`:

```html
<div>
    <ul class="stars">
    <li v-for="(star, index) in stars" :key="index" class="star">
        <i :class="`${index} fa fa-star`"></i>
    </li>
    </ul>
    <p class="moves">Moves: {{numMoves}}</p>
</div>
```

By using a `v-for` in the stars, we can loop through the number of stars stored in our Vuex state. As people play the game and lose stars, it will automatically show the correct number. We will add that logic once the game is further along.

### Game Board

It's time to start building out the game's interface!

Choose a couple of icons you'd like to use for this project (or use the ones listed below). You need a total of 8 icons; making 16 cards on the board. [Font-awesome](https://fontawesome.com/icons?from=io) has a lot of icons to choose from!

Once you select the icons, add them to the state in the store `index.js` file as `types` by adding a comma after `numMoves: 0` and adding this array:

```js
types: ["car", "bug", "paw", "bomb", "gamepad", "diamond", "heart", "bell"]
```

Inside `Home.vue`, add `types` to the computed properties to import:

```js
...mapState(["stars", "numMoves", "types"])
```

Let's display them in a new section which will hold a list of our cards. Add this section under the closing `</section>` tag in `/views/Home.vue`:

```html
<section id="cards">
    <ul class="cards">
        <li v-for="(type, index) in types" :key="index">{{type}}</li>
    </ul>
</section>
```

We need to double the number of cards to make the card layout work. We also need to capture some metadata from each card:

* Name
* Icon
* Is the card flipped?
* Was this card a match?
* Should we close the card?

Now we can start working on the game logic!

### Game Logic

Let's start by creating a getter that grabs the `types` and generates card metadata.

::: tip 💡
[Learn about Vuex Getters](https://vuex.vuejs.org/guide/getters.html).
[Learn about computed properties](https://vuejs.org/v2/guide/computed.html).
:::

Add a Getter to the store and import it in `/views/Home.vue`:

Store:
```js
getters: {
    deck: (state) => {
      let deck = {
        cards: []
      };
      for (let index = 0; index < state.types.length; index++) {
        deck.cards.push({
          name: state.types[index],
          icon: "fa fa-" + state.types[index],
          flipped: false,
          match: false,
          close: false
        });
        deck.cards.push({
          name: state.types[index],
          icon: "fa fa-" + state.types[index],
          flipped: false,
          match: false,
          close: false
        });
      }
      return deck;
    }
}
```

Home.vue:
```js
// Import mapGetters
import { mapState, mapGetters, mapActions } from "vuex";

// Add Getters to computed
computed: {
    ...mapState([
      "gameAnnounce",
      "win",
      "stars",
      "cardsFlipped",
      "numCardsFlipped",
      "numMoves",
      "cardsMatched",
      "types"
    ]),
    ...mapGetters(["deck"])
  },
```

And update the display content by overwriting the card `ul` in `/views/Home.vue`:

```html
<ul class="cards">
    <li v-for="(card, index) in deck.cards" :key="index">{{card}}</li>
</ul>
```

You can see, that every card now has all this information displayed as a JSON object (we will fix the styles in a minute!):

* name
* icon
* flipped
* match
* close

Let's use this data to populate a hidden image for each card unless it is flipped. We can use `v-if` to check if the card is flipped; let's show a question mark if it is. Otherwise, let's show the card's icon. To do this, we'll use conditional rendering.

::: tip 💡
[Learn more about conditional rendering](https://vuejs.org/v2/guide/conditional.html).
:::

In `/views/Home.vue`, overwrite the current `<ul class="cards">` with this markup: 

```html
<ul class="cards">
    <li class="cardItem" v-for="(card, index) in deck.cards" :key="index">
    {{card.name}} <!-- placeholder to show what is inside each card -->
    <button
        :class="[ card.match ? 'card match' : card.flipped ? 'card show' : card.close ? 'card close' : 'card']"
    >
        <span v-if="!card.flipped">?</span>
        <div v-else :class="deck.cards[index].icon"></div>
    </button>
    </li>
</ul>
```

It's pretty ugly, so add some styles to the cards inside `/views/Home.vue`'s `<style>` block:

```css
// Cards
.cards {
  margin: 2em auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5em;
  padding: 0;

  .cardItem {
    list-style: none;
  }

  .card {
    height: 90px;
    width: 90px;
    font-size: 4em;
    background: #061018 url(/img/fabric.5959b418.png);
    background-blend-mode: soft-light;
    border: 1px solid #acacac;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
  }

  .show {
    font-size: 33px;
    background: #0b5891 url(/img/fabric.5959b418.png);
    cursor: default;
  }

  .match {
    cursor: default;
    background: #0e4b5a url(/img/fabric.5959b418.png);
    font-size: 33px;
    animation-name: match-animation;
    -webkit-animation-name: match-animation;
    animation-duration: 1000ms;
    -webkit-animation-duration: 1000ms;
    transform-origin: 70% 70%;
    animation-iteration-count: 1000ms;
    animation-timing-function: linear;
  }

  .close {
    cursor: default;
    animation-name: close;
    -webkit-animation-name: close;
    animation-duration: 1000ms;
    -webkit-animation-duration: 1000ms;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    &:hover,
    &:focus {
      background-blend-mode: hard-light;
      color: #112c3e;
      border: 2px solid #112c3e;
    }
  }
}
```

Looking better!

In `App.vue` add more card styles so a nice contrasting background image shows up. Note, you might need to refresh your Code Sandbox to see these new styles.

```css
.cards {
  .card {
    background: #061018 url("imgs/fabric.png");
  }
  .show {
    background: #0b5891 url("imgs/fabric.png");
  }

  .match {
    background: #0e4b5a url("imgs/fabric.png");
  }
}
```

Alright! We have our hidden cards! You can see that we have duplicates of each, but they should really be shuffled so they are not in the same order every time. Let's make that happen!

::: tip 💡
If you are stuck at this point, feel free to [start from here](https://codesandbox.io/s/vuevixens-memorygame-added-cards-upuhh)
:::

In `Home.vue`, create a shuffle method which will go through all of the cards and change the order. Also, let's trigger that method on the `created` lifecycle hook.

::: tip 💡
[Learn about Lifecycle Hooks](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)
:::

Add a new `methods` object in the `<script>` block of `/views/Home.vue` under `name: "home",`:

```js
methods: {
    shuffle(cards) {
      this.deck.cards = [];
      var currentIndex = cards.length,
        temporaryValue,
        randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }

      this.deck.cards = cards;
    }
},
```

Then, call this new `shuffle` method in a new lifecycle hook by adding a `created()` method under the `methods()` object you just pasted in:

```js
created() {
    this.shuffle(this.deck.cards);
  },
```

You should see the order of the cards change as you refresh the page.

### Adding Functionality

Now we can add a method that will allow users to flip cards over. Users also increase one move every time they flip over a card.

Let's start in Vuex. Add this flipping action by adding an Action and a Mutation to your Vuex store. Actions in Vuex respond to things happening and Mutations change state. In `store/index.js`, add a new method to the `actions` object by pasting the following between the curly brackets:

```js
update_NumMoves({ commit }, { moves }) {
      commit("UPDATE_NUMMOVES", moves);
    },
```

Then, add a Mutation in a similar fashion:

```js
UPDATE_NUMMOVES(state, payload) {
      state.numMoves = payload;
    },
```

Moving over to `views/Home.vue`, we need to import `mapActions` from Vuex. Working in `/views/Home.vue`, overwrite the import line in the `<script>` block:

```js
import { mapState, mapActions } from "vuex";
```

Next, import `update_NumMoves` from the store by adding the following line under `methods: {`

```js
...mapActions([
    "update_NumMoves",
]),
```

Now create a method to flip cards by adding this method under the line you just pasted into the `methods` object:

```js
flipCard(card) {
    if (card.flipped) {
    return;
    } else {
    this.update_NumMoves({ moves: this.numMoves + 1 });
    card.flipped = true;
    }
},
```

Now let's make those cards flip when you click them (`@click`). Edit the card button markup in `/views/Home.vue` by overwriting it:

```html
<button
    :class="[ card.match ? 'card match' : card.flipped ? 'card show' : card.close ? 'card close' : 'card']"
    @click="flipCard(card)"
    >
    <span v-if="!card.flipped">?</span>
    <div v-else :class="deck.cards[index].icon"></div>
</button>
```

> You should see all your cards "flipping" over as you click on them. Notice that the CSS we added earlier is changing the styles as the class changes dynamically.

Let's make sure users can only open 2 cards at once. We will need to keep track of which and how many cards are open on the board.

Let's go to the Vuex store in `/store/index.js` to add a new value to keep track of which cards are open: `cardsFlipped`. Another to see how many cards are open: `numCardsFlipped`. Add these values into the `state`:

```js
cardsFlipped: [],
numCardsFlipped: 0,
```

Now, we need a way to set the number of cards flipped; add new flipped cards, and clear cards that are flipped to start a new game.

Add some new mutations to that part of your Vuex store in `/store/index.js` (add commas after mutations if needed):

```js
CLEAR_CARDSFLIPPED(state, payload) {
    state.cardsFlipped = payload;
},
UPDATE_CARDSFLIPPED(state, payload) {
    state.cardsFlipped.push(payload);
},
UPDATE_NUMCARDSFLIPPED(state, payload) {
    state.numCardsFlipped = payload;
},
```

Add some new actions to that area of `store/index.js`:

```js
clear_CardsFlipped({ commit }, { cards }) {
    commit("CLEAR_CARDSFLIPPED", cards);
},
update_CardsFlipped({ commit }, { cards }) {
    commit("UPDATE_CARDSFLIPPED", cards);
},
update_NumCardsFlipped({ commit }, { num }) {
    commit("UPDATE_NUMCARDSFLIPPED", num);
},
```

Now add these new methods to the `mapActions` array in `/views/Home.vue`:

```js
...mapActions([
    "update_NumMoves",
    "clear_CardsFlipped",
    "update_CardsFlipped",
    "update_NumCardsFlipped"
]),
```

Add these methods to your `flipCard()` method:

```js
flipCard(card) {
    if (card.flipped) {
    return;
    } else {
    this.update_NumMoves({ moves: this.numMoves + 1 });
    }
    // only allow flips if there are < or = 2 flipped cards
    if (this.numCardsFlipped < 2) {
    card.flipped = true;
    this.update_NumCardsFlipped({ num: this.numCardsFlipped + 1 });
    this.update_CardsFlipped({ cards: card });
    }
}
```

At this point, you are keeping track of the card flips.

::: tip 💡
Remember that each card has these properties:
* name
* icon
* flipped
* match
* close
:::

We want to keep track of all matches to know when we win the game. So let's keep track of which cards have been matched in the store.

In `store/index.js` add this array to state:

```js
cardsMatched: [],
```

Add to mutations:

```js
CLEAR_CARDSMATCHED(state, payload) {
      state.cardsMatched = payload;
    },
UPDATE_CARDSMATCHED(state, payload) {
    state.cardsMatched.push(payload);
}
```

Add to actions:

```js
clear_CardsMatched({ commit }, { cards }) {
      commit("CLEAR_CARDSMATCHED", cards);
    },
update_CardsMatched({ commit }, { cards }) {
    commit("UPDATE_CARDSMATCHED", cards);
}
```

Going back to `/store/Home.vue`, change the `match` to true when flipped cards are the same. Edit the `mapState` and `mapActions` methods:

Import State

```js
...mapState([
    "stars",
    "numMoves",
    "types",
    "cardsFlipped",
    "numCardsFlipped",
    "cardsMatched"
]),
```

Import Action

```js
...mapActions([
    "update_NumMoves",
    "clear_CardsFlipped",
    "update_CardsFlipped",
    "update_NumCardsFlipped",
    "clear_CardsMatched",
    "update_CardsMatched"
]),
```

We will handle this new functionality inside our `flipCard()` method. Under the line `this.update_CardsFlipped({ cards: card });`, add the following check:

```js
// MATCH
if (
    this.numCardsFlipped === 2 &&
    this.cardsFlipped[0].name === this.cardsFlipped[1].name
    ) {
    for (let i = 0; i < this.deck.cards.length; i++) {
        if (this.deck.cards[i].name === this.cardsFlipped[0].name) {
        this.deck.cards[i].match = true;
        }
    }

    this.update_CardsMatched({ cards: this.cardsFlipped });
    this.clear_CardsFlipped({ cards: [] });
    this.update_NumCardsFlipped({ num: 0 });
}
```

> You should be able to match cards and see them stay on the board permanently. However, we are not handling what happens when flipped cards don't match, let's do that next!

Continuing the `flipCard()` method, add this check after the closing bracket of the if statement you just added:

```js
// NO MATCH
else if (
    this.numCardsFlipped === 2 &&
    this.cardsFlipped[0].name !== this.cardsFlipped[1].name
    ) {
    // Wait before closing mismatched card
    setTimeout(() => {
        for (let i = 0; i < this.deck.cards.length; i++) {
        if (this.deck.cards[i].flipped && !this.deck.cards[i].match) {
            this.deck.cards[i].flipped = false;
            this.deck.cards[i].close = true;
        }
        }

        this.clear_CardsFlipped({ cards: [] });
        this.update_NumCardsFlipped({ num: 0 });
        return;
    }, 500);
}
```

> You should be able to open all the cards. If they don't match, they will close when you continue playing. Matched cards will remain open.

### Scoring

We still need to handle what happens when the game is won. And how do we want to handle the score?

In our store, let's add a way to keep track of winning the game and of how many stars we have left as we play.

In `store/index.js`, add to State:

```js
win: false,
```

Add to Mutations:

```js
UPDATE_WIN(state, payload) {
    state.win = payload;
},
UPDATE_STARS(state, payload) {
    state.stars = payload;
},
```

Add to Actions:

```js
update_Win({ commit }, { win }) {
    commit("UPDATE_WIN", win);
},
update_Stars({ commit, dispatch }, { num }) {
    commit("UPDATE_STARS", num);
},
```

Now that those are available, let's import them in `/views/Home.vue`:

```js
// In computed
...mapState([
    "stars",
    "numMoves",
    "types",
    "cardsFlipped",
    "numCardsFlipped",
    "cardsMatched",
    "win"
]),
// In methods
...mapActions([
    "update_NumMoves",
    "clear_CardsFlipped",
    "update_CardsFlipped",
    "update_NumCardsFlipped",
    "clear_CardsMatched",
    "update_CardsMatched",
    "update_Stars",
    "update_Win"
]),
```

Use these inside the `flipCard()` method after we increase the number of moves. Overwrite the top `if` statement:

```js
if (card.flipped) {
    return;
    } else {
    this.update_NumMoves({ moves: this.numMoves + 1 });
    if (this.numMoves < 30) {
        this.update_Stars({ num: 3 });
    } else if (this.numMoves < 40) {
        this.update_Stars({ num: 2 });
    } else if (this.numMoves < 50) {
        this.update_Stars({ num: 1 });
    } else if (this.numMoves > 50) {
        this.update_Stars({ num: 0 });
    }
}
```

Let's add some logic when we find a match. Overwrite the `// MATCH` logic:

```js
// MATCH
if (
    this.numCardsFlipped === 2 &&
    this.cardsFlipped[0].name === this.cardsFlipped[1].name
    ) {
    for (let i = 0; i < this.deck.cards.length; i++) {
        if (this.deck.cards[i].name === this.cardsFlipped[0].name) {
        this.deck.cards[i].match = true;
        }
    }
    this.update_CardsMatched({ cards: this.cardsFlipped });
    this.clear_CardsFlipped({ cards: [] });
    this.update_NumCardsFlipped({ num: 0 });
    // if number of cards matched = number or cards, then win the game
    if (this.cardsMatched.length === this.deck.cards.length / 2) {
        this.update_Win({ win: true });
    }
  }
```

Now you should see the stars updating as you play.

* 3 stars = 30 moves or less
* 2 stars = 40 moves or less
* 1 star = 50 moves or less

### Reset

Now, let's add make sure we can start a new game and reset all of the game data when we press the reset button. Let's update our store first (`/store/index.js`):

Add to Actions:

```js
async clearGame({ commit, dispatch }) {
    try {
    await dispatch("update_Win", { win: false });
    await dispatch("update_Stars", { num: 3 });
    await dispatch("clear_CardsFlipped", { cards: [] });
    await dispatch("update_NumCardsFlipped", { num: 0 });
    await dispatch("update_NumMoves", { moves: 0 });
    await dispatch("clear_CardsMatched", { cards: [] });
    await dispatch("update_GameAnnounce", { message: "" });
    } catch (error) {
    commit("ERROR", error);
    }
},
```

In `/views/Home.vue`, add `clearGame` to your mapActions:

```js
...mapActions([
      "update_NumMoves",
      "clear_CardsFlipped",
      "update_CardsFlipped",
      "update_NumCardsFlipped",
      "clear_CardsMatched",
      "update_CardsMatched",
      "update_Stars",
      "update_Win",
      "clearGame"
    ]),
```

Now add a `newGame()` method inside `/views/Home.vue`:

```js
newGame() {
    this.shuffle(this.deck.cards);

    for (let i = 0; i < this.deck.cards.length; i++) {
        this.deck.cards[i].flipped = false;
        this.deck.cards[i].close = false;
        this.deck.cards[i].match = false;
    }

    this.clearGame();
},
```

Add a `newGame` to the reset button's `@click` handler:

```html
<button @click="newGame" class="restart buttonGray">
    <i class="fa fa-repeat"></i>
    <span class="reset">Reset</span>
</button>
```

Almost done!

### Winning!

Let's add a congratulatory message when the game is finished. We will need the pre-built `Winning` component. Let's import it in `views/Home.vue` so we can use it a a child component:

```js
// inside the script block
import Winning from "@/components/Winning.vue";
// under export default
components: {
    Winning
},
```

Let's show it once the game is won and hide the board. Add this snippet at the top of the `views/Home.vue` component, overwriting the current `<main>` line:

```html
<Winning v-if="win" :newGame="newGame"></Winning>
<main v-else class="container">
```

> Note: We are passing `newGame` as a prop from the child to the parent to be able to restart the game while the board is hidden

Inside `/components/Winning.vue`, add a congratulatory message and a button to restart the game by overwriting its current template markup:

```html
<template>
  <div class="win">
    <div>
      <h2>Congratulations!</h2>
      <ul class="stars">
        <li v-for="(star, index) in stars" :key="index">
          <i :class="`${index} fa fa-star`"></i>
        </li>
      </ul>
      <p>You won the game with {{stars}} stars left!</p>
      <button class="buttonGray" @click="newGame()">Play again</button>
    </div>
  </div>
</template>
```

Inside the script area in `components/Winning.vue`, bring over the `newGame` and `stars` by overwriting its current script:

```html
<script>
import { mapState } from "vuex";

export default {
  name: "Winning",
  props: {
    newGame: { type: Function }
  },
  computed: {
    ...mapState(["stars"])
  }
};
</script>
```

> Don't forget to remove the card.name that shows the name of the card when you're ready to truly play the game!

## Add UI finishing touches

In `Home.vue` add the following styles:

```js
.buttonGray {
  background: #2e3d49;
  font-size: 1em;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
  &:hover,
  &:focus {
    background: #0b5891;
  }
}

.reset {
  padding-left: 1em;
}

@media (min-width: 450px) {
  .cards {
    grid-gap: 1em;
    .card {
      height: 125px;
      width: 125px;
    }
  }
}
@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

::: tip 💡
If you are stuck, feel free to [start from here](https://codesandbox.io/s/vuevixens-memorygame-functionality-added-y5jp3)
:::

## Challenge

Let's add Assistive Technology support! You can announce route changes and inform screen readers about important actions. Here are some tasks you can tackle:

* Update Metadata (titles)
* Announce Route Update
* Add Skip to Main Content link
  * Focus on this when route changes
* Announce which cards are flipped
* Announce when a match is made
* Announce how many matches are left to find
* Announce how many stars player won with
* Check for keyboard functionality
* Disable matched cards

Your goal? Get a 100% Lighthouse score!

## Resources

[Project Starting Point](https://codesandbox.io/s/vuevixens-memorygame-start-6g0cj)

[Project Checkpoint 1 - Added Cards](https://codesandbox.io/s/vuevixens-memorygame-added-cards-upuhh)

[Project Checkpoint 2 - Added Functionality](https://codesandbox.io/s/vuevixens-memorygame-functionality-added-y5jp3)

[Finished project](https://codesandbox.io/s/vuevixens-memorygame-complete-650zb)

## Author

Made with ❤️ by Maria Lamardo and edited by Jen Looper
