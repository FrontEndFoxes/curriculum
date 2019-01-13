# ☎️ Nano Activity X: Create a Computed Property to Display Today's Date

| **Project Goal**            | Learn about computed properties by building a simple app|
| --------------------------- | -------------------------------------------------------------------------------------- |
| **What you’ll learn**       | You will learn how computed properties work and how to use them.             |
| **Tools you’ll need**       | A modern browser like Chrome/Firefox. Access to [CodeSandbox](https://codesandbox.io). |
| **Time needed to complete** | 10 minutes                                                                             |

# Create a simple computed property

Today you will create a very simple application that displays today's date, and will learn about how computed properties work and how you can use them in your own projects.

## Get Started

Head over to [CodeSandbox](https://codesandbox.io) and [create a new **Vue** template](https://codesandbox.io/s/vue).

The sandbox will set up a new Vue application where we can write our code, and it will be automatically compiled and rendered in the window on the right.

## Preliminary Code Clean Up

Go to `App.vue` and remove everything from inside the `div` with the id `#app` and clear the `<script>` tag. (We can keep the code inside the `<style>` blocks as it won't get in our way.) In the end, your file should look like this:

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

## Setting up a label

Let's set up a `<p>` to display our current date, go inside the `<div id="app">` block and add:
```js
<p>Today is: {{ today }} </p>
```

Right now it won't work, because `today` is a property that hasn't been defined yet. You will do that shortly.

## Creating a computed property

Computed properties are `functions` that can calculate a value and return data that will be used in our template. In our case, we will use them to create a `Date` object, and return it's string representation only.

This type of logic would be cumbersome to maintain if placed inside line blocks on our template, and may even be impossible if the logic is too complex due to the templating engine limitations.

Rule of thumb is, whenever you need to `calculate` a value, or change a value in any way - use computed properties.

Go ahead and create a computed property block inside the `export default` block, and add a function to store our `today` computed property:

```js
computed: {
    today() {
      
    }
  }
``` 

Computed properties are always defined as functions inside the `computed` property of our export object.

Now, go ahead and add the block that gives us our current date and time string:

```js
<script>
export default {
  computed: {
    today() {
      const today = new Date();
      return today.toString();
    }
  }
};
</script>
```

As soon as you add this code, you should see on the right hand screen that your app immediately grabs the result of this function and places is on the `<p>` we created on the first step. Now, wait a few seconds and reload the app and watch closely at the seconds timer.

The label is changing because the computed property is being recalculated with the current time.

::: tip 💡
_Computed properties behave the same way as functions?_ If you're asking yourself this question you're on the right track. The short answer is yes, they both execute a function and return a result that is then used on your template to change some behavior. The long and correct answer is, no. 

*Methods* are executed EVERY TIME the app needs to get this value, so every time a component is rendered, for example, the whole function needs to be re-executed to return the value. This can be _OK_ for simple methods, but if you are `v-for` looping through a hundred items, the performance can start to take a hit.

*Computed properties* on the other hand can _cache_ their result based on the dependencies of the function. In very simple terms, if your computed property is calculating something based on one of your static properties for example, it won't be re-executed until this second property changes!
:::

The entire code of your `App.vue` file should look like this:

```js
<template>
  <div id="app">
    <p>Today is: {{ today }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    today() {
      const today = new Date();
      return today.toString();
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
