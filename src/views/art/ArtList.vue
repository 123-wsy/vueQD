<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="全部文章" name="first">
                <art-manage status="0" :show-edit="false" :show-del="false"></art-manage>
            </el-tab-pane>
            <el-tab-pane label="已发表" name="second">
                <art-manage status="1" :show-edit="true" :show-del="true"></art-manage>
            </el-tab-pane>
            <el-tab-pane label="草稿箱" name="third">
                <art-manage status="2" :show-edit="true" :show-del="true"></art-manage>
            </el-tab-pane>
            <el-tab-pane label="回收站" name="fourth">
                <art-manage status="3" :show-edit="false" :show-del="true"></art-manage>
            </el-tab-pane>
            <el-tab-pane label="博客管理" name="five">
                <art-manage status="-1" :show-edit="false" :show-del="true"></art-manage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ArtManage from "../../components/art/ArtManage";
    export default {
        name: "artList",
        data(){
            return{
                activeName:'second',
            }
        },
        methods:{
            handleClick(){

            }
        },
        components:{
            ArtManage,
        }
    }
</script>

<style scoped>

</style>