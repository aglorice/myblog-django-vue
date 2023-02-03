<template>
  <el-card  id="box-card" class="box-card container-body-card">
    <div slot="header" class="clearfix">
      <img src="@/assets/img/icon/public.png" alt="">
      <p>公告</p>
    </div>
    <div class="box-card-body">
      <p>{{announcement}}</p>
    </div>
  </el-card>
</template>

<script>
import {getAnnouncement} from "@/api/http";

export default {
  name: `mypublic`,
  data(){
    return{
      announcement:''
    }
  },
  methods:{
    // 获取公告
    getannouncement(){
      getAnnouncement(null).then((res) => {
        if (res.code === 200) {
          this.announcement = res['context'][0]['fields']['announcement'];
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
  mounted() {
    this.getannouncement() // 获取公告
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/card/card";
.clearfix {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  img {
    width: auto;
    height: 1.5em;
    margin-right: 10px;
  }

  p {
    margin-bottom: 0;
  }
}
.box-card-body {
  p {
    text-indent: 2em;
  }
}
</style>
