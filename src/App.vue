<template>
  <div id="app">
    <h2>Write Blog Every Week</h2>
    <ul>
      <li>
        <div class="card">
          <a v-bind="info[4].link">
            <h3>{{ info[1].articleTitle }}</h3>
          </a>
          published at {{ info[2].pubdata }}
          <p>{{ info[3].summary }}</p>
          <b>{{ info[0].blogTitle }}</b>
          
        </div>
      </li>
    </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
     info: null,
    }
  },
  beforeCreate: function() {
    var vm = this
    const baseURL = "https://quirky-einstein-a1049a.netlify.com/sample.json" 
    axios.get(baseURL).then(function (response) {
          vm.info = response.data
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
