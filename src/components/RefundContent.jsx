import { Typography } from "antd"

const {Title} = Typography;

function RefundContent() {
  return (
    <div className='terms'>
        <Title level={3} className="title">Refund & Cancellation Policy</Title>
        <p>At SkillBanao, we are committed to providing you with high-quality services to support your personal growth journey. Please read our refund and cancellation policy carefully to understand your rights and responsibilities.</p>
        <h5>Refund Policy:</h5>
        <div className="refund">
            <ol>
              <li><strong>Chat with Coaches Sessions:</strong> Our "Chat with Coaches" sessions are designed to provide you with personalized guidance and support through online interactions. Due to the nature of these sessions, we do not offer refunds for completed chat sessions.</li>
              <li><strong>Workshops and Webinars:</strong> If you are unable to attend a paid workshop or webinar that you've registered for, please contact us at least 24 hours before the scheduled start time. In such cases, we will provide you with a credit that you can use towards a future workshop or webinar.</li>
              <li><strong>Ebooks, Guides, and Resources:</strong> We take pride in the quality of our downloadable resources. If you are not satisfied with a purchased resource, please contact us within 7 days of your purchase date. We will assess your situation and, if appropriate, provide you with a refund.</li>
            </ol>
        </div>

        <h5>Cancellation Policy:</h5>
        <div className="refund">
            <ol>
              <li><strong>Chat with Coaches Sessions:</strong> If you need to reschedule or cancel a chat session, please notify us at least 24 hours in advance. Missed sessions without 24-hour notice will not be rescheduled, and refunds will not be provided.</li>
              <li><strong>Workshops and Webinars:</strong> If you need to cancel your registration for a workshop or webinar, please do so at least 24 hours before the scheduled start time. Registrations canceled within 24 hours of the start time will not be eligible for a refund.</li>
            </ol>
        </div>

        <h5>How to Request a Refund:</h5>
        <p>To request a refund for an eligible product or service, please contact our customer support team at contact@skillbanao.com with your order details and the reason for your refund request. We will review your request and respond as soon as possible.</p>
        <p>Please note that refunds will be issued using the original payment method. Depending on your financial institution, it may take a few business days for the refund to appear in your account.</p>
    
        <h5>Changes to Workshops and Webinars:</h5>
        <p>SkillBanao reserves the right to reschedule, modify, or cancel workshops and webinars due to unforeseen circumstances. In such cases, registered participants will be notified in advance, and alternative arrangements will be offered.</p>
        <p>We value your commitment to personal growth and appreciate your understanding of our refund and cancellation policy. If you have any questions or concerns, please don't hesitate to reach out to our customer support team.</p>
    </div>
  )
}

export default RefundContent
