<template>
  <div class="month-article" @click="$emit('select', date)">
    <img v-lazy="cover" class="lazyload-img" />
    <p class="date-text">{{ dateStr }}</p>
  </div>
</template>

<script>
export default {
  props: {
    cover: String,
    date: String,
  },
  computed: {
    dateStr() {
      return this.date.split("-").join(" / ");
    },
  },
};
</script>

<style lang="scss" scoped>
.month-article {
  flex: 0 0 calc(50% - 7.5px);
  margin-bottom: 10px;
  width: calc(50% - 7.5px);

  img {
    display: block;
    width: 100%;
  }

  .date-text {
    border: 1px solid #aaa;
    padding: 15px;
    background-color: #eee;
    font-size: 18px;
    color: #777;
  }
}
</style>