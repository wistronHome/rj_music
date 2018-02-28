<template>
    <div class="wrap">
        <div class="record-title">
            <h3>更换头像</h3>
        </div>
        <div class="p-wrap">
            <div class="btns">
                <rj-button @click="handleUpload" :width="80">上传头像</rj-button>
                <input style="display: none" id="fileInp" type="file" @change="beforeUpload">
                <span>支持jpg、png、bmp格式的图片，且文件小于20M</span>
            </div>
            <div class="edimg">
                <img v-if="!bgUploadSource" src="../../assets/default_cover.png" alt="">
                <div v-else class="p-r">
                    <img id="photo" :style="sPos" class="bg"
                        :src="bgUploadSource" alt="">
                    <img class="edit-img"
                        :style="clip"
                        :src="bgUploadSource">
                    <div id="rect" class="rect"
                        @mousedown="handleMouseDown"
                        :style="position">
                        <div id="zoom" class="zoom" @mousedown.stop="handleMouseDown"></div>
                    </div>
                </div>
            </div>
            <div v-if="user" class="show-img">
                <p>头像预览</p>
                <div class="big-pho">
                    <img :src="bgUploadSource || user.photo || defaultUserPhoto" :style="bigPho">
                </div>
                <p class="p-t">大尺寸头像（180x180像素）</p>
                <div class="sma-pho">
                    <img :src="bgUploadSource || user.photo || defaultUserPhoto" :style="smallPho">
                </div>
                <p class="p-t">小尺寸头像（40x40像素）</p>
            </div>
            <div class="s-btn">
                <rj-button :icon="'store'" @click="handleSubmit" :width="70">保&nbsp;&nbsp;存</rj-button>
                <rj-button :icon="'default'" @click="handleCancel" :width="70">取&nbsp;&nbsp;消</rj-button>
            </div>
        </div>
    </div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util';
