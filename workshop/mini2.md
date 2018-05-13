# Mini Workshop 2: 🖥️ Build A Simple Pet Fetching Web App

| **Project&nbsp;Goal**| Get started with Vue.js basics and simple API calls                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What&nbsp;you’ll&nbsp;learn**| Setting up your Vue app, components basics, performing simple REST API calls using Axios                                                                                             |
| **Tools&nbsp;you’ll need** | A modern browser like Chrome. Access to the [Codesandbox](https://codesandbox.io) - consider creating an account in the Codesandbox to keep the versions of your work intact. |
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

Wow, that made a big change!

::: tip 💡
Note the use of `<v-app>` - this is a requirement of Vuetify and is a sure sign you'll have a Vuetify-themed app. We're also using a bunch of Vuetify layout elements like `v-container` and UI components like `v-card` and `v-btn`
:::

## Add some data

At this point, we need to start populating our UI with some data. First thing we want to do is to display a dog image inside our `v-card`. Let's add some static link just to test how it's look like. We should change the `src` property to `v-card-media`:

```
<v-card-media
   height="400px"
   src="https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"></v-card-media>
              
```

How cute! 🐶

But the idea is to make this link dynamic so it's time to create your first Vue variable. First, you have to add `data()` to your Vue component. This function  should return an object of our Vue variables. Let's create one in the `<script>` block. Overwrite the current `<script>` block:

```
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

::: tip 💡
At this point you can remove the HelloWorld.vue component from the `views` folder as we won't need it.
:::

Now you have a variable called `currentDogLink` and its default value is an empty string. We will use this variable for providing a link to current dog into `v-card-media`. Let's change the template respectively. First, we will set the `currentDogLink` value:

```
data() {
  return {
    currentDogLink: "https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg"
  };
}
```

Now we have to change a template too to make `src` property _dynamic_. To do this we need a `v-bind` directive or its shortcut `:`.
    
```
<v-card-media
   height="400px"
   :src="currentDogLink"></v-card-media>
              
```
    
::: tip 💡
The `v-bind` directive dynamically binds one or more attributes, or a component prop to an expression. That little `:` makes all the difference!
:::

Great! Now it's time to load some dogs from API!

## Add Axios

To perform API calls we will need a library called [Axios](https://github.com/axios/axios). It's a promise-based HTTP client that works both in the browser and in a node.js environment.

::: tip 💡
Originally, Vue supported its own way of making API calls using .ajax; but this resource was deprecated as Axios's standalone library worked very well for this purpose, removing the need for an integrated solution. Read more about this decision [here](https://medium.com/the-vue-point/retiring-vue-resource-871a82880af4).
:::

First, add Axios's library to your project dependencies. To do so in Code Sandbox, click on `File Editor` tab -> `Dependencies` -> `Add Dependency` and search for `axios`

Import axios into the component where we will perform our API call - `App.vue`. In that component's script block, add this line:
	
```
import axios from "axios";
```

All our calls will use the same base URL with different endpoints. Right under the import for axios, add the base URL to Axios' options:

```
axios.defaults.baseURL = "https://dog.ceo/api";
```

At this point your script part of `App.vue` should look like this

```
<script>
import axios from "axios";
axios.defaults.baseURL = "https://dog.ceo/api";
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
	
Now we are ready to load the image from the API.

## Call the API

Let's perform our first API call. To do so, we will create a `loadNewDog` _method_ inside our component.

::: tip 💡
`methods` property is a list of functions that hang off of an object — typically the Vue instance itself or a Vue component.
:::

Let's add it right after the `data` one

```
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

For now this method does literally nothing but we want it to load new dog (yay, naming!) from the API. First we have to check which endpoint we have to use. Looking at the API's [documentation](https://dog.ceo/dog-api/) we can find out that we need to append `/breeds/image/random` to the base API call.

To perform a GET request Axios uses the `axios.get` method. The result will be a JavaScript promise, so we have to provide success and failure callbacks to it. For now, let's simply print the query result to console. Edit `loadNewDog(){}` method by placing this snippet between the curly brackets:

```
axios
  .get("/breeds/image/random")
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```

We want a new image to replace the old one right when the component is created, so let's add a `created()` hook right after `methods`:
	
```
created() {}
```
::: tip 💡
Note: Make sure to add a comma after the methods object and then add the created() hook!
:::
 
::: tip 💡
This is our app's first livecycle hook! These are very useful when you want fine control over when to run blocks of code. Read more [here](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)
:::

Inside the created hook we will call our method.

```
created() {
  this.loadNewDog();
}
```
Now after clicking refresh button in the browser window. You should see an object in your console. Drill into it by clicking its left-hand arrow. We are interested in its `data` field. You can see we have a status `success` and a message with an image URL 

## Use the API

Let's replace our `currentDogLink` with the loaded one. At this point we can remove the static value from it

```
data() {
  return {
    currentDogLink: ""
  };
},
```
Inside the `loadNewDog` method instead of printing result to the console we will assign `response.data.message` (which is actually the image URL) to `currentDogLink` property

```
loadNewDog() {
  axios
    .get("/breeds/image/random")
    .then(response => {
      this.currentDogLink = response.data.message;
    })
    .catch(error => {
      console.log(error);
    });
}
```
Now every time you refresh the page, you will have a shiny new dog image! 🎉

We also want to call the same method every time when 'Next' button is clicked. Let's a click handler to this button. We can use `v-on` directive or its shortcut `@`

```
<v-btn icon @click="loadNewDog">
  <v-icon>forward</v-icon>
</v-btn>
```
Now we can load new images simply clicking on the 'Next' button.

## Build the Favorites
We want to let user add dogs images to favorites and show the gallery of these images right below our current dog view. To store the links we need one more data property - an array called `favoriteDogs`. Let's add it right after `currentDogLink` and make it empty by default

```
data() {
  return {
    currentDogLink: "",
    favoriteDogs: []
  };
},
```

To display the favorite dogs we should make a changes to our template. Let's add the following code snippet right after the closing `</v-card>` tag

```
<v-container grid-list-md fluid>
  <v-layout wrap>
    <v-flex xs6 sm4 md2>
      <v-card class="dog-card">
        <v-card-media
          height="150px"></v-card-media>
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

You can see the empty card with a 'Delete' button right after the current dog view. Now we need to find a way to show `favoriteDogs` items inside of these cards (yes, right now it's empty, but there will be a lot of dogs here!)

To render a list of items based on an array Vue has a `v-for` directive, which will iterate through this array and render each item. Let's add this directive to our `v-flex` element:

```
<v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="index">
```
Here `pet` is the reference to the _current array element_ and `index` is the _index of this element_ inside the array.

::: tip 💡
Remember, we chose this name inside the directive; if we had written `v-for="(dog, number) in favoriteDogs"` each item will be called `dog` and its index will be called `number`). 
:::
     
To properly loop and append, you need to provide a unique key attribute for each item. In our case, the `index` will be the key.

You can see now our empty card disappeared. It's fine! We have an empty `favoriteDogs` array so it's simply nothing to render right now.

One thing left to do is to bind `pet` (which will be the image link) to the `src` property of the `v-card-media` component

```
<v-card-media
  height="150px"
  :src="pet"></v-card-media>
```

Now it's time to like some dogs 💖🐶!

## Adding dogs to Favorites

We will create a new method called `addToFavorites`. It will add the value of `currentDogLink` to the `favoriteDogs` array (JavaScript has a `push` array method for this purpose). Let's place it after the `loadNewDog` one *(don't miss the comma!)*

