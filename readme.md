FakeTwitter - X (Twitter) Timeline Clone

# About 
A static,no build-step clone of the Twitter home timeline, built with HTML5 , CSS and JavaScript.

Live Demo : []

## File Structure:
faketwitter/
├── index.html            Home / timeline page
├── styles.css             Core styling, theme variables, layout
├── responsiveness.css     Breakpoints (tablet / mobile)
├── script.js               Tweet composer + feed render/post logic
├── assets/
│   └── twitter-svgrepo-com.svg   Logo / favicon
└── README.md

## Basic Features
 -Three column X-style layout : left nav, center timeline, right sidebar.

 -Responsive from mobile up through desktop.

 -Sidebar navigation, account switcher , widgets , trending panel and footer links matching the real X layout.

 -Tweet composer with a live 280 character counter and a Post button that's disable until theres vaild text.

 -Tweet feed that renders posted tweets dynamically via script.js, newest first, persisted so posts survive a page refresh.

### Manual Feature - Dark/Light Mode (no AI assistance) 
--Implemented as a pure CSS toggle using the checkbox hack combined with the :has() selector:

-- A hidden <input type = "checkbox"> paired and a styled <label> toggle switch

### Cursor-paired Feature -- Tweet Compose + render pipeline --Built in script.js with Cursor as a pair-programmer.
-- In-memory tweets array, hydrated from localStorage on load
-- renderTweets() - clears nad re-renders the feed.
-- addTweet(text) - builds a tweet object, saves it , re-renders.

