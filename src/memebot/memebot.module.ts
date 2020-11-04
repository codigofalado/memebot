import { Module } from '@nestjs/common';

import { MemebotService } from './memebot.service';

@Module({
  providers: [MemebotService]
})
export class MemebotModule {}
