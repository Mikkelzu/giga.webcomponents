var ToastOptions = /** @class */ (function () {
    function ToastOptions(text, icon, position, timeOut) {
        this.text = text;
        this.icon = icon;
        this.position = position;
        this.timeOut = timeOut;
    }
    return ToastOptions;
}());
var ComponentBase = /** @class */ (function () {
    function ComponentBase() {
    }
    ComponentBase.prototype.generateElement = function (elementType) {
        var element = document.createElement(elementType);
        return element;
    };
    ComponentBase.prototype.setElementId = function (element, idToSet) {
        element.id = idToSet;
    };
    ComponentBase.prototype.addElementToBody = function (element) {
        document.body.append(element);
    };
    ComponentBase.prototype.addChildElementToExistingElement = function (child, parent) {
        parent.append(child);
    };
    ComponentBase.prototype.elementTimeOutAndDestroy = function (element, options, toasts) {
        setTimeout(function () {
            element.classList.remove('toast-visible');
            element.classList.add('toast-invisible');
        }, options.timeOut);
        setTimeout(function () {
            element.remove();
            toasts.all.pop(element);
        }, options.timeOut + 250);
    };
    return ComponentBase;
}());
var ToastHelperMethods = /** @class */ (function () {
    function ToastHelperMethods() {
        this.toasts = { all: [] };
        this.componentBase = new ComponentBase();
    }
    ToastHelperMethods.prototype.generateToastElements = function (options) {
        var el = this.componentBase.generateElement('div');
        var spanIcon = this.componentBase.generateElement('span');
        var spanText = this.componentBase.generateElement('span');
        el.style.zIndex = 9999;
        if (options.icon) {
            if (options.icon.includes("fab") || options.icon.includes("fas") || options.icon.includes("far")) {
                var fontAwesomeIcon = options.icon.split(" ");
                fontAwesomeIcon.forEach(function (styleClass) {
                    spanIcon.classList.add(styleClass);
                });
            }
            else {
                spanIcon.classList.add(options.icon);
            }
        }
        spanText.classList.add('toast-text');
        spanText.innerHTML = options.text;
        el.append(spanIcon, spanText);
        this.toasts.all.push(el);
        return el;
    };
    return ToastHelperMethods;
}());
var Toast = /** @class */ (function () {
    function Toast(toastClass, options) {
        this.toasts = { all: [] };
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
        if (this.options.position == undefined) {
            this.options.position = 'top-right';
        }
        if (this.options.timeOut == undefined) {
            this.options.timeOut = 2000;
        }
        var el = this.toastHelpers.generateToastElements(this.options);
        el.classList.add('toast', this.toastClass);
        el.classList.add('toast-position-' + this.options.position);
        el.style.display = 'block';
        el.classList.add('toast-visible');
        this.componentBase.addElementToBody(el);
        this.componentBase.elementTimeOutAndDestroy(el, this.options, this.toasts);
    }
    return Toast;
}());
