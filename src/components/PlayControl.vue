<template>
  <div>
    <h3 class="play-title">音频标题</h3>
    <div>
      <!--
      ref 不仅可以绑到原生dom上，也可以绑到自定义组件中
      绑定到自定义组件中的ref拿到的是这个组件的实例对象
       -->
      <wd-slider
          ref="slider"
          v-model="progress"
      ></wd-slider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 音频标题
    title: String,
    // 当前播放的时间
    currentTime: Number,
    // 音频总时长
    duration: Number
  },
  computed: {
    // 解析音频当前时间
    currentTimeStr() {
      
      if (!this.currentTime) {
        return '--:--'
      }

      let seconds = Math.floor(this.currentTime % 60)
      let minutes = Math.floor(this.currentTime / 60)

      minutes = minutes > 10 ? minutes : "0" + minutes;
      seconds = seconds > 10 ? seconds : "0" + seconds;

      return minutes + ":" + seconds
    },
    // 解析音频总时间
    durationStr() {
      if (!this.duration) {
        return '--:--'
      }

      let seconds = Math.floor(this.duration % 60)
      let minutes = Math.floor(this.duration / 60)

      minutes = minutes > 10 ? minutes : "0" + minutes;
      seconds = seconds > 10 ? seconds : "0" + seconds;

      return minutes + ":" + seconds
    },
    // 计算
    progress: {
      get() {
        if (this.duration && this.currentTime) {

          let num = Math.ceil(this.currentTime * 100 / this.duration)

          return num
        }
        return 1
      },
      set(value) {
        let num = Math.ceil(value * this.duration / 100)
        this.$emit('set-audio-currentTime', num)
      }
    }
  }
}
</script>

<style scoped>

</style>