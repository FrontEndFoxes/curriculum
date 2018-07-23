# 📋 Chapter 1: Introducing the My Pet Shop Web App

| **Project Goal**            | Get started with Vue.js by creating a static Pet Shop web app                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | Setting up your Vue app, CSS Grid, Styling in Vue, code structure in preparation for moving forward.                                                                                             |
| **Tools you’ll need**       | A modern browser like Chrome. If using Chrome, download Chrome DevTools for Vue.js. An account in CodeSandbox.io. |
| **Time needed to complete** | 1/2 hour                                                                                                                                                                                         |

## Instructions

Since this is the very first Vue.js web project we're going to make, we'll start from scratch in [Code Sandbox](http://codesandbox.io). Create a Code Sandbox account and scaffold a starter Vue.js template by clicking [here](https://codesandbox.io/s/vue).

We're going to build a storefront for a fictional Pet Shop that will look like this:

![pet store](./images/petshop_chapter1_1.jpg)

In addition, we're going to create a switch that will change the look of the shop to resemble this:

![pet store](./images/petshop_chapter1_2.jpg)

Take a look at the code that was scaffolded by Code Sandbox for a basic Vue.js app. The first file you'll see is open by default: `main.js`. This is the main starting point of a Vue.js app. Note that in this file you import Vue from its npm package: `import Vue from "vue";`. Code Sandbox imports all the needed dependencies from npm to build the app; you can always check out the root `package.json` to find out which dependencies are needed.

`main.js` also initializes the app as a new Vue.js app and sets the div into which the app code will be injected. It also names the main component and sets the template's name:

```js
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
```

Open up `App.vue`. In this file, the 'home' component is built. It contains the three main parts of a Vue.js Single File Component (SFC): a template, a script block, and a style block.

Note the first div in the template block has the id of 'app' - this is the div where the app code will be injected. There's also a `<HelloWorld>` component included underneath the logo image. This is an example of an SFC being included into `App.vue`.

Open `components/HelloWorld.vue` and you'll find the source of the list of links that appears embedded in `App.vue`. This file also includes a script block with a `msg` variable and some more styles in a `<style>` block.

We're going to rip this sample app apart and recreate it! Let's get started.

## Build the Styles

Let's start in `App.vue`, since we don't have to make any changes to `main.js`. Add the following style block at the bottom of the file, replacing the current `<style scoped>` block:

```scss
	<style lang="scss">
	@import url("https://fonts.googleapis.com/css?family=Roboto");

	/*brown and mint*/
	/*dark brown 32292F
	light mint 99E1D9
	bisque F0F7F4
	dark mint 70ABAF
	light brown 705D56*/

	*,
	*:before,
	*:after {
	  box-sizing: border-box;
	}

	body {
	  margin: 0;
	  padding: 0;
	}

	main {
	  padding: 40px;
	  font-family: "Roboto", "sans-serif";
	  background: #fff top center repeat;
	  color: #444;
	  background-image: url("https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/bg.jpg");
	}

	h1,
	p {
	  margin: 0 0 1em 0;
	}

	img {
	  max-width: 100%;
	  display: block;
	  margin: 0 auto;
	}

	.app-container {
	  max-width: 940px;
	  margin: 0 auto;
	  background-color: #fff;
	}

	.app-container > * {
	  border-radius: 5px;
	  font-size: 150%;
	  margin-bottom: 10px;
	}

	.wrapper {
	  display: grid;
	  grid-gap: 10px;
	  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	  grid-auto-rows: minmax(150px, auto);
	}

	.wrapper > * {
	  padding: 15px;
	  border-radius: 5px;
	}

	.light-mint {
	  background-color: #99e1d9;
	}

	.dark-mint {
	  background-color: #70abaf;
	}

	.light-brown {
	  background-color: #705d56;
	  color: #f0f7f4;
	}

	.dark-brown {
	  background-color: #32292f;
	  color: #f0f7f4;
	}

	.bisque {
	  background-color: #f0f7f4;
	}

	/*orange and green*/
	/*
	dark orange 771100
	orange CC6633
	light orange FF9900
	dark green 689980
	light green 86a193
	*/

	.orange-green {
	  background-image: url("https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/bg2.jpg");
	  .light-mint {
	    background-color: #86a193;
	  }

	  .dark-mint {
	    background-color: #689980;
	  }

	  .light-brown {
	    background-color: #cc6633;
	  }

	  .dark-brown {
	    background-color: #771100;
	  }

	  .bisque {
	    background-color: #ff9900;
	  }
	}

	.panel {
	  /* needed for the flex layout*/
	  margin-left: 5px;
	  margin-right: 5px;
	  flex: 1 1 200px;
	}

	.tall-panel {
	  grid-row-end: span 2;
	}

	.app-header,
	.app-footer {
	  flex: 0 1 100%;
	  padding: 15px;
	  text-align: center;
	}

	/* We need to set the margin used on flex items to 0 as we have gaps in grid.  */
	@supports (display: grid) {
	  .wrapper > * {
	    margin: 0;
	  }
	}
	</style>
```

::: tip 💡
Notice we don't use `<scoped>` as part of the style block. The 'scoped' keyword ensures that your styles will remain valid only for the current SFC, and we're going to make these styles universal. We did specify that we are using Sass, however, a method of making your css easier to manage. Learn more [here](http://www.sass-lang.com).
:::

This style block includes a few surprising things:

- It uses paths to external images hosted on Github, rather than relative paths. This is because Code Sandbox doesn't host images; normally you'll just add an image on a relative path such as `/images/myImage.png`.
- There is some funny 'grid' stuff going on. This style sheet and the template we will build make use of CSS Grid, a new way of making flexible, responsive 'masonry' layouts like this one with stacked 'blocks' of content. Learn more about CSS Grid [here](https://css-tricks.com/snippets/css/complete-guide-grid/).
- There are two style sheets! Or at least two style patterns. One has a green theme, the other is orange. We'll make use of this soon.

Adding the style sheet didn't do much to our template except make the `<li>` group look strange. Let's fix the template!

## Install Vuetify

Before we edit the template, we're going to install Vuetify. Vuetify is a cool library that gives a Material Design styling to your Vue apps. In this chapter, we're only going to use it to create a switch, but we'll use it more in future chapters.

::: tip 💡
Vuetify is a semantic component framework for Vue. It aims to provide clean, semantic and reusable components for building your application. You can find full documentation for it [here](https://vuetifyjs.com/en/getting-started/quick-start)
:::

Install it by clicking the 'Add Dependency' button in the Dependency dropdown area on the left in Code Sandbox. Search for 'Vuetify' and install it.

Check whether the dependency is installed by opening `package.json` and checking the "dependencies" object. It should look like this:

```json
"dependencies": {
  "vue": "^2.5.2",
  "vuetify": "1.0.17"
},
```

Next, initialize Vuetify by opening `main.js` and adding these lines under the second `import`:

```js
import Vuetify from "vuetify";

Vue.use(Vuetify);
```

This ensures that Vuetify's themes and components will be available throughout the Vue app.

Then, overwrite the current template in `App.vue` with this markup:

```html
<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header dark-brown">
          <h1>My Pet Store</h1>
        </header>
        <div class="wrapper">
          <div class="panel tall-panel light-mint">
              <h2>Pet Products</h2>
              <p>Premium Puppy Chow</p>
              <p>Kibble, sale in bulk, $20/lb</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/food.png"/>
          </div>
          <div class="panel bisque">
              <h2>Donate</h2>
          </div>
          <div class="panel tall-panel light-brown">
              <h2>Adoptable Pets</h2>
              <p>Fisher, Chihuahua, age 3</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/chihuahua.jpg"/>
          </div>

          <div class="panel bisque">
              <h2>Contact Us</h2>
          </div>
          <div class="panel tall-panel dark-mint">
              <h2>Pet of the Month</h2>
              <p>Meet Stanley, A young French Bulldog</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/bulldog.jpg"/>
          </div>
          <div class="panel tall-panel light-mint">
              <h2>Success Stories</h2>
              <p>Bennie found his forever home!</p>
              <img src="https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/collie.jpg"/>
          </div>

          <div class="panel bisque">
              <h2>Special Events</h2>
          </div>

          <div class="panel bisque">
              <h2>Learn About Pet Ownership</h2>
          </div>
        </div>
        <footer class="app-footer dark-brown">
          <p>123 Main Street | Smithfield, RI 90987 | 345-456-5678</p>
        </footer>
      </div>
    </main>
  </v-app>
</template>
```

Wow, that made a big change! Suddenly, you have a storefront!

::: tip 💡
Note the use of `<v-app>` - this is a requirement of Vuetify and is a sure sign you'll have a Vuetify-themed app.
:::

Now we're going to actually use that Vuetify theme by creating a switch. Pressing this switch will trigger a theme switch, so you'll use the 'orange' theme you saw in the styles.

- You might see the `orange-green` class in stylesheet. Let's add it to the `<main>` element and observe how all the colors & background are changed:
    ```html
    <main class="orange-green">
    ```
- Now let's try to change the class using Vue class bindings. Replace that simple class in `<main>` with a dynamic class binding:

```html
<main :class="{'orange-green': false}">
```

Try to change `false` to `true` and vice versa. You can see how class is applied in Chrome dev tools and how the page color theme is changing.

- Get excited! It's time to create your first Vue variable. First, you have to add `data()` to your Vue component. This function  should return an object of our Vue variables. Let's create one in the `<script>` block. Overwrite the current `<script>` block:

```js
<script>
export default {
  name: "App",
  data() {
    return {
      themeSwitched: false
    };
  }
};
</script>
```

::: tip 💡
At this point you can remove the HelloWorld.vue component from the `views` folder as we won't need it.
:::

So, now you have a variable called `themeSwitched` and its default value is `false`.

- In the `<main>` tag, replace `false` in the class binding with our newly created variable:

```html
<main :class="{'orange-green': themeSwitched}">
```

- Change `themeSwitched` value inside `data` from `false` to `true`. Again, you can see the color change effect.

- Now we only need a switch to change a theme. First we will create a button (we're using Vuetify so it will be a Vuetify button component). Let's place it in the `header` right after the `h1` tag:

```html
<header class="app-header dark-brown">
    <h1>My Pet Store</h1>
    <v-btn>Switch theme</v-btn>
</header>
```

- Now add a click event handler to our button. We can use `v-on` directive or its shortcut `@`. This handler will change `themeSwitched` value to its opposite value, toggling the color-changing class.

    ```html
    <v-btn @click="themeSwitched = !themeSwitched">Switch theme</v-btn>
    ```

You might have noticed that the button looks a little small. To fix this, add Vuetify style sheets in `index.html`:

```html
<link rel="stylesheet" href="https://unpkg.com/vuetify@1.0.9/dist/vuetify.min.css">
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
```

Test your application by clicking the button. Looks nice, right?

**Congratulations! You've just finished Chapter 1!**

# Final result
![final result chapter 1](./images/petshop_chapter1_1.jpg)

