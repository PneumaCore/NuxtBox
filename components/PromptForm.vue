<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const form = ref({
  title: '',
  prompt: '',
  category: 'development'
})

const handleSubmit = () => {
  emit('submit', { ...form.value })
  form.value = {
    title: '',
    prompt: '',
    category: 'development'
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-gray-800 rounded-lg p-6 border border-gray-700">
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-medium mb-2">Title</label>
      <input
        v-model="form.title"
        type="text"
        required
        class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
        placeholder="Enter prompt title"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-300 text-sm font-medium mb-2">Prompt</label>
      <textarea
        v-model="form.prompt"
        required
        rows="4"
        class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
        placeholder="Enter your AI prompt"
      ></textarea>
    </div>
    <div class="mb-6">
      <label class="block text-gray-300 text-sm font-medium mb-2">Category</label>
      <select
        v-model="form.category"
        class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
      >
        <option value="development">Development</option>
        <option value="writing">Writing</option>
        <option value="marketing">Marketing</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
        <option value="other">Other</option>
      </select>
    </div>
    <button
      type="submit"
      class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
    >
      Save Prompt
    </button>
  </form>
</template>
