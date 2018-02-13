<template>
    <div class="wrap">
        <div style="margin-bottom: 20px" class="record-title">
            <h3>个人设置</h3>
        </div>
        <div style="display: flex;">
            <Form v-if="user" ref="user" :model="user" :label-position="'left'" :rules="formRules" :label-width="60" style="flex: 0 1 400px">
                <FormItem label="昵称：" prop="nickName">
                    <Input v-model="user.nickName"></Input>
                </FormItem>
                <FormItem label="介绍：" prop="description">
                    <Input v-model="user.description" type="textarea" :rows="6"></Input>
                </FormItem>
                <FormItem label="性别：" style="text-align: left">
                    <RadioGroup v-model="user.sex">
                        <Radio :label="1">男</Radio>
                        <Radio :label="2">女</Radio>
                        <Radio :label="3">未知</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="生日：" prop="birthday">
                    <DatePicker v-model="user.birthday" :format="'yyyy年 MM月 dd日'" :clearable="false" type="date" style="width: 100%"></DatePicker>
                </FormItem>
                <FormItem label="地区：">
                    <Cascader ></Cascader>
                </FormItem>
                <FormItem >
                    <Button @click="handleSubmit" type="primary" long>保存</Button>
                </FormItem>
            </Form>
            <div class="p-wrap" v-if="user">
                <img width="140" height="140" :src="user.photo || defaultPhoto" alt="">
                <a @click="routerToPhoto">更换头像</a>
            </div>
        </div>

    </div>
</template>

<script>
import { CommonUtil } from '../../core/utils/common-util'

export default {
    created() {
        this.$userService.getUserById(this.$route.query.id).then(result => {
            this.user = result.data;
            let date = new Date();
            date.setFullYear(1990, 0, 1)
            this.user.birthday = date;
            console.log(this.user)
        });
    },
    data() {
        return {
            cUserId: CommonUtil.getLoginUser(),
            user: null,
            defaultPhoto: "http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180",
            formRules: {
                nickName: [
                    {
                        validator: (rule, value, cb) => {
                            if (!value) {
                                cb(new Error('昵称不能为空'));
                            } else if (value.length < 4 || value.length > 30) {
                                cb(new Error('昵称为4-30个字'));
                            } else if (!/^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                                cb(new Error('只能输入中文、英文、数字、下划线且不能以下划线开头'));
                            } else {
                                this.$userService.validateNickName(this.$route.query.id, value).then(result => {
                                    if (result.data) {
                                        cb();
                                    } else {
                                        cb(new Error('昵称已被使用'));
                                    }
                                })
                            }
                        }, trigger: 'blur'
                    }
                ],
                description: [
                    {
                        validator: (rule, value, cb) => {
                            if (value && value.length > 140) {
                                cb(new Error('最多只能输入140个字'));
                            } else {
                                cb();
                            }
                        }
                    }
                ]
            }
        }
    },
    methods: {
        handleSubmit(event) {
            this.$refs.user.validate(valid => {
                if (valid) {
                    console.log(this.user)
                    let { _id, nickName, description, sex, birthday } = this.user;
                    this.$userService.modifyUser({ _id, nickName, description, sex, birthday }).then(result => {
                        this.$Message.success('修改成功');
                    }, failed => { this.$Message.error(failed.msg) });
                } else {
                    this.$Message.error('请填写完整信息');
                }
            });
        },
        routerToPhoto() {
            this.$router.push({path: '/user/photo', query: { id: this.cUserId }});
        }
    }
}
</script>

<style lang="stylus" scoped>
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
