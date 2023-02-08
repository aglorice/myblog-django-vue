<template>

  <vue-danmaku :danmus="danmus"
               loop
               style="height:90%; width:100%;margin-top: 60px;"
               ref="danmaku"
               :useSlot="true"
               :speeds="speeds"
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
  props:['sendMessage'],
  data() {
    return {
      danmus: [],
      channels:0, //
      speeds: 200 // 弹幕速度
    }
  },
  mounted() {
    const windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth <750){
      this.speeds = 100
    }
    this.GetMessage()
  },
  methods: {
    addMessage(){
      this.$refs.danmaku.add({"model":"api.message","pk":1111,"fields":{"name":"有趣","avatar":"https://img.aglorice.cn/img/202302081331855.png","message":this.$props.sendMessage,"ip":null,"created_time":"2023-02-07","is_yes":1}})
      this.$store.dispatch('putdanmu',this.danmus)
    },
    GetMessage(){
      if (this.$store.state.danmus.length !== 0){
        this.danmus = this.$store.state.danmus
      }else {
        getMessage(null).then((res) => {
          if (res.code === 200) {
            this.danmus = res['context']
            // 将数据提交到vuex
            this.$store.dispatch('putdanmu',this.danmus)
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


