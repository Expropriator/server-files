let infoped = null

mp.events.add('UpdateQuestWho', () => {
    if (infoped == null) {
        infoped = mp.browsers.new("package://browser/quests/who/ped/infoped.html")
        mp.gui.cursor.show(true, true)
		infoped.active = true
    } else if (infoped.active == false){
        infoped.active = true
        mp.gui.cursor.show(false, false)
    }
})

mp.events.add('closePedInfo3', () => {
    infoped.active = false
    mp.gui.cursor.show(false, false)
})