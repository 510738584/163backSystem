<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/product">商品管理</el-menu-item>
    <el-menu-item index="/params">规格参数</el-menu-item>
    <el-menu-item index="/ad">广告管理</el-menu-item>
    <el-menu-item index="/user" class="user">
      <span class="username">{{ userInfo.loginId }}</span>
      <span class="user-btn">
        <el-button @click="loginOut">退出登录</el-button>
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeIndex: '/',
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  methods: {
    handleSelect() {},
    loginOut() {
      this.$store.commit('user/setUser', {})
      localStorage.removeItem('token')
      this.$router.push({
        name: 'Login',
      })
    },
  },
}
</script>

<style scoped lang="less">
.clear::after {
  display: block;
  clear: both;
  content: '';
}
.user {
  float: right;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  .username {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #fff;
    border-radius: 50%;
    text-align: center;
    overflow: hidden;
  }
  .user-btn {
    display: inline-block;
  }
}
</style>
