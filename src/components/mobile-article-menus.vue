<template>

<div class="mobile-article-menus-main">
  <bgCover :showCover="showCover"></bgCover>
  <div id="mobile-article-menus-door" class="mobile-article-menus-door">

    <i @click="openMobileMenu" class="el-icon-notebook-1"></i>
    <div class="mobile-article-menus">
      <el-tree
          class="list_tree-mobile"
          :data="listtree"
          accordion
          @node-click="handleNodeClick">
      </el-tree>
    </div>
  </div>
</div>



</template>

<script>
import bgCover from "@/components/BgCover";
export default {
  name: `mobile-article-menus`,
  data(){
    return{
      openMobileMenuStatus:false,
      showCover:false
    }
  },
  components:{
    bgCover
  },
  props:['listtree'],
  mounted() {
    document.addEventListener("click", (e) => this.clickOutSide(e));
  },
  destroyed() {
    document.removeEventListener("click", (e) => this.clickOutSide(e));
  },
  methods:{
    clickOutSide(e) {
      let mobile_article_menus_door = document.getElementById("mobile-article-menus-door");
      // 判断鼠标点击到触发按钮和弹出框外的区域
      if (this.showCover && !mobile_article_menus_door.contains(e.target) || this.menu_status) {
        this.colseMobileMenu()
      }
    },
    handleNodeClick(data) {
      this.$emit('handleAnchorClick',data)
    },
    openMobileMenu(){
      document.getElementById('mobile-article-menus-door').style.bottom = '0';
      this.showCover = true
    },
    colseMobileMenu(){
      document.getElementById('mobile-article-menus-door').style.bottom = '-40vh';
      this.showCover = false
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px){
  .mobile-article-menus-door {

  }
  .el-icon-notebook-1 {
    visibility: visible!important;
  }
}
.mobile-article-menus {
  height: 100%;
  width: 100%;
  z-index: 101;


}

.list_tree-mobile {

  height: 100%;
}
.mobile-article-menus-door{
  width: 100vw;
  height: 40vh;
  position: fixed;
  bottom: -40vh;
  transition: 0.8s;
  z-index: 101;

}
.el-icon-notebook-1 {
  position: fixed;
  left: 0;
  top:50vh;
  visibility: hidden;
  font-size: 2em;
  @include font_color("font_color1");
  margin-left: 5px;
  &:active{
    color: skyblue;
  }
  z-index: 99;
}
.mobile-article-menus-main {
  width: 100vw;
}
</style>
