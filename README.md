# vue-form-test

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Custom usage

### deploy
need [Firebase CLI](https://firebase.google.com/docs/cli/) and overwritten api key.
```
yarn deploy
```

### live demo
https://vue-form-test.web.app/

## What
フロントエンドに [Vue CLI](https://cli.vuejs.org/)、バックエンドに Firebase を使ったお問い合わせフォームです。  
UI フレームワークに [Vuetify](https://vuetifyjs.com/) を使用しています。

PC / Android の Chrome のみ、「お問い合わせ内容」を音声入力できます。
現段階の Web Standard においては experimental technology という立ち位置の SpeechRecognition API を使用しています。   
https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

入力内容のメール受信に Node.js モジュールの [Nodemailer](https://nodemailer.com/) を使っています。Node.js による処理は Firebase Functions を使用しています。

デプロイには Firebase Hosting を使用しています。
