<template>
<div class="page_bottom">
  <div class="page_bottom_dance">
    <img src="@/assets/img/backgound-img/dance.png" alt="没有未来的未来不是我要的未来">
  </div>
  <span> Copyright © 2020-{{getYear}} by <a :href="href">aglorice</a>. All Rights Reserved. </span>
  <div class="record_number">
    <span>萌-123123123123</span>
    <el-divider direction="vertical"></el-divider>
    <span>萌-123123123123</span>
  </div>
  <div class="website_time">
    <p>本站已经坚持了1年了</p>
  </div>
  <div class="page_bottom_icon">
    <img src="@/assets/img/icon/CDN.png" alt="">
    <img src="@/assets/img/icon/django.png" alt="">
    <img src="@/assets/img/icon/vue.png" alt="">
  </div>


</div>
</template>

<script>

import variable from "@/assets/js/variable";

export default {
  name: `pagebottom`,
  data(){
    return{
      href:variable.base_url
    }
  },
  computed:{
    getYear(){
      var date = new Date();
      return date .getFullYear(); //获取完整的年份(4位)
    }
  },
  components:{

  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
.page_bottom {
  height: 40vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #66797c;
  @include background_color("background_color1");
  @include font_color("font_color1");
}

// 备案号
.record_number {

}
// 页面底部图标
.page_bottom_icon {
  img {
    margin-right: 5px;
  }

}
// 页面底部天气组件
#he-plugin-simple {
  pointer-events: none;
}
// 页面底部dance
.page_bottom_dance {
  img {
    height: 10em;
    margin-bottom: 1em;
  }

}
</style>
