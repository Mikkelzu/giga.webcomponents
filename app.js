function toast(input) {
    Toast(Constants.SUCCESS, {text: input, icon: 'far fa-check-circle fa-lg'})
}

function modal() {
    giga.modal({title: 'Modal title', buttons: {cancel: 'Cancel', ok: 'Ok'}});
}