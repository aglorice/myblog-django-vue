<template>
<div >
  <audio  id="mobile-aplayer"></audio>
  <div class="my_aplayer">

  </div>
</div>
</template>

<script>

import {getMusic} from "@/api/http";

export default {
  name: `mobile-aplayer`,
  data(){
    return{
      audio: [],
    }
  },
  mounted() {
      this.getmusic()
  },
  methods: {
    getmusic(){
      getMusic(null).then((res) => {
        if (res.code === 200) {
          this.audio = res['context']
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
}
</script>

<style scoped lang="scss">
#mobile-aplayer {
  display: none;
}
.my_aplayer {

}
</style>
