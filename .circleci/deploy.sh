if [[ -z "${API_SCHEME}" ]]; then
  unset API_SCHEME
fi

if [[ -z "${API_ENDPOINT}" ]]; then
  unset API_ENDPOINT
fi

if [[ -z "${VUE_APP_TRUST_WALLET_DAPP_URL}" ]]; then
  unset VUE_APP_TRUST_WALLET_DAPP_URL
fi

if [[ -z "${VUE_APP_METAMASK_DAPP_URL}" ]]; then
  unset VUE_APP_METAMASK_DAPP_URL
fi

if [[ -z "${VUE_APP_IMTOKEN_DAPP_URL}" ]]; then
  unset VUE_APP_IMTOKEN_DAPP_URL
fi

npm run build-docker
npm run run-docker