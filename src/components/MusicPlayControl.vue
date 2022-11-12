<template>
  <div class="play-control">
    <h3 class="audio-title">{{ title }}</h3>

    <div>
      <wd-slider v-model="progress"
                 hide-label
                 hide-min-max
                 active-color="black"
      />
    </div>

    <div class="time-warp">
      <span>{{ currentTimeStr }}</span>
      <span>{{ durationStr }}</span>
    </div>
    <p class="anchor-name">{{ anchor }}</p>
    <div class="control-bar">
      <div class="control-prev"></div>
      <div class="control-play"></div>
      <div class="control-next"></div>
    </div>
    <div class="bottom-bar">
      <div class="loop"></div>
      <div class="logo"></div>
      <div class="func-bar">
        <div class="collect"></div>
        <div class="go-article"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicPlayControl",
  props: {
    title: String,
    currentTime: Number,
    duration: Number,
    audioState: Boolean,
    anchor: String,
  },
  computed: {
    currentTimeStr() {
      if (!this.currentTime) {
        return '--:--'
      }

      let seconds = Math.floor(this.currentTime % 60);
      let minutes = Math.floor(this.currentTime / 60);

      minutes = minutes > 10 ? minutes : "0" + minutes;
      seconds = seconds > 10 ? seconds : "0" + seconds;

      return minutes + ":" + seconds
    },
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
    progress: {
      get() {
        // 判断当前播放时间和总时长是否传入
        if (this.duration && this.currentTime) {
          return Math.ceil(this.currentTime * 100 / this.duration);
        }

        return 1
      },
      set(val) {
        console.log("播放器反向传值", val)
        let num = Math.ceil(val * this.duration / 100);
        this.$emit('set-audio-currentTime', num);
      }
    }
  }
}
</script>

<style lang="scss">
.play-control {
  padding: 20px;

  .audio-title {
    margin-bottom: 10px;
    text-align: center;
    color: #777;
  }

  .time-warp {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #777;
  }

  .anchor-name {
    transform: translateX(-50%);
    text-align: center;
    font-size: 12px;
    color: #777;
  }
}

</style>