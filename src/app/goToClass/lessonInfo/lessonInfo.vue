<template>
  <div>
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size:20px;">章节详情</h1>
      </div>
      <cm-dynamic-table :table-column="lessonConfig" :table-list="lessonList" :buttonList="buttonList" :hasPager="false"></cm-dynamic-table>
      <div v-if="lessonList.length" style="text-align: right;margin-top: 15px;">
        <el-pagination @current-change="lessonPageChange" :current-page.sync="lessonCurrentPage" :page-size="lessonPageSize" layout="prev, pager, next, jumper" :total="lessonPageTotal">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import DynamicForm from '@/components/dynamic-form.vue';
import DynamicTable from '@/components/dynamic-base-table.vue';
import api from '@/api/apis';
import axios from 'axios';
export default {
  data() {
    return {
      formFlag: false,
      tableFlag: false,
      buttonList: [],
      tableColumn: [],
      tableList: [],
      lessonConfig: [],
      lessonList: [],
      scoreConfig: [],
      scoreList: [],
      scoreCurrentPage: 1,
      scorePageSize: 1,
      scorePageTotal: 10,
      lessonCurrentPage: 1,
      lessonPageSize: 10,
      lessonPageTotal: 10,
      mentorConfig: [],
      mentorList: [],
      mentorCurrentPage: 1,
      mentorscorePageSize: 10,
      mentorPageTotal: 10,
    }
  },
  components: {
    'cm-dynamic-table': DynamicTable
  },
  created: function() {
    this.queryTableColumn();
  },
  methods: {
    lessonPageChange(val) {
      this.queryTableColumn({
        lessonPage: val,
      });
    },
    scorePageChange(val) {
      this.queryTableColumn({
        scorePage: val
      });
    },
    mentorPageChange(val) {
      this.queryTableColumn({
        mentorPage: val
      });
    },
    queryTableColumn(pageObj) {
      let params = Object.assign({
        id: this.$route.params.id,
        courseId: this.$route.params.courseId,
        type: 2,
      }, pageObj);
      axios.get(api.getClassInfo, {
        params: params
      }).then(response => {
        if (response.data.data.course) {
          this.tableColumn = response.data.data.course.data.config;
          this.tableList = response.data.data.course.data.list;
        }
        if (response.data.data.lessson) {
          this.lessonConfig = response.data.data.lesson.data.config;
          this.lessonList = response.data.data.lesson.data.list;
          this.lessonCurrentPage = response.data.data.lesson.data.page;
          this.lessonPageSize = response.data.data.lesson.data.pageSize;
          this.lessonPageTotal = response.data.data.lesson.data.total;
        }
        if (response.data.data.score) {
          this.scoreConfig = response.data.data.score.data.config;
          this.scoreList = response.data.data.score.data.list;
          this.scoreCurrentPage = response.data.data.score.data.page;
          console.log(response.data.data.score.data)
          this.scorePageSize = response.data.data.score.data.pageSize;
          this.scorePageTotal = response.data.data.score.data.total;
        }
        if (response.data.data.mentoring) {
          this.mentorConfig = response.data.data.mentoring.data.config;
          this.mentorList = response.data.data.mentoring.data.list;
          this.mentorCurrentPage = response.data.data.mentoring.data.page;
          this.mentorPageSize = response.data.data.mentoring.data.pageSize;
          this.mentorPageTotal = response.data.data.mentoring.data.total;
        }
        this.tableFlag = true;
        this.buttonList = [{
          role: "look",
          label: "详情",
          btnType: "primary"
        }]
      }, error => {
        // error callback
      })
    }
  }
}

</script>
<style scoped>
.el-table .cell,
.el-table th>div {
  padding: 0 5px;
}

</style>
