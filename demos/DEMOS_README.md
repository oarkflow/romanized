# Romanized Nepali Demos

This directory contains demonstration projects showing different implementations of the Nepali input library.

## Demo Structure

All demos now use proper Vite + TypeScript setup instead of standalone HTML files.

### Basic Demos
- **[basic/](basic/)** - Core demo with NepaliInput, NepaliTextarea, and NepaliConverter components
  - Port: 5173
  - Run: `cd basic && pnpm dev`

- **[react/](react/)** - React framework integration
  - Port: 5174 (Note: may conflict with character-palette if running simultaneously)
  - Run: `cd react && pnpm dev`

### Phase 1: Character Demos
- **[character-palette/](character-palette/)** - Interactive character palette
  - Port: 5174
  - Run: `cd character-palette && pnpm dev`
  - Features: Search characters, click to insert, browse by category

- **[complete-character/](complete-character/)** - Character test suite
  - Port: 5175
  - Run: `cd complete-character && pnpm dev`
  - Features: Comprehensive tests for all Devanagari characters
  - View at: http://localhost:5175 (when running)

### Phase 2: Transliteration Schemes
- **[iast/](iast/)** - IAST transliteration demo
  - Port: 5176
  - Run: `cd iast && pnpm dev`
  - Features: IAST to Devanagari conversion with examples
  - View at: http://localhost:5176 (when running)

- **[all-schemes/](all-schemes/)** - All schemes comparison
  - Port: 5177
  - Run: `cd all-schemes && pnpm dev`
  - Features: Compare IAST, ISO 15919, Harvard-Kyoto, Velthuis, and SLP1
  - View at: http://localhost:5177 (when running)

## Running Demos

### Run All Demos from Root
```bash
# Install dependencies (if not already done)
pnpm install

# Run specific demo
cd demos/complete-character && pnpm dev

# Or use the workspace command
pnpm --filter complete-character-demo dev
```

### Development
Each demo has:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `index.html` - HTML entry point
- `src/main.ts` - Main TypeScript file
- `src/style.css` - Styles

### Build for Production
```bash
cd demos/<demo-name>
pnpm build
pnpm preview  # Preview production build
```

## Recent Fixes (January 27, 2026)

### Import Resolution Fixed
- Updated `pnpm-workspace.yaml` to correctly reference all demo projects
- All demos now properly resolve `@verishore/nepali-input` imports

### Character Mapping Improvements
- Added case-sensitive mappings for `M` → `ं` (anusvara)
- Added case-sensitive mappings for `H` → `ः` (visarga)
- Added standalone `~` → `ँ` (chandrabindu)
- All nukta characters (`qa`, `za`, `fa`) working correctly

## Old HTML Files (Deprecated)

The original HTML files in subdirectories are deprecated:
- `phase1-characters/character-palette-demo.html` ⚠️ Use `character-palette/` instead
- `phase1-characters/complete-character-test.html` ⚠️ Use `complete-character/` instead
- `phase2-schemes/iast-demo.html` ⚠️ Use `iast/` instead
- `phase2-schemes/all-schemes-demo.html` ⚠️ Use `all-schemes/` instead

## Migration Notes

The new demos provide:
✅ Proper TypeScript type checking
✅ Hot module replacement (HMR) for faster development
✅ Better code organization with separate files
✅ Production build optimization
✅ Consistent development experience across all demos
✅ Better IDE support and autocomplete
✅ Workspace integration with proper dependency resolution
