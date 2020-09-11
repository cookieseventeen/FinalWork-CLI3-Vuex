<template>
  <div class="pageCart">
    <div class="cartList" :class="{'open': cartStatus}">
      <div class="wrap">
        <div class="inner">
          <div class="cartList--item" v-for="item in cartData.carts" :key="item.id">
            <div class="pic-info">
              <img :src="item.product.imageUrl" :alt="item.product.title">
            </div>
            <div class="text-title pl-2 pr-2">
              {{ item.product.title }}
              <span v-if="deleteItem.indexOf(item.id) != (-1)"><font-awesome-icon icon="spinner" spin /></span>
            </div>
            <button type="button" @click="removeCartItem(item.id)" class="deleteItem btn btn-outline-danger btn-sm">
              <i class="far fa-trash-alt"></i>
              <font-awesome-icon icon="trash-alt" />
            </button>
          </div>
        </div>
        <div class="ctrl-bar p-2">
          <router-link class="btn btn-success" to="/checkorders">
            結帳去
          </router-link>
        </div>
      </div>
    </div>
    <div class="close-cart">
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="num">
      {{ cartNum }}
    </div>
    <button class="cart-btn" @click="toggleCart"><font-awesome-icon icon="cart-plus"/></button>
  </div>
</template>
<script>
  export default {
    name: 'Cart',
    data() {
      return {
        //cartData: {},
        cartStatus: false,
        deleteItem:[]
      };
    },
    computed: {
      cartNum() {
        const vm=this;
        if(vm.cartData.carts){
            if (vm.cartData.carts.length > 99 ) {
            return 99
          }else{
              return vm.cartData.carts.length
          }
        }else{
          return 0
        }
      },
      cartData() {
        return this.$store.state.cartData
      }
    },
    methods: {
      toggleCart(){
        this.cartStatus=!this.cartStatus;
      },
      removeCartItem(id) {
        this.$store.dispatch('removeCartItem',id);
      },
      getCart() {
        this.$store.dispatch('getCart');
      },
      closeCart(){
        const vm = this;
        vm.cartStatus= false;
      }
    },
    created() {
      const vm = this;

      // 自定義名稱 'messsage:push'
      // message: 傳入參數
      // status: 樣式，預設值為 warning
      vm.$bus.$on('reflashcart:push', () => {
        vm.getCart();
      });
      vm.$bus.$on('close-cart:push', () => {
        vm.closeCart();
      });

      vm.getCart();
      //vm.$bus.$emit('message:push');

      console.log(process.env.VUE_APP_APIPATH);
    },
  };

</script>
