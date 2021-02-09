import { MainActivity } from "@/models/MainActivity";

export default class ActivitiesHelper {
    resolveIcon(activityType: string): string {
        switch (activityType) {
            case "Indoor Cycling":
                return "001-stationary-bike";
            case "Cycling":
                return "002-bicycle";
            case "Running":
                return "003-running";
            case "Treadmill Running":
                return "004-treadmill";
            case "Weight Training":
                return "005-excercise";
            case "Swimming":
                return "008-swimming";
            case "Rowing":
                return "006-rowing-machine";
            default:
                return "007-heartbeat"
        }
    }

    resolveMainType(activityType: string): MainActivity {
        switch (activityType) {
            case "Treadmill Running":
                return new MainActivity("Running", "Running", this.resolveIcon("Running"), 0);
            case "Street Running":
                return new MainActivity("Running", "Running", this.resolveIcon("Running"), 0);
            case "Running":
                return new MainActivity("Running", "Running", this.resolveIcon("Running"), 0);
            case "Indoor Cycling":
                return new MainActivity("Cycling", "Cycling", this.resolveIcon("Cycling"), 1);
            case "Cycling":
                return new MainActivity("Cycling", "Cycling", this.resolveIcon("Cycling"), 1);
            case "Wheelchair":
                return new MainActivity("Other", "Other", this.resolveIcon("Other"), 2);
            case "Indoor Sport & Fitness":
                return new MainActivity("Other", "Other", this.resolveIcon("Other"), 2);
            case "Other":
                return new MainActivity("Other", "Other", this.resolveIcon("Other"), 2);
            case "Indoor Rowing":
                return new MainActivity("Rowing", "Rowing", this.resolveIcon("Rowing"), 3);
            default:
                return new MainActivity(activityType.replace(" ", ""), activityType, this.resolveIcon(activityType), 99);
        }
    }

    formatTimeSpan(duration: number): string {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor(duration / 60) - hours * 60;
        const seconds = duration - (hours * 3600) - (minutes * 60);

        let timeSpan = hours > 0 ? hours + ':' : '';
        timeSpan += minutes < 10 && hours > 0 ? '0' : '';
        timeSpan += minutes + ':';
        timeSpan += seconds < 10 ? '0' + seconds : seconds;

        return timeSpan;
    }
}

export const activitiesHelper = new ActivitiesHelper()