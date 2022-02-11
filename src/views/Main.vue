<template>
  <v-container :fluid="$vuetify.breakpoint.mdAndDown" :class="$vuetify.breakpoint.mdAndDown ? 'pt-0' : null">
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="12" md="12" lg="10" xl="8">
        <project-dashboard></project-dashboard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProjectDashboard from '@/components/Project/ProjectDashboard.vue';

@Component({
  components: {ProjectDashboard},
})
export default class Main extends Vue {}
</script>
