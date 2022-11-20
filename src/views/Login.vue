<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">商城后台管理系统</span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleTabsClick" stretch>
        <el-tab-pane label="登录" name="login">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
            ref="ruleForm"
          >
            <el-form-item label="用户名" prop="loginId">
              <el-input type="text" v-model="ruleForm.loginId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="loginPwd">
              <el-input type="password" v-model="ruleForm.loginPwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form
            :model="register"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
            label-position="left"
            ref="register"
          >
            <el-form-item label="用户名" prop="loginId">
              <el-input type="text" v-model="register.loginId"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="loginPwd">
              <el-input type="password" v-model="register.loginPwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="configPassword">
              <el-input
                type="password"
                v-model="register.configPassword"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitRegister('register')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import * as adminServ from '@/api/adminServ'
export default {
  data() {
    const checkUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else if (value.length < 6) {
        callback(new Error('用户名长度不能小于6'))
      } else {
        callback()
      }
    }
    const checkPassWord = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不为空'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不得小于6'))
      } else {
        callback()
      }
    }
    const checkConfigPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      }
      if (value !== this.register.loginPwd) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        loginId: '',
        loginPwd: '',
      },
      register: {
        loginId: '',
        loginPwd: '',
        configPassword: '',
      },
      rules: {
        loginId: [{ validator: checkUserName, trigger: 'blur' }],
        loginPwd: [{ validator: checkPassWord, trigger: 'blur' }],
        configPassword: [{ validator: checkConfigPassword, trigger: 'blur' }],
      },
      activeName: 'login',
      activeTab: 'login',
    }
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          adminServ.login(this.ruleForm).then((r) => {
            if (r) {
              this.$message({
                message: '登录成功',
                type: 'success',
              })
              this.$store.commit('user/setUser', r.data)
              localStorage.setItem('token', JSON.stringify(r.data))
              this.$router.push({
                name: 'Home',
              })
            } else {
              this.$message.error('用户名密码错误')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitRegister(form) {
      this.$refs[form].validate((valid) => {
        const registerObj = {
          loginId: this.register.loginId,
          loginPwd: this.register.loginPwd,
        }
        adminServ.register(registerObj).then((r) => {
          this.$message({
            message: '注册成功',
            type: 'success',
          })
          this.activeName = 'login'
        })
      })
    },
    handleTabsClick(tab) {
      this.activeTab = tab.name
    },
  },
  computed: {},
}
</script>

<style scoped lang="less">
.box-card {
  width: 600px;
  margin: 200px auto;
  text-align: center;
  .header-title {
  }
}
</style>
