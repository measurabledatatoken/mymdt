# MDT Wallet Web App

> Measurable Data Token Wallet is a VueJS app for earning MDT, transfering MDT and redeeming items. It is integrated into mobile app or being used as a web application.

## Prerequisite
1. npm@^6.1.0

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

For a detailed explanation on how things work, check out the [guide](https://cli.vuejs.org).

## Development Guideline
- If your changes might affect e2e testing scenarios, please run `npm run test:e2e` in local to make sure it works before creating PR

## Contribution Guideline (Draft)
Refer to Vue readme in https://bitbucket.org/mailtimeapp/devwelcomekit/commits/73d55f350a3a19c76671d73558014621e2edc066

## Docker Setup

1. Install the latest docker community version
2. Git clone this repository
3. Setup Letsencrypt SSL certificate for production

## Docker Development Environment

``` bash
# build docker images
npm run build-docker

# run docker containers
npm run run-docker

# cleanup
npm run clean-docker
```

## Docker alpha Environment

``` bash
# build docker images
npm run build-docker alpha

# run docker containers
npm run run-docker alpha

# cleanup
npm run clean-docker alpha
```

## View Logs

``` bash
# view docker compose logs
npm run logs-docker 

# view app logs
docker logs [container ID]
```
