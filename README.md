<img height="110" width="400" src="https://i.imgur.com/HcYFflq.png">

> 🎮 My terrible Discord bot.

## Installation

**Dependencies:**

- https://github.com/JoshuaWise/better-sqlite3/wiki/Troubleshooting-installation
- Google Fonts: Roboto, Raleway (https://raw.githubusercontent.com/hotice/webupd8/master/install-google-fonts)
- ImageMagick

Suspecting you're using Linux:

```sh
git clone https://gitlab.com/makisune/maki.js
cd maki.js
npm install
cp settings.example.js settings.js
```
Edit `settings.js` and set the tokens.

- **Discord:** https://discordapp.com/developers/applications/me
- **Osu!:** https://osu.ppy.sh/p/api

Finally, I recommend you use [PM2](https://www.npmjs.com/package/pm2) to start the bot indefinitely:

```sh
pm2 start app.js --name "Maki.js"
```
...or just run it straight off of Node.js:

```sh
node app.js
```
## Contribute

Feel free to fork or send pull requests!
