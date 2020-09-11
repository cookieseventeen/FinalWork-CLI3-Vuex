<template>
  <div class="dashboard">
    <Navbar></Navbar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../assets/scss/admin";
</style>
<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Alert from '../components/AlertMessage';

  export default {
    name: 'Dashboard',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components:{
      Navbar,
      Sidebar,
      Alert
    },
    methods: {

    },
    created() {

    },
  }
</script>
