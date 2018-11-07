<template>
  <div id="app">
    <Board></Board>
  </div>
</template>

<script>
import Board from './components/Board.vue';
import 'normalize.css'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
   'Board': Board,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  display: flex;
  justify-content: center;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
