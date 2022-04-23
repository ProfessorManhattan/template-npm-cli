/* eslint-disable @typescript-eslint/no-explicit-any, fp/no-rest-parameters, functional/functional-parameters */
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common'
import chalk from 'chalk'
import { isUnicodeSupported } from '../common.util'

/**
 * Logger service implementing [[LoggerService]] that implements a transient scope
 * because it includes methods that are not defined in the [[ConsoleLogger]]
 * or [[LoggerService]]
 */
@Injectable({ scope: Scope.TRANSIENT })
export class LogService extends ConsoleLogger {
  public readonly logger

  private readonly figures = {
    bullet: '●',
    circle: '◯',
    cross: '✖',
    lozenge: '◆',
    play: '▶',
    pointer: '❯',
    square: '◼',
    star: '★',
    tick: '✔'
  }

  private readonly figuresFallback = {
    bullet: '■',
    circle: '□',
    cross: '×',
    lozenge: '♦',
    play: '►',
    pointer: '>',
    square: '■',
    star: '✶',
    tick: '√'
  }

  private readonly ignoredLogs = ['InstanceLoader', 'NestFactory', 'RouterExplorer', 'RoutesResolver']

  constructor() {
    super()
    this.figures = isUnicodeSupported() ? this.figures : this.figuresFallback
    this.logger = console
  }

  /**
   * Logs a debug message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public debug(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      chalk.cyan(this.figures.bullet),
      chalk.bold.underline,
      chalk.dim(message),
      this,
      'debug',
      arguments_
    )
  }

  /**
   * Logs an error message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public error(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      `${chalk.redBright(this.figures.cross)} ${chalk.black.bold.bgRedBright(' ERROR ')} + '  '}`,
      chalk.bold.underline,
      chalk.redBright(message),
      this,
      'error',
      arguments_
    )
  }

  /**
   * Logs a regular message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public log(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      chalk.cyanBright(this.figures.pointer),
      chalk.bold.underline,
      message,
      this,
      'log',
      arguments_
    )
  }

  /**
   * Helper method to handle all logs
   *
   * @param icon - Icon styled with chalk
   * @param contextStyle - Chalk style to apply to the context label
   * @param message - Message that should be printed
   * @param logService - A reference to the log service
   * @param logHandler - Type of log to use
   * @param arguments_ - The extra arguments
   */
  // eslint-disable-next-line max-params
  private logMessage(
    icon: string,
    contextStyle: chalk.Chalk,
    message: string,
    logService: LogService,
    logHandler: 'debug' | 'error' | 'log' | 'warn',
    arguments_: readonly any[]
  ): void {
    const label = logService.context ? logService.context : 'SYSTEM'
    const labelStyle = label === 'SYSTEM' ? chalk.bold.underline.dim : contextStyle
    const negativeIndex = -1
    const localArguments = [...arguments_]
    if (logService.ignoredLogs.includes(label === 'SYSTEM' ? localArguments.at(negativeIndex) : label)) return
    const outputMessage = `${icon} ${labelStyle(label)} ${message}`
    arguments_ && arguments_.length > 0
      ? // eslint-disable-next-line security/detect-object-injection
        logService.logger[logHandler](outputMessage, ...arguments_)
      : // eslint-disable-next-line security/detect-object-injection
        logService.logger[logHandler](outputMessage)
  }

  /**
   * Logs a start message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public start(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      chalk.greenBright(this.figures.play),
      chalk.bold.underline,
      chalk.italic(message),
      this,
      'log',
      arguments_
    )
  }

  /**
   * Logs a star message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public star(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      chalk.yellowBright(this.figures.star),
      chalk.bold.underline,
      chalk.bold(message),
      this,
      'log',
      arguments_
    )
  }

  /**
   * Logs a stop message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public stop(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      chalk.redBright(this.figures.square),
      chalk.bold.underline,
      chalk.italic(message),
      this,
      'log',
      arguments_
    )
  }

  /**
   * Logs a success message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public success(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      chalk.greenBright(this.figures.tick),
      chalk.bold.underline,
      chalk.bold(message),
      this,
      'log',
      arguments_
    )
  }

  /**
   * Logs a warning message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public warn(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      `${chalk.yellowBright(this.figures.lozenge)} ${chalk.bold.black.bgYellowBright(' WARNING ')}`,
      chalk.bold.underline,
      chalk.yellowBright(message),
      this,
      'warn',
      arguments_
    )
  }

  /**
   * Logs a verbose message
   *
   * @param message - Message to print
   * @param arguments_ - arguments that should be passed to console after the message
   */
  public verbose(message: string, ...arguments_: readonly any[]): void {
    return this.logMessage(
      chalk.cyan.dim(this.figures.bullet),
      chalk.bold.underline,
      chalk.dim(message),
      this,
      'debug',
      arguments_
    )
  }
}
