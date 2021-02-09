import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface ActivitiesState {
    mainActivityId: string;
}

@Module({ dynamic: true, store, name: 'activities' })
class Activities extends VuexModule implements ActivitiesState {
    public mainActivityId = "";

    @Mutation
    selectMainActivityMutation(mainActivityId: string) {
        this.mainActivityId = mainActivityId;
    }

    @Action
    public selectMainActivity(mainActivityId: string) {
        this.selectMainActivityMutation(mainActivityId);
    }
}

export const ActivitiesModule = getModule(Activities)