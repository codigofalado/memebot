import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemebotModule } from './memebot/memebot.module';

@Module({
  imports: [MemebotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
