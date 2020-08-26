var ToastOptions = /** @class */ (function () {
    /**
     * The options that a toast can have
     * @param text Toast text
     * @param icon Toast icon class name(s)
     * @param position toast position
     * @param timeOut toast timeout
     */
    function ToastOptions(text, icon, position, timeOut) {
        this.text = text;
        this.icon = icon;
        this.position = position;
        this.timeOut = timeOut;
    }
    return ToastOptions;
}());
var ComponentBase = /** @class */ (function () {
    /**
     * Basic component base with generic functions for the dom elements
     */
    function ComponentBase() {
    }
    /**
     * Generate a dom element
     * @param elementType string of dom element
     */
    ComponentBase.prototype.generateElement = function (elementType) {
        var element = document.createElement(elementType);
        return element;
    };
    /**
     * Set an id of a dom element
     * @param element dom element
     * @param idToSet id to give to element
     */
    ComponentBase.prototype.setElementId = function (element, idToSet) {
        element.id = idToSet;
    };
    /**
     * Append an element to the document.body
     * @param element dom element
     */
    ComponentBase.prototype.addElementToBody = function (element) {
        document.body.append(element);
    };
    /**
     * Append the child element to a parent element
     * @param child child element to append to parent
     * @param parent parent element
     */
    ComponentBase.prototype.addChildElementToExistingElement = function (child, parent) {
        parent.append(child);
    };
    /**
     *
     * @param element dom element to destroy
     * @param options toast options
     * @param toasts toasts array
     */
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
    /**
     * Toast helper methods
     */
    function ToastHelperMethods() {
        this.toasts = { all: [] };
        this.componentBase = new ComponentBase();
    }
    /**
     * Generate all relevant toast elements
     * @param options options for the toast see @ToastOptions
     */
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
    /**
     * Toast object to generate
     * @param toastClass toast class name
     * @param options toast options see @ToastOptions
     */
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
/**
 * TABLE Classes
 */
var Table = /** @class */ (function () {
    function Table(tableId, tableHeadNames, data) {
        this.tableHelpers = new TableHelperMethods(tableId, tableHeadNames, data);
        this.tableHelpers.generateTable();
    }
    return Table;
}());
var TableHelperMethods = /** @class */ (function () {
    /**
     *
     * @param tableId
     * @param tableHeadNames
     * @param data
     */
    function TableHelperMethods(tableId, tableHeadNames, data) {
        this.componentBase = new ComponentBase();
        this.tableId = tableId;
        this.tableHeadNames = tableHeadNames;
        this.data = data;
    }
    TableHelperMethods.prototype.generateTable = function () {
        var _this = this;
        // Generate the container element
        var tableContainer = this.componentBase.generateElement('div');
        tableContainer.classList.add('table-g');
        // set table container id
        this.componentBase.setElementId(tableContainer, this.tableId);
        var tableBody = this.componentBase.generateElement('div');
        tableBody.classList.add('table-g-body');
        this.componentBase.addChildElementToExistingElement(tableBody, tableContainer);
        var tableHeadRow = this.componentBase.generateElement('div');
        tableHeadRow.classList.add('table-g-heading');
        this.tableHeadNames.forEach(function (tableHeader, index) {
            var tableheader = _this.componentBase.generateElement('div');
            _this.componentBase.setElementId(tableheader, tableHeader + '-id');
            tableheader.classList.add('table-g-head');
            tableheader.innerHTML = tableHeader;
            _this.componentBase.addChildElementToExistingElement(tableheader, tableBody);
        });
        this.data.forEach(function (item, index) {
            var tableRowForCells = _this.componentBase.generateElement('div');
            tableRowForCells.classList.add('table-g-row');
            _this.componentBase.addChildElementToExistingElement(tableRowForCells, tableBody);
            Object.keys(item).forEach(function (key, index) {
                var tempElement = _this.componentBase.generateElement('div');
                tempElement.classList.add('table-g-cell');
                tempElement.innerHTML = item[key];
                _this.componentBase.addChildElementToExistingElement(tempElement, tableRowForCells);
            });
        });
        this.componentBase.addElementToBody(tableContainer);
    };
    return TableHelperMethods;
}());
