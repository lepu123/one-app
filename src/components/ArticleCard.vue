<template>
  <div class="article-container" @click="goToDetailView">
    <p class="type">- {{ categoryName }} -</p>
    <template v-if="category != 8">
      <h3 class="title">{{ listItem.title }}</h3>
      <p class="sub-title">
        <span v-if="category == 1">文 / </span>
        {{ listItem.author.user_name }}
      </p>
    </template>
    <p class="forward">{{ listItem.forward }}</p>
    <div class="img-wrap">
      <p class="label" v-if="category == 8">
        <i class="icon-radio"></i> {{ listItem.volume }}
      </p>
      <img v-if="listItem.img_url" v-lazy="listItem.img_url" class="lazyload-img"/>
      <div class="title-label-wrap" v-if="category == 8">
        <p class="title-label">{{ listItem.title }}</p>
        <i class="icon-play"></i>
      </div>
    </div>
    <div class="tool-bar">
      <div class="left-bar">
        <!-- template有空标签效果可以控制多个元素  -->
        <template v-if="category == 8">
          <img v-lazy="listItem.author.web_url" class="lazyload-img"/>
          {{ listItem.author.user_name }}
        </template>
      </div>
      <div class="right-bar">
        <span
        ><i class="icon-feeds_laud_default"></i
        >{{ listItem.like_count }}</span
        >
        <i class="icon-feeds_share"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {titleTypes} from "@/utils/apis/articlecontent";

export default {
  props: {
    listItem: Object,
    category: String,
    index: Number,
  },
  computed: {
    categoryName() {
      return titleTypes[this.index];
    },
  },
  methods: {
    goToDetailView() {
      // 此处文章详情需要使用 content_id 而不是id
      let {content_id, category} = this.listItem
      this.$router.push({
        path: "/detail",
        query: {
          id: content_id,
          category
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.article-container {
  margin-top: 10px;
  padding: 12px;
  width: 100vw;
  background-color: #fff;

  .type {
    margin-bottom: 25px;
    text-align: center;
    color: #999;
  }

  .title {
    font-size: 22px;
    font-weight: 600;
  }

  .sub-title {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }

  .forward {
    margin-top: 20px;
    margin-bottom: 15px;
    word-break: break-all;
    font-size: 15px;
    color: #777;
  }

  .img-wrap {
    position: relative;
    border-radius: 10px;
    width: 100%;
    overflow: hidden;

    .label {
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 12px;
      line-height: 12px;
      color: #fff;

      .icon-radio {
        display: inline-block;
        width: 48px;
        height: 12px;
        vertical-align: top;
        transform: translateY(1px);
        background-image: url(../assets/img/article/one_radio_icon.png);
        background-size: 48px;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }

    .title-label-wrap {

      position: absolute;
      left: 15px;
      right: 15px;
      bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      .title-label {
        flex: 1;
        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .icon-play {
        flex: 0 0 32px;
        display: block;
        width: 32px;
        height: 32px;
        background-image: url(../assets/img/play/feeds_radio_play.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }


    img {
      width: 100%;
    }
  }

  .left-bar {
    line-height: 24px;

    img {
      margin-right: 4px;
      border-radius: 999px;
      width: 24px;
      height: 24px;
      vertical-align: top;
    }
  }

  .tool-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 5px;
    font-size: 12px;
    color: #999;
    line-height: 20px;

    .right-bar {
      flex: 0 0 100px;
      margin-left: 100px;
      display: flex;
      justify-content: space-between;
    }

    i {
      display: inline-block;
      vertical-align: top;
      margin-right: 3px;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .icon-feeds_laud_default {
      background-image: url(../assets/img/article/feeds_laud_default.png);
    }

    .icon-feeds_share {
      background-image: url(../assets/img/article/feeds_share.png);
      background-size: 18px 18px;
    }
  }
}
</style>