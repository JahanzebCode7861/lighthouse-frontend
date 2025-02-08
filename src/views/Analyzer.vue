<template>
  <div>
    <h1>Website Performance Analyzer</h1>
    <input v-model="url" placeholder="Enter URL" />
    <select v-model="platform">
      <option value="mobile">Mobile</option>
      <option value="desktop">Desktop</option>
    </select>
    <button @click="analyze">Test Performance</button>
    <div v-if="score !== null">
      <h2>Performance Score: {{ score }}%</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      url: '',
      platform: 'mobile',
      score: null,
    };
  },
  created() {
    // Extract token from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      window.history.replaceState({}, document.title, window.location.pathname); // Remove token from URL
    }
  },
  methods: {
    async analyze() {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/analyze',
          { url: this.url, platform: this.platform },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        this.score = response.data;
      } catch (error) {
        console.error('Error analyzing URL:', error);
      }
    },
  },
};
</script>
