<template>
<div >
  <audio v-if="isRender"  id="mobile-aplayer"
         :src="currentMusic.url"
          controls
          @ended="musicEnd"
          ref="myaudio"
          preload="auto"
          style="display:none;">
  </audio>
  <div class="my_aplayer">
    <img class="music_cover" :src="currentMusic.cover" alt="">
    <h5>{{currentMusic.name}}-{{currentMusic.artist}}</h5>
    <div class="music_options">
      <i @click="prev" class="el-icon-d-arrow-left"></i>
      <i  @click="myplay" :class="isPlay?'el-icon-video-pause':'el-icon-video-play'"></i>
      <i @click="next" class="el-icon-d-arrow-right"></i>
    </div>
  </div>
</div>
</template>

<script>

import {getMusic} from "@/api/http";

export default {
  name: `mobile-aplayer`,
  data(){
    return{
      isRender:false,
      current:0,
      allMusic:0,
      audio: [], // 音乐列表
      currentMusic :{},
      isPlay:false // 是否播放
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
          this.currentMusic = this.audio[this.current]
          this.allMusic = this.audio.length
          this.isRender = true
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '数据获取失败',
          duration: 1500
        });
      })
    },
    prev(){
      this.currentMusic = this.audio[this.current - 1 === -1?this.current =this.allMusic - 1:--this.current]
      this.$refs.myaudio.load()
      this.$refs.myaudio.play()
    },
    next(){
      this.currentMusic = this.audio[this.current+1 === this.allMusic?this.current = 0:++this.current]
      let promise = this.$refs.myaudio.load()
      promise && promise.catch(function(reason){
        console.log(reason);
      });
      this.$refs.myaudio.play()
    },
    myplay(){
      if (!this.isPlay){
        this.$refs.myaudio.play()
      }else {
        this.$refs.myaudio.pause()
      }
      this.isPlay = !this.isPlay // 切换播放状态
    },
    musicEnd(){
      this.next()
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
.my_aplayer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  @include font_color("font_color1");
}
.music_options {
  width: 50vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  i {
    text-shadow:1px 0px 6px  #999999 ;
    border-radius: 10px;
    padding: 0.2em;
    @include background_color("background_color1");
    @include font_color("font_color1");
    @include box_shadow("box_shadow_color1");
   font-size: 2.2em!important;
    &:active {
      background-color: #999999;
    }
    transition: all 0.5s; /*transition:过度属性*/
  }
}
.music_cover {
  width: 5em;
  height: 5em;
  border-radius: 50%;
  object-fit: cover;
}
</style>
