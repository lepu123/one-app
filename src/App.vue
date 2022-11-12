<template>
  <div id="app">
    <keep-alive>
      <router-view
          @set-date="setDate"
          @play-music-and-set-src="setAudioSrc"
          :playState="audioState"
          @play-or-pause="toggleMusicPlayOrPause"
      ></router-view>
    </keep-alive>

    <div class="tab-bar">
      <router-link
          class="tab-bar-item icon-home"
          tag="div"
          :to="'/home/' + date"
      ></router-link>
      <router-link
          class="tab-bar-item icon-discover"
          tag="div"
          to="/discover"
      ></router-link>
      <router-link
          class="tab-bar-item icon-serialize"
          tag="div"
          to="/serialize"
      ></router-link>
      <router-link
          class="tab-bar-item icon-user"
          tag="div"
          to="/user"
      ></router-link>
    </div>
    <!-- canplay 事件表示音乐可以播放，可以拿到音乐的原始数据 -->
    <audio v-if="src"
           :src="src"
           ref="audio"
           @canplay="getAudioMetaSource"
           @timeupdate="audioTimeUpdate"
           @play="audioState = true"
           @pause="audioState = false"/>
    <transition name="slide">
      <div class="disc-icon"
           @click="showMusicPlayControl"
           v-show="flag"
           :style="{backgroundImage: `url(${discImageArr[discImageIndex]})`}"
      ></div>
    </transition>

    <!-- 弹出层自定义音频控制器 -->
    <wd-popup v-model="audioShow" position="top">
      <play-control
          :title="title"
          :current-time="currentTime"
          :duration="duration"
          :audio-state="audioState"
          :anchor="anchor"
      />
    </wd-popup>
  </div>
</template>

<script>
import {discImageArr} from "@/utils/discImageArr";
import playControl from "@/components/MusicPlayControl.vue";

export default {
  data() {
    return {
      date: 0,
      // 音频源
      src: "",
      // 音频总时长
      duration: 0,
      // flag 标记了唱片元素是否显示
      flag: false,
      // 存放图片地址的数组
      discImageArr,
      // 存放图片地址的数组下标
      discImageIndex: 0,
      // 模仿gif的图片切换计时器
      discTimer: null,
      // 当前自定义音频播放器组件是否显示
      audioShow: false,
      // 当前播放的时间
      currentTime: 0,
      // 当前audio元素的状态
      audioState: false,
      // 朗读者
      anchor: "",
      // 朗读标题
      title: "",
      // 文章源地址
      articlePath: "",
    };
  },
  methods: {
    setDate(dateStr) {
      this.date = dateStr
    },
    setAudioSrc({src, title, anchor, articlePath}) {

      // 避免重复播放
      if (this.src === src) {
        // 只打开音乐控制器
        this.showMusicPlayControl();
      } else {
        this.src = src;
        this.anchor = anchor;
        console.log(this.anchor);
        this.title = title;
        this.articlePath = articlePath;

        this.$nextTick(() => {
          // 页面更新渲染完毕，重新加载音频源
          this.$refs.audio.load();
          this.playMusic();
        });
      }

    },
    // 媒体播放时间更新方法
    audioTimeUpdate() {
      this.currentTime = this.$refs.audio.currentTime;
    },
    // 播放音频
    playMusic() {

      this.$refs.audio.play();
      this.flag = true;

      // 等待数据更新完成且唱片渲染，才开启模拟gif图
      this.$nextTick(() => {
        this.discAnimation()
      })
    },
    toggleMusicPlayOrPause() {
      if (this.audioState) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    },
    // 音乐可以播放了获取音频源数据
    getAudioMetaSource() {
      this.duration = this.$refs.audio.duration
      console.log(this.duration)
    },
    // 有声读物播放时，开启唱片元素的切图动画
    discAnimation() {
      // 计时器在 vue 中是一个有副作用的代码，要在生命周期中消除他

      this.discTimer = setInterval(() => {

        this.discImageIndex = (this.discImageIndex + 1) % this.discImageArr.length

      }, 80)
    },
    showMusicPlayControl() {
      this.audioShow = true;
    },
  },
  components: {
    playControl
  },
  // 组件将撤销之前清空计时器
  beforeDestroy() {
    if (this.discTimer) {
      // 清除副作用计时器
      clearInterval(this.discTimer)
    }
  }
};
</script>

<style lang="scss">
.disc-icon {
  position: fixed;
  top: 60px;
  right: 0;
  width: 40px;
  height: 40px;
  z-index: 900;
  background-image: url(@/assets/img/float_player/float_player_play_01.png);
  background-size: 100% 100%;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s linear;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}

.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 55px;
  background-color: #fff;

  .tab-bar-item {
    flex: 1;
    background-size: 40px 40px;
    background-repeat: no-repeat;
    background-position: center center;

    &.icon-home {
      background-image: url(./assets/img/tabbar/icon_home.png);
    }

    &.icon-discover {
      background-image: url(./assets/img/tabbar/icon_discover.png);
    }

    &.icon-serialize {
      background-image: url(./assets/img/tabbar/icon_serial.png);
    }

    &.icon-user {
      background-image: url(./assets/img/tabbar/icon_me.png);
    }

    &.router-link-active {
      &.icon-home {
        background-image: url(./assets/img/tabbar/icon_home_selected.png);
      }

      &.icon-discover {
        background-image: url(./assets/img/tabbar/icon_discover_selected.png);
      }

      &.icon-serialize {
        background-image: url(./assets/img/tabbar/icon_serial_selected.png);
      }

      &.icon-user {
        background-image: url(./assets/img/tabbar/icon_me_selected.png);
      }
    }
  }
}
</style>
