export default {
    formatFloatNumber: function (number) {
        if (isNaN(number)) {
            return 0.00;
        }
        return (+number).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}