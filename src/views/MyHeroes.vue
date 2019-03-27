<template>
<div>
  <h1>Heroes</h1>
  <h2>Top 10</h2>
  <h3>PvP + PvE Average</h3>
  <div v-for="(hero, index) in getBestBoth" :key="hero.id">
      {{ index + 1}}: <router-link :to="`/hero/${hero.id}`">{{ hero.name }}</router-link> - ({{ ((hero.pvp.average + hero.pve.average) / 2).toFixed(2) }})
  </div>
  <h3>PvE</h3>
  <div v-for="str in pve" :key="str">
    <h4>{{ str.replace(str.charAt(0), str.charAt(0).toUpperCase()) }}</h4>
    <div v-for="(hero, index) in getBestPve(str)" :key="`pve-${hero.id}`">
      {{ index + 1}}: <router-link :to="`/hero/${hero.id}`">{{ hero.name }}</router-link> - ({{ hero.pve[str]}})
    </div>
  </div>
  <h3>PvP</h3>
  <div v-for="str in pvp" :key="str">
    <h4>{{ str.replace(str.charAt(0), str.charAt(0).toUpperCase()) }}</h4>
    <div v-for="(hero, index) in getBestPvp(str)" :key="`pvp-${hero.id}`">
      {{ index + 1}}: <router-link :to="`/hero/${hero.id}`">{{ hero.name }}</router-link> - ({{ hero.pvp[str]}})
    </div>
  </div>
  <h2>All Heroes</h2>
  <div v-for="hero in myHeroes" :key="`my-${hero.id}`">
    <router-link :to="`/hero/${hero.id}`">{{ hero.name}}</router-link><span v-if="hero.pve"> - PvE: ({{hero.pve.average}}), PvP: ({{hero.pvp.average}})</span>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  data() {
    return {
      pve: ['average', 'hunt10', 'hunt11', 'raid', 'abyss'],
      pvp: ['gwOffense', 'gwDefense', 'arenaOffense', 'arenaDefense', 'average'],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.$store.dispatch('setOwnedHeroes'));
  },
  computed: {
    ...mapGetters(['myHeroes', 'getBestPve', 'getBestPvp', 'getBestBoth']),
  },
})
export default class MyHero extends Vue {}
</script>
