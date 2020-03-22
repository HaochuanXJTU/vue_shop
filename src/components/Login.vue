<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item label="" prop="username" >
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" ></el-input>
                </el-form-item>
                <el-form-item label="" prop="password" >
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <el-form-item label="" class="buts">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="infor" @click="resetloginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 ', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetloginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginForm)
          console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.error('登录失败')
          }
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #aacdbf;
    height: 100%;
}

.login_box{
    background-color: #ffffff;
    width: 450px;
    height: 300px;
    border-radius: 20px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box{
        height: 130px;
        width: 130px;
        border: 3px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.buts{
    display: flex;
    justify-content: flex-end;
}

.login_form{
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

</style>
