<template>
    <div class="rj-header">
        <h1>
            <a href="/#" hidefocus="true">网易云音乐</a>
        </h1>
        <Menu class="c-mm" mode="horizontal" @on-select="menuSelect" :theme="'dark'">
            <MenuItem name="find"><span>发现音乐</span></MenuItem>
            <MenuItem name="my"><span>我的音乐</span></MenuItem>
        </Menu>

        <div class="rj-login">
            <dropdown v-if="loginUser" style="text-align: left;"  @on-click="handleDropMenuClick">
                <a href="javascript:void(0)">
                    <avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                    <icon type="arrow-down-b"></icon>
                </a>
                <dropdown-menu slot="list">
                    <dropdown-item name="home"><Icon size="14" type="person"></Icon><span class="ava-menu-span">个人主页</span></dropdown-item>
                    <dropdown-item name="message"><Icon size="14" type="email"></Icon><span class="ava-menu-span">我的消息</span></dropdown-item>
                    <dropdown-item name="musician"><Icon size="14" type="email"></Icon><span class="ava-menu-span">成为音乐人</span></dropdown-item>
                    <dropdown-item name="upload"><Icon size="14" type="email"></Icon><span class="ava-menu-span">上传音乐</span></dropdown-item>
                    <dropdown-item name="setting"><Icon size="14" type="ios-gear"></Icon><span class="ava-menu-span">个人设置</span></dropdown-item>
                    <dropdown-item name="logout"><Icon size="14" type="log-out"></Icon><span class="ava-menu-span">退出</span></dropdown-item>
                </dropdown-menu>
            </dropdown>
            <a v-else @click="openLoginPanel">登录</a>
        </div>

        <AutoComplete
            class="c-auto-com"
            icon="ios-search"
            v-model="searchModel"
            @on-select="selectEvent"
            @on-search="searchEvent"
            placeholder="音乐/歌单/视频/歌手/用户">
            <p v-if="searchModel" class="c-note">搜"{{searchModel}}"的结果 &nwarhk;</p>
            <div v-if="searchModel" class="rap">
                <div class="rap-item" v-if="searchList && searchList.musics.length > 0">
                    <h3>
                        <Icon type="ios-musical-notes"></Icon>
                        <span>单曲</span>
                    </h3>
                    <div class="rap-body">
                        <Option v-for="(item, index) in searchList.musics" :value="item._id" :key="index">
                            <span class="demo-auto-complete-title">{{ item.name }}</span>
                        </Option>
                    </div>
                </div>
            </div>
        </AutoComplete>

        <div class="red-line">

        </div>
        <Modal v-model="modal" width="500" :maskClosable="false" @onCancel="closeModel">
            <p slot="header" class="model-header">
                <Icon type="information-circled"></Icon>
                <span>{{formStatus === 'login' ? '登录' : '注册'}}</span>
            </p>
            <div style="text-align:center;padding-right: 45px;padding-top: 15px;">
                <Form v-show="formStatus === 'register'" ref="registerFormData" :rules="registerFormRules" :model="registerFormData" :label-width="80">
                    <!-- 必须绑定:key -->
                    <form-item v-for="(item, index) in registerFormColumn"
                                :key="'key' + index"
                                :label="item.label"
                                :prop="item.prop">
                        <i-input v-if="item.type === 'password'" type="password" v-model="registerFormData[item.prop]"></i-input>
                        <i-input v-else v-model="registerFormData[item.prop]"></i-input>
                    </form-item>

                    <FormItem>
                        <p v-show="errorMsg" class="err-tip"><Icon style="margin-right: 5px;" type="android-alert"></Icon>{{errorMsg}}</p>
                        <Button type="primary" long @click="handleSubmit">注册</Button>
                    </FormItem>
                </Form>
                <Form v-show="formStatus === 'login'" ref="loginFormData" :model="loginFormData" :label-width="80">
                    <form-item v-for="(item, index) in loginFormColumn"
                               :key="'key' + index"
                               :label="item.label"
                               :prop="item.prop">
                        <i-input v-if="item.type === 'password'" type="password" v-model="loginFormData[item.prop]"></i-input>
                        <i-input v-else v-model="loginFormData[item.prop]"></i-input>
                    </form-item>

                    <FormItem>
                        <p v-show="errorMsg" class="err-tip"><Icon style="margin-right: 5px;" type="android-alert"></Icon>{{errorMsg}}</p>
                        <Button type="primary" long @click="handleSubmit">登录</Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="model-footer"
                 :style="{textAlign: formStatus === 'register' ? 'left' : 'right'}">
                <a v-if="formStatus === 'register'" @click="changeFormStatus('login', 'registerFormData')">返回登录</a>
                <a v-else @click="changeFormStatus('register', 'loginFormData')">没有账号？免费注册</a>
            </div>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import { CommonUtil } from '../../core/utils/common-util'
    import DropdownItem from "../../../node_modules/iview/src/components/dropdown/dropdown-item";
    import DropdownMenu from "../../../node_modules/iview/src/components/dropdown/dropdown-menu";
    import Avatar from "../../../node_modules/iview/src/components/avatar/avatar";
    import Dropdown from "../../../node_modules/iview/src/components/dropdown/dropdown";
    import { setTimeout, clearTimeout } from 'timers';
    let timer;
    export default {
        created() {
            this.loginUser = CommonUtil.getLoginUser();
            if (this.loginUser) {
                this.$userService.getUserPls(CommonUtil.getLoginUser()).then(result => {
                    this.firstPlId = result.data.createdPls[0]._id;
                });
            }
        },
        components: {Dropdown, Avatar, DropdownMenu, DropdownItem},
        data() {
            return {
                modal: false,
                firstPlId: null,
                searchModel: '',
                searchList: null,
                registerFormColumn: [
                    { label: '账号', prop: 'userCode', type: 'input' },
                    { label: '密码', prop: 'password', type: 'password' },
                    { label: '确认密码', prop: 'rePassword', type: 'password' }
                ],
                registerFormData: {
                    userCode: '',
                    password: '',
                    rePassword: ''
                },
                registerFormRules: {
                    userCode: [
                        {
                            validator: (rule, value, cb) => {
                                if (!value) {
                                    cb(new Error('账号不能为空'));
                                } else if (value.length > 20) {
                                    cb(new Error('账号长度不能超过20个字符'));
                                } else if (!/^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                                    cb(new Error('只能输入中文、英文、数字、下划线且不能以下划线开头'));
                                } else {
                                    cb();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    password: [
                        {
                            validator: (rule, value, cb) => {
                                if (!value) {
                                    cb(new Error('请输入密码'));
                                } else if (value.length < 6 || value.length > 14) {
                                    cb(new Error('密码长度为6-14位'))
                                } else {
                                    if (this.registerFormData.rePassword !== '') {
                                        // 对第二个密码框单独验证
                                        this.$refs.registerFormData.validateField('rePassword');
                                    }
                                    cb();
                                }
                            }, trigger: 'change'
                        }
                    ],
                    rePassword: [
                        {
                            validator: (rule, value, cb) => {
                                if (!value) {
                                    cb(new Error('请输入密码'));
                                } else if (value !== this.registerFormData.password) {
                                    cb(new Error('两次密码输入不一致'))
                                } else {
                                    cb();
                                }
                            }, trigger: 'change'
                        }
                    ]
                },
                loginFormColumn: [
                    { label: '账号', prop: 'userCode', type: 'input' },
                    { label: '密码', prop: 'password', type: 'password' },
                ],
                loginFormData: { userCode: '', password: '' },

                formStatus: 'login',
                errorMsg: '',
                loginUser: null
            }
        },
        methods: {
            openLoginPanel() {
                this.modal = true;
            },
            handleSubmit() {
                this.errorMsg = '';
                if (this.formStatus === 'login') {
                    this.$userService.login(this.loginFormData.userCode, this.loginFormData.password).then(result => {
                        CommonUtil.saveLoginUser(result.data);
                        this.loginUser = result.data._id;
                        this.closeModel();
                    }, failed => { this.errorMsg = failed.msg });
                } else {
                    this.$refs.registerFormData.validate(valid => {
                        if (valid) {
                            this.$userService.register(this.registerFormData.userCode, this.registerFormData.password).then(result => {
                                CommonUtil.saveLoginUser(result.data);
                                this.loginUser = result.data._id;
                                this.closeModel();
                            }, failed => { this.errorMsg = failed.msg });
                        } else {
                            this.errorMsg = '请填写正确信息';
                        }
                    })
                }
            },
            searchEvent(param) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    if (!param) {
                        this.searchList = null;
                    } else {
                        this.$musicService.commonSearch(param).then(result => {
                            this.searchList = result.data;
                        });
                    }
                }, 500);
            },
            menuSelect(name) {
                if (name === 'my') {
                    this.$router.push({ path: '/my/music/playlist', query: { id: this.firstPlId } });
                }
            },
            selectEvent(param) {
                this.searchModel = null;
                this.$router.push({ path: '/song', query: { id: param }});
            },
            changeFormStatus(type, name) {
                this.$refs[name].resetFields();
                this.errorMsg = '';
                this.formStatus = type;
            },
            /**
             * 关闭模态框
             */
            closeModel() {
                this.$refs.loginFormData.resetFields();
                this.$refs.registerFormData.resetFields();
                this.modal = false;
            },
            /**
             * 退出登录
             */
            handleDropMenuClick(type) {
                if (type === 'home') {
                    this.$router.push({path: `/user/home`, query: { id: this.loginUser }});
                } else if (type === 'setting') {
                    this.$router.push({path: '/user/setting', query: { id: this.loginUser }})
                } else if (type === 'upload') {
                    this.$router.push({path: `/upload`});
                }
                if (type === 'logout') {
                    CommonUtil.logout();
                    this.loginUser = null;
                    this.$router.push({path: '/'});
                }
            },
            changeRouter(params) {
                this.$router.push({ path: params, query: { id: this.loginUser } });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    $radius = 4px
    .rj-header {
        padding 0 30px
        h1 {
            float: left;
            width: 176px;
            background-position: 0 0;
            background url("../../assets/topbar.png") no-repeat;
            a {
                float: left;
                width: 157px;
                height: 100%;
                padding-right: 20px;
                text-indent: -9999px
            }
        }
        .rj-login {
            float right;
            a {
                display: block;
                color: #999;
                &:hover {
                    color #bbbec4;
                    text-decoration underline;
                }
            }
        }
        .red-line {
            position: absolute;
            top: 65px;
            left: 0;
            right: 0;
            z-index: 999;
            height: 5px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background-color: #c20c0c;
            border-bottom: 1px solid #a40011;
        }
    }

    .err-tip {
        position: absolute;
        top: -28px;
        left: 8px;
        color: rgb(227, 50, 50);
    }
    // .ivu-select-dropdown {
    //     background-color #242424
    //     text-align left
    // }
    // .ivu-dropdown-item {
    //     color #bbb6b6
    //     &:hover {
    //         background-color #3a3a3a
    //     }
    // }
    .ava-menu-span {
        margin-left 5px
    }
    .c-auto-com {
        width:240px;
        float: right;
        margin: 16px 25px 0 0;
        text-align: left;
        .ivu-select-dropdown {
            margin-bottom 0 !important
        }
        .c-note {
            line-height 17px;
            padding 4px 10px 7px 10px
            border-bottom 1px solid #e2e2e2;
            color #666;
            font-size 12px
        }
        .rap {
            &:nth-child(odd) {
                .rap-body {
                    background #f9f8f8
                }
            }
            .rap-item {
                display flex
                h3 {
                    flex 0 1 62px
                    font-size normal
                    line-height 17px
                    padding 10px 0 0 10px
                    span {
                        font-size 12px
                        font-weight 400
                    }
                }
                .rap-body {
                    flex 1 1 auto
                    border-left 1px solid #e2e2e2
                    border-bottom 1px solid #e2e2e2
                }
            }
        }
    }
    .c-mm {
        position absolute
        margin-left 200px
        line-height 64px
        height 64px
        background #242424
    }
</style>
