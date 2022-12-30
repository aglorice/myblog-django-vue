<template>
<div id="mobile-sidebar-menus" class="mobile-sidebar-menus">
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
</template>

<script>
export default {
  name: `mobile-sidebar-menus`,
  data(){
    return{

    }
  },
  components:{
  },
  props: ["meum_status"],
  mounted() {
    document.addEventListener("click", (e) => this.clickOutSide(e));
  },
  destroyed() {
    document.removeEventListener("click", (e) => this.clickOutSide(e));
  },
  methods:{
    clickOutSide(e){
      let mobile_sidebar_menus = document.getElementById("mobile-sidebar-menus");
      // 判断鼠标点击到触发按钮和弹出框外的区域
      if (this.meum_status && !mobile_sidebar_menus.contains(e.target)) {
        document.getElementById('mobile-sidebar-menus').style.right = '-50vw';
        // 考虑到侧边栏的动画
        setTimeout(()=>{
          this.$emit("menu_info", 0); // 通知父组件

        }, 1000 )
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
.mobile-sidebar-menus {
  width: 50vw;
  height: 100vh;
  right: -50vw;
  @include background_color("background_color1");
  position: fixed;
  transition: 1s;
  z-index: 100;

  ul{
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    li {
      width: 50vw;
      height: 8.3vh;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        font-size: 1.5em;
        height: 1.5em;
        @include font_color("font_color1");
        img {
          width: 1.2em;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
