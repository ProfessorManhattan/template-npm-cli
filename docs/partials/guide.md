## NPM CLI Requirements

All of the NPM CLIs in the [Megabyte Labs](https://megabyte.space) eco-system should use the same format and core dependencies. They should all be written in TypeScript. Because we use [Angular](https://angular.io/) as a first-class choice, [NestJS](https://nestjs.com/) was an easy choice for us to adopt because of the similarities. The fact that NestJS is wildly popular on GitHub does not hurt as well. And because we use NestJS, we decided to use [Nest Commander](https://nest-commander.jaymcdoniel.dev/) for our NPM CLIs.

### Test-Driven Development

Testing CLIs can be cumbersome without the right tools. We have found that the best way of testing a Nest Commander CLI app is to utilize Test-Driven Development principles. Instead of manually compiling the app each time you make a change to test the CLI, we can create [Jest](https://jestjs.io/) tests while we are developing the CLI and then use [Nodemon](https://nodemon.io/) to automatically run the tests everytime we make a change to any file.

We encourage you to adopt these principles and develop your tests while you code.

### Development Tools

You are probably already familiar with `npm run test` and `npm run build`. We take things a step further and provide a plethora of build tools that are housed in our `Taskfile.yml` and the accompanying files it includes. We encourage you to attempt to make use of `task npm:test:inspect` which will watch the files as you code, run the Jest tests whenever a change is made, and open a Chrome DevTools instance for advanced debugging via [ndb](https://github.com/GoogleChromeLabs/ndb).

To make sense of all the build tools we include in all of our projects, you can run `bash start.sh` (to make sure our task runner called [Bodega](https://github.com/megabyte-labs/Bodega) is installed) and then `task --menu` to show a sweet TUI that will help you navigate through the available commands. It integrates documentation right into the menu too!

### Documentation

A link to the [Nest Commander documentation can be found here](https://nest-commander.jaymcdoniel.dev/docs/).