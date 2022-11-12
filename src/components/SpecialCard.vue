<template>
  <div class="card" @click="$router.push({path: '/detail',query: {id: option.item_id, category: option.category}})">
    <div class="card-img">
      <img :src="option.img_url" :alt="option.title">
      <span>{{ option.title }}</span>
    </div>
    <div class="card-context">
      <p class="title">{{ option.forward }}</p>
      <div class="card-desc">
        <span class="author">{{ option.author.user_name }}</span>
        <i class="follow"></i>
        <span class="like-count"><i class="like"></i> {{ option.like_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SepcialCard",
  props: {
    option: Object
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  border: 2px solid #eee;
  margin-bottom: 15px;

  .card-img {
    position: relative;

    img {
      width: 100%;
    }

    span {
      position: absolute;
      color: #fff;
      left: 15px;
      bottom: 15px;
      z-index: 12;
      font-weight: bold;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .3);
      z-index: 11;
    }
  }

  .card-context {
    background-color: #fdfdfe;
    padding: 20px 15px 10px;

    p {
      color: #6d6d6d;
      line-height: 20px;
      font-size: 14px;
      margin-bottom: 30px;
    }

    .card-desc {
      font-size: 12px;
      color: #a8a8a8;
    }


    .like-count {
      float: right;
      margin-right: 10px;
      line-height: 18px;

      .like {
        display: inline-block;
        width: 20px;
        height: 18px;
        vertical-align: bottom;
        background-image: url(@/assets/img/article/feeds_laud_default.png);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }

    .follow {
      float: right;
      width: 20px;
      height: 18px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      background-image: url(@/assets/img/article/feeds_share.png);
    }


  }

}
</style>