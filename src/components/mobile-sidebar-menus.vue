<template>
<div id="mobile-sidebar-menus" class="mobile-sidebar-menus">
  <ul id="menu_item_my">
    <li @click="changeMenu">
      <router-link :to="`/index`"><i class="el-icon-house"></i>首页</router-link>
    </li>
    <li @click="changeMenu">
      <router-link :to="`/article`"><i class="el-icon-document"></i>文章</router-link>
    </li>
    <li @click="changeMenu">
      <router-link :to="`/categorize`"><i class="el-icon-files"></i>分类</router-link>
    </li>
    <li @click="changeMenu">
      <router-link :to="`/pag`"><i class="el-icon-collection-tag"></i>标签</router-link>
    </li>
    <li @click="changeMenu">
      <router-link :to="`/friend`"><i class="el-icon-link"></i>友人帐</router-link>
    </li>
    <li @click="changeMenu">
      <router-link :to="`/about`"><i class="el-icon-user"></i>关于</router-link>
    </li>
    <li @click="changeMenu">
      <a>
        <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-menu"></i>更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>

    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: `mobile-sidebar-menus`,
  data(){
    return{
      menu_status:false
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
      if (this.meum_status && !mobile_sidebar_menus.contains(e.target) || this.menu_status) {
        document.getElementById('mobile-sidebar-menus').style.right = '-50vw';
        // 考虑到侧边栏的动画
        setTimeout(()=>{
          this.$emit("menu_info", 0); // 通知父组件

        }, 1000 )
        this.menu_status = false
      }
    },

    // 点击路由改变导航栏的状态
    changeMenu(){
      this.menu_status = true;
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
