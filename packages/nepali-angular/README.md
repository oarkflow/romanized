# @verishore/nepali-angular

Angular directives for Nepali input with instant romanized-to-Devanagari transliteration.

## Installation

```bash
npm install @verishore/nepali-angular
# or
pnpm add @verishore/nepali-angular
```

## Quick Start

```typescript
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NepaliInputDirective, NepaliTextareaDirective } from '@verishore/nepali-angular'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NepaliInputDirective, NepaliTextareaDirective],
  template: `
    <input nepaliInput [(ngModel)]="value" placeholder="Type in Nepali..." />
    <textarea nepaliTextarea [(ngModel)]="text" rows="5"></textarea>
  `
})
export class AppComponent {
  value = ''
  text = ''
}
```

## Directives

- **nepaliInput**: Directive for single-line input with instant conversion
- **nepaliTextarea**: Directive for multi-line textarea with instant conversion

Both directives:
- Support Angular forms (ngModel, Reactive Forms)
- Implement ControlValueAccessor
- Support `[useDevanagariDigits]` input
- Emit `(valueChange)` events

See [full documentation](../../FRAMEWORK_INTEGRATION.md#angular) for detailed API and examples.

## License

MIT © Verishore
