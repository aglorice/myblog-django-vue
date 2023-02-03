<template>
  <el-card  id="box-card" class="box-card container-body-card">
    <div slot="header" class="clearfix">
      <img src="@/assets/img/icon/rightPag.png" alt="">
      <p>标签</p>
    </div>
    <div class="box-card-body">
      <el-tag class="tag"
              :type="RandomColor()"
              v-for="(value,index) in tags"
              :key="index">
        <router-link :to="`/article/pag/${value.name}`">{{value.name}} </router-link></el-tag>
    </div>
  </el-card>
</template>

<script>
import {getCountPag} from "@/api/http";

export default {
  name: `pag`,
  data(){
    return{
      tags:[],
    }
  },
  mounted() {
    this.getCountpag() // 获取标签数据
  },
  methods:{
    // 请求pag的数据
    getCountpag(){
      if(this.$store.state.pag.length > 0){
        this.tags= this.$store.state.pag
      }else {
        getCountPag(null).then((res) => {
          if (res.code === 200) {
            this.tags = res['context']
            // 将信息提交到vuex
            this.$store.dispatch('put_pag', this.tags)
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
    // 随机生成标签颜色
    RandomColor() {
      const types = ['','success','info','warning','danger']
      let type = Math.floor(Math.random() * 5);
      return types[type];
    }
  },
  computed: {

  },
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
.tag {
  margin-right: 5px;
}
</style>
