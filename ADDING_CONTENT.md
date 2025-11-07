# 📚 Adding Books and Chapters to BookTaught

This guide explains how to add new books and chapters to your learning platform.

## 🎯 Quick Overview

To add a new book with chapters:
1. Create markdown files for chapters
2. Update `books.json` with book metadata
3. (Optional) Add a book cover image
4. Restart your dev server

---

## 📖 Adding a New Book

### Step 1: Create Book Directory

Create a new folder for your book in `content/books/`:

```bash
mkdir content/books/your-book-slug
```

**Naming convention:** Use lowercase with hyphens (e.g., `atomic-habits`, `psychology-money`)

### Step 2: Create Chapter Files

Create markdown files for each chapter:

```bash
touch content/books/your-book-slug/chapter-1.md
touch content/books/your-book-slug/chapter-2.md
# ... etc
```

**Example chapter file** (`chapter-1.md`):

```markdown
# CHAPTER 1: YOUR CHAPTER TITLE
## Expert Teaching Module

---

## 🎯 THE CORE MESSAGE (In One Breath)

**Your main takeaway in one powerful sentence.**

---

## 💡 THE FUNDAMENTAL SHIFT

### BEFORE This Chapter:
- What people think before reading
- Their misconceptions
- Their struggles

### AFTER This Chapter:
- What they'll understand
- How their thinking changes
- New perspectives gained

---

## 🧠 THE CORE CONCEPTS

### 1. FIRST MAJOR CONCEPT

**What the Author REALLY Means:**
Deep explanation of the concept...

**The Real-World Picture:**
Concrete examples and stories...

**How This Changes Your Thought:**
Practical application...

---

## 🔥 THE MINDSET TRANSFORMATION

### OLD PARADIGM:
"Old way of thinking..."

### NEW PARADIGM:
"New way of thinking..."

---

## 💪 THE ACTION STEPS

### IMMEDIATE (Do This Today):

1. **First Action**
   - Specific steps
   - What to do
   - Why it matters

---

## ✅ MASTERY CHECKLIST

You've "mastered" this chapter when you can:
- [ ] Explain the core concept
- [ ] Apply it to your situation
- [ ] Teach it to someone else

---

**Ready for the next chapter? Let's keep going! 🚀**
```

### Step 3: Update `books.json`

Edit `content/books/books.json` and add your book:

```json
{
  "id": "your-book-slug",
  "title": "Your Book Title",
  "author": "Author Name",
  "description": "A compelling description that explains what readers will learn from this book.",
  "coverImage": "/covers/your-book.jpg",
  "slug": "your-book-slug",
  "chapterCount": 3,
  "published": true,
  "chapters": [
    {
      "chapterNumber": 1,
      "title": "Your Chapter 1 Title",
      "slug": "chapter-1",
      "isFree": true
    },
    {
      "chapterNumber": 2,
      "title": "Your Chapter 2 Title",
      "slug": "chapter-2",
      "isFree": false
    },
    {
      "chapterNumber": 3,
      "title": "Your Chapter 3 Title",
      "slug": "chapter-3",
      "isFree": false
    }
  ]
}
```

**Important fields:**
- `id` & `slug`: Must match your folder name
- `chapterCount`: Total number of chapters
- `published`: Set to `true` to make visible, `false` for "coming soon"
- `isFree`: Set `true` for free chapters (usually just chapter 1)

### Step 4: Add Book Cover (Optional)

Add a cover image to `public/covers/`:

```bash
# Add your image file
cp ~/Downloads/your-book-cover.jpg public/covers/your-book.jpg
```

**Recommended specs:**
- Format: JPG or PNG
- Dimensions: 400x600px (2:3 aspect ratio)
- Size: Under 200KB

If you don't have a cover, the app will show a default book icon 📖

### Step 5: Test Your Book

Restart your dev server:

```bash
npm run dev
```

Visit `http://localhost:3000` and you should see your new book!

---

## ➕ Adding Chapters to Existing Books

### Step 1: Create the Chapter File

```bash
# Create new chapter markdown file
touch content/books/existing-book/chapter-4.md
```

### Step 2: Update `books.json`

Find your book in `books.json` and:

1. **Increase `chapterCount`:**
   ```json
   "chapterCount": 4,  // was 3
   ```

2. **Add chapter to `chapters` array:**
   ```json
   "chapters": [
     // ... existing chapters ...
     {
       "chapterNumber": 4,
       "title": "New Chapter Title",
       "slug": "chapter-4",
       "isFree": false
     }
   ]
   ```

