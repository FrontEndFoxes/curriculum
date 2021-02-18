# 🎧 5: Build a Spotify Music Player with the Composition API (beta!)

| **Project Goal**            | Build a Spotify music player                                                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What you’ll learn**       | Build an app with the Composition API                                                                                                                     |
| **Tools you’ll need**       | A modern browser like Chrome (note: do not use Safari for this workshop; it will not work). A free [Spotify account](https://www.spotify.com/us/signup/). |
| **Time needed to complete** | 1.5 to 3+ hours (don't stress)                                                                                                                            |

# Instructions

## Read over these instructions

Get an idea of where we're headed!

## Get started as a Spotify Developer

Read over the Web Playback SDK Quick Start guide and obtain an **Access Token**:

[Spotify Web Playback SDK Quick Start](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/)

::: tip 💡
Your access token expires after **one hour**, so you will need to re-request a token every hour! If your app suddenly stops working, try refreshing your token first.
:::

## Pick and commit to your feature requirements for a minimum viable product (MVP)

Ideas include:

-   [ ] Ability to play song
-   [ ] Ability to pause song
-   [ ] Ability to seek previous track
-   [ ] Ability to seek next track
-   [ ] See the name of a song
-   [ ] Disable buttons if player is offline
-   [ ] Alert the user if the player is offline
-   [ ] Make the UI fully accessible

## Open the Codesandbox template

[DJ Vixen Spotify Player starter kit](https://codesandbox.io/s/dj-vixen-cm00g)

## Augment basic UI

In this Code Sandbox, you're provided with a basic UI that isn't quite done. Some people prefer to start with the UI layer and hook up the data after. Others prefer to fix the UI after the behind-the-scenes is done. The choice is yours! Here, we suggest starting with the UI so you can test for functionality as you go.

::: tip 💡
Be sure to "time box" this step - it is tempting to spend a long time perfecting the styling, but try to limit yourself to 15 minutes if you can. You can always come back later!
:::

![base app](./images/mini6_1.png)

## Create the data layer

This is the hard part, fam!

-   First, read the **Web Playback SDK Quick Start** and **SDK Reference** if you haven't already. These can be found at the bottom of this page in the **Resources** section. (Don't worry, they are pretty short!)

::: tip 💡
In order for the player to play music, you'll need to open "real" Spotify (in an app or web browser, doesn't matter) and **change the device to DJ Vixen** once you've successfully connected the player.
:::

-   Work together to fill in the missing functions!

## Add UI finishing touches!

## Challenge

Just kidding. Pat yourself on the back; this was a challenging enough day! 🏆

Okay, **still looking for more?** Try moving from the Web Playback SDK to the 🥁 full-fledged [Spotify Web API](https://developer.spotify.com/documentation/web-api/). Looking for side project or code sample ideas? This is a great API to use!

## Resources

**Slides**

-   [Deck from Vue.js London 2019](https://docs.google.com/presentation/d/15aACMcHrUJWn1jpauRY3Jf6KDL2KrDWsoRAu-xqNeBg/edit?usp=sharing)

**Vue Vixens**

-   [Vue Vixens Code of Conduct](https://github.com/frontendfoxes/curriculum/blob/main/workshop/CODE_OF_CONDUCT.md)

**Spotify**

-   [Web Playback SDK Quick Start](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/)
-   [Web Playback SDK Reference](https://developer.spotify.com/documentation/web-playback-sdk/reference/)

**Vue Composition API**

-   [RFC](https://vue-composition-api-rfc.netlify.com/)
-   [API Reference](https://vue-composition-api-rfc.netlify.com/api.html)

## Author

Made with ❤️ by Kristin Ruben
