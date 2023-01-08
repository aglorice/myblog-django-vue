<template>
<div class="page_bottom">
  <div class="page_bottom_dance">
    <img src="@/assets/img/backgound-img/dance.png" alt="没有未来的未来不是我要的未来">
  </div>
  <div class="copyright">
    <span> Copyright © 2020-{{getYear}} by <a :href="href">aglorice</a>. All Rights Reserved. </span>
  </div>

  <div class="record_number">
    <span>萌-123123123123</span>
    <el-divider direction="vertical"></el-divider>
    <span>萌-123123123123</span>
  </div>
  <div class="website_time">
    <p id="sitetime"></p>
  </div>
  <div class="page_bottom_server_info">
    <span>本站由腾讯云提供CDN/云服务</span>
    <el-divider direction="vertical"></el-divider>
    <span>基于
      <img src="@/assets/img/icon/django.png" alt="django">
      <a href="https://docs.djangoproject.com/en/4.1/">django</a>
      &<img src="@/assets/img/icon/vue.png" alt="Vue">
      <a href="https://github.com/vuejs/vue">vue</a></span>
  </div>
</div>
</template>

<script>

import variable from "@/assets/js/variable";

export default {
  name: `pagebottom`,
  data(){
    return{
      href:variable.base_url,
      year:parseInt(variable.websiteDatetime.split('-')[0]),
      month:parseInt(variable.websiteDatetime.split('-')[1]),
      day:parseInt(variable.websiteDatetime.split('-')[2]),

    }
  },
  mounted() {
    // 开始计算时间差
    this.siteTime()
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  computed:{
    getYear(){
      var date = new Date();
      return date .getFullYear(); //获取完整的年份(4位)
    }
  },
  methods:{
    siteTime() {
      window.setTimeout(()=>{this.siteTime()},1000)
      var seconds = 1000;
      var minutes = seconds * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var years = days * 365;
      var today = new Date();
      var todayYear = today.getFullYear();
      var todayMonth = today.getMonth() + 1;
      var todayDate = today.getDate();
      var todayHour = today.getHours();
      var todayMinute = today.getMinutes();
      var todaySecond = today.getSeconds();
      /* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳)
      year - 作为date对象的年份，为4位年份值
      month - 0-11之间的整数，做为date对象的月份
      day - 1-31之间的整数，做为date对象的天数
      hours - 0(午夜24点)-23之间的整数，做为date对象的小时数
      minutes - 0-59之间的整数，做为date对象的分钟数
      seconds - 0-59之间的整数，做为date对象的秒数
      microseconds - 0-999之间的整数，做为date对象的毫秒数 */
      var t1 = Date.UTC(this.year, this.month, this.day, 0, 0, 0); //北京时间2017-09-16 00:00:00创建网站的时间
      var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
      var diff = t2 - t1;
      var diffYears = Math.floor(diff / years);
      var diffDays = Math.floor((diff / days) - diffYears * 365);
      var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
      var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
      var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
      document.getElementById("sitetime").innerHTML = '本站竟然已经运行了'+diffYears + "年" + diffDays + "天" + diffHours + "时" + diffMinutes + "分钟" + diffSeconds + "秒了❤️";
    }
  },
  components:{

  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {
  .page_bottom{
    justify-content: flex-end!important;
  }

}
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
  span {
    font-size: 0.8em;
  }
}
// 页面底部图标
.page_bottom_icon {


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
.website_time {
  p {
    font-size: 0.8em;
    margin-bottom: 0;
  }

}
// 版权
.copyright {
  span {
    font-size: 0.8em;
    a {
      font-size: 0.8em;
      @include font_color("font_color1");
    }
  }

}
.page_bottom_icon_item {
  margin: 5px;
}
.page_bottom_icon_item_start {
  display: inline-block;
  font-size: 8px;
  color: white;
  background-color: #5c5c5c;
  border-radius: 3px 0 0  3px;
  padding: 2px;
}
.page_bottom_icon_item_end {
  display: inline-block;
  font-size: 8px;
  color: white;
  border-radius: 0 3px 3px 0;
  padding: 2px;
}

.page_bottom_server_info {
  span {
    font-size: 0.8em;
    a {
      font-size: 0.8em;
      @include font_color("font_color1");
    }
    img {
      height: 0.8em;
      width: auto;
      margin: 0 2px 0 2px;
    }
  }
}
</style>
