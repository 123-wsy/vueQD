<template>
    <div>
        <div>
            <el-input style="width:300px" placeholder="请输入用户名" v-model="nickname"></el-input>
            <el-button type="primary" style="margin-left: 10px" @click="selectUser">搜索</el-button>
        </div>

        <div style="margin-top: 20px">
            <el-card class="box-card" v-for="(item,index) in info">
                <div slot="header" class="clearfix">
                    <span>{{item.nickname}}</span>
                    <el-button style="float: right; padding: 3px 0; color:red;" class="el-icon-delete" type="text"
                               @click="delBtn(item.id)">删除
                    </el-button>
                </div>
                <div class="text item">
                    <p>用户名：{{item.username}}</p>
                    <p>邮箱：{{item.email}}</p>
                    <p>注册时间：{{item.regtime}}</p>
                    <p>用户状态：
                        <el-switch
                                v-model="item.enabled"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="change(item.id,item.enabled)"
                        >
                        </el-switch>
                    </p>
                    <p>角色：
                        <el-tag type="success" style="margin-right: 5px" v-for="(role,i) in item.roles">
                            {{role.nameZh}}
                        </el-tag>
                    </p>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data() {
            return {
                nickname:'',
                info: [],
                userInfo: {
                    id: '',
                    enabled: ''
                },
            }
        },
        methods: {
            //查
            selectUser(){
                this.getRequest('/user/getUsers?nickname='+this.nickname).then(resp => {
                    this.info = resp;
                })
            },
            //删
            delBtn(id) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest('/user/' + id).then(resp => {
                        this.load();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //加载
            load() {
                this.getRequest('/user/getUsers').then(resp => {
                    this.info = resp;
                    // console.log(this.info)
                })
            },
            change(i, j) {
                this.userInfo.id = i;
                this.userInfo.enabled = j;
                this.putRequest('/user/', this.userInfo).then(resp => {
                    // this.$message.success('改完了奥');
                    // this.load();
                })
            }
        },
        mounted() {
            this.load();
        }
    }
</script>

<style scoped>
    .box-card {
        width: 30%;
        display: inline-block;
        margin: 0 3% 20px 0;
    }
</style>