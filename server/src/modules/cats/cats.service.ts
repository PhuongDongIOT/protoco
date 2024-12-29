import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(
    private readonly catsRepository: CatsRepository
) { }

  create(cat: Cat): Cat {
    return this.catsRepository.create(cat);
  }

  findAll(): Cat[] {
    return this.catsRepository.findAll();
  }
}
