import provinces from '@/common/js/district.js'
export default {
    name: 'Index',
    data() {
        return {
            data: ''
        }
    },
    created() {
        this.id = this.$route.query.id
    },
    methods: {
        save() {
            this.$api.post('/kg_search', {terms: this.queryParam}).then(res => {
                if (res.status === 0) {
                    this.reasons = res.result
                    this.originData.reasons = JSON.parse(JSON.stringify(this.reasons))
                    if (!this.tabIndex) this.loading = false
                    this.reasonTip = this.originData.reasonTip = res.text
                }
            })
        }
    }
}
