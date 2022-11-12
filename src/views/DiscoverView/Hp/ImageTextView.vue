<template>
  <div class="image-text-view">
    <wd-navbar :title="date" light>
      <div slot="left" @click="back">
        <wd-icon class="middle" name="arrow-left"/>
      </div>
    </wd-navbar>
    <photograph-card :list-item="listData"/>
  </div>
</template>

<script>
import PhotographCard from "@/components/PhotographCard";
import {getHpDetail} from '@/utils/apis/articlecontent'


export default {
  data() {
    return {
      listData: {},
      date: '',
    }
  },
  created() {
    this.test(1)
  },
  computed: {

    getDate() {
      return this.$route.query.date
    }
  },
  watch: {
    getDate(val) {
      this.test(val)
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    test(val) {
      if (val !== undefined) {
        this.date = this.getDate
        getHpDetail({
          axios: this.$axios,
          date: this.date
        }).then(({data}) => {
          this.listData = data.data
        })
      }
    }
  },
  components: {
    PhotographCard
  },
  name: "ImageTextView"
}
</script>

<style lang="scss" scoped>
.image-text-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 10;
  background-color: #fff;
}
</style>