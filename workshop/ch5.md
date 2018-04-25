# 📋 Chapter 5: Complete the Adoption Experience with a Form

| **Project&nbsp;Goal** | Build a form to accept dummy checkout data                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What&nbsp;you’ll&nbsp;learn**       | How to create and validate forms inVue application                                                                                             |
| **Tools&nbsp;you’ll&nbsp;need**       | A modern browser like Chrome. If using Chrome, download Chrome DevTools for Vue.js. An account in CodeSandbox.io. If you get lost, import the starting point for this chapter [here](https://github.com/VueVixens/projects/tree/master/chapter-4-end). Instructions on how to do this are in [Appendix 1](appendix_1.md) |
| **Time needed to complete** | 1 hour                                                                                                                                                                                     
## Instructions

1. Start [here](https://github.com/VueVixens/projects/tree/master/chapter-4-end)

2. Now we want to create a form to fill after you finish selecting dogs. First of all, we should create a new component to contain this form and add a form route to our router settings. Go to the `views` page and create there a new file called `Form.vue`
3. Inside this file place a `<template></template>` tag and create a div inside it. Add text `Form works!` inside this div. Now our component should look like this:

```
<template>
	<div>
	Form works!
	</div>
</template>
```

Now let's create a route for this component. Go to the `main.js` and import `Form` component:

```
import Form from "./views/Form";
```

Add one more option to the `routes` array:

```
{ path: "/form", component: Form }
```

Let's check how our form works. Go to the `/form` route: you should see the text 'Form works' between our header and footer.

Let's add a class to our `div` and create a styling for it.

```
<div class="form-wrapper">
	Form works!
</div>
```

Add a `<style scoped><style>` tag below the template. Inside this tag we will add some stylings for our form and the first one will be `form-wrapper` padding:
	
```
<style scoped>
	.form-wrapper {
		padding: 40px;
	}
</style>
```

Now it's time to build our actual form. We will use Vuetify component called `v-form` for it (please check the [docs](https://vuetifyjs.com/en/components/forms)). As a first step we will add an empty `v-form` inside our `form-wrapper`

```
<template>
	<div class="form-wrapper">
	<v-form>
	      
	</v-form>
	</div>
</template>
```

Of course, nothing is displayed right now, because we have to add some form fields.

For the form inputs Vuetify uses the component called `v-text-field`. It has an attribute `label` where we can set a label for a certain field. Let's create three fields with labels "Name", "Email" and "Phone".

```
<div class="form-wrapper">
	<v-form>
	    <v-text-field label="Name"></v-text-field>
	    <v-text-field label="Email"></v-text-field>
	    <v-text-field label="Phone"></v-text-field>
	</v-form>
</div>
```

And of course we need to submit our form somehow. Let's add a submit button below the form fields

```
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
	
```
.form-wrapper {
	padding: 40px;
	text-align: center;
}
```

For now `Submit` button doesn't do anything but we will add a method which will take all form fields values and print them to the console. To achieve this we have to create a property for each field in component `data` and bind this properties to corresponding fields with `v-model` directive.
	
>v-model directive creates two-way data bindings on form input and textarea elements. It automatically picks the correct way to update the element based on the input type.
	
What does `two-way binding` mean? We can change binded data either from the input field or inside the component's `data` (and both binded data will be changed as a result).
	
Let's add a `<script></script>` above the styles, add `export default` statement into it and create component `data` (remember, `data` should be a function returning an object:
	
```
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
	
```
data() {
	return {
	    name: "",
	    email: "",
	    phone: ""
	};
	}
```
As you can see, all of them are empty strings.

Bind these properties to corresponding form inputs in the template:

```
<v-form>
	<v-text-field label="Name" v-model="name"></v-text-field>
	<v-text-field label="Email" v-model="email"></v-text-field>
	<v-text-field label="Phone" v-model="phone"></v-text-field>
	<v-btn>Submit</v-btn>
</v-form>
```

Now try to change `name` property to your own name. Observe how the input has changed! When you're typing something in the input field, the corresponding data property will be changed too. That's how two-way data binding works.

Now we can simply print our form values to console on submission. Let's create a method for this (we will add `methods` right after `data`:

```
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
	
```
<v-btn @click="submit">Submit</v-btn>
```

Try to fill the form and click `Submit`. You can see the form data in your console.

Console logs are great but that's definitely not the thing you want to see in your final application version. Instead of printing values to console let's show them on the screen once form is submitted. Of course, first we need some kind of an indicator to check if the form is already submitted or not. Let's create a new property in `data` called `submitted` and set it to `false` (because when our component is created form shouldn't be submitted):

```
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

```
methods: {
	submit() {
	      this.submitted = true;
	}
	}
```

Finally, we have to create a div which will replace our form. Add this code above the `<v-form>` tag:

```
<div class="text-xs-center">
    <h2>Thank you for you order, we will contact you soon</h2>
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
	
```
.details {
	padding-top: 30px;
}
h3 {
	padding-bottom: 20px;
}
```

Now we can see both the div with our form data and the form itself. Let's display them conditionally. We will show the div with data when `submitted` is `true`; otherwise we will display the form. So we're adding the `v-if="submitted"` to the wrapper div of form data and `v-else` to the `v-form`:

```
<div class="text-xs-center" v-if="submitted">
	...
</div>
<v-form v-else>
	...
</v-form>
```
Now the form is hiding after sumbission and we can see submitted user data.

The form still need a proper validation, but it's working! Let's add a button to `Cart` component leading to the form after we have selected the dogs. Go to the `Cart.vue` and add the following code right after the `</v-list-tile>` closing tag.

```
<v-btn to="/form">Order</v-btn>
```

Our button is aligned to the left side. To fix this, we will add class `text-xs-center` to the `<div v-else>`:
	
```
<div v-else class="text-xs-center">
    <v-subheader>Your cart</v-subheader>
	...
    <v-btn to="/form">Order</v-btn>
</div>
```

Great! Now we can easily navigate to our form but it still need some kind of a validation. Right now we can fill the email field with any string and we can send letters as a phone number. Also, we can submit even an empty form!
	
To change the form validity we have to create a new `data` property called `valid` and bind it to the form via `v-model`
	
```
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
	
```
<v-form v-else v-model="valid">
```
	
Let's also disable our `Submit` button when form is not valid.
	
```
<v-btn @click="submit" :disabled="!valid">Submit</v-btn>
```

Now we can start to create our validation rules.
	
>All input components in the `v-form` have a `rules` prop which takes an array of functions. Whenever the value of an input is changed, each function in the array will receive the new value. If a function returns false or a string, validation has failed.

First we will try to deny empty values for the `name` field. Let's create a `nameRules` property in our `data`:

```
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

and add our first rule. Remember, validation rules are functions which receive the value of the field and return the boolean value: `true` will mean this field has valid value and `false` mean it doesn't. So, our first rule will be
	
```
nameRules: [
    name => !!name
]
```

What is happening here? `!name` will return `true` if the name is empty and `false` if it has non-empty value. Then we perform the second negation, reverting value one more time. The double negation is a pretty common method to check if string is non-empty.
	
Don't forget to add `nameRules` to the `rules` prop of the `name` field and make this fiels `required` (it will add a nice little asterisk to field label):

```
<v-text-field
	label="Name"
	required
	:rules="nameRules"
	v-model="name"></v-text-field>
```
Now try to select `Name` field and then select other one. You can see the red color and text `false` below the field (and the `Submit` button is disables as well).

Error text could be simply provided via `||` operator in the rule. So the value of error is `false OR <error message>`. Let's provide some meaningful error for the name field:

```
nameRules: [
    name => !!name || "Name is required"
]
```

Now error message looks better!

Let's add one more rule: name could not be shorter than 2 letters:

```
nameRules: [
    name => !!name || "Name is required",
    name => name.length > 2 || "Name must be longer than 2 characters"
]
```

Try to fill the name field with 1 character and check the error.

Now we're switching to the email field. First we will create an `emailRules` property in `data` and add the non-empty check similar to the non-empty name rule:

```
emailRules: [
    email => !!email || "Email is required"
]
```
	
Don't forget to add `rules` property to email field:
	
```
<v-text-field
	label="Email"
	required
	:rules="emailRules"
	v-model="email"></v-text-field>
```

Second rule for email will be a little tricky. We will check if email matched a certain pattern called _regular expression_ or _RegEx_
	
>Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects.
	
You can read this [MDN Article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to check the list of special characters used in regular expressions. For now you can simply copy the regex from the code below:
	
```
emailRules: [
	email => !!email || "Email is required",
	email =>
	    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
	    "E-mail must be valid"
	],
```

Now try to enter any random characters to email field. You can see this new error because now this field demands a `@` character, a dot and at least 2 characters after dot.

Now switch to the `phone` field. Let's create a set of rules very similar to the `name` ones but the length of the value should be more or equal to 7 characters:

```
phoneRules: [
    phone => !!phone || "Phone is required",
    phone => phone.length >= 7 || "Phone number should be at least 7 digits"
]
```
	
But we can still enter the letters and the phone is not formatted at all. To fix this, we can use a really great `v-text-field` property called `mask`. It will apply a custom character mask to the input, allowing only certain types of these characters and formatting the string. We will use the mask `(###) ### - ####` (`#` characters allows any digit; you can check mask legend [here](https://vuetifyjs.com/en/components/text-fields)).
	
```
<v-text-field
    label="Phone"
    required
    :rules="phoneRules"
    mask="(###) ### - ####"
    v-model="phone"></v-text-field>
```

Now you can enter only digits to the phone field and value has a nice format.

The last thing we want to achieve is to clear our cart on submitting the form. Go to the `store/store.js` and create a mutation for this (add this code to the `mutations` object:

```
clearCart(state) {
    state.cart = [];
}
```

Add an action to commit this mutation (and add it to `actions`):
	
```
clearCart({ commit }) {
    commit("clearCart");
}
```

Swich back to the `Form.vue` and let's dispatch this new action in `submit` method:

```
submit() {
    this.$store.dispatch("clearCart");
    this.submitted = true;
}
```

Now the cart is clearing right after the form is submitted.
	
**Congratulations, you've finished the project!**
		
# Final result
![]()
