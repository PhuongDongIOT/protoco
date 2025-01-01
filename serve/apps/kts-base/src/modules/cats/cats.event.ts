import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { catsEvent } from './cats.constants';

@Injectable()
export class CatsListener {
    private readonly logger = new Logger("Cats")
    @OnEvent(catsEvent)
    handleOrderCreatedEvent() {
        this.logger.log("Cats event")
    }
}
