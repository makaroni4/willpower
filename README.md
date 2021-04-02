# Willpower [![Add to Chrome](https://user-images.githubusercontent.com/768070/51865757-87d45300-2347-11e9-84fd-bafff5b036b2.png)](https://chrome.google.com/webstore/detail/youtube-time-tracker/gadnhdhegigkbjiebmcceodbablkdjmo)

:muscle: **Willpower** is a Chrome Extension that helps you stay focused by blocking websites or specific web pages.

:heart: Unlike other website blocking extensions, Willpower **does not track any user data**. It's a simple Vue JS application made with only one purpose – to help being focused and take a breath before actually visiting a rabbit-hole-website.

:wrench: **Willpower** is customizable. You can:

* set your breathing timer duration
* motivational quote
* buttons copy
* redirect destination after decided to close a website

:bar_chart: **Willpower** stores its data in your Chrome browser storage. Besides default config parameters :point_up: it also keeps track of how many times you visited or skipped blocked pages.

## Development

Run `npm install` to install needed packages. FYI Willpower built with Vue CLI.

Run `npm run build` to compile the extension. Vue CLI will add a `dist` folder with all the necessary files.

Load the [dist folder](https://github.com/makaroni4/willpower/tree/master/dist) to [chrome://extensions/](chrome://extensions/) via "Load unpacked":

![Loading extension in Chrome for development](https://user-images.githubusercontent.com/768070/51443928-e3bc2d80-1cf0-11e9-9389-08887d88015f.png).

:mag: You'll need to run `npm run build` and update extension :point_up: every time you changed CSS/JS files.
