<template>
    <div>
        <div class="inputHeader">
            <el-input prefix-icon="el-icon-plus" class="input" v-model="column.colname" placeholder="请输入内容"></el-input>
            <el-button type="primary" class="el-icon-plus" @click="addColumn">新增</el-button>
        </div>
        <div>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    v-loading="loading"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号">
                </el-table-column>
                <el-table-column
                        prop="colname"
                        label="栏目名称">
                </el-table-column>
                <el-table-column
                        prop="enabletime"
                        label="启用时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" @click="delMany" :disabled="disabled" class="delMany">批量删除</el-button>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-input v-model="colInfo.colname" placeholder="你想改点啥" class="upInput"></el-input>
                <el-button type="primary">修改</el-button>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Colmanage",
        data() {
            return {
                column: {
                    colname: '',
                },
                tableData: [],
                loading: true,
                dialogVisible: false,
                colInfo: {
                    id: '',
                    colname: ''
                },
                ids: '',
                disabled:true
            }
        },
        methods: {
            //批量删除按钮点击事件
            delMany() {
                this.$confirm('此操作将永久修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/columns/delManyColumn?' + this.ids).then(resp => {
                        this.getColumns();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
            },
            //表格监听事件
            handleSelectionChange(val) {
                console.log(val);
                if(val.length > 0){
                    this.disabled = false;
                    this.ids = '';
                    for (let i = 0; i < val.length; i++) {
                        this.ids += 'ids=' + val[i].id + '&';
                    }
                }else{
                    this.disabled = true;
                }
            },
            //改方法
            update() {
                if (this.colInfo.colname == '' || this.colInfo.colname.trim() == '') {
                    this.$message.warning('请正确填写');
                } else {
                    this.$confirm('此操作将永久修改【' + this.colInfo.colname + '】, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.putRequest('/columns/', this.colInfo).then(resp => {
                            this.getColumns();
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                }
                this.dialogVisible = false;
            },
            //改
            handleEdit(row) {
                this.dialogVisible = true;
                this.colInfo.id = row.id;
                this.colInfo.colname = row.colname;
            },
            //删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除【' + row.colname + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/columns/' + row.id).then(resp => {
                        this.getColumns();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //新增
            addColumn() {
                if (this.column.colname == '' || this.column.colname.trim() == '') {
                    this.$message.warning('请正确填写');
                } else {
                    this.$confirm('添加【' + this.column.colname + '】, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.postRequest('/columns/', this.column).then(resp => {
                            this.column.colname='';
                            this.getColumns();
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消添加'
                        });
                    });
                }
            },
            getColumns() {
                this.getRequest('/columns/getColumns').then(resp => {
                    this.tableData = resp;
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.getColumns();
        }
    }
</script>

<style scoped>
    .inputHeader {
        margin: 10px 0;
    }

    .inputHeader .input {
        width: 300px;
        margin-right: 10px;
    }

    .upInput {
        width: 60%;
        margin-right: 10px;
    }

    .delMany{
        margin-top: 20px;
    }
</style>