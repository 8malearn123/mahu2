/**
 * Mahu's accounts, shown as a row of buttons in the lobby and at the end of every section page.
 * Placeholders until Mahu sends its handles: an account left empty shows its button without a link.
 */
export const SOCIAL = {
  instagram: "",
  tiktok: "",
  snapchat: "",
  x: "",
  whatsapp: "",
} satisfies Record<string, string>;

export type SocialAccount = keyof typeof SOCIAL;
