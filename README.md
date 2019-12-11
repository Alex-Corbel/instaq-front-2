<h1 align="center">Welcome to InstaQ Front 👋</h1>

> This project is inspired by instagram with explicit content.

> This project was created for a school project. The initial project : https://gitlab.com/instaq-epsi/instaq-front

### 🏠 [Homepage](https://front.k8s.d0do.fr)
### ✨ [Demo](https://front.k8s.d0do.fr)

## Install

```sh
git clone git@github.com:Shyndard/instaq-front.git
cd instaq-front
npm install
```

## Usage

```sh
npm run serve
```

## Run tests

```sh
vue-cli-service test:e2e
vue-cli-service test:unit --passWithNoTests
```

## Author

👤 **Shyndard**

* Github: [@ked57](https://github.com/Ked57)
* Github: [@Shyndard](https://github.com/Shyndard)
* Github: [@lperdereau](https://github.com/lperdereau)
* Github: [@alex-Corbel](https://github.com/Alex-Corbel)

## How it works ?

<img alt="Architecture" src="http://img.shyndard.eu/3v2COdR.png" />

This project is the "Front - VueJS" component on the previous image.
<br/>
It's in relation with keycloak as IAM. You need to create a Keycloak ream and replace credentials in keycloak.json
<br/>
The API is created with hasura which provided an GraphQL API directly by scanning a PostgreSQL database.
<br/>
A stich of hasura as been created in typescript (NodeJs) which call google vision API to check image level content and upload it on S3 web storage then stored in postgre via hasura.
<br>
Front permanently request keycloak to renew token when it is necessary.

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_