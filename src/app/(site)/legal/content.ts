import { Metadata } from "next";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Legal information regarding the use of this website and related intellectual property.",
};

export const legalPageContent = {
  title: "Legal",
  lastUpdated: "April 24, 2026",
  terms: [
    {
      id: "terms-use",
      title: "Use of this Website",
      paragraphs: [
        "You agree to use this website for lawful purposes only. You must not use this website in any way that may damage, disable, overburden, or impair the website or interfere with any other party's use and enjoyment of the website.",
        "I reserve the right to take appropriate action (including but not limited to restricting your access to this website) if these terms are violated.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      paragraphs: [
        "This website and its entire contents, features, and functionality is licensed under the MIT License. This license allows users broad freedom to interact with the intellectual property of this website in any way they see fit, with some limitations. Read more about the license at https://opensource.org/license/MIT.",
        "Certain creative works displayed on this website are the property of their respective creators. I have done my best to ensure these works are used with permission or under fair use principles. Attributions for creative works (out of respect for creators or as deemed necessary by law) can be found at the attributions page.",
        "Portions of this website have been created using artificial intelligence and/or artificial intelligence tooling like Google Gemini, Claude Code, and GitHub Copilot. I only claim full ownership of any content that I have personally created or significantly modified. I acknowledge the contributions of AI tools in the creation of this website and claim ownership of AI generated content only to the extent permitted by applicable law.",
      ],
    },
    {
      id: "disclaimer-of-warranty",
      title: "Disclaimer of Warranty",
      paragraphs: [
        'This website is provided "as is" without any representations or warranties, express or implied. I make no representations or warranties in relation to this website or the information and materials provided on this website.',
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      paragraphs: [
        "I will not be liable for any loss or damage arising from the use of this website, including but not limited to direct, indirect, incidental, punitive, and consequential damages.",
      ],
    },
    {
      id: "changes-to-terms",
      title: "Changes to Terms",
      paragraphs: [
        "I reserve the right to modify these terms at any time without notice. Your continued use of this website after any such modification constitutes your acceptance of the revised terms.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law",
      paragraphs: [
        "These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which I reside (presently the United States and the state of Illinois), and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
      ],
    },
  ] as const satisfies readonly LegalSection[],
  privacy: [
    {
      id: "privacy-collection",
      title: "Information Collection",
      paragraphs: [
        "I collect personal information that you voluntarily provide to me when you contact me through email or other means. This may include your name, email address, and any other information you choose to provide.",
        "I also automatically collect certain authentication information when you sign up or log in (such as your IP address, browser type, and operating system) to help maintain the security of the site. If you sign up using a third-party service (like GitHub), I may also receive some basic profile information from that service, such as your name, email, and your profile picture.",
      ],
    },
    {
      id: "usage-of-information",
      title: "How I Use Your Information",
      paragraphs: [
        "I use the information I collect to respond to your inquiries, provide support, and improve/maintain the security of this website. I do not sell or rent your personal information to third parties.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      paragraphs: [
        "I implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.",
        "Please be aware that, in the event that your account is banned, your data is not automatically deleted. ",
      ],
    },
    {
      id: "changes",
      title: "Changes to this Privacy Policy",
      paragraphs: [
        "I may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
      ],
    },
  ] as const satisfies readonly LegalSection[],
} as const;
