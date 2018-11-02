<template>
  <div class="card">
    <a v-bind:href="blog.link" v-bind:key="blog.title">
        <h3>{{ blog.articleTitle }}</h3>
    </a> 
    <p>最終更新日: {{ blog.pubdate | formatDate}}</p>
    <p>経過日数:   {{ blog.pubdate | passDate }}</p>
    <b>{{ blog.blogTitle }}</b>
 </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
  name: 'card',
  data () {
    return {
     status: 'safe',
    }
  },
  props: ['blog'],
  filters: {
      formatDate: function (date) {
        return moment(date).tz("Asia/Tokyo").format('YYYY/MM/DD');
      },
      passDate: function(date) {
        let toDate   = moment()
        let fromDate = moment(date)
        return Math.round(toDate.diff(fromDate,'days',true))
      },
      updateStatus: function(date) {
        if(datediff > 14){
          status = 'no-updat';
        }
        else if (datediff > 10){
          stasus = 'critical'
        }
        else if (datediff > 7){
          stasus = 'warring'
        }
        else {
          status = 'safe'
        }
        return status 
      },
  },
}
</script>

<style lang="scss" scoped>
.warning {
  background-color: yellow;
}

.critical {
  background-color: red;
}

.no-update {
  background-color: gray;
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
</style>