<template>
  <div id="board">
    <div class="nav">
      <h1>We love Blog</h1>
      <h2>Let's write life! / ブログに人生を残そう!</h2>
        <p>登録ブログ数: {{ sorted.length }}件</p>
      <button v-on:click="order=!order">昇順/降順</button>
    </div>
 
   <transition-group name="cards" class="container" appear>
      <card v-bind:blog="blog" v-for="blog in sorted" v-bind:key="blog.blogTitle"></card> 
    </transition-group>
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

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
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
</style>