# 😻 6: Create a Mobile App to Spread Emoji Love (Beginner)

| **Project Goal**            | In this nano you will learn how to create a cute mobile app to display and send emoji to friends.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | You'll scaffold a NativeScript-Vue App in the playground and build a list that you can send via the Social Share plugin.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Tools you’ll need**       | A modern browser like Chrome. A mobile device (iOS or Android). Access to the [NativeScript Playground](http://play.nativescript.org) - consider creating an account in the Playground to keep the versions of your work intact. A mobile phone (iOS or Android) with the NativeScript Playground and Viewer apps installed.<br><br>On Android: [NativeScript Playground](https://play.google.com/store/apps/details?id=org.nativescript.play) and [NativeScript Preview](https://play.google.com/store/apps/details?id=org.nativescript.preview).<br><br>On iOS: [NativeScript Playground](https://itunes.apple.com/us/app/nativescript-playground/id1263543946) and [NativeScript Preview](https://itunes.apple.com/us/app/nativescript-preview/id1264484702) |
| **Time needed to complete** | 10 minutes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

# Create an emoji-sharing mobile app

Let's learn how to build a mobile app with NativeScript-Vue, a custom implementation of Vue.js that you can use to build native mobile apps for iOS or Android. You'll create a list and use the built-in Social Sharing plugin to send emoji to friends.

## Scaffold Your App

