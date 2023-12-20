#Todolist

Клиентская часть - сделана на vue.js  + typescript, сборка через webpack.

Бэкенд - node.js + typescript. Добавлен логгер в слой middleware, который пишет в консоль каждый запрос в виде объекта  { rawHeaders, method, url }.

БД - PostgreSQL.

Запуск сервисов через Docker, запуск проекта в dev режиме - ```docker compose up -d```
