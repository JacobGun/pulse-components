# WRP-02B: Wrapper generation decision

**Status:** Draft
**Scope:** Metadata-driven framework integration for `@pulse/web`
**Related roadmap work:** WRP-01, WRP-02A, WRP-02B, WRP-06
**Evidence:** Custom Elements Manifest analysis, React generation prototypes, and Vue consumer validation with Button and Checkbox

## Decision

Use Custom Elements Manifest as the metadata source for generated framework integration artifacts.

Do not hand-maintain repetitive metadata, registration, property, event, slot, or type information where it can be derived reliably from the manifest.

Do not assume that every framework requires runtime component wrappers.

For each target framework:

1. Validate direct consumption of `@pulse/web`.
2. Generate only the integration artifacts that the framework demonstrably needs.
3. Keep component behavior, accessibility, styling, events, slots, and form semantics in `@pulse/web`.
4. Use a small framework-specific conventions layer for exceptions that cannot be derived mechanically.
5. Keep documentation separate from generated bindings.

## Evidence from React generation

Button and Checkbox were used to prototype React bindings generated from the Custom Elements Manifest.

The manifest supplied enough metadata to identify:

- custom-element tags;
- element classes;
- direct and inherited public properties;
- property types;
- corresponding HTML attributes;
- events and event types;
- default and named slots;
- form-associated behavior;
- superclass and mixin information.

React still requires framework-specific event naming, such as:

```text
beforeinput -> onBeforeInput
input       -> onInput
change      -> onChange
click       -> onClick
invalid     -> onInvalid
```

The React output therefore supports the pattern:

```text
generated component metadata
+
small React conventions layer
```

Public type re-exports, documentation, and exceptional component semantics are not fully determined by the manifest and require explicit handling.

## Evidence from Vue consumer validation

A Vue 3 and Vite experiment was created under:

```text
experiments/vue-button
```

The experiment consumes the local `@pulse/web` package directly.

### Required Vue configuration

Vue must be configured to treat Pulse elements as custom elements:

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("m3e-"),
        },
      },
    }),
  ],
});
```

This is framework configuration rather than a component wrapper.

### Button result

`m3e-button` was validated with:

- direct import from `@pulse/web/button`;
- string properties;
- reactive boolean property binding;
- native click-event handling;
- default-slot content;
- TypeScript compilation;
- production Vite build;
- runtime rendering and interaction.

Representative usage:

```vue
<m3e-button
  variant="filled"
  size="md"
  :disabled="disabled"
  @click="handleClick"
>
  Vue clicked {{ clickCount }} times
</m3e-button>
```

No Vue runtime wrapper was required.

### Checkbox result

`m3e-checkbox` was validated with:

- direct import from `@pulse/web/checkbox`;
- boolean checked state;
- native events;
- default-slot content;
- Vue `v-model`;
- TypeScript compilation;
- production Vite build;
- runtime state synchronization.

Representative usage:

```vue
<m3e-checkbox v-model="checked">
  Pulse checkbox
</m3e-checkbox>
```

The visual checked state and Vue state remained synchronized.

No custom `modelValue` adapter or Vue runtime wrapper was required for the tested Checkbox contract.

### Dialog result

`m3e-dialog` was validated with:

- direct import from `@pulse/web/dialog`;
- a typed Vue template ref;
- direct calls to the native `show()` and `hide()` methods;
- `opening`, `opened`, `closing`, and `closed` lifecycle events;
- default content;
- named `header` and `actions` slots;
- dismissible behavior;
- keyboard focus entering the Dialog and returning after it closed;
- TypeScript compilation;
- production Vite build;
- runtime rendering and interaction;
- styling through the local `@pulse/tokens` package.

Representative usage:

```vue
<m3e-dialog
  ref="dialog"
  dismissible
  @opening="handleDialogOpening"
  @opened="handleDialogOpened"
  @closing="handleDialogClosing"
  @closed="handleDialogClosed"
