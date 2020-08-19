var giga = giga || (function() {
    var generateElement = function(elementType) {
        var element = document.createElement(elementType);
        return element;
    }

    var setElementId = function(element, idToSet) {
        element.id = idToSet;
    }

    var addElementToBody = function(element) {
        document.body.append(element);
    }

    var standardToastOptions = {
        position: 'top-right',
        timeOut: 1500
    }

    var checkMousePositionOnElement = function(element) {
        element.mouseIsOver = false;
        element.onmouseover = function() {
            this.mouseIsOver = true;
            return true;
        }
        element.onmouseout = function() {
            this.mouseIsOver = false;
            return false;
        }
    }

    return {
        /**
         * Generate a toast element
         * @param {string} toastClass The class name of the toast (success, failure, warning) - can declare a custom class if this exists in stylesheets
         * @param {object} options The options for the element we generate
         */
        toast: function (toastClass, options) {
            // fallback if user has only entered text as options param
            if (!options.hasOwnProperty('position') || !options.hasOwnProperty('timeOut')) {
                options.position = standardToastOptions.position;
                options.timeOut = standardToastOptions.timeOut;
            }
            //Generate base elements
            var el = generateElement('div');
            el.style.zIndex = 9999;
            var spanIcon  = generateElement('span');
            var spanText = generateElement('span');

            spanIcon.classList.add('icon');
            spanText.classList.add('toast-text')    
            el.classList.add('toast', toastClass);

            el.append(spanIcon, spanText)
            addElementToBody(el);

            //Determine toast position
            el.classList.add('toast-position-' + options.position)

            spanText.innerHTML = options.text;
            el.style.display = 'block';
            el.classList.add('toast-visible');

            setTimeout(function() {
                el.classList.remove('toast-visible')
                el.classList.add('toast-invisible')
            }, options.timeOut)

            setTimeout(function() {
                el.remove();
            }, options.timeOut + 250)
        },
        modal: function (options = {}) {
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

            // TODO, before we render modal we need to make sure it can pop in an out of the view
            addElementToBody(modalElement);
        }
    }
})();