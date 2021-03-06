FROM node:9.11.1-alpine as builder
LABEL maintainer "Gary Lau <gary@mailtime.com>"

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh make gcc g++ python

COPY package.json package-lock.json /tmp/

RUN npm cache clean --force

# Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN cd /tmp && npm install && mkdir /app && cp -R /tmp/node_modules /app/

WORKDIR /app

COPY . .

ARG API_SCHEME
ARG API_ENDPOINT
ARG VUE_APP_TRUST_WALLET_DAPP_URL
ARG VUE_APP_METAMASK_DAPP_URL
ARG VUE_APP_IMTOKEN_DAPP_URL
# Build the vue app in production mode
RUN API_SCHEME=${API_SCHEME} API_ENDPOINT=${API_ENDPOINT} VUE_APP_TRUST_WALLET_DAPP_URL=${VUE_APP_TRUST_WALLET_DAPP_URL} VUE_APP_METAMASK_DAPP_URL=${VUE_APP_METAMASK_DAPP_URL} VUE_APP_IMTOKEN_DAPP_URL=${VUE_APP_IMTOKEN_DAPP_URL} npm run build

FROM nginx:stable-alpine

# Copy nginx conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html
