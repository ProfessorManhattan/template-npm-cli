import { Module } from '@nestjs/common'
import { LogService } from './log/log.service'

/**
 * Common module declaration
 */
@Module({
  exports: [LogService],
  providers: [LogService]
})
export class CommonModule {}