Open the [NativeScript Playground](http://play.nativescript.org) and take a look around. On your first visit, before you create an account, you'll see a modal with instructions on how to download the two apps you need to use the playground.

Here is the main editor with a few files provided for an app. By default, the first playground app is created using Angular. Click 'new' at the top and choose the 'NS + Vue.js' template. This is how you scaffold your first NativeScript-Vue app!

When you click the `QR Code` button, a QR code will appear - scan that with the NativeScript Playground app on your phone. This allows your phone to refresh automatically as you code. You'll see your phone refresh and a basic app appear:

![base app](./images/playground1.png)

::: tip 💡
If you ever need to fully refresh your app on your device, you can recreate your QR code and re-scan it using the Playground app.
:::

## Add Some Styles

Let's add some nice styles to your mobile app. NativeScript-Vue comes with several built-in themes and the app is scaffolded to support them with proper class names. You can see a line in the `app.css` file referencing a theme's style sheet. Change it to use a different style sheet:

```css
@import '~nativescript-theme-core/css/orange.css';
```

Play around with other themes like `sky` or `forest` or `ruby`. Get creative!

Change the title in the ActionBar to rename your app:

```xml
<ActionBar title="MyMojis" class="action-bar" />
```

You won't need any of the local styles in the `<style>` block at the bottom of `HelloWorld.vue` so you can delete them.

## Add List Data

We're going to build a list populated with emoji. There's a treasure trove of emoji, sorted into a JSON object and labeled, on this [repo](https://github.com/shanraisshan/EmojiCodeSheet). Dig into the JSON/string folder on that repo to take a look at [emoji associated with people](https://github.com/shanraisshan/EmojiCodeSheet/blob/master/json/string/People.json).

You can borrow some JSON to help build up some data for your app to display. Overwrite the `data` object in `HelloWorld.vue` with emoji. You can use this code, or borrow some other JSON from the repo above:

```JavaScript
data() {
            return {
                people: [{
                        key: "grinning_face",
                        value: "😀"
                    },
                    {
                        key: "grimacing_face",
                        value: "😬"
                    },
                    {
                        key: "grimacing_face_with_smile_eyes",
                        value: "😁"
                    },
                    {
                        key: "face_with_tear_of_joy",
                        value: "😂"
                    },
                    {
                        key: "smiling_face_with_open_mouth",
                        value: "😃"
                    },
                    {
                        key: "smiling_face_with_open_mouth_eyes",
                        value: "😄"
                    },
                    {
                        key: "vue_vixen",
                        value: "🦊"
                    },
                ]
            };
        }
```

## Build the ListView

Now, you need a place to display that data. NativeScript-Vue uses NativeScript modules to build native elements for your mobile app, so instead of using HTML elements like `<li>` or `<ul>`, we're going to use `<ListView>`. Delete all the markup under the `<ActionBar>` and before the closing `</Page>` tag.

Then, add:

```XML
<ListView class="list-group" for="person in people" style="height:1250px">
    <v-template>
        <FlexboxLayout flexDirection="row" class="list-group-item"
            >
                <Label :text="person.value" />
                <Label :text="person.key" />
        </FlexboxLayout>
    </v-template>
</ListView>
```

Now, when you app refreshes, you can see a list of emoji with their label. Add more emoji to your list and tweak the label, if you like, to make it more descriptive.

## Make the List Interactive

This list needs to do more than just sit there. Let's make it interactive by adding the ability to tap it and send an emoji.

First, you need to implement the Social Share plugin to access your device's social apps like Twitter and WhatsApp.

Under `<script>`, add this line:

```JavaScript
import * as SocialShare from "nativescript-social-share";
```

The Social Share plugin is built into the Playground apps, so you don't have to do anything more to access it from within your app.

Next, add a `methods` block under `export default {`:

```JavaScript
methods: {
    share: function(person) {
        SocialShare.shareText(person.value + "I just created an amazing mobile app with a Vue Vixens Nano! Check us out @VueVixens!");
    }
},
```

You now have a method available for the user to use the Social Share plugin.

Finally, add a `@tap` event to your FlexBoxLayout, so that it looks like this:

```XML
<FlexboxLayout flexDirection="row" class="list-group-item" @tap="share(person)">
```

Now, when you save your app and tap on an element in the list, you are given a list of social apps (depending on what is installed on your device) with which to send the emoji you just tapped!

Go ahead, send a Tweet with your new app!

## Final Result

Your entire app's code (all in `HelloWorld.vue`) looks like this:

```XML
<template>
    <Page class="page">
        <ActionBar title="MyMojis" class="action-bar" />
        <ListView class="list-group" for="person in people" style="height:1250px">
            <v-template>
                <FlexboxLayout flexDirection="row" class="list-group-item"
                    @tap="share(person)">
                    <Label :text="person.value" />
                    <Label :text="person.key" />
                </FlexboxLayout>
            </v-template>
        </ListView>
    </Page>
</template>

<script>
    import * as SocialShare from "nativescript-social-share";
    export default {
        methods: {
            share: function(person) {
                SocialShare.shareText(person.value + "I just created an amazing mobile app with a Vue Vixens Nano! Check us out @VueVixens! #EveryDayWeSkulking");
            }
        },

        data() {
            return {
                people: [{
                        key: "grinning_face",
                        value: "😀"
                    },
                    {
                        key: "grimacing_face",
                        value: "😬"
                    },
                    {
                        key: "grimacing_face_with_smile_eyes",
                        value: "😁"
                    },
                    {
                        key: "face_with_tear_of_joy",
                        value: "😂"
                    },
                    {
                        key: "smiling_face_with_open_mouth",
                        value: "😃"
                    },
                    {
                        key: "smiling_face_with_open_mouth_eyes",
                        value: "😄"
                    },
                    {
                        key: "vue_vixen",
                        value: "🦊"
                    }
                ]
            };
        }
    };
</script>

```

![final app](./images/mymoji_app.png)

## Conclusion and Challenge

Now that you know how to build a native mobile app with NativeScript-Vue, you can customize it however you like.

🎨 Change the styles and tweak the list so that it has more interesting labels next to the emoji.

😍 Add more emoji!

❤️ And make sure to share your work socially using the Social Share capability you implemented. Have fun!

## Badge

Congratulations! You have earned a badge!

![MyMoji](./images/mymoji-mobile-app-badge.png)

## Author

Made with ❤️ by Jen Looper
