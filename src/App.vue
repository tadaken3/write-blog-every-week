<template>
  <div id="app">
    <h2>Write Blog Every Week</h2>
    <button v-on:click="order=!order">昇順/降順</button>
    <div class="blogs">
      <ul v-for="blog in sorted">
        <li>
         <div class="card">
          <a v-bind:href="blog.link" v-bind:key="blog.title">
            <h3>{{ blog.articleTitle }}</h3>
          </a> 
          <p>最終更新日: {{ blog.pubdate | formatDate}}</p>
          <p>経過日数:   {{ blog.pubdate | passDate }}</p>
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
import moment from 'moment-timezone';
import lodash from 'lodash';

export default {
  name: 'app',
  data () {
    return {
     blogs: null,
     order: false
    }
  },
  computed: {
    sorted: function() {
      return _.orderBy(this.blogs, 'pubdate', this.order ? 'desc': 'asc')
    },
  },
  filters: {
      formatDate: function (date) {
        return moment(date).tz("Asia/Tokyo").format('YYYY/MM/DD');
      },
      passDate: function(date) {
        var toDate   = moment()
        var fromDate = moment(date)
        return Math.round(toDate.diff(fromDate,'days',true))
    },
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
