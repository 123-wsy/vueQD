<template>
    <div>
        <div>
            <el-input v-model="key" prefix-icon="el-icon-search" placeholder="你想查点啥"
                      style="width: 300px;margin-right: 10px"></el-input>
            <el-button class="el-icon-search" type="primary" @click="init">查询</el-button>
        </div>
        <div>
            <el-table
                    :row-key="getRowKeys"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        v-if="showDel || showEdit"
                        :reserve-selection="true"
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
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                v-if="showDel"
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    style="margin-top: 10px"
                    background
                    :page-size="pageSize"
                    :page-count="pageNum"
                    :total="total"
                    @current-change="change"
                    layout="prev, pager, next">
            </el-pagination>
            <el-button v-if="showEdit || showDel" type="danger" @click="delMany" :disabled="disabled" class="delMany">
                批量删除
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArtManage",
        props: ['status', 'showEdit', 'showDel', 'activeName'],
        data() {
            return {
                disabled: true,
                tableData: [],
                key: '',
                pageNum: 1,
                pageSize: 5,
                total: 0,
                ids: '',
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.activeName == 'fourth') {
                        this.delRequest('/art/'+row.id).then(resp => {
                            this.init();
                        });
                    } else {
                        this.putRequest('/art/upArtStatus?aid='+row.id).then(resp=>{
                            this.init();
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /*点击编辑跳转*/
            handleEdit(index, row) {
                this.$router.push({
                    path: "/EditArt",
                    query: {
                        from: this.activeName,
                        aid: row.id
                    }
                })
            },
            /*点击文章标题跳转到详情*/
            //点击标题,跳转页面
            handleClick(row) {
                this.putRequest('/art/upArtView?aid='+row.id).then(resp=>{
                    this.$router.push({
                        path: '/Detail',
                        query: {
                            aid: row.id
                        }
                    })
                })
            },
            //多删
            delMany() {
                this.$confirm('此操作将永久修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/art/delArts?' + this.ids).then(resp => {
                        this.init();
                        this.$refs.multipleTable.clearSelection();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
            },
            //表格监听
            handleSelectionChange(val) {
                if (val.length > 0) {
                    this.disabled = false;
                    this.ids = '';
                    for (let i = 0; i < val.length; i++) {
                        this.ids += 'ids=' + val[i].id + '&';
                    }
                } else {
                    this.disabled = true;
                }
            },
            //分页
            change(num) {
                this.pageNum = num;
                this.init();
            },
            //加载
            init() {
                let url = 'status=' + this.status + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize + '&key=' + this.key;
                this.getRequest('/art/getArts?' + url).then(resp => {
                    this.tableData = resp.list;
                    this.total = resp.total;
                })
            },
            //翻页打钩记录
            getRowKeys(row) {
                return row.id
            }
        }
    }
</script>

<style scoped>
    .delMany {
        margin-top: 10px;
    }
</style>