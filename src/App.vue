<template>
  <v-app>
    <svg-sprite />
    <router-view />
  </v-app>
</template>

<style lang="scss">
@import "@/styles/index.scss";
</style>

<script lang="ts">
import Vue from "vue";
import SvgSprite from "@/components/svg-sprite.vue";
import SvgIcon from "@/components/svg-icon.vue";
import { activitiesDS } from "@/services/activitiesDataService";

activitiesDS.reload();

Vue.component("svg-icon", SvgIcon);

export default Vue.extend({
  name: "App",
  components: { SvgSprite },
});
</script>
