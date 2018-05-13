# Mini Workshop (number): 📱 A mobile mini-workshop (or 🖥️ A web mini-workshop)

| **Project Goal**            | What we're going to build                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What you’ll learn**       | Description of the learning goal                                                                                             |
| **Tools you’ll need**       | (edit this if necessary) A modern browser like Chrome. Access to the [NativeScript Playground](http://play.nativescript.org) - consider creating an account in the Playground to keep the versions of your work intact. A mobile phone (iOS or Android) with the NativeScript Playground and Viewer apps installed |
| **Time needed to complete** | 20 minutes  
| **Just want to try the app?** | [Playground link](https://play.nativescript.org/) or [Code Sandbox link](https://codesandbox.io)                                                                          

# Instructions

Add a list of the steps needed to take to build the app. Below are some example steps

::: tip 💡
Use this markup for tips
:::

## 1. Scaffold your app

...

## 2. Add some Styles

...

```
Page {
  background-image: url("~/images/bg.jpg");
}
```
## 3. Fix the UI

...

## 4. Add some data

...

Add the whole code snippet, if you can, at the end of your tutorial

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

Add a screenshot of the final result 

The final app looks like this:

![final app](./images/playground3.png)

## Conclusion and challenge

## Author

Made with ❤️ by your name






                                                            
