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

import { Layout } from './lib/goldenlayout/layout';
import { layouts, defaultLayout } from './lib/goldenlayout/layouts';

@Component
export default class extends Vue {

  private layout!: Layout;

  public mounted() {
    this.layout = new Layout('my-app', defaultLayout, this.$refs.workspace as HTMLElement);
  }

  private setLayout(name: keyof typeof layouts) {
    this.layout.resetLayout(layouts[name]);
  }
}
</script>