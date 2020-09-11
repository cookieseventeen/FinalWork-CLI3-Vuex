<template>
  <div class="productList p-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12 mt-3" v-for="item in catalogProduct" :key="item.id">
          <a class="theme-card-anchor" :title="item.title" @click.prevent="showProduct(item)">
            <section class="card card-themes free">
              <figure>
                <img :src="item.imageUrl" class="img-fluid" alt="">
              </figure>
              <header>
                <h2>{{ item.title }}</h2>
              </header>
              <div class="card-body">
                <p>{{ item.content.slice( 0, 100) }}</p>
              </div>
            </section>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'productList',
    data() {
      return {
        catalog: ''
      }
    },
    created() {
      const vm = this;
      vm.getProducts();
      vm.catalog = vm.$route.params.catalog;
    },
    computed: {
      catalogProduct(){
        const vm = this;
        if(vm.catalog != 'all' && JSON.stringify(this.$store.state.products)!='{}'){
          return this.$store.state.products.filter(function(item){
              return item.category == vm.catalog
          });
        }else{
          return this.$store.state.products;
        }
      }
    },
    methods: {
      getProducts() {
        this.$store.dispatch('getProducts');
      },
      showProduct(productData) {
        let showData={
          status:{
            open:true
          },
          data: productData
        };
        this.$store.dispatch('showProduct', showData);
      },
    },
    watch: {
      $route() {
        this.catalog = this.$route.params.catalog;
      }
    }
  }

</script>
