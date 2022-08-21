---
title: Generating components
sidebar_position: 2
---

We can generate components using:

```bash
sapphire generate <component> <name>
```

- **component**: Component name, can be a default one or a custom one
- **name**: Name of the created component, e.g. the name of your command

Example:

```bash
sapphire generate messagecommand HelloWorld
```

## Default components

- `messagecommand`
- `slashcommand`
- `contextmenucommand`
- `listener`
- `argument`
- `precondition`