```
addToFavorites() {
  this.favoriteDogs.push(this.currentDogLink);
}
```
And of course we need to bind it to the 'Like' button:

```
<v-btn icon @click="addToFavorites">
  <v-icon>favorite</v-icon>
</v-btn>
```
Now try to click on the 'Like' button! You can see how our gallery is filling with the dogs images 🖼️

There is one issue: now we can add one image a few times. To prevent this we should check if the `currentDogLink` is already inside the `favoriteDogs` array and if it's true, we will disable the 'Like' button. Instead of placing this complex logic inside the template, we will create a _computed_ property.
::: tip 💡
Computed properties can be used to do quick calculations of properties that are displayed in the view. These calculations will be cached and will only update when their dependencies are changed. 
:::

Let's add the `computed` right after the `created()` hook and create a property named `isAlreadyInFavorites` in it.

```
  computed: {
    isAlreadyInFavorites() {}
  }
```
Any computed property should be a function returning the result of calculations. Let's check the index of `currentDogLink` inside the `favoriteDogs` array. If it is greater than -1 (in other words if the array contains such an element), the function will return `true`, otherwise it will return `false`:

```
computed: {
	isAlreadyInFavorites() {
	  return this.favoriteDogs.indexOf(this.currentDogLink) > -1;
	}
}
```
Now we can add dynamic `disabled` attribute to the 'Like' button and set it equal to `isAlreadyInFavorites`.

```
<v-btn icon @click="addToFavorites" :disabled="isAlreadyInFavorites">
  <v-icon>favorite</v-icon>
</v-btn>
```
Try to add the dog to favorites. Now you can see 'Like' icon is greyed-out and you cannot click it one more time.

## Removing dogs from Favorites
What if you stopped like one of the dogs images? You will need a way to remove it from the `favoriteDogs` array. We need one more method for this, let's add it after the `addToFavorites` one

```
removeFromFavorites() {}
```
Of course we should specify somehow what dog we want to remove from the array. Fortunately, we have the `index` parameter. Let's pass it to our method and remove the element with the given index from the `favoriteDogs` array:

