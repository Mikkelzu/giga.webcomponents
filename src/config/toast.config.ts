export default class ToastConfig {

    public position: string;
    public timeOut: number;
    public ToastConfig(position?: string, timeOut?: number) {

        if (position === "" || position === null|| position === undefined) {
            this.position = 'top-right';
        }

        if (timeOut === null || timeOut === undefined) {
            this.timeOut = 2000;
        }

        if (timeOut && position) {
            this.position = position
            this.timeOut = timeOut
        }

            
    }
}