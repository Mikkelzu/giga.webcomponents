/**
 * components main class
 */
var giga = giga || (() => {

    /**
     * Generate an element with given input of type of element (ie, div, form, etc)
     * @param {string} elementType element type to be rendered on the dom
     */
    var generateElement = (elementType) => {
        var element = document.createElement(elementType);
        return element;
    }

    /**
     * Set the element id of an element we want to generate
     * @param {object} element 
     * @param {number} idToSet 
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
        var modalElement = generateElement('div');
        var modalContainer = generateElement('div');
        var modalHeader = generateElement('div');
        var modalFooter = generateElement('div');
        var modalBody = generateElement('div');
        var footerButtonWrapper = generateElement('div');
        var modalTitle = generateElement('span');

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
                var btn = generateElement('button');
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
        var spanIcon  = generateElement('span');
        var spanText = generateElement('span');

        return [spanIcon, spanText];
    }

    /**
     * giga (scope) defined variable to store the objects for a toast we generate
     */
    const toastSpansObj = generateToastSpanElements();

    /**
     * @returns base toast element with all elements appended and hierarchy structured
     */
    var generateToastElements = () => {
        //Generate base elements
        var el = generateElement('div');
        el.style.zIndex = 9999;
      

        toastSpansObj[0].classList.add('icon');
    
        toastSpansObj[1].classList.add('toast-text');

        el.append(toastSpansObj[0], toastSpansObj[1])

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
            // fallback if user has only entered text as options param
            if (!options.hasOwnProperty('position') || !options.hasOwnProperty('timeOut')) {
                options.position = standardToastOptions.position;
                options.timeOut = standardToastOptions.timeOut;
            }
            var el = generateToastElements();
            el.classList.add('toast', toastClass);

            addElementToBody(el);

            //Determine toast position
            el.classList.add('toast-position-' + options.position)

            toastSpansObj[1].innerHTML = options.text;
            el.style.display = 'block';
            el.classList.add('toast-visible');

            elementTimeOutAndDestroy(el, options);
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
var constants = constants || (function() {

    const toastTypes = {
        WARNING: 'warning',
        FAILURE: 'failure',
        SUCCESS: 'success'
    }

    return {
        TOAST: toastTypes
    }
})();