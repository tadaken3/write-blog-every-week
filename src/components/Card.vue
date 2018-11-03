<template>
  <div class="card" v-bind:class="updateStatus">
      <p>{{ blog.blogTitle }}</p>
      <a v-bind:href="blog.link">
        <h3>{{ blog.articleTitle }}</h3>
      </a> 
    <p>{{ blog.pubdate | formatDate}}</p>
    <p>経過日数:{{ passDate }}</p>
    
 </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
  name: 'card',
  data () {
    return {}
  },
  props: ['blog'],
  filters: {
      formatDate: function (date) {
        return moment(date).tz("Asia/Tokyo").format('YYYY/MM/DD');
      },
  },
  computed: {
    passDate: function() {
        let toDate   = moment()
        let fromDate = moment(this.blog.pubdate)
        return Math.round(toDate.diff(fromDate,'days',true))
    },
    updateStatus: function() {
      let diff = this.passDate
      let status;

      if( diff<=7) { status = 'safe' }
        else if (diff<=9){ status = 'warning' }
        else if (diff<=13){ status = 'critical' }
      else { status = 'no-update' }
      
      return status 
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 30%;
  height : 250px;
  margin: 13px;
  min-width: 400px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s;
  background-size: cover;
}

.card:hover{
 transform: translate(0px,-5px);
}


.card a {
  text-decoration: none;
}

.safe {
  background-color: #F6F6F6;
  background-image: url("../assets/safe.png")
}

.warning {
  background-color: #FFC107;
  background-image: url("../assets/warning.png")
}

.critical {
  background-color: #FF5622;
  background-image: url("../assets/critical.png")
}

.no-update {
  background-color: #2D3E50;
  background-image: url("../assets/no-update.png")
}


</style>