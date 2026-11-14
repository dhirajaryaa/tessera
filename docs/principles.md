# Principles

Tessera is small on purpose. These are the rules behind the set. They apply to the documentation, the examples and any component added later.

## Copy in, own it

A component lands in your repository as a plain file. You can read it, rename it, split it or delete it. There is no runtime package, no wrapper and no version lock. If you need a different prop, edit the file. If the change would help every project, send it upstream.

## Tokens, not classes

Every surface, line, text, radius, font and shadow comes from a `--ts-*` variable. No palette classes such as `bg-zinc-900` or `text-blue-600`.

- Backgrounds: `--ts-bg`, `--ts-surface`, `--ts-surface-2`
- Text: `--ts-ink`, `--ts-muted`
- Borders: `--ts-line`, `--ts-line-strong`
- Accent: `--ts-accent`, `--ts-accent-hover`, `--ts-accent-ink`
- State: `--ts-success`, `--ts-warning`, `--ts-danger`
- Shape and type: `--ts-radius`, `--ts-font-sans`, `--ts-font-mono`, `--ts-font-display`, `--ts-shadow`

## One accent

`--ts-accent` is for the primary action, the active indicator and the focus ring. It is not a decoration budget. Two solid buttons in one row means the hierarchy is not finished.

Success, warning and danger exist for status. They are not secondary accents.

## Small radius

The default radius is `8px`. It reads as a tile: square enough to think, soft enough not to feel like a spreadsheet. No pill buttons, no pill cards. Circles are for avatars and status dots.

## Boring on purpose

Native HTML, plain React state, Tailwind v4. No Radix, Headless UI, React Aria or CVA. Any developer should be able to open a component and understand it in two minutes.

## Accessibility floor

- Keyboard access and visible focus on every interactive element.
- Dialogs trap focus, close on Escape and restore focus to the trigger.
- Tabs use arrow keys, Home and End, with one tabbable trigger.
- Accordion triggers expose `aria-expanded` and `aria-controls`.
- Menu items use `menuitemradio`.
- Status colour is paired with a word.
- Touch targets on primary actions reach 44px.
- Motion stops when the system asks for reduced motion.

## When to reach for a part

- The action has a consequence. Use one solid button.
- The setting applies at once. Use a switch, not a checkbox.
- One object needs a quiet frame. Use a card.
- The same object has two to five peer views. Use tabs.
- A decision needs focus. Use a dialog.
- A state has a short name. Use a badge.

## When to leave it out

- The layout looks empty. Space is a material.
- A competitor has one. A date picker, combobox or data table is not in the kit.
- A toast would be the only record of a failure. Put the error next to the field.
- The theme should carry the brand. Change the tokens.
- The shape is a habit. No pills.
- A wrapper would be tidier. Edit the file instead.

The shortest version: if you cannot name the user action a part supports in one sentence, it is decoration. Remove it.

## Adding a new part

A new component belongs in the registry when it repeats across projects and the interaction is general enough to survive a second context.

1. Can it be composed from the existing parts? Do that.
2. Does it need a new dependency? Justify it, and prefer native HTML.
3. Is the keyboard model clear without reading the source?
4. Does it read correctly in Paper, Ink and Moss?
5. Would you be comfortable if a stranger deleted every line of it?

If the answers hold, read [CONTRIBUTING.md](../CONTRIBUTING.md).

## Writing

- Labels name the outcome: Save changes, Send invite, Delete project.
- Errors say what happened and what to do next.
- Empty states are a sentence, not a mascot.
- No exclamation marks. No cheerful filler. No em dashes in body copy.
- A number gets a unit. A date gets a timezone when it matters.
