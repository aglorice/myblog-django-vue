<template>
<div>
  <div class="container_head">
    <h1>bilibili</h1>
  </div>
  <div>
    <div class="fans row">
      <div class="fans-item col-xs-12 col-sm-6 col-md-4 col-lg-3">

      </div>
    </div>
  </div>
</div>
</template>

<script>
import {getFans} from "@/api/http";

export default {
  name: `chasefan`,
  data(){
    return{
      fansData:''
    }
  },
  mounted() {
    this.getFans()
  },
  methods:{
    getFans(){
      let param = {
        vmid:1705222226,
      }
      getFans(param).then((res) => {
        if (res.code === 200) {
          let data = res['context']
          console.log(data)
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
  }
}
</script>

<style scoped lang="scss">
.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/chasefan.png");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  //background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  h1 {
    font-size: 3em;
    color: white;
  }

}
.container_head {
}

</style>
