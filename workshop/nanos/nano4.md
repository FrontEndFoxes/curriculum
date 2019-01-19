# ☎️ Nano Activity X: Create a Computed Property to Display Today's Date

| **Project Goal**            | Learn about computed properties by building a simple app that calculates the days since your birthday|
| --------------------------- | -------------------------------------------------------------------------------------- |
| **What you’ll learn**       | You will learn how computed properties work and how to use them.             |
| **Tools you’ll need**       | A modern browser like Chrome/Firefox. Access to [CodeSandbox](https://codesandbox.io). |
| **Time needed to complete** | 10 minutes                                                                             |

# Create a simple computed property

Today you will create a very simple application that calculates the number of days since your birthday, and will learn about how computed properties work and how you can use them in your own projects.

## Get Started

Head over to [CodeSandbox](https://codesandbox.io) and [create a new **Vue** template](https://codesandbox.io/s/vue).

The sandbox will set up a new Vue application where we can write our code, and it will be automatically compiled and rendered in the window on the right.

## Preliminary Code Clean Up

Go to `App.vue` and remove everything from inside the `div` with the id `#app` and clear the `<script>` tag, leave the `export` statement though, we'll need it soon. (We can keep the code inside the `<style>` blocks as it won't get in our way.) In the end, your file should look like this:

```js
<template>
  <div id="app">

  </div>
</template>

<script>
export default {
  
};
</script>
```

The reason you're doing this is so that you have a clean slate without all the boilerplate code Codesandbox adds.

## Setting up a label and form input

Let's set up a `<p>` to display our result, and an `<input>` element so we can tell the app when our birthday is, go inside the `<div id="app">` block and add:
```js
<div id="app">
  <input
    v-model="birthdate"
    type="text"
    placeholder="Enter your birthday here"
  />
  <p>
    Days since my birthday: <strong>{{ daysSinceBirth }}</strong>
  </p>
</div>
```

Right now it won't work and you will probably get some errors since we are missing some properties. Let's start with the `v-model="birthday"` prop, in which we will store our input.

Head over to the `export` block, and add a new local data store.

```js
data() {
  return {
    birthdate: null
  };
}
```

Next, we will need a function that calculates the times between two given dates. Let's add a new `method`.

```js
methods: {
  daysBetween(date1, date2) {
    //Get 1 day in milliseconds
    const dayInMs = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const dayOneInMs = date1.getTime();
    const dayTwoInMs = date2.getTime();

    // Calculate the difference in milliseconds
    const differenceInMs = dayTwoInMs - dayOneInMs;

    // Convert back to days and return
    return Math.round(differenceInMs / dayInMs);
  }
} 
```

## Creating a computed property

Computed properties are `functions` that can calculate a value and return data that will be used in our template. In our case, we will use them to calculate the number of days between the user's birthday and today's date, after we will return it as a number that can be displayed inside our `<p>` tag.

This type of logic would be cumbersome to maintain if placed inside line blocks on our template, and may even be impossible if the logic is too complex due to the templating engine limitations.

Rule of thumb is, whenever you need to `calculate` a value reactively when another property changes - use computed properties. In this case, we want to calculate the number of days every time our user changes the date inside our `<input>`. This input is attached to our `data` storage with the `birthday` property. We will use this property inside our `computed` property and it will become its dependency. (Don't worry, Vue will do this behind the scenes and automatically figure out that our computed property depends on `birthday` to be calculated).

Go ahead and create a computed property block inside the `export default` block to calculate the `daysSinceBirth` that we defined in our template:

```js
computed: {
  daysSinceBirth() {
    if (!this.birthdate) return 0;

    return this.daysBetween(new Date(this.birthdate), new Date());
  }
}
``` 

Computed properties are always defined as functions inside the `computed` property of our export object.

First, we are checking that the `birthday` property has already been defined inside `if`statement, if it's still null we will simply return 0.

After, we calculate the number of days between the first date, `the date the user inputs`, and the second date `today`.

::: tip 💡
Javascript's `Date` will return today's date when it recieves no arguments.
:::

Reload your app and type up your birth date on the input field. You will see as you type that the app is actually recalculating the value of `daysSinceBirth` with each keystroke. This happens because it's `dependencies` are changing, in this case - our data property `birthdate`!

::: tip 💡
_Computed properties behave the same way as functions?_ If you're asking yourself this question you're on the right track. The short answer is yes, they both execute a function and return a result that is then used on your template to change some behavior. The long and correct answer is, no. 

*Methods* are executed EVERY TIME the app needs to get this value, so every time a component is rendered, for example, the whole function needs to be re-executed to return the value. This can be _OK_ for simple methods, but if you are `v-for` looping through a hundred items, the performance can start to take a hit.

*Computed properties* on the other hand can _cache_ their result based on the dependencies of the function. In very simple terms, if your computed property is calculating something based on one of your static properties for example, it won't be re-executed until this second property changes!
:::

The entire code of your `App.vue` file should look like this:

```js
<template>
  <div id="app">
    <input
      v-model="birthdate"
      type="text"
      placeholder="Enter your birthday here"
    />
    <p>
      Days since my birthday: <strong>{{ daysSinceBirth }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      birthdate: null
    };
  },
  computed: {
    daysSinceBirth() {
      if (!this.birthdate) return 0;

      return this.daysBetween(new Date(this.birthdate), new Date());
    }
  },
  methods: {
    daysBetween(date1, date2) {
      //Get 1 day in milliseconds
      var one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();

      // Calculate the difference in milliseconds
      var difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      return Math.round(difference_ms / one_day);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

[![Edit Vue Vixens Computed Properties Nano](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jpqvv2rv1w)

## Conclusion and Challenge

Understanding the importance and use of computed properties is key to developing more powerful and complex Vue applications.

Your challenge today, is to create a computed property that will display your name in reverse! *Hint* You will need to `split` your name *string* into an array, and `reverse` it.

Good luck!

## Badge



## Author

Made with ❤️ by Marina Mosti
