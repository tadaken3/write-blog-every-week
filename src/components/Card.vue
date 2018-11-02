<template>
  <div class="card" v-bind:class="updateStatus">
    <a v-bind:href="blog.link">
      <h3>{{ blog.articleTitle }}</h3>
    </a> 
    <p>最終更新日: {{ blog.pubdate | formatDate}}</p>
    <p>経過日数:   {{ passDate }}</p>
    <p>{{ blog.blogTitle }}</p>
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
  height : 300px;
  background-color: white;
  margin: 13px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-radius: 6px;
  text-align: center;
}

.warning {
  background-color: #FFC107;
}

.critical {
  background-color: #FF5622;
}

.no-update {
  background-color: #2D3E50;
}


</style>