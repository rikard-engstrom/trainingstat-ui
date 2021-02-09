<template>
  <div>
    <v-navigation-drawer app expand-on-hover class="no-scroll">
      <v-list id="mainTypes">
        <v-list-item
          v-for="mainType in vm.mainActivityTypes"
          :class="{ active: mainType.id == getMainActivityType() }"
          :key="mainType.id"
          @click="setMainActivityType(mainType.id)"
        >
          <v-list-item-icon>
            <svg-icon :icon="mainType.icon" />
          </v-list-item-icon>
          <v-list-item-title>{{ mainType.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="orange" flat elevation="0">
      <v-tabs color="white">
        <v-tab link to="/">Dashboard</v-tab>
        <v-tab link to="/activities">Activities</v-tab>
        <v-tab link to="/periods">Periods</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-toolbar dense v-if="this.$slots.toolbar">
        <slot name="toolbar" />
      </v-toolbar>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ActivitiesModule } from "@/store/modules/activities";
import { activitiesDS } from "@/services/activitiesDataService";

@Component
export default class BaseLayout extends Vue {
  private vm = {
    mainActivityTypes: activitiesDS.mainActivities(),
  };

  private setMainActivityType(mainActivityId: string) {
    ActivitiesModule.selectMainActivity(mainActivityId);
  }
  private getMainActivityType() {
    return ActivitiesModule.mainActivityId;
  }
}
</script>
