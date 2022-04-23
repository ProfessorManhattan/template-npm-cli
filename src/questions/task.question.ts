// REFERENCE(@Question decorator examples): https://github.com/jmcdo29/nest-commander/blob/main/integration/pizza/src/pizza.question.ts
import { Question, QuestionSet, ValidateFor } from 'nest-commander'

/**
 * QuestionSet for the `task` command
 */
@QuestionSet({ name: 'task' })
export class TaskQuestion {
  /**
   * This Question asks what the user would like to run and presents
   * them with types of pizza
   *
   * @param value - The value from the choice that the user selects
   * @returns The value after it is parsed by the parseTaskType function
   */
  @Question({
    choices: [
      {
        key: 'p',
        name: 'Pepperoni and cheese',
        value: 'PepperoniCheese'
      },
      {
        key: 'a',
        name: 'All dressed',
        value: 'alldressed'
      },
      {
        key: 'w',
        name: 'Hawaiian',
        value: 'hawaiian'
      }
    ],
    message: 'What task would you like to run?',
    name: 'task',
    type: 'expand'
  })
  protected parseTaskType(value: string): string {
    return value
  }

  /**
   * This is an example of a Question
   *
   * @param value - The value returned from the confirm question
   * @returns The value after being parsed
   */
  @Question({
    default: false,
    message: 'Is this for delivery?',
    name: 'toBeDelivered',
    type: 'confirm'
  })
  protected parseToBeDelivered(value: boolean): boolean {
    return value
  }

  /**
   * This is an example of a validation used by the `task` Question
   * above.
   *
   * @param value - The value being validated, returned by the `task` Question
   * @returns true if it passes the validation
   */
  @ValidateFor({ name: 'task' })
  protected validateTask(value: string): string | boolean {
    const pass = value === 'PepperoniCheese'
    if (pass) {
      return true
    }

    return 'Only Pepperoni and Cheese!'
  }
}
