<template>
    <div>
        <div>
            <el-input v-model="key" prefix-icon="el-icon-search" placeholder="你想查点啥" style="width: 300px;margin-right: 10px"></el-input>
            <el-button class="el-icon-search" type="primary" @click="init">查询</el-button>
        </div>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                <el-table-column
                        v-if="showDel || showEdit"
                        type="selection">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text">{{scope.row.title}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="updatetime"
                        label="最近编辑时间">
                </el-table-column>
                <el-table-column
                        prop="user.nickname"
                        label="作者">
                </el-table-column>
                <el-table-column
                        prop="column.colname"
                        label="所属分类">
                </el-table-column>
                <el-table-column label="操作" v-if="showEdit || showDel">
                    <template slot-scope="scope">
                        <el-button
                                v-if="showEdit"
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                v-if="showDel"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    :page-size="pageSize"
                    :page-count="pageNum"
                    :total="total"
                    @current-change="change"
                    layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArtManage",
        props:['status','showEdit','showDel'],
        data(){
            return{
                tableData:[],
                key:'',
                pageNum:1,
                pageSize:5,
                total:-1,
            }
        },
        mounted(){
           this.init()
        },
        methods: {
            change(num){
                this.pageNum = num;
                this.init();
            },
            init(){
                let url = 'status='+this.status+'&pageNum='+this.pageNum+'&pageSize='+this.pageSize+'&key='+this.key;
                this.getRequest('/art/getArts?'+url).then(resp=>{
                    this.tableData=resp.list;
                    this.total=resp.total;
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style scoped>

</style>