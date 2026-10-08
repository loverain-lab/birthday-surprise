"use strict";
const config = {
  birthdayPerson: "Negin",
  sender: "Fatemeh",
  letter: `If I could give you one thing today, it would be the chance to see yourself through my eyes, even for a moment. You'd see just how magical, beautiful, and deeply loved you are.

We've shared so many chapters of life, some beautiful, some harder than we ever imagined. And through them all, you've remained one of the most precious parts of my story.

I wish I could be there today, holding you close, kissing your forehead, and reminding you how much I love you. God, how I crave your hugs.

More than anything, I hope this is the last birthday we have to spend apart.

I hope your next chapter is filled with flowers, books, adventures, peace, and all the little wonders you deserve.

Happy birthday, my beautiful Negin.

May your next chapter be softer than the last.`,
  bookPages: [
    {
      category: "I · Of books & other worlds",
      symbol: "✧",
      title: "The Dreamer",
      text: "For the girl who knows that between the pages of a book, a thousand worlds can bloom.",
    },
    {
      category: "II · Of art & imagination",
      symbol: "✎",
      title: "The Artist",
      text: "May your hands never stop creating, and may your imagination always have a place to wander.",
    },
    {
      category: "III · Of captured moments",
      symbol: "◈",
      title: "The Observer",
      text: "For the eyes that find beauty in ordinary things, and turn fleeting moments into forever.",
    },
    {
      category: "IV · Of forgotten centuries",
      symbol: "❦",
      title: "The Romantic",
      text: "Old galleries, secret gardens, and letters written by candlelight, some souls belong to every era.",
    },

    {
      category: "V · Written in the Stars",
      symbol: "♎",
      title: "The Venus Child",
      text: "They say Libras are ruled by Venus, the planet of beauty and love. And somehow, that feels just right for someone who finds beauty in everything.",
    },
  ],
  wishes: [
    "May your days bloom with love and beautiful surprises.",
    "May you find peace in the quiet moments and wonder in the unknown.",
    "May your brightest dreams always find their way to you.",
    "May we find each other in every garden, in every spring, and in every lifetime.",
  ],

  gallery: [
    {
      title: "A little piece of us",
      caption: "Our favorite kind of magic",
      symbol: "✿",
      image: "assets/photos/us.jpeg",
    },
    {
      title: "Through her eyes",
      caption: "The beauty she carries",
      symbol: "◈",
      image: "assets/photos/negin-1.jpeg",
    },
    {
      title: "A portrait of wonder",
      caption: "One of a kind",
      symbol: "❦",
      image: "assets/photos/negin-2.jpeg",
    },
  ],
};
const $ = (selector) => document.querySelector(selector);
let currentPage = 0;
const chapters = [
  "invitation",
  "storybook",
  "garden",
  "gallery",
  "cake",
  "letter",
];
const progressNames = [
  "Invitation",
  "Storybook",
  "Secret garden",
  "Little museum",
  "Make a wish",
  "Your letter",
];
function showChapter(id) {
  chapters.forEach((chapter) => {
    const el = document.getElementById(chapter);
    const active = chapter === id;
    el.hidden = !active;
    el.classList.toggle("active", active);
  });
  const index = chapters.indexOf(id);
  $("#progress").hidden = index === 0;
  $("#progressLabel").textContent = progressNames[index];
  $("#progressFill").style.width =
    `${Math.round((index / (chapters.length - 1)) * 100)}%`;
  window.scrollTo({ top: 0, behavior: "instant" });
  const heading = document.getElementById(id).querySelector("h1,h2");
  heading?.setAttribute("tabindex", "-1");
  heading?.focus({ preventScroll: true });
}
function renderPage() {
  const page = config.bookPages[currentPage];
  $("#pageCategory").textContent = page.category;
  $("#pageSymbol").textContent = page.symbol;
  $("#pageTitle").textContent = page.title;
  $("#pageText").textContent = page.text;
  $("#pageNumber").textContent =
    `${String(currentPage + 1).padStart(2, "0")} / ${String(config.bookPages.length).padStart(2, "0")}`;
  $("#prevPage").disabled = currentPage === 0;
  $("#nextPage").disabled = currentPage === config.bookPages.length - 1;
}
function turnPage(direction) {
  const next = currentPage + direction;
  if (next < 0 || next >= config.bookPages.length) return;
  $(".book").classList.add("turn");
  setTimeout(() => {
    currentPage = next;
    renderPage();
    $(".book").classList.remove("turn");
  }, 160);
}
function renderGallery() {
  const gallery = $("#galleryGrid");
  gallery.replaceChildren();
  config.gallery.forEach((item, index) => {
    const frame = document.createElement("article");
    frame.className = "art-frame";
    frame.style.setProperty("--tilt", `${[-2, 2, -1][index % 3]}deg`);
    const art = document.createElement("div");
    art.className = "artwork";
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.loading = "lazy";
      art.append(img);
    } else {
      const symbol = document.createElement("span");
      symbol.textContent = item.symbol;
      art.append(symbol);
    }
    const title = document.createElement("h3");
    title.textContent = item.title;
    const caption = document.createElement("p");
    caption.textContent = item.caption;
    frame.append(art, title, caption);
    gallery.append(frame);
  });
}
function releaseConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = $("#confetti"),
    ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  ctx.scale(ratio, ratio);
  const bits = Array.from({ length: 130 }, () => ({
    x: Math.random() * innerWidth,
    y: -Math.random() * innerHeight,
    v: 1.5 + Math.random() * 3,
    s: 3 + Math.random() * 5,
    color: ["#e6c896", "#e5a6b5", "#b2a2cb", "#e6d7ba"][
      Math.floor(Math.random() * 4)
    ],
  }));
  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.s, p.s / 2);
      p.y += p.v;
      p.x += Math.sin((p.y + frame) / 40) * 0.5;
    });
    frame++;
    if (frame < 240) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  }
  requestAnimationFrame(animate);
}
let blown = 0;
document.addEventListener("DOMContentLoaded", () => {
  $("#heroName").textContent = config.birthdayPerson;
  $("#senderName").textContent = config.sender;
  $("#personalLetter").textContent = config.letter;
  $("#openStory").addEventListener("click", () => {
    showChapter("storybook");
    // A user gesture allows most browsers to start background audio.
    if (!music.dataset.manuallyPaused) playMusic();
  });
  $("#prevPage").addEventListener("click", () => turnPage(-1));
  $("#nextPage").addEventListener("click", () => turnPage(1));
  renderPage();
  $("#toGarden").addEventListener("click", () => showChapter("garden"));
  document.querySelectorAll(".flower").forEach((button) =>
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".flower")
        .forEach((el) => el.classList.remove("picked"));
      button.classList.add("picked");
      $("#wishCard p").textContent = config.wishes[Number(button.dataset.wish)];
    }),
  );
  $("#toGallery").addEventListener("click", () => showChapter("gallery"));
  renderGallery();
  $("#toCake").addEventListener("click", () => showChapter("cake"));
  document.querySelectorAll(".candle").forEach((button) =>
    button.addEventListener("click", () => {
      if (button.classList.contains("out")) return;
      button.classList.add("out");
      button.setAttribute("aria-label", "Candle blown out");
      blown++;
      $("#cakeMessage").textContent =
        blown === 3
          ? "Your wish is on its way ✨"
          : `${3 - blown} ${3 - blown === 1 ? "candle" : "candles"} left…`;
      if (blown === 3) {
        $("#toLetter").disabled = false;
        releaseConfetti();
      }
    }),
  );
  $("#toLetter").addEventListener("click", () => {
    if (blown === 3) showChapter("letter");
  });
  $("#restart").addEventListener("click", () => {
    currentPage = 0;
    renderPage();
    blown = 0;
    document.querySelectorAll(".candle").forEach((el) => {
      el.classList.remove("out");
      el.setAttribute("aria-label", "Blow out candle");
    });
    $("#toLetter").disabled = true;
    $("#cakeMessage").textContent = "Three little wishes are waiting…";
    showChapter("invitation");
  });
  const music = $("#music");
  const btn = $("#musicBtn");
  async function playMusic() {
    try {
      await music.play();
    } catch (error) {
      // Browsers can block audio until a user gesture, or the file may be missing.
      btn.querySelector("span").textContent = "Play music";
      console.warn("Unable to play birthday music:", error);
    }
  }
  btn.addEventListener("click", () => {
    if (music.paused) {
      delete music.dataset.manuallyPaused;
      playMusic();
    } else {
      music.dataset.manuallyPaused = "true";
      music.pause();
    }
  });
  music.addEventListener("play", () => {
    btn.querySelector("span").textContent = "Pause music";
    btn.setAttribute("aria-label", "Pause music");
    btn.setAttribute("aria-pressed", "true");
  });
  music.addEventListener("pause", () => {
    btn.querySelector("span").textContent = "Play music";
    btn.setAttribute("aria-label", "Play music");
    btn.setAttribute("aria-pressed", "false");
  });

  const openGiftBtn = document.getElementById("openGift");
  const giftReveal = document.getElementById("giftReveal");

  openGiftBtn.addEventListener("click", () => {
    if (!giftReveal.hidden) return;

    giftReveal.hidden = false;
    openGiftBtn.classList.add("opened");

    openGiftBtn.setAttribute("aria-expanded", "true");

    openGiftBtn.querySelector(".gift-label").textContent =
      "A little surprise for you ♡";

    releaseConfetti();
  });
});
