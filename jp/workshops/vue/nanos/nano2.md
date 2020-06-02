# ☎️ 2: APIを実行するためにAxiosを使おう (中級)

| **プロジェクトのゴール**            | このnanoプロジェクトの目標は、ランダムな猫の画像を取得するための簡単なアプリ作成方法を学ぶことです。                             |
| --------------------------- | -------------------------------------------------------------------------------------- |
| **あなたが学べること**       | **axios**を使ったHTTPコール作成の基礎を学びます。           |
| **必要なツール**       | ChromeやFirefoxなどの最新のブラウザと、[Visual Studio Code Editor](https://code.visualstudio.com/download) へのアクセス |
| **かかる時間** | 10 minutes                                                                             |

# ランダムな猫の画像ビュワーを作ります。

猫の画像を取得するため、[**Axios**](https://github.com/axios/axios)を使用してリモート _API_ へHTTPコールを実行する、簡単なアプリを作成していきます。

::: ヒント 💡
API は _Application Programming Interface_　の略です. とても簡単に言えば、データを取得または送信するためにリクエストを作成できるURL群のことです。
:::

## はじめに

[CodeSandbox](https://codesandbox.io) にアクセスし、 [新しい **Vue** テンプレートを作成しましょう](https://codesandbox.io/s/vue)。

The sandbox will set up a new Vue application where we can write our code, and it will be automatically compiled and rendered in the window on the right.

## Preliminary Code Clean Up

Go to `App.vue` and remove everything from inside the `div` with the id `#app` and clear the `<script>` tag. In the end, your file should look like this:

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

The reason you're doing this is so that you have a clean slate without all the boilerplate stuff Codesandbox adds.

## Adding Axios to the project

Now you need to add **Axios** to the project!

Head over to the left side menu bar and click the `Dependencies` tab. Once it has expanded, click the `Add Dependency` button and search for `axios`. Click on it once you find it on the list and _voilà_, it's added to your project dependencies.

::: tip 💡
Are you following this nano on a local development enviroment outside the Codesandbox environment? Install `axios` by running `npm install axios` or `yarn add axios` on your terminal on the project root.
:::

## Importing the Axios library

Before you can start making all the _cat-tastic_ HTTP calls, you need to add the `axios` library to your component.

::: tip 💡
Just adding a dependency to the project doesn't automatically _include_ it to your components. In Vue, you need to manually import the dependencies you are going to use.
:::

Head to `App.vue` again and add this `import statement` directly below the opening `<script>` tag:

```js
import axios from 'axios';
```

Now you can use `axios` on your component.

## Create the API call

It's time to prepare a function to call the Cat API.

Go inside the `export default { }` block and add a new method:

```js
export default {
	name: 'App',
	methods: {
		fetchNewCat() {
			axios
				.get('https://api.thecatapi.com/v1/images/search')
				.then(response => {
					console.log('Search complete!');
					console.log(response);
				})
				.catch(err => {
					console.log('Search failed!');
					console.log(err);
				});
		},
	},
};
```

This may be overwhelming to see for the first time, so let's break it down in digestible pieces.

First, you are declaring a new method `fetchNewCat` that will take no parameters `()`.

Inside this method, you start our `axios` call by calling `.get`:

```js
axios.get('https://api.thecatapi.com/v1/images/search');
```

`Axios` works with the so-called [_HTTP Verbs or HTTP Methods_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Here you are making a _GET_ type call to the **https://api.thecatapi.com/v1/images/search** URL.

The most "common" ones are:

-   GET - To GET information _from_ an HTTP URL
-   POST - To POST information _to_ an HTTP URL

::: tip 💡
_Which method should I use?_ It depends! Working with APIs involves usually interacting with its creator or diving into the documentation. `GET` and `POST` are used 99% of the time, but some APIs (REST APIs in particular) may use a lot more.
:::

Axios returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which is a JavaScript object that holds the response from an _asynchronous_ HTTP call.

If this call succeeds, then the code inside the `then` block is executed. If there is a problem, then the code inside the `catch` block is executed.

In both cases you're just going to print the results to the console for now.

Let's quickly add a button to our app so you can call this API ad hoc.

Add this markup to your `<template>`:

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

This is logging the `response` parameter in our `then` block. You are getting back a JS _Object_ with a bunch of data about the HTTP call you just made, like the `status` and `headers`.

Inside this object you also get a `data` array which holds the actual response that the API returned. In this case, it's another _Object_ that holds the information for your cat picture.

**Congratulations!** That's all it take to make a simple API call using Axios!

## Using the Data

This app is kind of basic right now if you don't do anything with the data, so let's put it to good use. Let's store the `URL` of the cat image inside a property in our app so we can put it on the screen.

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
	<div id="app"><button @click="fetchNewCat">New Cat</button> <img :src="catImage" alt="Cat Image" /></div>
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

## Conclusion and Challenge

Making HTTP calls adds dynamic functionality to your app and is a core functionality to learn for any front-end developer.

Your challenge, if you're feeling **bold**, is to go to https://docs.thecatapi.com/api-reference and see if you can implement a more complex GET call passing parameters, or even make a POST call to upload your own cat image!

PS. You will need the `axios` documentation on hand. https://github.com/axios/axios

## Badge

![Call API Badge](./images/call-api-badge.png)

## Author

Made with ❤️ by Marina Mosti
