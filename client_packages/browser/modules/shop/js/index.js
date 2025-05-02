var shop = new Vue({
    el: ".shop",
    data: {
        active: true,
		currentTab: 0,
		header: "SHARP MARKET",
		street: "ВАЙНВУД ХИЛЛЗ",
		categories: ["Продукты", "Алкоголь", "Инструменты", "Разное"],
		items: [
			// [
			//   {type: 4, title: 'Монтировка', price: 150},
			//   {type: 5, title: 'Молоток', price: 150},
			//   {type: 6, title: 'Гаечный ключ', price: 150},
			//   {type: 7, title: 'Канистра бензина', price: 150},
			//   {type: 8, title: 'Связка ключей', price: 150}
			// ],
			// [
			//   {type: 4, title: 'Монтировка', price: 150},
			//   {type: 5, title: 'Молоток', price: 150},
			// ],
			// [
			//   {type: 6, title: 'Гаечный ключ', price: 150},
			//   {type: 7, title: 'Канистра бензина', price: 150},
			//   {type: 8, title: 'Связка ключей', price: 150}
			// ],
			// [
			//   {type: 6, title: 'Гаечный ключ', price: 150},
			//   {type: 8, title: 'Связка ключей', price: 150}
			// ]
		],
		basket: [ ],
		selectedItem: null,
		quantity: 1
    },
    methods: {
        current: function(id){
            this.currentTab = id;
        },
		openQuantitySelector: function(item) {
			this.selectedItem = item; // Устанавливаем выбранный товар
			this.quantity = 1; // Сбрасываем количество
		},
		confirmPurchase: function () {
			if (this.quantity > 0) {
				alert(`Вы купили ${this.quantity} шт. ${this.selectedItem.title}`);
				this.closeModal();
			}
		},
		closeModal: function() {
			this.selectedItem = null; // Закрываем модальное окно
		},
		exit: function() {
			mp.events.call('Close_new_shop');
		}
    }
})

mp.events.add('shop:selectQuantity', (type, title, price) => {
	// Открываем интерфейс для выбора количества
	mp.gui.chat.push(`Вы выбрали: ${title} (${price}$). Введите количество в чат:`);
	mp.events.call('shop:awaitQuantity', type, title, price);
});

mp.events.add('shop:awaitQuantity', (type, title, price) => {
	mp.gui.chat.push(`Введите количество для ${title} в чат: /buy <количество>`);

	// Обработчик ввода команды
	mp.events.add('playerCommand', (command) => {
		if (command.startsWith('buy')) {
			const args = command.split(' ');
			if (args.length > 1) {
				const quantity = parseInt(args[1]);
				if (!isNaN(quantity) && quantity > 0) {
					// Отправляем данные на сервер для покупки
					mp.events.callRemote('shop:buy', type, quantity);
					mp.gui.chat.push(`Вы купили ${quantity} единиц ${title} за ${quantity * price}$`);
				} else {
					mp.gui.chat.push(`Укажите корректное количество!`);
				}
			}
		}
	});
});