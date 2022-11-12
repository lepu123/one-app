<template>
  <div class="special-view">
    <div class="special-box">
      <div v-for="b in banner" class="banner-view" :key="b.id" @click="goToDetailView(b.category,b.content_id)">
        <img :src="b.cover" :alt="b.id">
        <span class="banner-category"># 专题</span>
        <div class="banner-title">{{ b.title }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import {debounce} from "lodash-es";

export default {
  data() {
    return {
      banner: [],
    }
  },
  created() {
    this.getBanner = debounce(this.getBanner)
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    getBanner() {
      this.$axios
          .get('https://apis.netstart.cn/one/banner/list/4')
          .then(({data}) => {
            // console.log(data.data);
            this.banner = data.data
          })
    },
    goToDetailView(category, id) {
      this.$router.push({path: '/special', query: {category, id}})
    }
  },
  name: "SpecialView"
}
</script>

<style lang="scss" scoped>
.special-view {
  width: 100vw;
  height: 88vh;
  padding: 10px 15px 0;
  overflow: auto;

  .special-box {
    height: 100px;

    .banner-view {
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 50px;
      box-shadow: 0 2px 2px #ddd;

      .banner-title {
        height: 50px;
        background-color: #f5f5f5;
        font-size: 15px;
        font-weight: bold;
        padding: 15px 10px;
      }

      .banner-category {
        position: absolute;
        left: 15px;
        bottom: 60px;
        font-size: 12px;
        color: #d8d8d8;
      }

      img {
        width: 100%;
      }
    }

    &.special-box:last-of-type::after {
      content: '加载完毕';
    }
  }

}
</style>