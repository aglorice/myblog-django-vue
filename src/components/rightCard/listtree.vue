<template>
  <el-card v-if="listtree" id="box-card-listtree" class="box-card container-body-card">
    <div slot="header" class="clearfix">
      <img src="@/assets/img/icon/listtree.png" alt="">
      <p>目录</p>
    </div>
    <div class="box-card-body">
      <el-tree
          class="list_tree"
          :data="listtree"
          accordion
          @node-click="handleNodeClick">
      </el-tree>
    </div>
  </el-card>

</template>

<script>

export default {
  name: `listtree`,
  props:['listtree'],
  data() {
    return {

    }
  },
  mounted() {

    window.addEventListener('scroll',this.handleScrollx,true)
  },
  destroyed() {
    window.removeEventListener('scroll',this.handleScrollx,true)
  },
  methods: {
    handleNodeClick(data) {
      this.$emit('handleAnchorClick',data)
    },
    // 处理目录使得它始终能够处于可视范围内
    handleScrollx() {
        let tophead = document.getElementById('article-body-head').clientHeight;
        let marginTop = window.pageYOffset - tophead
        let topcard = document.getElementById('box-card-listtree').getBoundingClientRect().top
        // let topcard_heught = document.getElementById('box-card-listtree').clientHeight;
        if (topcard < 50 && topcard > -50) {
          document.getElementById('box-card-listtree').style.marginTop = marginTop > 0 ? `${marginTop}px` : '0'
        } else {
          document.getElementById('box-card-listtree').style.marginTop = marginTop > 0 ? `${marginTop}px` : '0'
        }
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/card/card";
.clearfix {

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  img {
    width: auto;
    height: 1.5em;
    margin-right: 10px;
  }

  p {
    margin-bottom: 0;
  }
}

.el-card__body {

}
.box-card-body{
  position: relative;
}
.el-tree-node__label {
  position: absolute;
  display:-webkit-box;
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis;/*隐藏后添加省略号*/
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1; //想显示多少行
}
#box-card-listtree {
  position: absolute;
  border: 0 ;
}
.list_tree {
  @include background_color("background_color1");
  @include box_shadow("box_shadow_color1");
  @include font_color("font_color1");
}
.el-tree-node__content {
  &:hover{
    @include background_color("background_color1");
    @include font_color("font_color1");
  }
}
</style>
