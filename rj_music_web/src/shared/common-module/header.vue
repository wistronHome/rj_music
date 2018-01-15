<template>
    <div class="rj-header">
        <h1>
            <a href="/#" hidefocus="true">网易云音乐</a>
        </h1>
        <div class="rj-login">
            <a @click="openLoginPanel">登录</a>
        </div>

        <Modal v-model="modal" width="500" :maskClosable="false" @onCancel="closeModel">
            <p slot="header" class="model-header">
                <Icon type="information-circled"></Icon>
                <span>{{formStatus === 'login' ? '登录' : '注册'}}</span>
            </p>
            <div style="text-align:center;padding-right: 45px;padding-top: 15px;">
                <Form ref="formCustom" :model="formCustom" :label-width="80">
                    <FormItem v-for="item in formColumn" :label="item.label" :prop="item.prop">
                        <i-input v-if="item.type === 'password'" type="password" v-model="formCustom[item.prop]"></i-input>
                        <i-input v-else v-model="formCustom[item.prop]"></i-input>
                    </FormItem>
                    <FormItem>
                        <p class="err-tip"><Icon style="margin-right: 5px;" type="android-alert"></Icon>错误信息</p>
                        <Button type="primary" long @click="handleSubmit">{{formStatus === 'login' ? '登录' : '注册'}}</Button>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" class="model-footer"
                 :style="{textAlign: formStatus === 'register' ? 'left' : 'right'}">
                <a v-if="formStatus === 'register'" @click="changeFormStatus('login')">返回登录</a>
                <a v-else @click="changeFormStatus('register')">没有账号？免费注册</a>
            </div>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                modal: false,
                formColumn: [
                    { label: '账号', prop: 'userCode', type: 'input' },
                    { label: '密码', prop: 'password', type: 'password' },
                ],
                formCustom: {
                    userCode: '',
                    password: ''
                },
                formStatus: 'login'
            }
        },
        methods: {
            openLoginPanel() {
                this.modal = true;
            },
            handleSubmit() {
                console.log(this.formCustom)
            },
            changeFormStatus(type) {
                this.formStatus = type;
                if (this.formStatus === 'login') {
                    this.formColumn = [
                        { label: '账号', prop: 'userCode', type: 'input' },
                        { label: '密码', prop: 'password', type: 'password' },
                    ];
                    this.formCustom = {
                        userCode: '',
                        password: ''
                    }
                } else {
                    this.formColumn = [
                        { label: '账号', prop: 'userCode', type: 'input' },
                        { label: '密码', prop: 'password', type: 'password' },
                        { label: '确认密码', prop: 'rePassword', type: 'password' }
                    ];
                    this.formCustom = {
                        userCode: '',
                        password: '',
                        rePassword: ''
                    }
                }
            },
            closeModel() {
                this.formCustom = null;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $radius = 4px
    .rj-header {
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
                width: 28px;
                color: #999;
                &:hover {
                    color #bbbec4;
                    text-decoration underline;
                }
            }
        }
    }
    .ivu-modal-header {
        padding 0;
        background #333
        border-top-left-radius $radius
        border-top-right-radius $radius
        .model-header {
            color #f3f3f3
            margin 8px 10px
        }

    }
    .ivu-modal-footer {
        padding 0
        .model-footer {
            padding 12px 18px
            background rgb(247, 247, 247)
            border-bottom-left-radius $radius
            border-bottom-right-radius $radius
        }
    }
    .ivu-modal-close {
        top 3px
    }
    .err-tip {
        position: absolute;
        top: -28px;
        left: 8px;
        color: rgb(227, 50, 50);
    }
</style>
