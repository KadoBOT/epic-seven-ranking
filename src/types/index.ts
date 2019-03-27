export interface HeroDetail {
    gameID: string;
    name: string;
    rarity: number;
    classType: string;
    element: string;
    zodiac: string;
    specialtyChangeName: string;
    selfSkillBarName: string;
    background: string;
    relations: Relation[];
    stats: HeroDetailStats;
    skills: Skill[];
    specialtySkill: SpecialtySkill;
    camping: Camping;
    memoryImprintFormation: MemoryImprintFormation;
    memoryImprint: MemoryImprint[];
    awakening: Awakening[];
    pve: Pve;
}

export interface Awakening {
    rank: number;
    skillUpgrade: boolean;
    statsIncrease: StatsIncrease[];
    resources: Resource[];
}

export interface Resource {
    item: string;
    qty: number;
}

export interface StatsIncrease {
    efr?: number;
    atk?: number;
    hp?: number;
    spd?: number;
}

export interface Camping {
    options: string[];
    reactions: { [key: string]: number };
}

export interface MemoryImprint {
    rank: string;
    status: Status;
}

export interface Status {
    type: string;
    increase: number;
}

export interface MemoryImprintFormation {
    north: boolean;
    south: boolean;
    east: boolean;
    west: boolean;
}

export interface Pve {
    hunt10: number;
    hunt11: number;
    abyss: number;
    raid: number;
    average: number;
}

export interface Relation {
    hero: string;
    relationType: string;
}

export interface Skill {
    isPassive: boolean;
    soulBurn: number;
    selfSkillBarValue: number;
    soulBurnEffect: string;
    awakenUpgrade: boolean;
    cooldown: number;
    name: string;
    soulAcquire: number;
    description: string;
    enhancement: Enhancement[];
    buffs: string[];
    debuffs: string[];
    damageModifiers: DamageModifier[];
}

export interface DamageModifier {
    name: string;
    section: string;
    value: number;
    soulburn: number;
    description?: string;
    stat?: string;
    type?: string;
    target?: string;
}

export interface Enhancement {
    description: string;
    resources: Resource[];
}

export interface SpecialtySkill {
    name: string;
    description: string;
    dispatch: string;
    enhancement: string;
    stats: SpecialtySkillStats;
}

export interface SpecialtySkillStats {
    command: number;
    charm: number;
    politics: number;
}

export interface HeroDetailStats {
    lv1BaseStarNoAwaken: { [key: string]: number };
    lv50FiveStarNoAwaken: { [key: string]: number };
    lv50FiveStarFullyAwakened: { [key: string]: number };
    lv60SixStarNoAwaken: { [key: string]: number };
    lv60SixStarFullyAwakened: { [key: string]: number };
}
