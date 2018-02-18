<template>
    <div class="wrap">
        <div style="margin-bottom: 20px" class="record-title">
            <h3>上传音乐</h3>
            <h4>Tip: 请将音乐文件以 "歌手名 - 歌曲名.mp3" 格式命名</h4>
        </div>

        <div style="display: flex;">
            <Form v-if="music" ref="music" :model="music" :rules="formRules" :label-position="'left'" :label-width="80" style="flex: 0 1 400px">
                <FormItem style="width: 100%">
                    <Upload accept="audio/mp3" action="/"
                            :before-upload="beforeSrcUpload">
                        <Button style="width: 340px;" :type="'default'" icon="ios-cloud-upload-outline" >上传音乐文件</Button>
                    </Upload>
                </FormItem>
                <FormItem label="歌曲名：" prop="name">
                    <Input v-model="music.name"></Input>
                </FormItem>
                <FormItem label="描述：" prop="description">
                    <Input v-model="music.description" type="textarea" :rows="4"></Input>
                </FormItem>
                <FormItem label="歌手：" prop="singer" style="text-align: left">
                    <AutoComplete
                        v-model="music.singer"
                        icon="ios-search"
                        :data="singers"
                        :transfer="true"
                        :clearable="true"
                        :filter-method="filterMethod"
                        placeholder="请填写歌手名称">
                    </AutoComplete>
                </FormItem>
                <FormItem >
                    <Button @click="handleSubmit" type="primary" long>确认</Button>
                </FormItem>
            </Form>
            <div class="p-wrap" v-if="music">
                <img width="140" height="140" :src="music.cover || defaultPhoto" alt="">
                <a @click="routerToPhoto">上传封面</a>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { CommonUtil } from '../../core/utils/common-util'

export default {
    data() {
        return {
            cUserId: CommonUtil.getLoginUser(),
            user: null,
            music: null,
            singers: [],
            formRules: {
                name: [
                    {
                        validator(rule, val, cb) {
                            if (!val) {
                                cb(new Error('此项为必填项'))
                            } else if (val.length > 32) {
                                cb(new Error('歌曲名不能超过10个字符'))
                            } else if (!/^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(val)) {
                                cb(new Error('只能输入中文、英文、数字、下划线且不能以下划线开头'));
                            } else {
                                cb();
                            }
                        }, trigger: 'blur'
                    }
                ]
            },
            defaultPhoto: "http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180",
        }
    },
    created() {
        this.music = {
            name: ''
        };
        this.$musicService.findSingers().then(result => {
            this.singers = result.data;
        });
    },
    methods: {
        handleSubmit(event) {
            this.$refs.music.validate(valid => {
                if (valid) {
                    if (!this.music.src) {
                        this.$Message.error('请选择要上传的音乐');
                    }
                    let formData = new FormData();
                    formData.append('name', this.music.name);
                    formData.append('uploader', this.cUserId);
                    formData.append('singer', this.music.singer);
                    formData.append('types', this.music.types);
                    formData.append('cover', this.music.cover);
                    formData.append('src', this.music.src);
                    this.$musicService.upload(formData).then(result => {
                        console.log(result);
                    });
                } else {
                    this.$Message.error('请填写完整信息');
                }
            });
        },
        routerToPhoto() {
            this.$router.push({path: '/user/photo', query: { id: this.cUserId }});
        },
        filterMethod (value, option) {
            return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        },
        beforeSrcUpload(file) {
            if (file.type !== 'audio/mp3') {
                this.$Notice.error({
                    title: '上传文件格式错误',
                    desc: '目前只支持mp3音乐文件~',
                    duration: 5
                });
                return false;
            }
            let _name = file.name;
            if (_name.includes('-')) {
                let str = _name.split('-');
                if (str.length === 2) {
                    this.music.singer = str[0].trim();
                    this.music.name = str[1].trim().replace('.mp3', '');
                }
            }
            this.music.src = file;
            return false;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>


