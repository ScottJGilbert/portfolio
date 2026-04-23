export interface LegalSection {
  id: string;
  title: string;
  paragraphs: readonly string[];
}

export const legalPageContent = {
  title: "Legal",
  lastUpdated: "April 20, 2026",
  terms: [
    {
      id: "terms-use",
      title: "Use of This Site",
      paragraphs: [
        "This website is provided for informational and professional portfolio purposes. You may browse, reference, and share public pages as long as attribution and context are preserved.",
        "You agree not to misuse the site through automated abuse, security probing, or unlawful activity.",
      ],
    },
    {
      id: "terms-content",
      title: "Content and Intellectual Property",
      paragraphs: [
        "Unless stated otherwise, written content and project descriptions are original works owned by the site author.",
        "Third-party names, trademarks, and platforms remain the property of their respective owners.",
      ],
    },
  ] as const satisfies readonly LegalSection[],
  privacy: [
    {
      id: "privacy-collection",
      title: "Information Collection",
      paragraphs: [
        "This site does not intentionally collect sensitive personal data through public pages.",
        "If you contact me directly, any details you provide are used only to respond and continue that conversation.",
      ],
    },
    {
      id: "privacy-retention",
      title: "Data Use and Retention",
      paragraphs: [
        "Contact messages are retained only as needed for ongoing communication and project follow-up.",
        "I do not sell personal data and do not use contact submissions for unrelated marketing lists.",
      ],
    },
  ] as const satisfies readonly LegalSection[],
} as const;
