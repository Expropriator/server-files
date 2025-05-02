var data = {
    "father":["Benjamin", "Daniel", "Joshua", "Noah", "Andrew", "Juan", "Alex", "Isaac", "Evan", "Ethan", "Vincent", "Angel", "Diego", "Adrian", "Gabriel", "Michael", "Santiago", "Kevin", "Louis", "Samuel", "Anthony", "Claude", "Niko"], // "John"
    "mother":["Hannah", "Aubrey", "Jasmine", "Gisele", "Amelia", "Isabella", "Zoe", "Ava", "Camila", "Violet", "Sophia", "Evelyn", "Nicole", "Ashley", "Gracie", "Brianna", "Natalie", "Olivia", "Elizabeth", "Charlotte", "Emma"], // "Misty"
    "eyebrowsM":["None", "Balanced", "Fashion", "Cleopatra", "Quizzical", "Femme", "Seductive", "Pinched", "Chola", "Triomphe", "Carefree", "Curvaceous", "Rodent", "Double Tram", "Thin", "Penciled", "Mother Plucker", "Straight and Narrow", "Natural", "Fuzzy", "Unkempt", "Caterpillar", "Regular", "Mediterranean", "Groomed", "Bushels", "Feathered", "Prickly", "Monobrow", "Winged", "Triple Tram", "Arched Tram", "Cutouts", "Fade Away", "Solo Tram"],
    "eyebrowsF":["None", "Balanced", "Fashion", "Cleopatra", "Quizzical", "Femme", "Seductive", "Pinched", "Chola", "Triomphe", "Carefree", "Curvaceous", "Rodent", "Double Tram", "Thin", "Penciled", "Mother Plucker", "Straight and Narrow", "Natural", "Fuzzy", "Unkempt", "Caterpillar", "Regular", "Mediterranean", "Groomed", "Bushels", "Feathered", "Prickly", "Monobrow", "Winged", "Triple Tram", "Arched Tram", "Cutouts", "Fade Away", "Solo Tram"],
    "beard":["None", "Light Stubble", "Balbo", "Circle Beard", "Goatee", "Chin", "Chin Fuzz", "Pencil Chin Strap", "Scruffy", "Musketeer", "Mustache", "Trimmed Beard", "Stubble", "Thin Circle Beard", "Horseshoe", "Pencil and 'Chops", "Chin Strap Beard", "Balbo and Sideburns", "Mutton Chops", "Scruffy Beard", "Curly", "Curly & Deep Stranger", "Handlebar", "Faustic", "Otto & Patch", "Otto & Full Stranger", "Light Franz", "The Hampstead", "The Ambrose", "Lincoln Curtain"],
    "hairM":["None", "Buzzcut", "Faux Hawk", "Hipster", "Side Parting", "Shorter Cut", "Biker", "Ponytail", "Cornrows", "Slicked", "Short Brushed", "Spikey", "Caesar", "Chopped", "Dreads", "Long Hair", "Shaggy Curls", "Surfer Dude", "Short Side Part", "High Slicked Sides", "Long Slicked", "Hipster Youth", "Mullet", "Classic Cornrows", "Palm Cornrows", "Lightning Cornrows", "Whipped Cornrows", "Zig Zag Cornrows", "Snail Cornrows", "Hightop", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Mod", "Layered Mod", "Flattop", "Rolled Quiff"],
    "hairF":["None", "Short", "Layered Bob", "Pigtails", "Ponytail", "Braided Mohawk", "Braids", "Bob", "Faux Hawk", "French Twist", "Long Bob", "Loose Tied", "Pixie", "Shaved Bangs", "Top Knot", "Wavy Bob", "Messy Bun", "Pin Up Girl", "Tight Bun", "Twisted Bob", "Flapper Bob", "Big Bangs", "Braided Top Knot", "Mullet", "Pinched Cornrows", "Leaf Cornrows", "Zig Zag Cornrows", "Pigtail Bangs", "Wave Braids", "Coil Braids", "Rolled Quiff", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Bandana and Braid", "Layered Mod"],
    "hairColor":[{description: "0", hex: '#303030'}, {description: "1", hex: '#373737'}, {description: "2", hex: '#40352F'}, {description: "3", hex: '#4E3527'}, {description: "4", hex: '#55310D'}, {description: "5", hex: '#733904'}, {description: "6", hex: '#794721'}, {description: "7", hex: '#7E5232'}, {description: "8", hex: '#81634D'}, {description: "9", hex: '#967A59'}, {description: "10", hex: '#AB9759'}, {description: "11", hex: '#D7C07C'}, {description: "12", hex: '#C7A643'}, {description: "13", hex: '#ECC35F'}, {description: "14", hex: '#8E7758'}, {description: "15", hex: '#5D2F29'}, {description: "16", hex: '#682F26'}, {description: "17", hex: '#6F1D11'}, {description: "18", hex: '#7E1A0D'}, {description: "19", hex: '#4E1212'}, {description: "20", hex: '#640F0A'}, {description: "21", hex: '#7c140f'},{description: "22", hex: '#a02e19'},{description: "23", hex: '#b64b28'},{description: "24", hex: '#a2502f'},{description: "25", hex: '#aa4e2b'},{description: "26", hex: '#626262'},{description: "27", hex: '#808080'},{description: "28", hex: '#aaaaaa'}, {description: "29", hex: '#c5c5c5'}, {description: "30", hex: '#463955'}, {description: "31", hex: '#5a3f6b'}, {description: "32", hex: '#763c76'}, {description: "33", hex: '#ed74e3'}, {description: "34", hex: '#eb4b93'}, {description: "35", hex: '#f299bc'}, {description: "36", hex: '#04959e'}, {description: "37", hex: '#025f86'}, {description: "38", hex: '#023974'}, {description: "39", hex: '#3fa16a'}, {description: "40", hex: '#217c61'}, {description: "41", hex: '#185c55'}, {description: "42", hex: '#b6c034'}, {description: "43", hex: '#70a90b'}, {description: "44", hex: '#439d13'}, {description: "45", hex: '#dcb857'}, {description: "46", hex: '#e5b103'}, {description: "47", hex: '#e69102'}, {description: "48", hex: '#f28831'}, {description: "49", hex: '#fb8057'}, {description: "50", hex: '#e28b58'}, {description: "51", hex: '#d1593c'}, {description: "52", hex: '#ce3120'}, {description: "53", hex: '#ad0903'}, {description: "54", hex: '#880302'}, {description: "62", hex: '#706c66'}, {description: "63", hex: '#9d7a50'}],
	"eyeColor":[{description: "Green", hex: '#00ff00'}, {description: "Emerald", hex: '#50c878'}, {description: "Light Blue", hex: '#add8e6'}, {description: "Ocean Blue", hex: '#009dc4'}, {description: "Light Brown", hex: '#b5651d'}, {description: "Dark Brown", hex: '#654321'}, {description: "Hazel", hex: '#8e7618'}, {description: "Dark Gray", hex: '#a9a9a9'}, {description: "Light Gray", hex: '#d3d3d3'}, {description: "Pink", hex: '#ff69b4'}, {description: "Yellow", hex: '#ffff00'}, {description: "Purple", hex: '#800080'}],
    "outerwearM":['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    "outerwearF":['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    "pantsM":['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
    "pantsF":['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    "shoesM":['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    "shoesF":['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
};
// function getRandomItem(arr) {
				// const randomIndex = Math.floor(Math.random() * arr.length);
				// const item = arr[randomIndex];
				// return item;
			// }
// const resultF = getRandomItem(data.father);
// const result = Number(resultF)
// function randomInteger(min, max) {
  // let rand = min + Math.random() * (max - min);
  // return Math.round(rand);
// }
// alert( randomInteger(0, 22) );
// console.log(result);
// const resultM = getRandomItem(data.mother);
Vue.component('list',{
    template: `\
    <div class="card-content__gen-tabs__wrapper">\
            <div v-for="(item, index) in values" v-bind:id="id" :class='"card-content__gen-tabs__wrapper-item" + (index === 0 ? " active" : "")' @click="select">\
                <div class="gen-tabs__wrapper-item__preview" :data-id="index">\
                    <img :src='"./images/character/" + id + "/" + id + "" + index + ".png"' :alt="item" />\
                </div>\
            </div>\
    </div>`,
    props: ['id','num'],
    data: function() {
        return {
            index: 0,
            values: this.num ? [-1,-0.1,-0.2,-0.3,-0.4,-0.5,-0.6,-0.7,-0.8,-0.9,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1] : data[this.id],
        }
    },
    methods: {
        select: function(e) {
            this.index = +e.target.getAttribute('data-id');
            if(this.index == this.values.length) this.index=0
            this.send()
        },
        send: function() {
            var value = this.num ? this.values[this.index] : this.index
            try {
                mp.trigger('editorList', this.id, Number(value))
            } catch (e) {
                alert(`Что-то пошло не так, обратитесь в тех. поддержку. Ошибки ${e}`);
            }
        }
    }
});


Vue.component('listcolor',{
    template: `\
    <div class="card-content__list-color__wrapper">\
            <div v-for="(item, index) in values" v-bind:id="id" :class='"card-content__list-color__wrapper-item" + (index === 0 ? " active" : "")' @click="select">\
                <span :style='"background-color:" + item.hex' :data-id="index"></span>\
            </div>\
    </div>`,
    props: ['id','num'],
    data: function() {
        return {
            index: 0,
            values: this.num ? [-1,-0.1,-0.2,-0.3,-0.4,-0.5,-0.6,-0.7,-0.8,-0.9,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1] : data[this.id],
        }
    },
    methods: {
        select: function(e) {
            this.index = +e.target.getAttribute('data-id');
            if(this.index == this.values.length) this.index=0
            this.send()
        },
        send: function() {
            var value = this.num ? this.values[this.index] : this.index
            mp.trigger('editorList', this.id, Number(value))
        }
    }
});


var editor = new Vue({
    el: ".editor",
    data: {
        active: true,
        gender: true,
        isSurgery: false,
    },
    methods: {
        genderSw: function(type){
            if(type){
                this.gender=true
                mp.trigger('characterGender',"Male")
            } else {
                this.gender=false
                mp.trigger('characterGender',"Female")
            }
        },
        save: function(){
            try {
                mp.trigger('characterSave')
            } catch (e) {
                alert(`Что-то пошло не так, обратитесь в тех. поддержку. Ошибки ${e}`);
            }
        },
		randomChoose: function (e) {
            const el = e.currentTarget;
            $('input[type="range"]').each(function () {
                $(this).val(0).change();
				try {
					$(this)[0].nextSibling.childNodes[1].style.left = '8.75vw';
					$(this)[0].nextSibling.childNodes[2].style.width = '0vw';
					$(this)[0].nextSibling.childNodes[3].style.width = '0vw';
				} catch(e) {
					alert(`Что-то пошло не так, обратитесь в тех. поддержку. Ошибки ${e}`);
				}
            });

            $('.matrix-pointer').each(function () {
               $(this).css({'top': 'calc(50% - 0.26vw)', 'left': 'calc(50% - 0.26vw)'})
            });
            setTimeout(() => {
                el.classList.remove('active');
            }, 300);
			function getRandomItem(arr) {
				const randomIndex = Math.floor(Math.random() * arr.length);
				const item = arr[randomIndex];
				return item;
			}
			const resultF = getRandomItem(data.father);
			const result = '"' + resultF + '"'
			// const resultM = getRandomItem(data.mother);
            function rand() {
                return (Math.random() * (1 - -1) + -1).toFixed(1);
            } 
			function randomInteger(min, max) {
			  let rand = min + Math.random() * (max - min);
			  return Math.round(rand);
			}
            // Random gender -----------
            if (rand() > 0) {
                //this.genderSw(true)
            } else {
                //this.genderSw(false);
            }
            // -------------------------
			try {
                if (this.gender == true) {
					mp.trigger('editorList', 'eyeScale', Number(rand()));
					mp.trigger('editorList', 'noseHeight',Number(rand()));
					mp.trigger('editorList', 'noseWidth', Number(rand()));
					mp.trigger('editorList', 'noseDepth', Number(rand()));
					mp.trigger('editorList', 'noseDepth', Number(rand()));
					mp.trigger('editorList', 'noseBroke', Number(rand()));
					mp.trigger('editorList', 'noseBroke', Number(rand()));
					mp.trigger('editorList', 'noseTipLength', Number(rand()));
					mp.trigger('editorList', 'noseTipLength', Number(rand()));
					mp.trigger('editorList', 'noseTipHeight', Number(rand()));
					mp.trigger('editorList', 'cheekboneHeight', Number(rand()));
					mp.trigger('editorList', 'cheekboneWidth', Number(rand()));
					mp.trigger('editorList', 'cheekDepth', Number(rand()));
					mp.trigger('editorList', 'lipThickness', Number(rand()));
					mp.trigger('editorList', 'jawWidth', Number(rand()));
					mp.trigger('editorList', 'jawShape', Number(rand()));
					mp.trigger('editorList', 'chinHeight', Number(rand()));
					mp.trigger('editorList', 'chinWidth', Number(rand()));
					mp.trigger('editorList', 'chinDepth', Number(rand()));
					mp.trigger('editorList', 'chinIndent', Number(rand()));
					mp.trigger('editorList', 'father', randomInteger(0, 22));
					mp.trigger('editorList', 'mother', randomInteger(0, 20));
					mp.trigger('editorList', 'hairColor', randomInteger(0, 54));
					mp.trigger('editorList', 'eyeColor', randomInteger(0, 11));
					mp.trigger('editorList', 'hairM', randomInteger(0, 37));
					mp.trigger('editorList', 'beard', randomInteger(0, 29));
					mp.trigger('editorList', 'eyebrowsM', randomInteger(0, 34));
				}
				if (this.gender == false) {
					mp.trigger('editorList', 'eyeScale', Number(rand()));
					mp.trigger('editorList', 'noseHeight',Number(rand()));
					mp.trigger('editorList', 'noseWidth', Number(rand()));
					mp.trigger('editorList', 'noseDepth', Number(rand()));
					mp.trigger('editorList', 'noseDepth', Number(rand()));
					mp.trigger('editorList', 'noseBroke', Number(rand()));
					mp.trigger('editorList', 'noseBroke', Number(rand()));
					mp.trigger('editorList', 'noseTipLength', Number(rand()));
					mp.trigger('editorList', 'noseTipLength', Number(rand()));
					mp.trigger('editorList', 'noseTipHeight', Number(rand()));
					mp.trigger('editorList', 'cheekboneHeight', Number(rand()));
					mp.trigger('editorList', 'cheekboneWidth', Number(rand()));
					mp.trigger('editorList', 'cheekDepth', Number(rand()));
					mp.trigger('editorList', 'lipThickness', Number(rand()));
					mp.trigger('editorList', 'jawWidth', Number(rand()));
					mp.trigger('editorList', 'jawShape', Number(rand()));
					mp.trigger('editorList', 'chinHeight', Number(rand()));
					mp.trigger('editorList', 'chinWidth', Number(rand()));
					mp.trigger('editorList', 'chinDepth', Number(rand()));
					mp.trigger('editorList', 'chinIndent', Number(rand()));
					mp.trigger('editorList', 'father', randomInteger(0, 22));
					mp.trigger('editorList', 'mother', randomInteger(0, 20));
					mp.trigger('editorList', 'hairColor', randomInteger(0, 54));
					mp.trigger('editorList', 'eyeColor', randomInteger(0, 11));
					mp.trigger('editorList', 'eyebrowsF', randomInteger(0, 34));
					mp.trigger('editorList', 'hairF', randomInteger(0, 36));
				}
				// if (this.gender == true) {
					// mp.trigger('editorList', 'hairM', randomInteger(0, 37));
					// mp.trigger('editorList', 'beard', randomInteger(0, 29));
					// mp.trigger('editorList', 'eyebrowsM', randomInteger(0, 34));
				// }
				// else {
					// mp.trigger('editorList', 'eyebrowsF', randomInteger(0, 34));
					// mp.trigger('editorList', 'hairF', randomInteger(0, 36));
				// }
            } catch (e) {
                console.log(e);
            }
        }
    }
});
$(function() {

    $('.button-warning__character').on('click', function () {
        $('.character-warning').css({'display': 'none'});
    });

    $(document).on('input', 'input[type="range"]', function(e) {
        let id = e.target.id;
        let val = e.target.value;
        try {
            mp.trigger('editorList', id, Number(val));
        } catch (e) {
            console.log(e);
        }
    });

    $('input[type=range]').rangeslider({
      polyfill: false,
        onSlide: function (position) {
            const calc = $(this)[0].rangeDimension / position;
            const rangeLeft = $(this)[0].$range[0].querySelector('.range-fill__left');
            const rangeRight = $(this)[0].$range[0].querySelector('.range-fill__right');
            if (Math.floor(calc) <= 1) {
                rangeRight.style.width = '0px';
                rangeLeft.style.width = `${Math.floor($(this)[0].$handle[0].offsetLeft - ($(this)[0].$range[0].offsetWidth / 2)) / ($(this)[0].$range[0].offsetWidth / 2) * $(this)[0].$range[0].offsetWidth / 2}px`; //  fx / 112
            } else {
                rangeLeft.style.width = '0px';
                rangeRight.style.width = `${(Math.floor($(this)[0].$handle[0].offsetLeft - ($(this)[0].$range[0].offsetWidth / 2)) / ($(this)[0].$range[0].offsetWidth / 2) * $(this)[0].$range[0].offsetWidth / 2) * -1}px`; // fx / 112
            }
        }
    });

    $('.rangeslider').append('<div class="range-fill__right"></div><div class="range-fill__left"></div>');

    $('.character-options__male-chooser__wrapper-item').on('click', function(){
        $('.character-options__male-chooser__wrapper-item').removeClass('active');
        $(this).addClass('active');
        if ($(this).data('tabs') === 'gendermale') {
			try {
            editor.genderSw(true);
			} catch (e) {
				alert(e);
			}
        }

        if ($(this).data('tabs') === 'genderfemale') {
			try {
            editor.genderSw(false);
			} catch (e) {
				alert(e);
			}
        }
    });

    $('.card-content__gen-tabs__wrapper-item').on('click', function () {
        if ($(this).attr('id') === 'mother') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
            $(`.card-content__gen-tabs__selected-wrapper__preview-${$(this).attr('id')} img`).attr('src', $(this).find('img').attr('src'));
        }

        if ($(this).attr('id') === 'father') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
            $(`.card-content__gen-tabs__selected-wrapper__preview-${$(this).attr('id')} img`).attr('src', $(this).find('img').attr('src'));
        }

        if ($(this).attr('id') === 'hairM') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }

        if ($(this).attr('id') === 'hairF') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }

        if ($(this).attr('id') === 'beard') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }

        if ($(this).attr('id') === 'eyebrowsM') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }

        if ($(this).attr('id') === 'eyebrowsF') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }
		
		if ($(this).attr('id') === 'outerwearM') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }
		
		if ($(this).attr('id') === 'outerwearF') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }
		
		if ($(this).attr('id') === 'pantsM') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }
		
		if ($(this).attr('id') === 'pantsF') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }
		
		if ($(this).attr('id') === 'shoesM') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }
		
		if ($(this).attr('id') === 'shoesF') {
            $(`.card-content__gen-tabs__wrapper-item#${$(this).attr('id')}`).removeClass('active');
            $(this).addClass('active');
        }
    });

    $('.card-content__list-color__wrapper-item').on('click', function () {
        $(`.card-content__list-color__wrapper-item#${$(this).attr('id')}`).removeClass('active');
        $(this).addClass('active');
    });

    $('.matrix-pointer').each(function () {
       $(this).draggable({
           containment: $(this).parent(), scroll: false
       });
    });

    const calculateAxis = (data, id, value, pointer) => {
        const pointerOffset = pointer[0];
        let offsetTop, offsetLeft;
        switch(id) {
            case 1:
                offsetTop = pointerOffset.offsetTop - data.height();
                offsetLeft = pointerOffset.offsetLeft - data.width() + 10;

                inputHandler(offsetTop * -1, offsetLeft, value);
                break;
            case 2:
                offsetTop = pointerOffset.offsetTop - data.height();
                offsetLeft = pointerOffset.offsetLeft - data.width() + 10;

                inputHandler(offsetTop * -1, offsetLeft, value);
                break;
            case 3:
                offsetTop = pointerOffset.offsetTop - data.height();
                offsetLeft = pointerOffset.offsetLeft - data.width() + 10;

                inputHandler(offsetTop * -1, offsetLeft, value);
                break;
            case 4:
                offsetTop = pointerOffset.offsetTop - data.height();
                offsetLeft = pointerOffset.offsetLeft - data.width() + 10;

                inputHandler(offsetTop * -1, offsetLeft, value);
                break;
        }
    };

    const inputHandler = (y, x, type) => {
        let inputAxisY, inputAxisX;
        switch (type) {
            case 'nose': // Нос
                inputAxisY = y / 100 * 1;
                inputAxisX = x / 100 * 1;

                mp.trigger('editorList', 'noseHeight', Number(inputAxisY.toFixed(1)));
                mp.trigger('editorList', 'noseWidth', Number(inputAxisX.toFixed(1)));
                break;

            case 'cheekbone': // Скулы
                inputAxisY = y / 100 * 1;
                inputAxisX = x / 100 * 1;

                mp.trigger('editorList', 'cheekboneHeight', Number(inputAxisY.toFixed(1)));
                mp.trigger('editorList', 'cheekboneWidth', Number(inputAxisX.toFixed(1)));
                break;

            case 'chin': // Подбородок
                inputAxisY = y / 100 * 1;
                inputAxisX = x / 100 * 1;

                mp.trigger('editorList', 'chinHeight', Number(inputAxisY.toFixed(1)));
                mp.trigger('editorList', 'chinWidth', Number(inputAxisX.toFixed(1)));
                break;
        }
    };

    const matrixSector = $('.matrix-sector');
    $('.matrix-pointer').on('mousemove', function(e) {
        const matrixPointer = $(this);
        if ($('.matrix-pointer').hasClass('ui-draggable-dragging') === false) { return console.log('u don`t dragging'); }

        matrixSector.each(function() {
            if (e.pageY < $(this).offset().top || e.pageY > $(this).offset().top + $(this).height() || e.pageX < $(this).offset().left || e.pageX > $(this).offset().left + $(this).width()) {
                // Debug
                // $(this).css({'background-color': 'blue', 'opacity': '1'});
            } else {
                // Debug
                // $(this).css({'background-color': 'red', 'opacity': '.5'});
                if ($(this).data('id') === 1) {
                    calculateAxis($(this), 1, $(this).parent().data('value'), matrixPointer);
                }

                if ($(this).data('id') === 2) {
                    calculateAxis($(this), 2, $(this).parent().data('value'), matrixPointer);
                }

                if ($(this).data('id') === 3) {
                    calculateAxis($(this), 3, $(this).parent().data('value'), matrixPointer);
                }

                if ($(this).data('id') === 4) {
                    calculateAxis($(this), 4, $(this).parent().data('value'), matrixPointer);
                }
            }
        });
    });
});