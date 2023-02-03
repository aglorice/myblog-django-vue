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
    drawChartPag(){
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("pag_chart"));
      // 指定图表的配置项和数据
      let option =  {
        title: {
          text: "文章标签",
          textStyle:{
            color:'skyblue',
            fontFamily:'Noto Serif SC,serif'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '文章标签',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.pags
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
