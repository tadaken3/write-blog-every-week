<template>
  <div id="board">
    <transition name="logo" appear>
     <h1 class="logo">We Love Blog</h1>
     </transition>
    <div class="nav">
        <img src="../assets/status.png" class="status-info" alt="update status">
        <p>登録ブログ数: {{ sorted.length }}件</p>
        <div class="switch" id="makeImg">
          <input type="radio" name="ascBtn" id="ascBtn" checked="" value="asc" v-model="order">
          <label for="ascBtn">昇順</label>
          <input type="radio" name="descBtn" id="descBtn" value="desc" v-model="order">
          <label for="descBtn">降順</label>
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
     order: 'asc',
    }
  },
  computed: {
    sorted: function() {
      return _.orderBy(this.blogs, 'pubdate', this.order)
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

.logo {
  text-align: center;
  font-size: 64px;
  font-weight: 800;
  padding-bottom: 5px;
  color:#0770FF;
  background: linear-gradient(45deg, #0770FF 0%, #07F5FF 100%);
  -webkit-background-clip: text;//テキストでくり抜く
  -webkit-text-fill-color: transparent;
}

//ロゴのフェードイン
//ちょっとゆっくりめに
.logo-enter-active {
  transition: all 3s;
}
.logo-enter {
  opacity: 0;
  transform: translateY(40px);
}

.nav {
  width: 85%;
  height: 150px;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.nav .status-info {
  width: 300px;
  object-fit: contain;
  margin-left: right;
}
.nav p {
  text-align: right;
}

//カードの中身
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
}


.cards-enter-active, .cards-leave-active {
  transition: transform 2s, opacity 2s;
}
.cards-move:not(.cards-leave-active) {
  transition: transform .5s;
}

.cards-enter {
  opacity: 0;
  transform: translateY(50px);
}

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
.switch {
  position       : relative;            /* 親要素が基点       */
  width          : 300px;               /* ボタンの横幅       */
  height         : 30px;                /* ボタンの高さ       */
  margin-left: auto;
}
 
 /* === ラジオボタン ======================================== */
.switch input[type="radio"] {
  display        : none;            /* チェックボックス非表示 */
}
 
 /* === ラジオボタンのラベル（標準） ======================== */
.switch label {
  display        : block;               /* ボックス要素に変更 */
  position       : absolute;            /* 親要素からの相対位置*/
  top            : 0;                   /* 標準表示位置(上)   */
  bottom         : 0;                   /* 標準表示位置(下)   */
  left           : 0;                   /* 標準表示位置(左)   */
  right          : 0;                   /* 標準表示位置(右)   */
  text-align     : center;              /* 文字位置は中央     */
  line-height    : 30px;                /* 1行の高さ(中央寄せ)*/
  font-size      : 13pt;                /* 文字サイズ         */
  font-weight    : bold;                /* 太字               */
  border         : 2px solid #0770FF;      /* 枠線(一旦四方向)   */
}
 
 /* === ON側のラジオボタンのラベル（標準） ================== */
.switch #ascBtn + label {
  right          : 50%;                 /* 右端を中央に変更   */
  border-radius  : 6px 0 0 6px;         /* 角丸(左側の上下)   */
  background     : #FFF;                /* 背景               */
  color          : #0770FF;                /* 文字色             */
  border-right   : none;                /* 枠線の右側を消す   */
}
 
 /* === ON側のラジオボタンのラベル（ONのとき） ============== */
.switch #ascBtn:checked +label {
                                        /* 背景グラデーション */
  background     : #0770FF;
  color          : #fff;                /* 文字色             */
}
 
 /* === OFF側のラジオボタンのラベル（標準） ================ */
.switch #descBtn + label {
  left           : 50%;                 /* 左端を中央に変更   */
  border-radius  : 0 6px 6px 0;         /* 角丸(右側の上下)   */
  background     : #FFF;                /* 背景               */
  color          : #0770FF;                /* 文字色             */
  border-left    : none;                /* 枠線の左側を消す   */
}
 
 /* === OFF側のラジオボタンのラベル（OFFのとき） ============= */
.switch #descBtn:checked +label {
                                        /* 背景グラデーション */
  background     : #0770FF;
  color          : #fff;                /* 文字色             */
}

</style>