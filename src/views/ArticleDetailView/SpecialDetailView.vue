<template>
  <div v-if="obj" class="special-detail"  @scroll.passive="getScroll" :style="{backgroundColor: obj.bg_color, color: obj.font_color}">
    <transition name="navbar">
      <wd-navbar :style="{ backgroundColor: headColor }" :title="navTitle" v-if="navShow" light>
        <div slot="left" @click="$router.go(-1)">
          <wd-icon class="middle" name="arrow-left"/>
        </div>
      </wd-navbar>
    </transition>
    <div class="special-content">
      <img :src="obj.json_content.special.cover" :alt="obj.title">
      <div class="special-warp">
        <h1>{{ obj.title }}</h1>
        <special-card v-for="a in arr" :key="a.id" :option="a"/>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticleDetail,titleTypes} from "@/utils/apis/articlecontent";
import SpecialCard from "@/components/SpecialCard";

export default {
  name: "SpecialDetailView",
  components: {SpecialCard},

  data() {
    return {
      obj: {},
      arr: [],
      navShow: true,
      scroll: 0
    }
  },
  methods: {
    getData(category, id) {

      getArticleDetail({
        axios: this.$axios,
        id,
        category
      }).then(({data}) => {
        this.obj = data.data
        this.arr = this.obj.json_content.oneDataArticles
        console.log(this.obj)
      })
    },
    getScroll(e) {
      this.scroll = e.target.scrollTop
    }
  },
  watch: {
    scroll(newValue,oldValue) {
      if(newValue > 50){
        this.navShow = newValue <= oldValue;
      }
    }
  },
  computed: {
    getId() {
      return this.$route.query
    },
    navTitle() {
      return titleTypes[this.getId.category]
    },
    headOpacity() {
      let o = Math.floor((this.scroll / 600) * 100) / 100;
      o = o >= 0 ? o : 0;

      return o;
    },
    headColor() {
      let o = this.headOpacity >= 0.8 ? 1 : this.headOpacity;
      return `rgba(255,255,255,${o})`;
    },
  },
  activated() {
    let {category, id} = this.getId
    this.getData(category, id)
  },
  created() {
    let {category, id} = this.getId
    this.getData(category, id)
  }
}
</script>

<style lang="scss" scoped>
.special-detail {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  overflow: auto;

  .wd-navbar.is-light {
    position: fixed;
    top: 0;
    z-index: 900;
  }

  .special-content {

    img {
      width: 100%;
    }

    .special-warp {
      width: 100%;
      height: 100%;
      padding: 20px 15px 0;

      h1 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 30px;
      }
    }
  }
}
</style>