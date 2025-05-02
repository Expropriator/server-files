let infoped = null

mp.events.add('UpdateQuest1', () => {
    if (infoped == null) {
        infoped = mp.browsers.new("package://browser/quests/1/ped/infoped.html")
        mp.gui.cursor.show(true, true)
		infoped.active = true
    } else if (infoped.active == false){
        infoped.active = true
        mp.gui.cursor.show(false, false)
    }
})

mp.events.add('closePedInfo', () => {
    infoped.active = false
    mp.gui.cursor.show(false, false)
})