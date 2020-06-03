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

The sandbox will set up a new Vue application where we can write our code, and it will be automatically compiled and rendered in the window on the right.このサンドボックスはコードを記載できる新しいVueアプリのセットアップをしてくれます。また、自動でコンパイルされ、ウィンドウの右にレンダリングされます。

## デフォルトで記載されているコードのクリーンナップ

`App.vue` を開き、idが `#app` の `div` 内のコードを全て削除しましょう。`<script>` タグも整理しましょう。最終的にあなたのファイルはこのようになっているのが望ましいです。：

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

これを行う理由は、Codesandboxが追加している例文コードを取り除き、必要最小限のコードにするためです。

## プロジェクトにAxiosを追加

それでは、 **Axios** をプロジェクトに追加しましょう！

左のサイドメニューバーで `Dependencies` をクリックしましょう。開いたら、 `Add Dependency` ボタンをクリックし、 `axios` を検索してください。検索結果のリストで`axios` を見つけてクリックしたら _ジャジャーン!_ 、project depenciesに追加されます。 

::: ヒント 💡
このnanoプロジェクトをCodesandboxではなく、ローカル開発環境で試してみていますか？
その場合は、プロジェクトrootに移動して、ターミナルで `npm install axios` または `yarn add axios` を実行し、 `axios` をインストールしましょう。
:::

## Axios ライブラリのインポート

全ての _cat-tastic_ HTTPコールの呼び出しを始める前に、コンポーネントに `axios` ライブラリを追加する必要があります。

::: ヒント 💡
プロジェクトにdependencyを追加しただけでは、自動的にはコンポーネントに _インクルード_ されません。Vueにおいては、これから使用する dependenciesを手動でインポートしなければなりません。
:::

 `App.vue` を再び開き、この `import statement` を直接、 `<script>` タグの下に追加しましょう:

```js
import axios from 'axios';
```

これで、あなたのコンポーネントで `axios` が使えるようになりました。

## APIコールの作成

猫APIをコールするための関数を準備していきましょう。

 `export default { }` ブロック内に入って、新しいメソッドを追加してみましょう。:

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

このコード初めてみたら、難しそうと圧倒されてしまうかもしれません。　なので、理解しやすいように細かくみていきましょう。

まず、新しいメソッド `fetchNewCat` を定義していきます。これは `()` パラメータは必要ありません。

このメソッド内で、`.get`　を実行し、 `axios` コールを開始します。：

```js
axios.get('https://api.thecatapi.com/v1/images/search');
```

`Axios` は、いわゆる [_HTTP Verbs or HTTP Methods_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)と一緒に動きます。つまり、あなたは今、**https://api.thecatapi.com/v1/images/search** というURLに対して、 _GET_ タイプのコールを作成しようとしているのです。

The most "common" ones are:
最も "一般的な"　コールのタイプは：

-   GET - ある HTTP URL _から_ 情報を取得
-   POST - ある HTTP URL _へ_ 情報を送信

::: ヒント 💡
_どのメソッドをを使ったらいいの?_ 場合によります！ APIの操作は通常、その作成者とのやりとりや、ドキュメントの取得を含みます。99% の割合で `GET` と `POST` が使用されますが、API（特にREST API）によっては、もっと他のものを使うものもあります。
:::

Axiosは[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)を戻り値として返します。これは _非同期_ HTTP コールからの応答を扱うJavaScriptのオブジェクトです。

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
