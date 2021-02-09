import { Activity } from "@/models/Activity";
import { MainActivity } from "@/models/MainActivity";
import { Period } from "@/models/Period";
import { PeriodGroup } from "@/models/PeriodGroup";
import "@/globals";

const today = new Date().withoutTime().getTime();

export default class PeriodsService {
    activities: Activity[];
    mainActivities: MainActivity[];

    constructor(activities: Activity[], mainActivities: MainActivity[]) {
        this.activities = activities;
        this.mainActivities = mainActivities;
    }

    getPeriods(): PeriodGroup[] {
        const periodGroups = Array<PeriodGroup>();

        periodGroups.push(new PeriodGroup("7-days", this.calculatePeriods(7)));
        periodGroups.push(new PeriodGroup("14-days", this.calculatePeriods(14)));
        periodGroups.push(new PeriodGroup("30-days", this.calculatePeriods(30)));
        return periodGroups;
    }

    private calculatePeriods(numberOfDays: number): Period[] {
        const periods = new Array<Period>(0);
        let sevenDays = 0;
        while (sevenDays < 20) {
            const periodTo = new Date(today);
            periodTo.setDate((periodTo.getDate() - (sevenDays * numberOfDays)) + 1);
            const periodFrom = new Date(periodTo.valueOf());
            periodFrom.setDate(periodFrom.getDate() - (numberOfDays - 1));

            const period = `${periodFrom.toISODate()} - ${periodTo.toISODate()}`;

            this.mainActivities.forEach(m => {
                const periodActivities = this.activities
                    .filter(e => e.inPeriod(periodFrom, periodTo))
                    .filter(e => m.id == "" || e.mainType == m.id);

                const summary = this.summarize(periodActivities);
                summary.period = period;
                summary.mainType = m.id;
                periods.push(summary);
            });

            sevenDays++;
        }

        return periods;
    }

    private summarize(activities: Activity[]): Period {
        const period = new Period();
        period.count = activities.length;
        period.duration = activities.map(e => e.duration).sum().formatTimeSpan();
        period.kcal = activities.map(e => e.calories).sum();
        period.trainingLoad = activities.map(e => e.trainingLoad || 0).sum();
        period.distance = activities.map(e => e.distance).sum();

        period.initialize();
        return period;
    }
}