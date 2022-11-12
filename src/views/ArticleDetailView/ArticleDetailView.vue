<template>
  <div class="detail-view" @scroll.passive="getScroll">
    <transition name="navbar">
      <wd-navbar :title="navTitle" v-if="navShow" light>
        <div slot="left" @click="back">
          <wd-icon class="middle" name="arrow-left"/>
        </div>
        <span slot="right" class="favorite"></span>
      </wd-navbar>
    </transition>

    <div v-if="category == 8" class="audio-banner">
      <div class="play-warp">
        <div class="biu"></div>
        <div class="play-icon" :class="{pause: playState}" @click="togglePlay"></div>
        <div class="biu"></div>
      </div>
    </div>

    <div class="detail-wrap">
      <h2 class="article-title">{{ title }}</h2>
      <p class="author">{{ author }}</p>
      <div class="audio-box" v-if="audio" @click="play">有声读物| {{ anchor }} 总时长 {{ durationStr }}</div>
      <!-- 内容部分 -->
      <div class="html-content" v-html="content"></div>
      <!-- 责任编辑 -->
      <p class="editor">{{ editor }}</p>
      <!-- 文章引用 -->
      <p class="copyright">{{ copyright }}</p>
      <!-- 作者部分 -->
      <div class="author-list" v-if="authorList.length">
        <span class="detail-label">作者</span>
        <div class="author-card" v-for="a in authorList" :key="a.user_id">
          <img :src="a.web_url" :alt="a.user_id">
          <div class="user-name">{{ a.user_name }} <p class="user-summary">{{ a.summary }}</p> </div>

          <span class="follow-btn">关注</span>
        </div>

      </div>
      <!-- 评论列表 -->
      <div class="rating-list" v-if="authorList.length">
        <span class="detail-label">评论列表</span>
      </div>
      <audio v-if="audio" :src="audio" @canplay="getAudioDuration"></audio>
    </div>
  </div>
</template>

<script>

import {getArticleDetail, titleTypes} from "@/utils/apis/articlecontent";

export default {
  props: {
    playState: Boolean,
  },
  data() {
    return {
      //文档标题
      title: "",
      // 作者
      author: "",
      // 音频地址
      audio: "",
      // 朗读者
      anchor: "",
      // 内容主题
      content: "",
      // 责任编辑
      editor: "",
      // 文章引用
      copyright: "",
      // 作者列表
      authorList: [],
      // 开始计算的高度
      scroll: 0,
      navShow: true,
      // 当前文章的类型
      category: 0,
      // 音频总时长
      duration: 0,
      // 评论列表
      ratingList: [],
    }
  },
  computed: {
    navTitle() {
      return titleTypes[this.$route.query.category]
    },
    durationStr() {
      let minutes = Math.floor(this.duration / 60);
      let seconds = Math.floor(this.duration % 60);
      minutes = minutes >= 10 ? minutes : "0" + minutes;
      seconds = seconds >= 10 ? seconds : "0" + seconds;

      return minutes + ":" + seconds;
    },

  },
  watch: {
    scroll(newValue,oldValue) {
      if(newValue > 50){
        this.navShow = newValue <= oldValue;
      }
    }
  },
  methods: {
    // 获取组件播放总时长
    getAudioDuration(e) {
      this.duration = e.target.duration;
    },
    back() {
      this.$router.go(-1);
    },
    play() {
      console.log("开播!");
      this.$emit('play-music-and-set-src', {
        src: this.audio,
        title: this.title,
        anchor: this.anchor,
        // 这里传的是完整路由路径还包含路由query的信息
        articlePath: this.$route.fullPath,
      });
    },
    togglePlay() {
      this.$emit('play-or-pause');
    },
    getScroll(e) {
      this.scroll = e.target.scrollTop;
    },
    // 用来获取所需数据
    getArticleDetailAndAudioData() {
      let {id, category} = this.$route.query;

      getArticleDetail({
        axios: this.$axios,
        id,
        category
      }).then(({data}) => {
        let res = data.data;

        // 文章类型
        this.category = category

        // 标题
        this.title = res.json_content.title;

        // 作者
        this.author = res.json_content.simple_author[0];

        // 音频地址
        this.audio = res.audio;

        // 朗读者
        this.anchor = res.anchor;

        // 内容主题
        this.content = res.json_content.content;

        // 责任编辑
        this.editor = res.json_content.editor;

        // 文章引用
        this.copyright = res.json_content.copyright;

        // 作者列表
        this.authorList = res.author_list;

        // 设置文章形式电台自动播放
        this.$nextTick(() => {
          if (this.category == 8 && this.audio) {
            this.play();
          }
        });
      });
    },
    // saveArticleData(id, category) {
    //
    // }

  },
  // activated激活时触发
  activated() {
    this.getArticleDetailAndAudioData();
  },
  created() {
    this.getArticleDetailAndAudioData();
  },
  name: "ArticleDetailView",
}
</script>

<style lang="scss" scoped>

.detail-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 10;
  background-color: #fff;



  .wd-navbar.is-light {
    position: fixed;
    z-index: 10;
    top: 0;
  }

  .audio-banner {
    position: relative;
    z-index: 1;
    width: 100vw;
    margin-top: 45px;
    aspect-ratio: 1125/600;
    background-image: url(@/assets/img/banner.jpg);
    background-size: cover;

    .play-warp {
      position: absolute;
      display: flex;
      justify-content: space-between;
      left: 30px;
      bottom: 30px;
      right: 30px;
      height: 32px;

      .biu {
        flex: 1;
      }

      .play-icon {
        margin: 0 30px;
        width:32px;
        height: 32px;
        background-image: url(@/assets/img/play/feeds_radio_play.png);
        background-size: cover;

        &.pause {
          background-image: url(@/assets/img/play/feeds_radio_pause.png);
        }
      }
    }
  }

  .favorite {
    display: inline-block;
    width: 20px;
    height: 20px;
    transform: translateY(4px);
    background-image: url(@/assets/img/article/favourite_gray.png);
    background-size: cover;
  }

  .detail-wrap {
    padding: 0 15px;

    .article-title {
      margin-top: 5px;
      font-size: 28px;
      font-weight: bold;
      padding-top: 45px;
    }

    .author {
      margin-top: 30px;
      font-size: 12px;
      color: #777;
    }

    .audio-box {
      margin-top: 30px;
      border: 1px solid #000;
      padding: 10px;
      line-height: 20px;
    }

    .html-content {
      margin-top: 26px;
      width: 100%;

    }

    .editor, .copyright {
      font-size: 13px;
      color: #777;
    }

    .copyright {
      margin-top: 10px;
    }

    .author-card {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        display: block;
        width: 38px;
        height: 38px;
        border-radius: 999px;
      }



      .user-name {
        flex: 1;
        font-size: 14px;
        color: black;
        margin-bottom: 5px;
        margin-left: 10px;

        .user-summary {
          flex: 1;
          margin-top: 5px;
          font-size: 12px;
          color: #777;
        }
      }

      .follow-btn {
        border: 1px solid #777;
        border-radius: 3px;
        padding: 10px;
        font-size: 14px;
        color: #777;
      }
    }

    .detail-label {
      display: block;
      border-bottom: 3px solid black;
      padding-bottom: 10px;
      font-size: 16px;
      width: 68px;
    }

  }
}

.navbar-enter,
.navbar-leave-to {
  transform: translateY(-100%);
}

.navbar-enter-active,
.navbar-leave-active {
  transition: all .3s linear;
}

.navbar-enter-to,
.navbar-leave {
  transform: translateY(0);
}
</style>