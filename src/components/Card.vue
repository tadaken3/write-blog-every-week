<template>
  <div class="card" v-bind:class="updateStatus">
      <h3 class="blogTitle">{{ blog.blogTitle }}</h3>
      <a v-bind:href="blog.link">
        <p class="articleTitle">{{ blog.articleTitle }}</p>
      </a> 
    <p class="pubdate">{{ blog.pubdate | formatDate}}</p>
    <p class="passdate">経過日数:{{ passDate }}</p>
    
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
        else if (diff<=9) { status = 'warning' }
        else if (diff<=13){ status = 'critical' }
      else { status = 'no-update' }
      
      return status 
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 400px;
  height : 250px;
  margin: 13px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s;
  background-size: cover;
  position: relative;
}

.passdate {
  position: absolute;
  bottom: 10px;
  left: 20px;
  font-size: 13px;
  color: #2c2c2f;
  background: #cde4ff;/*背景色*/
  border-radius: 7px;
  padding: 3px 14px;
}

.pubdate {
  position: absolute;
  bottom: 13px;
  left: 130px;
  font-size: 13px;
  color: #2c2c2f;
}

.blogTitle {
  position: absolute;
  padding: 0 20px;
  top: 13px;
  left: 6px;
  color: #2c2c2f;
  font-size: 18px;
  text-align: left;
}

.articleTitle {
  position: absolute;
  padding: 0 20px;
  font-size: 130%;
  top: 60px;
  left: 6px;
  text-align: left;
  font-weight: 700;
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