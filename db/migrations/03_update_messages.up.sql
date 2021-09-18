USE teame_db;

-- 既に作成されたレコードに対して複合ユニーク制約を付けるのはすぐにはできそうにないので
-- レコード全削除します
DELETE FROM messages;

ALTER TABLE messages
  ADD COLUMN object_id INT NOT NULL,
  ADD COLUMN writer_name VARCHAR(100) NOT NULL,
  ADD UNIQUE (user_id, object_id)
;
