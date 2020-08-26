class ToastOptions {
    public text: string;
    public icon: string;
    public position: string;
    public timeOut: number;

    /**
     * The options that a toast can have
     * @param text Toast text
     * @param icon Toast icon class name(s)
     * @param position toast position
     * @param timeOut toast timeout
     */
    constructor(text: string, icon: string, position: string, timeOut: number) {
        this.text = text;
        this.icon = icon;

        this.position = position;
        this.timeOut = timeOut
    }
}

class ComponentBase {

    /**
     * Basic component base with generic functions for the dom elements
     */
    constructor() { }

    /**
     * Generate a dom element
     * @param elementType string of dom element
     */
    public generateElement(elementType: any): any {
        let element = document.createElement(elementType);

        return element;
    }


    /**
     * Set an id of a dom element
     * @param element dom element
     * @param idToSet id to give to element
     */
    public setElementId(element: any, idToSet: string): void {
        element.id = idToSet;
    }

    /**
     * Append an element to the document.body
     * @param element dom element
     */
    public addElementToBody(element: any) {
        document.body.append(element);
    }

    /**
     * Append the child element to a parent element
     * @param child child element to append to parent
     * @param parent parent element
     */
    public addChildElementToExistingElement(child: any, parent: any): void {
        parent.append(child);
    }

    /**
     * 
     * @param element dom element to destroy
     * @param options toast options
     * @param toasts toasts array
     */
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

    /**
     * Toast helper methods
     */
    constructor() {
        this.componentBase = new ComponentBase();
    }

    private toasts: any = { all: [] };

    /**
     * Generate all relevant toast elements
     * @param options options for the toast see @ToastOptions
     */
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

    /**
     * Toast object to generate
     * @param toastClass toast class name
     * @param options toast options see @ToastOptions
     */

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

        if (this.options.position == undefined) {
            this.options.position = 'top-right'
        }
        if (this.options.timeOut == undefined) {
            this.options.timeOut = 2000;
        }

        var el = this.toastHelpers.generateToastElements(this.options);
        el.classList.add('toast', this.toastClass);
        el.classList.add('toast-position-' + this.options.position)

        el.style.display = 'block';
        el.classList.add('toast-visible');

        this.componentBase.addElementToBody(el);

        this.componentBase.elementTimeOutAndDestroy(el, this.options, this.toasts);
    }
}


/**
 * TABLE Classes
 */
class Table {

    private tableHelpers: TableHelperMethods;

    constructor(tableId: string, tableHeadNames: any, data: any) {

        this.tableHelpers = new TableHelperMethods(tableId, tableHeadNames,data);

        this.tableHelpers.generateTable();
    }
}

class TableHelperMethods {

    private componentBase: ComponentBase;
    private tableId: string;
    private tableHeadNames: any;

    private data: any;

    /**
     * 
     * @param tableId 
     * @param tableHeadNames 
     */
    constructor(tableId: string, tableHeadNames: any, data: any) {
        this.componentBase = new ComponentBase();

        this.tableId = tableId;
        this.tableHeadNames = tableHeadNames;
        this.data = data;
    }

    public generateTable() {

        var tableHeadElements = [];

        // Generate the container element
        var tableContainer = this.componentBase.generateElement('div');
        tableContainer.classList.add('table-g');
        // set table container id
        this.componentBase.setElementId(tableContainer, this.tableId);

        var tableBody = this.componentBase.generateElement('div');
        tableBody.classList.add('table-g-body');

        this.componentBase.addChildElementToExistingElement(tableBody, tableContainer);

        // TODO: Add table headers once I figured it out

        this.data.forEach((item: any, index: number) => {

            var tableRowForCells = this.componentBase.generateElement('div');
            tableRowForCells.classList.add('table-g-row');
            this.componentBase.addChildElementToExistingElement(tableRowForCells, tableBody);

            Object.keys(item).forEach((key) => {
                console.log(item[key]);
                var tempElement = this.componentBase.generateElement('div');
                tempElement.classList.add('table-g-cell');
                tempElement.innerHTML = item[key];
                this.componentBase.addChildElementToExistingElement(tempElement, tableRowForCells);
            });
        });
        
        this.componentBase.addElementToBody(tableContainer);

    }
}