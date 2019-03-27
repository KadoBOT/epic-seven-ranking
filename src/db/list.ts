import db from './db';
import { IList, IHero } from './interfaces/list';

export class List implements IList {
  public heroes: IHero[];

  constructor() {
    this.heroes = [];
  }

  public async getAll() {
    await db.list.toArray((ids) => this.heroes = ids);
  }
}

