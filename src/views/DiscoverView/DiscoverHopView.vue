<template>
  <div class="hop">
    <div class="hop-warp" v-for="h in hotArr" :key="h.id">
      <div class="hop-warp-title">{{ h.title }} <span @click="goToHopDetailView(h.id,h.title)">完整表单 ></span></div>
      <div class="hop-list">
        <img :src="h.img_url" :alt="h.title">
        <div class="hop-list-item">
          <div @click="goToDetailView(h.contents[0].id,h.contents[0].category)" class="hop-content"><span class="top-one">1.</span>{{ h.contents[0].title }}</div>
          <div @click="goToDetailView(h.contents[1].id,h.contents[1].category)" class="hop-content"><span class="top-two">2.</span>{{ h.contents[1].title }}</div>
          <div @click="goToDetailView(h.contents[2].id,h.contents[2].category)" class="hop-content"><span class="top-three">3.</span>{{ h.contents[2].title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscoverHopView",
  data() {
    return {
      hotArr: [],
    }
  },
  props: {
    month: String
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios('https://apis.netstart.cn/one/find/rank')
          .then(({data}) => {
            this.hotArr = data.data;
          })
    },
    goToHopDetailView(id, title) {
      this.$router.push({path: '/hop', query: {id, title}})
    },
    goToDetailView(id,category) {
      this.$router.push({path: '/detail', query: {id, category}})
    }
  }
}
</script>

<style lang="scss" scoped>
.hop {
  width: 100vw;
  height: 88vh;
  padding: 0 15px;
  overflow: auto;

  .hop-warp {

    .hop-warp-title {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 30px;
      margin-bottom: 20px;

      span {
        font-size: 12px;
        color: #aaa;
      }
    }

    .hop-list {
      display: flex;
      height: 80px;

      img {
        display: block;
        border-radius: 10px;
      }

      .hop-list-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px 10px;
        font-size: 12px;
        color: #818181;

        .hop-content {

          .top-one {
            color: #de2e2e;
          }

          .top-two {
            color: #fd7474;
          }

          .top-three {
            color: #fcc361;
          }

        }
      }
    }
  }
}
</style>