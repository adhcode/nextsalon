'use server';

import { z } from 'zod';
import { supabase } from '../../lib/supabase';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  staff: z
    .string()
    .max(50, 'Staff name must be at most 50 characters')
    .optional()
    .refine((val) => val === undefined || val.trim().length === 0 || val.trim().length >= 2, {
      message: 'Staff name must be at least 2 characters',
    }),
  visitDate: z.string().optional(),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters').max(1000),
  contact: z.string().optional(),
});

export async function submitFeedback(formData: FormData) {
  try {
    // Get form data and handle null values
    const rawData = {
      name: formData.get('name'),
      staff: formData.get('staff'),
      visitDate: formData.get('visitDate'),
      feedback: formData.get('feedback'),
      contact: formData.get('contact'),
    };

    // Convert null values to undefined for optional fields
    const processedData = {
      name: rawData.name,
      staff: rawData.staff,
      visitDate: rawData.visitDate || undefined,
      feedback: rawData.feedback,
      contact: rawData.contact || undefined,
    };

    // Validate the form data
    const validatedData = feedbackSchema.parse(processedData);

    // Save to Supabase database
    const { error } = await supabase
      .from('feedback')
      .insert([
        {
          name: validatedData.name,
          staff: validatedData.staff && validatedData.staff.trim().length > 0 ? validatedData.staff : null,
          visit_date: validatedData.visitDate || null,
          feedback: validatedData.feedback,
          contact: validatedData.contact || null,
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return {
        success: false,
        message: 'Failed to save feedback. Please try again.'
      };
    }

    // TODO: Send email notification
    // Example with Resend:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // 
    // await resend.emails.send({
    //   from: 'feedback@nextsalon.com',
    //   to: 'owner@nextsalon.com',
    //   subject: `New Feedback for ${validatedData.staff}`,
    //   html: `
    //     <h2>New Customer Feedback</h2>
    //     <p><strong>Customer:</strong> ${validatedData.name}</p>
    //     <p><strong>Staff Member:</strong> ${validatedData.staff}</p>
    //     <p><strong>Visit Date:</strong> ${validatedData.visitDate || 'Not specified'}</p>
    //     <p><strong>Contact:</strong> ${validatedData.contact || 'Not provided'}</p>
    //     <p><strong>Feedback:</strong></p>
    //     <p>${validatedData.feedback}</p>
    //   `,
    // });

    console.log('Feedback submitted successfully');
    
    return { success: true, message: 'Feedback submitted successfully!' };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: 'Invalid form data', 
        errors: error.errors 
      };
    }
    
    return { 
      success: false, 
      message: 'Failed to submit feedback. Please try again.' 
    };
  }
}