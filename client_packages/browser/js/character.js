var data = {
    "father":["Бенджамин", "Даниэль", "Джошуа", "Ной", "Эндрю", "Хуан", "Алекс", "Исаак", "Эван", "Итан", "Винсент", "Ангел", "Диего","Адриан","Габриэль","Майкл","Сантьяго","Кевин","Луи","Самуэль","Энтони","Клод","Нико","Джон"],
    "mother":["Ханна","Обри","Жасмин","Жизель","Амелия","Изабелла","Зоя","Ава","Камила","Вайолет","София","Эвелин","Николь","Эшли","Грейси","Брианна","Натали","Оливия","Элизабет","Шарлотта","Эмма","Мисти"],
    "eyebrowsM":["Нет","Нормальные","Модные","Клеопатра","Насмешливые","Женственные","Соблазнительные","Прищемленные","Чола","Триумф","Беззаботные","Пышные","Грызун","Двойные","Тонкие","Карандашные","Щупальца","Узкие прямые","Натуральные","Нечеткие","Неопрятные","Гусеницы","Обычные","Средиземноморские","Ухоженные","Бушель","Пернатые","Колючие","Монобровь","Крылатые","Тройные","Арочные","Вырезки","Редкие","Индивидуальные"],
    "eyebrowsF":["Нет","Нормальные","Модные","Клеопатра","Насмешливые","Женственные","Соблазнительные","Прищемленные","Чола","Триумф","Беззаботные","Пышные","Грызун","Двойные","Тонкие","Карандашные","Щупальца","Узкие прямые","Натуральные","Нечеткие","Неопрятные","Гусеницы","Обычные","Средиземноморские","Ухоженные","Бушель","Пернатые","Колючие","Монобровь","Крылатые","Тройные","Арочные","Вырезки","Редкие","Индивидуальные"],
    "beard":["Нет", "Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4", "Вариант 5", "Вариант 6", "Вариант 7", "Вариант 8", "Вариант 9", "Вариант 10", "Вариант 11", "Вариант 12", "Вариант 13", "Вариант 14", "Вариант 15", "Вариант 16", "Вариант 17", "Вариант 18", "Вариант 19", "Вариант 20", "Вариант 21", "Вариант 22", "Вариант 23", "Вариант 24", "Вариант 25", "Вариант 26", "Вариант 27", "Вариант 28", "Вариант 29"],
    "hairM":["Нет", "Buzzcut", "Faux Hawk", "Hipster", "Side Parting", "Shorter Cut", "Biker", "Ponytail", "Cornrows", "Slicked", "Short Brushed", "Spikey", "Caesar", "Chopped", "Dreads", "Long Hair", "Shaggy Curls", "Surfer Dude", "Short Side Part", "High Slicked Sides", "Long Slicked", "Hipster Youth", "Mullet", "Classic Cornrows", "Palm Cornrows", "Lightning Cornrows", "Whipped Cornrows", "Zig Zag Cornrows", "Snail Cornrows", "Hightop", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Mod", "Layered Mod", "Flattop", "Rolled Quiff"],
    "hairF":["Нет", "Short", "Layered Bob", "Pigtails", "Ponytail", "Braided Mohawk", "Braids", "Bob", "Faux Hawk", "French Twist", "Long Bob", "Loose Tied", "Pixie", "Shaved Bangs", "Top Knot", "Wavy Bob", "Messy Bun", "Pin Up Girl", "Tight Bun", "Twisted Bob", "Flapper Bob", "Big Bangs", "Braided Top Knot", "Mullet", "Pinched Cornrows", "Leaf Cornrows", "Zig Zag Cornrows", "Pigtail Bangs", "Wave Braids", "Coil Braids", "Rolled Quiff", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Bandana and Braid", "Layered Mod"],
    "hairColor":["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
    "eyeColor":["Зеленый","Изумрудный","Голубой","Синийокеан","Светло-коричневый","Темно-коричневый","Ореховый","Темно-серый","Светло-серый","Розовый","Желтый","Фиолетовый"]
};
Vue.component('list',{
    template: '<div v-bind:id="id" class="list">\
    <i @click="left" class="left flaticon-left-arrow"></i>\
    <div>{{ values[index] }}</div>\
    <i @click="right" class="right flaticon-arrowhead-pointing-to-the-right"></i></div>',
    props: ['id','num'],
    data: function(){
        return {
            index: 0,
            values: this.num ? [-1,-0.1,-0.2,-0.3,-0.4,-0.5,-0.6,-0.7,-0.8,-0.9,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1] : data[this.id],
        }
    },
    methods: {
        left: function(event){
            this.index--
            if(this.index < 0) this.index=0
            this.send()
        },
        right: function(event){
            this.index++
            if(this.index == this.values.length) this.index=0
            this.send()
        },
        send: function(){
            var value = this.num ? this.values[this.index] : this.index
            //console.log('editorList:'+this.id+':'+value)
            mp.trigger('editorList', this.id, Number(value))
        }
    }
})
var editor = new Vue({
    el: ".editor",
    data: {
        active: true,
        gender: true,
        isSurgery: false,
    },
    methods: {
        genderSw: function(type){
            //console.log("gender:"+type)
            if(type){
                this.gender=true
                mp.trigger('characterGender',"Male")
            } else {
                this.gender=false
                mp.trigger('characterGender',"Female")
            }
        },
        save: function(){
            //console.log('characterSave')
            mp.trigger('characterSave')
        }
    }
});
$(function() {
    $(document).on('input', 'input[type="range"]', function(e) {
        let id = e.target.id;
        let val = e.target.value;
        //console.log('editorList:'+id+':'+val);
        $('output#'+id).html(val);
        mp.trigger('editorList', id, Number(val));
    });
    
    $('input[type=range]').rangeslider({
      polyfill: false,
    });

    $('#gendermale').on('click', function(){
        $('#genderfemale').removeClass('on');
        $('#gendermale').addClass('on');
        //console.log(this)
        editor.genderSw(true);
    });
    $('#genderfemale').on('click', function(){
        $('#gendermale').removeClass('on');
        $('#genderfemale').addClass('on');
        //console.log(this)
        editor.genderSw(false);
    });
});