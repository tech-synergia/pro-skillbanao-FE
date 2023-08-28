
import { Typography } from 'antd'

const {Title} = Typography;

function Privacy() {
  return (
    <div className='terms'>
        <Title level={2} className='title'>Privacy Policy</Title>
        <p>SkillBanao ("we", "us", "our") values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information. By using our website ("Website") and our services, you consent to the practices described in this Privacy Policy.</p>
        <h5>Information We Collect:</h5>
        <p>We may collect personal information you provide to us, such as your name, email address, and other relevant details when you use our services, register for an account, or contact us.</p>
        <h5>How We Use Your Information:</h5>
        <p>We use your personal information to:
            <ul>
                <li>Provide and personalize our services to meet your needs.</li>
                <li>Send you important information and updates related to our services.</li>
                <li>Improve our Website and services based on your feedback and usage.</li>
                <li>Communicate with you for customer support and assistance.</li>
            </ul>
        </p>
        <h5>Data Security:</h5>
        <p>We implement security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
        <h5>Sharing Your Information:</h5>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our Website and providing services to you. These service providers are obligated to maintain the confidentiality of your information.</p>
        <h5>Cookies and Tracking:</h5>
        <p>We may use cookies and similar technologies to enhance your experience on our Website. You can control cookies through your browser settings.</p>
        <h5>Links to Other Websites:</h5>
        <p>Our Website may contain links to third-party websites. We are not responsible for the content or privacy practices of these websites. Please review their privacy policies before providing any personal information.</p>
        <h5>Children's Privacy:</h5>
        <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal information from individuals under 13 years of age.</p>
        <h5>Changes to Privacy Policy:</h5>
        <p>We reserve the right to update or modify this Privacy Policy at any time. Changes will be effective upon posting to our Website. We recommend reviewing this page periodically for the latest information on our privacy practices.</p>
        <h5>Contact Us:</h5>
        <p>If you have questions or concerns about our Privacy Policy, please contact us at support@skillbanao.com</p>
    
    
    </div>
  )
}

export default Privacy
