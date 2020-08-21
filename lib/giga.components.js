/**
 * components main class
 */
var giga = giga || (() => {

    /**
     * properties
     */
    var toasts = {all: []};
    var wrapper = null;

    /**
     * Check to see if there are toasts in something
     */
    var checkForMultipleToasts = () => {

        console.log('hey hey');
       
    }

    /**
     * Generate an element with given input of type of element (ie, div, form, etc)
     * @param {string} elementType element type to be rendered on the dom
     */
    var generateElement = (elementType) => {
        var element = document.createElement(elementType);
        return element;
    }

     /**
     * type of enum/struct to have the html elements already pre-defined that we can generate
     */
    const generatableHtmlElements = {
        DIV: 'div',
        SPAN: 'span',
        BUTTON: 'button'
    }

    /**
     * Set the element id of an element we want to generate
     * @param {object} element 
     * @param {string} idToSet 
     */
    var setElementId = (element, idToSet) => {
        element.id = idToSet;
    }

    /**
     * Append an element to the body, mostly for the modal and the toast
     * @param {object} element element we're looking to append to body
     */
    var addElementToBody = (element) => {
        document.body.append(element);
    }

    /**
     * Add an element to another one
     * @param {object} child
     * @param {object} parent 
     */
    var addChildElementToExistingElement = (child, parent) => {
        parent.append(child);
    }

    /**
     * Just a private object for standard options.
     */
    var standardToastOptions = {
        position: 'top-right',
        timeOut: 1500
    }

    /**
     * Generate a modal element
     * @param {object} options 
     */
    var generateModal = (options) => {
        var modalElement = generateElement(generatableHtmlElements.DIV);
        var modalContainer = generateElement(generatableHtmlElements.DIV);
        var modalHeader = generateElement(generatableHtmlElements.DIV);
        var modalFooter = generateElement(generatableHtmlElements.DIV);
        var modalBody = generateElement(generatableHtmlElements.DIV);
        var footerButtonWrapper = generateElement(generatableHtmlElements.DIV);
        var modalTitle = generateElement(generatableHtmlElements.SPAN);

        setElementId(modalElement, '_modal');
        modalElement.classList.add('modal');

        modalContainer.classList.add('modal-container');
        modalHeader.classList.add('modal-header');
        modalBody.classList.add('modal-body');
        modalFooter.classList.add('modal-footer');
        footerButtonWrapper.classList.add('footer-button-wrapper');
        modalTitle.classList.add('modal-title');
        modalTitle.innerHTML = options.title;

        modalElement.append(modalContainer);
        modalContainer.append(modalHeader, modalBody, modalFooter);
        
        modalHeader.append(modalTitle);
        modalFooter.append(footerButtonWrapper);

        if (options.buttons) {
            Object.keys(options.buttons).forEach(function(key) {
                var btn = generateElement(generatableHtmlElements.BUTTON);
                btn.classList.add('btn', 'modal-btn');
                btn.innerHTML = options.buttons[key];
                footerButtonWrapper.append(btn)
            });
        }

        return modalElement;
    }

    /**
     * @returns array of 2 elements, index 0 is the icon, index 1 is the text of the span.
     */
    var generateToastSpanElements = () => {
        var spanIcon  = generateElement(generatableHtmlElements.SPAN);
        var spanText = generateElement(generatableHtmlElements.SPAN);

        return [spanIcon, spanText];
    }

    /**
     * giga (scope) defined variable to store the objects for a toast we generate
     */
     var toastSpansObj = {spans: []};

    /**
     * @returns base toast element with all elements appended and hierarchy structured
     */
    var generateToastElements = () => {
        var el = generateElement(generatableHtmlElements.DIV);
        
        var spanIcon = generateElement(generatableHtmlElements.SPAN);
        var spanText = generateElement(generatableHtmlElements.SPAN);

        toastSpansObj.spans.push(spanIcon, spanText);

        el.style.zIndex = 9999;

        for (var i = 0; i < toasts.all.length; i++) {
            toastSpansObj.spans[i].classList.add('icon');
            toastSpansObj.spans[i+1].classList.add('toast-text');

            console.log('hello '+ toastSpansObj);

            el.append(toastSpansObj.spans[i], toastSpansObj.spans[i+1]);
        }

        el.append(toastSpansObj.spans[0], toastSpansObj.spans[1])

        toasts.all.push(el);

        console.log(toastSpansObj);
        return el;
    }

    /**
     * generate a wrapper element
     * @param {string} id 
     */
    var generateWrapperElement = (id) => {
        var el = generateElement(generatableHtmlElements.DIV);

        setElementId(el, id);
        
        console.log('generate wrapper')

        return el;
    }

    /**
     * 
     * @param {object} el element we want to manipulate
     * @param {object} options options for timeout timers
     */
    var elementTimeOutAndDestroy = (el, options) => {
        setTimeout(function() {
            el.classList.remove('toast-visible')
            el.classList.add('toast-invisible')
        }, options.timeOut)

        setTimeout(function() {
            el.remove();
        }, options.timeOut + 250)
    }

    return {
        /**
         * Generate a toast element
         * @param {string} toastClass The class name of the toast (success, failure, warning) - can declare a custom class if this exists in stylesheets
         * @param {object} options The options for the element we generate
         */
        toast: (toastClass, options) => {

            // check to see if there are more toasts in the dom, so we can somehow stack them
            if (toasts.all.length > 1) {
                toasts.all.forEach(element => {
                    element.style.top = 65;
                });
            }

            // fallback if user has only entered text as options param
            if (!options.hasOwnProperty('position') || !options.hasOwnProperty('timeOut')) {
                options.position = standardToastOptions.position;
                options.timeOut = standardToastOptions.timeOut;
            }
            var el = generateToastElements();
            el.classList.add('toast', toastClass);

            //Determine toast position
            el.classList.add('toast-position-' + options.position)

            toasts.all.forEach(toast => {
                toastSpansObj.spans[1].innerHTML = options.text;
            });
            
            el.style.display = 'block';
            el.classList.add('toast-visible');

            addElementToBody(el);

            //addChildElementToExistingElement(el, wrapper);

            // elementTimeOutAndDestroy(el, options);
        },
        modal: (options = {}) => {
            
            var element = generateModal(options);

            // TODO, before we render modal we need to make sure it can pop in an out of the view
            addElementToBody(element);
        }
    }
})();

/**
 * Constants for the componenets
 */
var constants = constants || (() => {

    const toastTypes = {
        WARNING: 'warning',
        FAILURE: 'failure',
        SUCCESS: 'success'
    }

    return {
        TOAST: toastTypes
    }
})();