<template>
    <div>
        <div class="header">
            <el-select v-model="artInfo.cid" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.colname"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input class="input" v-model="artInfo.title"></el-input>
        </div>
        <div class="content">
            <mavon-editor class="editor" v-model="artInfo.mdcontent" @save="save" @change="change"/>
        </div>
        <el-button v-if="from" class="btn" type="primary" @click="show">发布文章</el-button>
        <el-button class="saveChange" v-if="!from" style="float:right" type="primary" @click="saveChange">保存修改</el-button>
        <el-button v-if="!from" style="float:right" @click="returnBack">放弃修改</el-button>
    </div>
</template>

<script>
    export default {
        name: "PublishManage",
        data(){
            return{
                options:[],
                artInfo:{
                    id:0, // 如果id是0,表示这次操作是insert,否则做的是一次update
                    cid:'',
                    title:'',
                    mdcontent:'',
                    htmlcontent:'',
                    status:1
                },
                from:true
            }
        },
        methods:{
            returnBack() {
                this.$router.go(-1);
            },
            saveChange(){
                this.putRequest('/art/upArt',this.artInfo).then(resp=>{

                })
            },
            save(md,ht){
                this.artInfo.status = 2;
                this.artInfo.mdcontent = md;
                this.artInfo.htmlcontent = ht;
                this.show();
            },
            change(md,ht){
                this.artInfo.status = 1;
                this.artInfo.mdcontent = md;
                this.artInfo.htmlcontent = ht;
            },
            init(){
                this.getRequest('/columns/getColumns').then(resp => {
                    this.options = resp;
                })
            },
            show(){
                this.postRequest('/art/addArt',this.artInfo).then(resp=>{
                    this.$router.replace('/ArtList')
                })
            }
        },
        mounted() {
            let from = this.$route.query.from;
            if (from != null && from != '' && from != undefined) {
                let aid = this.$route.query.aid;
                this.from = false;
                /*查询文章*/
                this.getRequest('/art/getArtByAid?aid=' + aid).then(resp => {
                    this.artInfo.id = resp.id;
                    this.artInfo.cid = resp.cid;
                    this.artInfo.title = resp.title;
                    this.artInfo.mdcontent = resp.mdcontent;
                    this.artInfo.htmlcontent = resp.htmlcontent;
                })
            }
            this.init();
        }
    }
</script>

<style scoped>
    .header{
        margin-bottom: 10px;
    }
    .header .input{
        width: 300px;
        margin-left: 10px
    }
    .content{
        height: 500px;
        margin-bottom: 10px;
    }
    .content .editor{
        height: 100%;
    }
    .btn{
        float: right;
        margin-top: 10px;
    }
    .saveChange{
        margin-left: 10px;
    }
</style>