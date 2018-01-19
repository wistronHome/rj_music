<template>
    <div>
        <audio ref="audio" controls="controls" style="position: absolute;left: 50%;top: -50px">
            <!-- <source src="./demo.mp3" type="audio/mpeg"> -->
            Your browser does not support the audio tag.
        </audio>
    </div>
</template>

<script>
// import $com from '../../assets/script/common.js';
export default {
    props: ['emit'],
    data() {
        return {
        }
    },
}
</script>

<style lang="stylus" scoped>

</style>
