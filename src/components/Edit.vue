<template>
  <section edit>
    <input v-model="message" placeholder="edit me">
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  get message() {
    return this.$store.state.message;
  }
  set message(m: string) {
    this.$store.commit('setMessage', m);
  }
}
</script>

<style scoped lang="scss">
</style>
