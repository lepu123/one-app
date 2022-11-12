<template>
  <div class="serial">
    <div class="serial-content" v-for="s in serialize" :key="s.id" @click="$router.push({path: '/serialize-detail', query: {id: s.serial_id}})">
      <div class="serial-img">
        <img :src="s.cover" :alt="s.title">
        <span class="title">《{{ s.title }}》</span>
        <span class="finish">{{ finished(s.finished) }}</span>
      </div>

      <div class="serial-desc">
        <p class="forward">{{ s.forward }}</p>
        <p class="subtitle">{{ s.subtitle }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "SerializeContent",
  data() {
    return {
      serialize: []
    }
  },
  props: {
    year: Number,
  },
  methods: {
    getSerialize(year) {
      this.$axios.get(`https://apis.netstart.cn/one/find/serial/byyear/${year}`)
          .then(({data}) => {
            this.serialize = data.data
            console.log(this.serialize)
          })
    },
    finished(f) {
      if (f) {
        return '# 已完结'
      } else {
        return '# 连载中'
      }
    }
  },
  created() {
    this.getSerialize(this.year)
  }
}
</script>

<style lang="scss" scoped>
.serial {
  width: 100%;
  height: 100%;

  .serial-content {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px #8a8a8a;
    margin-bottom: 20px;


    .serial-img {
      position: relative;

      img {
        width: 100%;
      }

      .title {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: white;
        background-image: linear-gradient(#9990, #00000080);
      }

      .finish {
        position: absolute;
        color: #fdfdfc;
        font-size: 14px;
        top: 15px;
        left: 15px;
      }
    }


    .serial-desc {
      padding: 10px 15px;

      .forward {
        margin-bottom: 10px;
        color: #8a8a8a;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .subtitle {
        color: #c3c3c3;
        font-size: 14px;
      }
    }


  }

}
</style>