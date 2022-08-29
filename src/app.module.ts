/**
 * Main app module
 */
@Module({
  controllers: [],
  imports: [CommonModule],
  providers: [RunCommand, ChildCommand, TaskQuestion]
})
export class AppModule {}
