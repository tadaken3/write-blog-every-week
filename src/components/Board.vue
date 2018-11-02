<template>
  <div id="board">
    <h2>Write Blog Every Week</h2>
    <button v-on:click="order=!order">昇順/降順</button>
    <div class="container">
      <card v-bind:blog="blog" v-for="blog in sorted" v-bind:key="blog.title"></card> 
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import lodash from 'lodash';
import Card from './Card.vue';


export default {
  name: 'app',
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

<style lang="scss">

.blogs {
  display: flex;
  flex-wrap: wrap;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>