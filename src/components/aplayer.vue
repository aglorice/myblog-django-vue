<template>
  <div id="aplayer" class="aplayer"></div>
</template>

<script>
import APlayer from "aplayer"; // 引入音乐插件
import "aplayer/dist/APlayer.min.css";
import {getMusic} from "@/api/http"; // 引入音乐插件的样式
export default {
  name: `aplayer`,
  data(){
    return{
      audio: [],
      info: {
        fixed: true, // 不开启吸底模式
        listFolded: false, // 折叠歌曲列表
        autoplay: false, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        lrcType: 1,
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      },
      screenWidth:document.body.clientWidth,
    }
  },
  mounted() {
    if (this.screenWidth >750){
      this.getmusic()
    }
  },
  methods: {
    initAudio() {
      // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
        this.ap = new APlayer({
        container: document.getElementById("aplayer"),
        audio: this.audio, // 音乐信息
        ...this.info, // 其他配置信息
      });
    },
    getmusic(){
      getMusic(null).then((res) => {
        if (res.code === 200) {
          this.audio = res['context']
          // 初始化播放器
          this.initAudio();
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
}
</script>

<style scoped lang="scss">
#aplayer {
  position: fixed;
  float: right;
  .aplayer-list {
    ol {
      li {
        span {
          font-size: 0.8em;
        }
      }
    }
  }
}
@media (max-width: 750px){
  .aplayer{
    display: none;
  }
}

</style>
