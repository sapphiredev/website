---
sidebar_position: 3
title: Create custom component templates
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## Enable custom component templates

<Tabs groupId="config-language-choice">
<TabItem value="json" label="JSON" default>

```json {11-14}
{
  "$schema": "https://raw.githubusercontent.com/sapphiredev/cli/main/templates/schemas/.sapphirerc.scheme.json",
  "projectLanguage": "ts",
  "locations": {
    "base": "src",
    "arguments": "arguments",
    "commands": "commands",
    "listeners": "listeners",
    "preconditions": "preconditions"
  },
  "customFileTemplates": {
    "enabled": true,
    "location": "templates"
  }
}
```

</TabItem>

<TabItem value="yaml" label="YAML">

```yaml {8-10}
projectLanguage: ts
locations:
  base: src
  arguments: arguments
  commands: commands
  listeners: listeners
  preconditions: preconditions
customFileTemplates:
  enabled: true
  location: 'templates'
```

</TabItem>
</Tabs>

:::note

If you use JSON, our schema allows your text editor to provide automatic completions.

:::

- **customFileTemplates.enabled**: Enables/disables custom component templates
- **customFileTemplates.location**: The location of your templates

## Create a template

- Create a file with a name like this in your custom template directory: `<templateName>.<language>.sapphire` (e.g
  `command.ts.sapphire`). If you make its name same as one of the default templates, your template will override the
  default one.
- Template's have 2 parts, config and the template, separated with `---`.
- We first need to type the config:

```json
{
  "category": "commands"
}
```

`category` is the category of that template, CLI uses it to know where to create the component by finding that
category's location from the `locations` field in your `.sapphirerc` file. You can create your own categories. Default
categories are: `commands`, `listeners`, `arguments`, `preconditions`. This example uses the `commands` category.

- Now we add the separator.

```
{
  "category": "commands"
}
---
```

- And the last part, we add the template.

```
{
  "category": "commands"
}
---
import { ApplyOptions } from '@sapphire/decorators';
import { MyExtendedCommand } from './somewhere';
import { Message } from 'discord.js';

@ApplyOptions<MyExtendedCommand.Options>({
	description: 'A basic command'
})
export class {{name}}Command extends MyExtendedCommand {
	public async messageRun(message: Message) {
		return message.channel.send('Hello world!');
	}
}

```

If you look at the name of the class, you will see it includes `{{name}}`, this is the component's name and it is
replaced with that name when creating the component. For example: if we created this component with the name
`HelloWorld`, the name of the exported class would be `HelloWorldCommand`. It is not required but if you need it, this
is how it's done.

- And now you can create component with your template

```
sapphire generate <component> <name>
```
