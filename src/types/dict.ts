export interface IHeroesDict {
  [key: string]: IHeroDict;
}

export interface IHeroDict {
  path: string;
  name: string;
  id: string;
  pve: IPve | null;
  pvp: IPvp | null;
}

export interface IPve {
  [key: string]: number;
  hunt10: number;
  hunt11: number;
  abyss: number;
  raid: number;
  average: number;
}

export interface IPvp {
  [key: string]: number;
  arenaOffense: number;
  arenaDefense: number;
  gwOffense: number;
  gwDefense: number;
  average: number;
}

export enum IPveEnum {
  Hunt10 = 'hunt10',
  Hunt11 = 'hunt11',
  Abyss = 'abyss',
  Raid = 'raid',
  Average = 'average',
}
