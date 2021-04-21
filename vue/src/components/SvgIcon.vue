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
