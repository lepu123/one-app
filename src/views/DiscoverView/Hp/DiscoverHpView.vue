<template>
  <wd-pull-refresh>
    <div class="discover-hp">
      <wd-datetime-picker type="year-month"
                          :formatter="formatter"
                          :max-date="new Date()"
                          v-model="value">
      </wd-datetime-picker>
      <div class="hp-month-warp" v-for="m in months" :ref="m.id" :key="m.id" v-show="m.arr">
        <month-line :month="m.month" />
        <div class="hp-warp">
          <hp-article
              v-for="d in m.arr"
              :key="d.id"
              :id="d.id"
              :cover="d.cover"
              :date="d.maketime"
              @selectHp="selectDateArticle"
          />
        </div>
      </div>
      <wd-loading
          v-if="loading"
          class="loading"
          size="30px"
          color="blue"
      />
      <wd-infinite-load
          ref="infinite"
          @loadmore="loadMore"
          :loading="refresh"
          v-if="months.length"
      />
    </div>
  </wd-pull-refresh>
</template>

<script>
import HpArticle from "@/views/DiscoverView/Hp/HpArticle";
import MonthLine from "@/components/MonthLine";
import {debounce} from "lodash-es";

export default {
  data() {
    return {
      months: [],
      category: 0,
      loading: true,
      refresh: false,
      nextDate: 0,
      show: false,
      value: new Date(),
    }
  },
  props: {
    month: String,
  },
  created() {
    this.getHp = debounce(this.getHp)
    this.getHp(this.month)
  },
  computed: {},
  watch: {
    value(val) {
      this.months = []
      this.nextDate = 0
      let month = (val.getMonth() + 1) >= 10 ? (val.getMonth() + 1) : '0' + (val.getMonth() + 1)
      let date = val.getFullYear() + '-' + month
      this.getHp(date)
    }
  },
  methods: {
    getHp(date) {
      let month;

      if (date !== this.month) {
        month = new Date(date).getMonth()
      } else {
        month = new Date(this.month).getMonth()
      }

      this.$axios
          .get(`https://apis.netstart.cn/one/find/bymonth/0/${date}`)
          // .get('/data.json')
          .then(({data}) => {
            this.months = [
              ...this.months,
              {
                month: month + 1,
                id: date,
                arr: data.data
              }
            ];
            this.$nextTick(() => {
              this.loading = false;
              this.refresh = false;
            });
          })
          .catch(() => this.$refs.infinite.loadEnd());
    },
    loadMore() {
      setTimeout(() => {
        if (!this.nextDate) {
          this.nextDate = this.value
        }

        let d = this.nextDate !== 0 ? new Date(this.nextDate) : new Date()

        d.setMonth(d.getMonth() - 1)

        let m = d.getMonth() + 1;

        m = m > 10 ? m : "0" + m;

        this.nextDate = d.getFullYear() + "-" + m;

        this.getHp(this.nextDate);
      },1000)
    },
    selectDateArticle(date) {

      this.$router.push({
        path: '/image-text',
        query: {date}
      })
    },

    // 时间组件的显示格式
    formatter(type, value) {
      switch (type) {
        case 'year':
          return value + '年'
        case 'month':
          return value + '月'
        default:
          return value
      }
    },
  },
  components: {
    HpArticle,
    MonthLine
  },
  name: "DiscoverHpView"

}
</script>

<style lang="scss" scoped>
.discover-hp {
  width: 100vw;
  height: 88vh;
  padding: 0 15px;
  overflow: auto;
  background-color: #fafbfb;

  .hp-month-warp {
    margin-top: 10px;



    .hp-warp {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 20px;
    }
  }


}
</style>