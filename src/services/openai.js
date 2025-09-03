import OpenAI from 'openai'
import { openaiConfig } from '../config/env'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: openaiConfig.apiKey,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
})

// Available models
export const MODELS = {
  GPT_4: 'gpt-4',
  GPT_4_TURBO: 'gpt-4-turbo-preview',
  GPT_3_5_TURBO: 'gpt-3.5-turbo',
  GPT_3_5_TURBO_16K: 'gpt-3.5-turbo-16k'
}

// Default model configurations
export const DEFAULT_MODEL_CONFIGS = {
  [MODELS.GPT_4]: {
    model: MODELS.GPT_4,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  },
  [MODELS.GPT_4_TURBO]: {
    model: MODELS.GPT_4_TURBO,
    temperature: 0.7,
    max_tokens: 4000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  },
  [MODELS.GPT_3_5_TURBO]: {
    model: MODELS.GPT_3_5_TURBO,
    temperature: 0.7,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  }
}

// OpenAI service class
class OpenAIService {
  constructor() {
    this.client = openai
  }

  // Generate chat completion
  async generateCompletion(messages, config = {}) {
    try {
      const modelConfig = {
        ...DEFAULT_MODEL_CONFIGS[MODELS.GPT_3_5_TURBO],
        ...config
      }

      const response = await this.client.chat.completions.create({
        ...modelConfig,
        messages
      })

      return {
        success: true,
        data: {
          content: response.choices[0]?.message?.content || '',
          usage: response.usage,
          model: response.model,
          finish_reason: response.choices[0]?.finish_reason
        },
        error: null
      }
    } catch (error) {
      console.error('OpenAI completion error:', error)
      return {
        success: false,
        data: null,
        error: this.handleError(error)
      }
    }
  }

  // Execute agent task
  async executeAgentTask(agent, taskInput, dataSources = []) {
    try {
      const startTime = Date.now()

      // Prepare context from data sources
      let context = ''
      if (dataSources.length > 0) {
        context = '\n\nRelevant context:\n' + 
          dataSources.map(ds => `- ${ds.name}: ${ds.content || 'No content available'}`).join('\n')
      }

      // Build prompt with agent template and task input
      const prompt = this.buildPrompt(agent.prompt_template, taskInput, context)

      // Prepare messages
      const messages = [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: taskInput
        }
      ]

      // Execute completion
      const result = await this.generateCompletion(messages, agent.model_config)

      if (!result.success) {
        throw new Error(result.error.message)
      }

      const endTime = Date.now()
      const duration = endTime - startTime

      return {
        success: true,
        data: {
          output: result.data.content,
          usage: result.data.usage,
          duration_ms: duration,
          tokens_used: result.data.usage?.total_tokens || 0,
          cost_cents: this.calculateCost(result.data.usage, result.data.model)
        },
        error: null
      }
    } catch (error) {
      console.error('Agent task execution error:', error)
      return {
        success: false,
        data: null,
        error: this.handleError(error)
      }
    }
  }

  // Test agent configuration
  async testAgent(agent, testInput = 'Hello, please introduce yourself and explain what you can do.') {
    try {
      const result = await this.executeAgentTask(agent, testInput)
      return result
    } catch (error) {
      console.error('Agent test error:', error)
      return {
        success: false,
        data: null,
        error: this.handleError(error)
      }
    }
  }

  // Generate embeddings for data sources
  async generateEmbeddings(text, model = 'text-embedding-ada-002') {
    try {
      const response = await this.client.embeddings.create({
        model,
        input: text
      })

      return {
        success: true,
        data: {
          embeddings: response.data[0]?.embedding || [],
          usage: response.usage
        },
        error: null
      }
    } catch (error) {
      console.error('Embeddings generation error:', error)
      return {
        success: false,
        data: null,
        error: this.handleError(error)
      }
    }
  }

  // Build prompt from template
  buildPrompt(template, input, context = '') {
    let prompt = template

    // Replace placeholders
    prompt = prompt.replace(/\{input\}/g, input)
    prompt = prompt.replace(/\{context\}/g, context)
    
    // Add timestamp
    const timestamp = new Date().toISOString()
    prompt = prompt.replace(/\{timestamp\}/g, timestamp)

    return prompt
  }

  // Calculate cost based on usage and model
  calculateCost(usage, model) {
    if (!usage) return 0

    // Pricing per 1K tokens (in cents)
    const pricing = {
      'gpt-4': { input: 3, output: 6 },
      'gpt-4-turbo-preview': { input: 1, output: 3 },
      'gpt-3.5-turbo': { input: 0.05, output: 0.15 },
      'gpt-3.5-turbo-16k': { input: 0.3, output: 0.4 }
    }

    const modelPricing = pricing[model] || pricing['gpt-3.5-turbo']
    
    const inputCost = (usage.prompt_tokens / 1000) * modelPricing.input
    const outputCost = (usage.completion_tokens / 1000) * modelPricing.output
    
    return Math.round((inputCost + outputCost) * 100) / 100 // Round to 2 decimal places
  }

  // Handle OpenAI errors
  handleError(error) {
    if (error.code === 'insufficient_quota') {
      return {
        code: 'QUOTA_EXCEEDED',
        message: 'OpenAI API quota exceeded. Please check your billing settings.',
        details: error.message
      }
    }

    if (error.code === 'invalid_api_key') {
      return {
        code: 'INVALID_API_KEY',
        message: 'Invalid OpenAI API key. Please check your configuration.',
        details: error.message
      }
    }

    if (error.code === 'rate_limit_exceeded') {
      return {
        code: 'RATE_LIMIT',
        message: 'Rate limit exceeded. Please try again later.',
        details: error.message
      }
    }

    if (error.code === 'context_length_exceeded') {
      return {
        code: 'CONTEXT_TOO_LONG',
        message: 'Input text is too long for the selected model.',
        details: error.message
      }
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: error.toString()
    }
  }

  // Get available models
  getAvailableModels() {
    return Object.values(MODELS)
  }

  // Get model configuration
  getModelConfig(model) {
    return DEFAULT_MODEL_CONFIGS[model] || DEFAULT_MODEL_CONFIGS[MODELS.GPT_3_5_TURBO]
  }

  // Validate model configuration
  validateModelConfig(config) {
    const errors = []

    if (config.temperature < 0 || config.temperature > 2) {
      errors.push('Temperature must be between 0 and 2')
    }

    if (config.max_tokens < 1 || config.max_tokens > 4000) {
      errors.push('Max tokens must be between 1 and 4000')
    }

    if (config.top_p < 0 || config.top_p > 1) {
      errors.push('Top P must be between 0 and 1')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Export singleton instance
export const openaiService = new OpenAIService()
export default openaiService
