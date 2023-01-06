<template>
  <div>
    <div class="container_head">
      <h1>归档</h1>
    </div>
    <div class="datetime">
      <div class="datetime-body">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              一致性 Consistency<i class="header-icon el-icon-info"></i>
            </template>
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>

  </div>

</template>

<script>
import {datetime} from "@/utils/datetime";

export default {
  name: `datetime`,
  data(){
    return{
      datetimeArticle:[]
    }
  },
  mounted() {
    this.datetimeArticle = this.$store.state.OriginalArticles
    datetime(this.datetimeArticle)
  }
}
</script >

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {
  .datetime-body {
    width: 70% !important;
  }
}
.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/index.png");
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
.datetime {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.datetime-body {
  width: 70%;
}
</style>
