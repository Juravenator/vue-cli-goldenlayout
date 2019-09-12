<template>
  <section my-app>
    <header>
      <button @click="setLayout('layout A')">Layout A</button>
      <button @click="setLayout('layout B')">Layout B</button>
      <span>Message: {{$store.state.message}}</span>
    </header>
    <section workspace ref="workspace"></section>
  </section>
</template>

<style lang="scss" scoped>
  [my-app] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;

    [workspace] {
      flex: 1;
      overflow: auto; // fixes bug where resizing to smaller size malfunctions in goldenlayout
    }
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import GoldenLayout from 'golden-layout';
import { makeLayout, resetLayout } from './lib/goldenlayout/instance';
import { layouts } from './lib/goldenlayout/layouts';

@Component
export default class extends Vue {

  private layout!: GoldenLayout;

  public mounted() {
    this.layout = makeLayout({id: 'my-app', handle: this.$refs.workspace as Element});
  }

  private setLayout(name: keyof typeof layouts) {
    resetLayout(this.layout, layouts[name]);
  }
}
</script>