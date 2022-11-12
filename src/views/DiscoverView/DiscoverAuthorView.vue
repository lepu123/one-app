<template>
  <div class="discover-author">
    <h3>热门作者</h3>
    <div class="author-list" v-for="a in author" :key="a.user_id" @click="gotoDetail(a)">
      <img :src="a.web_url" :alt="a.user_name">
      <div class="author-desc">
        <p class="author-name">{{a.user_name}}</p>
        <p class="author-summary">{{a.summary}}</p>
      </div>
      <div class="follow">关注</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscoverAuthorView",
  data() {
    return {
      author: []
    }
  },
  methods: {
    getAuthor() {
      this.$axios.get('https://apis.netstart.cn/one/author/hot')
          .then(({data}) => {
            this.author = data.data
          })
    },
    gotoDetail(a) {
      let objStr = JSON.stringify(a)
      this.$router.push({path: '/author', query: {objStr}})
    }
  },
  created() {
    this.getAuthor()
  }
}
</script>

<style lang="scss" scoped>
.discover-author {
  width: 100vw;
  height: 88vh;
  padding: 15px 15px 0;
  overflow: auto;

  h3 {
    height: 20px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  .author-list {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    img {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 999px;
    }

    .author-desc {
      flex: 1 1 auto;
      max-width: 240px;
      padding: 7px 0;

      .author-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .author-summary {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .follow {
      width: 50px;
      height: 25px;
      text-align: center;
      line-height: 20px;
      border: 2px solid #000000;
      border-radius: 999px;
    }
  }
}
</style>