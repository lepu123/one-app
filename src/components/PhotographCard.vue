<template>
  <div class="photograph-container">
    <div class="photograph-card">
      <img
        :src="listItem.img_url"
        @click="previewImage"
      />
      <div class="photograph-desc">
        <h3 class="title">{{ listItem.title }}|{{ listItem.pic_info }}</h3>
        <p class="forward">{{ listItem.forward }}</p>
        <p class="words-info">{{ listItem.words_info }}</p>
      </div>
    </div>
    <div class="tool-bar">
      <div class="left-bar"><i class="icon-discovery"></i>小记</div>
      <div class="right-bar">
        <i class="icon-diary_icon"></i>
        <i class="icon-bubble_collect"></i>
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
export default {
  props: {
    listItem: Object,
  },
  methods: {
    previewImage() {
      this.$preview({
        urls: [this.listItem.img_url],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.photograph-container {
  padding: 12px;
  width: 100vw;
  background-color: #fff;

  .photograph-card {
    width: 100%;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
    }

    .photograph-desc {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 10px 20px 30px;
      box-shadow: 0 1px 9px #ddd;

      .title,
      .words-info {
        text-align: center;
        font-size: 14px;
        color: #aaa;
      }

      .forward {
        margin-top: 30px;
        margin-bottom: 100px;
        word-break: break-all;
        font-size: 15px;
        line-height: 28px;
      }
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
      flex: 1;
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

    .icon-discovery {
      background-image: url(../assets/img/article/discovery.png);
    }

    .icon-diary_icon {
      background-image: url(../assets/img/article/diary_icon.png);
    }

    .icon-bubble_collect {
      background-image: url(../assets/img/article/bubble_collect.png);
      background-size: 16px 20px;
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