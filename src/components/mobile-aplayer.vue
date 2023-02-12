<template>
<div >
  <audio v-if="isRender"  id="mobile-aplayer"
         :src="currentMusic.url"
          controls
          @ended="musicEnd"
          ref="myaudio"

          style="display:none;">
    <source ref="test" id="test" :src=
        "currentMusic.url"
            type="audio/mp3">
  </audio>
  <div class="my_aplayer">
    <img id="cover" :class="{'toggleAudioAni':true,'pause':!isPlay}" :src="currentMusic.cover" alt="">
    <h5 :class="{'animate':isPlay,'text_pause':!isPlay}">{{currentMusic.name}}-{{currentMusic.artist}}</h5>
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
      isPlay:false, // 是否播放
      ispause:true,
    }
  },
  mounted() {
      this.getmusic()
      this.$refs.test.play()
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
      this.$refs.myaudio.oncanplay = ()=>{
        if (this.isPlay){
          this.$refs.myaudio.play();
        }
      }
    },
    next(){
      this.currentMusic = this.audio[this.current+1 === this.allMusic?this.current = 0:++this.current]
      // 在没有使用source的情况切换音频是不需要使用load来加载音频的，当只把audio中的src的资源切换后audio会自动进行加载
      // 如果你在这里直接调用play()方法的话，那样将会发生错误，很大概率会出现音频还会处于播放状态下就开始播放了，这显然是错误的
      // 这里我们可以选择捕捉这个错误，因为play()方法会有返回值
      // DOMException: The play() request was interrupted by a new load request.
      // 如果使用source需要手动load
      this.$refs.myaudio.oncanplay = ()=>{
        if (this.isPlay){
          this.$refs.myaudio.play()
        }
      }
      // let playPromise = this.$refs.myaudio.play();
      //
      // if (playPromise !== undefined) {
      //   playPromise.then(() => {
      //     this.$refs.myaudio.load();
      //     if(this.isPlay === true){
      //       this.$refs.myaudio.play();
      //       this.ispause = false
      //     }
      //   }).catch(() => {
      //     debugger
      //     console.log('1234234')
      //         this.next()
      //   });
      // }
    },
    myplay(){
      if (!this.isPlay){
        this.$refs.myaudio.play()
      }else {
        this.$refs.myaudio.pause()
      }
      this.ispause = !this.isPlay
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
@keyframes wordsLoop {
  0% {
    transform: translateX(200px);
    -webkit-transform: translateX(200px);
  }

  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}



@-webkit-keyframes wordsLoop {
  0% {
    transform: translateX(200px);
    -webkit-transform: translateX(200px);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}
@keyframes rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
.animate {
  display: inline-block;
  white-space: nowrap;
  animation: 10s wordsLoop linear infinite normal;

}
.my_aplayer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  @include font_color("font_color1");
  overflow: hidden;
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

}
.pause{
  @extend .music_cover;
  animation-play-state: paused !important;

  -webkit-animation-play-state: paused !important;
}
.text_pause {
  animation-play-state: paused !important;

  -webkit-animation-play-state: paused !important;
}
.toggleAudioAni{
  @extend .music_cover;
  -webkit-transform: rotate(360deg);
  animation: rotation 7s linear infinite;
  -moz-animation: rotation 7s linear infinite;
  -webkit-animation: rotation 7s linear infinite;
  -o-animation: rotation 7s linear infinite;
}

</style>
