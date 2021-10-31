---
title: Getting Started
sidebar_position: 1
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Getting Started

## Installation

<Tabs groupId="packageManagers">
<TabItem value="yarn" label="Yarn (Recommended)" default>

```shell:no-line-numbers
$ yarn global add @sapphire/cli
```

</TabItem>

<TabItem value="npm" label="NPM">

```shell:no-line-numbers
$ npm install @sapphire/cli -g
```

</TabItem>
</Tabs>

:::caution

You can install the CLI as a devDependency, but we recommend installing it globally.

:::

## Creating a bot

:::note

If you want to use the CLI on an existing project, skip this part.

:::

```shell:no-line-numbers
$ sapphire new
```

Run this command to start.

```shell:no-line-numbers{2}
$ sapphire new
? What's the name of your project? › my-sapphire-bot
```

Choose a name for your project, that will also be the folder name for your project. Defaults to `my-sapphire-bot`.

```shell:no-line-numbers{3-5}
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
? Choose a language for your project › - Use arrow-keys. Return to submit.
❯   TypeScript (Recommended)
    JavaScript
```

Choose a language for your project, we will choose **TypeScript** in this guide.

```shell:no-line-numbers{4-6}
$ sapphire new
✔ What's the name of your project? … my-sapphire-bot
✔ Choose a language for your project › TypeScript (Recommended)
? Choose a template for your project › - Use arrow-keys. Return to submit.
❯   Default template (Recommended)
    with Docker
```

Choose a template for your project, we will go with the **default template** in this guide.

```shell:no-line-numbers{5-7}
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

```shell:no-line-numbers{6-8}
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

```shell:no-line-numbers{7}
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

```shell:no-line-numbers
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

```shell:no-line-numbers
$ cat my-sapphire-bot/README.md
# TypeScript Sapphire Bot example

This is a basic setup of a Discord bot using the [sapphire framework][sapphire] written in TypeScript
...
```

</TabItem>

<TabItem value="ps1" label="Powershell">

```shell:no-line-numbers
$ Get-Content .\my-sapphire-bot\README.md
# TypeScript Sapphire Bot example

This is a basic setup of a Discord bot using the [sapphire framework][sapphire] written in TypeScript
...
```

</TabItem>

<TabItem value="commandprompt" label="CMD">

```shell:no-line-numbers
$ type my-sapphire-bot\README.md
# TypeScript Sapphire Bot example

This is a basic setup of a Discord bot using the [sapphire framework][sapphire] written in TypeScript
...
```

</TabItem>
</Tabs>