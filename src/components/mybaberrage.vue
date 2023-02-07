<template>

  <vue-danmaku :danmus="danmus"
               loop
               style="height:90%; width:100%;margin-top: 60px;"
               ref="danmaku"
               :useSlot="true"
               :channels = 'channels'
               randomChannel
               :debounce="600"
               v-model="danmus">
    <template  v-slot:dm="{ danmu }">
      <div class="message_item">
        <img :src="danmu.fields.avatar" alt="">
         {{danmu.fields.name}}：{{ danmu.fields.message }}
      </div>
    </template>
  </vue-danmaku>
</template>

<script>
// 1. 引入
import vueDanmaku from 'vue-danmaku'
import {getMessage} from "@/api/http";

export default {
  name: `barrage`,
  components: {
    // 2. 注册
    vueDanmaku
  },
  data() {
    return {
      danmus: [],
      channels:0
    }
  },
  mounted() {
    this.GetMessage()
  },
  methods: {
    GetMessage(){
      getMessage(null).then((res) => {
        if (res.code === 200) {
          this.danmus = res['context']
          // 初始化播放器
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '数据获取失败',
          duration: 1500
        });
      })
    }
  }
}
</script>
<style scoped lang="scss">
.message_item {
  background-color: white;
  border-radius: 0.5em;
  color: black;
  img {

    width: 1.8em;
    height: 1.8em;
    border-radius: 0.5em;
  }

}
</style>


