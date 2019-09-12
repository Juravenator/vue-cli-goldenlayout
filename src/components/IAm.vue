<template>
  <section iam>
    <p><img alt="Vue logo" src="../assets/logo.png"></p>
    <p>I am a component</p>
    <p>{{$store.state.message}}</p>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
}
</script>

<style scoped lang="scss">
</style>
