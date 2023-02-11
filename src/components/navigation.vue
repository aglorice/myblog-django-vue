<template>
  <div>
    <div id="navigation" class="navigation">
      <div class="navigation_header">
        <span>aglorice</span>
      </div>
      <div id="navigation_body" class="navigation_body">
        <ul>
          <li>
            <router-link :to="`/index`"><i class="el-icon-house"></i>首页</router-link>
          </li>
          <li>
            <router-link :to="`/article`"><i class="el-icon-document"></i>文章</router-link>
          </li>
          <li>
            <router-link :to="`/categorize`"><i class="el-icon-files"></i>分类</router-link>
          </li>
          <li>
            <router-link :to="`/pag`"><i class="el-icon-collection-tag"></i>标签</router-link>
          </li>
          <li>
            <router-link :to="`/friend`"><i class="el-icon-link"></i>友人帐</router-link>
          </li>
          <li>
            <router-link :to="`/about`"><i class="el-icon-user"></i>关于</router-link>
          </li>
          <li>
            <a>
              <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-menu"></i>更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-film"><router-link :to="`/chasefan`">追番</router-link></el-dropdown-item>
                  <el-dropdown-item icon="el-icon-folder-opened"><router-link :to="`/datetime`">归档</router-link></el-dropdown-item>
                  <el-dropdown-item icon="el-icon-chat-dot-round"><router-link :to="`/message`">留言板</router-link></el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
            </a>

          </li>
        </ul>
      </div>
      <div class="navigation_footer">
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
      bgcover:false,
      meum_status:false, // 侧边菜单打开的状态（默认为0）
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
      this.bgcover = true; // 打开覆盖层
      setTimeout(()=>{
        this.meum_status = true;
      }, 1000 )
    },
    getMenuStatus(value){
      this.meum_status = value
      this.bgcover = false;
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
@import "@/assets/scss/font.scss";
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
.el-dropdown-link {
  @include font_color("font_color1");
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
        i {
          margin-right: 0.5em;
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
    font-weight: bold;
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
