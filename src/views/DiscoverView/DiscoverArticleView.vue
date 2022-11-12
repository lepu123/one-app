<template>
  <wd-pull-refresh>
    <div class="discover-article">
      <wd-datetime-picker type="year-month"
                          :formatter="formatter"
                          :max-date="new Date()"
                          v-model="nowDate">
      </wd-datetime-picker>
      <div class="art-month-warp" v-show="m.arr.length" v-for="m in months" :key="m.id">
        <month-line :month="m.month"/>
        <div class="art-month-content">
          <div class="art-item" v-for="t in m.arr" :key="t.id" @click="goToDetailView(t.id,t.category)">
            <div class="art-item-img"><img :src="t.cover" alt="t.title"></div>
            <div class="art-item-context">
              <h3>{{ t.title }}</h3>
              <p>{{ t.subtitle }}</p>
            </div>
          </div>
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
import MonthLine from "@/components/MonthLine";
import {getDiscover} from "@/utils/apis/articlecontent";

export default {
  data() {
    return {
      months: [],
      value: '',
      loading: true,
      refresh: false,
      nextDate: 0,
      nowDate: new Date()
    }
  },
  props: {
    category: Number,
    month: String,
  },
  created() {
    this.getData(this.month)
  },
  watch: {
    nowDate(val) {
      this.months = []
      this.nextDate = 0
      let month = (val.getMonth() + 1) >= 10 ? (val.getMonth() + 1) : '0' + (val.getMonth() + 1)
      let date = val.getFullYear() + '-' + month
      this.getData(date)
    }
  },
  methods: {
    getData(date) {
      let month;

      if (date !== this.month) {
        month = new Date(date).getMonth()
      } else {
        month = new Date(this.month).getMonth()
      }

      getDiscover({
        axios: this.$axios,
        category: this.category,
        month: date
      }).then(({data}) => {
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
      }).catch(() => this.$refs.infinite.loadEnd())
    },
    loadMore() {
      setTimeout(() => {
        // if (!this.nextDate) {
        //   this.nextDate = new Date()
        // }

        let d = this.nextDate !== 0 ? new Date(this.nextDate) : new Date()

        d.setMonth(d.getMonth() - 1)

        let m = d.getMonth() + 1;

        m = m > 10 ? m : "0" + m;

        this.nextDate = d.getFullYear() + "-" + m;

        this.getData(this.nextDate);
      }, 1000)
    },
    goToDetailView(id, category) {
      this.$router.push({
        path: "/detail",
        query: {
          id,
          category
        }
      })
    },
    formatter(type, value) {
      switch (type) {
        case 'year':
          return value + '年'
        case 'month':
          return value + '月'
        default:
          return value
      }
    }
  },
  components: {
    MonthLine
  },
  name: "DiscoverEssayView"
}
</script>

<style lang="scss" scoped>
.discover-article {
  width: 100vw;
  height: 88vh;
  padding: 0 15px;
  overflow: auto;
  background-color: #fafbfb;

  .art-month-warp {
    margin-top: 10px;

    .art-month-content {
      margin-top: 20px;

      .art-item {
        display: flex;
        height: 60px;
        align-items: center;
        margin-bottom: 20px;

        .art-item-img {
          flex: 0 0 60px;
          width: 60px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .art-item-context {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 5px;
          margin-left: 20px;
          height: 100%;

          h3 {
            white-space: nowrap;
            line-height: 20px;
            max-width: 290px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          p {
            margin-top: 15px;
            font-size: 12px;
            color: #c1c1c1;
          }
        }
      }
    }
  }


}
</style>