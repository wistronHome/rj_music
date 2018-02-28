<template>
    <div class="m-wrap">
        <div class="w-wrap-l">
            <Menu class="m-men" :width="'240px'" active-name="1" @on-select="menuSelect">
                 <MenuItem class="m-item" name="1">
                    <span class="m-til">我的歌手（4）</span>
                </MenuItem>
                <MenuItem class="m-item" name="2">
                    <span class="m-til">我的视频（6）</span>
                </MenuItem>
                <MenuItem class="m-item" name="3">
                    <span class="m-til">我的上传（12）</span>
                </MenuItem>
                <Submenu name="4" style="padding-left: 0">
                    <template class="m-item" slot="title">
                        <span class="m-til">创建的歌单（{{createdPls.length}}）
                            <Button @click.stop="createPlaylist" :size="'small'">
                                <Icon style="color: #c0321e" type="plus"></Icon>新增
                            </Button>
                        </span>
                    </template>
                    <MenuItem v-for="(pl, index) in createdPls" :key="index" :name="'pl-' + pl._id">
                        <div class="g-item">
                            <div class="left">
                                <a><img width="40" height="40" :src="pl.cover || defaultCover" alt=""></a>
                            </div>
                            <div class="right">
                                <p class="name">{{pl.name}}</p>
                                <p class="num">{{pl.songs.length}}首</p>
                            </div>
                            <span v-if="!pl.favorite" class="oper">
                                <a style="margin-right: 6px;" class="rj-icn rj-icn-modify" @click.stop="routerToEdit(pl._id)"></a>
                                <a class="rj-icn rj-icn-delete" @click.stop="deletePls(pl._id)"></a>
                            </span>
                        </div>
                    </MenuItem>
                </Submenu>
                <Submenu v-if="storePls.length > 0" name="5">
                    <template class="m-item" slot="title">
                        <span class="m-til">收藏的歌单</span>
                    </template>
                    <MenuItem v-for="(pl, index) in storePls" :key="index" :name="'pl-' + pl._id">
                        <div>
                            <div class="g-item">
                                <div class="left">
                                    <a><img width="40" height="40" src="http://p1.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=40y40" alt=""></a>
                                </div>
                                <div class="right">
                                    <p class="name">{{pl.name}}</p>
                                    <p class="num">{{pl.songs.length}}首</p>
                                </div>
                                <span class="oper">
                                    <a class="rj-icn rj-icn-delete"></a>
                                </span>
                            </div>
                        </div>
                    </MenuItem>
                </Submenu>
            </Menu>
        </div>
        <div class="w-wrap-r">
             <router-view></router-view>
        </div>

        <Modal v-model="createModal" width="500" :maskClosable="false">
            <p slot="header" class="model-header">
                <span>新建歌单</span>
            </p>
            <div style="text-align:center">
                <Form ref="createPlaylistFormData" :model="createPlaylistFormData" :label-width="80">
                    <FormItem label="歌单名：" prop="name">
                        <Input v-model="createPlaylistFormData.name"></Input>
                    </FormItem>
                </Form>
                <p style="text-align: left;padding-left: 80px;color: #999">可通过“收藏”将音乐添加到新歌单中</p>
            </div>
            <div slot="footer" class="model-footer" style="text-align: left;padding-left: 96px">
                <rj-button :btnType="'primary'" :icon="'plus'" @click="submitModal">创&nbsp;&nbsp;建</rj-button>
                <rj-button @click="cancleModal">取&nbsp;&nbsp;消&nbsp;</rj-button>
            </div>
        </Modal>

        <Modal v-model="deleteModal" width="500" :maskClosable="false">
            <p slot="header" class="model-header">
                <span>提示</span>
            </p>
            <div style="text-align:center">
                <p style="text-align: center;font-size: 14px;color: #000">确定删除歌单?</p>
            </div>
            <div slot="footer" class="model-footer" style="text-align: center;">
                <rj-button :btnType="'primary'" :icon="'plus'" @click="handleDeleteModal">确&nbsp;&nbsp;认</rj-button>
                <rj-button :width="60" @click="deleteModal=false">取&nbsp;&nbsp;消&nbsp;</rj-button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util';
export default {
    data() {
        return {
            defaultCover: CommonUtil.getDefaultImage('song_cover'),
            createdPls: [],
            storePls: [],
            createModal: false,
            deleteModal: false,
            checkedPllId: null,
            createPlaylistFormData: {
                name: ''
            }
        }
    },
    created() {
        this.$userService.getUserPls(CommonUtil.getLoginUser()).then(result => {
            this.createdPls = result.data.createdPls;
            this.storePls = result.data.storePls;
        });
    },
    methods: {
        createPlaylist(event) {
            this.createModal = true;
        },
        cancleModal() {
            this.$refs.createPlaylistFormData.resetFields();
            this.createModal = false;
        },
        deletePls(plId) {
            this.checkedPllId = plId;
            this.deleteModal = true;
        },
        submitModal() {
            this.$playlistService.createPlaylist(CommonUtil.getLoginUser(), this.createPlaylistFormData.name).then(result => {
                this.$userService.getUserPls(CommonUtil.getLoginUser()).then(u => {
                    this.cancleModal();
                    this.createdPls = u.data.createdPls;
                });
            });
        },
        handleDeleteModal() {
            this.$userService.removeCreatedPls(CommonUtil.getLoginUser(), this.checkedPllId).then(result => {

            });
            this.deleteModal = false;
        },
        menuSelect(param) {
            if (param.includes('pl')) {
                let id = param.replace('pl-', '');
                this.$router.push({ path: '/my/music/playlist', query: { id } });
            }
        },
        routerToEdit(id) {
            this.$router.push({ path: '/my/music/edit', query: { id } });
        }
    }
}
</script>

<style lang="stylus" scoped>
.m-wrap {
    // display flex
    position relative
    .w-wrap-l {
        // flex 0 1 240px
        position fixed
        height 100%
        border-right 1px solid #dfdfdf
        background-color #f9f9f9
        padding-top 50px
    }
    .w-wrap-r {
        // flex 1 1 auto
        margin-left 240px
    }
}
.m-men {
    text-align left
    background-color #f9f9f9
    .m-item {
        padding 8px 24px
    }
    .m-til {
        font-size 14px
        font-weight 500
        color #000
    }
}

.g-item {
    display flex
    position relative
    &:hover {
        .oper {
            display block
        }
    }
    .left {
        flex 0 1 40px
    }
    .right {
        flex 1 1 auto
        padding-left 10px
        .name, .num {
            font-size 12px
            color #000
        }
        .name {
            max-width 120px
            margin-bottom 6px
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
        }
        .num {
            color #999
        }
    }
    .oper {
        position: absolute;
        display none;
        bottom: 6px;
        right: 10px;
    }
}

</style>

