<template>
  <div>
    <div v-loading="loading" v-if="loading" class="github_loading">
    </div>
    <div v-if="isRender" class="github_charts">
      <img  class="github_charts_img" v-lazy="github_img" alt="Github chart" />
      <p>数据来源<a :href="github_url">@{{this.user}}</a></p>
      <div class="github_charts_date">
        <div class="github_charts_date_item">
          <span>最近一年的提交数</span>
          <h4>{{gits.last_year.count}}</h4>
          <span>{{gits.last_year.time.start}}</span>
        </div>
        <div class="github_charts_date_item">
          <span>最近一个月的提交数</span>
          <h4>{{gits.last_month.count}}</h4>
          <span>{{gits.last_month.time.start}}</span>

        </div>
        <div class="github_charts_date_item">
          <span>最近一周的提交数</span>
          <h4>{{gits.last_week.count}}</h4>
          <span>{{gits.last_week.time.start}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {getGithub} from "@/api/http";

export default {
  name: `github`,
  props:['user'],
  data(){
    return{
      github_img:`https://ghchart.rshah.org/${this.user}`,
      github_url:`https://github.com/${this.user}`,
      gits:[],
      loading:true,
      isRender:false
    }
  },
  mounted() {
    this.GetGithub()
  },
  methods:{
    GetGithub(){
      const param = {
        user:this.user
      }
      getGithub(param).then((res) => {
        if (res.code === 200) {
          this.gits = res['context']
          this.loading = false
          this.isRender = true
        }
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'info',
          message: '请求数据超时',
          duration: 1500
        });

      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
.github_charts {
  @include background_color("background_color1");
  @include font_color("font_color1");
  @include box_shadow("box_shadow_color1");
  width: 100% ;

  margin-bottom: 20px;
  border-radius: 10px;
  padding: 1em;
  p {
    margin-left: 1.6em;
    font-size: 0.8em;
    margin-bottom: 0;
    font-weight: lighter;
  }
  .github_charts_img {
    font-size: 0.8em;
    width: 100%;
  }
  .github_charts_date {
    width: 100%;

    @include font_color("font_color1");
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: lighter;
    .github_charts_date_item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 0.8em;
      }
      h4 {
        font-size: 1.6em;
      }


    }
  }
}
.github_loading {
  width: 100% ;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 20px;
}

</style>
