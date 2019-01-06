# 👩‍🎓 Nano Activity (number): Title of Activity

| **Project Goal**            | What we're going to build                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | *Vuex* is a state management library made for Vue, in this nano you will learn the basic concepts, and how to use it on a Vue application.
| **Tools you’ll need**       | A modern browser like Chrome. Access to [CodeSandbox](https://codesandbox.io)
| **Time needed to complete** | 10-30 minutes


# We're going to create a Videogame Card Collection using Vuex

In this activity we will create a simple collection of card of some classic video game titles that will be powered by a Vuex state.

::: tip 💡
Use this format for tips
:::

## 1. Get Started

Head over to [CodeSandbox](https://codesandbox.io) and create a new sandbox by clicking on the *Vue* _vue-cli_ template.

## 2. Step 1 - Setting up

Head over to the `App.vue` file and delete everything inside the `<div id="app"></div>` tags.

Also, get rid


```css
Page {
  background-image: url("~/images/bg.jpg");
}
```

## 3. Step 2

...

## 4. Step 3

...

## 5. Final Result

...

Add the whole code snippet, if you can, at the end of your tutorial

The entire code of your app.js file should look like this:

```js
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
        <Button class="btn" @tap="getADog">Find Me A Dog!</Button>
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

Add a screenshot of the final result

The final app looks like this:

![final app](./images/playground3.png)

## Conclusion and challenge

Add a challenge at the end so the student can go home and continue working

## Badge

Add the badge image here, available for download

## Author

Made with ❤️ by your name







