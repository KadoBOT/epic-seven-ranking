import db from './db';
import { IHero } from './interfaces/list';

export class Hero implements IHero {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }

  public async add() {
    await db.list.add({ id: this.id });
  }

  public async remove() {
    await db.list.delete(this.id);
  }

  public async get() {
    return await db.list.get(this.id);
  }
}
