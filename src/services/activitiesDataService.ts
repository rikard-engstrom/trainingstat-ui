import { Activity } from "@/models/Activity";
import { MainActivity } from "@/models/MainActivity";
import { PeriodGroup } from "@/models/PeriodGroup";
import axios from "axios";
import { activitiesHelper } from "./activitiesHelper";
import PeriodsService from "./periodsService";

export class ActivitesDS {
    private _activites: Activity[] = [];
    private _mainActivities: MainActivity[] = [];
    private _periodGroups: PeriodGroup[] = [];

    activities(): Activity[] { return this._activites; }
    mainActivities(): MainActivity[] { return this._mainActivities; }
    periodGroups(): PeriodGroup[] { return this._periodGroups; }

    reload() {
        axios.get<Activity[]>("activities.json")
            .then(e => {
                e.data
                    .sort((b, a) => a.date > b.date ? 1 : a.date == b.date ? 0 : -1)
                    .forEach(activity => {
                        activity = Object.assign(new Activity(), activity);
                        activity.initialize();
                        this._activites.push(activity)
                    });


                this.SetMainActivities();

                const periodsService = new PeriodsService(this._activites, this._mainActivities);
                periodsService.getPeriods().forEach(e => this._periodGroups.push(e));
            })
    }

    private SetMainActivities() {
        const mainTypes = Array.from(new Set(this._activites.map(e => e.activityType)))
            .map(e => activitiesHelper.resolveMainType(e));

       const uniqueMainTypes = Array.from(new Set(mainTypes.map(e => e.id)))
            .map(e => mainTypes.filter(m => m.id === e)[0])
            .sort((a, b) => {
                return a.sort - b.sort;
            });

        const allActivities = activitiesHelper.resolveMainType("All");
        allActivities.id = "";
        allActivities.sort = -1;

        this._mainActivities.push(allActivities);

        uniqueMainTypes.forEach(e => {
            this._mainActivities.push(e);
        });
    }
}

export const activitiesDS = new ActivitesDS()