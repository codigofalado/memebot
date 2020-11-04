import { Test, TestingModule } from '@nestjs/testing';
import { MemebotService } from './memebot.service';

describe('MemebotService', () => {
  let service: MemebotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemebotService],
    }).compile();

    service = module.get<MemebotService>(MemebotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
