import { reactive } from "vue";
import { authStore } from "./store";

const wishlist = reactive({
    items: [],
    isWishListed(product){
        return this.items.includes(product.id);
    },

    async fetchWishList(){
        const apiUrl = 'http://localhost:8000/api/wishlist/';
        const token = authStore.getUserToken();

        if(!token){
            return;
        }

        try{
            const response = await fetch(apiUrl,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(!response.ok){
                throw new Error('Network response was not ok for GET Wishlist');
            }
            const wishListData = await response.json();
            this.items = wishListData.wishlist
        }catch(error){
            console.error('Error fetching wishlist:', error);
        }
    },
    async toggleWishList(product){
        let apiUrl = 'http://localhost:8000/api/wishlist/';
        let method = 'POST';
        let payload = {
            product_id: product.id
        }

        const token = authStore.getUserToken();

        if(!this.isWishListed(product)){
            this.items.push(product.id);
        }else{
            this.items = this.items.filter(id => id != product.id);
            apiUrl = `http://localhost:8000/api/wishlist/${product.id}`;
            method = 'DELETE';
            payload = {}
        }


        try{
            const  response = await fetch(apiUrl, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if(!response.ok){
                throw new Error('Network response was not ok for POST Wishlist');
            }

            const data = await response.json();
            console.log('Product ID save to wishlist: ',data);
        }catch(error){

        }
    },

    getIcon(product){
        if(this.isWishListed(product)){
            return '//img.icons8.com/?size=100&id=19413&format=png&color=FA5252';
        }else{
            return '//img.icons8.com/?size=100&id=rntHZLVPcFtp&format=png&color=FFFFFF';
        }
    },

    clearItems(){
        return this.items = [];
    }
});
// export default wishlist
export {wishlist}