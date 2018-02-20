<template>
    <a class="rj-tag"  @click.stop="check">
        <i :class="{'rj-cls': closable}">
            <slot></slot>
            <em v-if="closable" @click.stop="close">x</em>
        </i>
    </a>
</template>

<script>
export default {
    props: {
        closable: {
            type: Boolean,
            default: false
        },
        name: String
    },
    methods: {
        close(event) {
            this.$emit('close', this.name);
        },
        check() {

        }
    }
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
    user-select none
    * {
        user-select none
    }
    &:hover {
        background-position right -1430px
        i {
            background-position: 0 -1400px;
        }
    }
    .rj-cls {
        padding-right 13px
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
        em {
            position: absolute;
            padding: 0 2px;
            top: -1px;
            right: -4px;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
