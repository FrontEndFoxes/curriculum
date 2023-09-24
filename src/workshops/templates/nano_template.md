# Nano Activity (number): Title of Activity

| **Project Goal**            | What we're going to build                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | Description of the learning goal                                                                                             |
| **Tools you’ll need**       | (edit this if necessary) A modern browser like Chrome. Access to the [NativeScript Playground](http://play.nativescript.org) - consider creating an account in the Playground to keep the versions of your work intact. A mobile phone (iOS or Android) with the NativeScript Playground and Viewer apps installed |
| **Time needed to complete** | 10 minutes


# We're going to create (edit this)

Give a description of the activity and what the student will learn in the end

::: tip 💡
Use this format for tips
:::

## 1. Get Started

...

## 2. Step 1

...

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

(your screenshot here)

## Conclusion and challenge

Add a challenge at the end so the student can go home and continue working

## Badge

Add the badge image here, available for download

## Author

Made with ❤️ by your name