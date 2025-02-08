<template>
  <div>
    <h1>Login with Google</h1>
    <button @click="loginWithGoogle">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    loginWithGoogle() {
      window.location.href = 'http://localhost:8000/api/auth/google';
    },
  },
});
</script>