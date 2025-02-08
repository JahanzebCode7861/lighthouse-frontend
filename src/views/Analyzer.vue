<template>
  <div style="min-height: 100vh; background-color: #f7fafc; padding: 20px;">
    <div style="max-width: 800px; margin: 0 auto;">
      <!-- Analyzer Form -->
      <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 24px; margin-bottom: 20px;">
        <h1 style="font-size: 24px; font-weight: bold; color: #2d3748; margin-bottom: 16px;">Website Performance Analyzer</h1>
        
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
          <input
            v-model="url"
            placeholder="Enter website URL (e.g., https://example.com)"
            style="flex: 1; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; font-size: 16px; outline: none;"
          />
          <select
            v-model="platform"
            style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; font-size: 16px; outline: none;"
          >
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
          </select>
        </div>

        <button
          @click="analyze"
          :disabled="!url || loading"
          style="width: 100%; background-color: #4299e1; color: white; padding: 12px; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;"
          :style="{ backgroundColor: (!url || loading) ? '#cbd5e0' : '#4299e1' }"
        >
          {{ loading ? 'Analyzing...' : 'Analyze Performance' }}
        </button>
      </div>

      <!-- Loading Animation -->
      <div v-if="loading" style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 24px; text-align: center;">
        <img src="https://seofrequency.com/seositecheckup/assets/pre-loader/custom_lg.gif" alt="Loading..." style="margin-bottom: 16px;" />
        <div style="font-weight: bold; color: #4a5568; margin-bottom: 8px;">
          <span>{{ progress }} / 100 Steps Completed</span>
        </div>
        <div style="background-color: #e2e8f0; border-radius: 4px; height: 20px; overflow: hidden;">
          <div
            :style="{ width: progress + '%', backgroundColor: '#4299e1', height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' }"
          ></div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="score !== null && !loading" style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 24px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <h2 style="font-size: 20px; font-weight: bold; color: #2d3748;">Performance Score</h2>
            <p style="color: #718096;">{{ url }}</p>
          </div>
          <div
            style="width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;"
            :style="{ backgroundColor: score >= 90 ? '#c6f6d5' : score >= 50 ? '#fed7d7' : '#fed7d7', color: score >= 90 ? '#22543d' : score >= 50 ? '#742a2a' : '#742a2a' }"
          >
            {{ score }}%
          </div>
        </div>
       
      </div>

      <!-- Error Message -->
      <div v-if="error" style="background: #fff5f5; color: #c53030; padding: 16px; border-radius: 6px; margin-top: 16px;">
        {{ error }}
      </div>
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
      error: null,
      loading: false,
      progress: 0,
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  },
  methods: {
    async analyze() {
      try {
        this.loading = true;
        this.error = null;
        this.progress = 0;

        // Simulate progress (replace with actual API call logic)
        const interval = setInterval(() => {
          this.progress += 10;
          if (this.progress >= 100) clearInterval(interval);
        }, 500);

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
        this.error = 'Failed to analyze website. Please check the URL and try again.';
      } finally {
        this.loading = false;
        this.progress = 0;
      }
    },
  },
};
</script>