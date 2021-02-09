import Vue from "vue";
import Vuex from "vuex";
import { ActivitiesState } from "./modules/activities";

Vue.use(Vuex);
export interface RootState {
  activities: ActivitiesState;
}

export default new Vuex.Store<RootState>({});