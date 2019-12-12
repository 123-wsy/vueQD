<template>
    <div>
        <div id="main" style="width: 600px;height:400px;margin:150px auto;"></div>
    </div>
</template>

<script>
    export default {
        name: "DataManage",
        mounted() {
            this.initData();
        },
        methods:{
            initData(){
                this.getRequest('/columns/getDatas').then(resp=>{
                    let text = [];
                    let count = [];
                    for (let i in resp) {
                        text.push(resp[i].colname);
                        count.push(resp[i].count);
                    }
                    var myChart = this.$echarts.init(document.getElementById('main'));
                    // 指定图表的配置项和数据
                    var option = {
                        title: {
                            text: '文章'
                        },
                        tooltip: {},
                        legend: {
                            data:['数量']
                        },
                        xAxis: {
                            data: text,
                            axisLabel :{
                                interval:0,
                                rotate:40
                            }
                        },
                        yAxis: {},
                        series: [{
                            name: '数量',
                            type: 'bar',
                            data: count
                        }]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                })
            }
        }
    }
</script>

<style scoped>

</style>