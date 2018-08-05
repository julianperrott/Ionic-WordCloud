export interface IStyle {
    initialise(svg: any, w: number, h: number);
    render(words);
    padding: number;
    defaultColours: string[];
    strokeStyle: string;
    strokeStyleEnabled: boolean;
    getStyleHtml(): string;
}
