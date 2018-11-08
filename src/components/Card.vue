<template>
  <div class="card" v-bind:class="updateStatus">
      <a v-bind:href="blog.link">
      <h3 class="blogTitle">{{ blog.blogTitle }}</h3>
        <p class="articleTitle">{{ blog.articleTitle | adjustText }}</p> 
    <p class="pubdate">{{ blog.pubdate | formatDate}}</p>
    <p class="passdate">経過日数:{{ passDate }}</p>
    </a>
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
      adjustText: function (text) {
        let text_len = text.length;
        if (text_len>=35) { return text.slice(0,34) + '...'}
        else { return text }
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

      if(diff<=7) { status = 'safe' }
        else if (diff<=9) { status = 'warning' }
        else if (diff<=13){ status = 'critical' }
      else { status = 'no-update' }
      
      return status 
    },
  },
}
</script>

<style lang="scss" scoped>

//共通の設定
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
  a {
    text-decoration: none;
    display: block;
  }
}

.card:hover{
 transform: translate(0px,-5px);
}

.passdate {
  position: absolute;
  bottom: 10px;
  left: 22px;
  font-size: 13px;
  border-radius: 8px;
  padding: 3px 18px;
}

.pubdate {
  position: absolute;
  bottom: 13px;
  left: 130px;
  font-size: 13px;
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
  width: 80%;
  height: 80%;
  position: absolute;
  padding: 0 20px;
  font-size: 24px;
  top: 60px;
  left: 6px;
  text-align: left;
  font-weight: 700;
}

//状態によって変化
.safe {
  background-color: #F6F6F6;
  background-image: url("../assets/safe.png");
  .passdate {
    color: #F6F6F6;
    background: #4A4A4A;
  }
  .blogTitle {
    color: #9B9B9B;
  }
  .articleTitle {
    color: #4A4A4A;
  }
  .pubdate {
    color: #9B9B9B;
  }
}

.warning {
  background-color: #FFC107;
  background-image: url("../assets/warning.png");
  .passdate {
    color: #FFC107;
    background: #FFFFFF;
  }
  .blogTitle {
    color: #FCE9B0;
  }
  .articleTitle {
    color: #FFFFFF;
  }
  .pubdate {
    color: #FFFFFF;
  }
}

.critical {
  background-color: #FF5622;
  background-image: url("../assets/critical.png");
  .passdate {
    color: #FF5622;
    background: #FFFFFF;
  }
  .blogTitle {
    color: #F7DADA;
  }
  .articleTitle {
    color: #FCE9B0;
  }
  .pubdate {
    color: #FFFFFF;
  }
}

.no-update {
  background-color: #2D3E50;
  background-image: url("../assets/no-update.png");
  .passdate {
    color: #2D3E50;
    background: #FFFFFF;
  }
  .blogTitle {
    color: #7B90A7;
  }
  .articleTitle {
    color: #FCE9B0;
  }
  .pubdate {
    color: #FFFFFF;
  }
}



</style>