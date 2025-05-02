

let shopik = mp.browsers.new("package://browser/shop.html");

var shopOpen = false;

mp.events.add("shop.set", (json) => {
    if (global.menuCheck() && !shopOpen) return;
    global.menuOpen();
    shopOpen = true;
    shopik.execute(`SHOP.open(${json})`);
});

mp.events.add("shop.buy", (card, cart) => {
    mp.events.callRemote("shop.server.buy", card, cart);
});

mp.events.add("shop.remove", (index) => {
    shopik.execute(`SHOP.remove(${index})`);
});

mp.events.add("shop.close", () => {
    shopOpen = false;
    global.menuClose();
});

mp.keys.bind(Keys.VK_ESCAPE, false, function () { // ESC
    if (!shopOpen) return;

    shopik.execute(`SHOP.exit()`);
});
