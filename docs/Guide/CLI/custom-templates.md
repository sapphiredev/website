---
sidebar_position: 3
title: Create custom component templates
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

## Enable custom component templates

<Tabs groupId="config-language-choice">
<TabItem value="json" label="JSON" default>

```jsonc {11-14}
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
    "enabled": true, // Enables/disables custom component templates
    "location": "templates" // The location of your templates
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
  enabled: true # Enables/disables custom component templates
  location: 'templates' # The location of your templates
```

</TabItem>
</Tabs>

:::note

If you use JSON, our schema allows your text editor to provide automatic completions.

:::

## Create a template

First, create a file in your template directory with a name in the format `<templateName>.<language>.sapphire` (e.g `command.ts.sapphire`). Note that if you give it the same name as one of our provided defaults, your local template will override the default one.

All templates have two components: the config, and the template. These are separated by `---`. Let's set up our config now, like so:

```json
{
  "category": "commands"
}
```

The `category` field is how the Sapphire CLI determines what type of template you are creating, and therefore where it belongs by looking it up in your `.sapphirerc` file. Our default categories are `commands`, `listeners`, `arguments`, and `preconditions`, but you can add your own. We'll use the `commands` category here.

Next, we add our separator to start forming the template, like so:

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
