import { Period } from "./Period";
export class PeriodGroup {
    name!: string;
    periods = new Array<Period>(0);

    constructor(name: string, periods: Array<Period>) {
        this.name = name;
        this.periods = periods;
    }
}