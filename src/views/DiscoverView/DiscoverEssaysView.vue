<template>
  <div class="discover-essays">
    <div class="essays-row">
      <div class="column">
        <essays-card v-for="s in singular" :obj="s" :key="s.id"/>
      </div>
      <div class="column">
        <essays-card v-for="q in quantity" :obj="q" :key="q.id"/>
      </div>
    </div>
    <wd-infinite-load
        ref="infinite"
        @loadmore="loadMore"
        :loading="refresh"
        v-if="essays.length"
    />
  </div>
</template>

<script>
import EssaysCard from "@/components/EssaysCard";

export default {
  name: "DiscoverEssaysView",
  data() {
    return {
      essays: [],
      singular: [],
      quantity: [],
      refresh: false
    }
  },
  methods: {
    getData(id = 0) {
      this.$axios.get(`https://apis.netstart.cn/one/diary/square/more/${id}`)
          .then(({data}) => {
            this.essays = [...this.essays, ...data.data.list]
            for (let i = 0; i < data.data.list.length / 2; i++) {
              this.singular.push(data.data.list[2 * i])
              this.quantity.push(data.data.list[(2 * i) + 1])
            }

            this.$nextTick(() => {
              this.refresh = false
            })
          })
    },
    loadMore() {
        let id = this.essays[(this.essays.length-1)].id
        this.getData(id)
    }
  },
  created() {
    this.getData()
  },
  components: {
    EssaysCard
  }
}
</script>

<style lang="scss" scoped>
.discover-essays {
  width: 100vw;
  height: 88vh;
  overflow: auto;
  padding: 10px 15px;

  .essays-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;

    .column {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  }


}
</style>