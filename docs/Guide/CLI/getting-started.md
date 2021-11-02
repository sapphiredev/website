---
title: Getting Started
sidebar_position: 1
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## Installation

```bash npm2yarn2pnpm
npm install @sapphire/cli -g
```

:::caution

You can install the CLI as a devDependency, but we recommend installing it globally.

:::

<details>
<summary>New project</summary>

## Creating a bot

```bash
$ sapphire new
```

Run this command to start.

```bash {2}
$ sapphire new
? What's the name of your project? › my-sapphire-bot
```

Choose a name for your project, that will also be the folder name for your project. Defaults to `my-sapphire-bot`.

```bash {3-5}
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
? Choose a language for your project › - Use arrow-keys. Return to submit.
❯   TypeScript (Recommended)
    JavaScript
```

Choose a language for your project, we will choose **TypeScript** in this guide.

```bash {4-6}
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
✔ Choose a language for your project › TypeScript (Recommended)
? Choose a template for your project › - Use arrow-keys. Return to submit.
❯   Default template (Recommended)
    with Docker
```

Choose a template for your project, we will go with the **default template** in this guide.

```bash {5-7}
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
✔ Choose a language for your project › TypeScript (Recommended)
✔ Choose a template for your project › Default template (Recommended)
? What format do you want your config file to be in? › - Use arrow-keys. Return to submit.
    JSON
❯   YAML
```

Choose a format for your config file, we will choose **YAML** in this guide. This config file is for Sapphire CLI, read
more about it here.

```bash {6-8}
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
✔ Choose a language for your project › TypeScript (Recommended)
✔ Choose a template for your project › Default template (Recommended)
✔ What format do you want your config file to be in? › YAML
? What package manager do you want to use? › - Use arrow-keys. Return to submit.
❯   Yarn (Recommended)
    npm
```

Choose a package manager for your project, we will choose **Yarn** in this guide.

```bash {7}
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
✔ Choose a language for your project › TypeScript (Recommended)
✔ Choose a template for your project › Default template (Recommended)
✔ What format do you want your config file to be in? › YAML
✔ What package manager do you want to use? › Yarn (Recommended)
? Do you want to create a git repository for this project? › (y/N)
```

Lastly, if you want to initialize a git repository in your project, type `y` and enter. If you don't want a git
repository in your project, just enter.

Now wait for the CLI to create your project and install the dependencies. This should take ~2 minutes.

```bash
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
✔ Choose a language for your project › TypeScript (Recommended)
✔ Choose a template for your project › Default template (Recommended)
✔ What format do you want your config file to be in? › YAML
✔ What package manager do you want to use? › Yarn (Recommended)
✔ Do you want to create a git repository for this project? … no
✔ Cloning the repository
✔ Setting up the project
✔ Installing dependencies using Yarn
Done!
```

Congratulations, you created a bot using Sapphire CLI. Read the README to see what you need to do before running it.

<Tabs>
<TabItem value="bash" label="Bash" default>

```bash
$ cat my-sapphire-bot/README.md
# TypeScript Sapphire Bot example

This is a basic setup of a Discord bot using the [sapphire framework][sapphire] written in TypeScript
...
```

</TabItem>

<TabItem value="ps1" label="Powershell">

```bash
$ Get-Content .\my-sapphire-bot\README.md
# TypeScript Sapphire Bot example

This is a basic setup of a Discord bot using the [sapphire framework][sapphire] written in TypeScript
...
```

</TabItem>

<TabItem value="commandprompt" label="CMD">

```bash
$ type my-sapphire-bot\README.md
# TypeScript Sapphire Bot example

This is a basic setup of a Discord bot using the [sapphire framework][sapphire] written in TypeScript
...
```

</TabItem>
</Tabs>

</details>

<details>
<summary> Existing project </summary>

## Using Sapphire CLI on an existing project

```shell
$ sapphire init
```

Run this command to start.

```shell {2-4}
$ sapphire init
? What format do you want your config file to be in? › - Use arrow-keys. Return to submit.
    JSON
❯   YAML
```

Choose a format for your config file, we will choose **YAML** in this guide. This config file is for Sapphire CLI, read
more about it here.

```shell {3-5}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
? Choose the language used in your project › - Use arrow-keys. Return to submit.
❯   TypeScript
    JavaScript
```

Choose the language you are using in your project, we are using **TypeScript** in this one, so we will go with it.

```shell {4}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
? Your base directory › src
```

Enter your base directory, where your project's entry point is located, defaults to `src`.

```shell {5}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
? Where do you store your commands? (do not include the base) › commands
```

Enter your commands directory, where your commands are located (don't include the base), defaults to `commands`.

```shell {6}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
✔ Where do you store your commands? (do not include the base) … commands
? Where do you store your listeners? (do not include the base) › listeners
```

Enter your listeners directory, where your listeners are located (don't include the base), defaults to `listeners`.

```shell {7}
$ sapphire init
✔ What format do you want your config file to be in? › YAML
✔ Choose the language used in your project › TypeScript
✔ Your base directory … src
✔ Where do you store your commands? (do not include the base) … commands
✔ Where do you store your listeners? (do not include the base) … listeners
? Where do you store your arguments? (do not include the base) › arguments
```

Enter your arguments directory, where your arguments are located (don't include the base), defaults to `arguments`.

```shell {8}
sapphire init
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

```bash {9}
sapphire init
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

```bash
sapphire init
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

</details>
