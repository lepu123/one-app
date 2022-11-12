<template>
  <div class="about">
    <wd-tabs v-model="tab" animated sticky swipeable>
      <wd-tab v-for="y in years" :key="y" :title="String(y)">
        <div class="about-content">
          <serialize-content :year="y"/>
        </div>
      </wd-tab>
    </wd-tabs>
  </div>
</template>

<script>
import SerializeContent from "@/components/SerializeContent";

export default {
  data() {
    return {
      years: [2022, 2021, 2020, 2019, 2018, 2017, 2016],
      tab: 0
    }
  },
  components: {
    SerializeContent
  }
}
</script>

<style lang="scss" scoped>

.about {
  position: fixed;
  padding-bottom: 55px;
  width: 100vw;
  height: 100vh;

  :deep(.wd-tabs__nav-item) {
    color: #a1a1a1;
    height: 35px;
    line-height: 35px;
    background-color: #f4f4f4;
    border-radius: 999px;
    margin-left: 20px;
  }

  :deep(.wd-tabs__nav-item.is-active) {
    font-weight: bold;
    background-color: #000;
    color: #fff;
  }

  :deep(.wd-tabs__line) {
    display: none;
  }

  .about-content {
    width: 100vw;
    height: 88vh;
    overflow: auto;
    padding: 15px 15px 0;
  }

}

</style>