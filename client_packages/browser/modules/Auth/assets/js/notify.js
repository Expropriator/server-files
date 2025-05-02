function notify(type, layout, message, time) {
    var types = [
        'alert', 
        'error', 
        'success', 
        'information', 
        'warning'
    ];

    var layouts = [
        'top', 
        'topLeft', 
        'topCenter', 
        'topRight', 
        'center', 
        'centerLeft', 
        'centerRight', 
        'bottom', 
        'bottomLeft', 
        'bottomCenter', 
        'bottomRight'
    ];

    var style = [
        '<div class="icons"><img src="assets/notify/alert.svg"></div>', 
        '<div class="icons"><img src="assets/notify/error.svg"></div>',
        '<div class="icons"><img src="assets/notify/success.svg"></div>',
        '<div class="icons"><img src="assets/notify/alert.svg"></div>',
        '<div class="icons"><img src="assets/notify/warning.svg"></div>'
    ]

    message = 
    '<div class="new_notify">'
        +style[type]+
        '<div class="descript">'
            +message+
       '</div>'
    '</div>'
    ;

    new Noty({
        type: types[type],
        layout: layouts[layout],
        theme: '3oxaan',
        text: message,
        timeout: time,
        progressBar: true,
        animation: {
            open: 'noty_effects_open',
            close: 'noty_effects_close'
        }
    }).show();
}