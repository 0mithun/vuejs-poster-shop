Vue.config.devtools = true;
var app = new Vue({
    el: '#app',
    data:{
        total:0,
        price:9.99,
        items:[],
        cart:[],
        search:'anime',
        lastSearch:'',
        loading:false
    },
    methods:{
        onSubmit(){
            this.items = [];
            this.loading = true;
           this.$http
           .get('/search/'.concat(this.search))
            .then(function(res){
                this.items = res.data;
                this.loading = false;
                this.lastSearch= this.search

            })
        },
        addItem(index){
            this.total+=9.99;
            item = this.items[index]
            found = false;
            for (let i = 0; i < this.cart.length; i++) {
                if(this.cart[i].id === item.id){
                    found = true;
                    this.cart[i].qty++  
                    break
                }
            }
            if(!found){
                this.cart.push({
                    id:item.id,
                    title:item.title,
                    price: this.price,
                    qty:1
                });
            }
        },
        inc(item){
            item.qty++;
            this.total += this.price
        },
        dec(item){
            item.qty--;
            this.total -= item.price
            if(item.qty<=0){
                for(let i =0; i < this.cart.length; i++){
                    if(this.cart[i].id == item.id){
                        this.cart.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    filters:{
        currency(price){
            return '$'.concat(price.toFixed(2))
        }
    },
    mounted(){
        this.onSubmit()
    }
});