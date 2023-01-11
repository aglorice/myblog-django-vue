<template>
<div id="pag_chart">

</div>
</template>

<script>
import {getCountPag} from "@/api/http";

export default {
  name: "pagCharts",
  data(){
    return{
      pags:{}
    }
  },
  mounted() {
    this.getPagDate()
  },
  methods:{
    getPagDate(){
      // pag
      if(this.$store.state.pag.length > 0){
        this.pags = this.$store.state.pag
        this.drawChartPag()
      }else {
        getCountPag(null).then((res) => {
          if (res.code === 200) {
            this.pags= res['context']
            this.drawChartPag()
            // 将信息提交到vuex
            this.$store.dispatch('put_pag', this.pags)
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
      }
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
            data: this.pags,
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
  }
}
</script>

<style scoped lang="scss">
#pag_chart {
  height: 20em;
}
</style>
