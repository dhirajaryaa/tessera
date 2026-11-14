# Component Catalog

Tessera includes 14 foundational UI components. Every component is built with plain React, TypeScript, Tailwind CSS v4 classes, and CSS custom properties.

---

## 1. Button

- **Category:** Actions
- **Description:** Interactive control that triggers an action or initiates a workflow.

### Guidance
- **Use when:** Triggering form submissions, opening dialogs, confirming destructive actions, or performing discrete page tasks.
- **Don't use when:** Navigating to an external URL or separate route without performing an action. Use an HTML anchor tag `<a>` or Next.js `<Link>` instead.

### Code Example
```tsx
import { Button } from "@/components/tessera/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="solid">Primary Action</Button>
      <Button variant="soft">Soft Button</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link Style</Button>
      <Button variant="solid" loading>Processing</Button>
    </div>
  );
}
```

---

## 2. Badge

- **Category:** Feedback & Metadata
- **Description:** Compact visual tag used to highlight statuses, labels, or counts.

### Guidance
- **Use when:** Labeling item statuses (draft, published, archived), displaying notification quantities, or tagging content categories.
- **Don't use when:** The element needs to trigger a primary action. Use a button or pill filter button instead.

### Code Example
```tsx
import { Badge } from "@/components/tessera/badge";

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge tone="neutral">Draft</Badge>
      <Badge tone="accent" dot>Active</Badge>
      <Badge tone="success">Paid</Badge>
      <Badge tone="warning">Pending</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="outline">Archived</Badge>
    </div>
  );
}
```

---

## 3. Input

- **Category:** Data Entry
- **Description:** Single-line text input field paired with the Field wrapper for labels, helper text, and validation messages.

### Guidance
- **Use when:** Collecting single lines of user input like names, email addresses, search queries, or passwords.
- **Don't use when:** The user must enter multiple paragraphs or multiline content. Use Textarea instead.

### Code Example
```tsx
import { Field, Input } from "@/components/tessera/input";

export function InputDemo() {
  return (
    <Field
      label="Work Email"
      htmlFor="work-email"
      hint="We will send your verification code here."
    >
      <Input
        id="work-email"
        type="email"
        placeholder="colleague@domain.com"
      />
    </Field>
  );
}
```

---

## 4. Textarea

- **Category:** Data Entry
- **Description:** Multi-line text field with consistent borders, focused styling, and custom row dimensions.

### Guidance
- **Use when:** Collecting long-form responses, descriptions, markdown source, or feedback.
- **Don't use when:** Capturing short strings or single data fields. Use Input instead.

### Code Example
```tsx
import { Textarea } from "@/components/tessera/textarea";

export function TextareaDemo() {
  return (
    <Textarea
      rows={5}
      placeholder="Briefly describe your objectives..."
    />
  );
}
```

---

## 5. Select

- **Category:** Data Entry
- **Description:** Dropdown selector built upon native HTML select mechanics with custom chevron styling.

### Guidance
- **Use when:** Users must select one option from a fixed list of items using accessible native browser dropdown menus.
- **Don't use when:** There are only two or three mutually exclusive options. Use segmented buttons, radio items, or a Switch instead.

### Code Example
```tsx
import { Select } from "@/components/tessera/select";

export function SelectDemo() {
  return (
    <Select defaultValue="us-east">
      <option value="us-east">US East (N. Virginia)</option>
      <option value="eu-central">EU Central (Frankfurt)</option>
      <option value="ap-south">Asia Pacific (Mumbai)</option>
    </Select>
  );
}
```

---

## 6. Checkbox

- **Category:** Data Entry
- **Description:** Accessible boolean selection control using native input mechanics and a square-ish checkmark.

### Guidance
- **Use when:** Toggling optional terms, agreeing to policies, or selecting multiple items from a table or list.
- **Don't use when:** The change takes effect immediately without requiring an explicit save or form submission. Use Switch instead.

### Code Example
```tsx
import { Checkbox } from "@/components/tessera/checkbox";

export function CheckboxDemo() {
  return (
    <Checkbox
      id="agree-terms"
      label="Accept terms and conditions"
      description="You agree to our privacy policy and terms."
      defaultChecked
    />
  );
}
```

---

## 7. Switch

- **Category:** Data Entry
- **Description:** Interactive toggle control that shifts immediately between on and off states.

### Guidance
- **Use when:** Toggling an instantaneous application setting, such as notifications, privacy flags, or live features.
- **Don't use when:** The setting is part of a multi-field form that requires clicking a Submit button. Use Checkbox instead.

### Code Example
```tsx
import { useState } from "react";
import { Switch } from "@/components/tessera/switch";

export function SwitchDemo() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Switch
      label="Push Notifications"
      checked={notifications}
      onCheckedChange={setNotifications}
    />
  );
}
```

---

## 8. Card

- **Category:** Layout & Surfaces
- **Description:** Visual surface container for grouping related content, actions, and media.

### Guidance
- **Use when:** Creating distinct content clusters, summary widgets, feed items, or configuration panels.
- **Don't use when:** Grouping plain inline text paragraphs. Use semantic HTML `<section>` or `<article>` tags without extra borders.

