<template>
  <v-app>
    <v-main>
      <v-container class="pt-8">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-icon size="92" color="#000000">mdi-alert-circle-outline</v-icon>
          </v-col>
          <v-col cols="auto" class="ml-6">
            <v-row dense>
              <v-col class="text-h3 font-weight-bold">{{ $t('error.main.title') }}</v-col>
            </v-row>
            <v-row dense>
              <v-col class="text-h4">
                {{ $t('error.main.subtitle') }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                {{ $t('error.fix.info') }}
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="pt-2" style="width: 200px">
                <v-btn color="primary" class="mt-3" @click="reloadApp">{{ $t('error.reload_app') }}</v-btn>
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
import {errorBus} from '@/service/events/ErrorBus';
@Component
export default class ErrorLayout extends Vue {
  errorBus = errorBus;

  reloadApp() {
    window.location.reload();
  }
}
</script>
