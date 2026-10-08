# Negin's Enchanted Birthday ✦

A personalized Victorian fantasy birthday story. Built from the user's lightweight HTML/CSS/JS birthday template, reimagined as a multi-chapter experience. No framework, build step, or external JS dependencies.

## Preview locally
Open `index.html` in a browser, or use VS Code's Live Server extension.

## Customize
Edit the `config` object at the **top of `script.js`**:
- `birthdayPerson`, `sender`, `letter`
- `bookPages`: symbols, titles and texts
- `wishes`: one wish for each garden flower
- `gallery`: three entries. For your own photos, add images to `assets/` and set e.g. `image: 'assets/photo1.jpg'`.

The gallery uses decorative placeholders until you add real photos. For background music, put your existing `happy-birthday.mp3` next to `index.html`. Music starts when the visitor clicks **Open your story** (if the browser permits playback), continues across chapters, loops, and can be paused/resumed using the top-right music button. If your file uses another name or location, update the `<audio src="...">` in `index.html`.

**Privacy:** GitHub Pages sites and assets are publicly accessible. Avoid sharing private photos or sensitive letters there unless you are comfortable with that. Also check reuse/license conditions of third-party template code if publishing adapted material.

## GitHub Pages
Once ready, push `index.html`, `style.css`, `script.js`, and `assets/` to your repository's default branch. Go to Settings → Pages → Deploy from a branch → main / (root). No React or build action needed.
