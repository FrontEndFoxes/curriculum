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

## APIコールの呼び出し

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

このコールが成功したら、 `then` ブロック内のコードが実行されます。もしエラーが発生した場合は、 `catch` ブロック内のコードが実行されます。

どちらのケースでも、とりあえず今はコンソールに結果をただ表示することにしましょう。

さあ、このAPIをコールできるように、手短にアプリにボタンを追加しましょう。

このマークアップを `<template>` に追加します。:

```js
<template>
  <div id="app">
    <button @click="fetchNewCat">New Cat</button>
  </div>
</template>
```

画面右のボタンをクリックし、画面のかなり下の方にある **Console** タブを開いてみてください。

このような出力が見てとれるはずです：

![consoleoutput](./images/axios-consoleoutput.png)

これは `then` ブロック内の `response` パラメータをログしたものです。先ほど作成したHTTPコールに関するデータを伴ったJS _オブジェクト_ を取得します。  

このオブジェクト内では、APIが返した実際のレスポンスが格納されている `data` 配列も取得します。このケースでは、猫の画像情報を格納している _オブジェクト_ を取得します。

**おめでとうございます!** これで、Axiosを使った簡単なAPIを作成することができました！

## データの使用

取得したデータを使って何かしない限り、このアプリは今のところ、ベースとなる何か、といったところでしょう。なので、これを上手く活用してみましょう。猫画像の `URL` をアプリの変数内に格納し、画面上に表示できるようにしましょう。

`export default {}` ブロックに戻って、 `catImage` 変数を追加し、 `then` ブロック内で `URL` を格納してみてください。

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

最後に、これまでやったことの成果を確認するため、マークアップにimageを作成しましょう。:

```html
<template>
	<div id="app"><button @click="fetchNewCat">New Cat</button> <img :src="catImage" alt="Cat Image" /></div>
</template>
```

さあ、 "New Cat" ボタンをクリックし、確認してみてください！　（追伸 もう一度クリックすると新しい画像が！）

 `App.vue` の全コードはこのようになっているはずです：

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

さらに、こちらで完成したアプリを確認できます。: [![Edit Nano - Axios Cats](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/zr6444nl0m)

## まとめとチャレンジ

HTTPコールの呼び出しはアプリに動的な機能を追加し、さらに、これはフロントエンドディベロッパーにとって学ぶべきコア機能の一つです。

あなたがもっと難しいことに挑戦したいという気持ちなら、チャレンジとして、 https://docs.thecatapi.com/api-reference にアクセスし、パラメータを渡してもっと複雑なGETコールを実装できることや、あなたが所有している猫画像をアップロードするPOSTコールも作成できることを確認してください！

追伸　`axios` ドキュメントを手元に置いておくといいでしょう。 https://github.com/axios/axios

## バッジ

![コールAPIバッジ](./images/call-api-badge.png)

## 著者

Made with ❤️ by Marina Mosti
