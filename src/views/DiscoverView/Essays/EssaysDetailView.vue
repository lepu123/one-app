<template>
  <div class="essay-detail">
    <div class="header-nav">
      <i class="wd-icon-thin-arrow-left" @click="$router.go(-1)"></i>
      <div class="right"><span><i class="like"></i>{{ obj.praisenum }}</span><i class="wd-icon-download"></i></div>
    </div>
    <div class="essay-content">
      <img :src="obj.img_url" :alt="obj.weather">
      <div class="html-desc">
        <span>{{ addTime }}</span> | <span v-show="obj.addr">{{ obj.addr }}</span>
        <div class="html-content"> {{ obj.content }} </div>
      </div>
      <p>{{ obj.user.user_name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EssaysDetailView",
  data() {
    return {
      obj: {}
    }
  },
  activated() {
    this.obj = JSON.parse(this.$route.query.objStr);
    console.log(JSON.parse(this.$route.query.objStr))
  },
  created() {
    this.obj = JSON.parse(this.$route.query.objStr);
  },
  computed: {
    addTime() {

      return this.obj.input_date.split(' ')[0]
    }
  }

}
</script>

<style lang="scss" scoped>
.essay-detail {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  background-color: white;

  .header-nav {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 5vh;
    padding: 10px 15px 0;
    background-color: white;

    .right {
      display: inline-block;
      float: right;

      span {
        margin-right: 5px;

        .like {
          display: inline-block;
          width: 16px;
          height: 14px;
          background-image: url(@/assets/img/article/discover_laud_unselected.png);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
    }
  }

  .essay-content {
    position: relative;
    top: 5vh;
    width: 100%;
    height: 95%;

    p {
      margin-top: 10px;
      text-align: center;
      color: #828282;
    }

    img {
      width: 100%;
    }

    .html-desc {
      padding: 10px 15px 0;
      .html-content  {
        white-space:pre-wrap;
      }
    }

  }
}
</style>