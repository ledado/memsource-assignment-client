<template>
  <v-container :fluid="$vuetify.breakpoint.mdAndDown" :class="$vuetify.breakpoint.mdAndDown ? 'pt-0' : null">
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="12" md="12" lg="10" xl="8">
        <project-update :project-id="id"></project-update>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ProjectUpdate from '@/components/Project/ProjectUpdate.vue';

@Component({
  components: {ProjectUpdate},
})
export default class MainProjectUpdate extends Vue {
  @Prop() id!: string;
}
</script>
