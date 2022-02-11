<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {errorBus} from '@/service/events/ErrorBus';
import {layoutTypes} from '@/layouts/layoutTypes';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';

@Component({
  components: {
    [layoutTypes.DEFAULT]: DefaultLayout,
    [layoutTypes.ERROR]: ErrorLayout,
  },
})
export default class App extends Vue {
  errorBus = errorBus;

  get layout() {
    if (this.errorBus.state) {
      return layoutTypes.ERROR;
    }
    return this.$route.meta.layout || layoutTypes.DEFAULT;
  }

  errorCaptured(err: any, vm: any, info: any) {
    this.errorBus.state = true;
  }
}
</script>

<style lang="scss">
@import 'styles/main.scss';
@import 'styles/overrides.scss';
</style>
