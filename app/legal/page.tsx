import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="mx-auto md:px-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
        <Terms />
        <Privacy />
      </div>
      <p className="text-center font-semibold text-gray-700 dark:text-gray-300 mt-8">
        If you have any questions about these terms of service or the privacy
        policy, please contact me at{" "}
        <Link
          className="text-blue-600 hover:underline"
          href="mailto:hello@scottgilbert.dev"
        >
          hello@scottgilbert.dev
        </Link>
        .
      </p>
    </div>
  );
}

function Terms() {
  return (
    <div className="prose prose-blue border border-[var(--border)] bg-[var(--background-secondary)] rounded-lg shadow-sm my-4 px-6 py-6 flex-1">
      <h1 className="mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-4">
        Last updated: January 3, 2026
      </p>
      <p>
        Welcome to my portfolio! By accessing or using this website, you agree
        to comply with and be bound by the following terms of service.
      </p>
      <h2>1. Use of Website</h2>
      <p className="mb-4">
        You agree to use this website for lawful purposes only. You must not use
        this website in any way that may damage, disable, overburden, or impair
        the website or interfere with any other party&apos;s use and enjoyment
        of the website.
      </p>
      <p>
        I reserve the right to take appropriate action (including but not
        limited to restricting your access to this website) if these terms are
        violated.
      </p>
      <h2>2. Intellectual Property</h2>
      <p className="mb-4">
        This website and its entire contents, features, and functionality is
        licensed under the MIT License. This license allows users broad freedom
        to interact with the intellectual property of this website in any way
        they see fit, with some limitations. Read more about the license at{" "}
        <Link
          href="https://opensource.org/license/MIT"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          https://opensource.org/license/MIT
        </Link>
        .
      </p>
      <p className="mb-4">
        Certain creative works displayed on this website are the property of
        their respective creators. I have done my best to ensure these works are
        used with permission or under fair use principles. Attributions for
        creative works (out of respect for creators or as deemed necessary by
        law) can be found at{" "}
        <Link href="/attributions" className="text-blue-600 hover:underline">
          the attributions page
        </Link>
        .
      </p>
      <p>
        Portions of this website have been created using artificial intelligence
        like ChatGPT and GitHub Copilot. I only claim full ownership of any
        content that I have personally created or significantly modified. I
        acknowledge the contributions of AI tools in the creation of this
        website and claim ownership of AI generated content only to the extent
        permitted by applicable law.
      </p>
      <h2>3. Disclaimer of Warranties</h2>
      <p>
        This website is provided &quot;as is&quot; without any representations
        or warranties, express or implied. I make no representations or
        warranties in relation to this website or the information and materials
        provided on this website.
      </p>
      <h2>4. Limitation of Liability</h2>
      <p>
        I will not be liable for any loss or damage arising from the use of this
        website, including but not limited to direct, indirect, incidental,
        punitive, and consequential damages.
      </p>
      <h2>5. Changes to Terms</h2>
      <p>
        I reserve the right to modify these terms and conditions at any time,
        provided I update this page to reflect the revision date. Your continued
        use of the website after any changes indicates your acceptance of the
        new terms.
      </p>
      <h2>6. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance
        with the laws of the jurisdiction in which I reside (presently the
        United States and the state of Illinois), and you irrevocably submit to
        the exclusive jurisdiction of the courts in that location.
      </p>
    </div>
  );
}

function Privacy() {
  return (
    <div className="prose prose-blue border border-[var(--border] bg-[var(--background-secondary)] rounded-lg shadow-sm my-4 px-6 py-6 flex-1">
      <h1 className="mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-4">
        Last updated: January 3, 2026
      </p>
      <p>
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit or interact with this
        website.
      </p>
      <h2>1. Information I Collect</h2>
      <p className="mb-4">
        I collect personal information that you voluntarily provide to me when
        you contact me through email or other means. This may include your name,
        email address, and any other information you choose to provide.
      </p>
      <p>
        I also automatically collect certain authentication information when you
        sign up or log in (such as your IP address, browser type, and operating
        system) to help maintain the security of the site. If you sign up using
        a third-party service (like GitHub), I may also receive some basic
        profile information from that service, such as your name, email, and
        your profile picture.
      </p>
      <h2>2. How I Use Your Information</h2>
      <p>I use the information I collect to:</p>
      <ul className="list-disc list-inside">
        <li>Respond to your inquiries and provide support.</li>
        <li>Improve and maintain the security of the website.</li>
        <li>Support features like commenting on projects and posts.</li>
      </ul>
      <h2>3. Sharing Your Information</h2>
      <p>
        I do not share your personal information with third parties, except as
        necessary to provide the services you request (such as using third-party
        authentication providers) or as required by law.
      </p>
      <h2>4. Data Security</h2>
      <p className="mb-4">
        I implement reasonable security measures to protect your personal
        information from unauthorized access, disclosure, alteration, or
        destruction.
      </p>
      <p>
        Please note that, in the event that your account is banned, your data is
        not automatically deleted.
      </p>
      <h2>5. Changes to This Privacy Policy</h2>
      <p>
        I may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated revision date.
      </p>
    </div>
  );
}
