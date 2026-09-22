# My X Chat Link Generator

Xのユーザー名から、X チャット（DM）作成リンクを生成する静的サイトです。

```text
https://x.com/messages/compose?recipient_id={数値ID}
```

公開ページ: <https://yuki-dev26.github.io/xchat-link/>

## ローカル確認

任意の静的サーバーでルートの `index.html` を配信してください。

```bash
npx --yes serve .
```

## GitHub Pages

`main` への push で [Deploy GitHub Pages](.github/workflows/pages.yml) が走り、サイトファイルを公開します。

初回は GitHub の **Settings → Pages → Build and deployment** で **GitHub Actions** を選んでください。