```
removeFromFavorites(index) {
  this.favoriteDogs.splice(index, 1);
}
```
::: tip 💡
Here the splice() method changes the contents of an array by removing existing elements. The first argument is the index of the element we want to start with and the second argument is the number of elements we want to remove.
:::

Now we have to bind this new method to 'Delete' button with a click handler:

```
<v-btn icon @click="removeFromFavorites(index)">
	<v-icon>delete</v-icon>
</v-btn>
```
::: tip 💡
Don't forget to pass `index` to the remove method! When we don't pass any parameters, we can simply skip the brackets like we did for `addToFavorites` method
:::

Try to add and remove some dogs from favorites. IT WORKS!

**🎊Congratulations, you've finished the project!🎊**

## Bonus 1: Creating a Dog component
At this point we want to abstract a single grid dog card into a separate component to learn how parent and child components communicate.

We have a `components` folder but for now it's empty. Let's create a new file here and name it `Dog.vue`.

Open this file and add `<template></template>` and `<script></script>` tags. Now our file looks this way:
	
```
<template>
	
</template>
	
<script>
	
</script>
```
Now copy the Copy the whole `v-card` component with `class="dog-card"` from `App.vue` and paste it inside the template tag. You can delete it from `App.vue`.

We should pass pass the certain dog image link somehow. To do so, Vue uses `props`.

::: tip 💡
Props are custom attributes you can register on a component. When a value is passed to a prop attribute, it becomes a _prop_erty on that component instance. In our case the `Dog` component will have a `dog` property, passed from its parent `App` component.
:::

Let's add a `props` option to our component. First, we need to create an export statement inside our `script` tag (so later we will be able to import our `Dog` component inside the `App` one). Add this code block to `Dog.vue`:

```
<script>
   export default {
  
   }
</script>
```
	
Now we can add `props` option to this object and a prop `dog`:

```
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
	
Here we are also specifying the type of our dog - it will be a string containing link to the dog image.

In our template in `Dog.vue` we should replace `pet` with `dog`, because we don't have any `pet`s inside the `Dog` component, only a passed `dog` property. Now our template should look the following way:
	
```
<template>
  <v-card class="dog-card">
    <v-card-media
      height="150px"
      :src="dog"></v-card-media>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="removeFromFavorites(index)">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
```
Now let's move back to our `Pets.vue` component and make some changes. First of all we should import our newly created `Dog` component in to `Pets.vue`. Add this string after the `Dogs` import statement:

```
import Dog from "./components/Dog";
```

Now we have to 'explain' to the `App` component that it has a child component inside it. Vue uses a `components` option for this. Let's add a component option above the `data()` one:
	
```
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

::: tip 💡
For each property in the components object, the key will be the name of the custom element, while the value will contain the options object for the component
:::

::: tip 💡
For the component name you can either use a camel-case (`appDog`) or kebab-case (`'app-dog'`). Keep in mind that a camel-case name will be 'translated' to kebab-case in HTML tag names. So we will use the HTML custom tag `<app-dog>` and it will render a `Dog` component
:::

In `App.vue`, place our custom tag in the space where you deleted the card earlier:

```
<v-flex xs6 sm4 md2
  v-for="(pet, index) in favoriteDogs"
  :key="index">
  <app-dog></app-dog>
</v-flex>
```
We have to pass a `dog` prop to our `Dog` component. It will be done with the familiar `v-bind` directive (remember, you can use its `:` shortcut). Edit the code you just added to `Pets.vue`:
	
```
<v-flex xs6 sm4 md2
  v-for="(pet, index) in favoriteDogs"
  :key="index">
  <app-dog></app-dog>
</v-flex>
```
Now if you try to add dog to Favorites you will see the dogs in the grid again! But we have one issue: deleting dog will cause a bunch of errors in console. The reason is we don't have `removeFromFavorites` method inside the `Dog.vue` and it knows nothing about `index` as well.

Instead of using the method, we will add _event emitter_ to the button inside the Dog component.

```
<v-btn icon @click="$emit('remove')">
```
By using `$emit`, we are sending the message to our parent component (in this case it's `App.vue`) like 'Hi, something is happening here! Please read this message and react to it'.

Now let's open `App.vue` and add a _listener_ to our emitted event by overwriting the current `<app-dog>` tag with this snippet:

```
<app-dog :dog="pet" @remove="removeFromFavorites(index)"></app-dog>
```
	
So when `Dog` component emits the `remove` event (i.e. on 'Delete' button click), its parent `App` component will call `removeFromFavorites` method (which removes the certain dog from favorites array).

**🎊You've finished the Bonus chapter 1!🎊**

## Bonus 2: Add animations



## Author

Made with ❤️ by Natalia Tepluhina

