import { Module } from '@nestjs/common'
import { CommonModule } from './common/common'
import { TaskQuestion } from './questions/task.question'
import { ChildCommand } from './run/child/child.command'
import { RunCommand } from './run/run.command'

/**
 * Main app module
 */
@Module({
  controllers: [],
  imports: [CommonModule],
  providers: [RunCommand, ChildCommand, TaskQuestion]
})
export class AppModule {}
