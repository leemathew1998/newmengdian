<template>
  <div class="box">
    <div class="left-top-head">
      <div class="greenTitle">
        {{ name }}
      </div>
      <div class="dateTime">
        {{ dateTime }}
      </div>
      <div class="Ranking">
        <div class="Ranking-title">日排名</div>
        <div class="Ranking-center">
          <div>第{{ ranks.day }}名</div>
          <!-- <div class="Ranking-ratio">日环比+2</div> -->
        </div>
      </div>
      <div class="Ranking">
        <div class="Ranking-title">月排名</div>
        <div class="Ranking-center">
          <div>第{{ ranks.month }}名</div>
          <!-- <div class="Ranking-ratio">日环比+1</div> -->
        </div>
      </div>
      <div class="dataTimePicker">
        <!-- <a-month-picker placeholder="请选择月份" /> -->
        <a-date-picker
          :default-value="initDate"
          format="YYYY-MM-DD"
          :allowClear="false"
          :disabledDate="disabledDate"
          @change="onChange"
          placeholder="请选择日期"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    name: {
      type: String
    },
    dateTime: {
      required: true
    },
    ranks: {
      type: Object,
      default: () => ({ day: '1', month: '1' })
    }
  },
  computed: {
    initDate() {
      return moment(this.dateTime, 'YYYY-MM-DD')
    }
  },
  methods: {
    onChange(date, dateString) {
      this.$emit('update:dateTime', dateString)
    },
    disabledDate(currentDate) {
      return currentDate.format('x') > moment().format('x')
    }
  }
}
</script>

<style scoped lang="less">
.greenTitle {
  background-color: #f2f2f2;
  line-height: 40px;
  font-size: 20px;
  color: #009688;
  margin: 0;
  text-align: center;
}

.box {
  border: 1px #f5f5f5 solid;
  border-radius: 5px;
  padding: 2px;
  height: 100%;

  .left-top-head {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .Ranking {
      display: flex;
      flex-direction: column;

      .Ranking-title {
        font-size: 18px;
        font-weight: 600;
        color: #999;
      }

      .Ranking-center {
        display: flex;
        flex-direction: row;
        align-self: center;
        font-size: 24px;
        text-align: center;
        color: #009688;
        align-items: baseline;

        .Ranking-ratio {
          font-size: 10px;
        }
      }
    }

    .dataTimePicker {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
}
</style>
