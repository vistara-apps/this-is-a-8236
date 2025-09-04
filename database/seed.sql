-- Task Weaver AI Seed Data
-- This file contains sample data for development and testing

-- Note: This seed data should only be used in development environments
-- In production, users will create their own agents and data sources

-- Sample subscription tiers data (for reference)
-- These would typically be managed in Stripe, but included here for completeness

-- Sample agent templates that users can start with
INSERT INTO public.agents (id, user_id, name, description, prompt_template, model_config, status) VALUES
-- Note: user_id should be replaced with actual user IDs in development
-- These are placeholder entries to show the structure

-- Content Writer Agent Template
('550e8400-e29b-41d4-a716-446655440001', '00000000-0000-0000-0000-000000000000', 
 'Content Writer', 
 'AI agent specialized in creating engaging blog posts, articles, and marketing copy',
 'You are a professional content writer with expertise in creating engaging, SEO-optimized content. Your task is to write compelling content based on the following requirements:\n\n{requirements}\n\nPlease ensure the content is:\n- Well-structured with clear headings\n- Engaging and informative\n- Optimized for the target audience\n- Free of grammatical errors\n\nContent requirements: {input}',
 '{"model": "gpt-4", "temperature": 0.7, "max_tokens": 2000, "top_p": 1}',
 'active'),

-- Data Analyzer Agent Template  
('550e8400-e29b-41d4-a716-446655440002', '00000000-0000-0000-0000-000000000000',
 'Data Analyzer',
 'AI agent that analyzes data patterns, generates insights, and creates reports',
 'You are a data analyst with expertise in interpreting data and generating actionable insights. Analyze the provided data and create a comprehensive report.\n\nData to analyze: {input}\n\nPlease provide:\n- Key findings and patterns\n- Statistical insights\n- Actionable recommendations\n- Visual data representation suggestions\n\nFormat your response as a structured report with clear sections.',
 '{"model": "gpt-4", "temperature": 0.3, "max_tokens": 1500, "top_p": 0.9}',
 'active'),

-- Research Assistant Agent Template
('550e8400-e29b-41d4-a716-446655440003', '00000000-0000-0000-0000-000000000000',
 'Research Assistant',
 'AI agent that conducts thorough research and compiles comprehensive reports',
 'You are a research assistant with expertise in gathering, analyzing, and synthesizing information from multiple sources. Your task is to research the following topic and provide a comprehensive report.\n\nResearch topic: {input}\n\nPlease provide:\n- Executive summary\n- Key findings\n- Supporting evidence\n- Relevant statistics and data\n- Conclusions and implications\n\nEnsure all information is accurate and well-sourced.',
 '{"model": "gpt-4", "temperature": 0.4, "max_tokens": 2500, "top_p": 0.95}',
 'active'),

-- Email Responder Agent Template
('550e8400-e29b-41d4-a716-446655440004', '00000000-0000-0000-0000-000000000000',
 'Email Responder',
 'AI agent that crafts professional email responses and manages correspondence',
 'You are a professional email assistant. Craft appropriate email responses based on the context and requirements provided.\n\nEmail context: {input}\n\nPlease ensure the response is:\n- Professional and courteous\n- Clear and concise\n- Appropriate for the business context\n- Action-oriented when necessary\n\nTone: {tone}\nUrgency: {urgency}',
 '{"model": "gpt-3.5-turbo", "temperature": 0.5, "max_tokens": 800, "top_p": 1}',
 'active');

-- Sample data source types for reference
-- Note: These would be created by users, but shown here for structure reference

-- Sample usage limits by subscription tier (for reference)
-- Basic: 1 agent, 1 data source, 100 tasks/month
-- Pro: 5 agents, 5 data sources, 1000 tasks/month  
-- Premium: unlimited agents, unlimited data sources, unlimited tasks

-- Development helper: Function to clean up seed data
CREATE OR REPLACE FUNCTION clean_seed_data()
RETURNS void AS $$
BEGIN
  -- Delete seed agents (identifiable by specific UUIDs)
  DELETE FROM public.agents WHERE id IN (
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002', 
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004'
  );
  
  RAISE NOTICE 'Seed data cleaned up successfully';
END;
$$ LANGUAGE plpgsql;
