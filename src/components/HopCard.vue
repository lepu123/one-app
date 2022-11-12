<template>
  <div class="hop-card" @click="goToDetailView(id,category)">
    <div class="card-img">
      <img :src="cover" :alt="title">
      <span class="card-no" :class="getNo(no)">No.{{ no }}</span>
    </div>
    <div class="card-desc">
      <p class="card-title">{{ title }}</p>
      <p class="card-subtitle">{{ subtitle }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "HopCard",
  props: {
    cover: String,
    subtitle: String,
    title: String,
    no: Number,
    id: String,
    category: Number
  },
  methods: {
    getNo(no) {
      switch (no) {
        case 1:
          return "one";
        case 2:
          return "two";
        default:
          return;
      }
    },
    goToDetailView(id,category) {
      this.$router.push({path: '/detail', query: {id,category}})
    }
  }
}
</script>

<style lang="scss" scoped>
.hop-card {
  display: flex;
  width: 100%;
  height: 9%;
  margin-bottom: 15px;

  .card-img {
    position: relative;
    width: 70.35px;
    height: 70.35px;
    border-radius: 10px;
    overflow: hidden;


    img {
      display: block;
      width: 100%;
    }

    .card-no {
      position: absolute;
      width: 50%;
      top: 0;
      left: 0;
      padding: 2px 5px;
      border-radius: 0 0 10px 0;
      font-size: 12px;
      font-weight: lighter;
      color: #fff;
      background-color: #fda001;

      &.one {
        background-color: #d70505;
      }

      &.two {
        background-color: #fd5555;
      }
    }

  }

  .card-desc {
    flex: 1;
    margin-left: 15px;
    padding-top: 2px;

    .card-title {
      font-weight: bold;
      margin-bottom: 20px;
    }

    .card-subtitle {
      font-size: 14px;
      color: #cbcbcb;
    }
  }
}
</style>