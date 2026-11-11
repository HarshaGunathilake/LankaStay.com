/*
 * The help guides: their order, groups and the words people might search for.
 * The text of each guide is in components/docs/pages/<slug>.tsx.
 */

export interface DocPage {
  slug: string;
  title: string;
  /** One line under the title, also used for search and the page description */
  summary: string;
  /** Extra words people might type into the search box */
  keywords?: string;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export const DOC_SECTIONS: DocSection[] = [
  {
    title: "Getting started",
    pages: [
      { slug: "introduction", title: "Welcome to LankaStay", summary: "What LankaStay does, and how the guides are organised.", keywords: "overview start begin" },
      { slug: "create-account", title: "Create your account", summary: "Register your villa and confirm your email address.", keywords: "register sign up signup new account verify confirm email" },
      { slug: "free-trial", title: "Start your free trial", summary: "Add your card to open your villa. Nothing is charged until the trial ends.", keywords: "subscribe trial card pay payment first look around" },
      { slug: "setup-checklist", title: "Set up in 10 minutes", summary: "The few things to do first, in order.", keywords: "checklist first steps setup onboarding" },
      { slug: "home-screen", title: "The Home screen", summary: "Today's arrivals and departures, bills to pay, and money to collect.", keywords: "dashboard home today overview" },
      { slug: "sign-in", title: "Signing in and passwords", summary: "Sign in, stay signed in, and reset a forgotten password.", keywords: "login log in password forgot reset sign out" },
    ],
  },
  {
    title: "Set up your villa",
    pages: [
      { slug: "villa-settings", title: "Villa settings", summary: "Villa details, check-in and check-out times, and the entire-villa price.", keywords: "settings name phone location check-in check-out times entire villa price password" },
      { slug: "rooms", title: "Rooms", summary: "Add your rooms with their prices, and switch a room off for repairs.", keywords: "room add price capacity guests switch off" },
      { slug: "amenities", title: "Amenities and extras", summary: "The extras guests can add, like breakfast or an airport pickup.", keywords: "amenities extras breakfast airport pickup bbq add-ons" },
    ],
  },
  {
    title: "Bookings and guests",
    pages: [
      { slug: "new-booking", title: "Make a booking", summary: "Book the entire villa or single rooms in three short steps.", keywords: "new booking reservation add book room entire villa double booking" },
      { slug: "calendar", title: "The calendar", summary: "See every room, every night, and book a free night with a tap.", keywords: "calendar availability week colours" },
      { slug: "manage-bookings", title: "Find, change or cancel a booking", summary: "The booking list, changing dates or rooms, and cancelling.", keywords: "edit change cancel booking list upcoming current completed" },
      { slug: "payments", title: "Advances, payments and balances", summary: "Record what guests pay and see what is still owed.", keywords: "payment advance deposit balance paid partially paid record" },
      { slug: "check-in-out", title: "Check-in and check-out", summary: "Check guests in, add extras to the bill, and settle up when they leave.", keywords: "check in check out final bill extras settle" },
      { slug: "receipts-whatsapp", title: "Receipts, invoices and WhatsApp", summary: "Print or send a confirmation receipt and the final invoice.", keywords: "receipt invoice pdf print whatsapp confirmation send" },
      { slug: "guests", title: "Guests", summary: "Guest details and stay history, so returning guests are quick to book.", keywords: "guest customer history contact phone" },
    ],
  },
  {
    title: "Money and staff",
    pages: [
      { slug: "expenses", title: "Expenses", summary: "Write down what you spend, by category.", keywords: "expense spend cost receipt category" },
      { slug: "bills", title: "Bills and reminders", summary: "Monthly, quarterly and yearly bills, with reminders when they are due.", keywords: "bills electricity water internet reminder due recurring utility" },
      { slug: "staff-payslips", title: "Staff and payslips", summary: "Add staff, make monthly payslips with EPF and ETF, and send them.", keywords: "staff salary wage payslip payroll epf etf employee" },
      { slug: "money", title: "The Money page", summary: "This month's revenue, expenses, profit and occupancy at a glance.", keywords: "money revenue profit occupancy month" },
      { slug: "reports", title: "Reports and exports", summary: "Income, expenses and occupancy over time, spreadsheets, and the monthly email.", keywords: "reports csv export excel spreadsheet monthly email accountant" },
    ],
  },
  {
    title: "Your account",
    pages: [
      { slug: "subscription", title: "Subscription and billing", summary: "Your plan, your card, payments, and cancelling.", keywords: "subscription billing card cancel invoice payment failed price" },
      { slug: "phone", title: "Using LankaStay on your phone", summary: "Where everything is on a phone, and adding it to your home screen.", keywords: "mobile phone app home screen more menu" },
      { slug: "faq", title: "Questions and answers", summary: "Quick answers to the things people ask most.", keywords: "faq help problem question support" },
    ],
  },
];

export const ALL_DOCS: (DocPage & { section: string })[] = DOC_SECTIONS.flatMap((s) => s.pages.map((p) => ({ ...p, section: s.title })));

export const findDoc = (slug: string) => ALL_DOCS.find((p) => p.slug === slug);

/** The guides before and after this one, for the links at the bottom. */
export function neighbours(slug: string) {
  const i = ALL_DOCS.findIndex((p) => p.slug === slug);
  return { prev: i > 0 ? ALL_DOCS[i - 1] : null, next: i >= 0 && i < ALL_DOCS.length - 1 ? ALL_DOCS[i + 1] : null };
}
