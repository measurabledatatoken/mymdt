# mdtwallet-webapp

> Measurable Data Token Wallet Web Application

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Contribution Guideline (Draft)

* All scss in Vue Component should be scoped
* For child component that do not have acess, should use /deep/ instead of use a global.scss
* All elements in a vuejs component should be ordered in following order

```javascript
  metaInfo() {
  },
  data() {
  },
  computed: {
  },
  components: {
  },
  created() {
  },
  mounted() {
  },
  watch: {
  },
  methods: {
  },
```
* Always fix the warning and errors from eslint
* We are using Material UI library. Try to check out the component in the library first before use other library. https://vuematerial.io/components/input