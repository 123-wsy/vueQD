<template>
    <div>
        <!--v-loading="loading" :data="tableData" 加载-->
        <el-card class="loginCard">
            <h3 class="title">系统登录</h3>
            <el-form :model="loginInfo" :rules="rule" status-icon ref="form">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" placeholder="用户名" size="small" v-model="loginInfo.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" placeholder="密码" type="password" size="small" v-model="loginInfo.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                </el-form-item>
                <el-button class="loginBtn" type="primary" @click="submit">按我</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                rule:{
                    username:[
                        {required:true,message:'请填写用户名',trigger:'blur'},
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        {required:true,message:'请填写密码',trigger:'blur'}
                    ]
                },
                loginInfo:{
                    username:'admin',
                    password:'123'
                },
                checked:true,
                // loading:true
            }
        },
        methods:{
            submit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.postKeyValueRequest('doLogin',this.loginInfo).then(resp=>{
                           if(resp){
                               //保存user
                               window.sessionStorage.setItem("user",JSON.stringify(resp.object));
                               //跳转页面
                               this.$router.replace('/home');
                           }
                        })
                    } else {
                        this.$message.error('错了哦，这是一条错误消息');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .loginCard{
        width: 400px;
        margin:150px auto;
        box-shadow: 0 2px 12px #211e1e1a !important;
    }
    .loginCard .title{
        margin: 0;
        margin-bottom: 20px;
        text-align: center;
    }
    .loginBtn{
        width:100%;
    }
</style>