class Constants {

    public SUCCESS = 'success';
    public FAILURE = 'failure';
    public INFO  = 'info';
    public WARNING = 'warning';

}

class ElementType {

    public DIV: string = 'div';
    public SPAN: string = 'span'
    public BUTTON: string = 'button'
}
class ToastOptions {

    public text: string;

    public icon: string;

    constructor(text: string, icon: string) {
        this.text = text;
        this.icon = icon;
    }

}

class ToastConfig {

    public position: string;
    public timeOut: number;

    constructor(position?: string, timeOut?: number) {

        if (position === "" || position === null || position === undefined) {
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
class ComponentBase {

    constructor() { }

    public generateElement(elementType: any): any {
        let element = document.createElement(elementType);

        return element;
    }


    public setElementId(element: any, idToSet: string): void {
        element.id = idToSet;
    }

    public addElementToBody(element: any) {
        document.body.append(element);
    }

    public addChildElementToExistingElement(child: any, parent: any): void {
        parent.append(child);
    }

    public elementTimeOutAndDestroy(element: any, options: any, toasts: any) {
        setTimeout(function () {
            element.classList.remove('toast-visible')
            element.classList.add('toast-invisible')
        }, options.timeOut)

        setTimeout(function () {
            element.remove();
            toasts.all.pop(element);
        }, options.timeOut + 250)
    }
}

class Toast extends ComponentBase {

    private toastClass: string;
    private options: ToastOptions;
    private config: ToastConfig;

    private toasts: any = { all: [] };

    constructor(toastClass: string, options: ToastOptions) {
        super();

        //Empty constructor
        this.toastClass = toastClass;
        this.options = options;

        console.log('we got to the constructor! (i hope)');
        this.toast(options);
    }

    private toast(config: any): void {
        for (var i = 0; i < this.toasts.all.length; i++) {
            this.toasts.all[i].style.top += 65;
        }

        // fallback if user has only entered text as options param
        if (!config.hasOwnProperty('position') || !config.hasOwnProperty('timeOut')) {
            this.config.position = config.position;
            this.config.timeOut = config.timeOut;
        } else {

        }
        var el = this.generateToastElements(this.options);
        el.classList.add('toast', this.toastClass);
        el.classList.add('toast-position-' + this.config.position)

        el.style.display = 'block';
        el.classList.add('toast-visible');

        this.addElementToBody(el);

        this.elementTimeOutAndDestroy(el, this.options, this.toasts);
    }


    public generateToastElements(options: any) {
        var el = this.generateElement('div');

        var spanIcon = this.generateElement('span');
        var spanText = this.generateElement('span');

        el.style.zIndex = 9999;

        if (options.icon) {
            if (options.icon.includes("fab") || options.icon.includes("fas") || options.icon.includes("far")) {
                var fontAwesomeIcon = this.options.icon.split(" ");
                fontAwesomeIcon.forEach(styleClass => {
                    spanIcon.classList.add(styleClass);
                });
            } else {
                console.log(options.icon);
                spanIcon.classList.add(options.icon);
            }

        }

        spanText.classList.add('toast-text');
        spanText.innerHTML = this.options.text;
        el.append(spanIcon, spanText);
        this.options = options;
        this.toasts.all.push(el);
        return el;
    }


}