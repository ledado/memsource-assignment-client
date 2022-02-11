<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="value.name"
          :rules="nameRules"
          :label="$t('project.form.name.label')"
          outlined
          required
        ></v-text-field>

        <v-select
          v-model="value.sourceLanguage"
          :items="languageItems"
          :rules="sourceLanguageRules"
          :label="$t('project.form.source_language.label')"
          required
          outlined
        ></v-select>

        <v-select
          v-model="value.targetLanguages"
          :items="languageItems"
          :rules="targetLanguageRules"
          :label="$t('project.form.target_languages.label')"
          required
          outlined
          multiple
        ></v-select>

        <v-btn :disabled="!valid || loading" color="success" block @click="submitProject">
          {{ $t(`project.form.submit.${type}`) }}
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ProjectFormTypeEnum, ProjectItem} from '@/service/api/types/ProjectTypes';

@Component
export default class ProjectForm extends Vue {
  @Prop() value!: ProjectItem;
  @Prop() type!: ProjectFormTypeEnum;
  @Prop() loading!: boolean;

  $refs!: {
    form: any;
  };

  valid = true;

  nameRules: any = [];
  sourceLanguageRules: any = [];
  targetLanguageRules: any = [];

  languageItems = ['en', 'cs', 'ru', 'de', 'fi', 'ko', 'hu', 'ja'];

  created() {
    this.nameRules = [
      (v: any) => !!v || this.$t('project.form.name.required').toString(),
      (v: any) => (v && v.length <= 20) || this.$t('project.form.name.max_length').toString(),
    ];
    this.sourceLanguageRules = [(v: any) => !!v || this.$t('project.form.source_language.required').toString()];
    this.targetLanguageRules = [
      (v: any) => v.length > 0 || this.$t('project.form.target_languages.required').toString(),
    ];
  }

  submitProject() {
    if (this.$refs.form.validate()) {
      this.$emit('submit');
    }
  }

  resetForm() {
    this.$refs.form.reset();
  }
}
</script>
<style lang="scss" scoped></style>
