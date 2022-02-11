<template>
  <v-row no-gutters justify="center">
    <v-col cols="4">
      <v-row>
        <v-col cols="12" class="text-h4">
          {{ $t('project.form.update.title') }}
        </v-col>
        <v-col cols="12" v-if="projectDetailLoading" class="text-center my-4">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
        <v-col cols="12" v-if="projectToUpdate">
          <project-form
            ref="projectForm"
            v-model="projectToUpdate"
            :type="ProjectFormTypeEnum.UPDATE"
            :loading="loading"
            @submit="updateProject"
          ></project-form>
        </v-col>
        <v-col cols="12" v-if="!projectToUpdate && !projectDetailLoading" class="text-center text-h5">
          {{ $t('project.detail.not_found') }}
        </v-col>
        <v-col cols="12">
          <v-btn color="error" :to="{name: $data.routerTypes.MAIN}" block>
            {{ $t('global.cancel') }}
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" :to="{name: $data.routerTypes.MAIN}" block>
            {{ $t('project.form.back') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ProjectService from '@/service/api/ProjectService';
import {ProjectItem, ProjectFormTypeEnum} from '@/service/api/types/ProjectTypes';
import ProjectForm from '@/components/Project/ProjectForm.vue';

@Component({
  components: {ProjectForm},
})
export default class ProjectUpdate extends Vue {
  @Prop() projectId!: string;
  ProjectFormTypeEnum = ProjectFormTypeEnum;

  loading = false;
  projectDetailLoading = false;
  projectToUpdate: ProjectItem | null = null;

  $refs!: {
    projectForm: any;
  };

  created() {
    this.projectDetailLoading = true;
    ProjectService.getDetail(this.projectId)
      .then((response) => {
        this.projectToUpdate = response.data;
      })
      .catch((error) => {
        if (error.response.status !== 404) {
          this.$toasted.error(this.$t('global.error.request').toString());
        }
      })
      .finally(() => {
        this.projectDetailLoading = false;
      });
  }

  updateProject() {
    this.loading = true;
    const date = new Date();
    ProjectService.updateProject({
      ...this.projectToUpdate!,
      dateUpdated: date.toISOString(),
    })
      .then(() => {
        this.$toasted.success(this.$t('project.form.update.success').toString());
      })
      .catch(() => {
        this.$toasted.error(this.$t('global.error.request').toString());
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
<style lang="scss" scoped></style>
