<template>
    <a class="rj-tag">
        <i><slot></slot></i>
    </a>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
$button2 = "../../assets/button2.png";
.rj-tag {
    height: 22px;
    line-height: 22px;
    display inline-block
    cursor pointer
    background url($button2) no-repeat
    padding: 0 10px 0 0;
    text-shadow: 0 1px #fdfdfd;
    background-position: right -27px;
    &:hover {
        background-position right -1430px
        i {
            background-position: 0 -1400px;
        }
    }
    i {
        position: relative;
        display inline-block
        zoom: 1;
        padding: 0 3px 0 13px;
        background url($button2) no-repeat
        background-position: 0 0;
        height: 22px;
        line-height: 22px;
        color #777
    }
}
</style>
