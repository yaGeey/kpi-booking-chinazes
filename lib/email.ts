'use server'

import { Resend } from 'resend'
import { BookingStatus } from './types'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendBookingStatusEmailParams {
   to: string
   userName: string
   bookingId: number
   roomTitle: string
   status: BookingStatus
   startDate: string
   endDate: string
}

const statusMessages: Record<BookingStatus, { subject: string; title: string; message: string; color: string }> = {
   CREATE: {
      subject: '🔔 Запит на бронювання отримано',
      title: 'Запит отримано',
      message: "Ваш запит на бронювання успішно отримано і перебуває на розгляді. Адміністратор зв'яжеться з вами найближчим часом.",
      color: '#f59e0b',
   },
   CONFIRM: {
      subject: '✅ Бронювання підтверджено',
      title: 'Бронювання підтверджено',
      message: 'Вітаємо! Ваше бронювання підтверджено. Очікуємо на вашу появу!',
      color: '#10b981',
   },
   CANCEL: {
      subject: '❌ Бронювання скасовано',
      title: 'Бронювання скасовано',
      message: "На жаль, ваше бронювання було скасовано. Якщо у вас є питання, будь ласка, зв'яжіться з нами.",
      color: '#ef4444',
   },
   COMPLETE: {
      subject: '🎉 Бронювання завершено',
      title: 'Бронювання завершено',
      message: 'Дякуємо, що обрали нас! Сподіваємось, вам сподобалось. Будемо раді бачити вас знову!',
      color: '#3b82f6',
   },
}

export async function sendBookingStatusEmail({
   to,
   userName,
   bookingId,
   roomTitle,
   status,
   startDate,
   endDate,
}: SendBookingStatusEmailParams) {
   const statusConfig = statusMessages[status]

   const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString('uk-UA', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      })
   }

   const htmlContent = `
<!DOCTYPE html>
<html lang="uk">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>${statusConfig.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
   <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
      <tr>
         <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
               <!-- Header -->
               <tr>
                  <td style="background-color: ${statusConfig.color}; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                     <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">${statusConfig.title}</h1>
                  </td>
               </tr>
               
               <!-- Content -->
               <tr>
                  <td style="padding: 40px 30px;">
                     <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Вітаю, <strong>${userName}</strong>!
                     </p>
                     
                     <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        ${statusConfig.message}
                     </p>
                     
                     <!-- Booking Details Box -->
                     <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; margin-bottom: 30px;">
                        <tr>
                           <td style="padding: 20px;">
                              <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">
                                 Деталі бронювання
                              </h2>
                              
                              <table width="100%" cellpadding="0" cellspacing="0">
                                 <tr>
                                    <td style="color: #6b7280; font-size: 14px; padding: 6px 0;">
                                       <strong>Номер бронювання:</strong>
                                    </td>
                                    <td style="color: #111827; font-size: 14px; padding: 6px 0; text-align: right;">
                                       #${bookingId}
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="color: #6b7280; font-size: 14px; padding: 6px 0;">
                                       <strong>Кімната:</strong>
                                    </td>
                                    <td style="color: #111827; font-size: 14px; padding: 6px 0; text-align: right;">
                                       ${roomTitle}
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="color: #6b7280; font-size: 14px; padding: 6px 0;">
                                       <strong>Дата заїзду:</strong>
                                    </td>
                                    <td style="color: #111827; font-size: 14px; padding: 6px 0; text-align: right;">
                                       ${formatDate(startDate)}
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="color: #6b7280; font-size: 14px; padding: 6px 0;">
                                       <strong>Дата виїзду:</strong>
                                    </td>
                                    <td style="color: #111827; font-size: 14px; padding: 6px 0; text-align: right;">
                                       ${formatDate(endDate)}
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                     </table>
                     
                     <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                        Якщо у вас виникли питання, будь ласка, зв'яжіться з нами.
                     </p>
                  </td>
               </tr>
               
               <!-- Footer -->
               <tr>
                  <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
                     <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} Система бронювання. Всі права захищені.
                     </p>
                  </td>
               </tr>
            </table>
         </td>
      </tr>
   </table>
</body>
</html>
   `

   try {
      const { data, error } = await resend.emails.send({
         from: 'Система Бронювання <onboarding@resend.dev>',
         to: [to],
         subject: statusConfig.subject,
         html: htmlContent,
      })

      if (error) {
         console.error('Error sending email:', error)
         return { success: false, error }
      }

      console.log('Email sent successfully:', data)
      return { success: true, data }
   } catch (error) {
      console.error('Error sending email:', error)
      return { success: false, error }
   }
}
