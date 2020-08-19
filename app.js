function toast() {
    giga.toast(constants.TOAST.WARNING, {text: 'standard'})
}

function modal() {
    giga.modal({title: 'Modal title', buttons: {cancel: 'Cancel', ok: 'Ok'}});
}