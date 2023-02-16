# Willpower <a href="https://chrome.google.com/webstore/detail/willpower/codkcdmdmljjhncjfkfgjbmiglcfpdgc"><img width="124" alt="Frame 1 (9)" src="https://user-images.githubusercontent.com/768070/113516074-a1513500-9578-11eb-9eb9-06326003cf66.png"></a>


:muscle: **Willpower** is a Chrome Extension that helps you stay focused by blocking websites or specific web pages.

:heart: Unlike other website blocking extensions, Willpower **does not track any user data**. It's a simple Vue JS application made with only one purpose – to help being focused and take a breath before actually visiting a rabbit-hole-website.

:wrench: **Willpower** is customizable. You can:

* set your breathing timer duration
* motivational quote
* buttons copy
* redirect destination after decided to close a website
* whitelist specific URL's and subdomains

:bar_chart: **Willpower** stores its data in your Chrome browser storage. Besides default config parameters :point_up: it also keeps track of how many times you visited or skipped blocked pages.

## Screenshots

🔍 Example of a Screenwall :point_down:. You can customize any copy.

<img width="800" alt="Screenshot 2021-04-04 at 15 39 27" src="https://user-images.githubusercontent.com/768070/113512526-54b02e80-9565-11eb-940f-0dca10e27696.png">

📊 Extension's popup shows stats of how often you close or open blocked websites:

<img width="800" alt="Screenshot 2021-04-04 at 15 23 13" src="https://user-images.githubusercontent.com/768070/113512554-73aec080-9565-11eb-9500-02e5dfc75810.png">

🛑 Example of URL patterns to block. As you can see, it supports a wildcard symbol **\***, so you can block any web page, even a search query in Google.

<img width="800" alt="Screenshot 2021-04-04 at 15 23 30" src="https://user-images.githubusercontent.com/768070/113512561-7c9f9200-9565-11eb-90b3-cefeb3991e8b.png">

📝 You can fully customize Screenwall copy, breathing timer or a comfortable browsing window (Willpower will show a Screnwall after 15 min of browsing).

<img width="800" alt="Screenshot 2021-04-04 at 15 23 37" src="https://user-images.githubusercontent.com/768070/113512567-80cbaf80-9565-11eb-938b-ec7883e2d93f.png">


## Development

Run `npm install` to install needed packages. FYI Willpower built with Vue CLI.

Run `npm run build` to compile the extension. Vue CLI will add a `dist` folder with all the necessary files.

Load the [dist folder](https://github.com/makaroni4/willpower/tree/master/dist) to [chrome://extensions/](chrome://extensions/) via "Load unpacked":

<img width="467" alt="Loading extension in Chrome for development" src="https://user-images.githubusercontent.com/768070/113512485-25012680-9565-11eb-852f-5672254ae94b.png">

:mag: You'll need to run `npm run build` and update extension :point_up: every time you changed CSS/JS files.
