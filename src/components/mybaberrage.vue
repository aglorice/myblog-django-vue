<template>

  <vue-danmaku :danmus="danmus"
               loop
               style="height:90%; width:100%;margin-top: 60px;"
               ref="danmaku"
               :useSlot="true"
               :channels = 'channels'
               randomChannel
               :debounce="600"
               v-model="danmus"
               @play-end="end">
    <template  v-slot:dm="{ danmu }">
      <div class="message_item">
        <img src="https://aglorice.cn/favicon.png" alt="">
         友人A：{{ danmu.text }}
      </div>
    </template>
  </vue-danmaku>
</template>

<script>
// 1. 引入
import vueDanmaku from 'vue-danmaku'

export default {
  name: `barrage`,
  components: {
    // 2. 注册
    vueDanmaku
  },
  data() {
    return {
      danmus: [{ avatar: 'http://a.com/a.jpg', name: 'a', text: 'aaa' }, { avatar: 'http://a.com/b.jpg', name: 'b', text: 'bbb' }],
      channels:0
    }
  },
  methods: {
    end() {
      console.log(this.$refs.danmaku);
    }
  }
}
</script>
<style scoped lang="scss">
.message_item {
  img {
    width: 1.6em;
    height: 1.6em;
  }

}
</style>


