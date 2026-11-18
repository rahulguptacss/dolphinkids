import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href?: string;
  note?: string;
}

export interface NavGroup {
  name: string;
  href: string;
  blurb: string;
  items: NavItem[];
}

export interface HeaderData {
  banner: string;
  banner_href: string;
  logo: string;
  logo_alt: string;
  utility: LinkType[];
  login_text: string;
  coming_soon: string;
  phase_title: string;
  close_label: string;
  menu_label: string;
  open_menu: string;
  close_menu: string;
  overview_label: string;
  login_title: string;
  login_body: string;
  call_label: string;
  phone: string;
  phone_href: string;
  button_text: string;
  button_href: string;
  promo_text: string;
  promo_href: string;
  admission_brochure: string;
  admission_brochure_text: string;
  franchise_brochure: string;
  franchise_brochure_text: string;
  nav: NavGroup[];
}

export interface FooterData {
  logo: string;
  logo_alt: string;
  tagline: string;
  address: string;
  contact_title: string;
  phone_label: string;
  phone: string;
  phone_href: string;
  whatsapp_label: string;
  whatsapp: string;
  whatsapp_href: string;
  explore_title: string;
  links: LinkType[];
  note: string;
  disclaimer: string;
  brochures: LinkType[];
  privacy_label: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface ParentInfoSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  phone: string;
  phone_href: string;
  call_label: string;
  action_label: string;
  action_href: string;
  items: { title: string; text: string; icon: string }[];
}

export interface TourSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  poster: string;
  video: string;
  video_title: string;
  notice: string;
  play_label: string;
  button_text: string;
  button_href: string;
  links_label: string;
  links: { name: string; href: string }[];
}

export interface ActivitiesSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  image_alt: string;
  caption: string;
  items: { name: string; icon: string }[];
}

export interface MobileBarData {
  items: LinkType[];
  float_label: string;
  float_href: string;
}

export interface HeroSectionData {
  id: string;
  badge: string;
  eyebrow: string;
  title: string;
  title_rest: string;
  title_highlight: string;
  lead_strong: string;
  lead: string;
  primary_text: string;
  primary_href: string;
  secondary_text: string;
  secondary_href: string;
  phone: string;
  call_label: string;
  phone_href: string;
  whatsapp_text: string;
  whatsapp_href: string;
  links: LinkType[];
  origins: { country: string; detail: string }[];
  origins_note: string;
  poster: string;
  poster_alt: string;
  play_label: string;
  pause_label: string;
  video: string;
  year: string;
  year_label: string;
  caption: string;
}

export interface AboutSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  closing: string;
  image: string;
  image_alt: string;
  image_caption: string;
  image_year: string;
  pillars: { title: string; text: string; icon: string }[];
}

export interface ProgrammesSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  ribbon: string;
  cards: { eyebrow: string; title: string; text: string; href: string; link: string }[];
  note: string;
  process_link: string;
  process_href: string;
  badge: string;
  details_label: string;
  whatsapp_label: string;
  whatsapp_href: string;
  items: { name: string; age: string; focus: string; months: number }[];
  age_check: {
    id: string;
    title: string;
    text: string;
    session_label: string;
    session_placeholder: string;
    sessions: string[];
    checking_label: string;
    tracks: { id: string; name: string }[];
    dob_label: string;
    empty_result: string;
    below_text: string;
    indicative: string;
    age_today: string;
    age_on: string;
    years_label: string;
    months_label: string;
    phone: string;
    phone_href: string;
    cutoff: string;
    cutoff_label: string;
  };
}

export interface ProcessSectionData {
  id: string;
  index: string;
  eyebrow: string;
  scope: string;
  title: string;
  lead: string;
  notice: string;
  notice_lead: string;
  actions: { name: string; href: string; style: string }[];
  action_note: string;
  steps_title: string;
  steps: { title: string; intro: string; points: string[]; note?: string }[];
  checklist_kicker: string;
  checklist_title: string;
  checklist_note: string;
  documents: { name: string; detail: string }[];
  age_kicker: string;
  age_title: string;
  age_text: string;
  ages: { name: string; age: string }[];
  age_note: string;
  guidelines_kicker: string;
  guidelines_title: string;
  guidelines: string[];
  closing_title: string;
  closing_text: string;
  closing_button: string;
  closing_href: string;
}

