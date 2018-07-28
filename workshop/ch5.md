# 📋 Chapter 5: Complete the Adoption Experience with a Form

| **Project&nbsp;Goal** | Build a form to accept dummy 'checkout' data                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What&nbsp;you’ll&nbsp;learn**       | How to create and validate forms in a Vue application                                                                                             |
| **Tools&nbsp;you’ll&nbsp;need**       | A modern browser like Chrome. If using Chrome, download Chrome DevTools for Vue.js. An account in CodeSandbox.io. If you get lost, import the starting point for this chapter [here](https://github.com/VueVixens/projects/tree/master/chapter-4-end). Instructions on how to do this are in [Appendix 1](appendix_1.md) |
| **Time needed to complete** | 1 hour

## Instructions

If you need to restart your project, clone [this repo](https://github.com/VueVixens/projects/tree/master/chapter-4-end) into Code Sandbox after logging in.

In this chapter, we will create a form to fill after you finish selecting dogs. First of all, we should create a new component to contain this form and add a form route to our router settings.

## Scaffold the Form Component

Go to the `views` folder and create a new file called `Form.vue`.

Inside this file place a `<template></template>` tag and create a div inside it. Add text `This form works!` inside this div. Now our component should look like this:

```html
<template>
	<div>
		This form works!
	</div>
</template>
```

Now let's create a route for this component. Go to `main.js` and import the `Form` component:

```js
import Form from "./views/Form";
```

Add one more option to the `routes` array:

```js
{ path: "/form", component: Form }
```

Let's check how our form works. Go to the `/form` route by appending `/form` to the shop's url. You should see the text 'This form works' between our header and footer.

Let's add a class to our `div` and create a styling for it.

```html
<div class="form-wrapper">
	This form works!
</div>
```

Add a `<style scoped></style>` tag below the template. Inside this tag we will add some stylings for our form and the first one will be `form-wrapper` padding:

```css
<style scoped>
	.form-wrapper {
		padding: 40px;
	}
</style>
```

## Build the Form

Now it's time to build our actual form. We will use a Vuetify component called `v-form` to make it look nice.

::: tip 💡
To learn more about Vuetify-styled forms, check its [docs](https://vuetifyjs.com/en/components/forms).
:::

As a first step we will add an empty `v-form` inside our `form-wrapper`

```html
<template>
	<div class="form-wrapper">
	<v-form>

	</v-form>
	</div>
</template>
```

Of course, nothing is displayed right now, because we have to add some form fields.

For the form inputs Vuetify uses the component called `v-text-field`. It has an attribute `label` where we can set a label for a certain field. Let's create three fields with labels "Name", "Email" and "Phone" inside the `<template>`.

```html
<div class="form-wrapper">
	<v-form>
	    <v-text-field label="Name"></v-text-field>
	    <v-text-field label="Email"></v-text-field>
	    <v-text-field label="Phone"></v-text-field>
	</v-form>
</div>
```

It's already looking better!

## Add a Submit Button

Of course we need to submit our form somehow. Let's add a submit button below the form fields

```html
<div class="form-wrapper">
	<v-form>
	    <v-text-field label="Name"></v-text-field>
	    <v-text-field label="Email"></v-text-field>
	    <v-text-field label="Phone"></v-text-field>
	    <v-btn>Submit</v-btn>
	</v-form>
</div>
```

Our button is aligned to the left side, so let's also add a `text-align: center` to `form-wrapper` styles

```css
.form-wrapper {
	padding: 40px;
	text-align: center;
}
```

For now, the `Submit` button doesn't do anything. We will add a method which will take all the form fields' values and print them to the console. To achieve this we have to create a property for each field in the component `data` and bind this properties to corresponding fields with a `v-model` directive.

::: tip 💡
The `v-model` directive creates two-way data bindings on form input and textarea elements. It automatically picks the correct way to update the element based on the input type.
:::

## Bind Some Data

::: tip 💡
What does `two-way binding` mean? It means that we can change binded data either from the input field or inside the component's `data` (and both binded data will be changed as a result).
:::

Let's add a `<script></script>` block above the styles, add `export default` statement into it and create component `data` (remember, `data` should be a function returning an object:

```js
<script>
	export default {
	  data() {
	    return {

	    }
	  }
	}
</script>
```

Now let's add three new properties to this newly created object:

```js
data() {
	return {
	    name: "",
	    email: "",
	    phone: ""
	};
	}
```
As you can see, all of them are empty strings.

Bind these properties to corresponding form inputs in the template by adding `v-model` to the `v-form`'s input fields:

```html
<v-form>
	<v-text-field label="Name" v-model="name"></v-text-field>
	<v-text-field label="Email" v-model="email"></v-text-field>
	<v-text-field label="Phone" v-model="phone"></v-text-field>
	<v-btn>Submit</v-btn>
</v-form>
```

Now try to change the `name` property in the `data` object to your own name, rather than an empty string. Observe how the input has changed! When you're typing something in the input field, the corresponding data property will be changed too. That's how two-way data binding works.

Now we can print our form values to console on submission. Let's create a method for this (we will add `methods` right after `data` (don't forget to add a comma after closing `data`:

```js
methods: {
	submit() {
	    console.log(
	        "Name:",
	        this.name,
	        "Email:",
	        this.email,
	        "Phone:",
	        this.phone
	    );
	}
}
```

and bind it to `Submit` button click:

```html
<v-btn @click="submit">Submit</v-btn>
```

Try to fill the form with some test data and click `Submit`. You can see the form data in your Code Sandbox console.

## Display Submitted Data

Console logs are great but that's definitely not the thing you want to see in your final application version. Instead of printing values to console, let's show them on the screen once the form is submitted. Of course, first we need some kind of an indicator to check if the form is already submitted or not.

Let's create a new property in `data` called `submitted` and set it to `false` (because when our component is created the form shouldn't be submitted):

```js
data() {
	return {
	    name: "",
	    email: "",
	    phone: "",
	    submitted: false
	};
},
```

Now we need to switch `submitted` to `true` on submit event. Let's add this logic to our `submit` method instead of `console.log`:

```js
methods: {
	submit() {
	   this.submitted = true;
	}
}
```

Finally, we have to create a div which will replace our form. Add this code above the `<v-form>` tag:

```html
<div class="text-xs-center">
    <h2>Thank you for you interest, we will contact you soon</h2>
	<div class="details text-xs-left">
	<h3 class="blue-grey--text">Customer details</h3>
	<p><strong>Name:</strong> {{name}}</p>
	<p><strong>Email:</strong> {{email}}</p>
	<p><strong>Phone:</strong> {{phone}}</p>
	</div>
	<v-btn to="/">Go to homepage</v-btn>
</div>
```

and add some styles to our `<style>`:

```css
.details {
	padding-top: 30px;
}
h3 {
	padding-bottom: 20px;
}
```

## Display Data Conditionally

Now we can see both the div with our form data and the form itself. That looks pretty strange.

Let's display them conditionally. We will show the div with data when `submitted` is `true`; otherwise we will display the form.

So we're going to add `v-if="submitted"` to the wrapper div of the form data and `v-else` to the `v-form` itself:

```html
<div class="text-xs-center" v-if="submitted">
  ...
</div>
<v-form v-else>
  ...
</v-form>
```

Now the form hides after sumbission and we can see the submitted user data.

## Add Validation

The form still need proper validation, but it's working! Let's add a button to the `Favorites` component leading to the form after we have selected the dogs. Go to `Favorites.vue` and add the following code right after the `</v-list-tile>` closing tag.

```html
<v-btn to="/form">Adopt</v-btn>
```

Great! Now we can easily navigate to our form but it still needs some kind of a validation. Right now we can fill the email field with any string and we can send letters as a phone number. Also, we can submit even an empty form!

To change the form validity we have to create a new `data` property called `valid` and bind it to the form via `v-model`. In `Form.vue` edit the `data` object:

```js
data() {
	return {
	    name: "",
	    email: "",
	    phone: "",
	    submitted: false,
	    valid: true
	};
},
```

Edit the form to bind the `valid` property:

```html
<v-form v-else v-model="valid">
```

Let's also disable our `Submit` button when form is not valid.

```html
<v-btn @click="submit" :disabled="!valid">Submit</v-btn>
```

Now we can start to create our validation rules.

::: tip 💡
All input components in the `v-form` have a `rules` prop which takes an array of functions. Whenever the value of an input is changed, each function in the array will receive the new value. If a function returns false or a string, validation has failed.
:::

## Validation 1: Name

First we will try to deny empty values for the `name` field. Let's create a `nameRules` property in our `data`:

```js
data() {
	return {
	    name: "",
	    email: "",
	    phone: "",
	    submitted: false,
	    valid: true,
	    nameRules: []
	};
},
```

Now add the first rule. Remember, validation rules are functions which receive the value of the field and return a boolean value; `true` will mean this field has valid value and `false` means it doesn't. So, our first rule will be:

```js
nameRules: [
    name => !!name
]
```

What is happening here? `!name` will return `true` if the name is empty and `false` if it has non-empty value. Then we perform the second negation, reverting value one more time. The double negation is a pretty common method to check if string is non-empty.

Add `nameRules` to the `rules` prop of the `name` field and make this field `required` (it will add a nice little asterisk to the field label):

```html
<v-text-field
	label="Name"
	required
	:rules="nameRules"
	v-model="name"></v-text-field>
```

Now try to select the `Name` field and then select other one. You can see the red color and the text `false` below the field (and the `Submit` button is disabled as well).

Error text can be provided via the `||` operator in the rule. So the value of this error is `false OR <error message>`. Let's provide a more meaningful error for the name field:

```js
nameRules: [
    name => !!name || "Name is required"
]
```

Now the error message looks better!

Let's add one more rule: a name cannot be shorter than 2 letters:

```js
nameRules: [
    name => !!name || "Name is required",
    name => name.length > 2 || "Name must be longer than 2 characters"
]
```

Try to fill the name field with 1 character and check the error.

## Validation 2: Email

Now we're switching to the email field. First we will create an `emailRules` property in `data` and add the non-empty check similar to the non-empty name rule:

```js
emailRules: [
    email => !!email || "Email is required"
]
```

Don't forget to add `required` and the `rules` property to the email field:

```html
<v-text-field
  label="Email"
  required
  :rules="emailRules"
  v-model="email"></v-text-field>
```

The second rule for email will be a little tricky. We will check if email matched a certain pattern called _regular expression_ or _RegEx_

::: tip 💡
Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects.

For a deep dive into RegEx, you can read this [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to check the list of special characters used in regular expressions.
:::

For now, simply copy the regex from the code below:

```js
emailRules: [
  email => !!email || "Email is required",
  email =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
      "Email must be valid"
  ],
```

Now try to enter any random characters to the email field. You can see this new error because now this field demands a `@` character, a dot and at least 2 characters after the dot.

## Validation 3: Phone

Now switch to the `phone` field. Let's create a set of rules very similar to the `name` ones. For the phone number, the length of the value should be more or equal to 7 characters:

```js
phoneRules: [
    phone => !!phone || "Phone is required",
    phone => phone.length >= 7 || "Phone number should be at least 7 digits"
]
```

But as you can guess, you can still enter letters and the phone number is not formatted at all. To fix this, we can use a really great `v-text-field` property called `mask`. It will apply a custom character mask to the input, allowing only certain types of characters, and formatting the string. We will use the mask `(###) ### - ####` (`#` characters allows any digit.

::: tip
Learn more about masks [here](https://vuetifyjs.com/en/components/text-fields).
:::

```html
<v-text-field
    label="Phone"
    required
    :rules="phoneRules"
    mask="(###) ### - ####"
    v-model="phone"></v-text-field>
```

Now you can enter only digits to the phone field and the value has a nice format.

## Clear the Favorites List On Submit

The last thing we want to achieve is to clear our favorites list on submitting the form. Go to the `store/store.js` and create a mutation for this by adding this code to the `mutations` object:

```js
clearFavorites(state) {
    state.favorites = [];
}
```

Add an action to commit this mutation (and add it to `actions`):

```js
clearFavorites({ commit }) {
    commit("clearFavorites");
}
```

Swich back to the `Form.vue` and let's dispatch this new action in `submit` method:

```js
submit() {
    this.$store.dispatch("clearFavorites");
    this.submitted = true;
}
```

Now the favorites list is clearing right after the form is submitted.

**🎊Congratulations, you've finished the web project!🎊**

# Final result
![chapter 5 final](./images/petshop_chapter5.jpg)
