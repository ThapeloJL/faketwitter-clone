// Cursor Feature # 1 Tweet Post Fuction

const MAX_TWEET_LENGTH = 280;
const TWEETS_STORAGE_KEY = "tweets";
const DEFAULT_AVATAR_COLOR = "1d3050";

const SEED_TWEETS = [
  {
    id: "seed-1",
    author: "Kade Voss",
    handle: "@kadevoss",
    avatarColor: "1a1a2e",
    verified: true,
    timestamp: "2h",
    text: "Starframe's next launch window opens in 11 days. Reusability is the whole game — every dollar we don't spend rebuilding a booster is a dollar toward Mars.",
    replies: 412,
    retweets: 1200,
    likes: 8900,
    views: "412K",
    liked: false,
    retweeted: false,
    isOwn: false,
  },
  {
    id: "seed-2",
    author: "Kade Voss",
    handle: "@kadevoss",
    avatarColor: "1a1a2e",
    verified: true,
    timestamp: "5h",
    text: "The next leap for AI isn't bigger models, it's models that can act in the physical world without babysitting. Robotics + reasoning is the real frontier.",
    replies: 890,
    retweets: 3400,
    likes: 21000,
    views: "1.1M",
    liked: false,
    retweeted: false,
    isOwn: false,
  },
  {
    id: "seed-3",
    author: "Kade Voss",
    handle: "@kadevoss",
    avatarColor: "1a1a2e",
    verified: true,
    timestamp: "1d",
    text: "Static fire test complete ✅ Engines nominal. Next stop: orbit.",
    replies: 156,
    retweets: 670,
    likes: 5200,
    views: "203K",
    liked: false,
    retweeted: false,
    isOwn: false,
  },
  {
    id: "seed-4",
    author: "Kade Voss",
    handle: "@kadevoss",
    avatarColor: "1a1a2e",
    verified: true,
    timestamp: "2d",
    text: "People keep asking when AI 'takes over.' Wrong question. The real milestone is when it becomes boring — just infrastructure, like electricity.",
    replies: 2300,
    retweets: 5600,
    likes: 34000,
    views: "2.3M",
    liked: false,
    retweeted: false,
    isOwn: false,
  },
];

const SEED_IDS = {};
SEED_TWEETS.forEach(function (tweet) {
  SEED_IDS[tweet.id] = true;
});

function loadStoredTweets() {
  try {
    const stored = localStorage.getItem(TWEETS_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(function (tweet) {
      return tweet && !SEED_IDS[tweet.id];
    });
  } catch (error) {
    return [];
  }
}

function avatarUrl(color) {
  return (
    "https://placehold.co/40x40/" +
    (color || DEFAULT_AVATAR_COLOR) +
    "/fff?text=%20"
  );
}

let tweets = loadStoredTweets().concat(SEED_TWEETS);

const composerInput = document.getElementById("composer-input");
const composerCount = document.getElementById("composer-count");
const composerPostBtn = document.getElementById("composer-post-btn");
const feed = document.getElementById("feed");

function saveTweets() {
  const ownTweets = tweets.filter(function (tweet) {
    return !SEED_IDS[tweet.id];
  });
  localStorage.setItem(TWEETS_STORAGE_KEY, JSON.stringify(ownTweets));
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

function formatCount(value) {
  if (typeof value === "string") {
    return value;
  }

  const count = Number(value) || 0;
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return String(count);
}

function renderTweets() {
  feed.innerHTML = "";

  tweets.forEach(function (tweet) {
    const article = document.createElement("article");
    article.className = "tweet";
    article.innerHTML =
      '<img class="avatar avatar--sm" src="' +
      avatarUrl(tweet.avatarColor) +
      '" alt="" />' +
      '<div class="tweet-body">' +
      '<div class="tweet-header">' +
      '<span class="tweet-author">' +
      escapeHtml(tweet.author) +
      "</span>" +
      (tweet.verified
        ? '<span class="material-symbols-outlined tweet-verified">verified</span>'
        : "") +
      '<span class="tweet-handle">' +
      escapeHtml(tweet.handle) +
      "</span>" +
      '<span class="tweet-time">· ' +
      escapeHtml(tweet.timestamp) +
      "</span>" +
      "</div>" +
      '<p class="tweet-text">' +
      escapeHtml(tweet.text) +
      "</p>" +
      '<div class="tweet-actions">' +
      '<span class="tweet-action">' +
      '<span class="material-symbols-outlined">chat_bubble</span>' +
      "<span>" +
      formatCount(tweet.replies) +
      "</span>" +
      "</span>" +
      '<span class="tweet-action' +
      (tweet.retweeted ? " is-retweeted" : "") +
      '">' +
      '<span class="material-symbols-outlined">repeat</span>' +
      "<span>" +
      formatCount(tweet.retweets) +
      "</span>" +
      "</span>" +
      '<span class="tweet-action' +
      (tweet.liked ? " is-liked" : "") +
      '">' +
      '<span class="material-symbols-outlined">favorite</span>' +
      "<span>" +
      formatCount(tweet.likes) +
      "</span>" +
      "</span>" +
      '<span class="tweet-action">' +
      '<span class="material-symbols-outlined">bar_chart</span>' +
      "<span>" +
      formatCount(tweet.views) +
      "</span>" +
      "</span>" +
      "</div>" +
      "</div>";
    feed.appendChild(article);
  });
}

function addTweet(text) {
  tweets.unshift({
    id: "own-" + Date.now(),
    author: "username",
    handle: "@username",
    avatarColor: DEFAULT_AVATAR_COLOR,
    verified: false,
    timestamp: "now",
    text: text,
    replies: 0,
    retweets: 0,
    likes: 0,
    views: "0",
    liked: false,
    retweeted: false,
    isOwn: true,
  });
  saveTweets();
  renderTweets();
}

function updateComposerState() {
  const text = composerInput.value;
  const remaining = MAX_TWEET_LENGTH - text.length;
  const trimmed = text.trim();
  const canPost = trimmed.length > 0 && text.length <= MAX_TWEET_LENGTH;

  composerCount.textContent = remaining;
  composerCount.classList.toggle("is-limit", remaining < 0);
  composerPostBtn.disabled = !canPost;
}

composerInput.addEventListener("input", updateComposerState);

composerPostBtn.addEventListener("click", function () {
  const text = composerInput.value.trim();
  if (!text || text.length > MAX_TWEET_LENGTH) {
    return;
  }

  addTweet(text);
  composerInput.value = "";
  updateComposerState();
});

renderTweets();
updateComposerState();
