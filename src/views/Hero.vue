<template>
  <div>
    <h1>{{ hero.name }}</h1>
    <h3>{{ hero.zodiac }} {{ hero.element }}</h3>
    <h5>{{ hero.background }}</h5>
    <pre style="text-align: left">
      {{jsonHero}}
    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { HeroDetail } from '@/types';

type HeroCallBack = (err: null | Error, hero: HeroDetail | null) => any;
const fetchData = async (name: string, cb: HeroCallBack) => {
  try {
    const hero = await import(/* webpackChunkName: "[request]" */`@/assets/epic7-db/hero/${name}.json`);
    return cb(null, hero.default);
  } catch (e) {
    return cb(e, null);
  }
};

@Component({
  data() {
    return {
      name: this.$route.params.name,
    };
  },
  beforeRouteEnter(to, from, next) {
    fetchData(to.params.name, (err, hero) => {
      if (hero) {
        next((vm) => vm.$store.dispatch('setHero', hero));
      }

      if (err) {
        throw Error(err.message);
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch('setHero', {});
    fetchData(to.params.name, (err, hero) => {
      this.$store.dispatch('setHero', hero);
      next();
    });
  },
  computed: {
    ...mapState(['hero']),
    jsonHero() {
      return JSON.stringify(this.$store.state.hero, null, 2);
    },
  },
})
export default class Hero extends Vue {}
</script>

<style scoped>

</style>


