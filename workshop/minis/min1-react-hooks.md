# 🖥️ 1: Build A Simple Pet Fetching Web App

| **Project & nbsp; Goal**              | Get started with React basics and simple API calls with axios                                                                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What & nbsp; you’ll & nbsp; learn** | Setting up your React app, components basics, performing simple REST API calls using Axios                                                                              |
| **Tools & nbsp; you’ll need**         | A modern browser like Chrome.Access to[CodeSandbox](https://codesandbox.io) - be sure to create an account in the CodeSandbox to keep the versions of your work intact. |
| **Time needed to complete**           | 1 hour                                                                                                                                                                  |
| **Just want to try the app ?**        | [CodeSandbox link](https://codesandbox.io/s/fetch-a-dog-00ruj)                                                                                                          |

    # Instructions

    ## The Goal

Yes, the main objective is to learn the basics about React. But if we say it that way is pretty boring. So what about creating an App to fetch random dogs with the option to add our preferences to a favorite list. It sounds much better right.

What are we going to need to achieve our Goal ?

-   React
-   Axios(To perform AJAX API requests)
-   Some Style with Materialize


## Scaffold your app

We'll start from scratch in [CodeSandbox](http://codesandbox.io). Create a CodeSandbox account and scaffold a starter React template by clicking [here](https://codesandbox.io/s/new).

We're going to build an application to load random dog images and store them to a favorites list:

![Fetch a cute Dog](./images/mini1 - react.png)

## Install required packages

We have React installed, But we need to install Axios to help with our API calls. So click on `Add Dependency` and Search for `axios`.Just click on the firt result and CodeSanbox is going to install it for you.

::: tip 💡
To perform API calls we will be using a library called[Axios](https://github.com/axios/axios). It's a promise-based HTTP client that works both in the browser and in other node.js environments.
:::


### Basic React App Structure:

-   public /
-   src /
-   package.json

_public_ will contain our image assets, html static files and custom client side javascript files, `package.json` is used by npm(Node package manager) to save all the packages needed to deploy our App, but we dont have to worry about this because CodeSandbox installs and updates this file for us.

_src_ will contain our App and our React Components.

Take a look at the code that was scaffolded by CodeSandbox for a basic React app.The file`index.js` is opened by default.This is the starting point of a React app.You will see something like this:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

function App() {
	return (
		<div className="App">
			<h1>Hello CodeSandbox</h1>
			<h2>Start editing to see some magic happen!</h2>
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

::: tip 💡
Wait a minute.Whats that? An HTML tag inside Javascript? Yes, that's right. In react components look like custom HTML tags that will return a function or assign them to a javascript variable. This kind of syntax is called JSX (syntax extension to JavaScript). Now let's get back to business.
:::

This file includes three sections.The first one imports react, react - dom and style files to our app.The second section is the App function that defines the App component and the Third section reders(injects) the App component code into the root element.

Another important file inside the`src` directory is`style.css`, We will write our Custom CSS code and give our app a cool makeover!.

Note that we inject our App component into the root element. We can find this element in the`public/index.html` file, this place is perfect to include general css and js libraries that can be used in the client side of our Application.

By default CodeSandbox imports all the needed dependencies from npm to build the app.You can always check out `package.json` to find out which dependencies are needed.In fact you'll see a list of the minimum packages installed by default under the `Dependencies` option on the sidebar.

Another important detail is the App function (`App.js`), this represents a React component. We can define a React Component in two ways:

-   Functions
-   Classes and Objects

Previously, components with `state` (don't worry, we will go into this more later) had to be written as classes, but thanks to `React Hooks` we can now write more declaritive and performant code.  Your use of classes or functions depends on your preference and situation. As you can see, our first component (`App.js`) is presented as functional component, so we will be using `hooks` for this example.

```js
import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

As we mentioned before, the App function represents a Component. React components are small, reusable pieces of code that return a React element to be rendered to the page.  You can create you components as a indiviual files (Single File Component - SFC).So go ahead and create the components directory (just to be more organized), and move your `App.js` file to components.  Then delete `import "./styles.css"` from `App.js`.  We will import the CSS into `index.js` instead.  


-   The`props` attribute allow us to control dynamic properties for our App Component.For example you can provide the property "color" to the App Component`<App color="red"/>`.So you can access it through`this.props.color`.
-   Notice that the `return()` function contains the template that React is going to render for our App Component.
-   The`export default` tells javascript that we want to export the component for reusing it.

Now go back to the`index.js` file, delete the App function and add the import for our new Component and `./styles.css`. The file should look as follows:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './styles.css';

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

Here we import the App Component you just created and we pass it to the render method of ReactDom to render it into the `rootElement`.

This was a little intro to the basics. Now we're going to rip this sample app apart and recreate it! Let's get started.

## Add the Styles

Let's start in `style.css` and Add the following style block at the bottom of the file:

```css
.App {
	font-family: sans-serif;
	text-align: center;
}
.content {
	width: 100%;
	height: 100%;
	position: absolute;
}
.dog {
	margin: auto;
	width: 100%;
	height: 400px;
	overflow: hidden;
	position: relative;
}
.dog img {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.thumb .dog {
	height: 100px !important;
	margin-top: 5px;
	position: unset;
}

.thumb .dog img {
	width: auto !important;
	min-width: 100%;
	height: 100px !important;
}

body {
	background: url('https://media.istockphoto.com/vectors/dog-paw-print-seamless-template-for-your-design-wrapping-paper-card-vector-id922637404?k=6&m=922637404&s=612x612&w=0&h=oaqzPXnPZjq-kekUyEo4uNvSnEMHhneUg0D658ELCwo=');
}

.semitrans {
	position: fixed;
	width: 50%;
	height: 100%;
	z-index: -1;
	opacity: 0.5;
}
.superdi-icon {
	position: absolute;
	top: -10px;
	right: -10px;
	z-index: 1000;
	background: #fff;
	border-radius: 50%;
}
.super-title {
	z-index: 10000;
	width: 100%;
	padding: 0px !important;
}
.favorite {
	width: 100%;
}

.relative {
	position: relative;
}
```

::: tip 💡
This style block uses a path to an external image hosted on iStockPhoto, rather than to a relative path.This is because CodeSandbox doesn't host images easily; normally you'd just add an image on a relative path such as `/images/myImage.png` inside the`public` directory.
:::

Adding the stylesheet didn't do much to our template except break the existing styles. Let's fix the template!

## Adding Materialize

For this app, we will use Materialize, a modern responsive front - end framework based on Material Design that provides us nice css components to show our data.

To start with Materialize, edit `public/index.html` and add the following lines:

-   Before title tag:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

-   After the root div element (`<div id="root"></div>`):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
```

::: tip 💡
Materialize is awesome and very easy to work with! We encourage to check their documentation if you want to use it for other React projects.
:::

Let's also change the page title to `Random dog`. To do so, we have to change the content of the `title` tag:

```html
<title>Random dog</title>
```

Then, go ahead and overwrite the content of the template in `App.js` with this markup, Just rewrite the lines inside the return function:

```js
return (
	<div className="App container-fluid">
		<div className="content">
			<div className="row dog-row valign-wrapper">
				<div className="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
					<div className="card lighten-2 dog-card">
						<div className="card-image">
							<img src="https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg" alt="chihuahua" />
							<span className="card-title super-title red">Choose your favorite dogs</span>
						</div>
						<div className="card-action right-align actions">
							<a className="btn-floating waves-effect waves-light red">
								<i className="material-icons">favorite</i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);
```

Your app should refresh (if it doesn't, use the manual refresh button in the app preview address bar).

## Add some data

At the moment we can only see a centered card with a static image of a chihuahua dog loaded using the`src` property in the image tag.

```html
<img src="https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg" alt="chihuahua" />
```

But the idea is to make this link dynamic, so it's time to create your first Reactive variable and set your app's `state`. `State` is an attribute that is used to store information.  It contains all the App Component data that can dynamically change when the component re-renders.  In a functional component, we can utilize the hook `useState`.  

- `useState` is a function which returns a _tuple_ (an array with 2 items).

To set state with `useState` we will first need to import it in our `App.js` component.  Replace

```js 
import React from "react";
```

with 

```js
import React, { useState } from "react";
```

Next, we need to declare our state, our function to update state and call `useState` within our component.  Within your component (under `export default function App() {`) add
```js
const [dog, setDog] = useState('https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg')
```

In our example of `useState`, we have named our state `dog`, we have named our function to update state as `setDog` and we have created an initial dog variable as state.  We decided to put this variable there because it will change later (To load random images from the api. All the data that changes in our application must be saved in the React state object and we will udpate it with `setDog`.

Now we have to change the template to make the `src` property _dynamic_ so it can use the value of the variable we just populated above.Now we can modify the `App.js` template section, right where our image loads.

Before:

```js
<img src="https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg" alt="chihuahua" />
```

After:

```js
<img src={dog.image} alt="a random dog" />
```

::: Important tip 💡
As we mentioned before, you can use html tags in an assignment, a return function or in the render function of ReactDom.But to pass the values of the state or the properties of a component, you have to write the variable in brackets it can be rendered.
:::

Great! Now it's time to load some dogs from the Dog CEO API!

## Add Axios to Our Code

At the very begining, we installed Axios, Now is the time to use it!. It will basically help us load random dog images from the Dog CEO API.

Import Axios into the component where we will perform our API call. Go to `App.js`, and in script block, add the following line:

```js
import axios from 'axios';
```

you can add this below the react import at the very beggining.

Your import should look like this:

```js
import React from 'react';
import axios from 'axios';
```

Now we ar ready to start loading images from the API.

## Making the (API) call! ☎️

Let's perform our first API call. To do so, we will create an `updateRandomDogDog` _method_ inside our component (App.js).

Let's add it right after the `useState`:

```js
const [dog, setDog] = useState("https://images.dog.ceo/breeds/chihuahua/n02085620_3407.jpg");

  const updateRandomDog= () => {

  }
```

For now this method does nothing but we want it to load a new dog from the API.

First we have to check which endpoint we have to use. Looking at the API's [documentation](https://dog.ceo/dog-api/), it tells us to use `https://dog.ceo/api/breeds/image/random` as our endpoint. It will provide a random dog image.

To perform a `GET` request, Axios uses the `axios.get` method. The result will be a JavaScript promise, so we have to provide success and failure callbacks to manage its lifecycle. For now, let's simply print the query result to console. Still in `App.js`, edit the `updateRandomDogDog(){}` method by placing this snippet between the curly brackets:

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

We want a new image to replace the old one right when the component is created, so let's add a `useEffect` hook right before `updateRandomDogDog` method:

```js
useEffect()
```
Since this is another hook, we need to import `useEffect` next to `useState` at the top. Your first line of `App.js` should look like this:

```js
import React, { useState, useEffect } from "react";
```


::: tip 💡
The Effect Hook allows you to perform side effects in functional components.  It is the equivalent to using component lifecycle methods such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.  These are very useful when you want fine control over when to run blocks of code. Read more [here](https://React.org/docs/state-and-lifecycle.html).  You can read more about the Effect hook [here](https://reactjs.org/docs/hooks-effect.html)
:::

Inside the `useEffect` hook we will call our method.

```js
componentDidMount() {
    //Each time our App loads show a random dog
    updateRandomDog();
}
```

Now after clicking the refresh button in the browser window, you should see an object in your console. Drill into it by clicking the left-hand arrow. We are interested in the `data` field.You can see we have a status: `success` and a message with an image URL.

## Using the API

Let's replace our `dog` state object with the API loaded data. At this point we can remove the static value:

```js
const [dog, setDog] = useState('');
```

Inside the`updateRandomDog` method instead of printing the result to the console we will assign`response.data.message`(which is actually the image URL) to the`dog` property object:

```js
  updateRandomDogDog() {
    axios.get("https://dog.ceo/api/breeds/image/random").then(response => {
      setDog(response.data.message);
    }).catch(error => {
      console.log(error);
    });
  }
```

::: tip 💡
This is the first time we call our `setDog` function to set state. You may notice that we don't use `dog = response.data.message` to rewrite the values of this object. That's because if we do it this way we lose reactivity. In order to propagate the changes to all the sections where the dog state is used (including the templates) we have to follow the React rules and update the state using the `setDog` method.
:::

Now every time you refresh the page, you will have a shiny new dog image!

We also want to call the same method when you click on the image card, so it shows us a new dog on each click!. Let's add a click handler to the card. We are going to use the `OnClick` event for this purpose:

```js
<div className="card-image" onClick={updateRandomDog()}>
	<img src={dog} alt={dog} />
	<span className="card-title super-title red">Choose your favorite dogs</span>
</div>
```

Now we can load new images simply by clicking on the image card. Cool Beans!!! 🤓

## Build the Favorites List

We want to let a user add dog images to a personal list of their favorites and show the gallery of these images right below our current dog view. To store the links we need one more data property - an array called `dogs`. Let's add it right after our `dog` state. This time it should be an empty array by default:

```js
const [dog, setDog] = useState("");
const [dogs, setDogs] = useState([])
```

To display the favorite dogs we should make changes to our template. Let's add the following code snippet right after the closing `card div`

```html
<div className="section">
	<div className="row">
		{dogs != null && dogs !== undefined && dogs.map((dog, index) => (
		<div key={index} className="col s4 thumb">
			<div className="relative">
				<div name="randdog" className="dog waves-effect waves-light">
					<img className="favorite" src={dog} alt={dog} />
					<i className="material-icons superdi-icon red-text">
						do_not_disturb_on
					</i>
				</div>
			</div>
		</div>
		))}
	</div>
</div>
```

Hmmm, this may look a bit complicated, but over time you will get used to it. If you analyze it carefully you will understand it is actually quite simple.

After the`<div className="row">` we see:

```js
    { dogs != null && dogs !== undefined && dogs.map((dog, index) => (
        //what to render
    ))}
```

The first two lines evaluate if `dogs` exists and is not empty. If it exists, then `dogs.map((dog, index) => (` is executed. The map function starts to loop each element of the `dogs` array. The _current_ position index is represented by the index local var and the _current element_ is represented by the dog variable.

The `))}` represents the end of the operation.In the "what to render" space you can load the elements that you want data to show for.

Inside the loop there is:

```js
<img className="favorite" src={dog} alt={dog} />
```

This is going to load the image and the link of the dog object for each iteration, providing the `dog` link to the `src` attribute to render the image. Another important detail is that when you do this kind of iteration React waits for a unique key attribute in the root element.Thats why the`<div key={index} className="col s4 thumb">` has the `key` property included.

The following code shows the delete icon. This icon is going to trigger a function that removes an element of the `dogs` array.But for now this element is disabled because we need to focus on showing our favorite dogs list.

```js
<i className="material-icons superdi-icon red-text">do_not_disturb_on</i>
```

::: tip 💡
Remember, we chose a specific name inside the directive; if we had written`dogs.map((element, number) => (` each item would have been called `element` and its index would have been called `number`).
:::

You can see that our empty card disappeared.It's fine! We have an empty `dogs` array so there's simply nothing to render right now.

Now it's time to like some dogs.

## Adding dogs to favorites

We will create a new method called `addNewDog`. It will add the value of `dog` to the `dogs` array (JavaScript has a`push` array method for this purpose). Let's place it after `updateRandomDog`:

```js
const addNewDog = () => {
  dogs.push(dog);
  //rewrite dogs array
  setDogs(dogs)
}
```

And of course we need to bind it to the 'Like' button in the top card:

```html
<a className="btn-floating waves-effect waves-light red" onClick={() => addNewDog()}>
	<i className="material-icons">favorite</i>
</a>
```

Now try to click on the 'favorite' button! You can see how our gallery is populated with dog images!!

There is one issue: now we can add the same image a few times. To prevent this we should check if the `dog.image` is already inside the`dogs` array and if it is the case, we will disable the 'favorite' button.

Instead of placing this complex logic inside the template, we will create a `isInPack` state and a `checkPack` function.

We will also create a `isInPack` state and assign a `false` value to it. This value is going to be toggled between true and false to know if the current random image is inside our favorite list

```js
  // current dog
  const [dog, setDog] = useState("");
  //favorite dogs
  const [dogs, setDogs] = useState([]);
  const [isInPack, setIsInPack] = useState(false)
```

Add `checkPack` before `updateRandomDogDog()`

```js
const checkPack = () => {
  const pack = dogs
    .map((dog) => {
      return dog.image;
    })
    .indexOf(dog);
  setIsInPack(pack !== -1 ? true : false)
}
```

So, `dogs.map(function(dog) { return dog; })` loops the dogs array and returns an unidimensional array of images for each dog, then`.indexOf(dog)` can check if the current image is present in this unidimentional array.

Then `setIsInPack(pack !== -1 ? true : false)` updates the `isInPack` to true if the image is in our favorite list and if not, then false.

The function has to be evaluated when you add a new image in the favorite list and when you remove an image from the list. Next step is to add `checkPack()` to `addNewDog`:

```js
const addNewDog = () => {
    dogs.push(dog);
    setDogs(dogs);
    checkPack()
}
```

Now in `App.js` we can evaluate the `isInPack` state to enable or disable the favorite icon

Before:

```js
<a className="btn-floating waves-effect waves-light red" onClick={() => addNewDog()}>
	<i className="material-icons">favorite</i>
</a>
```

After:

```js
<a
	className={
		isInPack
			? 'btn-floating waves-effect waves-light red disabled'
			: 'btn-floating waves-effect waves-light red'
	}
	onClick={(e) => handleClick(e, 'favorite')}
>
	<i className="material-icons">favorite</i>
</a>
```

As you can see now `isInPack` is evaluated in the `className` attribute. If true the `disabled` css class is going to be added to the class list. Disabled class is used by materialize to disable elements.

Try to add the the same dog to favorites. Now you can see the 'favorite' icon is greyed out and you cannot click it again.

## Removing dogs from Favorites

What if you stopped liking one of the dog images? In this unlikely event, you will need a way to remove it from the `dogs` array. We need one more method for this, so let's add it after `updateRandomDog`:

```js
const deleteDog = (index) => {}
```

Of course we should specify somehow what dog we want to remove from the array. Fortunately, we have the`index` parameter. Let's pass it to our method and remove the element with the given index from the `dogs` array:

```js
const deleteDog = (index) => {
  dogs.splice(index, 1);
  setDogs(dogs)
//   this.setState({ dogs: this.state.dogs });
  checkPack();
}
```

::: tip 💡
Here the `splice()` method changes the contents of an array by removing existing elements. The first argument is the index of the element we want to start with and the second argument is the number of elements we want to remove.
:::

Now we have to bind this new method to the 'Delete' button with a click handler, Let's go again to `App.js` and change the following inside the dogs loop:

Before:

```html
<i className="material-icons superdi-icon red-text">
	do_not_disturb_on
</i>
```

After

```js
<i onClick={index => deleteDog(index))} className="material-icons superdi-icon red-text">
	do_not_disturb_on
</i>
```

Try to add and remove dogs from favorites. IT WORKS!

**🎊Congratulations, you've finished the base project!🎊**

## Supplement 1: Creating a dog Component

At this point we want to abstract a single dog card from the Favorites grid into a separate component to learn how parent and child components communicate.

We have a`components` folder. Let's create a new file here and name it `Dog.js`.

Open this file and add the following code:

```js
import React from 'react';

const Dog = () => {
    return (
        <div className="relative">
            <div name="randdog" className="dog waves-effect waves-light">
                <img
                    className={
                        this.props.context !== null && this.props.context !== undefined ? this.props.context : ''
                    }
                    src={this.props.image}
                    alt={this.props.link}
                />
                {this.props.context !== null &&
                this.props.context !== undefined &&
                this.props.context == 'favorite' ? (
                    <i onClick={this.props.onClick} className="material-icons superdi-icon red-text">
                        do_not_disturb_on
                    </i>
                ) : (
                    ''
                )}
            </div>
        </div>
	);

}
```

As you can see this code is pretty similar to the favorite section code.

You know, that section where we loop the `dogs` array in `App.js`?.That's because we reuse code, In fact the idea of this Component is to adapt depending of two contexts:

-   The main random dog card
-   The favorites section

We are going to receive parent information of the context and we are going to render the component according to that context.

Analyzing the code:

```js
<img
	className={context !== null && context !== undefined ? context : ''}
	src={image}
	alt={link}
/>
```

For the `img` tag we are going to add a context class to apply a style for a specific context.

For example: when `dog` is loaded in the favorite context, `img` will receive the class favorite and we can apply custom css using the`.favorite` class.

Instead of using the`src={dog}` to load the data of the current iteration, now we receive this data from the props of the component. That's why we use `src={image}`. The value of this property is assigned by the parent(App.js). For example:

Let's see: `<dog image="image.jpg"/>`, here we assign the image property to the`dog` component and we can read this property inside the component using `image`.

```js
{
	context !== null && context !== undefined && context == 'favorite' ? (
		<i onClick={onClick} className="material-icons superdi-icon red-text">
			do_not_disturb_on
		</i>
	) : (
		''
	);
}
```

We can see how we evaluate that if we are in the favorite context, we load the delete icon. Otherwise we don't load anything.

Notice that in the `onClick` event we assign `onClick`, and that's because `App.js` is going to pass the `deleteDog` Method for the element of the current iteration, and the delete icon is going to trigger this method when the user clicks it.

```js
export default Dog;
```

In here we export the dog class. Then you can reuse it wherever you want.

## Adapting App.js to use dog Component

Now let's move back to our `App.js` and make some changes. First of all we should import our newly created `Dog` component into `App.js`. Add this string at the beginning of the file after the axios import, like this:

```js
import React from 'react';
import axios from 'axios';
import Dog from './Dog';
```

Now we are going to tell react how to handle the context. We are going to manage three contexts:

-   favorite context
-   delete_favorite
-   the default context(update random dog)

to handle this, we define a new method called `handleClick` inside the App component class. You can add this one after `useEffect`:

```js
const handleClick = (event, id, index) => {
  if (id !== null && id !== undefined) {
    if (id == "favorite") {
      addNewDog();
    } else {
      if (id == "delete_favorite") {
        deleteDog(index);
      } else {
        updateRandomDog();
      }
    }
  }
  event.preventDefault();
}
```

<!-- 
Because I'm using arrow functions we don't have to bind anything... I'm not sure if that's what we want or not.
Also we need to add the following code at the end of the constructor

```js
constructor(props) {
  super(props);
  this.state = {
    //Favorite dogs
    dogs: [],
    //current dog
    dog: { image: "", link: "" },
    isInPack: false
  };
  //Tells react handleClick is a event handler
  this.handleClick = this.handleClick.bind(this);
}
```

the line`this.handleClick = this.handleClick.bind(this);` indicates that `handleClick` is going to handle the click event and manage the event object. -->

Now rewrite the App component template as follows:

```js
return (
	<div className="App container-fluid">
		<div className="content">
			<div className="row dog-row valign-wrapper">
				<div className="col s10 offset-s1 m6 offset-m3 l4 offset-l4">
					<div className="card lighten-2 dog-card">
						<div className="card-image" onClick={e => handleClick(e, 'randdog')}>
							<Dog image={dog} link={dog} />
							<span className="card-title super-title red">Choose your favorite dogs</span>
						</div>
						<div className="card-action right-align actions">
							<a
								className={
									isInPack ? 'btn-floating waves-effect waves-light red disabled' : 'btn-floating waves-effect waves-light red'
								}
								onClick={e => handleClick(e, 'favorite')}
							>
								<i className="material-icons">favorite</i>
							</a>
						</div>
					</div>
					<div className="section">
						<div className="row">
							{dogs != null && dogs != undefined && .dogs.map((dog, index) => (
								<div key={index} className="col s4 thumb">
									<Dog
                                        onClick={e => handleClick(e, 'delete_favorite', index)}
                                        context="favorite"
                                        image={dog}
                                        link={dog}
                                    />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);
```

We are going to analyze what changed here:

-   First: the Card for Random dogs

    ```js
    <div className="card-image" onClick={e => handleClick(e, 'randdog')}>
    	<dog image={dog} link={dogk} />
    	<span className="card-title super-title red">Choose your favorite dogs</span>
    </div>
    ```


When you click the card-image, Our `handleClick` method is triggered. The first argument is the event and the second argument is the context. in this case `randdog`. When `randdog` is passed to `handleClick`, `updateRandomDog` is executed and the random dog image is loaded.

For the random card section we use the dog component and pass the _current_ dog state as the link and image.

- Second: The card actions

```js
<a
  className={
    isInPack
      ? "btn-floating waves-effect waves-light red disabled"
      : "btn-floating waves-effect waves-light red"
  }
  onClick={e => handleClick(e, "favorite")}
>
  <i className="material-icons">favorite</i>
</a>
````

The only thing that changed here was the `onClick` handler. We use `handleClick` now and we pass the favorite context. When favorite context is passed, `handleClick` executes the `AddNewdog` method.

-   Third: The dogs iteration

```js
<div className="section">
    <div className="row">
        {this.state.dogs != null &&
            this.state.dogs != undefined &&
            this.state.dogs.map((dog, index) => (
                <div key={index} className="col s4 thumb">
                    <dog
                        onClick={e => this.handleClick(e, 'delete_favorite', index)}
                        context="favorite"
                        image={dog}
                        link={dog}
                    />
                </div>
            ))}
    </div>
</div>
```

As you cand see we deleted the img html tag and we added the dog Component inside the iteration. Throughout the `handleClick` method we pass the `delete_favorite` context and the _current_ index we want to delete. This method is triggered when the user clicks the delete icon inside the dog component as we have mentioned before.

We also we pass `image` and `link` and attributes to the dog component to render the image of the dog in the favorite section.

**🎊You've finished Supplement 1!🎊**

## Author

Made with ❤️ by Natalia Tepluhina, updated by Jen Looper and migrated to React by SuperDiana!
```
