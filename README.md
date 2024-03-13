# Coding Assignment
- 本リポジトリはMI-6のコーディング課題として作成されました。
- 「Habit Reminder」を動かすために必要なコードが含まれています。
- 「Habit Reminder」ではあらかじめ習慣化したいことをリストアップしておくと、ランダムにSlackに通知を送れます。
- 本リポジトリのコードはプログラミング初心者が書きました。
  
https://github.com/mi-6/coding-assignment/assets/23290090/ac1c7a6e-690f-40d7-99f2-00bfce0fc708



## 環境構築

### バックエンド
```
$ cd backend
$ docker-compose build
$ docker-compose up -d
$ docker-compose exec web bundle exec rails db:create
$ docker-compose exec web bundle exec rails db:migrate
```

### フロントエンド
```
$ cd frontend
$ yarn install
$ yarn start
```

### Slack通知
```
docker-compose exec web bundle exec rake slack:notify
```
※今回の課題の対象外ですので動作しません。
