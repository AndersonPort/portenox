import { z } from 'zod';

export const analyzeSchema = z.object({
  linkedin: z.string().url('Invalid LinkedIn URL'),
  goal: z.string().min(10).max(500),
  resume: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB
    'File size must be less than 10MB'
  ).refine(
    (file) => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
    'Only PDF and DOCX files are allowed'
  )
});