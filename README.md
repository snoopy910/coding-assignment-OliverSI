# Coding Assignment

- Contains the code necessary to run "Habit Reminder".
- "Habit Reminder" allows you to make a list of things you want to make into habits in advance, and then send random notifications to Slack.
- The code in this repository was written by a programming beginner.

## Configuration of ENV

### Backend

```
$ cd backend
$ docker-compose build
$ docker-compose up -d
$ docker-compose exec web bundle exec rails db:create
$ docker-compose exec web bundle exec rails db:migrate
```

### Frontend

```
$ cd frontend
$ yarn install
$ yarn start
```

### Slack Notification

```
docker-compose exec web bundle exec rake slack:notify
```