export interface WhySectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  image_alt: string;
  items: { title: string; text: string; icon: string }[];
  safety: {
    id: string;
    eyebrow: string;
    title: string;
    title_highlight: string;
    lead: string;
    image: string;
    image_alt: string;
    facilities: { icon: string; title: string; text: string }[];
    areas: { value: string; label: string }[];
    ask_title: string;
    ask: string[];
    button: string;
    button_href: string;
  };
}

export interface LearningSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  origins: { country: string; detail: string }[];
  origins_note: string;
  filters: string[];
  learn_more: string;
  items: { id: string; name: string; group: string; text: string; origin?: string; icon: string; points: string[] }[];
}

export interface CampusSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  stats: { label: string; value: string; unit: string; text: string }[];
  hero: { src: string; alt: string; caption: string };
  zones: { title: string; text: string }[];
  gallery: { src: string; alt: string; title: string; text: string }[];
}

export interface DayCareSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  main_badge: string;
  main_title: string;
  main_text: string;
  points: string[];
  extended_badge: string;
  extended_title: string;
  extended_text: string;
  primary_label: string;
  primary_href: string;
  whatsapp_label: string;
  whatsapp_href: string;
  extended_label: string;
  extended_href: string;
}

export interface ParentsSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  notice: string;
  label: string;
  footnote: string;
  items: { image: string; video: string; title: string; text: string }[];
}

export interface SeniorSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  highlight: string;
  paragraphs: string[];
  boards_label: string;
  boards: string[];
  points: { icon: string; text: string }[];
  note: string;
  disclaimer: string;
  button: string;
  button_href: string;
}

export interface JournalSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  button: string;
  button_href: string;
}

export interface FranchiseSectionData {
  id: string;
  index: string;
  eyebrow: string;
  badge: string;
  title: string;
  lead: string;
  disclaimer: string;
  targets: { label: string; value: string; note: string }[];
  targets_note: string;
  reasons_eyebrow: string;
  reasons_title: string;
  reasons: { n: string; title: string; points: string[] }[];
  terms: { label: string; value: string; note: string }[];
  terms_note: string;
  support_eyebrow: string;
  support_title: string;
  support: string[];
  support_note: string;
  models_eyebrow: string;
  models_title: string;
  models_lead: string;
  view_label: string;
  models: { id: string; icon: string; title: string; text: string; points: string[]; fee_label?: string; fee?: string; fee_note?: string }[];
  projects_kicker: string;
  projects: { title: string; text: string; value: string; note: string }[];
  discuss_label: string;
  discuss_href: string;
  budget_title: string;
  budget_text: string;
  whatsapp_label: string;
  whatsapp_href: string;
  brochure_label: string;
  brochure_href: string;
  form_kicker: string;
  form_title: string;
  form_lead: string;
  form_note: string;
  success_message: string;
  school_group: string;
  select_placeholder: string;
  name_label: string;
  phone_label: string;
  phone_placeholder: string;
  email_label: string;
  city_label: string;
  state_label: string;
  format_label: string;
  capacity_label: string;
  capacity_placeholder: string;
  consent: string;
  submit_text: string;
  form_footer: string;
  footnote: string;
}

export interface EnquireField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  wide?: boolean;
  options?: string[];
}

export interface EnquireSectionData {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  actions: { name: string; href: string; style: string }[];
  form_kicker: string;
  form_title: string;
  form_text: string;
  form_note: string;
  groups: { title: string; fields: EnquireField[] }[];
  consent: string;
  submit_text: string;
  next_note: string;
  privacy_note: string;
  phone_line: string;
  phone: string;
  phone_href: string;
  image: string;
  image_alt: string;
  success_title: string;
  success_message: string;
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Education.templateComponents['template-1'];
export const pages = template.pages;
export const sections = {
  ...template.sections,
  header: data.common.Header,
  footer: data.common.Footer,
  mobileBar: data.common.MobileBar,
  backToTop: data.common.BackToTop,
};
