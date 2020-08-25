import ComponentBase from "./giga";
import ToastOptions from "./config/toast.options";
import ToastConfig from "./config/toast.config"
class Toast extends ComponentBase {

    private toastClass: string;
    private options: ToastOptions;
    private config: ToastConfig;

    private toasts: any = {all: []};

    public Toast(toastClass: string, options: ToastOptions) {
        //Empty constructor
        this.toastClass = toastClass;
        this.options = options;
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