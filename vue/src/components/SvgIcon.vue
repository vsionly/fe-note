<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: 'svg-icon',
    props: {
        iconClass: {
            type: String
        },
        name: {
            type: String,
            required: true
        }
    },
    computed: { // 得确认 作为计算属性的必要性
        iconName () {
            return `#icon-${this.name}`
        },
        svgClass () {
            if (this.iconClass) {
                return 'svg-icon ' + this.iconClass
            } else {
                return 'svg-icon'
            }
        }
    }
}
</script>
<style type="text/css" lang="stylus">
    .svg-icon
        width: 1em;
        height: 1em;
        fill: currentColor;
        overflow: hidden;
        vertical-align: -.15em;
        transition: transform .4s;
</style>