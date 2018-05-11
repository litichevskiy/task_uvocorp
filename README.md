# Тестовое задание

![screenshot](./screenshot.png)

1. Ставим зависимости;
2. Запускаем dev-server (npm start или yarn start).
3. Можем использовать любые библиотеки/фреймворки. В предложенной конфигурации: react, date-fns, less, classnames, normalize.css... (детально в package.json).
4. dev server будет проксировать указанные далее запросы на json файлы, которые можно найти в dist/fixtures/users/. Доступны 2 пользователя (octocat, brendaneich), запрос любого другого пользователя в ответе вернёт статус 404 с response body в формате json.
5. Важно. Протестировано на node.js версий 8.9.1 и 9.10.1
6. Иконки в формате svg можно найти в директории img в корне репозитория.

## Методы api

* GET, [http://localhost:8080/users/octocat](http://localhost:8080/users/octocat) - получить информацию о пользователе octocat.
* GET, [http://localhost:8080/users/octocat/repos](http://localhost:8080/users/octocat/repos) - список публичных репозиториев пользователя octocat.

Ответы от сервера будут в формате json, физически они находятся в директории dist: dist/fixtures/users/octocat.json и dist/fixtures/users/octocat/repos.json

## Интерфейс

1. Форма поиска пользователя по username;
2. Информация о найденном пользователе;
3. Список публичных репозиториев пользователя;
4. Ошибка в случае отсутствия пользователя с таким username.

### Форма поиска

* Начальное состояние:

![search-initial](./search-initial.png)

* Submit формы без заполнения поля "Username":

![search-invalid](./search-invalid.png)

* Пользователь не найден (не обнулять значение input'a, возможно пользователь ошибся всего в одной букве):

![search-not-found](./search-not-found.png)

* Пользователь найден (не обнулять, при этом, при повторной попытке submit'а формы с этим же username - запросы на его детали и репозитории **не отправляются**):

![search-user](./search-user.png)

### Информация о найденном пользователе

![user-info](./user-info.png)

В ответе метода [http://localhost:8080/users/octocat](http://localhost:8080/users/octocat) нас интересуют следующие свойства:

* **avatar_url** (string) - картинка (она будет запрошена с сервера github)
* **name** (string) - имя (Brendan Eich)
* **html_url** (string) - ссылка на github (Github)
* **blog** (string) - ссылка на блог (Blog)
* **location** (string или null) - местоположение (в данном случае в ответе приходит null, нужно учеть это и выводить "unknown")
* **public_repos** (number) - количество публичных репозиториев
* **public_gists** (number) - количество gist'ов
* **created_at** (string) - время создания профиля (можно форматировать дату с помощью date-fns/format либо moment.js)
* **updated_at** (string) - время последнего обновления профиля (аналогично предыдущему пункту)

### Список публичных репозиториев

![repo](./repo.png)

Метод [http://localhost:8080/users/octocat/repos](http://localhost:8080/users/octocat/repos) возвращает массив репозиториев, рассмотрим один элемент этого массива.

* **name** (string) - название репозитория
* **html_url** (string) - ссылка на репозиторий на github
* **description** (string) - описание
* **created_at** (string) - время создания репозитория (можно форматировать дату с помощью date-fns/format либо moment.js)
* **language** (string) - язык
* **stargazers_count** (number) - количество звёзд
* **forks_count** (number) - количество форков
* **open_issues_count** (number) - количество открытых issues
* **updated_at** (string) - дата последнего обновления

### Отсутствие пользователя с таким username

Просто показываем соответствующий текст, информацию о предыдущем пользователе и его репозиториях - удаляем.

![user-not-found](./user-not-found.png)