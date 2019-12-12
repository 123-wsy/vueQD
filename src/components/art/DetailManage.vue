<template>
    <div>
        <div>
            <el-button class="el-icon-back" type="text" @click="returnBack">返回</el-button>
        </div>
        <div>
            <h2 class="title">{{artInfo.title}}</h2>
            <div class="artInfo">
                <span>{{artInfo.user.nickname}}</span>
                <span>浏览 {{artInfo.views}}</span>
                <span>{{artInfo.updatetime}}</span>
            </div>
            <div v-html="artInfo.htmlcontent"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailManage",
        data() {
            return {
                artInfo: {
					user:{
						nickname:''
					}
				},
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init() {
                let aid = this.$route.query.aid;
                if (aid != null && aid != undefined) {
                    this.getRequest('/art/getArtByAid?aid=' + aid).then(resp => {
                        this.artInfo = resp;
                    })
                }
            },
            returnBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .artInfo{
        text-align: right;
    }
    .artInfo span{
        color: #409EFF;
        font-size: 12px;
        margin-right: 20px;
    }
    .title{
        text-align: center;
    }
</style>