# FakeTwitter - X (Twitter) Timeline Clone

A lightweight, static clone of the Twitter/X home timeline. Built with vanilla HTML5, CSS, and JavaScript—no build tools required. Perfect for learning responsive design and DOM manipulation.

**Live Demo:** [Add your demo URL here]

## Features

- **Responsive Three-Column Layout** — Left sidebar navigation, center timeline, right trending panel
- **Tweet Composer** — Live 280-character counter with smart Post button state
- **Persistent Storage** — Tweets saved to localStorage and restored on page reload
- **Dark/Light Mode Toggle** — Pure CSS implementation using checkbox hack + :has() selector
- **Mobile to Desktop** — Fully responsive breakpoints

## Getting Started

1. Clone or download the repository
2. Open `index.html` in your browser
3. Start posting tweets!

## File Structure

```
faketwitter-clone/
├── index.html          # Main page and DOM structure
├── styles.css          # Core layout and styling
├── responsiveness.css  # Mobile/tablet/desktop breakpoints
├── script.js           # Tweet composer, render pipeline, localStorage
├── assets/             # Icons (twitter.svgrepo.com)
└── README.md           # This file
```

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, :has() selector)
- Vanilla JavaScript (ES6+)
- LocalStorage API

## Implementation Details

### Dark/Light Mode
Implemented as a pure CSS toggle using the checkbox hack combined with the `:has()` selector:
- Hidden `<input type="checkbox">` paired with a styled `<label>` toggle switch
- No JavaScript required for theme switching

### Tweet Compose & Render Pipeline
Built with vanilla JavaScript and localStorage persistence:
- In-memory tweets array, hydrated from localStorage on page load
- `renderTweets()` — Clears and re-renders the entire feed
- `addTweet(text)` — Builds a tweet object, saves to storage, and re-renders

## Future Enhancements

- Backend API integration
- User authentication
- Image/media uploads
- Like/retweet functionality
- Reply/thread support

## License

[Add your license here]

## Credits

- Twitter/X icon from [twitter.svgrepo.com](https://www.svgrepo.com/)
