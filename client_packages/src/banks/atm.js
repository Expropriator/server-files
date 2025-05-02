global.atm = mp.browsers.new('package://browser/modules/Banks/atm.html');

// ATM //
var atmIndex = 0;

// Open ATM Interface
mp.events.add('openatm', () => {
    if (global.menuCheck()) return;
    global.atm.execute('atm.active=1');
    menuOpen();
});

// Close ATM Interface
mp.events.add('closeatm', () => {
    menuClose();
    global.atm.execute('atm.reset();atm.active=0');
});

// Set ATM Information
mp.events.add('setatm', (num, name, bal, sub) => {
    global.atm.execute(`atm.set('${num}', '${name}', '${bal}', '${sub}')`);
});

// Update Bank Balance
mp.events.add('setbank', (bal) => {
    global.atm.execute(`atm.balance="${bal}"`);
});

// Handle ATM Callback
mp.events.add('atmCB', (type, data) => {
    mp.events.callRemote('atmCB', type, data);
});

let atmTcheck = 0;

// Validate ATM Interaction
mp.events.add('atmVal', (data) => {
    if (new Date().getTime() - atmTcheck < 1000) {
        mp.events.callRemote('atmDP');
    } else {
        mp.events.callRemote('atmVal', data);
        atmTcheck = new Date().getTime();
    }
});

// Open ATM with Data
mp.events.add('atmOpen', (data) => {
    global.atm.execute(`atm.open(${data})`);
});

// Open ATM for Business
mp.events.add('atmOpenBiz', (data1, data2) => {
    global.atm.execute(`atm.open([3, ${data1}, ${data2}])`);
});

// Handle ATM Actions
mp.events.add('atm', (index, data) => {
    if (index == 4) {
        ATMTemp = data;
        global.atm.execute('atm.change(44)');
    } else if (index == 44) {
        mp.events.callRemote('atm', 4, data, ATMTemp);
        global.atm.execute('atm.reset()');
        return;
    } else if (index == 33) {
        mp.events.callRemote('atm', 3, data, ATMTemp);
    } else {
        mp.events.callRemote('atm', index, data);
        global.atm.execute('atm.reset()');
    }
});

let ATMTemp = "";