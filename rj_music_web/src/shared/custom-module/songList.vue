<template>
<!-- 通用歌曲列表组件 -->
    <table width="100%" cellspacing="0">
        <colgroup>
            <col v-for="(col, index) in column" :key="index" :width="col.width">
        </colgroup>
        <thead v-if="isHeadShow">
            <tr>
                <th v-for="(col, index) in column"
                    :style="{'text-align': col.align}"
                    :key="index">
                    {{col.label}}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, itemIndex) in data" :key="itemIndex">
                <td v-for="(col, colIndex) in column"
                    :key="colIndex"
                    :style="{'text-align': col.align}">
                    <rj-cell :row="row" :column="col" :natural-index="itemIndex"></rj-cell>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import ListCell from './listCell.vue';

export default {
    components: {
        'rj-cell': ListCell
    },
    data() {
        return {

        }
    },
    props: {
        data: {
            type: Array,
            default: []
        },
        column: {
            type: Array,
            default: []
        }
    },
    computed: {
        isHeadShow() {
            let flag = false;
            this.column.forEach(item => {
                if (item.width && item.width > 0) {
                    flag = true;
                }
            });
            return flag;
        }
    }
}
</script>

<style lang="stylus" scoped>
$border = 1px solid #e2e2e2

table {
    table-layout fixed;
    vertical-align middle;
    border 0
    tr {
        line-height 38px;
        &:nth-child(even) {
            td {
                background #f7f7f7;
            }
        }
        &:hover {
            td {
                background #e6e6e6;
            }
        }
        &:last-child {
            td {
                border-bottom $border
            }
        }
    }
    th, td {
        text-align left
        padding 0 10px
        &:nth-child(1)  {
            border-left $border
        }
    }
    th {
        border-bottom $border
        border-right $border
        border-top $border
    }
    td {
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        &:last-child {
            border-right $border
        }
    }
}
</style>
