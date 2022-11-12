<template>
  <wd-pull-refresh>
    <div class="month-articles-view">
      <div class="month-wrap" v-for="m in months" :key="m.id">
        <div class="month-header">
          <line-component color="#999" margin="0 10px 0 0" offsetY="7px"/>
          <h3>{{ m.month }}月</h3>
          <line-component color="#999" margin="0 0 0 10px" offsetY="7px"/>
        </div>
        <div class="article-wrap">
          <MonthArticle
              v-for="a in m.articles"
              :key="a.id"
              :cover="a.cover"
              :date="a.date"
              @select="selectedDateArticle"
          />
        </div>
      </div>
      <wd-loading
          v-if="loading"
          class="loading"
          size="30px"
          color="#000"
      ></wd-loading>
      <wd-infinite-load
          ref="infinite"
          @loadmore="loadmore"
          :loading="refresh"
          v-if="months.length"
      />
    </div>
  </wd-pull-refresh>

</template>

<script>
import LineComponent from "@/components/LineComponent.vue";
import MonthArticle from "./MonthArticle.vue";
import {debounce} from "lodash-es";

export default {
  data() {
    return {
      months: [],
      loading: true,
      refresh: false,
      nextDate: 0
    };
  },
  computed: {
    currentDate() {
      console.log(this.$route.params.date)
      return this.$route.params.date;
    },
    currentMonth() {
      let m = new Date().getMonth();
      if (this.currentDate != 0) {
        m = new Date().getMonth(this.currentDate);
      }
      return m;
    },
  },
  created() {
    this.getMonthArtics = debounce(this.getMonthArtics);

    this.getMonthArtics(this.currentDate);
  },
  methods: {
    getMonthArtics(date) {
      this.refresh = true;

      let month = this.currentMonth;

      if (date != 0) {
        month = new Date(date).getMonth();
      }
      // 请求失败后再不支持上拉刷新
      this.$axios(`https://apis.netstart.cn/one/feeds/list/${date}`)
          .then(({data}) => {
            // console.log(data.data);
            this.months = [
              ...this.months,
              {
                id: date,
                month: month + 1,
                articles: data.data,
              },
            ];

            this.$nextTick(() => {
              this.loading = false;
              this.refresh = false;
            });
          })
          .catch(() => this.$refs.infinite.loadEnd());
    },
    // 加载上一个月
    loadmore() {

      console.log("下拉加载");

      if (!this.nextDate) {
        this.nextDate = this.currentDate
      }

      let d = this.nextDate != 0 ? new Date(this.nextDate) : new Date();

      d.setMonth(d.getMonth() - 1)

      let m = d.getMonth() + 1;

      m = m >= 10 ? m : "0" + m;

      this.nextDate = d.getFullYear() + "-" + m + "-" + "01";

      this.getMonthArtics(this.nextDate);
    },
    selectedDateArticle(date) {
      this.$router.replace({path: `/home/${date}`});
    },
  },
  components: {
    LineComponent,
    MonthArticle,
  },
};
</script>

<style lang="scss" scoped>
.month-articles-view {
  position: fixed;
  left: 0;
  top: 50px;
  bottom: 55px;
  padding: 0 15px;
  width: 100vw;
  line-height: 16px;
  overflow: auto;
  background-color: #fff;

  .month-header {
    display: flex;
    color: #999;
  }

  .article-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
  }

  .loading {
    margin: 20px auto;
  }
}
</style>