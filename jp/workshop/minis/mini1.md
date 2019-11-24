# 🐶 Chapter 1: ペット管理アプリケーション

| プロジェクトのゴール | Vueアプリケーションのセットアップ、コンポーネントの基本、Axiosを使用した簡単な REST API コールの実行 |
| --- | --- |
| このワークショップで学ぶこと | Vue アプリケーションのセットアップ、コンポーネントの基本、Axios を使用した簡単なREST APIコールの実行 |
| 必要なツール | Chrome のようなモダンブラウザ、 [Codesandbox](https://codesandbox.io/) （アカウントを作成して、作業のバージョンをそのまま維持するようにしてください） |
| かかる時間 | 1時間 |
| アプリケーションを試してみたいですか？ | [Code Sandbox link](https://codesandbox.io/s/q3kk74yp1w) |

# イントロダクション

## Scaffold your app - アプリケーション基盤の構築

[CodeSandbox](http://codesandbox.io/) でゼロから始めましょう。 [ここ](https://codesandbox.io/s/vue) をクリックして、コードサンドボックスアカウントを作成し、スターター Vue.js テンプレートを作成します。

ランダムな犬の画像をロードしてお気に入りに保存するアプリケーションを作成します。

![](https://vuevixens.github.io/docs/assets/img/mini2_1.97e0e6ec.png)

基本的な Vue.js アプリ用に CodeSandbox が Scaffold したコードを見てください。
ファイル `main.js` はデフォルトでオープンしています。これは、Vue.js アプリケーションの主要なスタートポイントです。

このファイルでは、npm パッケージから Vue をインポートすることに注意してください: `import vue from "vue";`

Sandbox は、アプリをビルドするために必要なすべての依存関係を npm からインポートします。 ルートにある package.json をいつでもチェックアウトして、必要な依存関係を見つけることができます。

main.js は、アプリケーションを新しい Vue.js アプリケーションとして初期化し、アプリコードが挿入される div を設定します。

```js
new Vue({
  render: h => h(App),
}).$mount('#app');
```

`App.vue` を開きます。このファイルでは、「home」コンポーネントがビルドされています。 Vue.js シングルファイルコンポーネント（SFC）の 3つの主要部分、テンプレート、スクリプトブロック、スタイルブロックが含まれています。

テンプレートブロックの最初の div の ID は「app」であることに注意してください。これは、アプリコードが挿入される div です。 ロゴ画像の下に含まれる `<HelloWorld>` コンポーネントもあります。 これは、 `App.vue` に含まれる SFC の例です。

`components/HelloWorld.vue` を開くと、 `App.vue` に埋め込まれているリンクのリストのソースが見つかります。 このファイルには、 `msg` 変数と `<style>` ブロック内のいくつかのスタイルを持つスクリプトブロックも含まれます。

このサンプルアプリを利用して再作成します！ さあ始めましょう。

## Add the Styles - スタイルの実装

「main.js」に変更を加える必要がないため、「App.vue」から始めましょう。ファイルの下部に次のスタイルブロックを追加し、現在の `<style>`ブロックを置き換えます。

```css
<style>
img {
  max-width: 100%;
}

h1 {
  padding-bottom: 15px;
}

.dogs-layout {
  width: 100%;
  background: #fff center repeat;
  background-image: url("https://github.com/VueVixens/projects/blob/master/petshop/images/bg3.jpg?raw=true");
}

.dogs-overlay {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .dogs-overlay {
    margin: 0;
  }
}

.dog-card {
  width: 100%;
  max-width: 600px;
}
</style>
```

> 💡
> スタイルブロックの一部として `<scoped>` を使用していないことに注意してください。「scoped」キーワードは、スタイルが現在の SFC に対してのみ有効であることを保証しますが、ここではスタイルをグローバルにするつもりです。

このスタイルブロックは、相対パスではなく、Github でホストされる外部イメージへのパスを使用します。これは、CodeSandbox が画像を簡単にホストできないためです。通常は、 `/images/myImage.png` などの相対パスに画像を追加するだけです。

スタイルシートを追加しても、既存のスタイルを変えることを除いて、テンプレートはあまり変わりませんでした。テンプレートを修正しましょう！

## Install Vuetify - Vuetify の導入

テンプレートを編集する前に、Vuetify をインストールします。Vuetify は、Vue アプリケーションにマテリアルデザインスタイリングを提供するクールなライブラリです。

> 💡
> Vuetify は、Vue のセマンティックコンポーネントフレームワークです。アプリケーションを構築するための、クリーンでセマンティックで再利用可能なコンポーネントを提供することを目的としています。 [ここ](https://vuetifyjs.com/ja/getting-started/quick-start) で完全なドキュメントを見つけることができます。

CodeSandbox の左側の Dependency ドロップダウンエリアにある「Add Dependency」ボタンをクリックしてインストールします。「Vuetify」を検索します。

次に、リスト内のライブラリをクリックしてインストールします。

`package.json` を開き、「dependencies」オブジェクトを確認して、依存関係がインストールされているかどうかを確認します。次のようになっているはずです。

```json
"dependencies": {
    "vue": "^2.6.10",
    "vuetify": "2.0.19"
},
```

> 💡
> Note: このとき、Vuetify のバージョンが `2.0.19` になっていない場合はバージョンを `2.0.19` に固定してください。 `2.1.1` などのバージョンだと、後のステップで互換性の問題によりうまく動作しない可能性があります。

Vuetify はプラグインストラクチャを用いて機能します。プロジェクトの `/src` フォルダーで、 `plugins` という新しいフォルダーを作成し、その中に `vuetify.js` という新しいファイルを作成します。

> 💡
> CodeSandbox で、新しいフォルダーを右クリックして新しいファイルを作成します。これらの新しいアセットを `/src` フォルダーに作成するよう注意してください！

新しい `vuetify.js` ファイルで、以下のコードを追加してプラグインを実行できるようにします。

```js
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

export default new Vuetify();
```

次に、 `main.js` を開いて 2番目の `import` （3行目）の下に、以下の行を追加して Vuetify を初期化します。 

```js
import vuetify from "@/plugins/vuetify";
```

そして `main.js` の下部にある Vue を初期化している部分を、以下のように変更します。

```js
new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
```

これにより、Vuetify のテーマとコンポーネントが Vue アプリケーション全体で利用可能になります。

このアプリケーションではアイコンを使用するため、  `index.html` ファイルの `head` 部分にマテリアルアイコンを追加する必要があります。このファイルは `public` フォルダーにあります。
`<title>` タグの後に次の行を挿入します。

```html
<link
  href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
  rel="stylesheet"
/>
```

ページのタイトルを「Dog Lover」に変更しましょう。そのために、 `title` タグのコンテンツを変更します。

```html
<title>Dog Lover</title>
```

次に、 `App.vue` の現在のテンプレートを次のマークアップで上書きします。

```html
<template>
  <v-app>
    <v-content class="dogs-layout">
      <v-container fill-height>
        <div class="dogs-overlay">
          <h1 class="display-2 text-xs-center">Choose your favorite dogs</h1>
          <v-card class="dog-card">
            <v-img height="400px"></v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="red">favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>forward</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>
```

アプリを更新する必要があります。
（更新されない場合は、アプリのプレビューアドレスバーの手動更新ボタンを使用してください）

ワォ！それは大きな変化をもたらしました！

> 💡
> このテンプレートマークアップでの `<v-app>` の使用に注目してください — これは Vuetify の要件であり、Vuetify を使ったアプリケーションを作成しているという確実なサインです。
> また、 `v-container` などの Vuetify のレイアウト要素と、 `v-card` や `v-btn` などの UI コンポーネントも使用しています。

## Add some data - データの操作

この時点で、UI にデータを入力する必要があります。最初にしたいことは、 `v-card` 内に犬の画像を表示することです。見た目を検証する目的で静的リンクを追加しましょう。 `App.vue` のテンプレートで、 `v-img` の  `src` プロパティを変更します。

```html
<v-img
  height="400px"
  src="https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
></v-img>
```

かわいいね！🐶

しかし、考えていることはこのリンクを動的にすることなので、最初の Vue 変数を作成します。まず、 `data()` を Vue コンポーネントに追加する必要があります。
この関数は、Vue 変数のオブジェクトを返す必要があります。 `<script>` ブロックで作成しましょう。  `App.vue` の現在の `<script>` ブロックを上書きします。

```js
<script>
export default {
  data() {
    return {
      currentDogLink: ""
    };
  }
};
</script>
```

> 💡
> この時点で、 `components` フォルダーから `HelloWorld.vue` ファイルを削除することができます。CodeSandbox でファイルを右クリックし、「Delete」をクリックします。

これで、 `currentDogLink` という変数があり、デフォルト値は空の文字列です。この変数を使用して、 `v-img` の現在の犬へのリンクを提供します。

```js
data() {
  return {
    currentDogLink: "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
  };
}
```

ここで、テンプレートを変更して `src` プロパティを _動的_ にし、上記で設定した変数の値を使用できるようにする必要があります。
これを行うには、 `v-bind` ディレクティブまたはそのショートカット `:` が必要です。再び `App.vue` で、 `<v-img>` タグを編集して、ハードコーディングされた値を削除します。

```html
<v-img height="400px" :src="currentDogLink"></v-img>
```

> 💡
> `v-bind` ディレクティブは、1つ以上の属性、またはコンポーネントのプロパティ（props）を式に動的にバインドします。その小さな `:` がすべての違いを生みます！

グレート！今度は API からいくつかの犬をロードします！

## Add Axios - Axios の導入

API 呼び出しを実行するには、[Axios](https://github.com/axios/axios) というライブラリが必要です。これは、ブラウザと他の Node.js 環境の両方で機能するプロミスベースの HTTP クライアントです。

> 💡
> もともと、Vue は .ajax を使用して API 呼び出しを行う独自の方法をサポートしていました。しかし、Axios のスタンドアロンライブラリがこの目的に非常にうまく機能し、統合ソリューションの必要性がなくなったため、このリソースは廃止されました。この決定の詳細については[こちら](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4)をご覧ください。

まず、Axios のライブラリをプロジェクトの依存関係に追加します。CodeSandbox でこれを行うには、「Add Dependency」ボタンをクリックして「axios」を検索します。最新バージョンをインストールします。

API 呼び出しを実行するコンポーネント `App.vue` に Axios をインポートします。そのコンポーネントのスクリプトブロックで、 `<script>` のすぐ下に次の行を追加します。

```js
import axios from 'axios';
```

この時点で、 `App.vue` のスクリプト部分は次のようになります。

```js
<script>
import axios from "axios";
export default {
  data() {
    return {
      currentDogLink:
        "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
    };
  }
};
</script>
```

これで、API から画像をロードする準備が整いました。

## Call the API - API コールの実装

最初の API 呼び出しを実行しましょう。そのために、コンポーネント内に `loadNewDog` _メソッド_ を作成します。

> 💡
> `methods` プロパティは、オブジェクト（通常は Vue インスタンス自体または Vue コンポーネント）に生えている関数のリストです。

`data` 関数の直後に追加しましょう。

```js
data() {
  return {
    currentDogLink:
      "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
  };
},
methods: {
 loadNewDog() {}
}
```

今のところ、このメソッドは何もしませんが、 API から新しい犬をロードする必要があります。まず、使用するエンドポイントを確認する必要があります。
API の[ドキュメント](https://dog.ceo/dog-api/)を見ると、エンドポイントとして `https://dog.ceo/api/breeds/image/random` を使うことが分かります。これはランダムな犬の画像を提供します。

GET リクエストを実行するには、Axios は `axios.get` メソッドを使用します。結果は JavaScript のプロミスとなるため、成功と失敗のコールバックを提供してそのライフサイクルを管理します。
ここでは、クエリ結果をコンソールに出力するだけです。引き続き `App.vue` で、中括弧の間に以下のスニペットを置いて `loadNewDog() {}` メソッドを編集します。

```js
axios
  .get('https://dog.ceo/api/breeds/image/random')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```

コンポーネントの作成時に新しいイメージで古いイメージを置き換える必要があるため、 `methods` の直後に `created()` フックを追加しましょう。

```js
created() {}
```

> 💡
> Note: メソッドオブジェクトの後にカンマを追加してから、 `created()` フックを追加してください！

> 💡
> これがアプリの最初のライフサイクルフックです！これらは、コードのブロックをいつ実行するかを細かく制御する場合に非常に便利です。詳細は[こちら](https://jp.vuejs.org/v2/guide/instance.html#%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF)

作成されたフック内で、メソッドを呼び出します。

```js
created() {
  this.loadNewDog();
}
```

ブラウザウィンドウの更新ボタンをクリックすると、コンソールにオブジェクトが表示されます。コンソールに表示されているオブジェクトの左矢印をクリックして展開します。

`data` フィールドに関心があります。ステータスが `success` で、画像の URL を含むメッセージがあることがわかります。

## Use the API - API データの利用

`currentDogLink` をロードされたものに置き換えましょう。このときに、静的な値を削除できます。

```js
data() {
  return {
    currentDogLink: ""
  };
},
```

`loadNewDog` メソッド内で、`response.data.message` （実際には画像URL）を、コンソールに結果を出力するのではなく `currentDogLink` プロパティに割り当てます。

```js
loadNewDog() {
  axios
    .get("https://dog.ceo/api/breeds/image/random")
    .then(response => {
      this.currentDogLink = response.data.message;
    })
    .catch(error => {
      console.log(error);
    });
}
```

これで、ページを更新するたびに、ピカピカの新しい犬画像が表示されます！ 🎉

> 💡
> Note: Vuetify のバージョンが `2.0.19` になっていないとうまく更新されない場合があります。更新がうまくいかない人は、Vuetify のバージョンを確認してみてください。

また、「次へ」の矢印がクリックされたときに同じメソッドを呼び出したいです。このボタンにクリックハンドラーを追加しましょう。 `v-on` ディレクティブまたはそのショートカット `@` を使用できます。テンプレートで、 `forward` アイコンの `v-btn` を編集します。

```html
<v-btn icon @click="loadNewDog">
  <v-icon>forward</v-icon>
</v-btn>
```

「次へ」ボタンをクリックするだけで、新しい画像をロードできるようになりました。

## Build the Favorites - お気に入り機能の構築

ユーザーがお気に入りのパーソナルリストに犬の画像を追加し、現在の犬のビューのすぐ下にこれらの画像のギャラリーを表示できるようにします。リンクを保存するには、もう 1つのデータプロパティ `favoriteDogs` という配列が必要です。
`currentDogLink` の直後に追加し、デフォルトで空にしておきます。


```js
data() {
  return {
    currentDogLink: "",
    favoriteDogs: []
  };
},
```

お気に入りの犬を表示するには、テンプレートを変更する必要があります。`</ v-card>` 終了タグの直後に次のコードスニペットを追加しましょう。

```html
<v-container grid-list-md fluid>
  <v-layout wrap>
    <v-flex xs6 sm4 md2>
      <v-card class="dog-card">
        <v-img height="150px"></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
```

現在の犬のビューの直後に「削除」ボタンが置いてある空のカードが現れます。次に、これらのカード内に `favoriteDogs` アイテムを表示する方法を考えてみましょう。（そう、今は空なのですが、ここにはたくさんの犬が入ります！）

配列に基づいてアイテムのリストをレンダリングするには、Vue の `v-for` ディレクティブが使えます。ここでは、 `favoriteDogs` の配列を反復処理し、各アイテムをレンダリングします。
このディレクティブを、 `v-flex` の開始要素に追加しましょう。コンテナ内に追加した新しいお気に入りのカードの配列を表示します。

```html
<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
```

ここで、`pet` は _現在の配列要素_ への参照であり、`index` は配列内の _この要素のインデックス_ です。

> 💡
> ディレクティブ内でこの名前を選んだことを忘れないでください。 `v-for="(dog, number) in favoriteDogs"` と記述した場合、各アイテムは `dog` と呼ばれ、そのインデックスは `number` と呼ばれます。

お気に入りの犬の配列を適切にループして別の犬を追加するには、各アイテムに一意のキー属性を指定する必要があります。この場合、 `pet` 自体がキーになります。

空のカードが消えましたね。大丈夫ですよ！ `favoriteDogs` 配列が空なので、現在レンダリングするものは何もありません。

あとは、 `v-img` コンポーネントの `src` プロパティに `pet` （画像リンクになります）をバインドします。

```html
<v-img height="150px" :src="pet"></v-img>
```

ちょっと一息。お犬の鑑賞タイムです 💖🐶！

## Adding dogs to Favorites - お気に入り追加機能の実装

`addToFavorites` という新しいメソッドを作成します。これは、 `currentDogLink` の値を `favoriteDogs` 配列に追加します。
（JavaScript には、こういう用途に使う `push` 配列メソッドがあります）

`loadNewDog` の後に、 _（カンマをお見逃しなく！）_

```js
addToFavorites() {
  this.favoriteDogs.push(this.currentDogLink);
}
```

そしてもちろん、一番上のカードの「お気に入り」ボタンにバインドする必要があります。

```html
<v-btn icon @click="addToFavorites">
  <v-icon color="red">favorite</v-icon>
</v-btn>
```

「お気に入り」ボタンをクリックしてみてください！ギャラリーが犬の画像でどのように満たされていくかを見ることができます 🖼️

1つ問題があります。1つの画像を数回追加できるようになっています。これを防ぐために、 `currentDogLink` が既に `favoriteDogs` 配列内にあるかどうかを確認し、「お気に入り」ボタンを無効化します。この複雑なロジックをテンプレート内に配置する代わりに、_computed_ プロパティを作成します。

`created()` フックの直後に `computed` を追加して（ `created()` を閉じた後のカンマを忘れないでください）、その中に `isAlreadyInFavorites` という名前のプロパティを作成しましょう。

```js
  computed: {
    isAlreadyInFavorites() {}
  }
```

計算されたプロパティは、計算結果を返す関数でなければなりません。 `favoriteDogs` 配列内の `currentDogLink` のインデックスを確認しましょう。-1 より大きい場合（つまり、配列にそのような要素が含まれる場合）、関数は `true` を返します。そうでない場合、`false` を返します。

```js
computed: {
  isAlreadyInFavorites() {
    return this.favoriteDogs.indexOf(this.currentDogLink) > -1;
  }
}
```

そして、トップカードの「お気に入り」ボタンに動的な `disabled` 属性を追加し、 `isAlreadyInFavorites` を設定できます。

```html
<v-btn icon @click="addToFavorites" :disabled="isAlreadyInFavorites">
  <v-icon color="red">favorite</v-icon>
</v-btn>
```

お気に入りに犬を追加してみてください。これで、「お気に入り」アイコンがグレー表示され、再度クリックできないことがわかります。

## Removing dogs from Favorites - お気に入り削除機能の実装

ところで、犬の画像の 1つが気に入らなくなったらどうしますか？このまれなイベントでは、 `favoriteDogs` 配列からそれを削除する必要があります。これにはもう 1つのメソッドが必要なので、 `addToFavorites` の後に追加します。
（ `addToFavorites` の閉じ括弧の後にカンマを追加します）

```js
removeFromFavorites() {}
```

もちろん、配列から削除する犬をなんとかして指定する必要があります。幸いなことに、 `index` パラメーターがあります。それをメソッドに渡し、指定されたインデックスを持つ要素を `favoriteDogs` 配列から削除しましょう。

```js
removeFromFavorites(index) {
  this.favoriteDogs.splice(index, 1);
}
```

> 💡
> この `splice()` メソッドは、既存の要素を削除して配列の内容を変更します。最初の引数は開始する要素のインデックスで、2番目の引数は削除する要素の数です。

次に、この新しいメソッドをクリックハンドラーで「削除」ボタンにバインドする必要があります。

```html
<v-btn icon @click="removeFromFavorites(index)">
  <v-icon>delete</v-icon>
</v-btn>
```

> 💡
> `removeFromFavorites` メソッドに `index` を渡すことを忘れないでください！パラメータを渡さない場合は、 `addToFavorites` メソッドで行ったように丸括弧をスキップできます。

お気に入りからいくつかの犬を追加および削除してみてください。動きます！

**🎊おめでとうございます、ベースプロジェクトが終了しました！🎊**

## Supplement 1: Creating a Dog Component - Dog コンポーネントの作成

ここでは、お気に入りグリッドから単一の犬のカードを抽象化して、親コンポーネントと子コンポーネントがどのように通信するかを学習します。

`components` フォルダがありますが、今のところは空です。ここで新しいファイルを作成し、 `Dog.vue` という名前を付けましょう。

このファイルを開き、 `<template></ template>` および `<script></ script>` タグを追加します。ファイルはこのようになります。

```html
<template></template>

<script></script>
```

ここで、お気に入りの犬を含む `v-card` コンポーネント全体（css クラスが `dog-card` ）を `App.vue` からコピーし、テンプレートタグ内に貼り付けます。コピペしたら `App.vue` から削除できます。

ここで、表示する犬の画像を親コンポーネントから子コンポーネントに渡す必要があります。そのために、Vueは `props` を使用します。

> 💡
> props は、コンポーネントに登録できるカスタム属性です。値が prop 属性に渡されると、そのコンポーネントインスタンスの  _プロパティ_ になります。この場合、 `Dog` コンポーネントには、その親の `App` コンポーネントから渡される `dog` プロパティがあります。

`Dog.vue` コンポーネントに `props` オプションを追加しましょう。最初に、 `script` タグ内に export ステートメントを作成する必要があります。
（後で、 `Dog` コンポーネントを `App` コンポーネント内にインポートできるようになります）
このコードブロックを `Dog.vue` に追加します。

```js
<script>export default {}</script>
```

これで、このオブジェクトに `props` オプションと `dog` prop を追加できます。

```js
<script>
  export default {
    props: {
      dog: {
        type: String
      }
    }
  };
</script>
```

ここでは、犬のタイプも指定しています。これは、犬の画像 URL を含む文字列です。

`Dog.vue` のテンプレートでは、 `pet` を `dog` に置き換える必要があります。これは、 `Dog` コンポーネント内に `pet` がなく、 `dog` プロパティのみが渡されるためです。テンプレートは次のようになります。

```html
<template>
  <v-card class="dog-card">
    <v-img height="150px" :src="dog"></v-img>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="removeFromFavorites(index)">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
```

それでは、 `App.vue` コンポーネントに戻って、いくつか変更を加えましょう。まず最初に、新しく作成した `Dog` コンポーネントを `App.vue` にインポートする必要があります。

```js
import Dog from './components/Dog';
```

次に、内部に子コンポーネントがあることを `App` コンポーネントに「説明」する必要があります。Vue はこれに `components` オプションを使用します。 `components` オプションを `data()` の上に追加しましょう。

```js
export default {
  components: {
    appDog: Dog
  },
  data() {
    return {
      currentDogLink: "",
      favoriteDogs: []
    };
  },
```

> 💡
> コンポーネントオブジェクトの各プロパティのキーはカスタム要素の名前になり、値にはコンポーネントのオプションオブジェクトが含まれます。

> 💡
> コンポーネント名には、キャメルケース（ `appDog` ）またはケバブケース（ `app-dog` ）を使用できます。キャメルケース名は、HTML タグ名でケバブケースに「変換」されることに注意してください。このようにして、HTML カスタムタグ `<app-dog>` を使用し、 `Dog` コンポーネントをレンダリングします。

`App.vue` で、先ほどカードを削除したスペースにカスタムタグを配置し、`<v-flex>` タグを上書きします。

```html
<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
  <app-dog></app-dog>
</v-flex>
```

`dog` プロパティを `Dog` コンポーネントに渡す必要があります。おなじみの `v-bind` ディレクティブで行います。（ `:` ショートカットを使用できることを思い出してください） `App.vue` に追加したコードを編集します。

```html
<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
  <app-dog :dog="pet" @remove="removeFromFavorites(index)"></app-dog>
</v-flex>
```

これで、お気に入りに犬を追加しようとすると、グリッドに犬が再び表示されます！ただし、1つの問題があります。犬を削除すると、コンソールで大量のエラーが発生します。その理由は、 `Dog.vue` 内に `removeFromFavorites` メソッドがなく、 `index` についても何も知らないためです。

メソッドを使用する代わりに、 `Dog` コンポーネント内の「削除」ボタンを _イベントエミッター_ に置き換えます。

```html
<v-btn icon @click="$emit('remove')">
```

`$emit` を使用して、 `Dog.vue` は親コンポーネント（この場合は `App.vue` ）にこんな風にメッセージを送信しています。
`Dog.vue` > 「こんにちは、ここで何かが起こっています！このメッセージを読んで反応してください」

これで、 `Dog` コンポーネントが `remove` イベントを発行すると（つまり、「削除」ボタンのクリックで）、その親の `App` コンポーネントは `removeFromFavorites` メソッドを呼び出します。
（これにより、特定の犬がお気に入りの配列から削除されます）

**🎊Supplement 1 が完了しました！🎊**

## Supplement 2: Add animations - アニメーションの実装

それでは、アニメーション効果を追加して、アプリケーションをより魅力的にしましょう。

> 💡
> Vue は、 `transition` ラッパーコンポーネントを提供します。これにより、次のコンテキストで任意の要素またはコンポーネントの開始 / 終了トランジションを追加できます。
> - 条件付きレンダリング（ `v-if` を使用）
> - 条件付き表示（ `v-show` を使用）
> - 動的コンポーネント
> - コンポーネントルートノード

現在の犬の画像をアニメーション化してみましょう。最初に、将来の移行に適切なコンテキストを提供するために、 `v-if` ディレクティブを追加する必要があります。 `App.vue` で、メインの犬のカードを編集します。

```html
<v-img v-if="currentDogLink" height="400px" :src="currentDogLink"></v-img>
```

しかし今の状態では、 `currentDogLink` は常に `true` を返します！「次へ」ボタンをクリックするたびに空の文字列に設定して、次の画像がロードされる前に `currentDogLink` が `false` を返すようにします。

```js
loadNewDog() {
  this.currentDogLink = "";
  axios
    .get("https://dog.ceo/api/breeds/image/random")
    .then(response => {
      this.currentDogLink = response.data.message;
    })
    .catch(error => {
      console.log(error);
    });
},
```

これで、この微妙なエフェクトを確認できます。ユーザーが「次へ」をクリックするたびに画像が消えます。これを、フェードアニメーション効果で修正します。 `<transition>` タグで `v-img` をラップし、name 属性に `fade` を提供しましょう。

```html
<transition name="fade">
  <v-img v-if="currentDogLink" height="400px" :src="currentDogLink"></v-img>
</transition>
```

これにより、 `fade-` から始まる多くの CSS クラスが得られます。
最初のフレームでアニメーションが始まる位置である `enter` / `leave` 、アニメーションの実行中に `enter-active` / `leave-active` があり、これは、アニメーションプロパティ自体を配置するものです。 `enter-to` / `leave-to` は、要素が最後のフレームのどこにあるべきかを指定します。

フックができたので、それらを使用してトランジションを作成できます。次のクラスを追加して、 `App.vue` の CSS を編集します。

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
```

`.fade-enter-active` および `.fade-leave-active` クラスは、実際のトランジションを適用する場所です。これは Vue 固有のものではなく、通常の CSS です。 `ease` プロパティは、ゆっくりと開始し、次に速く、そしてゆっくりと終了するトランジション効果を指定します。

「次へ」をクリックすると、犬の写真に素晴らしいフェード効果があることがわかります。

また、お気に入りの犬のグリッドにいくつかのエフェクトを追加しましょう。 `v-for` でレンダリングされたリストをアニメーション化するために、Vue は `transition-group` タグを使用します。

> 💡
> `<transition>` とは異なり、 `transition-group` は実際の要素（デフォルトでは `<span>` ）をレンダリングします。タグ属性でレンダリングされる要素を変更できます。内部の要素は、常に一意のキー属性を持つ必要があります。

`App.vue` で、ネストされたコンポーネント `<app-dog>` を囲む `<v-layout>` コンポーネントを `v-transition-group` に置き換え、適切なタグ属性とクラスを提供します。

```html
<transition-group name="slide" tag="v-layout" class="wrap">
  <v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
    <app-dog :dog="pet" @remove="removeFromFavorites(index)"></app-dog>
  </v-flex>
</transition-group>
```

`transition-group` は `v-layout` コンポーネントとしてレンダリングされます。クラス `wrap` はグリッド要素を次の行にラップするために必要です。（ `v-layout` の `wrap` 属性を置き換えます）
また、新しいトランジションに「スライド」という名前を付けました。

これで、CSS クラスを使用してスライドトランジションを説明できます — これらのクラスを `App.vue` の CSS に追加します。


```css
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
```

グレート！新しい犬をグリッドに追加すると、素晴らしいアニメーションができます。ただし、削除には影響しません。 `-move` クラスがあります。これは、アイテムの位置が変わったときに追加されます。
他のクラスと同様に、そのプレフィックスは提供された `name` 属性（この場合は `slide` ）の値と一致します。したがって、さらにスタイルを追加する必要があります。


```css
.slide-leave-active {
  position: absolute;
}

.slide-move {
  transition: transform 0.5s;
}
```

> 💡
> 離れるアイテムの `position：absolute;` に注意してください！自然な流れからそれらを削除し、残りのアイテムのムーブトランジションをトリガーします。

リストには、要素を削除した後の素敵なムーブアニメーションがあります！

**🎊Supplement 2 が完了しました！🎊**

## Author - 著者

Made with ❤️ by Natalia Tepluhina, updated by Jen Looper
