import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: {},
    featureProducts: {},
    cartData: {},
    status:{
      productsAdding:[]
    },
    showProduct:{
      status:{
        open:false,
        playing: false,
      },
      data:{}
    }
  },
  mutations: { //操作狀態 常數命名大寫
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    FEATUREPRODUCTS(state, payload) {
      state.featureProducts = payload.filter(element => {
        return element.is_featured === 1 && element.is_enabled === 1;
      });
    },
    CARTS(state, payload){
      state.cartData = payload;
    },
    PRODUCTADDING(state,payload){
      state.status.productsAdding.push(payload);
    },
    PRODUCTREMOVED(state,payload){
      let deleteIndex=state.status.productsAdding.indexOf(payload);
      state.status.productsAdding.splice(deleteIndex,1);
    },
    SHOWPRODUCT(state,payload){
      state.showProduct=payload;
    }
  },
  actions: { //操作行為
    updataLoading(context, status) {
      context.commit('LOADING', status);
    },
    getProducts(context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;

      context.commit('LOADING', true);
      axios.get(apiUrl)
        .then(res => {
          const allProducts = res.data.products;
          context.commit('PRODUCTS', allProducts);
          context.commit('FEATUREPRODUCTS', allProducts);
          context.commit('LOADING', false);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getCart(context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(apiUrl)
        .then(res => {
          let cartData=res.data.data;
          context.commit('CARTS', cartData);
        })
        .catch(err => {
          console.error(err);
        });
    },
    addCart(context,data){
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cartData = data;
      axios.post(apiUrl, {
            data: cartData
          })
          .then(res => {
            console.log('addData',res);
            context.dispatch('getCart');
          })
          .catch(err => {
            console.error(err);
          });
    },
    removeCartItem(context,id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      //vm.deleteItem.push(id);
      axios.delete(apiUrl)
        .then((res) => {
          console.log('DeleteData',res);
          context.dispatch('getCart');
        })
        .catch(err => {
          console.error(err);
        });
    },
    showProduct(context,showData){
      context.commit('SHOWPRODUCT', showData);
    }
  },
  getters: {
    categoriesProducts(state,categoriesData){
      if(categoriesData!=undefined){
        return state.products.filter(function(item){
            return item.category == categoriesData
        });
      }else{
        return state.products
      }
    }
  },
  modules: {}
})