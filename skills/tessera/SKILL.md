---
name: tessera
description: Use and customize Tessera UI components, theming tokens, and copy-paste React patterns in projects using Tailwind CSS v4.
---

# Tessera Skill

Use this skill when installing, modifying, or composing Tessera components in React applications.

## When to Use

- When building web applications with React 18+ or Next.js App Router and Tailwind CSS v4.
- When an application requires full ownership of component source code without runtime library lock-in.
- When an editorial, warm design system (bone paper, carbon ink, moss green, vermilion accent) is preferred over generic SaaS aesthetics.
- When you need accessible UI primitives without the bundle overhead of Radix UI or CVA.

## Installation

Run the CLI command to initialize Tessera in a repository:

```bash
npx github:dhirajaryaa/tessera@main init
```

Add components from the registry:

```bash
npx github:dhirajaryaa/tessera@main add button dialog toast
npx github:dhirajaryaa/tessera@main list
```

Ensure `globals.css` imports Tailwind and the theme stylesheet:

```css
@import "tailwindcss";
@import "./tessera.css";
```

Ensure root `<html>` tag sets the theme: `<html data-theme="paper">`.

## Decision Rules

1. **Tokens Over Classes:** Never write hardcoded colors such as `bg-zinc-900` or `text-blue-500`. Always use CSS variables: `bg-ts-surface`, `text-ts-ink`, `border-ts-line`, `text-ts-muted`.
2. **One Accent Rule:** `--ts-accent` is reserved for primary actions (`variant="solid"`), active tabs, switch handles, and keyboard focus outlines. Do not color secondary or tertiary buttons with the accent color.
3. **Small Geometry:** Keep border radius controlled (`var(--ts-radius)` or `rounded-ts`). Tessera uses architectural tile shapes. Do not use rounded pill shapes except for status dots and circular avatars.
4. **No External Runtime Libraries:** Do not install Radix, Headless UI, or CVA. Rely on standard HTML elements (`<dialog>`, native `<select>`, native `<input type="checkbox">`, `<details>`).
5. **Tile Theme Glyphs:** The theme switcher uses four custom geometric tile glyphs (paper, ink, moss, auto). Never replace them with sun or moon icons.

## Component Cheat Sheet

### 1. Button
Variants: `solid` (accent), `soft`, `outline`, `ghost`, `link`. Sizes: `sm`, `md`, `lg`, `icon`.
```tsx
import { Button } from "@/components/tessera/button";
<Button variant="solid" size="md">Save Changes</Button>
<Button variant="soft" size="sm">Cancel</Button>
```

### 2. Badge
Tones: `neutral`, `accent`, `outline`, `success`, `warning`, `danger`. Dot indicator: `dot`.
```tsx
import { Badge } from "@/components/tessera/badge";
<Badge tone="accent" dot>Draft</Badge>
```

### 3. Input and Field
Wrap inputs with `Field` to provide label, hint, and error message.
```tsx
import { Field, Input } from "@/components/tessera/input";
<Field label="Email" hint="Receipts only." htmlFor="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</Field>
```

### 4. Textarea
Multiline text field with auto or fixed height.
```tsx
import { Textarea } from "@/components/tessera/textarea";
<Textarea id="notes" rows={4} placeholder="Project notes..." />
```

### 5. Select
Accessible dropdown using styled native select options.
```tsx
import { Select } from "@/components/tessera/select";
<Select defaultValue="studio">
  <option value="starter">Starter</option>
  <option value="studio">Studio</option>
</Select>
```

### 6. Checkbox
Accessible boolean control with label and description props.
```tsx
import { Checkbox } from "@/components/tessera/checkbox";
<Checkbox label="Send receipt" description="Sent via email." defaultChecked />
```

### 7. Switch
Sliding boolean toggle.
```tsx
import { Switch } from "@/components/tessera/switch";
<Switch label="Weekly digest" checked={enabled} onCheckedChange={setEnabled} />
```

### 8. Card
Structured surface container.
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/tessera/card";
<Card>
  <CardHeader><CardTitle>Studio Plan</CardTitle><CardDescription>Six seats included.</CardDescription></CardHeader>
  <CardContent><p className="text-ts-muted">Storage usage: 14 GB.</p></CardContent>
  <CardFooter><Button variant="solid" size="sm">Upgrade</Button></CardFooter>
