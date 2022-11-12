<template>
  <div class="home-view" ref="homeView" @scroll.passive="scrollhandle">
    <HomViewNav :weather="weather" :month="currentMonth" :scorll="scorll" :dateObj="dateObj"/>
    <div class="content-list-wrapper">
      <HomeContentListItem
          v-for="c in contentList"
          :key="c.id"
          :category="c.category"
          :listItem="c"
          :index="Number(c.category)"
      />
    </div>
    <transition name="scroll-router">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import HomViewNav from "@/views/HomeView/HomViewNav";
// 按需引入减少不想用的代码引入到函数中
import {debounce} from "lodash-es";
// vue支持 @ 路径直接表示src文件内
import {monthEnList} from "@/utils/dateTools";
import HomeContentListItem from "./HomeContentListItem.vue";

export default {
  name: "HomeView",
  data() {
    return {
      weather: {},
      contentList: [],
      scorll: 0,
    };
  },
  computed: {
    date() {
      return this.$route.params.date;
    },
    currentMonth() {
      let d = new Date()
      if (this.date != 0) {
        d = new Date(this.date)
      }
      return d.getMonth()
    },
    dateObj() {
      let res = null;
      if (this.date) {
        let data = new Date();
        if (this.date != 0) {
          data = new Date(this.date)
        }
        let m = data.getMonth()
        res = {
          year: data.getFullYear(),
          month: monthEnList[m],
          day: data.getDate(),
        };
      }
      return res;
    }

  },
  created() {
    this.getData = debounce(this.getData);
  },
  mounted() {
    this.getData();
  },
  watch: {
    date(val) {
      if (!val) {
        return
      }
      this.$emit('set-date', val)
      this.getData()
    }
  },
  methods: {
    getData() {
      // console.log(this.date);
      this.$axios
          .get(`https://apis.netstart.cn/one/channel/one/${this.date}`)
          // .get("/data.json")
          .then(({data}) => {
            this.contentList = data.data.content_list;
            this.weather = data.data.weather;
          });
    },
    scrollhandle() {
      this.scorll = this.$refs.homeView.scrollTop;
    },
  },
  components: {
    HomViewNav,
    HomeContentListItem,
  },
};
</script>

<style lang="scss" scoped>
.home-view {
  position: fixed;
  padding-bottom: 55px;
  width: 100vw;
  height: 100vh;
  overflow: auto;

  .content-list-wrapper {
    background-color: #eee;
  }

  .scroll-router-enter,
  .scroll-router-leave-to {
    transform: translateY(-100%);
  }

  .scroll-router-enter-active,
  .scroll-router-leave-active {
    transition: all 0.2s linear;
  }

  .scroll-router-enter-to,
  .scroll-router-leave {
    transform: translateY(0);
  }
}
</style>
