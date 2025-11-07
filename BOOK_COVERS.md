# 🎨 Adding Book Covers to BookTaught

## How Book Covers Work Now

The app will:
1. **Try to load the image** from the path in `books.json`
2. **Fall back to a beautiful placeholder** with emoji + book title if image doesn't exist

## Adding Real Book Covers

### Option 1: Add Your Own Images (Best)

1. **Get your book cover image:**
   - Take a photo/screenshot of the book
   - Download from Amazon (right-click → Save Image)
   - Use a scan or existing cover file

2. **Prepare the image:**
   - **Recommended size:** 400x600px (2:3 aspect ratio)
   - **Format:** JPG or PNG
   - **File size:** Keep under 200KB for fast loading

3. **Add to your project:**
   ```bash
   # Copy your image to the covers folder
   cp ~/Downloads/100m-offers-cover.jpg public/covers/100m-offers.jpg
   ```

4. **Image already referenced in books.json** - just restart:
   ```bash
   npm run dev
   ```

### Option 2: Use Placeholder Images

If you don't have images yet, the app automatically shows:
- 📖 Emoji
- Book title
- Beautiful gradient background

**This looks great!** You can launch without real covers.

### Option 3: Create Simple Text-Based Covers (Quick DIY)

Use a tool like Canva (free):

1. Go to [canva.com](https://canva.com)
2. Create custom size: 400x600px
3. Add gradient background
4. Add book title + author
5. Download as JPG
6. Add to `public/covers/`

## Where to Get Book Cover Images

### Free & Legal Options:

1. **Your own books:** Take photos of books you own
2. **Open Library:** [openlibrary.org](https://openlibrary.org) - search book, download cover
3. **Google Books:** Often has high-res covers
4. **Publisher websites:** Many allow cover image use
5. **Amazon:** Screenshots (for personal/educational use)

### Important Notes:

- ⚠️ Book covers are copyrighted
- ✅ Use for personal projects or educational purposes
- ✅ Create your own designs to avoid copyright issues
- ❌ Don't use for commercial purposes without permission

## Current Cover Status

Your `books.json` references these covers:

```
public/covers/
├── 100m-offers.jpg        ❌ (not yet added)
├── psychology-money.jpg   ❌ (not yet added)
├── atomic-habits.jpg      ❌ (not yet added)
├── deep-work.jpg          ❌ (not yet added)
└── lean-startup.jpg       ❌ (not yet added)
```

## Quick Add Example

```bash
# Download or copy your images to the covers folder
cp ~/Downloads/100m-offers.jpg public/covers/100m-offers.jpg
cp ~/Downloads/atomic-habits.jpg public/covers/atomic-habits.jpg

# Restart dev server
npm run dev

# Images now appear automatically! 🎉
```

## Image Specifications

| Property | Recommendation | Why |
|----------|---------------|-----|
| Width | 400px | Perfect for cards |
| Height | 600px | 2:3 ratio (standard book) |
| Format | JPG or PNG | Web-optimized |
| File Size | < 200KB | Fast loading |
| DPI | 72 | Screen resolution |

## Optimizing Images

If your images are too large:

```bash
# Install imagemagick (macOS)
brew install imagemagick

# Resize and optimize
convert input.jpg -resize 400x600 -quality 85 output.jpg
```

Or use online tools:
- [TinyPNG](https://tinypng.com) - Free compression
- [Squoosh](https://squoosh.app) - Google's image optimizer

## Testing Your Covers

After adding images:

1. Restart dev server: `npm run dev`
2. Visit homepage: `http://localhost:3000`
3. Check each book card
4. Click book → check detail page
5. Covers should load automatically!

If image doesn't load:
- Check filename matches `books.json` exactly
- Check file is in `public/covers/`
- Check browser console for errors
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

## Pro Tips

### 1. Consistent Style
Keep all covers similar style (same height, similar backgrounds)

### 2. WebP Format
For best performance, use WebP:
```bash
convert input.jpg -quality 85 output.webp
```

### 3. Lazy Loading
Images are automatically lazy-loaded with Next.js Image component

### 4. Alt Text
Automatically generated from book title for accessibility

### 5. Error Handling
If image fails to load, falls back to beautiful placeholder automatically

## You're All Set! 🎉

Your book covers will:
- ✅ Load from `public/covers/` when available
- ✅ Show beautiful placeholders when missing
- ✅ Optimize automatically with Next.js
- ✅ Work on all devices (responsive)
- ✅ Load fast (lazy loading + caching)

**No covers? No problem!** The placeholders look great and you can add covers anytime.
