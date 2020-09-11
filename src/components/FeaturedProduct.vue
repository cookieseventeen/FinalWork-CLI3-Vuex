<template>
  <div>
    <div class="row flex-wrap w-100 my-md-3" v-if="featureData">
      <div class="col-md-12">
        <h2 class="text-center m-3 p-3">精選範例</h2>
      </div>
      <div v-for="(item,key) in featureData" :key="key"
        class="col-sm-6 pt-3 px-3 pt-md-5 px-md-5 text-center  overflow-hidden"
        :class="{'bg-dark': (key%4==0)||(key%4==3),'bg-light': (key%4==1)||(key%4==2),'text-white': (key%4==0)||(key%4==3)}">
        <div class="bg-light shadow-sm mx-auto"
          style="width: 80%; height: 300px; border-radius: 21px 21px 0 0; background-position: center"
          :style="{ backgroundImage:`url(${item.imageUrl})`}"></div>
        <hr>
        <div class="my-3 py-3">
          <h2 class="display-5"> {{ item.title }}</h2>
          <p class="lead"> {{ item.content }} </p>
          <button class="btn btn-sm" :class="{'btn-dark': (key%4==1)||(key%4==2),'btn-light': (key%4==0)||(key%4==3)}"
            @click.prevent="showProduct(item)">詳細內容</button>
          <button class="btn btn-sm" :class="{'btn-dark': (key%4==1)||(key%4==2),'btn-light': (key%4==0)||(key%4==3)}"
            @click.prevent="addToCart(item.id)"><i v-if="item.id === status.loadItem"
              class="fas fa-spinner fa-spin"></i>加到購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Feature-Product',
    data() {
      return {
        cartData: '',
        status: {
          loadItem: '',
        }
      }
    },
    created() {
      this.getProducts();
    },
    computed: {
      featureData() {
        return this.$store.state.featureProducts;
      }
    },
    methods: {
      getProducts() {
        this.$store.dispatch('getProducts');
      },
      addToCart(id, qty = 1) {
        const cartData = {
          product_id: id,
          qty
        };
        this.$store.dispatch('addCart', cartData);
      },
      showProduct(productData) {
        let showData={
          status:{
            open:true
          },
          data: productData
        };
        this.$store.dispatch('showProduct', showData);
        //this.$bus.$emit('productShow:push', productData);
      }
    }
  }
</script>