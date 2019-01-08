# 👩‍🎓 Nano Activity (number): Title of Activity

| **Project Goal**            | We're building a simple app to fetch random Cat Images :)                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | The goal is to undertand the basics of making an HTTP call with **axios**                                                                                             |
| **Tools you’ll need**       | A modern browser like Chrome/Firefox. Access to [CodeSandbox](https://codesandbox.io). |
| **Time needed to complete** | 10 minutes


# We're going to create a random cat picture viewer

You will be creating a simple Vue app that will make HTTP calls through [**Axios**](https://github.com/axios/axios) to a remote _API_ to get cat images.

::: tip 💡
API means _Application Programming Interface_, in **very** simple terms - it's a bunch of URLs to where we can make requests to either get or send data!
:::

## 1. Get Started

Head over to [CodeSandbox](https://codesandbox.io) and [create a new **Vue** template](https://codesandbox.io/s/vue).

The sandbox will set up a new Vue application where we can write our code, and it will be automatically compiled and rendered on the right hand window.

## 2. Step 1 - Cleaning up

Go to `App.vue` and remove everything from inside the `div with ID #app` and clear the `<script>` tag to look like this:

```js
<template>
  <div id="app">
    
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>
```

We're doing this so that we have a clean slate without all the boilerplate stuff Codesandbox puts in.

## 3. Step 2 - Adding Axios to the project

Now we need to add **Axios**  to our project! 

Head over to the left side menu bar and click the `Dependencies` tab. Once it has expanded, click the `Add Dependency` button and search for `axios`. Go ahead and click on it once you find it on the list and _voilà_, its added to our project dependencies.

::: tip 💡
Are you following this nano on a local development enviroment? Install `axios` by running `npm install axios` or `yarn add axios` on your terminal on the project root. This assumes you know how either `npm` or `yarn` package managers work!
:::

## 4. Step 3 - Importing the Axios library

Before we can start making all our _cat-tastic_ HTTP calls, we need to add the `axios` library to our component.

::: tip 💡
Just adding a dependency to the project doesn't automatically _include_ it to your components. In Vue, you need to manually import the dependencies you are going to use!
:::

Head to `App.vue` again and add this `import statement` directly below the opening `<script>` tag:

```js
import axios from "axios";
```

All set, now we can use `axios` on our component.

## 5. Creating the API call

Let's prepare a function to call our Cat API.

Go inside the `export default { } ` block, and let's add a new method:

```js
export default {
  name: "App",
  methods: {
    fetchNewCat() {
      axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then(response => {
          console.log("Search complete!");
          console.log(response);
        })
        .catch(err => {
          console.log("Search failed!");
          console.log(err);
        });
    }
  }
};
```

This may be overwhelming to see for the first time, so let's break it down in digestible pieces.

First, we are declaring a new method `fetchNewCat` that will take no paramters `()`.

Inside this method, we start our `axios` call by doing:
```js 
axios.get("https://api.thecatapi.com/v1/images/search")
```

`Axios` works with the so called [_HTTP Verbs or HTTP Methods_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), so here we are making a _GET_ type call to the **https://api.thecatapi.com/v1/images/search** URL.

The most "common" ones are:
* GET - To GET information _from_ an HTTP URL
* POST - To POST information _to_ an HTTP URL 

::: tip 💡
_Which method should I use?_ Depends! Working with APIs involves usually asking the creator or diving into the documentation. GET and POST are used 99% of the time, but some APIs (REST in particular) may use a lot more.
:::

Axios returns a so called [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which is a javascript object that holds the response from an _asynchronous_ HTTP call.

If this call succeeds, then the code inside the `then` block is executed. If there is a problem, then the code inside the `catch` block is executed.

In both cases were just going to console log the results for now.

Let's quickly add a button to our app so we can call this API on demand.

Add this to your `<template>`:
```js 
<template>
  <div id="app">
    <button @click="fetchNewCat">New Cat</button>
  </div>
</template>
```

Go ahead and click on the button on the right hand screen and open up the **Console** tab on the very bottom of your screen.

You will see an output that is very similar to this:

![consoleoutput](./images/axios-consoleoutput.png)

This is logging the `response` parameter in our `then` block. We are getting back a JS _Object_ with a bunch of data about the HTTP call we just made, like the `status`, `headers`, etc.

Inside this object we also get a `data` array which holds the actual response that our API gave us. In this case, its another _Object_ that holds the information for our cat picture!

**Congratulations!** That's all it take to make a simple API call using Axios!

## 6. Using the data

The app is kind of lame right now if we don't do anything with the data, so let's put it to good use. Let's store the `URL` of the cat image inside a property in our app so we can put it on the screen.

Go into the `export default {}` block again, and add a `catImage` property, and let's store the `URL` in our `then` block.

```js
<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      // Were storing the cat image url in this prop
      catImage: null
    };
  },
  methods: {
    fetchNewCat() {
      axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then(response => {
          console.log("Search complete!");
          console.log(response);

          // Add the cat image url to our app property
          this.catImage = response.data[0].url;
        })
        .catch(err => {
          console.log("Search failed!");
          console.log(err);
        });
    }
  }
};
</script>
```

Finally, let's create an image on our markup to show our result:

```html 
<template>
  <div id="app">
    <button @click="fetchNewCat">New Cat</button> 
    <img :src="catImage" alt="Cat Image" />
  </div>
</template>
```

Now click the "New Cat" button and behold! (PS. You can click again for new images!)

The entire code of your `App.vue` file should look like this:

```js
<template>
  <div id="app">
    <button @click="fetchNewCat">New Cat</button> <img :src="catImage" alt="" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      catImage: null
    };
  },
  methods: {
    fetchNewCat() {
      axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then(response => {
          console.log("Search complete!");
          console.log(response);

          this.catImage = response.data[0].url;
        })
        .catch(err => {
          console.log("Search failed!");
          console.log(err);
        });
    }
  }
};
</script>
```

You can also see the completed app here: [![Edit Nano - Axios Cats](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zr6444nl0m)

## Conclusion and challenge

Making HTTP calls adds dynamic functionality to your app and is a core functionality to learn for any front-end developer :)

Your challenge, if you're feeling **bold** is to go to https://docs.thecatapi.com/api-reference and see if you can implement a more complex GET call passing parameters, or even make a POST call to upload your own cat image!

PS. You will need the `axios` documentation on hand. https://github.com/axios/axios

## Badge

Add the badge image here, available for download

## Author

Made with ❤️ by your Marina Mosti







