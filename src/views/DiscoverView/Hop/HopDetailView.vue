<template>
  <div class="hop-detail">
    <div class="hop-navbar">
      <div @click="$router.go(-1)" class="right">
        <wd-icon size="30px" class="middle" name="arrow-left" />
      </div>
      <span>{{ getHopTitle }}</span>
    </div>
    <div class="hop-whole">
      <hop-card v-for="(l,index) in listData"
                :key="l.id"
                :title="l.title"
                :cover="l.cover"
                :subtitle="l.subtitle"
                :category="l.category"
                :id="l.id"
                :no="index+1"/>
    </div>
  </div>
</template>

<script>
import hopCard from "@/components/HopCard";

export default {
  name: "HopDetailView",
  components: {hopCard},

  data() {
    return {
      listData: [],
      id: 0
    }
  },
  created() {
    this.getData(7)
  },
  computed: {
    getHopId() {
      return this.$route.query.id
    },
    getHopTitle() {
      return this.$route.query.title
    }
  },
  watch: {
    getHopId(val) {
      this.getData(val)
    }
  },
  methods: {
    async getData(id) {
      if (id !== undefined) {
        this.id = this.getHopId
        let {data} = await this.$axios.get(`https://apis.netstart.cn/one/find/rank/${id}`)
        this.listData = data.data
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.hop-detail {
  position: relative;
  width: 100vw;
  height: 100vh;

  .hop-navbar {
    position: fixed;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 5vh;
    padding: 0 15px;
    background-color: #fff;
    line-height: 5vh;

    .right {
      height: 5vh;
    }

    span {
      font-size: 20px;
    }
  }

  .hop-whole {
    position: fixed;
    width: 100vw;
    height: 95vh;
    top: 5vh;
    padding: 10px 15px;
    overflow: auto;
    z-index: 10;
    background-color: #fdfdfe;
  }
}
</style>