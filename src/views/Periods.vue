<template>
  <base-layout>
    <template v-slot:toolbar>
      <v-btn-toggle v-model="vm.x" dense rounded>
        <v-btn
          v-for="(periodGroup, index) in vm.periodGroups"
          :key="periodGroup.name"
          @click="vm.periodGroupIndex = index"
        >
          {{ periodGroup.name }}
        </v-btn>
      </v-btn-toggle>
    </template>
    <v-container>
      <v-data-table
        :items="filteredPeriods"
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
import { Period, periodFields } from "@/models/Period";
import { ActivitiesModule } from "@/store/modules/activities";

@Component({
  components: {
    BaseLayout,
  },
})
export default class Periods extends Vue {
  private vm = {
    periodGroups: activitiesDS.periodGroups(),
    periodGroupIndex: 0,
    headers: [
      periodFields.period,
      periodFields.activities,
      periodFields.duration,
      periodFields.dist,
      periodFields.tl,
    ],
  };
  get filteredPeriods(): Period[] {
    const mainActivityId = ActivitiesModule.mainActivityId;
    return this.vm.periodGroups.length > 0
      ? this.vm.periodGroups[this.vm.periodGroupIndex].periods.filter(
          (e) => e.mainType == mainActivityId
        )
      : new Array<Period>(0);
  }
}
</script>
