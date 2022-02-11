<template>
  <Tabs type="card" v-model:active="tabActive" animated class="tab">
    <Tab title="登录" to="/login" name="Login">
      <Form @submit="loginHandle" class="login">
        <CellGroup inset>
          <Field
            v-model.trim="loginForm.username"
            name="用户名"
            left-icon="user-o"
            placeholder="用户名"
            autocomplete="off"
            :rules="[{ required: true, message: '用户名不合法' , validator: (value)=>value.length>=5 && value.length<20}]"
          />
          <Field
            v-model.trim="loginForm.password"
            type="password"
            autocomplete="off"
            name="密码"
            left-icon="description"
            placeholder="密码"
            :rules="[{ required: true, message: '密码不合法', validator: passwordCheck }]"
          />
        </CellGroup>
        <div style="margin: 16px;">
          <Button round block type="primary" native-type="submit"
          color="linear-gradient(to right, #fffbe8, #1989fa)">
            登录
          </Button>
        </div>
      </Form>
    </Tab>
    <Tab title="注册" to="/register" name="Register">
      <Form @submit="onSubmit" class="register">
        <CellGroup inset>
          <Field
            v-model.trim="registerForm.username"
            name="用户名"
            left-icon="user-o"
            placeholder="请输入用户名"
            autocomplete="off"
            :rules="[{ required: true, message: '用户名不合法' , validator: (value)=>value.length>=5 && value.length<20}]"
          />
          <Field
            v-model.trim="registerForm.password"
            type="password"
            autocomplete="off"
            name="密码"
            left-icon="description"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '密码不合法', validator: passwordCheck }]"
          />
          <Field
            v-model.trim="registerForm.checkPsd"
            type="password"
            autocomplete="off"
            name="密码"
            left-icon="guide-o"
            placeholder="请确认密码"
            :rules="[{ required: true, message: '密码不合法', validator: passwordCheck }]"
          />
        </CellGroup>
        <div style="margin: 16px;">
          <Button round block type="primary" color="linear-gradient(to right, #ff6034, #ee0a24)" native-type="submit">
            注册
          </Button>
        </div>
      </Form>
    </Tab>
  </Tabs>
</template>
<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { Tab, Tabs, Form, Field, CellGroup, Button, Toast } from 'vant'
  import { login, passwordCheck } from './index';
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter()
  const route = useRoute()

  const tabActive = ref(route.name)

  const loginForm = reactive({
    username: 'admin',
    password: '123456'
  })

  const registerForm = reactive({
    username: '',
    password: '',
    checkPsd: ''
  })
  
  


  const loginHandle = async function() {
    const { code, message, data } = await login(loginForm)
    if(code === 200) {
      Toast.success('登录成功')
      localStorage.setItem('token', data.token)
      router.push('/')
    }else {
      Toast.fail('登录失败' + message)
    }
  }
  
  const onSubmit = function () {
    if(registerForm.password === registerForm.checkPsd) {
      Toast.success('假装注册成功')
    } else {
      Toast.fail('2次密码不同')
    }
  }
  
</script>
<style lang="scss" scoped>
  .tab{
    background-color: skyblue;
    height: 100%;
    padding-top: 50%;
    :deep(.van-tabs__nav--card){
      color: #fff;
      background-color: skyblue;
      border: none;
    }
      
    :deep(.van-tab--card){
      color: #fff;
      border: none;
    }
    
    :deep(.van-tab__panel .van-cell-group--inset) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    :deep(.van-tab--card.van-tab--active){
      background-color: #fff;
      color: skyblue;
    }
  }

</style>