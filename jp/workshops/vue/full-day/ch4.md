# 📋 Chapter 4: 犬の里親体験アプリの作成

| **プロジェクトのゴール** | お店のタグ付けシステムを作成して、「ロイヤルティ」リストに犬を追加したり削除したりできるようにします。 |
| -- | -- |
| **このワークショップで学ぶこと** | Vuex による Vue アプリケーションの状態管理 |
| **必要なツール** | Chromeのような最新のブラウザ。CodeSandbox.io のアカウント。もし迷ったら、このチャプターのスタート地点を[ここ](https://github.com/VueVixens/projects/tree/main/chapter-3-end)にインポートします。この方法についての説明は [Appendix 1](appendix_1.md) にあります。 |
| **かかる時間**     | 1.5時間 |

## 今回構築するもの

![sketchnote](./images/Ch4.png)

## 手順

もしプロジェクトを作り直す必要がある場合は、メインページの左下にある **GitHub からインポート**リンクをクリックし、フィールドにリポジトリの URL を貼り付けて、[このリポジトリ](https://github.com/VueVixens/projects/tree/main/chapter-3-end)を Code Sandbox に複製します。[チャプター 3](ch3.md)で作成したプロジェクトを続行することもできます。

このチャプターでは、ショッピングカートのように、里親用の「ロイヤルティリスト」を作成して、私たちが特に好きでお迎えしたい犬のリストを表示します。はじめに、 `views` フォルダ内に新しい空のファイルを作成し、 `Favorites.vue` という名前をつけます。

## ロイヤルティリストの作成

この新しいコンポーネントで最初に必要なのはテンプレートです。この新しいファイル内に `<template></template>` タグを追加します。

テンプレートタグの中に `<div></div>` タグを作成し、シンプルなテキスト「My Favorites」を追加します。

```html
<template>
  <div>
    My Favorites
  </div>
</template>
```

次に、新しく作成したコンポーネントをルーターに接続し、対応するルートに正しく表示されているかどうかを確認します。

`main.js` ファイルに移動します。上部にある `Home` と `Pets` コンポーネントをインポートしたあと、インポート文をもう一つ追加します：

```js
import Favorites from "./views/Favorites";
```

そのあと、 `routes` にもうひとつのルートを追加します：

```js
{ path: "/favorites", component: Favorites }
```

ブラウザのアドレスバーから `/favorites` （ホームページの URL に `/favorites` を追加するだけ）に移動してみてください。ヘッダーとフッターの間に「My Favorites」というテキストが表示されているはずです。

ナビバー内のリストにリンクを追加してみましょう。あとで、選択したアイテムの金額も表示しますが、今のところはリンクのついた単なるアイコンです。 `App.vue` ファイルに移動し、 `v-toolbar-items` の閉じタグの直後に以下のコードを追加します：

```html
<v-spacer></v-spacer>
<router-link to="/favorites">
  <v-icon large>loyalty</v-icon>
</router-link>
```

::: 💡
`v-spacer` は他のコンポーネント間の空きスペースを埋めるための Vuetify のコンポーネントです。 `v-icon` は[マテリアルアイコン](https://material.io/icons/)を表示するコンポーネントです。
:::

これで、お気に入りアイコンをクリックすると `/favorites` ルートに移動します。

Favorites コンポーネントのマークアップを作成しましょう。Vuetify のリストコンポーネントを使用して、犬を表示します。 `<div></div>` タグからプレースホルダーテキストを削除して、 `<v-list></v-list>` タグで置き換えましょうテンプレートは次のようになります：

```html
<div>
  <v-list> </v-list>
</div>
```

このリストの名前が必要です。Vuetify はこの目的のために `v-subheader` コンポーネントを使用しているので、追加してみましょう：

```html
<div>
  <v-list>
    <v-subheader>My Favorites</v-subheader>
  </v-list>
</div>
```

次に、モックデータを含むリスト要素を追加しましょう。犬の画像とその名前、削除アイコンです。リスト項目には `v-list-item` コンポーネントが必要です。
犬の画像は `v-list-item-avatar` 、名前は `v-list-item-content` 、削除ボタンは `v-list-item-action` と `v-icon` です。

::: 💡
リストの詳細については、[Vuetify リストコンポーネントのドキュメント](https://vuetifyjs.com/en/components/lists)をご覧ください。
:::

ここまでのテンプレート：

```html
<div>
  <v-list>
    <v-subheader>My Favorites</v-subheader>
    <v-list-item @click="{}">
      <v-list-item-avatar>
        <img src="https://images.dog.ceo/breeds/husky/n02110185_7888.jpg" />
      </v-list-item-avatar>
      <v-list-item-content>Fluffy</v-list-item-content>
      <v-list-item-action>
        <v-icon>delete</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</div>
```

## Vuex でリストの状態を管理する

この時点で、UI が統合されているのがわかります。リストの中に実際のデータを表示する時が来ましたが、このままでは問題があります。選択した犬を保存して `Pets` コンポーネントから `Favorites` コンポーネントに犬を渡すにはどうすればよいのでしょうか？これらの2つのコンポーネントには「親子」関係がないため、props を使用することはできません... そのような場合に、 _状態管理_ ライブラリが必要であり、Vue には Vuex というライブラリがあります。

::: 💡
Vuex は、Vue.js アプリケーションの状態管理パターンおよびライブラリです。これは、アプリケーション内のすべてのコンポーネントのための一元化されたストアとして機能し、ステートが予測可能な方法でのみ変更できるようにルールが保証されています。これにより、アプリケーション内のコンポーネントと共有できるデータを保持することができます。詳細は[こちら](http://vuex.vuejs.org/en/)をご覧ください。
:::

この一元化されたストアで作業を開始するには、Vuex をアプリケーションに追加する必要があります。まず、 `Explorer` タブで下にスクロールして `Dependencies` ドロップダウンを開きます。 `Add dependency` ボタンをクリックして `vuex` を探します。依存関係をインストールします。Vuex が `package.json` に追加されます。

では、 `/src` の中に `store` フォルダを作成してみましょう。この新しいフォルダの中に `store.js` ファイルを追加します。これは、アプリケーションのすべてのデータを保存する場所です。

`store.js` を開き、Vuex をインポートします：

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
```

次に、実際のストアを作成してエクスポートします：

```js
export default new Vuex.Store({});
```

実際にアプリケーションのステートで保存したいものは何でしょうか？それは、選択された犬を含むお気に入りのリストです。初期状態の `state` オブジェクトに `favorites` 配列を中括弧で囲んで追加してみましょう：

```js
export default new Vuex.Store({
  state: {
    favorites: []
  }
});
```

次に、このストアを Vue インスタンスに追加する必要があります。これを行うには、 `main.js` ファイルに移動し、残りのインポートの下にインポートします：

```js
import store from "./store/store";
```

そして、 `main.js` の Vue インスタンスのプロパティに `store` を追加します：

```js
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
```

これで、アプリケーション内のすべてのコンポーネントは、任意のコンポーネントの computed プロパティの中に `this.$store.state` と書けば、これを通してステートにアクセスできるようになりました。では、`Favorites` コンポーネントからアクセスしてみましょう。

::: 💡
Computed プロパティを使用して、ビューに表示されるプロパティをすばやく計算できます。これらの計算はキャッシュされ、依存関係が変更されたときにのみ更新されます。
:::

`Favorites.vue` の内部の、 `<template>` ブロックの下に `<script>` ブロックを追加し、 `export default` 文を追加します：

```js
<script>export default {};</script>
```

...そして、 `<script>` ブロックを編集して `computed` プロパティをコンポーネントに追加します：

```js
<script>
  export default {
    computed: {
      favorites() {
        return this.$store.state.favorites;
      }
    }
  };
</script>
```

`favorites()` はステートに保存されている `favorites` 配列の値を返す関数であることがわかり、これをコンポーネントで使用することができます。

## お気に入りを登録

モックデータを `favorites` のコンテンツに置き換えましょう。

まず、 `state.favorites` に一時的にコンテンツを追加してみましょう。 `data/dogs.js` ファイルから最初の3つの犬をコピーして、 `store.js` の `favorites` 配列に貼り付けます：

```js
state: {
  favorites: [
    {
      name: "Max",
      breed: "husky",
      img: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg"
    },
    {
      name: "Rusty",
      breed: "shiba",
      img: "https://images.dog.ceo/breeds/shiba/shiba-13.jpg"
    },
    {
      name: "Rocco",
      breed: "boxer",
      img: "https://images.dog.ceo/breeds/boxer/n02108089_14112.jpg"
    },
  ]
},
```

`Favorites.vue` コンポーネントの内部では、おなじみの `v-for` ディレクティブを使って `favorites` の配列を繰り返し処理します。 `<template>` `<div>` をこのようなマークアップに変更します：

```html
<div>
  <v-list>
    <v-subheader>My Favorites</v-subheader>
    <v-list-item v-for="(dog, index) in favorites" :key="index" @click="{}">
      <v-list-item-avatar>
        <img :src="dog.img" />
      </v-list-item-avatar>
      <v-list-item-content>{{dog.name}}</v-list-item-content>
      <v-list-item-action>
        <v-icon>delete</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</div>
```

::: 💡
何が変わったのでしょうか？ `src` 属性が `:src` に変更されたことに注目してください。また、中括弧内の `Fluffy` を `dog.name` に変更することで、名前が動的に変わることを確認しました。
:::

::: 💡
また、`v-list-item` のオープニングタグで `v-for` の隣に `:key` を追加したことに注意してください。これは、Vue が `v-for` を使用する際にキーを提供することを望んでいるためです。 `v-for` で `(dog, index) in favorites` を使うことで、犬ごとに配列のインデックスを取得することができます。Max の場合はインデックス0、Rusty の場合はインデックス1などを取得します。これをキーとして使うことができます。より詳しい情報は[こちら](https://vuejs.org/guide/list.html#Maintaining-State)を参照してください。
:::

これで `/favorites` ルートにモックデータが表示されるようになりました。ページの見た目を良くするために、もう少し UI を微調整してみましょう。

## UI Tweaks

First, we need to add a placeholder to show when our list is empty.

::: tip 💡
Note: the `v-if` directive conditionally renders the element based on the "truthiness" of the expression value - whether it is true or false. `v-else` directive serves as an 'else' block for `v-if`, providing an 'else' condition.
:::

We will wrap the whole list content in the wrapper div and show it only when we have items in our list of favorites; otherwise the user will see the placeholder text. Let's change the template:

```html
<template>
  <v-list>
    <v-subheader v-if="!favorites.length"
      >Your favorites list is empty</v-subheader
    >
    <div v-else>
      <v-subheader>Your favorites</v-subheader>
      <v-list-item v-for="(dog, index) in favorites" :key="index" @click="{}">
        <v-list-item-avatar>
          <img :src="dog.img" />
        </v-list-item-avatar>
        <v-list-item-content>{{dog.name}}</v-list-item-content>
        <v-list-item-action>
          <v-icon>delete</v-icon>
        </v-list-item-action>
      </v-list-item>
    </div>
  </v-list>
</template>
```

::: tip 💡
What is happening here? First, the application will check if the `favorites` array has a _length_ (i.e. if there are some items inside this array; an empty array has a length equal to 0). If the length is 0, the application will display `Your favorites list is empty` text and will ignore the `v-else` block. If the array is not empty, the application will jump to the `v-else` block and render it.
:::

Let's also display the number of selected dogs above the tag icon in the toolbar. Move to the `App.vue` and add a computed property for `favorites` (similar to the `Favorites` component one we added earlier). You can place this under the `name` property:

```js
computed: {
  favorites() {
    return this.$store.state.favorites;
  }
},
```

Now let's wrap our favorites icon with the Vuetify `v-badge` component and show the number of items inside of it. Edit `App.vue` where we change the `<router-link>` block that we have for our favorites with the following markup:

```html
<router-link to="/favorites">
  <v-badge color="grey lighten-1" overlap right v-model="favorites.length">
    <span slot="badge">{{favorites.length}}</span>
    <v-icon large>loyalty</v-icon>
  </v-badge>
</router-link>
```

::: tip 💡
The `v-model` directive here will define the visibility of the badge. So, if the list is empty, the badge will be hidden. Since there are three items in our mock data, we can see the number `3` inside the badge. This is behavior that is defined in the Vuetify badge component for which the documentation can be found [here](https://vuetifyjs.com/en/components/badges).
:::

## Add and Remove Dogs

We also need to build a way to add dogs to this favorites list and, sadly, to remove them from it. In other words, we have to _change our state_. The only way to actually change state in a Vuex store is by committing a _mutation_. Vuex mutations are very similar to events: each mutation has a string **type** and a **handler**. The type should denote what the mutation does, you can choose the name. Since we are creating a mutation to add dogs to our favorites, we choose `addToFavorites`. The handler function is where we perform actual state modifications and it will receive the state as the first argument. Let's create our first mutation. Inside the `store.js` clear the state `favorites` array and after the `state` property, add `mutations`:

```js
export default new Vuex.Store({
  state: {
    favorites: []
  },
  mutations: {}
});
```

Inside this object create the `addToFavorites` mutation:

```js
export default new Vuex.Store({
  state: {
    favorites: []
  },
  mutations: {
    addToFavorites(state, payload) {
      state.favorites.push(payload);
    }
  }
});
```

This mutation has two parameters: first is the `state` as said above; the second is the `data` or `payload` which we will add to our `state.favorites`. The `addToFavorites` mutation will add the payload item to the `state.favorites` array.

::: tip 💡
You cannot directly call a mutation handler. To invoke it, you need to call store.commit with its type: `store.commit('addToFavorites')` and as you will see we will also have to add the payload.
:::

::: tip 💡
Usually in Vuex mutations are committed with _actions_. Actions are similar to mutations but they can contain asynchronous operations (like API calls).
:::

Let's register an action to commit our `addToFavorites` mutation. Add the `actions` property to the store object and `addToFavorites` action to this property:

```js
export default new Vuex.Store({
  state: {
    favorites: []
  },
  mutations: {
    addToFavorites(state, payload) {
      state.favorites.push(payload);
    }
  },
  actions: {
    addToFavorites({ commit }, payload) {
      commit("addToFavorites", payload);
    }
  }
});
```

::: tip 💡
Action handlers receive a context object which exposes the same set of methods/properties on the store instance, so you can call `context.commit` to commit a mutation. We are using ES6 [argument destructuring](https://github.com/lukehoban/es6features#destructuring) to use the `commit` method of `context`, that's why we don't have `context` as our first argument but `{ commit }` as our first argument. If we would have `context` as a first argument, we should call `context.commit(...)` instead of directly calling `commit(...)`.
:::

::: tip 💡
`payload` here is the same data we want to pass from the component to the mutation to change the state.
:::

## Build the UI

Let's call our action from inside the `Pets.vue` component. First we need some kind of a button to add a certain dog to the favorites list. Move to the `Dog.vue` component and add the button right below the `v-card-title` closing tag but still within the `v-card` tag:

```html
<v-btn @click="$emit('addToFavorites', dog)">Add to Favorites</v-btn>
```

By using `$emit`, we are sending the message to our parent component (in this case it's `Pets.vue`) like 'Hi, something is happening here! Please read this message and react to it'.

Our message also contains a second parameter: it's the `dog` which we're trying to add to our favorites list.

::: tip 💡
So by calling `$emit('addToFavorites', dog)` we are sending an event with type `addToFavorites` and with data the dog that users want to add to the favorites. We have basically created a custom event for which more information can be found [here](https://vuejs.org/v2/guide/components-custom-events.html).
:::

Now let's open `Pets.vue` and add a _listener_ to our emitted event `addToFavorites` by overwriting the current `<app-dog>` tag with this snippet:

```html
<app-dog :dog="pet" @addToFavorites=""></app-dog>
```

For now this listener is doing nothing but we want to call an action on this event. To do so we have to map the actions to our component.

::: tip 💡
You can dispatch actions in components with `this.$store.dispatch('xxx')`, or use the `mapActions` helper which maps component methods to store.dispatch calls.
:::

We will use the second solution. First import the `mapActions` helper in `Pets.vue`:

```js
import { mapActions } from "vuex";
```

Then, add it to the component by creating a `methods` block, using the [ES6 spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax):

```js
methods: {
  ...mapActions(["addToFavorites"])
},
```

::: tip 💡
By calling `mapActions` with one parameter, we are defining which actions from our store we want to retrieve. For now we only have `addToFavorites` in this array but in the future we can add more actions as our store grows. You don't always need all actions from your store in one single component. So by passing on this array to `mapActions` we make sure we only get what we need in thhis component. More information can be found [here](https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components).
:::

Now we can dispatch `addToFavorites` like a simple component method.

Let's call this method on the `app-dog` `addToFavorites` event. Edit the `<app-dog` tag in `Pets.vue`:

```html
<app-dog :dog="pet" @addToFavorites="addToFavorites"></app-dog>
```

Try to click on `Add to Favorites` buttons. You can see how the icon badge number increases, open the favorites list by clicking on this icon and check how many dogs we have there.

## Enhance the Logic

For now we can add any dog multiple times but we don't have five Maxes! Let's check our payload inside the `store.js` mutation and add the dog only if it's not in the list already:

```js
addToFavorites(state, payload) {
  if (!state.favorites.includes(payload)) {
      state.favorites.push(payload);
    }
},
```

Here we're first checking if the `payload` element is included in `state.favorites`. We are adding the element only if it's not already in the array.

## Remove from List

Now we need a mechanism to remove dogs from the favorites list. Maybe they were adopted by someone else! Let's create an action and a mutation for this.

In the `store.js` add the `removeFromFavorites` mutation to `mutations` object:

```js
removeFromFavorites(state, payload) {
  state.favorites.splice(state.favorites.indexOf(payload), 1);
}
```

::: tip 💡
Here the splice() method changes the contents of an array by removing existing elements. The first argument is the index of the element we want to start with and the second argument is the number of elements we want to remove.
:::

So first we're finding the index of the `payload` item inside the `state.favorites` array and removing the one item starting from this index (i.e. we will remove only the `payload` item itself).

Add the action to commit the `removeFromFavorites` mutation:

```js
removeFromFavorites({ commit }, payload) {
  commit("removeFromFavorites", payload);
}
```

Now we need to dispatch this action when the user clicks the delete icon. Go to the `Favorites.vue` file. As you remember, first we should map actions to component methods. Import `mapActions` helper at the top of the `<script>` tag:

```js
import { mapActions } from "vuex";
```

and add it to the component `methods` under the `computed` block:

```js
methods: {
  ...mapActions(["removeFromFavorites"])
}
```

And finally add the click listener to the delete icon:

```html
<v-icon @click="removeFromFavorites(dog)">delete</v-icon>
```

Now you can add and remove dogs from your favorites list.

**Whew! Chapter 4 is complete!**

## Final result

![chapter 4 final](./images/petshop_chapter4.jpg)
