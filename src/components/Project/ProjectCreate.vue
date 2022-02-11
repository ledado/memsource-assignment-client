<template>
  <v-row no-gutters justify="center">
    <v-col cols="4">
      <v-row>
        <v-col cols="12" class="text-h4">
          {{ $t('project.form.create.title') }}
        </v-col>
        <v-col cols="12">
          <project-form
            ref="projectForm"
            v-model="projectToCreate"
            :type="ProjectFormTypeEnum.CREATE"
            :loading="loading"
            @submit="createProject"
          ></project-form>
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
import {Component, Vue} from 'vue-property-decorator';
import ProjectService from '@/service/api/ProjectService';
import {ProjectItem, ProjectStatusEnum, ProjectFormTypeEnum} from '@/service/api/types/ProjectTypes';
import ProjectForm from '@/components/Project/ProjectForm.vue';

@Component({
  components: {ProjectForm},
})
export default class ProjectCreate extends Vue {
  ProjectFormTypeEnum = ProjectFormTypeEnum;
  loading = false;

  projectToCreate: ProjectItem = {
    id: 0,
    name: '',
    sourceLanguage: '',
    status: ProjectStatusEnum.NEW,
    targetLanguages: [],
    dateCreated: '',
    dateUpdated: '',
    dateDue: '',
  };

  $refs!: {
    projectForm: any;
  };

  createProject() {
    this.loading = true;
    const date = new Date();
    ProjectService.createProject({
      ...this.projectToCreate,
      dateCreated: date.toISOString(),
      dateUpdated: date.toISOString(),
      dateDue: date.toISOString(),
    })
      .then(() => {
        this.$toasted.success(this.$t('project.form.create.success').toString());
        this.projectToCreate = {
          id: 0,
          name: '',
          sourceLanguage: '',
          status: ProjectStatusEnum.NEW,
          targetLanguages: [],
          dateCreated: '',
          dateUpdated: '',
          dateDue: '',
        };
        this.$refs.projectForm.resetForm();
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
