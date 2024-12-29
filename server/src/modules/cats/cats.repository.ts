import { Cat } from "./interfaces/cat.interface";

export abstract class CatsRepository {
    abstract create(cat: Cat): Cat;
    abstract findAll(): Array<Cat>;
}
