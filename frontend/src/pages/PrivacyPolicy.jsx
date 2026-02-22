import Seo from '../components/Seo';
import { FaShieldAlt } from 'react-icons/fa';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Privacy Policy"
        description="Privacy Policy of Babul Quran – how we collect, use and protect your data when you use our website and online Quran learning services."
        canonicalPath="/privacy-policy"
      />
      <section className="py-14 md:py-16 max-w-container mx-auto px-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <FaShieldAlt className="w-10 h-10 text-primary" />
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: February 2025</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">1. Introduction</h2>
              <p>
                Babul Quran (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our online Quran learning services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">2. Information We Collect</h2>
              <p className="mb-2">We may collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name, email address, and phone number when you submit an inquiry, free trial request, or contact form</li>
                <li>Course preferences and messages you send us</li>
                <li>Donation-related details (name, phone, amount, purpose) when you use our donation forms</li>
                <li>Any other information you choose to provide in communications with us</li>
              </ul>
              <p className="mt-2">We may also automatically collect certain technical information when you visit our site (e.g. device type, browser, IP address) for security and analytics purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Respond to your inquiries and schedule trial or enrollment classes</li>
                <li>Process donations and send confirmations or receipts where applicable</li>
                <li>Improve our website and services</li>
                <li>Send you relevant updates about our courses or services (with your consent where required)</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">4. Cookies and Similar Technologies</h2>
              <p>
                We may use cookies and similar technologies to enhance your experience, remember your preferences, and understand how our site is used. You can control cookie settings through your browser. Disabling cookies may affect some features of the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">5. Sharing of Information</h2>
              <p>
                We do not sell your personal information. We may share your information only with trusted service providers who assist us in operating our website and services (e.g. hosting, email), or when required by law. We require such parties to protect your data and use it only for the purposes we specify.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">6. Data Security</h2>
              <p>
                We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse. Data is transmitted over secure connections where possible. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">7. Your Rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, or delete your personal data, or to object to or restrict certain processing. To exercise these rights or ask questions about your data, please contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">8. Children&apos;s Privacy</h2>
              <p>
                Our services may be used by or for minors under parental or guardian supervision. We do not knowingly collect personal information from children without consent from a parent or guardian. If you believe we have collected such information, please contact us so we can address it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. We encourage you to review this page periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> babulquranacademy1@gmail.com<br />
                <strong>Phone / WhatsApp:</strong> +923124810000
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
