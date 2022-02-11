<template>
  <v-row no-gutters class="project-statistic-card" :class="backgroundClass">
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12" class="project-statistic-card-text body-2">
          {{ title }}
        </v-col>
        <v-col cols="12" class="project-statistic-card-text text-h4">
          {{ value }}
        </v-col>
        <v-col cols="12" class="project-statistic-card-text body-2">
          {{ description }}
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ProjectStatisticCard extends Vue {
  @Prop() value!: number | string;
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() backgroundClass!: string;
}
</script>
<style lang="scss" scoped>
.project-statistic-card {
  border: 1px solid black;
  border-radius: 4px;
  padding: 18px 16px;
  &.orange {
    background: #bf360c;
  }
  &.green {
    background: #2e7d32;
  }
  &.blue {
    background: #0277bd;
  }

  .project-statistic-card-text {
    color: white;
  }
}
</style>
