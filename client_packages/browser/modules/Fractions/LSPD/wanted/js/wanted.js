const wanted = new Vue({
    el:'#app',
    data:{
        wantedActive:false,
        offender:'Ame_Maranse',
        articles:'', //Причина
        time: null, //Время
        hoverStars:0,
        activeStarts:1,
        comment:'',
        redemption:false,
    },
    methods:{
        showStar(i){
            return (i<=this.activeStarts)?true:false;
        },
        setStar(i){
            this.activeStarts = i;
        },
        showHover(i){
            return (i<=this.hoverStars)?true:false;
        },
        setHover(i){
            if(i!==undefined) this.hoverStars = i;
        },
        arrestCrime(){
            mp.trigger('SendWanted', this.articles, this.time, this.activeStarts, this.comment);
        },
        closeApp(){
            this.wantedActive = false;
            mp.trigger('wantedClose');
        }
    },
    mounted(){
        this.wantedActive = true;
        window.addEventListener('mouseup',e=>{
            if(e.key==='Escape') this.closeApp();
        })
    },
    watch:{
        articles:function(val){
            if(!(/^[0-9.,]+$/.test(val))){
                this.articles = val.substring(0, val.length - 1);
            }  
        },
        partner:function(val){
            if(!(/^[a-zA-Z_]+$/.test(val))){
                this.partner = val.substring(0, val.length - 1);
            }  
        }
    }
})