<template>
  <v-row no-gutters>
    <v-col cols="12" class="text-h4">
      {{ $t('project.overview.title') }}
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="4">
          <project-statistic-card
            :value="countOfNewProjects"
            :title="$t('project.status.new')"
            :description="$t('project.overview.new.description')"
            background-class="blue"
          ></project-statistic-card>
        </v-col>
        <v-col cols="4">
          <project-statistic-card
            :value="countOfCompletedProjects"
            :title="$t('project.status.completed')"
            :description="$t('project.overview.completed.description')"
            background-class="orange"
          ></project-statistic-card>
        </v-col>
        <v-col cols="4">
          <project-statistic-card
            :value="countOfDeliveredProjects"
            :title="$t('project.status.delivered')"
            :description="$t('project.overview.delivered.description')"
            background-class="green"
          ></project-statistic-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row justify="space-between">
        <v-col cols="auto" class="text-h4">
          {{ $t('project.list.title') }}
        </v-col>
        <v-col cols="auto">
          <v-btn color="success" :to="{name: $data.routerTypes.PROJECT_NEW}">
            {{ $t('project.list.create_new') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="auto">
          <v-select
            :items="nameFilterItems"
            v-model="selectedNameFilter"
            :label="$t('project.list.filter_by_name')"
            hide-details
            outlined
            multiple
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-select
            :items="statusFilterItems"
            v-model="selectedStatusFilter"
            :label="$t('project.list.filter_by_status')"
            hide-details
            outlined
            multiple
          ></v-select>
        </v-col>
        <v-col cols="auto">
          <v-select
            :items="sortItems"
            v-model="projectsSortBy"
            :label="$t('project.list.sort_by.label')"
            hide-details
            outlined
          >
          </v-select>
        </v-col>
        <v-col cols="auto">
          <v-checkbox v-model="projectsSortDesc" :label="$t('project.list.sort_by_desc')"></v-checkbox>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="mt-3">
      <v-data-table
        :headers="projectHeaders"
        :items="filteredProjects"
        :items-per-page="5"
        :sort-by.sync="projectsSortBy"
        :sort-desc.sync="projectsSortDesc"
        :loading="loading"
      >
        <template v-slot:item.dateCreated="{item}">
          {{ item.dateCreated | formatDate('HH:mm, DD.MM.YYYY') }}
        </template>
        <template v-slot:item.dateUpdated="{item}">
          {{ item.dateUpdated | formatDate('HH:mm, DD.MM.YYYY') }}
        </template>
        <template v-slot:item.dateDue="{item}">
          {{ item.dateDue | formatDate('HH:mm, DD.MM.YYYY') }}
        </template>
        <template v-slot:item.actions="{item}">
          <v-icon small class="mr-2" @click="editProject(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ProjectService from '@/service/api/ProjectService';
import {ProjectItem, ProjectStatusEnum} from '@/service/api/types/ProjectTypes';
import ProjectStatisticCard from '@/components/Project/ProjectStatisticCard.vue';

@Component({
  components: {ProjectStatisticCard},
})
export default class ProjectDashboard extends Vue {
  projects: ProjectItem[] = [];
  loading: boolean = false;

  projectHeaders: any = [];

  projectsSortBy = 'id';
  projectsSortDesc = false;

  sortItems: any = [];

  nameFilterItems: string[] = [];
  selectedNameFilter: string[] = [];

  statusFilterItems = [ProjectStatusEnum.NEW, ProjectStatusEnum.COMPLETED, ProjectStatusEnum.DELIVERED];
  selectedStatusFilter: ProjectStatusEnum[] = [];

  created() {
    this.sortItems = [
      {value: 'id', text: this.$t('project.list.sort_by.id').toString()},
      {value: 'name', text: this.$t('project.list.sort_by.name').toString()},
      {value: 'status', text: this.$t('project.list.sort_by.status').toString()},
      {value: 'dateDue', text: this.$t('project.list.sort_by.dateDue').toString()},
    ];
    this.projectHeaders = [
      {
        text: 'Id',
        align: 'start',
        value: 'id',
        sortable: false,
      },
      {text: this.$t('project.list.table.name').toString(), value: 'name', sortable: false},
      {text: this.$t('project.list.table.source_language').toString(), value: 'sourceLanguage', sortable: false},
      {text: this.$t('project.list.table.status').toString(), value: 'status', sortable: false},
      {text: this.$t('project.list.table.target_languages').toString(), value: 'targetLanguages', sortable: false},
      {text: this.$t('project.list.table.date_created').toString(), value: 'dateCreated', sortable: false},
      {text: this.$t('project.list.table.date_updated').toString(), value: 'dateUpdated', sortable: false},
      {text: this.$t('project.list.table.date_due').toString(), value: 'dateDue', sortable: false},
      {text: this.$t('project.list.table.actions').toString(), value: 'actions', sortable: false},
    ];
    this.loading = true;
    ProjectService.getAll()
      .then((response) => {
        this.projects = response.data._embedded.projects;
        this.nameFilterItems = this.projects.map((project) => project.name);
      })
      .catch(() => {
        this.$toasted.error(this.$t('global.error.request').toString());
      })
      .finally(() => {
        this.loading = false;
      });
  }

  get countOfNewProjects() {
    return this.projects.filter((project) => project.status === ProjectStatusEnum.NEW).length;
  }

  get countOfCompletedProjects() {
    return this.projects.filter((project) => project.status === ProjectStatusEnum.COMPLETED).length;
  }

  get countOfDeliveredProjects() {
    return this.projects.filter((project) => project.status === ProjectStatusEnum.DELIVERED).length;
  }

  get filteredProjects() {
    let filteredItems = this.projects;
    if (this.selectedStatusFilter.length > 0) {
      filteredItems = filteredItems.filter((item) => this.selectedStatusFilter.includes(item.status));
    }
    if (this.selectedNameFilter.length > 0) {
      filteredItems = filteredItems.filter((item) => this.selectedNameFilter.includes(item.name));
    }
    return filteredItems;
  }

  editProject(project: ProjectItem) {
    this.$router.push({name: this.$data.routerTypes.PROJECT_UPDATE, params: {id: project.id.toString()}});
  }
}
</script>
<style lang="scss" scoped></style>
