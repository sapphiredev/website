---
sidebar_position: 2
title: Using Sapphire CLI on an existing project
---

# Using Sapphire CLI on an existing project

:::note

If you used Sapphire CLI to create your project, you can skip this.

:::

```shell:no-line-numbers
$ sapphire init
```

Run this command to start.

```shell:no-line-numbers{2-4}
$ sapphire init
? What format do you want your config file to be in? › - Use arrow-keys. Return to submit.
    JSON
❯   YAML
```

Choose a format for your config file, we will choose **YAML** in this guide. This config file is for Sapphire CLI, read
more about it here.

```shell:no-line-numbers{3-5}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
? Choose the language used in your project › - Use arrow-keys. Return to submit.
❯   TypeScript
    JavaScript
```

Choose the language you are using in your project, we are using **TypeScript** in this one, so we will go with it.

```shell:no-line-numbers{4}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
? Your base directory › src
```

Enter your base directory, where your project's entry point is located, defaults to `src`.

```shell:no-line-numbers{5}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
? Where do you store your commands? (do not include the base) › commands
```

Enter your commands directory, where your commands are located (don't include the base), defaults to `commands`.

```shell:no-line-numbers{6}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
✔ Where do you store your commands? (do not include the base) … commands
? Where do you store your listeners? (do not include the base) › listeners
```

Enter your listeners directory, where your listeners are located (don't include the base), defaults to `listeners`.

```shell:no-line-numbers{7}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
✔ Where do you store your commands? (do not include the base) … commands
✔ Where do you store your listeners? (do not include the base) … listeners
? Where do you store your arguments? (do not include the base) › arguments
```

Enter your arguments directory, where your arguments are located (don't include the base), defaults to `arguments`.

```shell:no-line-numbers{8}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
✔ Where do you store your commands? (do not include the base) … commands
✔ Where do you store your listeners? (do not include the base) … listeners
✔ Where do you store your arguments? (do not include the base) … arguments
? Where do you store your preconditions? (do not include the base) › preconditions
```

Enter your preconditions directory, where your preconditions are located (don't include the base), defaults to
`preconditions`.

```shell:no-line-numbers{9}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
✔ Where do you store your commands? (do not include the base) … commands
✔ Where do you store your listeners? (do not include the base) … listeners
✔ Where do you store your arguments? (do not include the base) … arguments
✔ Where do you store your preconditions? (do not include the base) … preconditions
? Do you want to enable custom file templates? › (y/N)
```

Choose if you want to enable custom file (piece) templates, type `y` and enter if you want to enable it. If you don't
want to enable it, just enter.

```shell:no-line-numbers
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
✔ Where do you store your commands? (do not include the base) … commands
✔ Where do you store your listeners? (do not include the base) … listeners
✔ Where do you store your arguments? (do not include the base) … arguments
✔ Where do you store your preconditions? (do not include the base) … preconditions
✔ Do you want to enable custom file templates? … no
```

Done! Now you can use Sapphire CLI in your project. 🎉
