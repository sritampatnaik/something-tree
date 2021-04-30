<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>


## Introduction

This repository contains the actual app that requries login i.e the dashboard.

### Built with 
- [Vue 3](https://v3.vuejs.org/)
- [Tailwind](https://github.com/tailwindlabs/tailwindcss) 
- [Tailwind UI](https://tailwindui.com/) + [Headless UI](https://headlessui.dev/)
- [Stripe](http://stripe.com/) for payments
- [Firebase](https://firebase.google.com/) for backend

### Pages
#### Logged Out
- `/login` -> *Login*

#### Logged In
- `/` -> *Dashboard*
- `/free` -> *Sample Free URL*
- `/paid` -> *Sample Paid URL*

### Features
- Authentication (Google and Email+Password)
- User Impersonation (With user impersonations you can login as another user and resolve an issue or troubleshoot a bug.)
- Subscription Plans (https://firebase.google.com/products/extensions/firestore-stripe-subscriptions)
- Stripe +Firebase Code (https://github.com/stripe-samples/firebase-subscription-payments)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).