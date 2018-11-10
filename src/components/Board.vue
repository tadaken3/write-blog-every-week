<template>
  <div id="board">
    <div class="nav">
     <h1>We Love Blog</h1>
        <p>登録ブログ数: {{ sorted.length }}件</p>
      <div class="sample2Area" id="makeImg">
        <input type="checkbox" id="sample2check" v-model="order">
         <label for="sample2check">
        <div id="sample2box"></div>
       </label>
    </div>

      </div>
 
   <transition-group name="cards" class="container" appear>
      <card v-bind:blog="blog" v-for="blog in sorted" v-bind:key="blog.blogTitle"></card> 
    </transition-group>
    <div class="credit"><a href="https://twitter.com/tadaken3">created by @tadaken3</a></div>
  </div>
</template>

<script>
import axios from 'axios';
import lodash from 'lodash';
import Card from './Card.vue';

export default {
  name: 'Board',
  data () {
    return {
     blogs: null,
     order: false,
    }
  },
  computed: {
    sorted: function() {
      return _.orderBy(this.blogs, 'pubdate', this.order ? 'desc': 'asc')
    },
  },
  beforeCreate: function() {
    var me = this
    const baseURL = "https://api-write-blog-every-week.netlify.com/blogs.json" 
    axios.get(baseURL).then(function (response) {
          me.blogs = response.data
    })
  },
  components: {
   'Card': Card,
  },
}
</script>

<style lang="scss" scoped>
#board {
  width: 100%;
  height: 100%;
}
.nav {
  width: 100%;
  height: 100%;
  text-align: center;
}

.nav h1 {
  font-size: 64px;
  font-weight: 800;
  color:#0770FF;
  background: linear-gradient(45deg, #0770FF 0%, #07F5FF 100%);
  -webkit-background-clip: text;//テキストでくり抜く
  -webkit-text-fill-color: transparent;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
}

.sort-button{
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #0770FF;
  background: #ECECEC;
  transition: .4s;
}
.sort-button:hover {/*ボタンを押したとき*/
  background: #0770FF;
  color: white;
}

.cards-enter-active, .demo-leave-active {
  transition: transform .5s, opacity .5s;
}
.cards-move:not(.demo-leave-active) {
  transition: transform .5s;
}
/* 表示される時は上からスライド */
.cards-enter {
  opacity: 0;
  transform: translateY(-10px);
}
/* 消える時は縮小される */
.cards-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.cards-leave-active {
  position: absolute;
}

.credit {
 margin: 10px;
 text-align: center;
}

/* === ボタンを表示するエリア ============================== */
.sample2Area {
  margin         : auto;                /* 中央寄せ           */
  width          : 200px;               /* ボタンの横幅       */
}
 
 /* === チェックボックス ==================================== */
.sample2Area input[type="checkbox"] {
  display        : none;            /* チェックボックス非表示 */
}
 
 /* === チェックボックスのラベル（標準） ==================== */
.sample2Area label {
  display        : block;               /* ボックス要素に変更 */
  box-sizing     : border-box;          /* 枠線を含んだサイズ */
  text-align     : left;                /* 文字位置は中央     */
  border         : 2px solid #0770FF;   /* 枠線               */
  border-radius  : 8px;                 /* 角丸               */
  line-height    : 1;                   /* 1行の高さ          */
  height         : 30px;                /* ボタンの高さ       */
}
 
 /* === 移動BOX（標準） ===================================== */
.sample2Area #sample2box {
  display        :inline-block;
  height         : 26px;                /* ボタンの高さ       */
  width          : 50%;                 /* ボタンの高さ       */
  background     : #0770FF;                /* 背景色             */
  transition     : .3s;                 /* ゆっくり変化       */
}
 
 /* === ON側のチェックボックスの移動BOX（ONのとき） ========= */
.sample2Area #sample2check:checked + label #sample2box {
  transform      : translateX(100%);    /* BOXを右に移動      */
  background     : #0770FF;             /* 背景色             */
}

</style>