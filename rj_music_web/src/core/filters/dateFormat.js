
export default (val, param) => {
    return Math.floor(new Date(val).getFullYear() % 100 / 10) * 10 + '后';
}
