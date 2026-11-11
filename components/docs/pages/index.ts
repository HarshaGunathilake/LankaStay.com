import type { Site } from "@/lib/server/site";
import { Faq, Phone, Subscription } from "./account";
import { Calendar, CheckInOut, Guests, ManageBookings, NewBooking, Payments, ReceiptsWhatsapp } from "./bookings";
import { CreateAccount, FreeTrial, HomeScreen, Introduction, SetupChecklist, SignIn } from "./getting-started";
import { Bills, Expenses, MoneyPage, Reports, StaffPayslips } from "./money";
import { Amenities, Rooms, VillaSettings } from "./setup";

/** The text of each guide, by its address (see lib/docs.ts for the order and titles). */
export const DOC_BODIES: Record<string, (props: { site: Site }) => React.ReactNode> = {
  introduction: Introduction,
  "create-account": CreateAccount,
  "free-trial": FreeTrial,
  "setup-checklist": SetupChecklist,
  "home-screen": HomeScreen,
  "sign-in": SignIn,
  "villa-settings": VillaSettings,
  rooms: Rooms,
  amenities: Amenities,
  "new-booking": NewBooking,
  calendar: Calendar,
  "manage-bookings": ManageBookings,
  payments: Payments,
  "check-in-out": CheckInOut,
  "receipts-whatsapp": ReceiptsWhatsapp,
  guests: Guests,
  expenses: Expenses,
  bills: Bills,
  "staff-payslips": StaffPayslips,
  money: MoneyPage,
  reports: Reports,
  subscription: Subscription,
  phone: Phone,
  faq: Faq,
};
