<!-- 页面保存为图片 -->
<template>
    <div class="main" :class="{vhide: showPic}" v-if="loaded">
        <div class="main-body">
            <header v-if="from!='sdk'">
                <img class="icon-report" src="../assets/svg/report.svg">
                <span class="caption" v-if="confirmed==1">
                    <p class="mb6" @click="$router.push({ name: 'index', query: {num: num} })">报告已发送给医生，就诊时提供预问诊编码即可</p>
                    预问诊编码: {{num}}
                </span>
                <div class="btn-bar clear">
                    <button class="btn btn-outline-warn" v-if="!expired" @click="toModify">返回修改</button>
                    <button class="btn btn-warn" :class="{fr:!expired}" v-if="confirmed==1" @click="toCanvas()">保存预问诊报告为图片</button>
                    <button class="btn btn-warn fr" v-if="confirmed==0&&!expired" @click="showConfirm=true">确认发送给医生</button>
                </div>
            </header>
            <div class="preview-mask" v-if="showPic" @click="showPic=false">
                <img class="canvas-show" width="100%" @click.stop>
                <div class="tip-bar" @click.stop>
                    <img src="../assets/svg/click.svg">
                    长按保存图片
                </div>
            </div>
        </div>
        <div id="pic-el" v-if="confirmed==1">
            <div class="mask-title tc">预问诊编码</div>
            <div class="mask-num tc">{{num}}</div>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
    name: 'Home',
    data() {
        return {
        }
    },
    created() {
        this.id = this.$route.query.id
        this.appid = this.$route.query.app_id
        this.from = this.$route.query.from
        this.getData()
    },
    methods: {
        toCanvas() {
            let vu = this
            this.showPic = true
            let origin = document.querySelector('#pic-el')
            let w =  parseInt(origin.offsetWidth - 32)
            let rote = (w - 32) / w

            // 图片放大 增加清晰度功能相关设置
            // let h = parseInt(origin.offsetHeight * rote)
            // var canvas2 = document.createElement("canvas");
            // canvas2.width = w * 2
            // canvas2.height = h * 2
            // // canvas2.backgroundColor = '#fff'
            // canvas2.style.width = w + "px";
            // canvas2.style.height = h + "px";

            // var context = canvas2.getContext("2d");
            // context.scale(2, 2)

            html2canvas(document.querySelector("#pic-el"), {useCORS: true}).then(canvas => {
                // document.querySelector('.preview-mask').appendChild(canvas)
                let dataUrl = canvas.toDataURL();
                let imgCanvas = document.querySelector('.canvas-show')
                imgCanvas.src = dataUrl
                imgCanvas.style.height = parseInt(origin.offsetHeight * rote) + 'px'
            });
        }
        // 测试canvas
    }
}
</script>

<style lang="stylus" scoped>
</style>