### Code Example
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/tessera/card";
import { Button } from "@/components/tessera/button";

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage Allocation</CardTitle>
        <CardDescription>Your plan includes 50 GB of storage.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-ts-muted">Currently using 14.2 GB across 3 projects.</p>
      </CardContent>
      <CardFooter>
        <Button variant="soft" size="sm">Manage Disks</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 9. Tabs

- **Category:** Navigation
- **Description:** Segmented tab panels with keyboard arrow navigation for switching between views.

### Guidance
- **Use when:** Organizing related content into mutually exclusive panels on the same page without reloading.
- **Don't use when:** The panels represent separate pages or URLs that should each have distinct browser history. Use navigation links instead.

### Code Example
```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/tessera/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Settings navigation">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-ts-ink">System status is operational.</p>
      </TabsContent>
      <TabsContent value="activity">
        <p className="text-sm text-ts-muted">No recent logs reported.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-ts-muted">Workspace configuration settings.</p>
      </TabsContent>
    </Tabs>
  );
}
```

---

## 10. Dialog

- **Category:** Overlays
- **Description:** Accessible modal dialog window that overlays page content, traps keyboard focus, and halts background interaction.

### Guidance
- **Use when:** Requiring immediate user intervention, confirmation of destructive steps, or focused sub-tasks.
- **Don't use when:** Presenting non-critical notifications or supplementary information that does not require immediate attention. Use Toast or Card instead.

### Code Example
```tsx
import { Dialog, DialogClose } from "@/components/tessera/dialog";
import { Button } from "@/components/tessera/button";

export function DialogDemo() {
  return (
    <Dialog
      title="Confirm Deletion"
      description="This action cannot be undone. All repository data will be removed immediately."
      trigger={<Button variant="outline">Delete Repository</Button>}
      footer={
        <>
          <DialogClose className="h-9 px-3 text-[13.5px] font-semibold text-ts-muted hover:text-ts-ink">
            Cancel
          </DialogClose>
          <Button variant="solid">Confirm Delete</Button>
        </>
      }
    >
      <p className="text-sm text-ts-muted">All branch history will be permanently deleted.</p>
    </Dialog>
  );
}
```

---

## 11. Toast

- **Category:** Feedback & Overlays
- **Description:** Temporary, non-disruptive feedback message triggered imperatively via custom React hook.

### Guidance
- **Use when:** Confirming the result of an asynchronous action (e.g., "Changes saved", "File uploaded", "Link copied").
- **Don't use when:** Delivering critical error states that require immediate user correction before continuing. Use Dialog or inline form errors instead.

### Code Example
```tsx
import { Button } from "@/components/tessera/button";
import { useToast } from "@/components/tessera/toast";

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "API Key Created",
          description: "Key copied to clipboard.",
          tone: "success",
        });
      }}
    >
      Generate API Key
    </Button>
  );
}
```

---

## 12. Accordion

- **Category:** Layout & Surfaces
- **Description:** Vertically stacked list of headers that expand or collapse associated content sections.

### Guidance
- **Use when:** Presenting frequently asked questions, detailed specifications, or long secondary reference documentation.
- **Don't use when:** Users need to read all the content simultaneously without clicking. Use standard vertical headings instead.

### Code Example
```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/tessera/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>What makes Tessera different?</AccordionTrigger>
        <AccordionContent>
          Tessera gives you complete source code ownership with zero runtime library dependencies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I alter the theme colors?</AccordionTrigger>
        <AccordionContent>
          Yes. All colors map to 17 CSS custom properties that you can modify in tessera.css.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

---

## 13. Avatar

- **Category:** Identity
- **Description:** Visual representation of an individual user, account, or team with fallback initials.

### Guidance
- **Use when:** Displaying user profile photos in headers, comment threads, team lists, or author bylines.
- **Don't use when:** Showing decorative non-user imagery or product screenshots. Use standard HTML `<img>` elements instead.

### Code Example
```tsx
import { Avatar, AvatarGroup } from "@/components/tessera/avatar";

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
        alt="Elena Rostova"
        fallback="ER"
        size="md"
      />
      <Avatar alt="Dhiraj Arya" fallback="DA" size="md" />
      <AvatarGroup>
        <Avatar alt="Alice" fallback="A" size="sm" />
        <Avatar alt="Bob" fallback="B" size="sm" />
      </AvatarGroup>
    </div>
  );
}
```

---

## 14. Theme Switcher

- **Category:** Theming
- **Description:** Control that switches between paper, ink, moss, and system themes using four geometric tile glyphs.

### Guidance
- **Use when:** Providing end users with immediate control over the visual appearance of the application.
- **Don't use when:** Your application strictly requires a single non-switchable brand color palette.

### Code Example
```tsx
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";

export function NavigationBar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-ts-line bg-ts-surface">
      <div className="font-semibold text-ts-ink">Documentation</div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher variant="menu" align="right" />
        <ThemeSwitcher variant="rail" />
      </div>
    </nav>
  );
}
```
