<template>
  <div>
    <div id="navigation" class="navigation">
      <div class="navigation_header">
        <span>aglorice</span>
      </div>
      <div id="navigation_body" class="navigation_body">
        <ul>
          <li>
            <router-link :to="`/index`"><img src="@/assets/img/icon/home.png" alt="">首页</router-link>
          </li>
          <li>
            <router-link :to="`/article`"><img src="@/assets/img/icon/article.png" alt="">文章</router-link>
          </li>
          <li>
            <router-link :to="`/categorize`"><img src="@/assets/img/icon/category.png" alt="">分类</router-link>
          </li>
          <li>
            <router-link :to="`/pag`"><img src="@/assets/img/icon/pag.png" alt="">标签</router-link>
          </li>
          <li>
            <router-link :to="`/friend`"><img src="@/assets/img/icon/friend.png" alt="">友人帐</router-link>
          </li>
          <li>
            <router-link :to="`/about`"><img src="@/assets/img/icon/about.png" alt="">关于</router-link>
          </li>
        </ul>
      </div>
      <div class="navigation_footer">
        <img id="navigation_search" class="navigation_search" src="@/assets/img/icon/search.png" alt="">
        <img id="navigation_meum" class="navigation_meum"  src="@/assets/img/icon/meum.png" alt="" @click="openMeum">
      </div>
    </div>
<!--    侧边导航栏-->

    <mobileSidebarMenus :meum_status="meum_status" @menu_info="getMenuStatus"></mobileSidebarMenus>


<!--    打开侧边栏时背景变暗-->
    <bgCover :showCover="bgcover"></bgCover>

  </div>

</template>

<script>

import mobileSidebarMenus from "@/components/mobile-sidebar-menus";
import bgCover from "@/components/BgCover";
export default {
  name: `navigation`,
  data(){
    return{
      bgcover:0,
      meum_status:0, // 侧边菜单打开的状态（默认为0）
      // 滚动前，滚动条距文档顶部的距离
      oldScrollTop: 0,
    }
  },
  components:{
    mobileSidebarMenus,
    bgCover

  },
  mounted() {
    // 监听页面滚动事件
    window.addEventListener("scroll", this.scrolling)
  },
  methods:{
    scrolling() {
      // 滚动条距文档顶部的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
          document.body.scrollTop
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.oldScrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop;
      if (scrollStep < 0) {
        document.getElementById('navigation').style.top = '0'
      } else {
        document.getElementById('navigation').style.top = '-60px'
      }
    },
    // 判断打开导航
    openMeum(){
      document.getElementById('mobile-sidebar-menus').style.right = '0';
      this.scrollStop();
      this.bgcover = 1; // 打开覆盖层
      setTimeout(()=>{
        this.meum_status = 1;
      }, 1000 )
    },
    getMenuStatus(value){
      this.meum_status = value
      this.bgcover = 0;
      this.scrollMove()
    },
    scrollStop(){
      document.body.style.height = '100vh'
      document.body.style['overflow-y'] = 'hidden'
    },
    /***取消滑动限制***/
    scrollMove(){
      document.body.style.height = 'unset'
      document.body.style['overflow-y'] = 'auto'
    }

  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
//响应式（媒体查询）


/*
  手机端（750px）
*/
@media (max-width: 750px){
  .navigation {
    justify-content: space-between;
  }
  // 将看板娘隐藏

}


#navigation {
  transition: 0.8s;
}
.navigation{
  top:0;
  height: 60px;
  width: 100%;
  display: flex;
  position: fixed;
  @include background_color("background_color1");
  opacity: 0.9;

  z-index: 100;
}
.navigation_body {
  flex: 1;
  width: 60vw;
  ul {
    display: flex;
    justify-content: center;
    li {
      width: 6em;
      display: flex;
      justify-content: center;
      align-items: center;
      list-style-type: none;
      height: 60px;
      a {
        height: 1.3em;
        font-size: 1.1em;
        @include font_color("font_color1");
        text-decoration: none;
        img {
          width: 0.8em;
          height: 0.8em;
          color: #66797c;
          margin-right: 5px;

        }
        &:hover {
          color: skyblue;
          transition: 0.8s;
          transform: scale(1.1); /*transform:变形属性，scale：缩放1.1倍 */
        }
        &:active {
          color: wheat;
        }
      }

    }
  }
}
.navigation_header {
  position: relative;
  width: 200px;
  span {
    position: absolute;
    font-size: 1.5em;
    @include font_color("font_color1");
    margin: 11px;
  }
}
.navigation_footer {
  display: flex;
  justify-content: flex-end;
  width: 100px;
  .navigation_search {
    width: 2em;
    height: 2em;
    margin: 14px;
  }
  .navigation_meum {
    width: 2em;
    height: 2em;
    margin: 14px;
    visibility: hidden;
  }
}
</style>
