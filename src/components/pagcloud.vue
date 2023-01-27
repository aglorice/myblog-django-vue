<template>
  <div class="wordCloudPag">
    <h4>文章标签</h4>
    <p>目前共计{{echartsData.length}}个标签</p>
    <div class="wordCloudPagBorder">
      <el-skeleton class="loading" v-show="loading" :rows="7" animated :throttle="500" />
      <div id="wordCloudPag" ></div>
    </div>

  </div>

</template>

<script>
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import { getCountPag} from "@/api/http";
export default {
  name:`pagcloud`,
  data() {
    return {
      echartsData: [],
      loading:true
    };
  },
  mounted() {
    this.getCountpag()
  },

  methods: {
    // 请求pag的数据
    getCountpag(){
      // 判断vuex中是否有数据没有则重新请求
      if(this.$store.state.pag.length > 0){
        this.echartsData= this.$store.state.pag
        this.initChart(this);
        this.loading = false
      }else {
        getCountPag(null).then((res) => {
          if (res.code === 200) {
            this.echartsData= res['context']
            this.$store.dispatch('put_pag', this.echartsData)
            this.initChart(this);
            this.loading = false

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
      }

    },

    initChart(_this) {
      var myChart = echarts.init(document.getElementById('wordCloudPag'));
      const option = {
        title: {
          text: '',
          x: "center"
        },
        backgroundColor: "#f5f5f5",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 40],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              color: function () {
                return (
                    "rgb(" +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ", " +
                    Math.round(Math.random() * 255) +
                    ")"
                );
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            //数据
            data: this.echartsData
          }
        ]
      };
      myChart.setOption(option);
      // 点击某个字
      myChart.on('click', function (params) {
        _this.$router.push(`/article/pag/${params.name}`)
      });
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }

  }

}

</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px){
  .wordCloudPagBorder{
    width: 90% !important;
  }
}
#wordCloudPag {
  width: 100%;
  height: 40vh !important;
  @include background_color("background_color1");

}
.loading {
  width: 100% !important;
  height: 40vh !important;
}
.wordCloudPag {
  @include background_color("background_color1");
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    margin-top: 20px;
    @include font_color("font_color1");
  }
  p {
    @include font_color("font_color1");
  }
}
.wordCloudPagBorder {
  margin-top: 20px;
  width: 70%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgb(131 ,136 ,174);
}
</style>
