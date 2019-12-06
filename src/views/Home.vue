<template>
    <div>
        <el-container>
            <el-header class="header">
                <h3 class="title">论坛</h3>
                <el-dropdown @command="onclick">
                    <span class="el-dropdown-link">
                        {{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">1</el-dropdown-item>
                        <el-dropdown-item command="2">2</el-dropdown-item>
                        <el-dropdown-item command="3">3</el-dropdown-item>
                        <el-dropdown-item divided command="out">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px" style="height:calc(100vh - 60px);background:#000">
                    <el-menu router style="background:#000">
                        <el-submenu :key="index" :index="index+''" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden==true && item.meta.isFirst == false && isRole(item.meta.roles)">
                            <template slot="title">
                                <i :class="item.meta.icon"></i>
                                <span>{{item.meta.a}}</span>
                            </template>
                            <el-menu-item style="background:#000" :index="child.path" v-for="(child,index) in item.children" v-if="isRole(child.meta.roles)">
                                {{child.meta.a}}
                            </el-menu-item>
                        </el-submenu>
                        <div v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden==true && item.meta.isFirst == true">
                            <el-menu-item :key="index" :index="child.path" v-for="(child,index) in item.children" v-if="isRole(child.meta.roles)">
                                <i v-if="child.meta.icon" :class="child.meta.icon"></i>
                                <span slot="title">{{child.meta.a}}</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                       <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="this.$route.path != '/home'">{{this.$router.currentRoute.meta.a}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="maintitle" v-if="this.$route.path == '/home'">
                        <h2>欧哈有</h2>
                    </div>
                    <router-view style="margin-top: 10px"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user:JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        methods: {
            isRole(roles){
                for(let i in this.user.authorities){
                    for(let j in roles){
                        if(this.user.authorities[i].authority == roles[j]){
                            return true;
                        }
                    }
                }
                return false;
            },
            onclick(command) {
                if(command == 'out'){
                    this.$confirm('退出, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        window.sessionStorage.removeItem('user');
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出'
                        });
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .header{
        background: #409EFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header .title{
        color: #FFFFFF;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #FFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .maintitle{
        text-align: center;
        font-size: 2em;
    }
</style>