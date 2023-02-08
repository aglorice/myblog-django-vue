<template>
<div>
  <div class="container_head">
    <div class="message">
      <mybaberrage ref="baberrage" :sendMessage="message"></mybaberrage>
    </div>
    <div class="send_message">
      <input type="text" class="form_input" placeholder="说点什么吧"  v-model="message" />
      <el-button round @click="AddMessage">发送</el-button>
    </div>

  </div>
</div>
</template>

<script>


import mybaberrage from "@/components/mybaberrage";
import {addMessage} from "@/api/http";
import {Loading} from "element-ui";


export default {
  name: `message`,
  data(){
    return{
      message:'',

    }
  },
  methods:{
    AddMessage(){
      this.$refs.baberrage.addMessage()
      let loadingInstance = Loading.service({fullscreen:true});
      let params = {
        message:this.message
      }
      addMessage(params).then((res) => {
        if (res.code === 200) {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          this.$message({
            message: '发送成功!',
            type: 'success',
            duration: 1500
          });
        }
      }).catch((err) => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        if(err.code == 400){
          this.$message({
            type: 'info',
            message: '请仔细核对提交要求',
            duration: 1500
          });
        }else if(err.code == 201){
          this.$message({
            type: 'info',
            message: '数据获取失败',
            duration: 1500
          });
        }else if(err.code == 202){
          this.$message({
            type: 'info',
            message: '请求失败，请重新尝试',
            duration: 1500
          });
        }else if(err.code == 'ERR_BAD_REQUEST'){
          this.$message({
            type: 'info',
            message: '你访问的太快了😭',
            duration: 1500
          });
        }
      })
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
