<template>
  <v-container :fluid="$vuetify.breakpoint.mdAndDown" :class="$vuetify.breakpoint.mdAndDown ? 'pt-0' : null">
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="12" md="12" lg="10" xl="8">
        <project-create></project-create>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProjectCreate from '@/components/Project/ProjectCreate.vue';

@Component({
  components: {ProjectCreate},
})
export default class MainProjectCreate extends Vue {}
</script>
