export class Period {
    mainType!: string;
    period!: string;
    count!: number;
    duration!: string;
    kcal!: number;
    trainingLoad!: number;
    distance!: number;
    distanceFormatted!: string;

    public initialize(): void {
        this.distanceFormatted = this.distance.toFixed(1);
    }
}

export const periodFields = {
    period: { text: "period", value: "period" },
    activities: { text: "activities", value: "count", align: "right" },
    duration: { text: "duration", value: "duration", align: "right" },
    dist: { text: "dist", value: "distanceFormatted", align: "right" },
    kcal: { text: "kcal", value: "kcal", align: "right" },
    tl: { text: "tl", value: "trainingLoad", align: "right" },
}