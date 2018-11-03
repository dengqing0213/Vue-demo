<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in banner" :key="index"><img v-lazy="item"></mt-swipe-item>
    </mt-swipe>
    <!--轮播图结束-->
      <div class="proList">
       <Produce :produceProlist="produceProlist"></Produce>
        <Product></Product>
        <Homeprolist :homeProlist="homeProlist"></Homeprolist>
        <AsideOne :asideOneList="asideOneList"></AsideOne>
        <AsideTwo :asideTwoList="asideTwoList"></AsideTwo>
        <AsideThree :asideThreeList="asideThreeList"></AsideThree>
      </div>
    <BackTop></BackTop>
  </div>

</template>

<script>
import Vue from 'vue'
import Prolist from '@/components/Prolist'
import axios from 'axios'
import BackTop from '@/components/BackTop'
import Produce from '@/components/Produce'
import Product from '@/components/Product'
import Homeprolist from '@/components/Homeprolist'
import AsideOne from '@/components/AsideOne'
import AsideTwo from '@/components/AsideTwo'
import AsideThree from '@/components/AsideThree'
import {Swipe, SwipeItem, Lazyload, Loadmore, Navbar, TabItem} from 'mint-ui'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Loadmore)
Vue.use(Navbar)
Vue.use(TabItem)
export default {
  data: function () {
    return {
      banner: [
        'https://shop.io.mi-img.com/app/shop/img?id=shop_1df17e20a78b3529e7a7522772ecbb88.jpeg&w=1080&h=450',
        'https://shop.io.mi-img.com/app/shop/img?id=shop_99d76ed99759cec20bbc0c47cf08b2b0.png&w=1080&h=450',
        'https://shop.io.mi-img.com/app/shop/img?id=shop_602423943e7bdfaf8d77ece263711fc3.jpeg&w=1080&h=450',
        'https://shop.io.mi-img.com/app/shop/img?id=shop_8cbec13c7031149e7443301880c33490.jpeg&w=1080&h=450',
        'https://shop.io.mi-img.com/app/shop/img?id=shop_6d97aba7e06dcae531a6dcf10ae8fbc8.jpeg&w=1080&h=450'
      ],
      prolist: [],
      produceProlist: [],
      homeProlist: [],
      asideOneList: [],
      asideTwoList: [],
      asideThreeList: []
    }
  },
  components: {
    BackTop,
    Prolist,
    Produce,
    Product,
    Homeprolist,
    AsideOne,
    AsideTwo,
    AsideThree
  },
  created () {
    axios.get('http://localhost:3000').then(res => {
      // console.log(res.data)
      this.prolist = res.data
      // banner图下面的那五个商品
      this.produceProlist = this.prolist[0].data.homepage.floors[1].data.items
      this.homeProlist = this.prolist[0].data.homepage.floors.splice(5, 2)
      this.asideOneList = this.prolist[0].data.homepage.floors[5].data.items[0]
      this.asideTwoList = this.prolist[0].data.homepage.floors[7].data.items
      this.asideThreeList = this.prolist[0].data.homepage.floors.splice(8)
      // console.log(this.prolist)
      // console.log(this.asideThreeList)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.mint-swipe{
  @include rect(100%, 1.5rem);
  img{
    @include rect(100%, 100%);
  }
}
.proList{
  @include rect(100%, auto);
  @include padding(0.1rem);
  .toSeen{
    @include rect(100%, 1rem);
    @include background-color(#eee);
    @include flexbox();
    @include justify-content();
    @include align-items();
    img{
      @include rect(90%, 0.7rem);
    }
  }
  .recommend{
    .recommend_title{
      h1{
        @include font-size(0.16rem);
        @include margin(0.1rem 0 0.1rem 0);
      }
    }
    .recommend_content{
      h2{
        @include font-size(0.14rem);
        @include font-weight(normal);
      }
      span{
        @include text-color(#999);
        @include font-size(.1rem);
      }
      .recommend_content_top{
        @include rect(100%,1.2rem);
        @include background-color(#f2eee4);
        @include flexbox();
        @include justify-content(space-around);
        @include margin(0 0 0.04rem 0);
        .recommend_content_top_left{
          @include padding(0.05rem);
        }
        .recommend_content_top_right{
          @include padding(0.05rem);
          @include rect(40%,100%);
          img{
            @include rect(100%,1rem);
          }
        }
      }
      .recommend_content_bottom{
        @include flexbox();
        @include justify-content(space-around);
        .recommend_content_bottom_left{
          @include background-color(#ece9f4);
          @include margin(0 0.03rem 0 0);
          @include flex(1);
          @include padding(0.05rem);
          img{
            @include rect(100%, 70%)
          }
        }
        .recommend_content_bottom_right{
          @include background-color(#f1e9eb);
          @include flex(1);
          @include padding(0.05rem);
          img{
            @include rect(100%, 70%)
          }
        }
      }
    }
  }
  .raise{
    @include margin( 0 0 0.1rem 0);
    b{
      @include font-size(0.16rem);
      @include margin(0.1rem 0 0.1rem 0);
      @include display(inline-block);
    }
    i{
      @include font-size(0.12rem);
      @include display(inline-block);
      @include text-color(#666);
      @include padding(0.1rem 0 0.1rem 0);
      @include line-height(0.24rem);
      float:right;
      @include margin(0 0.2rem 0 0);
    }
    .raise_content{
      border-bottom: 3px solid #ff6600;
      @include rect(100%, 100%);
      @include background-color(#f2eee4);
      @include margin(0 0 0.1rem 0);
      .raise_content_left{
        @include rect(50%, 90%);
        float: left;
        @include padding(0.1rem);
        @include line-height(0.22rem);
        h3{
          @include font-weight(normal);
          @include font-size(0.14rem);
        }
        h4{
          @include font-weight(normal);
          @include font-size(0.12rem);
          @include text-color(#999);
        }
        h5{
          @include font-weight(normal);
          @include font-size(0.14rem);
          @include text-color(#a10000);
          span{
            @include font-size(0.1rem);
          }
        }
        }
      .raise_content_right{
        float: left;
        @include rect(40%, 90%);
        img{
          @include rect(100%, 100%);
        }
      }
      p{
        clear:both;
        @include font-size(0.1rem);
        @include margin(0.3rem 0 0.2rem 0);
        @include padding(0 0 0 0.1rem);
        span{
          @include text-color(#a10000);
        }
        i{
          @include text-color(#a10000);
        }
      }
     }
  }
  .home_product_list{
    .home_product_list_img{
      @include background-color(#eee);
      @include margin(0 0 0.15rem 0);
      img{
        @include margin(0.1rem 0 0 0);
        @include rect(100%, auto);
      }
    }
    .home_product_lists{
      ul{
        @include flexbox();
        @include justify-content(space-around);
        flex-wrap: wrap;
        li{
          @include rect(30%, auto);
          @include margin(0 0 0.1rem 0);
          .home_product_lists_top{
            @include rect(100%, 1.2rem);
            @include background-color(#f1f1f1);
            img{
              @include rect(100%, 1rem);
              @include padding(0.05rem);
            }
            span{
              @include text-color(#fff);
              &.span_inline_block{
                display: inline-block;
                @include background-color(#d97070);
                @include font-size(0.1rem );
                @include padding(0 0.02rem 0 0.02rem);
              }
            }
          }
          p{
            @include margin(0.1rem 0 0 0);
            height: 0.6rem;
          }
          i{
            @include font-size(0.1rem);
            @include text-color(#a10000);
            span{
              @include font-size(0.14rem);
            }
          }
        }
      }
    }
  }
  .asideBanner{
    @include background-color(#ede9df);
    @include rect(100%, 1.5rem);
    @include flexbox();
    @include padding(0.2rem 0 0 0);
    @include line-height(0.24rem);
    @include justify-content(space-around);
    .asideBanner_left{
      span{
        display: inline-block;
        @include rect(auto, 0.2rem);
        @include border(1px #9b8013 solid);
        @include background-color(#eee);
        @include text-color(#9b8013);
        @include text-align();
        @include line-height(0.2rem);
      }
      h1{
        @include font-size(0.14rem);
        @include font-weight(normal);
      }
      p{
        @include font-size(0.12rem);
        @include text-color(#999);
      }
      i{
        @include text-color(#a10000);
        @include font-size(0.1rem);
        b{
          @include font-size(0.14rem);
        }
        }
      h2{
        @include rect(0.7rem, 0.2rem);
        @include line-height(0.2rem);
        @include text-color(#fff);
        @include background-color(#a0830d);
        @include text-align();
        i{
          @include text-color(#fff);
        }
      }
    }
    .asideBanner_Right{
      img{
        @include rect(auto, 1.2rem);
      }
    }
  }
  .tasteLife{
    @include rect(auto, 1.5rem);
    @include margin(0.1rem 0 0 0);
    b{
      @include font-size(0.14rem);
      @include font-weight(bold);
      @include line-height(0.24rem);
    }
    i{
      span{
        @include font-size(0.12rem);
        @include text-color(#999);
        float:right;
        @include line-height(0.24rem);
        &.iconfont{
          @include font-size(0.14rem);
        }
      }
    }
    .tasteLife_left{
      @include margin(0 0.05rem 0 0);
      @include rect(100%,100%);
      div{
        border-radius: 0.05rem;
        @include background-color(red);
        @include rect(2.2rem, 1.2rem);
        img{
          @include rect(100%, 100%);
        }
      }
      p{
        @include font-size(0.14rem);
        @include margin(0.1rem 0 0 0);
      }
      span{
        @include text-color(#999);
        @include font-size(0.1rem)
      }
    }
  }
}
</style>
