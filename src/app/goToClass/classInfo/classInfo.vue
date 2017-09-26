<template>
  <div>
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size:20px;">课程详情</h1>
      </div>
      <cm-dynamic-table :table-column="tableColumn" :table-list="tableList"></cm-dynamic-table>
    </el-card>
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size:20px;">章节详情</h1>
      </div>
      <cm-dynamic-table :table-column="lessonConfig" :table-list="lessonList" :buttonList="buttonList" :hasPager="false"   ></cm-dynamic-table>
      <el-table-column
          v-for="item in tableColumn"
          :key="item.name"
          :prop="item.name"
          :label="item.label"
          :sortable="item.sort?true:false"
          :min-width="minWidth"
          :fixed="item.fixed"
          :width="columnWidth">
          <template scope="scope">
            <div v-if="item.type === 'operation'">
              <el-button v-for="item in scope.row[item.name]"
                         :role="item.role"
                         size="small"
                         :type="item.btnType"
                         :key="item.label"
                         @click="customHandleEdit(scope.$index, scope.row, item.role)" 
                         >{{item.label}}
              </el-button>
            </div> 
            <div v-else-if="item.type === 'operationWithData'">
              <span style="text-align:center;display:block">{{scope.row[item.name].value}}</span>
              <el-button v-for="item in scope.row[item.name].list"
                         :role="item.role"
                         size="small"
                         :type="item.btnType"
                         :key="item.label"
                      
                         >{{item.label}}
              </el-button>
            </div>
            <span v-else>{{scope.row[item.name]}}</span>
          </template>
        </el-table-column>
      <div v-if="lessonList.length" style="text-align: right;margin-top: 15px;">
        <el-pagination @current-change="lessonPageChange" :current-page.sync="lessonCurrentPage" :page-size="lessonPageSize" layout="prev, pager, next, jumper" :total="lessonPageTotal">
        </el-pagination>
      </div>
    </el-card>
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size:20px;">学分详情</h1>
      </div>
      <cm-dynamic-table :table-column="scoreConfig" :table-list="scoreList" :buttonList="buttonList" :hasPager="false"></cm-dynamic-table>
      
      <div v-if="scoreList && scorePageTotal > scorePageSize" style="text-align: right;margin-top: 15px;">
        <el-pagination @current-change="scorePageChange" :current-page.sync="scoreCurrentPage" :page-size="scorePageSize" layout="prev, pager, next, jumper" :total="scorePageTotal">
        </el-pagination>
      </div>
    </el-card>
    <el-card style="margin-top: 15px;border: none;box-shadow: none;">
      <div slot="header" class="clearfix">
        <h1 style="font-size:20px;">答疑详情</h1>
      </div>
      <cm-dynamic-table :table-column="mentorConfig" :table-list="mentorList" :buttonList="buttonList" :hasPager="false"></cm-dynamic-table>
      <div v-if="mentorList && mentorPageTotal > mentorscorePageSize" style="text-align: right;margin-top: 15px;">
        <el-pagination @current-change="mentorPageChange" :current-page.sync="mentorCurrentPage" :page-size="mentorPageSize" layout="prev, pager, next, jumper" :total="mentorPageTotal">
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
     customHandleEdit (index, row, role) {
         this.$emit("customHandleEdit", row, role);
       },
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
        if (response.data.data.class) {
          this.tableColumn = response.data.data.course.data.config;
          this.tableList = response.data.data.course.data.list;
        }
        if (response.data.data.lesson) {
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
        }];
      }, error => {
        // error callback
      })
    },
    
  }
}

</script>
<style scoped>
.el-table .cell,
.el-table th>div {
  padding: 0 5px;
}


</style>
