# Zorro Documentation - Quick Reference

## 🚀 Quick Start

### Recommended: Markdown Format (for LLM use)

```bash
cd ~/ats/zorro-docs-mirror
./update-docs-to-markdown.sh
```

**Output locations:**
- Markdown (LLM-friendly): `~/ats/docs/06-zorro-markdown/`
- HTML (human-readable): `~/ats/docs/06-zorro/`

---

## 📋 What Gets Created

### After running the update script:

```
~/ats/docs/
├── 06-zorro/                    # HTML version (existing)
│   ├── content/*.htm            # 276 HTML documentation files
│   ├── images/                  # All images
│   ├── index.html               # Main index
│   └── doc_index.json           # Search index
│
└── 06-zorro-markdown/           # Markdown version (NEW, for LLMs)
    ├── content/*.md             # 276 Markdown documentation files
    ├── images/                  # All images (copied)
    └── index.md                 # Main index
```

---

## 🔄 Update Workflow

### Full Update (Recommended)
Downloads latest docs from zorro-project.com and converts to both formats:

```bash
cd ~/ats/zorro-docs-mirror
./update-docs-to-markdown.sh
```

**Time:** 5-10 minutes
**Downloads:** ~276 pages + images from zorro-project.com
**Creates:** HTML + Markdown versions

---

### Convert Existing HTML to Markdown
If you already have HTML docs and just want Markdown:

```bash
cd ~/ats/zorro-docs-mirror
python3 convert-to-markdown.py ~/ats/docs/06-zorro ~/ats/docs/06-zorro-markdown
```

**Time:** 1-2 minutes
**Requires:** Python3, beautifulsoup4, html2text

---

## 🎯 For Context7 Integration

You mentioned the docs are hosted on Context7. To update Context7:

1. **Download latest docs:**
   ```bash
   cd ~/ats/zorro-docs-mirror
   ./update-docs-to-markdown.sh
   ```

2. **The output is in two locations:**
   - `./zorro-docs-output/` - HTML version
   - `./zorro-docs-markdown/` - Markdown version

3. **For Context7, you'll want to:**
   - Push the updated content to your GitHub mirror repository
   - Context7 will pick up the changes automatically

---

## 💡 Usage Tips

### For Claude Code (LLM Use)
- Use Markdown version: `~/ats/docs/06-zorro-markdown/`
- Easier to parse, cleaner formatting
- Better code block handling

### For Human Reading
- Use HTML version: `~/ats/docs/06-zorro/`
- Better formatting, navigation
- Original layout preserved

### Both Versions Include
- All 276 documentation pages
- All images and diagrams
- Full offline access
- No internet required after download

---

## 🔧 Dependencies

### Node.js (for crawler)
```bash
cd ~/ats/zorro-docs-mirror
npm install
```

### Python (for conversion)
```bash
pip install beautifulsoup4 html2text lxml
```

---

## 📊 What Gets Downloaded

From https://zorro-project.com/manual/:

- **Complete API Reference** - All Zorro functions
- **Trading Strategies** - Examples and tutorials
- **Workshops** - Step-by-step learning (7 workshops)
- **Deep Learning** - Machine learning with Zorro
- **Broker Integration** - Connection guides
- **Performance Analysis** - Backtesting and optimization
- **All Images** - Diagrams, charts, screenshots

**Total:** ~276 pages, ~100 images

---

## 🎉 Result

After running the update:

```bash
# For LLM use (you/Claude)
ls ~/ats/docs/06-zorro-markdown/content/*.md | wc -l
# Should show: 276 markdown files

# For human use
ls ~/ats/docs/06-zorro/content/*.htm | wc -l
# Should show: 276 HTML files
```

Both versions are fully self-contained and work offline! 🚀
