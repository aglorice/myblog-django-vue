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
        <div class="col-lg-12" id="article_chart"></div>
      </div>


    </div>
  </div>

</template>

<script>
import {getAbout} from "@/api/http";
import transChartsDate from "@/utils/chartsArticle";

export default {
  name: `about`,
  data(){
    return{
      loading:false,
      about:'123123',
      chartDate:{}
    }
  },
  mounted() {
    this.chartDate = transChartsDate(this.$store.state.OriginalArticles)
    this.getRemind();
    this.drawChartCategory();
    this.drawChartPag();
    this.drawArticle()
  },

  methods:{
    getRemind(){
      getAbout(null).then((res) => {
        if (res.code === 200) {
          this.about = res['context'][0]['fields']['content']
          // 将信息提交到vuex
        } else {
          this.$message({
            type: 'info',
            message: '数据获取失败',
            duration: 1500
          });
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    drawChartCategory() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("category_chart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "文章分类",
        },
        tooltip: {},
        legend: {
          data: ["数量"],
        },
        xAxis: {
          data: this.chartDate['categorys'].name,
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: this.chartDate['categorys'].value,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    drawChartPag(){
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("pag_chart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '文章标签',
          left: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '文章数量',
            type: 'pie',
            radius: '50%',
            data: this.chartDate['pags'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    drawArticle(){
      let myChart = this.$echarts.init(document.getElementById("article_chart"));
      let option = {
        title: {
          text: '',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.chartDate['articleTime'].time.reverse()
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.chartDate['articleTime'].value.reverse(),
            type: 'line',
            smooth: true
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

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
#pag_chart {
  height: 20em;
}
#article_chart {
  height: 20em;
}
</style>
