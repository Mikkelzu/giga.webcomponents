
function toast(input) {
    Toast('success', {text: input, icon: 'far fa-check-circle fa-lg'});
}

function modal() {
    giga.modal({title: 'Modal title', buttons: {cancel: 'Cancel', ok: 'Ok'}});
}

function table() {
    Table();
}