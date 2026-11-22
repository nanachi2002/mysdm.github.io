# MyDSM website

The project page for **MyDSM**, a free desktop messenger with buddy lists, nudges, winks, emoticons, group chats and customisable profile pages.

Plain static HTML/CSS/JS, no build step, no trackers, no cookies, no outside fonts.

- `index.html`: the page, laid out as "MyDSM's profile"
- `style.css`, `site.js`: the look, the emoticon browser, and the live version number on the download button (read from the app's update feed)
- `img/`: screenshots of the app (taken with temporary demo accounts)
- `emo/`, `emoticons.js`: the same emoticons the app uses

The Download button points at the newest signed installer. After that, MyDSM updates itself from inside the app.

## Credits

Emoticons: [Fugue Icons](https://p.yusukekamiyamane.com/) (C) Yusuke Kamiyamane, used under the [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/). 32 px versions from [fugue-2x-icons](https://github.com/chrisjbillington/fugue-2x-icons). See `emo/CREDITS.txt`.
