# 7: Build an Accessible Memory Game

| **Project Goal**            | Build  Memory Game                                      with accessibility in mind!                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | How to build a memory game and about accessibility principles. You can play with the [finished project](https://codesandbox.io/s/vuevixens-mini7-end-qyr1b)                                                                                                                     |
| **Tools you’ll need**       | A modern browser like Chrome. An account in CodeSandbox.io. If you get lost, import the starting point for this chapter [here](https://github.com/mlama007/Vue-Memory-Game/tree/start). Instructions on how to do this are in [Appendix 1](appendix_1.md). Or you can go to the [Memory Game codesandbox](https://codesandbox.io/s/vuevixens-mini7-start-6g0cj).
| **Time needed to complete** | 4 hours
|

## What You'll Build

![sketchnote](./images/mini7.png)

# Instructions

If you need to restart your project, clone [this repo](https://github.com/mlama007/Vue-Memory-Game/tree/start). Or you can go to the [Memory Game codesandbox](https://codesandbox.io/s/vuevixens-mini7-start-6g0cj).

In this chapter, we will create a memory game.

# Getting Started

## Instuctions.vue

Lets start by adding the Instructions to the game in `Instructions.vue` inside the views folder. We want to create instructions for out users in the instructions link.

![sketchnote](./images/mini7-instuctions.png)

Lets first create a section for the Rules:

```html
<section>
    <h3>Rules</h3>
    <p>This is a memory Game. The cards are shuffled and faced down. The point of the game is to find all the matches; there are a total of 16 cards to match.</p>
    <ul class="list-instruct">
        <li>rules...</li>
    </ul>
</section>
```

Lets create some data to loop inside the `<li>`.

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

Now, lets add a `v-for` to the `<li>` inside rules. We can use the v-for directive to render a list of items based on an array. [Learn about `v-for`](https://vuejs.org/v2/guide/list.html).

```html
<ul class="list-instruct">
    <li v-for="(instruction, index) in instructions" :key="index">{{instruction}}</li>
</ul>
```

You should see the rules listed, lets do the same for the Score section.

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
Lets create the data for the scores:

```js
scores: [
    { value: 3, description: "30 moves or less" },
    { value: 2, description: "40 moves or less" },
    { value: 1, description: "50 moves or less" }
]
```

And add styles at the bottom of the document. Feel free to update any of these styles!

```css
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

---
---

## Setting Up the Board

### Controllers 

Lets build out our game in the Home page!!

We can start by bulding the section above the Memory game; the reset button, stars and number of moves. Add some content in the template:

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
We are importing `font-awesome` in the `index.html` file inside the `public` folder. So we have access to all the icons from there. [Check out the font-aweseome icons](https://fontawesome.com/icons?from=io)!

Add styles to the file:

```css

<style lang="scss">
// Game Controller
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

We will be bringing out data over from Vuex store. Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. [Learn more about Vuex](https://vuex.vuejs.org/)

Inside the `store` folder, open the `index.js` file. This holds all the content of our store which we will use to build our game. Lets start by adding some data that we can use to make Game Controller section dynamic!

Add some data to the state:

```js
state: {
    stars: 3,
    numMoves: 0
},
```

Go back to `Home.vue` and bring that data over by importing the store State and adding the state data you want to access in a computed property:

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

This will allow us to use the data from the store as you would use data from that component. Update the `stars` and `numMoves` in our content.

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
By using a `v-for` in the stars, we can loop through that number of stars. As people play the game and lose stars, it will automaticaly show the correct number. We will add that logic once the game is further along.

---
### Game Board

Its time to start building out the game!

Choose a couple of icons you'd like to use for this project. I used a total of 8 icons; making 16 cards on the board. [Font-awesome](https://fontawesome.com/icons?from=io) had a lot of icons to choose from!

Once you selected the icons, lets add them to the state in the store `index.js` file as `types`

```js
types: ["car", "bug", "paw", "bomb", "gamepad", "diamond", "heart", "bell"]
```

Inside `Home.vue`, add this to the computed properties to import:

```js
...mapState(["stars", "numMoves", "types"])
```

Lets display them in a new section which will hold a list of our cards:

```html
<section id="cards">
    <ul class="cards">
        <li v-for="(type, index) in types" :key="index">{{type}}</li>
    </ul>
</section>
```

We need double the number of cards to make this work as well as a couple of things from each card:
* Name
* Icon
* Is the card flipped?
* Was this card a match?
* Should we close the card?

Lets start by creating a computed property that grabs the `types` and generated the rest of this information. [Learn about computed properties](https://vuejs.org/v2/guide/computed.html).

```js
computed: {
    ...mapState(["stars", "numMoves", "types"]),
    deck: function() {
      let deck = {
        cards: []
      };
      for (let index = 0; index < this.types.length; index++) {
        deck.cards.push({
          name: this.types[index],
          icon: "fa fa-" + this.types[index],
          flipped: false,
          match: false,
          close: false
        });
        deck.cards.push({
          name: this.types[index],
          icon: "fa fa-" + this.types[index],
          flipped: false,
          match: false,
          close: false
        });
      }
      return deck;
    }
}
```

And update out content:

```html
<ul class="cards">
    <li v-for="(card, index) in deck.cards" :key="index">{{card}}</li>
</ul>
```

You can see, that every card now has all this information:
* name
* icon
* flipped
* match
* close

Lets use this to populate a hidden image for each card unless it is flipped. We can use `v-if` to check if the card is flipped; lets show a question mark if it is. Else, lets show the card's icon. [Learn more about Condotional Rendering](https://vuejs.org/v2/guide/conditional.html).

```html
<ul class="cards">
    <li class="cardItem" v-for="(card, index) in deck.cards" :key="index">
    {{card.name}} <!-- placeholder to show what is inside each card -->
    <button
        :class="[ card.match ? 'card match' : card.flipped ? 'card open show' : card.close ? 'card close' : 'card']"
    >
        <span v-if="!card.flipped">?</span>
        <div v-else :class="deck.cards[index].icon"></div>
    </button>
    </li>
</ul>
```

Lets add some styles to the cards inside `Home.vue`!
```css
// Cards
.cards {
  margin: 2em auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5em;
  padding: 0;

  .cardItem {
    list-style: none;
  }

  .card {
    height: 100px;
    width: 100px;
    font-size: 4em;
    /* background: #061018 url("imgs/fabric.png"); */
    background-blend-mode: soft-light;
    border: 1px solid #acacac;
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);

    &:hover,
    &:focus {
      background-blend-mode: hard-light;
      color: #112c3e;
      border: 2px solid #112c3e;
    }
  }

  .open {
    transform: rotateY(0);
    /* background: #0b5891 url("imgs/fabric.png"); */
    cursor: default;
  }

  .show {
    font-size: 33px;
  }

  .match {
    cursor: default;
    /* background: #0e4b5a url("imgs/fabric.png"); */
    font-size: 3rgb (3, 3, 3);
    animation-name: pulse_animation;
    -webkit-animation-name: pulse_animation;
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
    animation-duration: 0.5s;
    -webkit-animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
}
```

In `App.vue` add more card styles so the background img shows up (inside codesandbox):

```css
.cards {
  .card {
    background: #061018 url("imgs/fabric.png");
  }
  .open {
    background: #0b5891 url("imgs/fabric.png");
  }

  .match {
    background: #0e4b5a url("imgs/fabric.png");
  }
}
```

Alright! We have our hidden cards! You can see that we have duplicates of each, but they should really be shuffled so it it not in the same order every time! Lets make that happen!


::: tip 💡
If you are stuck, feel free to [start from here](https://codesandbox.io/s/vuevixens-mini7-added-cards-upuhh)
:::

In `Home.vue`, lets create a shuffle method which will go through all of the cards, and change the order.
Also, lets trigger that method on `created`.
[Learn about Lifecycle Hooks](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram)

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
}
```

You should see the order of the cards change as you refresh the page.

---

### Adding Functionality!

Lets add a method that will allow users to flip cards over. Users also increase one move every time they flip over a card.

Import `mapActions` from Vuex:

```js
import { mapState, mapActions } from "vuex";
```

Import `update_NumMoves` from the store by adding the following to methods:

```js
...mapActions([
    "update_NumMoves",
]),
```

Create the method:

```js
flipCard(card) {
    if (card.flipped) {
    return;
    } else {
    this.update_NumMoves({ moves: this.numMoves + 1 });
    card.flipped = true;
    }
}
```

Add it to `Home.vue`

```html
<button
    :class="[ card.match ? 'card match' : card.flipped ? 'card open show' : card.close ? 'card close' : 'card']"
    @click="flipCard(card)"
    >
    <span v-if="!card.flipped">?</span>
    <div v-else :class="deck.cards[index].icon"></div>
</button>
```

> You should see all your cards "flipping" over as you click on them. Notice that the CSS we added earlier is changing the styles as the class changes dynamically.

Lets make sure users can only open 2 cards at once. We will need to keep track of which and how many cards are open on the board.

Lets go to the store to add a new value. One for keeping track of which cardds are open: `cardsFlipped`. Another to see how many cards are open: `numCardsFlipped`.

```js
cardsFlipped: [],
numCardsFlipped: 0,
```

Now, we need a way to set the number of cards flipped; add new flipped cards; clear cards flipped that are flipped for new Games.

Add some new mutations:

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

Add some new actions:

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

Add the methods to the `mapActions`:

```js
...mapActions([
    "update_NumMoves",
    "clear_CardsFlipped",
    "update_CardsFlipped",
    "update_NumCardsFlipped"
]),
```

Add it to your `flip()`

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

***

```
::: tip 💡
Remember that each card has these properties:
* name
* icon
* flipped
* match
* close
:::

We want to keep track of all matches to know when we win the game. So lets keep track of which cards have been matched in the store.

Add to state:

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

Going back to `Home.vue`, change the `match` to true when flipped cards are the same. 

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

We will handle this inside our `flipCard()` method:

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
> You should be able to match cards and see them stay on the board permanently. However, we are not handling what happens when flipped cards don't match, lets do that next!

Inside the `flipCard()` method, add:

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

> You should be able to open all the cards. If they don't match, they will close. Matched cards will remain open.

*** 

We still need to handle what happes when the game is won. And how to we want to handle the score?!

In our store, lets add a way to keep track of winning the game and of how many stars we have left as we play.

Add to State:

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
}
update_Stars({ commit, dispatch }, { num }) {
    commit("UPDATE_STARS", num);
},
```

Now that those are available, lets import them in `Home.vue`:

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

Use them inside our `flipCard()` method after we increase out number of moves:

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

Lets add some logic when we find a match:

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

:::tip
You should see the stars updating as you play.
* 3 stars = 30 moves or less
* 2 stars = 40 moves or less
* 1 star = 50 moves or less
:::

***

Now, lets add make sure we can start a new game and reset all of the game data when we press the reset button. Lets update our store first:

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

Import `clearGame` with mapActions.
Lets add a `newGame()` method inside `Home.vue`:

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

Add `newGame` to reset button:

```html
<button @click="newGame" class="restart buttonGray">
    <i class="fa fa-repeat"></i>
    <span class="reset">Reset</span>
</button>
```

***

Lets add a congratulations message when the game is finished!
We will use the `Winning` component. Lets import it and add it to components:

```js
// inside script
import Winning from "@/components/Winning.vue";

// export default
components: {
    Winning
},
```
Lets show it once the game is won and hide the board:
```html
<Winning v-if="win" :newGame="newGame"></Winning>
<main v-else class="container">
```
> We are passing `newGame` to be able to restart the game while the board is hidden

Inside `Winning.vue`, lets add a congratulatory message and a button to restart the game!

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

Inside the script, lets bring over the `newGame` and `stars`:

```js
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
> Don't forget to remove the {{card.name}} that shows the name of the card!

## Add UI finishing touches!
In `Home.vue` add the following styles:
```css

// Buttons

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

// MEDIA QUERIES
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
If you are stuck, feel free to [start from here](https://codesandbox.io/s/vuevixens-mini7-functionality-added-2mxse)
:::


## Challenge
Lets add Assistive Technology support! Lets announce route changes and inform screen reader about important actions!

* Get 100% Lighthouse score!
* Announce which cards are flipped
* Announce when match is made
* Announce how many matches are left to find
* Announce how many stars player won with
* Announce route changes
* Check for keyboard funstionality
* Disable matched cards

## Resources
[Project Starting Point](https://codesandbox.io/s/vuevixens-mini7-start-6g0cj)

[Project Checkpoint 1 - Added Cards](https://codesandbox.io/s/vuevixens-mini7-added-cards-upuhh)

[Project Checkpoint 2 - Added Functionality](https://codesandbox.io/s/vuevixens-mini7-functionality-added-2mxse)

[Finished project](https://codesandbox.io/s/vuevixens-mini7-end-qyr1b) 

## Author

Made with ❤️ by Maria Lamardo
