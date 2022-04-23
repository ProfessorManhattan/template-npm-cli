import { CommandRunner, Option, SubCommand } from 'nest-commander'
import { LogService } from '../../common/common'

/**
 * Sub-command for `app run child`
 */
@SubCommand({
  arguments: '[phooey]',
  name: 'child'
})
export class ChildCommand implements CommandRunner {
  /**
   * Constructor for the [[ChildCommand]]
   *
   * @param logger - The logger service
   */
  constructor(private readonly logger: LogService) {
    logger.setContext(ChildCommand.name)
  }

  /**
   * Entry point for the `app run child` command
   *
   * @param passedParameter - The parameters passed to the command
   * @param options - The options passed to the command
   */
  public async run(passedParameter: readonly string[], options?: Record<string, string>): Promise<void> {
    await this.logger.verbose('run() parameters:', passedParameter, options)
    await this.logger.log('`run child` option selected.')
  }

  /**
   * Handles parsing the `-z` flag for this sub-command
   *
   * @param value - Value passed in for the option
   * @returns
   */
  @Option({
    defaultValue: 'Hey world!',
    description: 'A test option for the sub-command',
    flags: '-z, --string [string]'
  })
  public parseString(value: string): string {
    this.logger.verbose('parseString() parameters:', value)

    return value
  }
}
