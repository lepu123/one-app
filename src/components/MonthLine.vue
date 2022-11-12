<template>
  <div class="hp-month-header">
    <Line-component color="#999" margin="0 20px 0 0" offsetY="7px"/>
    <h3>{{ month }}月</h3>
    <Line-component color="#999" margin="0 0 0 20px" offsetY="7px"/>
  </div>
</template>

<script>
import LineComponent from "@/components/LineComponent";
export default {
  name: "MonthLine",
  props: {
    month: Number
  },
  components: {
    LineComponent
  }
}
</script>

<style lang="scss" scoped>
.hp-month-header {
  display: flex;
  color: #999;

  h3 {
    font-size: 12px;
  }
}
</style>