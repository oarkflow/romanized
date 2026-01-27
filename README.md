# 🇳🇵 Romanized Nepali Transliterator

**Bidirectional transliteration between Latin script and Devanagari (नेपाली)**

Type in romanized Nepali and instantly see polished देवनागरी script — or paste Nepali text to get its romanized form. Built with TypeScript, Vite, and comprehensive phonetic rules.

---

## ✨ Features

- **🔄 Bidirectional Translation**
  - **Roman → Nepali:** Type "namaste" → get "नमस्ते"
  - **Nepali → Roman:** Paste "नमस्ते" → get "namaste"
  - Toggle between modes with a single click

- **⚡ Real-time Debounced Updates**
  - Type naturally without lag or flicker
  - 180ms debounce for smooth experience

- **🎯 Intelligent Phonetic Rules**
  - Auto-halant insertion for consonant clusters
  - Context-aware consonant mapping (dh→ढ before ch/chh)
  - Vocalic vowels (ri→ऋ) for Sanskrit words
  - 1,225+ proper noun lexicon (districts, municipalities)

- **📐 Complete Character Support**
  - All vowels (short, long, diphthongs, vocalic)
  - All consonants (velar, palatal, retroflex, dental, labial)
  - Compound consonants (ksh→क्ष, tr→त्र, sw→स्व, ntr→न्त्र)
  - Diacritics (ं, ँ, ः) with m~, n~, h~ notation
  - Punctuation (danda, double-danda, period→danda)
  - Nepali numerals (०-९) with toggle

- **💾 Persistent Draft Storage**
  - localStorage saves your work automatically
  - Resume where you left off

