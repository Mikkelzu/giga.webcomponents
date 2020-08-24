define("element.type", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ElementType = void 0;
    class ElementType {
        constructor() {
            this.DIV = 'div';
            this.SPAN = 'span';
            this.BUTTON = 'button';
        }
    }
    exports.ElementType = ElementType;
});
define("giga", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ComponentBase {
        ComponentBase() { }
        generateElement(elementType) {
            let element = document.createElement(elementType);
            return element;
        }
        setElementId(element, idToSet) {
            element.id = idToSet;
        }
        addElementToBody(element) {
            document.body.append(element);
        }
        addChildElementToExistingElement(child, parent) {
            parent.append(child);
        }
        elementTimeOutAndDestroy(element, options, toasts) {
            setTimeout(function () {
                element.classList.remove('toast-visible');
                element.classList.add('toast-invisible');
            }, options.timeOut);
            setTimeout(function () {
                element.remove();
                toasts.all.pop(element);
            }, options.timeOut + 250);
        }
    }
    exports.default = ComponentBase;
});
define("config/toast.options", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ToastOptions {
        ToastOptions(text, icon) {
            this.text = text;
            this.icon = icon;
        }
    }
    exports.default = ToastOptions;
});
define("config/toast.config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ToastConfig {
        ToastConfig(position, timeOut) {
            if (position === "" || position === null || position === undefined) {
                this.position = 'top-right';
            }
            if (timeOut === null || timeOut === undefined) {
                this.timeOut = 2000;
            }
            if (timeOut && position) {
                this.position = position;
                this.timeOut = timeOut;
            }
        }
    }
    exports.default = ToastConfig;
});
define("toast", ["require", "exports", "giga"], function (require, exports, giga_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Toast extends giga_1.default {
        constructor() {
            super(...arguments);
            this.toasts = { all: [] };
        }
        Toast(toastClass, options) {
            //Empty constructor
            this.toastClass = toastClass;
            this.options = options;
        }
        toast(config) {
            for (var i = 0; i < this.toasts.all.length; i++) {
                this.toasts.all[i].style.top += 65;
            }
            // fallback if user has only entered text as options param
            if (!config.hasOwnProperty('position') || !config.hasOwnProperty('timeOut')) {
                this.config.position = config.position;
                this.config.timeOut = config.timeOut;
            }
            else {
            }
            var el = this.generateToastElements(this.options);
            el.classList.add('toast', this.toastClass);
            el.classList.add('toast-position-' + this.config.position);
            el.style.display = 'block';
            el.classList.add('toast-visible');
            this.addElementToBody(el);
            this.elementTimeOutAndDestroy(el, this.options, this.toasts);
        }
        generateToastElements(options) {
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
                }
                else {
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
});
