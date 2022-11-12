<template>
  <div class="essays-cards" :style="{width: (obj.img_url_thumb_w)/2 + 'px'}" @click="gotoDetail">
    <i class="like"></i>
    <img :src="obj.img_url" :alt="obj.weather"
         :style="{width: (obj.img_url_thumb_w)/2 + 'px', height: (obj.img_url_thumb_h)/2 + 'px'}">
    <div class="essays-desc">
      <p class="html-content" v-html="obj.content"></p>
      <p class="user">{{ obj.user.user_name }}</p>
      <p class="html-time">{{ obj.input_date.split(' ')[0] }} <span v-show="obj.addr">· {{ obj.addr }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EssaysCard",
  props: {
    obj: Object
  },
  methods: {
    gotoDetail() {
      let objStr = JSON.stringify(this.obj)
      this.$router.push({path: '/essay', query: {objStr}})
    }
  }
}
</script>

<style lang="scss" scoped>

.essays-cards {
  position: relative;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px #ccc;

  .like {
    position: absolute;
    top: 10px;
    right: 8px;
    width: 14px;
    height: 12px;
    z-index: 2;
    background-image: url(@/assets/img/article/discover_laud_unselected.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .like::after {
    content: "";
    position: absolute;
    display: block;
    left: -3px;
    top: -4px;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    z-index: 0;
    background-color: rgba(0,0,0,.2);
  }

  img {
    display: block;
    border-radius: 10px 10px 0 0;
    margin-bottom: 10px;
  }

  .essays-desc {
    border-radius: 0 0 10px 10px;
    padding: 0 5px;
    overflow: hidden;

    .html-content {
      font-size: 14px;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp:2; /*设置隐藏行数*/
      -webkit-box-orient: vertical;
    }

    .user {
      margin-top: 10px;
      font-size: 12px;
      color: #bebebe;
    }

    .html-time {
      margin-top: 5px;
      font-size: 12px;
      color: #bebebe;
      margin-bottom: 10px;
    }
  }
}
</style>