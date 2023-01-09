<template>
  <div class="about">
    <div class="container_head">
      <h1>关于我</h1>
    </div>
    <div class="container_body">
      <v-md-preview
                    v-if="!loading"
                    :text="about"
                    ref="preview">
      </v-md-preview>
      <div class="row">
        <div class="col-md-12 col-lg-6" id="category_chart"></div>
        <div class="col-md-12 col-lg-6" id="pag_chart"></div>
        <div class="col-lg-6" id="article_chart"></div>
      </div>


    </div>
  </div>

</template>

<script>
export default {
  name: `about`,
  data(){
    return{
      loading:false,
      about:'123123'
    }
  },
  mounted() {
    this.drawChartCategory();
  },

  methods:{
    drawChartCategory() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("category_chart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },

  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {
  .container_body {
    width: 90% !important;
  }
}
.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/about.png");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  //background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  h1 {
    font-size: 3em;
    color: white;
  }

}
.about {
  @include background_color("background_color1");
  @include font_color("font_color1");
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container_body {

  width: 70%;
}
#category_chart {
  height: 20em;
}
</style>
