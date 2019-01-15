# What the heck is this?
I'm looking for someone to help me with this basic app boilerplate code so I can get this app production ready & app store compatible.

## Current state
This repository contains a simple boilerplate for a react/express.js shopify app, which runs both on desktop and inside the official shopify POS app (by using react router and express routes). I already set up the routing and everything works as expected in dev mode. The code is almost completely taken from here: https://github.com/Shopify/shopify-node-app

## Your Quest
I need someone to make this boilerplate production ready including an integration for the official shopify billing API (recurring billing): https://help.shopify.com/en/api/reference/billing . It would be cool to use a mongoDB for storing the auth tokens, stores and subscription active status. If you have any ideas for improving the routing (especially regarding lower loading times) please let me know.


## Setup
1. Clone the repository
2. Setup a new app in your dev account
3. Create a .env file from the .env.example file with your own credentials
4. Change your app settings similar to these (images can be found in ./reame-imgs too):

![](./readme-imgs/adminlink.jpeg?raw=true "Admin Link Settings")
![](./readme-imgs/config.jpeg?raw=true "App Configuration")
![](./readme-imgs/poslink.jpeg?raw=true "Pos Link Settings")
![](./readme-imgs/posmenu.jpeg?raw=true "Pos Menu Settings")

5. run **npm start** in terminal 🚀🎉
