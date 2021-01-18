export function globalMixin() {
    return {
        computed: {
            contentHeight() {
                return document.body.clientHeight - 56
            }
        }
    }
}