# 🛍️ 1: Build An E-Commerce App

| **Project Goal**              | Build an e-commerce web store with a products listing and cart
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn** | Setting up your React app, API basics, React components basics, fetch your products from an external API and handle cart actions                                                         |
| **Tools you’ll need**         | A modern browser like Chrome to access [CodeSandbox](https://codesandbox.io) - be sure to create an account in the CodeSandbox to keep the versions of your work intact. |
| **Time needed to complete**           | 2 hours                                                                                                                                                                  |
| **Just want to try the app?**        | [CodeSandbox link](https://codesandbox.io/s/fef-react-mini-commerce-5ilgo)                                                                                                        |

The main objective here is to learn **React** fundamentals in conjunction with working with an **API** to build an e-commerce application! We're going to create a real-world app fetching data from an external API to list products and along with adding cart functionalities! We're really excited so let's get right to it!

**Here is a summary of what we hope to achieve!**

-   Go over React basics
-   Create components in React
-   Fetch data from an external API data source, Chec
-   Use an axios-based library, Commerce.js, to add eCommerce logic
-   Display products on a products page
-   Add products to cart
-   Display cart items
-   Update and clear cart items

Check out this [live demo](https://codesandbox.io/s/fef-react-mini-commerce-5ilgo) sneakpeek to have a look at what we're building today! 

### Prerequisites

**This project assumes you have some knowledge of the below concepts before starting:**

- Some basic knowledge of JavaScript fundamentals
- Some basic knowledge of JavaScript frameworks

## Getting Started

We mentioned you needing **Code Sandbox** above, so what exactly is it? Codesandbox is an online IDE (Integrated Development Environment) playground that allows you to develop your project easily in the browser without having to set up your development environment.

So that's exactly what we're going to do. Head on over to [CodeSandbox](http://codesandbox.io) and create your account if you haven't already. Create a CodeSandbox account and scaffold a starter React template by clicking [here](https://codesandbox.io/s/new). Choosing a React template in codesandbox or downloading it as a dependency is the same idea as installing [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html) and getting a starting boilerplate of a single page application. You can read more about Create React App [here](https://github.com/facebook/create-react-app).


### Basic React App Structure:

In most cases when you scaffold a React project, a typical project structure would look like this.

- my-app/
  - README.md
  - node_modules/
  - package.json
  - public/
    - index.html
    - favicon.ico
  - src/
    - App.css
    - App.js
    - App.test.js
    - index.css
    - index.js
    - logo.svg

The `public` folder contains our assets, html static files and custom client side javascript files. `package.json` is used by npm (Node package manager) to save all the packages needed to deploy our app, but we don't have to worry about this because CodeSandbox installs and updates this file for us.

In our `public`, we have a standard html file called `index.html`. This is our point of entry file where we have our root element, which is named by convention. If you scroll down to line 30 in the body element, you will see `<div id="root"></div>`. This is the root element where we will be injecting our application.


The `src` folder contains all our React code and houses our `index.js`, `app.js` and later on our components when we start to create them. The file`index.js` is opened by default. You will see something like this:

```js
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
```

Here we import the React library and we use the ReactDOM `render()` method in order to print the contents of our App component into the root div in our `index.html` that we specified above. Our main app component `App.js` has to be imported as well to be included in the render.  The `App.js` component is passed in as the first argument in the render function and the `rootElement` as the second argument. That will tell React to render the app component and transform it into an element using the `React.createElement` method at build time to the index page. We will be stripping out all the scaffolded code in the component `App.js` and rebuilding later on.

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

The App function in `App.js` represents a React component. You can create your components as a individual files (Single File Component - SFC). In React, html-like tags which are what we call JSX can be passed in the render function and be returned. The JSX inside the return function is what the `App.js` will render out. 

::: tip 💡
What are **Components**?
Components sections of your application that you extract out into separate files so that you can make them reusable.  There are two types of components, function components and class components. We will get into these different components a bit more later in the tutorial.
:::

Now that we've walked through the starting structure in a React application, this is where the real fun begins. As you know we will be building a real-world e-commerce application sourcing data from an API data source. In order to do that, we will need to install a package dependency. So lets get right to it!

## Install our commerce API

We will be using a commerce API platform to source our products data. The commerce backend we will be using is called [Chec](https://commercejs.com/) and it comes with the handy [Commerce.js](https://github.com/chec/commerce.js) SDK packed with helper functions to handle our commerce logic in the frontend seamlessly. 

::: tip 💡
What are **API**s and **SDK**s? **API** stands for Application Programming Interface and acts as a "contract" between client and server. The client which is a browser or any front-facing layer makes a request to a server to receive a response or initiate a defined action. When a platform has an API, it allows a software or front-facing client to interact with its data. **SDK** stands for Software Development Kit and is a installable package of development tools that typically comes with a library, a debugger, and other common tooling.
:::

In a standard local development environment, the Chec/Commerce.js SDK can be installed in two ways: 
1. Install the package via package manager either with npm `npm install @chec/commerce.js` or yarn `yarn @chec/commerce.js`
2. Install via CDN by included this script `<script type="text/javascript" src="https://assets.chec-cdn.com/v2/commerce.js"></script>` in the `index.html` file.

Since we are using Codesandbox, we can conveniently add a dependency on the left sidebar. So let's go ahead and do that! Click on **Add dependency** and in the search field type in `@chec/commerce.js` and select the option which is the latest 2.1.1 version.

::: tip 💡
The Commerce.js SDK is using the axios library under the hood. Axios is a promise-based HTTP client that works both in the browser and in other node.js environments.
:::

## Link up our Commerce instance

The Commerce.js SDK comes packed with all the frontend oriented functionality to get a customer-facing web-store up and running. In order to utilize all the features of this commerce platform's SDK, we are going to import the module into a folder called `lib` so that we can have access to our Commerce object instance throughout our application.

Let's go ahead and do that right now! In your `src` directory, we'll create a new folder called `lib`, create a file `commerce.js` and copy and paste the below code in it. Typically a lib folder in a project stores files that abstracts functions or some form of data.

```js
// src/lib/Commerce.js

import Commerce from '@chec/commerce.js';

export const commerce = new Commerce('pk_17695092cf047ebda22cd36e60e0acbe5021825e45cb7');
```

Ok so what have we done here? First we import in the Commerce.js module which we will be using to communicate with the API platform, then we export an instance of `Commerce` and pass in a public key. The public key is needed to give us access to data in the Chec API.

::: tip 💡
Please note that for the purpose of getting you up and running with an account with products data, a public key is provided from a demo merchant account. A token key acess is what gives the API an authentication scope. A public key will give us access to Chec's core API resources such as your products and cart data.
:::

Now that we've installed our commerce SDK and created our Commerce instance, we now have access to the Commerce object throughout our application!

## Create your first component

Commerce.js was built with all the frontend functionalities you would need to build a complete eCommerce store. All you need to do is make requests to various Chec API endpoints, receive successful responses, then you have your raw data to output beautifully onto your web store.

Now, lets start to make requests to fetch data from Chec. First let's go ahead and replace the starter code in our `App.js` with the below code block.

```js
// src/App.js

import React from "react";

import ProductsLanding from "./components/ProductsLanding";

export default function App () {
  return (
    <div className="app">
      <ProductsLanding />
    </div>
  );
};
```

You can note that we have imported a new component `ProductsLanding.js`. This component that we will be creating later will render the main products container in our products catalogue. 

Now let's go into our `src` folder and create a new folder and name it `components`. Inside `components`, let's create a component file named `ProductsLanding.js`.

```js
// src/components/ProductsLanding.js

import React, { Component } from 'react';
import { commerce } from '../lib/Commerce';

class ProductsLanding extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="container mx-auto px-4">
                <div className="flex mb-4">
                    <div className="row">
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductsLanding;
```

In the above code block, we are creating our first class component called `ProductsLanding` with some skeleton code. At the top, we want to import in the `commerce` instance that we exported in our lib function so that our commerce object is available throughout the application. The first method we are including is the `constructor` method. We will be defining our initial state here later.

::: tip 💡
The **constructor** method in a React class component gets called before the component gets mounted and helps to initialize local states or bind event handlers in the object you're creating. You would only need to define a constructor if you need to maintain some form of state in your React component.
:::

We need to pass `props` in as a parameter in the the constructor method and call the `super()` method in order to make the `this.props` object available. The `super()` method then calls the constructor of the parent class which is our class component in this case.

Lastly, we have our `render()` method in which we return the JSX we want to output from the component.

## List your products from Chec

Now that we have the main structure of our `ProductsLanding` component, we can then use our first Commerce.js function to call our products data and list them out onto our app. One of the core resources of Chec is [products](). Products in Chec have a rather large data structure with all the endpoints you would need to render out a slick UI. You can see an example of an abbreviated products data response below to have an idea:

```json
{
  "data": [
      {
          "id": "prod_1ypbroE658n4ea",
          "created": 1579823164,
          "last_updated": 1579823164,
          "active": true,
          "permalink": "ABC123",
          "name": "Commerce.js lapel pin",
          "description": "<p>Simply attach these pins to instantly wear a suit!<\/p>",
          "price": {
              "raw": 10,
              "formatted": "10.00",
              "formatted_with_symbol": "10.00",
              "formatted_with_code": "10.00 "
          },
          "quantity": 0,
          "variants": [],
          "assets": []
      },
  ],
}
```

The data object contains all the property endpoints such as the product name, the product description, product price or any uploaded variants or assets. This data is exposed when you make a request to the API. As mentioned above, Commerce.js is a Software Development Kit(SDK) that comes with abstracted axios promise-based function calls that will help to fetch data from the endpoints. The public key access that we briefed over above is a public token key from a merchant store. This account already has products and products information uploaded to the Chec dashboard for us to run a demo store with. 

Now that we understand the data structure that will be returned a little bit, let's go back to our `ProductsLanding` component and add our commerce logic.

First we set our initial state with an empty products array. When we make our API request to fetch our products in the next step, the promise in our fetch function will resolve and store the products data in state. Declaring the state will go directly after calling of the `super(props)`.

```js
this.state = {
  products: [],
}
```
Our `ProductsLanding` component was created as a stateful component. This means that this component has the ability to keep track of changing data. You might ask why would be want to keep track of changing data. Any commerce store needs to have the ability to update its products listing in real-time. Be it new products being added, products being sold out, or products being taken off. The API data constantly will get updated, therefore the UI has to be reactive.

Next, we'll need to create the function that will fetch our products data as mentioned above. Let's call this function `fetchProducts()`. Within the function, we will be using our first Commerce.js method. Place the below code directly after declaring your initial state.

```js
// src/components/ProductsLanding.js

componentDidMount() {
  this.fetchProducts();
}

/**
 * Fetch the list of products from Chec's API
 */
fetchProducts() {
  commerce.products.list()
    .then((res) => {
      this.setState({
        products: res.data,
      });
    })
    .catch(error => console.log(error));
}
```

Let's now walk through what we did in the above code snippet. First lets look our `fetchProducts()` function, it is where we will be making our first API call to the products endpoint. Inside the function we are using our `commerce` object to access the `products` endpoint and using the `list()` method to output our products data. `commerce.products.list()` is a promise-based function call that will resolve the request and `then()` will set the responded data with `this.setState` into the `products` array created earlier in the component's state. The `catch()` method is meant to catch any errors in the case that the request to the server fails.

Next let's look at `componentDidMount()`, it is a React lifecycle method that helps to call functions when the component first mounts to the DOM. Since we are loading data from a remote endpoint, we want to invoke the `fetchProducts()` function to update the state with the returned products products so that we can render our updated data. Speaking of render, we are going to write one of the core React functions `render()`. Without `render()` and a `return` statement, nothing would get logged onto our frontend.

```js
render() {
  const { products } = this.state;

  return (
    <div className="container mx-auto px-4">
      <div className="flex mb-4">
        <div className="row">
          {products.map((product) => (
            <div className="col-sm-4" key={product.id}>
              <ProductCard 
                  product={product}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

Before we get into our JSX markup, lets first have a look at our expected products data thats currently in state:

At the very top of this `render()` function, we are destructuring our state as a constant, our `products` in this case, to reference in our JSX markup. 

```js
import React, { Component } from "react";

class ProductCard extends Component {

    render() {
        const { product } = this.props
        const reg = /(<([^>]+)>)/gi;
      
        return (
          <div className="card my-5 border-0">
            <img className="card-img-top" src={product.media.source} alt={product.name} />
            <div className="card__details p-4">
                <h4 className="card__details-title text-center display-5 pt-2">{product.name}</h4>
                <p className="text-center card-text display-5 pt-2">
                {(product.description || "").replace(reg, "")}
                </p>
                <div className="card__details-footer d-flex pt-2">
                    <p className="text-center display-5 price">
                    {product.price.formatted_with_symbol}
                    </p>
                    <button>
                      Quick add
                    </button>
                </div>
            </div>
          </div>
        );
    }
  };


export default ProductCard;
```

## Add products to cart

```js
constructor(props) {
    super(props);

    this.state = {
      products: [],
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
```

```js
/**
 * Handle add product to cart
 * 
 * @param {object} product
 */
handleAddToCart(product) {
  commerce.cart.add({ id: product.id }, 1)
    .then((res) => {
      this.setState({
        cart: res.cart
      })
    })
    .catch(error => console.error(error));
}
```

```js
import React, { Component } from "react";

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleAddToCart() {
        this.props.onAddToCart(this.props.product);
    }

    render() {
        const { product } = this.props
        const reg = /(<([^>]+)>)/gi;
      
        return (
          <div className="card my-5 border-0">
            <img className="card-img-top" src={product.media.source} alt={product.name} />
            <div className="card__details p-4">
                <h4 className="card__details-title text-center display-5 pt-2">{product.name}</h4>
                <p className="text-center card-text display-5 pt-2">
                {(product.description || "").replace(reg, "")}
                </p>
                <div className="card__details-footer d-flex pt-2">
                    <p className="text-center display-5 price">
                    {product.price.formatted_with_symbol}
                    </p>
                    <button
                        onClick={this.handleAddToCart}
                    >
                        Quick add
                    </button>
                </div>
            </div>
          </div>
        );
    }
  };


export default ProductCard;
```



## Update cart items



## Author

Made with ❤️ by Jaeriah Tay