>
  <span slot="header">Vue Dialog</span>

  <p>
    This dialog is consumed directly from @pulse/web.
  </p>

  <div slot="actions">
    <m3e-button @click="hideDialog">
      Close
    </m3e-button>
  </div>
</m3e-dialog>

## Generate versus handwrite

### Generate or derive

The following should be generated or mechanically derived where reliable:

- component tag and element-class identity;
- import paths when a stable mapping convention exists;
- supported public properties;
- property and event types;
- HTML attribute mappings;
- boolean-property information;
- event inventories;
- default and named slots;
- form-associated metadata;
- framework type declarations;
- registration or import manifests;
- component support inventories.

### Framework-specific conventions

The following remain framework-specific:

- React event names;
- Vue custom-element compiler configuration;
- Vue `v-model` conventions where direct binding does not work;
- Blazor event and form bridging;
- Angular binding conventions;
- ref and imperative-access conventions;
- public type re-export policies;
- component-specific convenience APIs.

These conventions should be centralized and kept small. They should not duplicate component behavior.

### Handwritten material

The following should remain handwritten and reviewed:

- usage documentation;
- accessibility guidance;
- composition guidance;
- migration guidance;
- examples for complex slot structures;
- explanations of controlled and uncontrolled usage;
- exceptional component semantics;
- decisions about the supported component inventory;
- unresolved identity mappings, including Text Field versus Form Field.

## Vue package implication

The current evidence does not justify generating runtime Vue components for every Pulse Web Component.

A future `@pulse/vue` package may primarily provide:

- TypeScript declarations;
- shared installation and configuration helpers;
- curated component imports;
- generated metadata;
- documentation and examples;
- adapters only for components where direct Vue consumption is insufficient.

The package should not be established as a complete public API until more representative components have been validated and a genuine integration gap has been identified.

## Known limitations

The current Vue evidence covers Button, Checkbox, and Dialog.

Together these validate:

- property and boolean binding;
- native DOM events;
- default and named slots;
- Vue `v-model`;
- template refs;
- imperative element APIs;
- dialog lifecycle events;
- dismiss and focus behavior;
- Pulse token consumption;
- TypeScript compilation;
- production Vite builds;
- runtime interaction.

The current validation does not yet prove:

- select or autocomplete value binding;
- complex custom-event payloads;
- constraint validation and form submission beyond Checkbox state;
- server-side rendering;
- package publication and version compatibility;
- behavior across the complete Pulse component inventory.

No tested Vue case currently demonstrates a need for a runtime component wrapper.

This is evidence for a thin Vue integration approach, not evidence that every Pulse component will work without framework-specific glue.


## Roadmap interpretation

This work contributes evidence to WRP-02B.

It does not by itself complete WRP-02B because the remaining framework exceptions and generation outputs still need to be defined and documented.

It does not mark WRP-06 complete. Product demand now exists through the Vue-based Edge Gateway implementation, but the production package scope, ownership, maintenance model, and supported component set remain unresolved.

## Current recommendation

Proceed with the following direction:

1. Keep `@pulse/web` as the canonical implementation.
2. Prefer direct Vue consumption as the default integration pattern.
3. Do not generate Vue runtime component wrappers unless a component demonstrates a concrete integration gap.
4. Generate or derive component metadata, typings, registration information, imports, events, slots, and support inventories from Custom Elements Manifest where reliable.
5. Maintain a small Vue conventions layer for compiler configuration, template-ref typing, CSS-package declarations, and any future component-specific exceptions.
6. Keep `@pulse/tokens` as a consumer-level CSS dependency rather than duplicating Pulse styling inside Vue integrations.
7. Treat Button, Checkbox, and Dialog as the initial Vue reference cases.
8. Record new Vue adapters as explicit exceptions with their technical reason rather than making wrappers the default.
9. Review the generate-versus-handwrite decision against the wrapper contract before recommending WRP-02B as Done.