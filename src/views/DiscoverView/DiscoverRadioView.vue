<template>
  <div class="discover-radio">
    <wd-datetime-picker type="year-month">
    </wd-datetime-picker>
    <div class="radio-month" v-for="m in months" :key="m.id">
      <month-line :month="m.month"/>
      <div class="radio-warp" v-for="d in m.arr" :key="d.id" @click="goToDetailView(d.id,d.category)">
        <div class="radio-cover">
          <span class="volume"><i class="icon-radio"></i>{{ d.volume }}</span>
          <img :src="d.cover" alt="d.title">
          <p class="title-label">
            <span class="title">{{ d.title }}</span>
            <i class="play"></i>
          </p>
        </div>
        <div class="radio-desc">
          <div class="author">
            <img :src="d.author.web_url" :alt="d.author.user_name">
            <span>{{ d.author.user_name }}</span>
          </div>
          <div class="love">
            <i class="icon-feeds_laud_default"></i>
            {{ d.like_count }}
          </div>
          <i class="icon-feeds_share"></i>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getDiscover} from "@/utils/apis/articlecontent";
import MonthLine from "@/components/MonthLine";

export default {
  name: "DiscoverRadioView",
  data() {
    return {
      months: [],
    }
  },
  props: {
    month: String,
    category: Number
  },
  created() {
    this.getData(this.month)
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
      })
    },
    goToDetailView(id, category) {
      this.$router.push({path: '/detail', query: {id, category}})
    }
  },
  components: {
    MonthLine
  }
}
</script>

<style lang="scss" scoped>
.discover-radio {
  width: 100vw;
  height: 88vh;
  padding: 0 15px;
  overflow: auto;

  .radio-warp {
    width: 100%;
    margin: 20px 0;

    .radio-cover {
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      img {
        width: 100%;
      }


      .title-label {
        position: absolute;
        display: flex;
        justify-content: space-between;
        left: 10px;
        right: 10px;
        bottom: 10px;
        font-size: 18px;
        line-height: 32px;
        color: #fff;

        .play {
          flex: 0 0 32px;
          display: block;
          width: 32px;
          height: 32px;
          background-image: url(@/assets/img/play/feeds_radio_play.png);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .title {
          font-size: 16px;
          max-width: 310px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .volume {
        position: absolute;
        display: flex;
        align-items: center;
        top: 15px;
        left: 15px;
        font-size: 14px;
        line-height: 12px;
        color: #ddd;

        .icon-radio {
          display: inline-block;
          width: 64px;
          height: 16px;
          vertical-align: top;
          margin-right: 5px;
          background-image: url(@/assets/img/article/one_radio_icon.png);
          background-size: 64px;
          background-position: center center;
          background-repeat: no-repeat;
        }
      }
    }

    .radio-desc {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      .author {
        line-height: 24px;
        font-size: 14px;
        color: #bebebe;

        img {
          border-radius: 999px;
          width: 24px;
          height: 24px;
          margin-right: 5px;
          vertical-align: top;
        }
      }

      i {
        display: inline-block;
        vertical-align: top;
        margin-right: 3px;
        width: 27px;
        height: 24px;
        //background-size: 37px 35px;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .love {

        line-height: 24px;
        font-size: 12px;
        color: #ababab;


        .icon-feeds_laud_default {
          background-image: url(@/assets/img/article/feeds_laud_default.png);
        }


      }

      .icon-feeds_share {
        background-image: url(@/assets/img/article/feeds_share.png);
      }
    }
  }
}
</style>