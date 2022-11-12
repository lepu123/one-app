<template>
  <div class="hp-month-article" @click="$emit('selectHp',dateStr)">
    <img v-lazy="cover" class="lazyload-img" :alt="id">
    <p class="arc-text">{{ dateStr }}</p>
  </div>
</template>

<script>
export default {
  props: {
    cover: String,
    date: String,
    id: Number
  },
  computed: {
    dateStr() {
      return this.date.split(" ")[0];
    }
  },
  name: "HpArticle"
}
</script>

<style lang="scss" scoped>

.hp-month-article {
  flex: 0 0 calc(50% - 7.5px);
  margin-bottom: 20px;
  width: calc(50% - 7.5px);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1px 3px #000000;

  img {
    display: block;
    width: 100%;
  }

  .arc-text {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #999;
    background-color: #fdfdfe;
  }
}

</style>