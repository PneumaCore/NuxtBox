export const usePrompts = () => {
  const prompts = useState('prompts', () => [
    {
      id: 1,
      title: 'Code Review Expert',
      prompt: 'You are a senior software engineer. Review the following code for bugs, performance issues, and best practices. Provide suggestions for improvement.',
      category: 'development',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Creative Writing Assistant',
      prompt: 'You are a creative writer. Help me craft compelling stories with engaging characters, vivid descriptions, and meaningful plot developments.',
      category: 'writing',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Marketing Strategist',
      prompt: 'You are a marketing expert. Analyze my product and create a comprehensive marketing strategy including target audience, channels, and key messaging.',
      category: 'marketing',
      createdAt: new Date().toISOString()
    }
  ])

  const searchQuery = useState('searchQuery', () => '')

  const filteredPrompts = computed(() => {
    if (!searchQuery.value) return prompts.value
    const query = searchQuery.value.toLowerCase()
    return prompts.value.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.prompt.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  })

  const addPrompt = (prompt) => {
    prompts.value.push({
      ...prompt,
      id: Date.now(),
      createdAt: new Date().toISOString()
    })
  }

  const deletePrompt = (id) => {
    prompts.value = prompts.value.filter(p => p.id !== id)
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  return {
    prompts,
    searchQuery,
    filteredPrompts,
    addPrompt,
    deletePrompt,
    copyToClipboard
  }
}