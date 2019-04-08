Vue.config.devtools = true;
var app = new Vue({
    el: '#app',
    data:{
        total:0,
        items:[
            {id: 1, title:'item 1', price:9.99 },
            {id: 2, title:'item 2', price:9.99 },
            {id: 3, title:'item 3', price:9.99 },
            {id: 4, title:'item 4', price:9.99 },
        ],
        cart:[]
    },
    methods:{
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
                    price: item.price,
                    qty:1
                });
            }
        },
        inc(item){
            item.qty++;
            this.total += item.price
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
    }
});