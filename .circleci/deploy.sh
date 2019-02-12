git fetch --all
git checkout --force $CIRCLE_SHA1
cd docker && npm install && cd .. 
npm run build-docker ${CIRCLE_BRANCH}
npm run run-docker ${CIRCLE_BRANCH}