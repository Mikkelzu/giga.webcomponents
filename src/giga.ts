import { ElementType } from "./element.type";

export default class ComponentBase {

    public ComponentBase() {}
    
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
        setTimeout(function() {
            element.classList.remove('toast-visible')
            element.classList.add('toast-invisible')
        }, options.timeOut)

        setTimeout(function() {
            element.remove();
            toasts.all.pop(element);
        }, options.timeOut + 250)
    }
}