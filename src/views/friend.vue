<template>
  <div>
    <div class="container_head">
      <h1>友人帐</h1>
    </div>
    <div class="container_body">
      <v-md-preview class="preview-themes"
                    :text="addfriendinfo"
                    @copy-code-success="handleCopyCodeSuccess">
      </v-md-preview>
      <h3>友人帐</h3>
      <div class="row friends">
        <div v-for="(value,index) in friends" :key="index"  class="friend col-md-4 col-sm-6 col-xs-12 ">
          <div  class=" friends_item">
            <div class="friends_item_img"
                 :style="'background-image:url('+value.blog_icon+');'">
              <div class="friends_item_icon">
                <img :src='value.blog_icon' alt="">
              </div>
            </div>

            <span>{{value.blog_name}}</span>
            <p>{{value.blog_info}}</p>
          </div>
        </div>

      </div>
      <el-divider content-position="center">友链申请</el-divider>
      <div class="add_friend">
        <div class="row">
          <el-input
              class="add_friend_input col-md-3 col-sm-12"
              type="text"
              placeholder="请输入你的网站的名称"
              v-model="blog.blogname"
              maxlength="10"
          >
          </el-input>

          <el-input
              class="add_friend_input col-md-3 col-sm-12"
              type="text"
              placeholder="请输入你的网站的链接"
              v-model="blog.blogsite"
              maxlength="10"
          >
          </el-input>

          <el-input
              class="add_friend_input col-md-3 col-sm-12"
              type="text"
              placeholder="请输入你的网站的图标"
              v-model="blog.blogicon"
              maxlength="10"
          >
          </el-input>

          <el-input
              class="add_friend_input col-md-3 col-sm-12"
              type="email"
              placeholder="请输入你的邮箱"
              v-model="blog.blogemail"
              maxlength="20"
              :validate-event="true"
          >
          </el-input>

          <el-input
              class="add_friend_input col-md-12 col-sm-12"
              type="textarea"
              :rows="2"
              placeholder="请输入你的网站的简介"
              v-model="blog.bloginfo"
              maxlength="50"
          >
          </el-input>

        </div>
        <div class="submit">
          <el-button
              @click="submitInfo"
              :loading="false"
              size="small"
              round
          >提交</el-button>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import {getToke, submitFriend} from "@/api/http";

export default {
  name: `friend`,
  data(){
    return{
      addfriendinfo:`\`\`\`
        申请友链的方法：
        名称：aglorice
        网址：http://blog.aglorice.xyz
        图标：http://blog.aglorice.xyz/favicon.ico
        描述：愚者逆时而动，智者顺时而谋.
        \`\`\``,
      blog:{
        blogname:'',
        blogsite:'',
        blogicon:'',
        bloginfo:'',
        blogemail:''
      },
      friends:[
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
        {
          blog_name:'123',
          blog_icon:'https://api.lty.fun/avatar/199d23cdd4aa64716032b7928eb7c94e?s=80&d=404',
          blog_site:'www.baidu.com',
          blog_info:'123'
        },
      ]
    }
  },
  mounted() {
    this.getcrsf()
  },
  methods:{
    // 提交申请
    submitInfo(){
      submitFriend(this.blog).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '提交成功',
            duration: 1500
          });
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
    },
    // 获取token
    getcrsf(){
      getToke(null).then((res) => {
        console.log(res)
        if (res.code === 200) {
          let data = res['csrf_token']
          localStorage.setItem("csrf_token", data)
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
    },
    //复制成功的回调
    handleCopyCodeSuccess(){
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success',
        duration:'1000'
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
@media (max-width: 750px) {
  .preview-themes {
    width: 100%!important;
  }
  .friends {
    width: 90% !important;
  }
  .add_friend {
    width: 90% !important;
  }
}
.container_head {
  width: 100vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/index.png");
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
.container_body {
  @include background_color("background_color1");
  @include font_color("font_color1");
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3 {
    text-align: center;
  }
}
.preview-themes {
  width: 70%;
}
.friends {
  width: 70%;
}
.friends_item {
  @include background_color("background_color1");
  @include box_shadow("box_shadow_color1");
  @include font_color("font_color1");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 10px 0;
  overflow: hidden;
  border-radius: 10px 10px 10px 10px;
  img {

    width: 44px;
    height: 44px;
    border: 3px white solid;
    border-radius: 22px;
  }
  .friends_item_icon {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    font-size: 1.5em;
    font-weight: bold;
  }
}
.friend {
  width: 100%;
  border-radius: 10px;
}
.friends_item_img {
  width: 100%;
  height: 100%;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-size: cover;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add_friend {
  width: 70%;
}
.add_friend_input {
  margin: 10px 0 10px 0;
}
.submit {
  text-align: center;
}

</style>