let initEvent, initPosition, photoInfo, pointerObj;
export default {
    name: 'photo',
    data() {
        return {
            defaultUserPhoto: CommonUtil.getDefaultImage('user_photo'),
            user: null,
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            marginTop: 0,
            marginLeft: 0,
            bgUploadSource: null,
            bgUploadFile: null
        }
    },
    created() {
        this.$userService.getUserById(CommonUtil.getLoginUser()).then(result => {
            this.user = result.data;
        });
    },
    computed: {
        sPos() {
            return {
                'margin-top': this.marginTop + 'px',
                'margin-left': this.marginLeft + 'px'
            }
        },
        position() {
            return {
                top: this.top + this.marginTop + 'px',
                left: this.left + this.marginLeft + 'px',
                width: this.width + 'px',
                height: this.height + 'px'
            }
        },
        clip() {
            return {
                'margin-top': this.marginTop + 'px',
                'margin-left': this.marginLeft + 'px',
                clip: `rect(
                    ${this.top}px
                    ${this.left + this.width}px
                    ${this.top + this.height}px
                    ${this.left}px
                )`
            }
        },
        bigPho() {
            let rid = 180 / this.width;
            let rStyle = {
                left: - this.left * rid + 'px',
                top: - this.top * rid + 'px',
            }
            if (this.marginLeft === 0) {
                rStyle.width = 324 * rid + 'px';
            } else {
                rStyle.height = 324 * rid + 'px';
            }
            return rStyle;
        },
        smallPho() {
            if (!this.width) {
                return {
                    width: '40px',
                    height: '40px'
                }
            }
            let rid = 40 / this.width;
            let rStyle = {
                left: - this.left * rid + 'px',
                top: - this.top * rid + 'px',
            }
            if (this.marginLeft === 0) {
                rStyle.width = 324 * rid + 'px';
            } else {
                rStyle.height = 324 * rid + 'px';
            }
            return rStyle;
        }
    },
    methods: {
        handleMouseDown(event) {
            const _photo = document.getElementById('photo');
            photoInfo = {
                width: _photo.clientWidth,
                height: _photo.clientHeight
            };
            pointerObj = event.target.id;
            initEvent = event;
            initPosition = {
                left: this.left,
                top: this.top,
                width: this.width,
                height: this.height
            }
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
        },
        handleMouseMove(event) {
            let _x = event.clientX - initEvent.clientX,
                _y = event.clientY - initEvent.clientY;
            if (pointerObj === 'rect') {
                this.left = initPosition.left + _x <= 0 ?
                    0 : initPosition.left + _x + this.width < photoInfo.width ?
                    initPosition.left + _x : photoInfo.width - this.width;
                this.top = initPosition.top + _y <= 0 ? 0 :
                    initPosition.top + _y + this.height < photoInfo.height ?
                    initPosition.top + _y : photoInfo.height - this.height;
            } else if (pointerObj === 'zoom') {
                this.width = initPosition.width + _x <= 0 ?
                    0 : this.left + initPosition.width + _x < photoInfo.width ?
                    initPosition.width + _x : photoInfo.width - this.left;
                this.height = this.width;
                if (this.height + this.top > photoInfo.height) {
                    this.width = photoInfo.height - this.top;
                    this.height = this.width;
                }
            } else {
                throw new Error('no target element');
            }

        },
        handleMouseUp() {
            document.removeEventListener('mousemove', this.handleMouseMove);
        },
        beforeUpload(event) {
            this.bgUploadFile = event.target.files[0];
            if (!['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(this.bgUploadFile.type)) {
                this.$Message.error('请选择正确格式的文件');
                this.bgUploadFile = null;
                return;
            }
            if (this.bgUploadFile.size >= 1024 * 1024 * 2) {
                this.$Message.error('请选择小于2M的文件');
                this.bgUploadFile = null;
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(this.bgUploadFile);
            let $$this = this;
            reader.onload = ev => {
                $$this.bgUploadSource = ev.target.result;
                this.top = this.left = this.width = this.height = this.marginTop = this.marginLeft = 0;
                setTimeout(() => {
                    let p = document.getElementById('photo');
                    if (p.clientWidth > p.clientHeight) {
                        $$this.marginTop = (p.clientWidth - p.clientHeight) / 2;
                        $$this.width = $$this.height = p.clientHeight * 0.8;
                        $$this.left = $$this.marginTop + p.clientHeight * 0.1;
                        $$this.top = p.clientHeight * 0.1;
                    } else if (p.clientWidth < p.clientHeight) {
                        $$this.marginLeft = (p.clientHeight - p.clientWidth) / 2;
                        $$this.top = $$this.marginLeft + p.clientWidth * 0.1;
                        $$this.left = p.clientWidth * 0.1;
                        $$this.width = $$this.height = p.clientWidth * 0.8;
                    } else {
                        $$this.width = $$this.height = p.clientHeight * 0.8;
                        $$this.left = $$this.marginTop + p.clientHeight * 0.1;
                        $$this.top = $$this.marginLeft + p.clientWidth * 0.1;
                    }
                }, 10)
            };
        },
        handleUpload() {
            document.getElementById('fileInp').click();
        },
        handleSubmit() {
            let p = document.getElementById('photo');
            let formData = new FormData();
            formData.append('photoWidth', p.clientWidth);
            formData.append('photoHeight', p.clientHeight);
            formData.append('left', parseInt(this.left));
            formData.append('top', parseInt(this.top));
            formData.append('width', parseInt(this.width));
            formData.append('height', parseInt(this.height));
            formData.append('photo', this.bgUploadFile);
            formData.append('userId', CommonUtil.getLoginUser());
            console.log(document.getElementById('photo').clientWidth)
            this.$userService.uploadPhoto(formData).then(result => {

            });
        },
        handleCancel() {
            this.bgUploadSource = null;
        }
    }
}
</script>

<style lang="stylus" scoped>

.p-wrap {
    display flex
    flex-wrap wrap
    .edimg {
        width: 324px;
        height: 324px;
        border: 1px solid #d1d1d1;
        flex: 0 1 324px;
    }
    .btns {
        flex: 1 1 100%;
        padding: 26px 0 30px 0;
        text-align: left;
        position relative
        >span {
            color: #999;
            top: 34px;
            position: absolute;
            left: 100px;
        }
    }
    .p-r {
        width 324px
        height 324px
        line-height 324px
        vertical-align middle
        overflow hidden
        position relative
        * {
            user-select none
        }
        .bg, .edit-img  {
            left 0
            right 0
            top 0
            bottom 0
            height auto
            width auto
            max-width 324px
            max-height 324px
        }
        .bg {
            // height: 100%;
            position: absolute;
            opacity: 0.5;
            z-index: 0;
        }
        .edit-img {
            // clip: rect(47px 180px 121px 106px);
            // height: 100%;
            position: absolute;
        }
        .rect {
            width: 180px;
            height: 180px;
            border: 1px solid #fff;
            z-index: 10;
            zoom: 1;
            cursor: move;
            position absolute

            width: 74px;
            height: 74px;
            top: 46px;
            left: 105px;
            .zoom {
                position absolute
                width: 6px;
                height: 6px;
                right: -1px;
                bottom: -1px;
                border: 1px solid #fff;
                cursor: nw-resize;
                background: #000;
                opacity: 0.8;
                overflow: hidden;
            }
        }
    }
    .show-img {
        flex 1 1 auto;
        margin-left 40px
        padding-left 40px
        border-left 1px solid #ccc
        text-align left
        .big-pho, .sma-pho {
            overflow hidden
            position relative
            margin 20px 0 11px 0
            border 1px solid #ccc
            img {
                position relative
            }
        }
        .big-pho {
            width 180px
            height 180px
        }
        .sma-pho {
            width 40px
            height 40px
        }
        p {
            color #333
            font-size 13px
        }
        .p-t {
            color #999
            font-size 12px
        }
    }
    .s-btn {
        text-align: left;
        margin-top: 40px;
        flex 1 1 100%
        * {
            margin-right 20px
        }
    }
}

</style>
