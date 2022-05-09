# Vue3 `hooks`使用-抽离`useUser`

## 项目搭建

### 1.首先我们初始化一个 `vite + vue3` 项目

```sh
pnpm create vite
```
选择 `vue3 + ts`。项目名自定义。

### 2.安装 `vue-router` 和 `elment-plus`

```sh
pnpm i vue-router element-plus
```
创建`router`文件夹 并在下面创建 `index.ts`

```ts
import {createWebHashHistory, createRouter, RouteRecordRaw} from "vue-router";
import Index from "../views/index.vue";

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/login',
        component: () => import('../views/login.vue')
    }
] as RouteRecordRaw[]

const router = createRouter({
    routes: routes,
    history: createWebHashHistory()
})

export default router;

```
在`mian.ts`中引入 `router` 和 `elementPlus`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';

createApp(App).use(ElementPlus).use(router).mount('#app')
```
在 `views` 下面创建 `index.vue` 和 `login.vue`

```vue
<!-- index.vue -->
<template>
  <div>I am Index</div>
</template>

<script lang='ts' setup>
</script>

```
```vue
<template>
  登录界面
</template>

<script lang='ts' setup>

</script>
```
改造 `App.vue` 添加 `router-view` 和 `router-link`

```vue
<script setup lang="ts">
</script>

<template>

  <router-link class="link" to="/login">login</router-link>

  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.link {
  color: green;
  margin-left: 30px;
}
</style>
```
## 简单编写登录功能

利用`elementPlus`创建表单,然后创建登录功能.以前我们的逻辑是下面这么写的:

```vue
<template>
  <div v-if="loggin">
  <p>welcome {{user?.username}}</p>
  <a href="#" @click.prevent="logout">logout</a>
  </div>
  <el-form v-if="!loggin" :model="loginModal">
      <el-form-item label="username" prop="username">
          <el-input v-model="loginModal.username" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
          <el-input v-model="loginModal.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="login">login</el-button>
      </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>

    //登录模型
    const loginModal = ref({
        username: '',
        password: '',
    })
    //用户数据 初始为空
    const user = ref();
    //登录操作
    const login = async () => {
        user.value = {id: 1, username: loginModal.value.username};
        ElMessage.success('登录成功');
    }
    //是否登录属性
    const loggin = computed(() => user.value?.id);
    //注销操作
    const logout = async () => {
        user.value = null;
        ElMessage.success('注销成功');
    }
</script>
```
## 抽离登录用户逻辑 

上面的逻辑很简单，这就是按照我们之前`Vue2`的方式去写。但是如果用户注销`logout`，用户`user`信息，其他组件要使用呢？这个时候我们就要进行逻辑抽离，一般来说UI组件抽离公共部门确实比较难，但是逻辑实现，还是可以抽离的。我们需要抽离`user`,`login` 等信息 和 操作。

- 按照`Vue2 `之前的方法，我们一般使用`Vuex`, 将用户信息等操作放在一个全局的store进行数据管理和获取。无疑，这种方法是OK的。
- 但是`Vue3` 现在`Composition API` 的出现，给了我们一种新的实现方式去抽离公共逻辑，这种在`React`中叫做` Hook`.

我们在src下创建 `composables` 文件夹 新建 `useUser.ts`,我们着手抽离登录逻辑 和 用户信息。

```ts
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";

const user = ref()

export const useUser = () => {

    const loginModal = ref({
        username: '',
        password: '',
    })
    
    const login = async () => {
        user.value = {id: 1, username: loginModal.value.username};
        ElMessage.success('登录成功');
    }
    
    const loggin = computed(() => user.value?.id);
    
    const logout = () => {
        user.value = null;
        ElMessage.success('注销成功');
    }

    return {
        user,
        login,
        loggin,
        logout,
        loginModal
    }
}
```
改造一下 之前的`login.vue`

```vue
<template>
  <div v-if="loggin">
  <p>welcome {{user?.username}}</p>
  <a href="#" @click.prevent="logout">logout</a>
  </div>
  <el-form v-if="!loggin" :model="loginModal">
      <el-form-item label="username" prop="username">
          <el-input v-model="loginModal.username" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
          <el-input v-model="loginModal.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="login">login</el-button>
      </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>

import { useUser } from '../composables/useUser';

const {user, loginModal, login, loggin, logout} = useUser();

</script>

```
现在的文件看起来就清爽多了，并且我们完成了逻辑的分离。

比如我们可以在改造一下`App.vue` 我们这样就简单的完成了组件之间状态数据的共享，并且他还是响应式的。这就是`Vue3 Composition` 带来的好处。

```vue
<script setup lang="ts">
import { useUser } from './composables/useUser';

const {loggin} = useUser();

</script>

<template>

  <router-link v-show="!loggin" class="link" to="/login">login</router-link>

  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.link {
  color: green;
  margin-left: 30px;
}
</style>
```

我们也可以改造一下 `index.vue` 判断用户是否登录

```vue
<template>
  <div v-if="loggin">Weclome {{user.username}}</div>
  <div v-if="!loggin">please login</div>
</template>

<script lang='ts' setup>
import { useUser } from '../composables/useUser';

const { user, loggin } = useUser();

</script>
```
`Vue3 composition API + TS + Vite` 可以极大提升我们的开发体验。

## 3. 改进

这里介绍一个Vue 的工具库 叫做 Vue-use。这里提供了大量的工具方法，并且都是响应式的。非常方便。

```sh
pnpm i @vueuse/core
```

这里我们使用里面的 `useStorage` 做一下数据的本地持久化. 下面是改写的 `useUser.ts` 这样我们的数据就可以保存到`localstorage`里面了 刷新一下 用户信息还在。

```ts
import { StorageSerializers, useStorage } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";

//数据持久化
const user = useStorage('user', null, undefined, { 
    serializer: StorageSerializers.object
});

export const useUser = () => {

    const loginModal = ref({
        username: '',
        password: '',
    })
    
    const login = async () => {
        user.value = {id: 1, username: loginModal.value.username};
        ElMessage.success('登录成功');
    }
    
    const loggin = computed(() => user.value?.id);
    
    const logout = () => {
        user.value = null;
        ElMessage.success('注销成功');
    }

    return {
        user,
        login,
        loggin,
        logout,
        loginModal
    }
}
```