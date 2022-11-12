<template>
  <div class="author-detail" @scroll="getScroll">
    <transition name="navbar">
      <wd-navbar :style="{ backgroundColor: headColor }" v-if="navShow" light>
        <div slot="left" @click="$router.go(-1)">
          <wd-icon class="middle" name="arrow-left"/>
        </div>
      </wd-navbar>
    </transition>

    <div class="author-desc">
      <img :src="authorData.web_url" :alt="authorData.user_name">
      <p class="author-name">{{ authorData.user_name }}</p>
      <p class="author-summary">{{ authorData.summary }}</p>
      <span class="follow">关注</span>
      <span class="fans-total"> {{ authorData.fans_total }}关注</span>
    </div>

    <div class="author-work">
      <article-card v-for="d in dataArr"
                    :key="d.id"
                    :category="d.category"
                    :index="Number(d.category)"
                    :listItem="d"
      />
    </div>
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";

export default {
  name: "AuthorDetailView",
  data() {
    return {
      dataArr: [],
      navShow: true,
      scroll: 0,
    }
  },
  computed: {
    authorData() {
      if (this.$route.query.objStr !== undefined) {
        return JSON.parse(this.$route.query.objStr);
      } else {
        return ''
      }
    },
    headOpacity() {
      let o = Math.floor((this.scroll / 600) * 100) / 100;
      o = o >= 0 ? o : 0;

      return o;
    },
    headColor() {
      let o = this.headOpacity >= 0.8 ? 1 : this.headOpacity;
      return `rgba(255,255,255,${o})`;
    }
  },
  methods: {
    async getData() {

      let {data} = await this.$axios.get(`https://apis.netstart.cn/one/author/works?author_id=${this.authorData.user_id}`)

      this.dataArr = data.data
    },
    getScroll(e) {
      this.scroll = e.target.scrollTop;
    }
  },
  activated() {
    this.getData()
  },
  created() {
    this.getData()
  },
  components: {
    ArticleCard
  }
}
</script>

<style lang="scss" scoped>
.author-detail {
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  overflow: auto;

  .wd-navbar.is-light {
    position: fixed;
    top: 0;
    z-index: 900;
  }

  .wd-navbar.is-light::after {
    display: none;
  }

  .author-desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 30%;

    .fans-total {
      font-size: 12px;
      color: #a7a7a7;
    }

    .author-name {
      font-size: 20px;
    }

    .follow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 30px;
      font-size: 18px;
      border-radius: 3px;
      border: 1px solid #000;
    }

    img {
      width: 20vw;
      height: 20vw;
      border-radius: 999px;
    }
  }

  .author-work {
    background-color: #f6f6f6;
  }
}

</style>