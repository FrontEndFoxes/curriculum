# 🛍️ 1: Build An E-Commerce App

| **Project Goal**              | Build an e-commerce web store with a products listing
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn** | Setting up your React app, API basics, React components basics, fetch and display products data from an external API                                                      |
| **Tools you’ll need**         | A modern browser like Chrome to access [CodeSandbox](https://codesandbox.io) - be sure to create an account in CodeSandbox to keep the versions of your work intact. |
| **Time needed to complete**           | 30 minutes                                                                                                                                                                 |
| **Just want to try the app?**        | [CodeSandbox link](https://codesandbox.io/s/commercejs-react-products-c5s8j)                                                                                                        |

The main objective here is to learn **React** fundamentals in conjunction with working with an **API** to build an e-commerce application! We're going to create a real-world app fetching data from an external API to list products in a product catalogue page! We're really excited so let's get right to it!

**Here is a summary of what we hope to achieve!**

-   Go over React basics
-   Create components in React
-   Fetch data from an external API data source
-   Use an axios-based JavaScript SDK to add eCommerce logic
-   List products on a products catalogue page

Check out this [live demo](https://codesandbox.io/s/commercejs-react-products-c5s8j) sneakpeek to have a look at what we're building today! 

### Prerequisites

**This project assumes you have some knowledge of the below concepts before starting:**

- Some basic knowledge of JavaScript fundamentals
- Some basic knowledge of JavaScript frameworks
- An idea of the JAMstack architecture and how APIs work

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
Components sections of your application that you extract out into separate files so that you can make them reusable.  There are two types of components, functional components and class components. We will get into these different components a bit more later in the tutorial.
:::

Now that we've walked through the starting structure in a React application, this is where the real fun begins. As you know we will be building a real-world e-commerce application sourcing data from an API data source. In order to do that, we will need to install a package dependency. So lets get right to it!

## Install our commerce API

We will be using a commerce API platform to source our products data. The commerce backend we will be using comes with the handy JavaScript SDK packed with helper functions to handle our commerce logic in the frontend seamlessly. 

::: tip 💡
What are **API**s and **SDK**s? **API** stands for Application Programming Interface and acts as a "contract" between client and server. The client which is a browser or any front-facing layer makes a request to a server to receive a response or initiate a defined action. When a platform has an API, it allows a software or front-facing client to interact with its data. **SDK** stands for Software Development Kit and is a installable package of development tools that typically comes with a library, a debugger, and other common tooling.
:::

Since we are using Codesandbox, we can conveniently add the commerce dependency on the left sidebar. So let's go ahead and do that! Click on **Add dependency** and in the search field type in `@chec/commerce.js` and select the option which is the latest 2.1.1 version.

::: tip 💡
The JavaScript SDK is using the axios library under the hood. Axios is a promise-based HTTP client that works both in the browser and in other node.js environments.
:::

## Link up our Commerce instance

The JavaScript SDK comes packed with all the frontend oriented functionality to get a customer-facing web-store up and running. In order to utilize all the features of this commerce platform's SDK, we are going to import the module into a folder called `lib` so that we can have access to the commerce object instance throughout our application.

Let's go ahead and do that right now! In your `src` directory, we'll create a new folder called `lib`, create a file `commerce.js` and copy and paste the below code in it. Typically a lib folder in a project stores files that abstracts functions or some form of data.

```js
// src/lib/Commerce.js

import Commerce from '@chec/commerce.js';

export const commerce = new Commerce('pk_17695092cf047ebda22cd36e60e0acbe5021825e45cb7');
```

Ok so what have we done here? First we import in the Commerce.js module which we will be using to communicate with the API platform, then we export an instance of `Commerce` and pass in a public key. The public key is needed to give us access to data in the API.

::: tip 💡
Please note that for the purpose of getting you up and running with an account with products data, a public key is provided from a demo merchant account. A token key acess is what gives the API an authentication scope. A public key will give us access to core API resources such as your products and cart data.
:::

Now that we've installed our SDK and created our Commerce instance, we now have access to the Commerce object throughout our application!

## Make your first request to fetch the products data

One of the main resources in the API is the products endpoint. The SDK
makes it seamless to fetch product data with its promise-based methods. This request would make a call to the `GET v1/products` API endpoint and return a list of product data. Open up your `App.js` file and delete the code that came with creating a new React app and we will write this file from scratch.

Import `commerce` as well as a `ProductsList` component which you'll create in the next
section. While there, initialize an empty array `products` state in your constructor.

```js
// src/App.js

import React, { Component } from 'react';
import { commerce } from './lib/commerce';
import ProductsList from './components/ProductsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
  }

  render() {
    return (
      <div className="app">
      </div>
    );
  }
};

export default App;
```

In React, when a component is created, the constructor is the first method called. Initializing your state in the constructor will allow you to store data on the component's instance when it's created. We also need to pass `props` in as a parameter in the the constructor method and call the `super()` method in order to make the `this.props` object available. The `super()` method then calls the constructor of the parent class which is our class component in this case. You'll initialize `products`
as an empty array in your app to be able to store the product data later on.

::: tip 💡
The **constructor** method in a React class component gets called before the component gets mounted and helps to initialize local states or bind event handlers in the object you're creating. You would only need to define a constructor if you need to maintain some form of state in your React component.
:::

You will be creating the products components as stateful components. This means that the components has the ability to keep track of changing data. You might ask why would be want to keep track of changing data. Any commerce store needs to have the ability to update its products listing in real-time. Be it new products being added, products being sold out, or products being taken off. The API data constantly will get updated, therefore the UI has to be reactive.

You can now make your first API request! Create a function called `fetchProducts()` in the component and make a request to the products endpoint using the method `commerce.products.list()`.

```jsx
/**
 * Fetch products data and stores in the products data object.
 */
fetchProducts() {
  commerce.products.list().then((products) => {
    this.setState({ products: products.data });
  }).catch((error) => {
    console.log('There was an error fetching the products', error);
  });
}
```

Inside the function, use the `commerce` object to access the `products.list()` method for access to product data. `commerce.products.list()` is a
promise-based function call that will resolve the request and `then()` sets the response data with `this.setState()` into
the `products` state key created earlier in the component's constructor. The `catch()` method catches any errors in the
case that the request to the server fails.

Of course simply creating the function does not do anything as you have yet to call this function. When the app component mounts to the DOM, use the lifecycle hook `componentDidMount()` to fetch your data. It is a React lifecycle method that helps to call functions when the component first mounts to the DOM. Since we are loading data from a remote endpoint, we want to invoke the `fetchProducts()` function to update the state with the returned products products so that we can render our updated data.

```jsx
componentDidMount() {
  this.fetchProducts();
}
```

Speaking of render, you are going to need one of the core React functions `render()`. Without `render()` and a `return` statement, nothing
would get logged onto your frontend. Below is the expected returned data (abbreviated):

```json
[
  {
    "id": "prod_NqKE50BR4wdgBL",
    "created": 1594075580,
    "last_updated": 1599691862,
    "active": true,
    "permalink": "TSUTww",
    "name": "Kettle",
    "description": "<p>Black stove-top kettle</p>",
    "price": {
      "raw": 45.5,
      "formatted": "45.50",
      "formatted_with_symbol": "$45.50",
      "formatted_with_code": "45.50 USD"
    },
    "quantity": 0,
    "media": {
      "type": "image",
      "source": "https://cdn.chec.io/merchants/18462/images/676785cedc85f69ab27c42c307af5dec30120ab75f03a9889ab29|u9 1.png"
    },
    "sku": null,
    "meta": null,
    "conditionals": {
      "is_active": true,
      "is_free": false,
      "is_tax_exempt": false,
      "is_pay_what_you_want": false,
      "is_quantity_limited": false,
      "is_sold_out": false,
      "has_digital_delivery": false,
      "has_physical_delivery": false,
      "has_images": true,
      "has_video": false,
      "has_rich_embed": false,
      "collects_fullname": false,
      "collects_shipping_address": false,
      "collects_billing_address": false,
      "collects_extrafields": false
    },
    "is": {
      "active": true,
      "free": false,
      "tax_exempt": false,
      "pay_what_you_want": false,
      "quantity_limited": false,
      "sold_out": false
    },
    "has": {
      "digital_delivery": false,
      "physical_delivery": false,
      "images": true,
      "video": false,
      "rich_embed": false
    },
    "collects": {
      "fullname": false,
      "shipping_address": false,
      "billing_address": false,
      "extrafields": false
    },
    "extrafields": [],
    "variants": [],
    "categories": [
      {
        "id": "cat_3zkK6oLvVlXn0Q",
        "slug": "office",
        "name": "Home office"
      }
    ],
    "assets": [
      {
        "id": "ast_7ZAMo1Mp7oNJ4x",
        "url": "https://cdn.chec.io/merchants/18462/images/676785cedc85f69ab27c42c307af5dec30120ab75f03a9889ab29|u9 1.png",
        "is_image": true,
        "data": [],
        "meta": [],
        "created_at": 1594075541,
        "merchant_id": 18462
      }
    ]
  },
]
```

The data object contains all the property endpoints such as the product name, the product description, product price or any uploaded variants or assets. This data is exposed when you make a request to the API. As mentioned above, the open sourced Software Development Kit(SDK) that comes with abstracted axios promise-based function calls that will help to fetch data from the endpoints. The public key access that we briefed over above is a public token key from a merchant store. This account already has products and products information uploaded to the in the backend for us to run a demo store with. 

Now add the empty `<ProductsList/>` component to your render function:

```jsx
render() {
  const { products } = this.state;

  return (
    <div className="app">
      <ProductsList />
    </div>
  );
}
```

Destructure `products` from state to make it a little cleaner. You'll need to pass the `products` property as an argument to your `ProductsList` component. This means that the value of the `ProductsList` component's prop `products` will be resolved from the parent (`App`) component's state, and will update automatically whenever it changes.

## Start to style your components

Before we go any further, let's start to port in some styles so we can start to make our UI look slick! We will be using SCSS, a CSS style compiler to style our application. Please note that we will not be going into styling details but will only go over the high-level of porting in the styles. First install `node-sass` by adding it as a dependency in the left sidebar or alternatively in a local environment by running the command below.

```bash
yarn add node-sass
# OR
npm install node-sass
```

Next, let's go ahead and create a `styles` folder with a `scss` folder inside. Inside of the `scss` folder, create two other folders named `components` and `global`. Lastly, still in the `scss` folder, create a file and name it `styles.scss`. This file is where we will import in all our components and global styles. Your styles structure should look like the below tree.

- src/
  - styles/
    - components/
    - global/
    - styles.scss

In the components folder, create a file named `_products.scss` and copy in the below code.

```css
/* _products.scss */

.products {
    display: block;
    margin: 3rem;

    @include md {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin: 10rem;
    }

    .product {

        &__card {
            width: 55%;
            margin: auto;
            margin-top: 0;
            margin-bottom: 0;
            padding-bottom: 2rem;
        }

        &__image {
            border: 2px solid $text-primary;
            width: 90%;
        }
    
        &__name {
            color: $text-primary;
            padding-top: 1rem;
            padding-bottom: 0.25rem;
        }
    
        &__details {
            display: flex;
            justify-content: space-between;
            margin-top: 0.75rem;
        }
    
        &__price {
            align-self: center;
            margin: 0;
            color: $text-grey;
        }
    
    
        &__details {
            display: flex;
            justify-content: space-between;
        }
    
        &__btn {
            background: $color-accent;
            color: white;
            font-size: 0.75rem;
            text-transform: uppercase;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease-in-out;
            margin-top: 1rem;
            border: none;
    
            &:hover {
                background-color: lighten(#EF4E42, 5);
            }

            @include sm {
                margin-top: 0;
            }
        }
    }
}
```

Now in the global folder, create `_base.scss`, `_body.scss` and `_mixins.scss` and copy in the respective code below.

```css
/* _base.scss */

// Font styles
$font-primary: 'Amiko', sans-serif;
$font-secondary: 'Adamina', serif;

// Colors
$bg-color: #E8E2D7;

$text-primary: #292B83;
$text-grey: rgb(67, 67, 67);

$color-accent: #EF4E42;

// Media query sizes
$sm-width: 576px;
$md-width: 768px;
$lg-width: 992px;
$xl-width: 1200px;
```

```css
/* _body.scss */

body {
  font-family: $font-primary;
  background-color: $bg-color;
}
```

```css
/* _mixins.scss */

@mixin small-xs {
  @media (max-width: #{$sm-width}) {
    @content;
  }
}

@mixin sm {
  @media (min-width: #{$sm-width}) {
    @content;
  }
}

@mixin md {
  @media (min-width: #{$md-width}) {
    @content;
  }
}

@mixin lg {
  @media (min-width: #{$lg-width}) {
    @content;
  }
}

@mixin xl {
  @media (min-width: #{$xl-width}) {
    @content;
  }
}

@mixin md-max {
  @media (max-width: #{$lg-width}) {
    @content;
  }
}
```

Lastly as mentioned, you'll need to now import those created files in the style index `styles.scss`.

```scss
@import "global/base";
@import "global/body";
@import "global/mixins";
@import "components/product";
```

Now that all the styles are written and imported, you should start to see the styles pull through when you render your components later.

## Create our product item component

The nature of React and most modern JavaScript frameworks is to separate your code into components. Components are a way to encapsulate a group of
elements for reuse throughout your application. You'll be creating two components for products, one
will be for the single product item and another for the list of product items.

Start by creating a class component and name it `ProductItem.js` in `src/components`. This component will render the
individual product card. In your render function destructure `product` from your props. You will reference this
property to access each product's image, name, description, and price via `.media.source`, `.name`, `.description` and
`.price` in the return statement.

Product descriptions return HTML. To strip HTML from the product description string, using [this `string-strip-html`](https://codsen.com/os/string-strip-html/) handy library will do the trick. Install this library by running `yarn add string-strip-html` or `npm i string-strip-html`. After installing, import the module in and pass in the product description to the `stripHtml` function.

```jsx
import React, { Component } from "react";
import stripHtml from 'string-strip-html';

class ProductItem extends Component {
  render() {
    const { product } = this.props
    const { result } = stripHtml(product.description);

    return (
      <div className="product__card">
        <img className="product__image" src={product.media.source} alt={product.name} />
        <div className="product__info">
          <h4 className="product__name">{product.name}</h4>
          <p className="product__description">
            {/* product description stripped of html tags */}
            {result}
          </p>
          <div className="product__details">
            <p className="product__price">
            {product.price.formatted_with_symbol}
            </p>
          </div>
        </div>
      </div>
    );
  }
};
export default ProductItem;
```

As you saw earlier in the abbreviated JSON, the returned product data object comes with all the information that you
need to build a product listing view. In the code snippet above, your `product` prop is being used to access the various
properties. First, render an image tag with the `src` value of `product.media.source` as the values inside the curly
braces dynamically binds to the attributes.

## Create our products list component

It's now time to create a `ProductsList.js` component inside `src/components`. The `ProductsList` component will be another
class component which will loop through and render a list of `ProductItem` components.

First, import in the `ProductItem` component. Next, define a `products` prop. This will be provided by the parent component.
In your return statement you need to use the `map` function
to render a `ProductItem` component for each product in your `products` prop. You also
need to pass in a unique identifier (`product.id`) as the `key` attribute - React will use it to determine which
items in a list have changed and which parts of your application need to be re-rendered.

```js
import React, { Component } from 'react';
import ProductItem from './ProductItem';

class ProductsList extends Component {
  render() {
    const { products } = this.props;

    return (
      <div className="products">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    );
  }
}

export default ProductsList;
```

This component will be a bit bare-boned for now except for looping through a `ProductItem` component.

With both your product item and list components created, go back to `App.js` to render the
`<ProductsList />` and pass in the `products` prop with the returned product data as the value.

```js
import React, { Component } from 'react';
import { commerce } from './lib/commerce';
import ProductsList from './components/ProductsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    this.fetchProducts();
  };

  /**
   * Fetch products data and stores in the products data object.
   */
  fetchProducts() {
    commerce.products.list().then((products) => {
      this.setState({ products: products.data });
    }).catch((error) => {
      console.log('There was an error fetching the products', error);
    });
  }

  render() {
    const { products } = this.state;

    return (
      <div className="app">
        <ProductsList
          products={products}
        />
      </div>
    );
  }
};

export default App;
```

## Conclusion

Awesome, there you have it! You have just created a e-commerce React application listing products on from an API backend! The next steps would be to add cart and checkout functionality to your application. Stay tuned for follow up workshops!

### Author

Made with ❤️ by Jaeriah Tay
