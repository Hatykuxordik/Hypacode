import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.enum([
    "landing-page",
    "business-website",
    "web-app",
    "dashboard",
    "mobile-app",
    "api-integration",
    "other",
  ]),
  budget: z
    .enum(["under-1k", "1k-3k", "3k-6k", "6k-plus", "lets-talk"])
    .optional(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message too long (max 2000 characters)"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const estimateSchema = z.object({
  projectType: z.enum([
    "landing-page",
    "business-website",
    "web-app",
    "dashboard",
    "mobile-app",
    "api-integration",
    "other",
  ]),
  features: z.array(z.string()).default([]),
  timeline: z.enum(["asap", "1-month", "2-3-months", "flexible"]),
  budgetRange: z.enum(["under-1k", "1k-3k", "3k-6k", "6k-plus", "lets-talk"]),
  name: z.string().min(2, "Name required").max(100),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export type EstimateFormData = z.infer<typeof estimateSchema>;

export const chatMessageSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .max(20),
});