- **📋 One-Click Copy**
  - Copy result to clipboard with fallback support

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (for development)
- **pnpm** 10+ (package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/romanized-nepali.git
cd romanized-nepali

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm run build
```

### Usage

1. **Roman to Nepali:**
   - Type romanized text: `Ma nepali bhanchu`
   - Get देवनागरी: `म नेपाली भन्छु`

2. **Nepali to Roman:**
   - Click the direction toggle (→ Nepali to Roman)
   - Paste Nepali text: `म नेपाली भन्छु`
   - Get romanized: `ma nepaali bhanchhu`

3. **Options:**
   - Toggle Nepali/Latin digits (०-९ vs 0-9)
   - Use sample phrases for quick testing

---

## 📚 Transliteration Guide

### Vowels (स्वर)

| Roman | Devanagari | Example |
|-------|------------|---------|
| a | अ / (inherent) | **ka** → क |
| aa, a: | आ / ा | **kaa** → का |
| i | इ / ि | **ki** → कि |
| ee, ii | ई / ी | **kee** → की |
| u | उ / ु | **ku** → कु |
| oo, uu | ऊ / ू | **koo** → कू |
| e, ei | ए / े | **ke** → के |
| ai | ऐ / ै | **kai** → कै |
| o, oi | ओ / ो | **ko** → को |
| au | औ / ौ | **kau** → कौ |
| ri | ऋ / ृ | **kriti** → कृति |

### Consonants (व्यञ्जन)

#### Basic Consonants
| Roman | Devanagari | Roman | Devanagari |
|-------|------------|-------|------------|
| k, q | क | kh | ख |
| g | ग | gh | घ |
| ch | च | chh | छ |
| j, z | ज | jh | झ |
| t | त | th | थ |
| d | द | dh | ध |
| n | न | ny | ञ |
| p | प | ph, fh | फ |
| b | ब | bh | भ |
| m | म | y | य |
| r | र | l | ल |
| v, w | व | s | स |
| sh | श | h | ह |

#### Retroflex (Case-Sensitive)
| Roman | Devanagari | Example |
|-------|------------|---------|
| T | ट | **Topi** → टोपी |
| Th | ठ | **Thulo** → ठुलो |
| D | ड | **Danda** → डन्ड |
| Dh | ढ | **Dhoka** → ढोका |
| N | ण | **gaN** → गण |
| Sh | ष | **viSh** → विष |

#### Compound Consonants
| Roman | Devanagari | Example |
|-------|------------|---------|
| ksh, x | क्ष | **rakshya** → रक्ष्य |
| gy, gny | ज्ञ | **gyaan** → ज्ञान |
| shr | श्र | **shraddha** → श्रद्धा |
| tr | त्र | **putra** → पुत्र |
| sw | स्व | **swatantra** → स्वतन्त्र |
| ntr | न्त्र | **loktantrik** → लोकतान्त्रिक |
| tth | त्थ | **mahatthwa** → महत्थ्व |
| ddh | द्ध | **buddha** → बुद्ध |
| ng | ङ्ग | **anga** → अङ्ग |

### Diacritics (बिन्दु)

| Roman | Devanagari | Name | Example |
|-------|------------|------|---------|
| m~, ~m, m\` | ं | Anuswara | **kam~** → कं |
| n~, ~n | ँ | Chandrabindu | **hun~** → हुँ |
| h~, ~h | ः | Visarga | **namah~** → नमः |

### Punctuation

| Roman | Devanagari | Name |
|-------|------------|------|
| . | । | Purna Biram / Danda |
| \| | । | Danda |
| \|\| | ॥ | Double Danda |

### Special Rules

1. **Auto-halant for consonant clusters:**
   - **garchu** → ग + र + ् + च + ु = गर्चु
   - No need to type halant manually

2. **Manual halant with ^:**
   - **k^sha** → क्ष
   - **r^ti** → र्ति

3. **Context-aware dh:**
   - **padhchhu** → पढ्छु (dh before ch → ढ)
   - **dhan** → धन (dh otherwise → ध)

4. **Om symbol:**
   - Type **om** in isolation → ॐ

5. **Proper noun lexicon:**
   - **Kathmandu** → काठमन्डु
   - **Pokhara** → पोखरा
   - 1,225+ cities/districts recognized

---

## 🎯 Examples

### Simple Sentences
```
Input:  Ma sita sanga boli raheko chu
Output: म सिता सङ्ग बोलि रहेको छु

Input:  Tapai lai kasto chha?
Output: तपाई लाई कस्तो छ?

Input:  Yo pustak ramro cha
Output: यो पुस्तक राम्रो छ
```

### Complex Sentences
```
Input:  Paryawaran samrakshan bhabishya ko jimmedari ho
Output: पर्यावरण संरक्षण भविष्य को जिम्मेदारी हो

Input:  Nepali shiksha pranali lai sudhaar garnu jaruri cha
Output: नेपाली शिक्षा प्रणाली लाई सुधार गर्नु जरुरी छ
```

### Reverse Translation
```
Input:  मेरो नाम सुजित हो।
Output: mero naama sujita ho|

Input:  योसाधनले देवनागरी नेपाली लाई रोमानाइज्ड मा परिवर्तन गर्छ।
Output: yosaadhanale devanaagarii nepaaalii laaii romanaai~jDa maa parivartana garchha|
```

---

## 🛠️ Architecture

### Project Structure
```
romanized/
├── src/
│   ├── transliterate.ts    # Core transliteration engine
│   ├── lexicon.ts          # 1,225+ proper noun entries
│   ├── main.ts             # UI logic and event handlers
│   ├── style.css           # Dark gradient theme
│   └── vite-env.d.ts       # TypeScript declarations
├── scripts/
│   ├── dict_source.txt     # Source lexicon (Python OrderedDict)
│   ├── build_lexicon.py    # Parse dict → JSON
│   └── generate_lexicon_ts.py  # Generate TypeScript
├── index.html              # Entry point
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── vite.config.ts          # Vite build config
```

### Core Algorithms

**Forward Transliteration (Roman → Nepali):**
1. Normalize input (NFC Unicode)
2. Try lexicon match for proper nouns
3. Match consonants (longest first)
4. Match vowels (independent or matra)
5. Auto-insert halant for consonant clusters
6. Apply context-aware rules (dh before ch)
7. Emit tokens and join output

**Reverse Transliteration (Nepali → Roman):**
1. Build reverse mappings from forward rules
2. Try lexicon match for known proper nouns
3. Match consonant clusters (longest first)
4. Detect matras and emit vowel romanization
5. Handle inherent vowel 'a' intelligently
6. Respect halant to suppress vowels
7. Convert diacritics and punctuation

---

## 🧪 Testing

The transliterator has been tested with:
- ✅ 1,225+ proper nouns (districts, municipalities)
- ✅ Complex multi-paragraph Nepali text
- ✅ Sanskrit-origin words with vocalic vowels
- ✅ All consonant clusters and diacritics
- ✅ Bidirectional conversion accuracy

### Known Limitations

1. **Romanization ambiguity:** Multiple romanizations possible for same Nepali text
2. **Inherent vowel detection:** Context-dependent in reverse mode
3. **Rare clusters:** Some uncommon Sanskrit clusters may need manual addition
4. **Homonyms:** ee/ii both map to ई in forward direction

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Expand proper noun lexicon
- Add more Sanskrit consonant clusters
- Improve reverse transliteration accuracy
- Add IAST/ISO 15919 romanization schemes
- Unit tests for edge cases

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- Based on standard Nepali romanization conventions
- Lexicon sourced from Nepal government district/municipality lists
- Inspired by Google Input Tools and traditional romanization schemes

---

**Made with ❤️ for the Nepali-speaking community**

Visit: https://github.com/yourusername/romanized-nepali
