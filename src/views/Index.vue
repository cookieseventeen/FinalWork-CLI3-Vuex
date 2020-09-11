<template>
  <div class="index">
      <div class="logo-wrap text-center">
         <router-link class="py-2 d-none d-md-inline-block logo" to="/">
          萬事屋
        </router-link>
      </div>
    <Header></Header>
    <loading :active.sync="isLoading"></loading>
    <div class="main">
      <router-view></router-view>
    </div>
    <Footer></Footer>
    <Cart></Cart>
    <Alert></Alert>
    <showProduct></showProduct>
  </div>
</template>
<style lang="scss">
  @import "../assets/scss/all";
</style>
<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  import Cart from '../components/Cart';
  import Alert from '../components/AlertMessage';
  import showProduct from '../components/showProduct';

  export default {
    name: 'Index',
    data() {
      return {

      }
    },
    created() {},
    methods: {},
    computed: {
      isLoading(){
        return this.$store.state.isLoading
      }
    },
    components: {
      Header,
      Footer,
      Cart,
      Alert,
      showProduct
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
