<template>
  <div id="app">
    <h2>Write Blog Every Week</h2>
    <div class="blogs">
      <ul v-for="blog in blogs">
        <li>
         <div class="card">
          <a v-bind:href="blog.link">
            <h3>{{ blog.articleTitle }}</h3>
          </a>
          <p>最終更新日: {{ blog.pubdate | moment }}</p>
          <p>{{ blog.summary }}</p>
          <b>{{ blog.blogTitle }}</b>
        </div>
       </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'app',
  data () {
    return {
     blogs: null,
    }
  },
  filters: {
      moment: function (date) {
        return moment(date).format('YYYY/MM/DD');
      }
  },
  beforeCreate: function() {
    var me = this
    const baseURL = "https://api-write-blog-every-week.netlify.com/blogs.json" 
    axios.get(baseURL).then(function (response) {
          me.blogs = response.data
    })
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.blogs {
  display: flex;
  flex-wrap: wrap;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 33.3%;
  
}

li {
  margin: 0 10px;
}

.card {
  height : 300px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px;
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-image: initial;
  border-radius: 8px;
}



h1, h2 {
  font-weight: normal;
}



a {
  color: #42b983;
}
</style>
