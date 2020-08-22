function toast(input) {
    giga.toast(constants.TOAST.SUCCESS, {text: input, icon: 'far fa-check-circle'})
}

function modal() {
    giga.modal({title: 'Modal title', buttons: {cancel: 'Cancel', ok: 'Ok'}});
}