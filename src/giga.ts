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

    public position: string;
    public timeOut: number;

    constructor(text: string, icon: string, position: string, timeOut: number) {
        this.text = text;
        this.icon = icon;

        if (position == undefined)
            this.position = 'top-right';
        else
            this.position = position;

        if (timeOut == undefined)
            this.timeOut = 2000;
        else
            this.timeOut = timeOut;
        
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

class ToastHelperMethods {

    private componentBase: ComponentBase

    constructor() {
        this.componentBase = new ComponentBase();
        
        //this.options = options;
    }

    private toasts: any = { all: [] };

    public generateToastElements(options: any) {
        

        var el = this.componentBase.generateElement('div');

        var spanIcon = this.componentBase.generateElement('span');
        var spanText = this.componentBase.generateElement('span');

        el.style.zIndex = 9999;

        if (options.icon) {
            if (options.icon.includes("fab") || options.icon.includes("fas") || options.icon.includes("far")) {
                var fontAwesomeIcon = options.icon.split(" ");
                fontAwesomeIcon.forEach((styleClass: any) => {
                    spanIcon.classList.add(styleClass);
                });
            } else {
                spanIcon.classList.add(options.icon);
            }

        }

        spanText.classList.add('toast-text');
        spanText.innerHTML = options.text;
        el.append(spanIcon, spanText);
        this.toasts.all.push(el);
        return el;
    }

}

class Toast {

    private componentBase: ComponentBase;
    private toastHelpers: ToastHelperMethods;
    private toastClass: string;
    private options: ToastOptions;

    private toasts: any = { all: [] };

    constructor(toastClass: string, options: ToastOptions) {

        this.componentBase = new ComponentBase();
        this.toastHelpers = new ToastHelperMethods();
        //Empty constructor
        this.toastClass = toastClass;
        this.options = options;

         for (var i = 0; i < this.toasts.all.length; i++) {
            this.toasts.all[i].style.top += 65;
        }
        //fallback if user has only entered text as options param
        // if (!this.options.cfg.hasOwnProperty('position') || !this.options.cfg.hasOwnProperty('timeOut')) {
        //     this.config.position = 'top-right'
        //     this.config.timeOut = 2000
        // }

        var el = this.toastHelpers.generateToastElements(this.options);
        el.classList.add('toast', this.toastClass);
        el.classList.add('toast-position-' + this.options.position)

        el.style.display = 'block';
        el.classList.add('toast-visible');

        this.componentBase.addElementToBody(el);
        console.log("created toast");

        //this.componentBase.elementTimeOutAndDestroy(el, this.options, this.toasts);
    }

    


}