<template>
  <el-card  id="box-card" class="box-card container-body-card">
    <div slot="header" class="clearfix">
      <img src="@/assets/img/icon/rightcategorize.png" alt="">
      <p>分类</p>
    </div>
    <div class="box-card-body">
      <ul>
        <li v-for="(value,index) in category"
            :key="index" @click="categoryType(value.name)">
          <span>{{value.name}}</span>
          <p>{{value.value}}</p>
        </li>
        <router-link v-if="category.length > 4" to="/categorize">更多...</router-link>
      </ul>
    </div>
  </el-card>
</template>

<script>
import {getCountCategorize} from "@/api/http";

export default {
  name: `category`,
  data(){
    return{
      category:[]
    }
  },
  mounted() {
    this.getcountcategorize()
  },
  methods:{
    // 路由跳转到分类界面
    categoryType(type_name){
      this.$router.push(`/article/category/${type_name}`)
    },
    getcountcategorize(){
      // 判断vuex中是否有数据
      if(this.$store.state.category.length > 0){
        this.category= this.$store.state.category
      }else {
        getCountCategorize(null).then((res) => {
          if (res.code === 200) {
            this.category= res['context']
            // 将信息提交到vuex
            this.$store.dispatch('put_category',this.category)
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
  ul {
    list-style:none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      height: 3em;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      p {
        margin-bottom: 0;
        margin-right: 5px;
      }
      span {
        margin-left: 5px ;
        cursor:pointer;
      }
      &:hover{
        background-color: gainsboro;
        transition: 0.8s;
        transform: scale(1.1); /*transform:变形属性，scale：缩放1.1倍 */
      }
      &:active {
        background-color: #e8e7e7;
      }
    }
  }
}
</style>
