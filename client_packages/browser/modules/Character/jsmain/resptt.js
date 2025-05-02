// Destination - custom module for element's
// All right received
// (c) Nexus-Rp.net
// Developed with ♥ by TheTarasik

// Tabs
// Warning! All element's must have unique data attribute 'tabs' && 'id'
$('.tabs').on('click', function () {
    const el = $(this);
    $(`.tabs[data-tabs=${$(this).data('tabs')}]`).removeClass('active');
    $(`.tabs[data-tabs=${$(this).data('tabs')}]`).each(function () {
        if ($(this).data('tabs') === el.data('tabs') && $(this).data('id') === el.data('id')) {
            $(this).addClass('active');
        }
    });

    $(`.tabs-content__item[data-tabs=${$(this).data('tabs')}]`).removeClass('active');
    $(`.tabs-content__item[data-tabs=${$(this).data('tabs')}]`).each(function () {
        if ($(this).data('tabs') === el.data('tabs') && $(this).data('id') === el.data('id')) {
            $(this).addClass('active');
        }
    });
});

const stackMessage = (message, type) => {
    switch(+type) {
        case 1:
            console.log(`%c ${message}`, 'color: #38ad69; font-size: 16px;');
            break;
        case 2:
            console.log(`%c ${message}`, 'color: #ffc107; font-size: 16px;');
            break;
        case 3:
            console.log(`%c ${message}`, 'color: #dc3545; font-size: 16px;');
            break;
    }
};