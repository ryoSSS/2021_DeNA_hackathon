# 2021_DeNA_hackathoni

## サービス概要

### テーマ課題
g. 孤独な時間が増えてしまい、病気になりやすくなった

### UNS

- User: コロナ禍で孤独な時間が増えてしまい、精神的にまいってる人
- Needs: 孤独 / 寂しいという感情がなくなって元気に生活したい
- Solution: 
送り合った誕生日メッセージを思い出に残るような形で残し、それを振り返ることで寂しいという感情をなくしてもらうサービス

### サービスの軸

***リアルに匹敵するほどの強い思い出を残す***

### 検討ポイント

-  SNS上でサービスのURLを自分で貼って、誕生日を祝ってほしいと言うのは心理的ハードルが高いのではないか
   - 恐らく高くない。似たサービスである `ほめて箱`はリリース3ヶ月でユーザー7万人


## setup

データベースとバックエンドサーバを立ち上げる

```bash
$ docker compose up
```

## API

- [POST] /users
  - Request
    - name: string
    - birthday: string (format未定)
  - Response
    - user_id: int
  

- [GET] /users/:id
    - Response
      - name: string
      - birthday: string
      - messages: array
        - id: int
        - content: string



- [POST] /messages
  -  Request
     -  user_id: int
     -  content: strings

