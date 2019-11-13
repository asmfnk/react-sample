## RESAS(地域経済分析システム)の人口データを可視化する
https://react-resas.firebaseapp.com/
でホスティング中
→無料プランでないので停止中

## Available Scripts

In the project directory, you can run:

### `yarn build`

ビルド

### `firebase serve`

ローカルで動かします。
あらかじめRESASのAPIをキーを発行して `/functions/.runtimeconfig.json` を作成してください
```
{
  "resas": {
    "api_key": "{RESASのAPIをキー}"
  }
}
```

### `firebase deploy`

デプロイ
あらかじめ以下のコマンドを実行してfirebase functionsに環境変数を持たせる
```
firebase functions:config:set resas.api_key={RESASのAPIをキー}
```
