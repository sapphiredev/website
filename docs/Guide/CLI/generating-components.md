---
title: Generating components
sidebar_position: 2
---

We can generate components using:

```posix
sapphire generate <component> <name>
```

- **component**: Component name, can be a default one or a custom one
- **name**: Name of the created component, e.g. the name of your command

Example:

```posix
sapphire generate command HelloWorld
```

## Default components

- `command`
- `listener`
- `argument`
- `precondition`