### Step 3: Restart and Test

```bash
npm run dev
```

---

## 🎨 Chapter Markdown Tips

### Use Consistent Formatting

Your chapters will look best if you follow this structure:

```markdown
# MAIN TITLE
## Subtitle

---

## 🎯 Section with Icon

### Subsection

**Bold important points**

*Italicize for emphasis*

---

## Another Section

### Bullet points work great:
- Point one
- Point two
- Point three

### Numbered lists for steps:
1. First step
2. Second step
3. Third step

---

## Code blocks (if needed):

```javascript
const example = "code here";
```

---

## Blockquotes for key insights:

> "Powerful quote or key takeaway that stands out from the rest of the text."

---

## Tables work too:

| Concept | Before | After |
|---------|--------|-------|
| Mindset | Fixed  | Growth |
```

### Emojis Add Visual Interest

Use emojis to make sections more engaging:
- 🎯 Core concepts
- 💡 Insights
- 🔥 Transformations
- 💪 Action steps
- ✅ Checklists
- 🚀 Next steps

---

## 📊 Example: Complete Book Structure

Here's how to structure a complete book:

```
content/books/atomic-habits/
├── chapter-1.md   (FREE - The Fundamentals)
├── chapter-2.md   (PAID - How Your Habits Shape Your Identity)
├── chapter-3.md   (PAID - How to Build Better Habits)
└── chapter-4.md   (PAID - Make It Easy)
```

And in `books.json`:

```json
{
  "id": "atomic-habits",
  "title": "Atomic Habits",
  "author": "James Clear",
  "description": "An easy & proven way to build good habits & break bad ones.",
  "coverImage": "/covers/atomic-habits.jpg",
  "slug": "atomic-habits",
  "chapterCount": 4,
  "published": true,
  "chapters": [
    {
      "chapterNumber": 1,
      "title": "The Fundamentals",
      "slug": "chapter-1",
      "isFree": true
    },
    {
      "chapterNumber": 2,
      "title": "How Your Habits Shape Your Identity",
      "slug": "chapter-2",
      "isFree": false
    },
    {
      "chapterNumber": 3,
      "title": "How to Build Better Habits",
      "slug": "chapter-3",
      "isFree": false
    },
    {
      "chapterNumber": 4,
      "title": "Make It Easy",
      "slug": "chapter-4",
      "isFree": false
    }
  ]
}
```

---

## 🚀 Publishing Strategy

### For MVP Launch:

1. **Start with 1-2 complete books** (5-10 chapters each)
2. **Make chapter 1 free** for each book (teaser)
3. **Keep 3-4 books as "Coming Soon"** (social proof)
4. **Add new chapters weekly** (keep users engaged)

### Content Schedule Example:

- **Week 1:** Launch with 2 books, 5 chapters each
- **Week 2:** Add 2 new chapters
- **Week 3:** Add 1 new book
- **Week 4:** Add 3 more chapters to existing books

This keeps users coming back and justifies the founding member price!

---

## 🔧 Troubleshooting

### Book not showing up?

1. Check `published` is `true` in `books.json`
2. Verify `id` and `slug` match folder name
3. Restart dev server (`npm run dev`)

### Chapter not loading?

1. Check filename matches `slug` in `books.json`
2. Verify markdown file has content
3. Check file extension is `.md`

### Images not loading?

1. Verify image is in `public/covers/`
2. Check `coverImage` path starts with `/covers/`
3. Clear browser cache

---

## 💡 Pro Tips

### 1. Write Chapters in Batches
Write 5-10 chapters at once, then schedule releases

### 2. Use Templates
Copy the structure from `100M_Offers_Chapter_1.md` as a starting point

### 3. Test Before Publishing
Set `published: false` to preview without making live

### 4. Consistent Voice
Keep the teaching style consistent across chapters

### 5. Length Sweet Spot
Aim for 5-10 minute read time (1500-2500 words)

---

## 📝 Quick Reference Checklist

When adding a new book:

- [ ] Create folder in `content/books/`
- [ ] Create chapter markdown files
- [ ] Update `books.json` with metadata
- [ ] Add cover image to `public/covers/`
- [ ] Set chapter 1 as `isFree: true`
- [ ] Set `published: true` when ready
- [ ] Restart dev server
- [ ] Test on localhost
- [ ] Deploy to production

---

## 🎉 You're Ready!

You now know how to add unlimited books and chapters to your learning platform. Start with quality over quantity - one amazing book is better than five mediocre ones!

**Questions?** Check the main README.md or SETUP.md files.
