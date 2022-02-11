<template>
  <v-app>
    <v-main>
      <v-container class="pt-8">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-img width="116px" contain :src="require('@/assets/logo.svg')" alt="headline icon" />
          </v-col>
          <v-col cols="auto" class="ml-6">
            <v-row dense>
              <v-col class="text-h3 font-weight-bold">404</v-col>
            </v-row>
            <v-row dense>
              <v-col class="text-h4">
                {{ $t('error.page_not_found.title') }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                {{ $t('error.page_not_found.description') }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="pt-2" style="max-width: 200px">
                <v-btn color="primary" class="mt-3" @click="goHome">{{ $t('error.page_not_found.action') }}</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Error404 extends Vue {
  goHome() {
    this.$router.push({name: this.$data.routerTypes.MAIN});
  }
}
</script>
