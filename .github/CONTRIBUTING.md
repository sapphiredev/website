# Contributing

## Workflow

1. Fork and clone this repository. Make sure you clone with `--recurse-submodules`
   (`git clone --recurse-submodules <url here>`)
1. Install dependencies with `yarn install --immutable`
1. Create a new branch in your fork based off the **main** branch.
1. Make your changes.
1. Commit your changes, and push them.
1. Submit a Pull Request [here]!

## Contributing to the guides

All guides for the Sapphire Community use Markdown formatting.

When writing guides there are some rules to follow:

1. All files should have the `.mdx` file extension.
1. Folder names are allowed to have spaces.
1. All folder names should be in lower case and different words should be split by hyphens (e.g., `hello-world` or
   `getting-started`).
1. File names should _never_ have spaces.
1. File names that consist of multiple words should be PascalCased.
1. Information in a guide page should be generally useful to the majority of people.
   - The single exception to this goes to guides in the "Advanced" folder, which can cover any kind of advanced or
     complex usage topic.

## Contributing to the code

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can find us in our
[Discord Server][discord server]**.

To contribute to this repository, feel free to create a new fork of the repository and submit a pull request. We highly
suggest [ESLint] to be installed in your text editor or IDE of your choice to ensure builds from GitHub Actions do not
fail.

**_Before committing and pushing your changes, please ensure that you do not have any linting errors by running
`yarn lint`!_**

### @sapphire website Concept Guidelines

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an
exhaustive list, but here are some things to consider before/while submitting your ideas._

- Everything in @sapphire website should be generally useful for the majority of users. Don't let that stop you if
  you've got a good concept though, as your idea still might be a great addition.
- Everything should be shard compliant. If code you put in a pull request would break when sharding, break other things
  from supporting sharding, or is incompatible with sharding; then you will need to think of a way to make it work with
  sharding in mind before the pull request will be accepted and merged.
- Everything should follow [OOP paradigms][oop paradigms] and generally rely on behaviour over state where possible.
  This generally helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication
  through abstraction, and leads to efficiency and therefore scalability.
- Everything should follow our ESLint rules as closely as possible, and should pass lint tests even if you must disable
  a rule for a single line.
- Scripts that are to be ran outside of the scope of the bot should be added to [scripts] directory and should be in the
  `.mjs` file format.

[discord server]: https://sapphirejs.dev/discord
[here]: https://github.com/sapphiredev/framework/pulls
[eslint]: https://eslint.org/
[node.js]: https://nodejs.org/en/download/
[yarn]: https://classic.yarnpkg.com/en/docs/install
[oop paradigms]: https://en.wikipedia.org/wiki/Object-oriented_programming
[scripts]: /scripts
