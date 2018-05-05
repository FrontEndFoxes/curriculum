# Mini Workshop 2: 🖥️ Build A Simple Pet Fetching Web App

| **Project&nbsp;Goal**| What we're going to build                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What&nbsp;you’ll&nbsp;learn**| Description of the learning goal                                                                                             |
| **Tools&nbsp;you’ll need** | (edit this if necessary) A modern browser like Chrome. Access to the [Codesandbox](https://codesandbox.io) - consider creating an account in the Codesandbox to keep the versions of your work intact. |
| **Time needed to complete** | 1 hour
| **Just want to try the app?** | [Code Sandbox link](https://codesandbox.io/s/q3kk74yp1w)

# Instructions

## Scaffold your app

We'll start from scratch in [Code Sandbox](http://codesandbox.io). Create a Code Sandbox account and scaffold a starter Vue.js template by clicking [here](https://codesandbox.io/s/vue).

We're going to build a an application to load random dog images and storing them to favorites:

![](./images/mini2_1.png)

Take a look at the code that was scaffolded by Code Sandbox for a basic Vue.js app. The first file you'll see is open by default: `main.js`. This is the main starting point of a Vue.js app. Note that in this file you import Vue from its npm package: `import Vue from "vue";`. Code Sandbox imports all the needed dependencies from npm to build the app; you can always check out the root `package.json` to find out which dependencies are needed.

`main.js` also initializes the app as a new Vue.js app and sets the div into which the app code will be injected. It also names the main component and sets the template's name:

```
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

## Add the Styles

Let's start in `App.vue`, since we don't have to make any changes to `main.js`. Add the following style block at the bottom of the file, replacing the current `<style>` block:

```
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
  background-image: url("http://images.all-free-download.com/images/graphiclarge/pets_background_dogs_bone_icons_decoration_repeating_style_6828678.jpg");
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
::: tip 💡
Notice we don't use `<scoped>` as part of the style block. The 'scoped' keyword ensures that your styles will remain valid only for the current SFC, and we're going to make these styles universal.
:::

This style block uses path to external image hosted on Github, rather than relative path. This is because Code Sandbox doesn't host images; normally you'll just add an image on a relative path such as `/images/myImage.png`.

Adding the style sheet didn't do much to our template except breake existing styles. Let's fix the template!

## Install Vuetify

Before we edit the template, we're going to install Vuetify. Vuetify is a cool library that gives a Material Design styling to your Vue apps. In this chapter, we're only going to use it to create a switch, but we'll use it more in future chapters.

::: tip 💡
Vuetify is a semantic component framework for Vue. It aims to provide clean, semantic and reusable components for building your application. You can find full documentation for it [here](https://vuetifyjs.com/en/getting-started/quick-start)
:::

Install it by clicking the 'Add Dependency' button in the Dependency dropdown area on the left in Code Sandbox. Search for 'Vuetify' and install it. 

Check whether the dependency is installed by opening `package.json` and checking the "dependencies" object. It should look like this:

```
"dependencies": {
    "vue": "^2.5.2",
    "vuetify": "1.0.17"
  },
```

Next, initialize Vuetify by opening `main.js` and adding these lines under the second `import`:

```
import Vuetify from "vuetify";

Vue.use(Vuetify);
```

This ensures that Vuetify's themes and components will be available throughout the Vue app.

We also have to add Material icons and Vuetify stylesheets into the `head` part of `index.html` file (insert them right after the `<title>` tag) 

```
<link rel="stylesheet" href="https://unpkg.com/vuetify@1.0.9/dist/vuetify.min.css">
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
```

These stylesheets are needed to display Vuetify components in a proper way.

Let's also change the page title to `Dog Lover`. To do so, we have to change the content of the `title` tag:

```
<title>Dog Lover</title>
```

Then, overwrite the current template in `App.vue` with this markup:

```
<template>
  <v-app>
      <v-content class="dogs-layout">
        <v-container fill-height>
          <div class="dogs-overlay">
            <h1 class="display-2 text-xs-center">Choose your favorite dogs</h1>
            <v-card class="dog-card">
              <v-card-media height="400px"></v-card-media>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
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

Wow, that made a big change! Suddenly, you have a storefront! Unfortunately, the dog view i

## 4. Add some data

...

> Add the whole code snippet, if you can, at the end of your tutorial

The entire code of your app.js file should look like this:

```
const Vue = require("nativescript-vue");
const http = require("http");

new Vue({
  data() {
    return {
      dogImage: {}
    }
  },
  template: `
    <Page class="page">
      <ActionBar title="So. Many. Dogs!" class="action-bar" />
      <StackLayout class="card">
        <Button class="btn" @tap="getADog">Find Me A Dog!</button>
           <StackLayout class="placeholder">
            <Image :src="dogImage.message" />
          </StackLayout>
        </StackLayout>
    </Page>
  `,
  methods: {
    getADog() {
      http.request({ url: "https://dog.ceo/api/breeds/image/random", method: "GET" }).then((response) => {
        this.dogImage = JSON.parse(response.content)
        console.log(this.dogImage.message)
      }, (e) => {
        alert("error")
      });
    }

  }
}).$start();
```

> Add a screenshot of the final result

The final app looks like this:

![final app](images/playground3.png#phone)

## Conclusion and challenge

## Author

Made with ❤️ by Natalia Tepluhina






