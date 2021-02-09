export class MainActivity {
    id!: string;
    text!: string;
    icon!: string;
    sort!: number;

    constructor(id: string, text: string, icon: string, sort: number) {
        this.id = id;
        this.text = text;
        this.icon = icon;
        this.sort = sort;
    }
}