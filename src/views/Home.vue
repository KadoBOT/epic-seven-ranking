<template>
  <div class="home">
    <input type="text" @input="changeInput($event.target.value)" />
      <div v-for="hero in filteredHeroes" :key="hero.id">
        <router-link :to="`/hero/${hero.id}`">
          {{ hero.name }}
          <button v-if="[hero.id] in ownedHeroes" @click.prevent="removeHero(hero.id)">Remove Hero</button>
          <button v-else @click.prevent="addHero(hero.id)">Add Hero</button>
        </router-link>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { HeroDetail } from '@/types';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

@Component({
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.$store.dispatch('setOwnedHeroes'));
  },
  methods: {
    ...mapActions(['changeInput', 'addHero', 'removeHero']),
  },
  computed: {
    ...mapState(['ownedHeroes']),
    ...mapGetters(['filteredHeroes', 'hasHero']),
  },
})
export default class Home extends Vue {}
</script>
