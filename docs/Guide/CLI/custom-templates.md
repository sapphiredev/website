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

Finally, we add the template. Format strings are denoted by `{{variable}}` - this means that when the components are generated, the respective values are substituted in.

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

If you look at the name of the class, you will see it includes `{{name}}`. In this context, the formatting variable `name` will be replaced with the command's name when you generate the component. For example, if we created this component with the name `HelloWorld`, the name of the exported class would be `HelloWorldCommand`. Formatting variables are not required, but they're there if you need dynamic templating.

Now you can generate components using your template!

See [the page on generating components][generating-components] for more information.

[generating-components]: ./generating-components.md
