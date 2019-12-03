<template>
    <div>
        <el-card class="box-card" v-for="(item,index) in info">
            <div slot="header" class="clearfix">
                <span>{{item.nickname}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div :key="item.id" class="text item">
                <p>用户名：{{item.username}}</p>
                <p>邮箱：{{item.email}}</p>
                <p>注册时间：{{item.regtime}}</p>
                <p>用户状态：
                    <el-switch
                            v-model="value"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="boolean"
                    >
                    </el-switch>
                </p>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data(){
            return{
                info:[],
                value:true,
                userInfo:{
                    id:'',
                    enabled:''
                },
            }
        },
        methods:{
            load(){
                this.getRequest('/user/getUsers').then(resp=>{
                    this.info = resp;
                })
            },
            boolean(i){

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
        margin:0 3% 20px 0;
    }
</style>