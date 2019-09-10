# MDT Wallet Web App

> Measurable Data Token Wallet is a VueJS app for earning MDT, transfering MDT and redeeming rewards. It can be integrated into mobile app or used as a web application.

## Localhost Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e
```

You might also need to set `.env*`. For a detailed explanation on how things work, check out the [guide](https://cli.vuejs.org).

## Development Guideline
- If your changes might affect e2e testing scenarios, please run `npm run test:e2e` in local to make sure it works before creating PR

## Docker setup

``` bash
# build docker images
npm run build-docker

# run docker containers
npm run run-docker

# cleanup
npm run clean-docker
```
Note that only `.env` is read for this setup.