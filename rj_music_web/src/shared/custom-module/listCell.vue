<template>
<!-- songList表格单元组件 -->
    <div>
        <template v-if="renderType === 'index'">{{naturalIndex + 1}}</template>
        <template v-if="renderType === 'playIcon'">
            <span class="play-icon" :class="{'play-on': naturalIndex === 0}"></span>
        </template>
        <template v-if="renderType === 'html'">
            <span v-html="row[column.key]"></span>
        </template>
        <template v-if="renderType === 'normal'"><span>{{row[column.key]}}</span></template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                renderType: ''
            }
        },
        props: {
            row: Object,
            column: Object,
            naturalIndex: Number
        },
        created() {
            if (this.column.type === 'index') {
                this.renderType = 'index';
            } else if (this.column.type === 'selection') {
                this.renderType = 'selection';
            } else if (this.column.type === 'html') {
                this.renderType = 'html';
            } else if (this.column.type === 'expand') {
                this.renderType = 'expand';
            } else if (this.column.type === 'playIcon') {
                this.renderType = 'playIcon';
            } else if (this.column.render) {
                this.renderType = 'render';
            } else {
                this.renderType = 'normal';
            }
        }
    }
</script>

<style lang="stylus" scoped>
$table = "../../assets/table.png";
.play-icon {
    display inline-block
    height 18px
    width: 18px
    background url($table) no-repeat;
    background-position 0 -103px;
    &:hover {
        background-position: -0px -128px;
    }
}
.play-on {
    background-position -20px -128px;
    &:hover {
        background-position -20px -128px;
    }
}
</style>
