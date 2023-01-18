<template>
    <div id="setting" class="settings">
    <!--  切换主题-->
      <div class="change_themes">
        <img @click="change_themes" :src="getImageUrl" id="change_themes-icon" alt="">
      </div>
    <!--  回到顶部-->
      <div  class="backUp">
        <img @click="tobackUp" src="@/assets/img/icon/backup.png" id="backup-icon" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: `setting`,
  data(){
    return{
      scrollTop:0,
      isTopShow:false, // 是否显示回到顶部图标
      scrollTopSpeed:40, // 回到顶部的速度
      themes_img:'day', //
    }
  },
  mounted(){
    window.addEventListener("scroll", this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    handleScroll() {
      this.scrollTop = Math.floor(document.documentElement.scrollTop || document.body.scrollTop);
    },
    tobackUp(){
      let timer = setInterval(()=> {
        document.documentElement.scrollTop = this.scrollTop;
        this.scrollTop = this.scrollTop -this.scrollTopSpeed;
        if(this.scrollTop<=0){
          document.documentElement.scrollTop = 0;
          clearInterval(timer);
        }
      }, 1);
    },
    change_themes(){
      if(this.themes_img === 'day'){
        this.themes_img = 'night';
        window.document.documentElement.setAttribute("data-theme", this.themes_img);
      }else {
        this.themes_img = 'day'
        window.document.documentElement.setAttribute("data-theme", this.themes_img);
      }
    }
  },
  computed: {
    getImageUrl () {
      return require('@/assets/img/icon/'+this.themes_img+'.png');
    }
  },

  watch:{
    scrollTop:{
      handler(newvalue){

        if (newvalue > 150){
          document.getElementById('setting').style.right = '5px'
        }else {
          document.getElementById('setting').style.right = '-45px'
        }

      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
.settings {
  width: 40px;
  height: 80px ;
  background-color: #66797c;
  right: 5px;
  transition: 0.8s;
  bottom: 200px;
  position: fixed;
  float: right;
  @include box_shadow("box_shadow_color1");
  border-radius: 10px;

  z-index: 99;
}
.backUp {
  img {
    width: 30px;
    height: auto;
    margin: 5px;
  }
}
.change_themes {
  img {
    width: 30px;
    height: auto;
    margin: 5px;
  }
}
</style>
