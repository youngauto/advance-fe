<template>
    <div class="login" @keydown.enter="handleLogin">
        <div class="login-con">
        <Card icon="log-in" title="欢迎登录" :bordered="false">
            <div class="form-con">
            <login-form @on-success-valid="handleSubmit"></login-form>
            <p class="login-tip">输入任意用户名和密码即可登录</p>
            </div>
        </Card>
        </div>
    </div>
</template>
<script>
import Component from '@/components'
import { mapActions } from 'vuex'
export default {
    components: {
        LoginForm: Component.LoginForm
    },
    methods: {
        ...mapActions([
            'handleLogin'
        ]),
        handleSubmit (user) {
            // 显示加载中
            this.$Spin.show();
            this.handleLogin(user).then((res) => {                
                this.$Spin.hide();
                this.$router.push('/home')
            })
        }
    }
}
</script>
<style lang="less">
.login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/sunrise.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>

