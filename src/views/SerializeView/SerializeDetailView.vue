<template>
  <div class="serialize-detail">
    <wd-navbar :title="arr[arr.length-1]?.title ?? '爱'" light>
      <div slot="left" @click="$router.go(-1)">
        <wd-icon class="middle" name="arrow-left"/>
      </div>
    </wd-navbar>
    <div class="serial-list">
      <div v-for="a in arr" :key="a.id" class="serial-content" @click="gotoDetail(a.id, a.category)">
        <img :src="a.cover" :alt="a.title">
        <div class="serial-desc">
          <p class="serial-title">{{ a.title }}</p>
          <p class="serial-subtitle">{{ a.subtitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SerializeDetailView",
  data() {
    return {
      arr: [],
    };
  },
  computed: {
    getID() {
      return this.$route.query.id
    }
  },
  methods: {
    async getData() {
      let {data} = await this.$axios.get(`https://apis.netstart.cn/one/find/serial/list/${this.getID}`)
      this.arr = data.data;
    },
    gotoDetail(id, category) {
      this.$router.push({path: '/detail', query: {id, category}})
    }
  },
  created() {

    this.getData();
  },
  activated() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.serialize-detail {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: auto;
  padding-top: 5vh;
  background-color: white;

  .wd-navbar.is-light {
    position: fixed;
    top: 0;
    z-index: 900;
  }

  .serial-list {
    width: 100vw;
    height: 95vh;
    padding: 10px 15px;

    .serial-content {
      display: flex;
      margin-bottom: 15px;
      height: 18vw;

      img {
        border-radius: 10px;
        height: 100%;
      }

      .serial-desc {
        flex: 1;
        padding: 10px 0;
        margin-left: 10px;


        .serial-subtitle {
          max-width: 270px;
          margin-top: 15px;
          font-size: 15px;
          color: #8a8a8a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>