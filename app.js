
function toast(input) {
    Toast('success', {text: input, icon: 'far fa-check-circle fa-lg'});
}

function modal() {
    giga.modal({title: 'Modal title', buttons: {cancel: 'Cancel', ok: 'Ok'}});
}

function table() {
    Table('tableid', ['head1', 'head2', 'head3'], [{name: 'mike', lastname: 'lindemans', height: '183'},{name: 'name', lastname: 'lastname', height: '152'}]);
}