var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Constants = /** @class */ (function () {
    function Constants() {
        this.SUCCESS = 'success';
        this.FAILURE = 'failure';
        this.INFO = 'info';
        this.WARNING = 'warning';
    }
    return Constants;
}());
var ElementType = /** @class */ (function () {
    function ElementType() {
        this.DIV = 'div';
        this.SPAN = 'span';
        this.BUTTON = 'button';
    }
    return ElementType;
}());
var ToastOptions = /** @class */ (function () {
    function ToastOptions(text, icon) {
        this.text = text;
        this.icon = icon;
    }
    return ToastOptions;
}());
var ToastConfig = /** @class */ (function () {
    function ToastConfig(position, timeOut) {
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
    return ToastConfig;
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
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast(toastClass, options) {
        var _this = _super.call(this) || this;
        _this.toasts = { all: [] };
        //Empty constructor
        _this.toastClass = toastClass;
        _this.options = options;
        console.log('we got to the constructor! (i hope)');
        _this.toast(options);
        return _this;
    }
    Toast.prototype.toast = function (config) {
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
    };
    Toast.prototype.generateToastElements = function (options) {
        var el = this.generateElement('div');
        var spanIcon = this.generateElement('span');
        var spanText = this.generateElement('span');
        el.style.zIndex = 9999;
        if (options.icon) {
            if (options.icon.includes("fab") || options.icon.includes("fas") || options.icon.includes("far")) {
                var fontAwesomeIcon = this.options.icon.split(" ");
                fontAwesomeIcon.forEach(function (styleClass) {
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
    };
    return Toast;
}(ComponentBase));
