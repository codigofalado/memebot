import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemebotModule } from './memebot/memebot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MemebotModule, ConfigModule.forRoot({isGlobal: true,})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
