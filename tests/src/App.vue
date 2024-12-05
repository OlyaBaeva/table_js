<template>
  <div id="app">
    <nav>
      <button @click="$router.push('/test1')">Тест 1</button>
      <button @click="$router.push('/test2')">Тест 2</button>
      <button @click="$router.push('/test3')">Тест 3</button>
      <button @click="$router.push('/test4')">Тест 4</button>
      <button @click="$router.push('/test5')">Тест 5</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup(){
    const $router = useRouter();
    return {$router};
  }
};
</script>
