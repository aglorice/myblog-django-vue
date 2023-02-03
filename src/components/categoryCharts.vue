<template>
<div id="category_chart">

</div>
</template>

<script>
import {getCountCategorize} from "@/api/http";
import * as echarts from "echarts";

export default {
  name: "categoryCharts",
  data(){
    return{
      categorys:{
        name:[],
        value:[]
      }
    }
  },
  mounted() {
    this.getCategoryDate()
  },
  methods:{
    getCategoryDate(){
      if(this.$store.state.category.length > 0){
        this.categorys.name = this.$store.state.category.map(obj => obj.name)
        this.categorys.value = this.$store.state.category.map(obj => obj.value)
        this.drawChartCategory()
      }else {
        getCountCategorize(null).then((res) => {
          if (res.code === 200) {
            this.categorys.name =  res['context'].map(obj => obj.name)
            this.categorys.value =  res['context'].map(obj => obj.value)
            // 将信息提交到vuex
            this.drawChartCategory()
            this.$store.dispatch('put_category',res['context'])
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
    drawChartCategory() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("category_chart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "文章分类",
          textStyle:{
            color:'skyblue',
            fontFamily:'Noto Serif SC,serif'
          }
        },
        tooltip: {},
        legend: {
          data: ["数量"],

        },
        xAxis: {
          data: this.categorys.name,

        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            name:'文章分类',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.categorys.value,
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
#category_chart {
  height: 20em;
}
</style>
