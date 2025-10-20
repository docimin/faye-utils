# @faye/components

A modern TypeScript component library built with React 18, TypeScript 5, and Tailwind CSS.

## Features

- 🚀 **Modern Stack**: React 18, TypeScript 5.7, Tailwind CSS 3.4
- 📦 **Optimized Bundling**: Built with tsup for fast, efficient builds
- 🎨 **Styled Components**: Pre-styled with Tailwind CSS
- 📘 **Type-Safe**: Full TypeScript support with type definitions
- 🔄 **ESM & CJS**: Supports both module formats
- 🌲 **Tree-Shakeable**: Import only what you need

## Installation

```bash
bun install @faye/utils
```

## Usage

Import components and styles in your app:

```tsx
import { Button, Card, Input } from '@faye/utils'

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="your@email.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
<Button variant="primary" size="md" onClick={() => console.log('clicked')}>
  Click Me
</Button>

<Button variant="outline" size="lg" isLoading>
  Loading...
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean

### Card

A flexible card component for content containers.

```tsx
<Card 
  header={<h2>Title</h2>}
  footer={<button>Action</button>}
  padding="md"
  hoverable
>
  Card content goes here
</Card>
```

**Props:**
- `header`: ReactNode
- `footer`: ReactNode
- `padding`: 'sm' | 'md' | 'lg'
- `hoverable`: boolean

### Input

An input component with label, validation, and helper text.

```tsx
<Input
  label="Email"
  placeholder="your@email.com"
  error="Invalid email"
  helperText="We'll never share your email"
  leftElement={<SearchIcon />}
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `size`: 'sm' | 'md' | 'lg'
- `leftElement`: ReactNode
- `rightElement`: ReactNode

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run build:watch

# Type check
npm run type-check

# Lint
npm run lint
```

## Building

The library is built using [tsup](https://tsup.egoist.dev/), which provides:
- Fast builds with esbuild
- Automatic code splitting
- TypeScript declaration files
- Source maps
- Both ESM and CJS output

## Publishing

1. Update version in `package.json`
2. Build the library: `npm run build`
3. Publish to npm: `npm publish --access public`

## Peer Dependencies

- React 18.0.0 or higher
- React DOM 18.0.0 or higher

## Optional Peer Dependencies

- @tanstack/react-query ^5.0.0 (for data fetching components)

## License

MIT

