<template>
    <div class="edit-wrap" v-if="data">
        <Breadcrumb class="c-bread" :separator="'>'">
            <BreadcrumbItem :to="'/my/music/playlist?id=' + data._id">{{data.name}}</BreadcrumbItem>
            <BreadcrumbItem>编辑歌单</BreadcrumbItem>
        </Breadcrumb>
        <div v-if="editFormData" class="form-wrap">
            <Form class="c-form" ref="editForm" :model="editFormData" :label-width="70">
                <!-- 必须绑定:key -->
                <FormItem label="歌单名：" prop="name">
                    <Input v-model="editFormData.name"></Input>
                </FormItem>
                <FormItem class="f-tags" label="标签：">
                    <rj-tag closable v-for="(tag, index) in editFormData.types" :key="index" :name="tag" @close="removeTag">{{tag}}</rj-tag>
                    <a @click="typeModal = true">选择标签</a>
                    <p style="color: #999">选择适合的标签，最多选3个</p>
                </FormItem>
                <FormItem label="介绍：" prop="description">
                    <Input type="textarea" v-model="editFormData.description" :rows="6" ></Input>
                    <em class="desc-len">{{descLen}}</em>
                </FormItem>
                <FormItem>
                    <rj-button style="margin-right: 20px"
                        :btnType="'primary'"
                        :icon="'plus'"
                        @click="submitForm">
                            保&nbsp;&nbsp;存
                    </rj-button>
                    <rj-button :width="70" :icon="'default'">取&nbsp;&nbsp;消&nbsp;</rj-button>
                </FormItem>
            </Form>
            <div class="p-wrap">
                <img width="140" height="140" :src="data.cover || defaultPhoto" alt="">
                <a @click="routerToPhoto">上传封面</a>
            </div>

            <Modal v-model="typeModal" width="530px" :maskClosable="false">
                <p slot="header" class="model-header">
                    <span>选择标签</span>
                </p>
                <div style="text-align:left">
                    <p style="text-align: left;color: #999;margin-bottom: 10px;">选择合适的标签，最多可选3个</p>
                    <div style="margin-bottom: 20px" v-if="plTypes" v-for="(item, index) in plTypes" :key="index" class="tag-typ">
                        <h5 style="position: absolute;">{{item.label}}：</h5>
                        <div style="margin-left: 50px">
                            <rj-button style="margin-right: 10px;"
                                v-for="(btn, ind) in item.children"
                                :width="70"
                                :checked="editFormData.types.includes(btn.label)"
                                @click="typeClick(btn.label)"
                                :key="ind">
                                    {{btn.label}}
                            </rj-button>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="model-footer" style="text-align: center;">
                    <!-- <rj-button :width="100">保存并关闭</rj-button> -->
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: null,
            typeModal: false,
            plTypes: null,
            typeChecked: [],
            editFormData: null,
            defaultPhoto: "http://p1.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg"
        }
    },
    created() {
        this.$playlistService.getPlaylistDetail(this.$route.query.id).then(result => {
            this.data = result.data;
            this.editFormData = Object.assign({}, this.data);
        });
        this.$playlistService.getAllTypes().then(result => {
            this.plTypes = result.data;
        });
    },
    computed: {
        descLen() {
            if (this.editFormData && this.editFormData.description) {
                return 1000 - this.editFormData.description.length;
            } else {
                return 1000;
            }
        }
    },
    methods: {
        removeTag(name) {
            this.editFormData.types.splice(this.editFormData.types.findIndex(item => item === name), 1);
        },
        routerToPhoto() {

        },
        submitForm() {
            let { _id, name, types, description } = this.editFormData;
            this.$playlistService.modifyPlaylist({ _id, name, types, description }).then(result => {
                this.$Message.success('修改成功');
                this.$router.push({ path: '/my/music/playlist', query: { id: this.editFormData._id } });
            });
        },
        typeClick(param) {
            if (this.editFormData.types.includes(param)) {
                this.editFormData.types.splice(this.editFormData.types.findIndex(item => item === param), 1);
            } else {
                if (this.editFormData.types.length >= 3) {
                    this.$Message.error('标签最多不多于三个')
                } else {
                    this.editFormData.types = [...this.editFormData.types, param];
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.edit-wrap {
    text-align left
    padding 40px
    .c-bread {
        font-size 12px
        padding-bottom 10px
        border-bottom 1px solid #cbcbcb
    }
    .form-wrap {
        display flex
        margin-top 35px
        .c-form {
            flex 0 1 364px
            .f-tags {
                a {
                    margin-right 5px
                }
            }
        }
        .p-wrap {
            flex: 1 1 auto;
            text-align: left;
            padding-left: 30px;
            position relative
            img, a {
                user-select none
            }
            a {
                position absolute
                top 114px
                left 30px
                background #8e8e8e
                width 140px
                line-height 26px
                opacity 0.8
                color #fff
                text-align center
                &:hover {
                    text-decoration underline
                }
            }
        }
    }
    .desc-len {
        position: absolute;
        right: 9px;
        bottom: 4px;
        line-height: 12px;
        color: #999;
    }

}
</style>
