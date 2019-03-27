import Vue from 'vue';
import Vuex from 'vuex';
import { HeroDetail } from '@/types/index';
import dict from '@/assets/epic7-db/dict.json';
import { Hero } from '@/db';
import { List } from './db/list';
import { IHeroesDict, IHeroDict, IPveEnum } from './types/dict';
import { IHero } from './db/interfaces/list';

Vue.use(Vuex);

const SET_HERO = 'SET_HERO';
const SET_INPUT = 'SET_INPUT';
const SET_OWNED_HEROES = 'SET_OWNED_HEROES';
const REMOVE_HERO = 'REMOVE_HERO';

const nameStartsWith = (name: string, input: string): boolean => {
  return name.toLowerCase().split(' ').some((nameSlice) => nameSlice.startsWith(input.toLowerCase()));
};

export default new Vuex.Store({
  state: {
    heroes: dict.hero as IHeroesDict,
    hero: {},
    ownedHeroes: {} as IHeroesDict,
    input: '',
  },
  mutations: {
    [SET_HERO](state, hero: HeroDetail) {
      state.hero = hero;
    },
    [SET_INPUT](state, val: string) {
      state.input = val;
    },
    [SET_OWNED_HEROES]: async (state) => {
        const list = new List();
        await list.getAll();
        state.ownedHeroes = list.heroes.reduce((acc, { id }) => {
          return { ...acc, [id]: state.heroes[id] };
        }, {});
    },
  },
  getters: {
    filteredHeroes: (state) => Object.values(state.heroes).filter(({ name }) => nameStartsWith(name, state.input)),
    getBestPvp: (state) => (key: IPveEnum) => {
      return Object.values(state.ownedHeroes).sort((a: IHeroDict, b: IHeroDict) => {
        const aPveAverage = a.pvp ? a.pvp[key] : 0;
        const bPveAverage = b.pvp ? b.pvp[key] : 0;
        return bPveAverage - aPveAverage;
      }).slice(0, 10);
    },
    getBestPve: (state) => (key: IPveEnum) => {
      return Object.values(state.ownedHeroes).sort((a: IHeroDict, b: IHeroDict) => {
        const aPveAverage = a.pve ? a.pve[key] : 0;
        const bPveAverage = b.pve ? b.pve[key] : 0;
        return bPveAverage - aPveAverage;
      }).slice(0, 10);
    },
    getBestBoth: (state) => {
      return Object.values(state.ownedHeroes).sort((a: IHeroDict, b: IHeroDict) => {
        const aAverage = a.pvp && a.pve ? (a.pvp.average + a.pve.average) / 2 : 0;
        const bAverage = b.pvp && b.pve ? (b.pvp.average + b.pve.average) / 2 : 0;
        return bAverage - aAverage;
      }).slice(0, 10);
    },
    hasHero: (state) => (heroId: string) => {
      return heroId in state.ownedHeroes;
    },
  },
  actions: {
    setHero({ commit }, hero) {
      commit(SET_HERO, hero);
    },
    changeInput({ commit }, value) {
      commit(SET_INPUT, value);
    },
    async addHero({ dispatch }, id) {
      const hero = new Hero(id);
      await hero.add();
      dispatch('setOwnedHeroes');
    },
    async removeHero({ dispatch }, id) {
      const hero = new Hero(id);
      await hero.remove();
      dispatch('setOwnedHeroes');
    },
    async getHero({ commit }, id) {
      const hero = new Hero(id);
      const result = hero.get();
      return result;
    },
    setOwnedHeroes({ commit }) {
      commit(SET_OWNED_HEROES);
    },
  },
});
