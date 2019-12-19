# 🏠 3: Setup Visual Studio Code the Right Way for Vue (beginner)

| **Project Goal**            | The goal of this nano is to learn how to properly setup VS Code for Vue development                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | You'll learn how to setup VS Code for development with Vue.                                                            |
| **Tools you’ll need**       | A modern browser like Chrome or Firefox, Access to [Visual Studio Code Editor](https://code.visualstudio.com/download) |
| **Time needed to complete** | 15 minutes                                                                                                             |

# We're going to learn how to setup VScode the right way for Vue

In this activity we are going to walk through how to configure your [VS Code](https://code.visualstudio.com/) workspace for appropiate development with Vue. As a developer working with Vue, it very important to setup your development environment to increase productivity so you can a tool that already does most of the work for you, so you don't need to worry about it.

## Get Started

In order to start developing Vue applications, you must first setup your workspace or code editor for development and this nano is going to highlight how to setup VS Code for Vue.

## Install Vetur

First, you'll need to install the [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) extension from Visual Studio marketplace. This plugin powers a number of features that makes developing with Vue easy. Some of these features include the following:

-   Syntax Highlighting
-   Snippets
-   Emmets
-   Linting / Error checking
-   Formatting
-   IntelliSense

We can install it directly from the marketplace by clicking on the install button.

![vetur image](./images/vetur-image.png)

::: tip 💡
Another way to install this extension is directly from VS Code by clicking on the extension tab and searching for Vetur. Then you can directly install it in VS Code.
:::

![vetur code](./images/vetur-code.png)

## Syntax Highlighting

Vetur supports syntax highlighting for the following languages

![syntax highlight](./images/vue-highlight.png)

## Snippets

Vetur provides VS Code the ability to use snippets within the Components.

`scaffold`

```html
<template>
	...
</template>

<script>
	export default {
	...
	}
</script>

<style>
	...;
</style>
```

`template with HTML`

```html
<template>
	...
</template>
```

`style with SCSS`

```html
<style lang="scss">
	...
</style>
```

## Emmets

Vetur supports emmets for the following languages: html, css, scss, less, and stylus, without the need for configuration.

![Emmets](./images/emmets.gif)

## Linting / Error checking

Vetur provides error checking and linting and can be configured to make use of the eslint plugin.

![Linting](./images/vetur-lint.png)

## Formatting

Vetur has support for formatting of the following languages html, css, scss, less,postcss, stylus, js, ts. with the help of a formatter like Prettier.

Automatic formatting can either be done on the `save` command, or there's an option to format the entire document at the end of your workflow.

![format](./images/format.png)

## IntelliSense

Vetur offers IntelliSense for your .vue files by default.

![IntelliSense](./images/intellisense.png)

## Conclusion

This is a great way of configuring your work environment for development with Vue. With all these tools setup on VS Code, you can rest assured your workflow will be clean and easy.

## Badge

Congratulations! You have earned a badge!

![badge](./images/vs-code.png)

## Author

Made with ❤️ by Gift Egwuenu
