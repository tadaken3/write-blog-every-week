<template>
  <div id="board">
    <transition name="logo" appear>
     <h1 class="logo">We Love Blog</h1>
     </transition>
    <transition name="tagline" appear>
     <p class="tagline">私たちはほぼ必ず週一でブログを更新します</p>
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
    <div class="footer">
      <div class="produced">Produced by</div>
      <div class="my-blog">
        <a href="https://tadaken3.hatenablog.jp/">
        <img src="../assets/blog-logo.png" class="blog-logo" alt="タダケンのEnjoy Tech">
        </a>
      </div>
      <div class="copy-light">©tadaken3. All rights reserved.</div>
    </div>
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.logo {
  text-align: center;
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 8px;
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

.tagline {
  text-align: center;
  font-size: 20px;
  margin-top:3px;
  font-weight: 600;
  color:#0770FF;
  background: linear-gradient(45deg, #0770FF 0%, #07F5FF 100%);
  -webkit-background-clip: text;//テキストでくり抜く
  -webkit-text-fill-color: transparent;
}


.tagline-enter-active {
  transition: all 3s;
}
.tagline-enter {
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

/* === ボタンを表示するエリア ============================== */
.switch {
  position: relative;
  width: 300px;
  height: 30px;
  margin-left: auto;
}
 
 /* === ラジオボタン ======================================== */
.switch input[type="radio"] {
  display: none; 
}
 
 /* === ラジオボタンのラベル（標準） ======================== */
.switch label {
  display: block;    
  position: absolute; 
  top: 0; 
  bottom: 0; 
  left: 0;
  right: 0;
  text-align: center;
  line-height: 30px;  
  font-size: 13pt;
  font-weight: bold;
  border: 2px solid #0770FF;
}
 
 /* === ON側のラジオボタンのラベル（標準） ================== */
.switch #ascBtn + label {
  right: 50%;
  border-radius: 6px 0 0 6px;
  background: #FFF;
  color: #0770FF;
  border-right: none;
}
 
 /* === ON側のラジオボタンのラベル（ONのとき） ============== */
.switch #ascBtn:checked +label {
  background: #0770FF;
  color: #fff;
}
 
 /* === OFF側のラジオボタンのラベル（標準） ================ */
.switch #descBtn + label {
  left: 50%;
  border-radius: 0 6px 6px 0;
  background: #FFF;
  color: #0770FF;
  border-left: none;
}
 
 /* === OFF側のラジオボタンのラベル（OFFのとき） ============= */
.switch #descBtn:checked +label {
  background: #0770FF;
  color: #fff;  
}

.footer {
    bottom: 0;
    width: 85%;
    margin: auto;
}

.produced {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  font-size: 1rem;
}

.my-blog {
  width:100px;
  margin-left: auto; margin-right: auto;
}

.blog-logo {
  width:100px;
  object-fit: contain;
}

.blog-logo {
  width:100px;
  object-fit: contain;
}

.copy-light {
    display: flex;
    justify-content: center;
    padding: 0 0 20px 0;
    font-size: 0.7rem;
    margin-top: 20px; 
}

</style>