<template>
<div id="article_chart">

</div>
</template>

<script>
import {getArticleTimeCount} from "@/api/http";

export default {
  name: "recentArticle",
  data(){
    return{
      recentarticletime:{}
    }
  },
  mounted() {
    this.getRecentArticle()
  },
  methods:{
    getRecentArticle(){
      // 最近的文章统计
      if(this.$store.state.recentArticle.length > 0){
        this.recentarticletime = this.$store.state.recentArticle
        this.drawArticle()
      }else{
        getArticleTimeCount(null).then((res) => {
          if (res.code === 200) {
            // 将信息提交到vuex
            this.recentarticletime = res['context']
            this.drawArticle()
            this.$store.dispatch('recentarticle',res['context'])

          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '数据获取失败',
            duration: 1500
          });
        })
      }
    },
    drawArticle(){
      let myChart = this.$echarts.init(document.getElementById("article_chart"));
      let option = {
        title: {
          text: '最近的文章篇数',
          left: 'center',
          textStyle:{
            color:'skyblue',
            fontFamily:'Noto Serif SC,serif'
          }
        },
        xAxis: {
          type: 'category',
          data: this.recentarticletime.time.reverse(),
          TextStyle:{
            color:'skyblue',
            fontFamily:'Noto Serif SC,serif'
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.recentarticletime.value.reverse(),
            type: 'line',
            smooth: true,
            lineStyle:{
              color:'#007bff'
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      // 监听页面变化重绘
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped lang="scss">
#article_chart {
  height: 20em;
}
</style>
