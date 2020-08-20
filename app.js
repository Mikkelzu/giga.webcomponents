function toast(input) {
    giga.toast(constants.TOAST.WARNING, {text: input})
}

function modal() {
    giga.modal({title: 'Modal title', buttons: {cancel: 'Cancel', ok: 'Ok'}});
}