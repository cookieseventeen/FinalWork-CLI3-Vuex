<template>
  <div class="showProduct" :class="{'open': openStatus }">
    <button type="button" class="close close-btn" @click="hideProduct" aria-label="Close">
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <div class="video-wrap">
      <div id="youtubePlayer" :class="{'playing': status.playing }">
        <youtube :video-id="videoId" :resize="true" :fitParent="true" :player-vars="playerVars" ref="youtube"
          @playing="playing" @ended="ended"></youtube>
          <div class="loadVideo ">
            <font-awesome-icon icon="compact-disc" spin />
            Loading Video
          </div>
      </div>
    </div>
    <div class="video-info p-5">
      <div class="inner">
        <h2 class="title"> {{ productDetail.title }} </h2>
        <div class="category">
          <span class="badge badge-secondary">{{ productDetail.category }}</span>
        </div>
        <div class="discription mt-3">
          {{ productDetail.content }}
        </div>
        <div class="demoLink mt-3 mb-5">
          <div class="mt-3 mb-1 font-weight-bold tips">請點擊下面連結前往展示網站：</div>
          <div class="item" v-if="productDetail.demoSite">
            <a :href="productDetail.demoSite" target="_blank">{{ productDetail.demoSite }} </a>
          </div>
          <div class="item" v-if="!productDetail.demoSite">
            <a :href="productDetail.codepen" target="_blank">{{ productDetail.demoSite }} </a>
          </div>
        </div>
        <div class="crtl-bar">
          <div class="d-flex justify-content-between align-items-baseline p-3 pr-5 pl-5">
            <!-- <div class="h5">2,800 元</div> -->
            <del class="h6" v-if="!productDetail.price">原價 {{ productDetail.origin_price | currency }} 元</del>
            <del class="h6" v-if="productDetail.price">原價 {{ productDetail.origin_price | currency }} 元</del>
            <div class="h5" v-if="productDetail.price">現在只要 {{ productDetail.price | currency}} 元</div>
          </div>
          <div class=" d-flex justify-content-between align-items-baseline p-3 pr-5 pl-5">
            <button class="btn btn-info" @click="hideProduct">關閉</button>
            <button class="btn btn-success" @click="addToCart(productDetail.id)">
              <font-awesome-icon v-if="productDetail.id === status.loadItem" icon="spinner" spin />
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import getYouTubeID from 'get-youtube-id';
  export default {
    name: 'showProduct',
    data() {
      return {
        status: {
          playing: false,
          loadItem:''
        },
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          playsinline: 0
        }
      };
    },
    methods: {
      hideProduct() {
        const vm = this;
        vm.status.playing = false;
        let showData={
          status:{
            open:false
          },
          data: {}
        };
        this.$store.dispatch('showProduct', showData);

        vm.pausedVideo();
      },
      playVideo() {
        this.player.playVideo()
      },
      pausedVideo() {
        this.player.pauseVideo()
      },
      playing() {
        console.log('we are watching!!!');
        this.status.playing = true;
      },
      ended() {
        this.playVideo();
      },
      getCart() {
        const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const vm = this;

        this.$http.get(apiUrl)
          .then(res => {
            vm.cartData = res.data.data;
            this.$bus.$emit('reflashcart:push', vm.cartData);
          })
          .catch(err => {
            console.error(err);
          });
      },
      addToCart(id, qty = 1) {
        const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const vm = this;
        const cartData = {
          product_id: id,
          qty
        };
        vm.status.loadItem= id;
        this.$http.post(apiUrl, {
            data: cartData
          })
          .then(() => {
            vm.status.loadItem= '';
            this.$bus.$emit('message:push', '商品已加入購物車', 'success');
            vm.hideProduct();
           // this.getCart();
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
    computed: {
      player() {
        return this.$refs.youtube.player
      },
      productDetail(){
        return this.$store.state.showProduct.data;
      },
      openStatus(){
        return this.$store.state.showProduct.status.open
      },
      videoId(){
        return getYouTubeID(this.$store.state.showProduct.data.youtube)
      }
      
    }
  };

</script>
