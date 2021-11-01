---
title: Generating components
sidebar_position: 2
---

You can generate a component like that:

```bash
$ sapphire generate <component> <name>
```

- **component**: Component name, can be a default one or a custom one
- **name**: Name of the created component, e.g. the name of your command

Example:

```bash
$ sapphire generate command HelloWorld
```

## Default components

- `command`
- `listener`
- `argument`
- `precondition`

## Custom component templates

Read the next section to learn how to create and use custom templates.
