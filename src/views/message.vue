<template>
<div>
  <div class="container_head">
    <div class="message">
      <mybaberrage></mybaberrage>
    </div>
    <div class="send_message">
      <input type="text" class="form_input" placeholder="说点什么吧"  v-model="message" />
      <el-button round>发送</el-button>
    </div>

  </div>
</div>
</template>

<script>


import mybaberrage from "@/components/mybaberrage";


export default {
  name: `message`,
  data(){
    return{
      message:'',

    }
  },
  components:{
    mybaberrage
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 750px){
  .container_head {
    input {
      width: 80vw!important;
    }
  }
}
.send_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
}
.message {
  width: 100vw;
  height: 100vh;
  position: absolute;

}
.container_head {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/message.png");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
//background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  margin-bottom: 0;
  h1 {
    font-size: 3em;
    color: white;
  }
  input {
    background-color:transparent;
    outline-style: none;
    border: 2px solid #000000;
    border-radius: 5px;
    width: 30vw;
    height: 2.5em;
    padding: 0;
    padding: 10px 15px;
    box-sizing: border-box;
    font-family: "Microsoft soft";
    margin-bottom: 20px;
    input::-webkit-input-placeholder{
      color: #171818;
    }
    &:focus {
      border-color: #222522;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px
      rgba(0, 0, 0, 0.075),
      #262a26;
      box-shadow: inset 0 1px 1px rgba(129, 111, 111, 0.07),
      #50504b;
    }
  }

}
</style>
