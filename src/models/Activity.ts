import { activitiesHelper } from "@/services/activitiesHelper";
export class Activity {
    activityType!: string;
    calories!: number;
    date!: string;
    description!: string;
    distance!: number;
    duration!: number;
    source!: string;
    sourceId!: string;
    title!: string;
    trainingLoad!: number;
    weeklyTrainingLoad!: number;

    mainType!: string;
    icon!: string;
    caloriesPerMinute!: number;
    totalTrainingEffect!: number;
    totalAnaerobicTrainingEffect!: number;
    trainingEffect!: string;
    timeSpan!: string;
    caloriesPerMinuteFormatted!: string;
    totalTrainingEffectFormatted!: string;
    totalAnaerobicTrainingEffectFormatted!: string;
    distanceFormatted!: string;

    public inPeriod(dateFrom: Date, dateTo: Date): boolean {
        return this.date >= dateFrom.toISODate() && this.date <= dateTo.toISODate();
    }

    public initialize(): void {
        const mainType = activitiesHelper.resolveMainType(this.activityType);
        
        this.mainType = mainType.id;
        this.icon = activitiesHelper.resolveIcon(this.activityType);
        this.caloriesPerMinute = (Math.round(this.calories * 600 / this.duration) / 10);
        this.totalTrainingEffect = (this.totalTrainingEffect || 0);
        this.totalAnaerobicTrainingEffect = (this.totalAnaerobicTrainingEffect || 0);
        this.distance = ((this.distance || 0) / 1000);
        this.timeSpan = activitiesHelper.formatTimeSpan(this.duration);
        this.caloriesPerMinuteFormatted = this.caloriesPerMinute.toFixed(1);
        this.totalTrainingEffectFormatted = this.totalTrainingEffect.toFixed(1);
        this.totalAnaerobicTrainingEffectFormatted = this.totalAnaerobicTrainingEffect.toFixed(1);
        this.distanceFormatted = this.distance.toFixed(1);
        this.trainingEffect = `${this.totalTrainingEffectFormatted} / ${this.totalAnaerobicTrainingEffectFormatted}`
    }
}

export const activityFields = {
    date: { text: 'date', value: 'date' },
    title: { text: 'activity', value: 'title' },
    calories: { text: 'kcal', value: 'calories', align: 'end' },
    caloriesPerMinute: { text: 'kcal/min', value: 'caloriesPerMinuteFormatted', align: 'end' },
    distance: { text: 'dist', value: 'distanceFormatted', align: 'end' },
    totalTrainingEffect: { text: 'TE', value: 'totalTrainingEffectFormatted', align: 'end' },
    totalAnaerobicTrainingEffect: { text: 'TE(An)', value: 'totalAnaerobicTrainingEffectFormatted', align: 'end' },
    trainingEffect: { text: 'TE/An', value: 'trainingEffect', align: 'end' },
    trainingLoad: { text: 'TL', value: 'trainingLoad', align: 'end' },
    weeklyTrainingLoad: { text: 'TL7', value: 'weeklyTrainingLoad', align: 'end' },
    activityType: { text: 'type', value: 'activityType' },
    icon: { text: '', value: 'icon', align: 'center', class: "p0", cellClass: "p0" },
    timeSpan: { text: 'dur', value: 'timeSpan', align: 'right' }
}