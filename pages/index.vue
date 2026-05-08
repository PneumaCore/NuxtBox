<script setup>
const { prompts, searchQuery, filteredPrompts, addPrompt, deletePrompt } = usePrompts()

const handleAddPrompt = (newPrompt) => {
  addPrompt(newPrompt)
}

const handleDeletePrompt = (id) => {
  deletePrompt(id)
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-2">NuxtBox</h1>
      <p class="text-gray-400">AI Prompt Saver - Save, organize, and copy your prompts instantly</p>
    </header>

    <div class="grid lg:grid-cols-3 gap-8">
      <aside class="lg:col-span-1 space-y-6">
        <PromptForm @submit="handleAddPrompt" />
        <SearchBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />
      </aside>

      <main class="lg:col-span-2">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-white">My Prompts</h2>
          <span class="text-gray-400 text-sm">{{ filteredPrompts.length }} prompt(s)</span>
        </div>

        <div v-if="filteredPrompts.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No prompts found</p>
        </div>

        <div v-else class="space-y-4">
          <PromptCard
            v-for="prompt in filteredPrompts"
            :key="prompt.id"
            :prompt="prompt"
            @delete="handleDeletePrompt"
          />
        </div>
      </main>
    </div>
  </div>
</template>
