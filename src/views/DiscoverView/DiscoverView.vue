<template>
  <div class="discover-view">
    <wd-tabs v-model="tab" animated sticky swipeable>
      <wd-tab class="active" title="阅读">
        <article-view :month="month" :category=1 />
      </wd-tab>
      <wd-tab title="图文">
        <hp-view :month="month" />
      </wd-tab>
      <wd-tab title="专题">
        <special-view/>
      </wd-tab>
      <wd-tab title="热榜">
        <hop-view />
      </wd-tab>
      <wd-tab title="问答">
        <article-view :month="month" :category=3 />
      </wd-tab>
      <wd-tab title="音乐">
        <article-view :month="month" :category=4 />
      </wd-tab>
      <wd-tab title="影视">
        <article-view :month="month" :category=5 />
      </wd-tab>
      <wd-tab title="电台">
        <radio-view :month="month" :category=8 />
      </wd-tab>
      <wd-tab title="小记">
        <essays-view/>
      </wd-tab>
      <wd-tab title="作者">
        <author-view/>
      </wd-tab>
    </wd-tabs>
  </div>
</template>

<script>
import ArticleView from "@/views/DiscoverView/DiscoverArticleView";
import AuthorView from "@/views/DiscoverView/DiscoverAuthorView";
import EssaysView from "@/views/DiscoverView/DiscoverEssaysView";
import HpView from "@/views/DiscoverView/Hp/DiscoverHpView";
import HopView from "@/views/DiscoverView/DiscoverHopView";
import RadioView from "@/views/DiscoverView/DiscoverRadioView";
import SpecialView from "@/views/DiscoverView/DiscoverSpecialView";

export default {
  data() {
    return {
      tab: 2,
      month: new Date().getFullYear() + '-' + (new Date().getUTCMonth() + 1),
      nowDate: new Date()
    }
  },
  computed: {},
  components: {
    AuthorView,
    ArticleView,
    EssaysView,
    HpView,
    RadioView,
    SpecialView,
    HopView
  }

}
</script>

<style lang="scss" scoped>
.discover-view {
  position: fixed;
  padding-bottom: 55px;
  width: 100vw;
  height: 100vh;
  //overflow: auto;

  :deep(.wd-tabs__nav-item.is-active) {
    font-size: 20px;
    font-weight: bold;
  }

  :deep(.wd-tabs__line) {
    display: none;
  }
}
</style>