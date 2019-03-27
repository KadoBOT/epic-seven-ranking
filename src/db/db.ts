import Dexie from 'dexie';
import { IHero } from './interfaces/list';

class Db extends Dexie {
  public list: Dexie.Table<IHero, string>;

  constructor() {
    super('epic7');
    this.version(1).stores({ list: 'id' });
    this.list = this.table('list');
  }
}

const db = new Db();
export default db;
