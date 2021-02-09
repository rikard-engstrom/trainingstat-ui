<template>
  <base-layout>
    <v-container>
      <v-data-table
        :items="filteredActivities"
        :headers="vm.headers"
        disable-filtering
        disable-pagination
        dense
      >
        <template v-slot:item.title="{ item }">
          <span :title="item.activityType" :class="'mainType' + item.mainType">
            <svg-icon :icon="item.icon" />
          </span>
          <span> {{ item.title }}</span>
        </template>
      </v-data-table>
    </v-container>
  </base-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseLayout from "@/components/BaseLayout.vue";
import { activitiesDS } from "@/services/activitiesDataService";
import { Activity, activityFields } from "@/models/Activity";
import { ActivitiesModule } from "@/store/modules/activities";

@Component({
  components: {
    BaseLayout,
  },
})
export default class Activities extends Vue {
  private vm = {
    activities: activitiesDS.activities(),
    headers: [
      activityFields.date,
      activityFields.title,
      activityFields.calories,
      activityFields.caloriesPerMinute,
      activityFields.distance,
      activityFields.timeSpan,
      activityFields.trainingEffect,
      activityFields.trainingLoad,
      activityFields.weeklyTrainingLoad,
    ],
  };
  get filteredActivities(): Activity[] {
    const mainActivityId = ActivitiesModule.mainActivityId;
    return this.vm.activities
      .filter((e) => e.mainType == mainActivityId || mainActivityId == "")
      .slice(0, 50);
  }
}
</script>
