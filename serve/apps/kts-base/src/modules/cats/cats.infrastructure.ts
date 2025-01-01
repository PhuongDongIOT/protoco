import { Module } from '@nestjs/common';
import { CatsRepository } from './cats.repository';
import { CatsModel } from './cats.model';
import { CatsListener } from './cats.event';

@Module({
    imports: [],
    providers: [
        {
            provide: CatsRepository,
            useClass: CatsModel,
        },
        CatsListener
    ],
    exports: [CatsRepository],
})
export class CatsInfrastructureModule { }