</Card>
```

### 9. Tabs
Tab list with keyboard arrow navigation.
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tessera/tabs";
<Tabs defaultValue="general">
  <TabsList aria-label="Settings">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="general">General panel</TabsContent>
  <TabsContent value="billing">Billing panel</TabsContent>
</Tabs>
```

### 10. Dialog
Modal window with backdrop, focus trap, and escape key listener.
```tsx
import { Dialog, DialogClose } from "@/components/tessera/dialog";
import { Button } from "@/components/tessera/button";
<Dialog
  title="Invite Teammate"
  description="We will send an invitation link."
  trigger={<Button variant="solid">Invite</Button>}
  footer={
    <>
      <DialogClose className="h-9 px-3 text-ts-muted hover:text-ts-ink">Cancel</DialogClose>
      <Button variant="outline">Send</Button>
    </>
  }
>
  <p className="text-sm text-ts-muted">Enter member details.</p>
</Dialog>
```

### 11. Toast
Imperative notifications via provider and hook.
```tsx
import { useToast } from "@/components/tessera/toast";
const { toast } = useToast();
toast({ title: "Saved", description: "Changes stored.", tone: "success" });
```

### 12. Accordion
Collapsible disclosure panels.
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/tessera/accordion";
<Accordion type="single" collapsible defaultValue="q1">
  <AccordionItem value="q1">
    <AccordionTrigger>What is Tessera?</AccordionTrigger>
    <AccordionContent>A copy-paste UI component library.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### 13. Avatar
Profile photo with fallback initials tile and avatar grouping.
```tsx
import { Avatar, AvatarGroup } from "@/components/tessera/avatar";
<Avatar src="/user.jpg" alt="Dhiraj Arya" fallback="DA" size="md" />
```

### 14. Theme Switcher
Tile glyph theme selector available as a menu dropdown or rail control.
```tsx
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";
<ThemeSwitcher variant="menu" align="right" />
<ThemeSwitcher variant="rail" />
```

## Theme Rules

The stylesheet defines 17 tokens under `:root` and theme attributes:
- Surface: `--ts-bg`, `--ts-surface`, `--ts-surface-2`
- Typography: `--ts-ink`, `--ts-muted`, `--ts-font-sans`, `--ts-font-mono`, `--ts-font-display`
- Borders: `--ts-line`, `--ts-line-strong`, `--ts-radius`
- Accents: `--ts-accent`, `--ts-accent-hover`, `--ts-accent-ink`
- Status: `--ts-success`, `--ts-warning`, `--ts-danger`

Theme attribute choices:
- `data-theme="paper"`: warm bone light mode
- `data-theme="ink"`: warm carbon dark mode
- `data-theme="moss"`: dark green with amber accent
- `data-theme="system"`: resolves to paper or ink based on device preference

## Accessibility Checklist

- Form controls must have associated `<label>` elements via `htmlFor` or `Field`.
- Interactive elements must show visible focus rings: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ts-ink`.
- Dialogs must dismiss when pressing `Escape` and trap focus within the modal container.
- Tabs and Accordions must respond to `ArrowUp`, `ArrowDown`, `ArrowLeft`, and `ArrowRight` keys.
- Buttons must use semantic `<button>` elements, not clickable `<div>` tags.

## Common Pitfalls

- **variant="primary" is invalid:** Tessera Button uses `variant="solid"` for accent actions.
- **Badge uses tone, not variant:** Write `<Badge tone="accent">` rather than `<Badge variant="accent">`.
- **Input has no label prop:** Use the exported `Field` container component.
- **Select uses native option tags:** Pass `<option>` elements, not an options array prop.
- **Do not introduce arbitrary Tailwind color names:** Avoid `text-gray-600` or `bg-neutral-100`. Use `text-ts-muted` and `bg-ts-surface`.
- **Do not wrap components in Radix providers:** Tessera is standalone.
- **Do not omit data-theme on html:** Without `data-theme`, CSS variables will fall back to `:root` defaults, but explicit switching requires the attribute.
