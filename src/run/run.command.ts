import { Command, CommandRunner, Option } from 'nest-commander'
import { LogService } from '../common/common'
import { ChildCommand } from './child/child.command'

/**
 * Class for the `app run <task>` command
 */
@Command({
  argsDescription: {
    task: '<Task description here>'
  },
  arguments: '<task>',
  description: 'Add description here',
  name: 'run',
  options: {
    isDefault: true
  },
  subCommands: [ChildCommand]
})
export class RunCommand implements CommandRunner {
  /**
   * Constructor for the [[RunCommand]]
   *
   * @param logger - The logger service
   */
  constructor(private readonly logger: LogService) {
    logger.setContext(RunCommand.name)
  }

  /**
   * Default function called when this command is called
   *
   * @param passedParameter - Parameters used by command
   * @param options - Options used by command
   */
  public async run(passedParameter: readonly string[], options?: Record<string, string>): Promise<void> {
    await this.logger.verbose('run() parameters:', passedParameter, options)
    await this.logger.log('`run` option selected.')
  }

  /**
   * Dummy function that returns the value passed in by running
   * `app run --string hey yo`
   *
   * @param value - The string being passed to the `run` command
   * @returns The value parameter that is passed in
   */
  @Option({
    description: 'A string return',
    flags: '-s, --string [string]'
  })
  public parseString(value: string): string {
    this.logger.verbose('parseString() parameters:', value)

    return value
  }
}
