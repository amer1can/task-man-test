<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

REST full API Application. Тестовое Задание.

Суть задачи: создать API system для простого персонального менеджера задач.

Система должна:

1) Вывести список всех задач (GET метод)
2) Вывести список всех тегов (GET метод)
3) Получить один тег по ID и все его задачи (GET метод)
4) Получить одну задачу по ID и все ее теги (GET метод)
5) Возможность добавить новую задачу (POST метод)
6) Возможность добавить новый тег (POST метод)

Обязательные поля для задачи:
- name
- description
- date of creation

Обязательные поля для тега
- name
- date of creation

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
