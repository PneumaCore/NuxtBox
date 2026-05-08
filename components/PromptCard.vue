<script setup>
import { ref } from 'vue'

const props = defineProps({
  prompt: {
    type: Object,
    required: true
  }
})

defineEmits(['delete'])

const { copyToClipboard } = usePrompts()
const copied = ref(false)

const handleCopy = async () => {
  const success = await copyToClipboard(props.prompt.prompt)
  if (success) {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors">
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="text-lg font-semibold text-white">{{ prompt.title }}</h3>
        <span class="inline-block px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded mt-1">
          {{ prompt.category }}
        </span>
      </div>
      <button
        @click="handleCopy"
        class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
        :title="copied ? 'Copied!' : 'Copy prompt'"
      >
        <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
    <p class="text-gray-300 text-sm mb-4 line-clamp-3">{{ prompt.prompt }}</p>
    <div class="flex justify-between items-center">
      <span class="text-xs text-gray-500">{{ formatDate(prompt.createdAt) }}</span>
      <button
        @click="$emit('delete', prompt.id)"
        class="text-red-400 hover:text-red-300 text-sm transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>
