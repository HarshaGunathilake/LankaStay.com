import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { ContactLines, LegalDocument, Points, type LegalSection } from "@/components/site/legal";
import { SitePage } from "@/components/site/site-page";
import { LEGAL } from "@/lib/legal";
import { appLink } from "@/lib/links";
import { breadcrumbs, pageMeta, webPage } from "@/lib/server/seo";
import { loadSite } from "@/lib/server/site";
import { money } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await loadSite();
  return pageMeta({
    siteName: site.name,
    index: site.indexable,
    title: `Terms of Service | ${site.name}`,
    description: `The terms for using ${site.name}, villa booking and management software for Sri Lanka: your account, the monthly subscription, cancelling, your data and our responsibilities.`,
    path: "/terms",
  });
}

export default async function TermsPage() {
  const site = await loadSite();
  const name = site.name;
  const { operator, place } = LEGAL;
  const price = site.signup.monthlyAmount > 0 ? money(site.signup.monthlyAmount) : null;

  const sections: LegalSection[] = [
    {
      id: "about",
      title: "About these terms",
      body: (
        <>
          <p>
            {name} is provided by {operator}, {place} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). These terms are the agreement between us and you, the person or business that registers a villa account
            (&ldquo;you&rdquo;). They cover the {name} app at <a href={appLink("/")}>{appLink("").replace(/^https?:\/\//, "")}</a> and this website.
          </p>
          <p>
            By creating an account, ticking &ldquo;I agree&rdquo; at sign-up or using {name}, you accept these terms and our <Link href="/privacy">Privacy Policy</Link>. If you register for a business, you
            confirm that you are allowed to accept these terms for it.
          </p>
          <p>If you do not agree, please do not use {name}.</p>
        </>
      ),
    },
    {
      id: "service",
      title: "What the service is",
      body: (
        <>
          <p>
            {name} is online software for running a small villa: a booking calendar for the whole villa or single rooms, guests, payments and balances, invoices and receipts, expenses, bills, staff
            payslips and reports. It works in a web browser on a phone, tablet or computer.
          </p>
          <p>Please keep in mind:</p>
          <Points
            items={[
              <>It is a record-keeping tool. Bookings from Booking.com, Airbnb, WhatsApp or anywhere else are entered by you; {name} does not connect to those sites or take bookings for you.</>,
              <>Amounts, reports and payslips are worked out from what you enter. They are a guide, not accounting, tax or legal advice.</>,
              <>
                EPF and ETF on payslips use the standard rates (8%, 12% and 3%). You are responsible for checking that what you pay and report to the authorities follows the law in force at the
                time.
              </>,
              <>Messages to guests and staff on WhatsApp are sent from your own phone and WhatsApp account, not by us.</>,
            ]}
          />
        </>
      ),
    },
    {
      id: "account",
      title: "Your account",
      body: (
        <Points
          items={[
            <>You must be at least 18 and give true, current details when you register, including an email address you can receive mail at. We ask you to confirm it before the account opens.</>,
            <>Keep your password to yourself and choose one you don&apos;t use elsewhere. Tell us straight away if you think someone else has used your account.</>,
            <>
              You may let people who work at your villa, such as a manager or caretaker, use your account. You are responsible for everything done in it, by you or by them.
            </>,
            <>One account is for one villa. Each villa needs its own account and subscription.</>,
          ]}
        />
      ),
    },
    {
      id: "payments",
      title: "Subscription and payments",
      body: (
        <>
          <Points
            items={[
              <>
                {name} is a monthly subscription for each villa{price ? <>, currently {price} a month</> : null}. The price is shown in Sri Lankan rupees on our <Link href="/pricing">Pricing</Link> page and
                when you sign up, and includes every feature.
              </>,
              <>
                After you register and confirm your email, you can look around the app, but you can only add or change anything once you have made the first payment. Your villa opens as soon as that
                payment goes through.
              </>,
              <>
                Payments are made by card and processed by our payment partner, Dodo Payments, which acts as the merchant of record and may appear on your card statement. Their terms also apply to the
                payment itself. We never see or keep your full card number.
              </>,
              <>Your subscription renews and your card is charged automatically every month, on the same day as your first payment, until you cancel.</>,
              <>Any taxes that apply to the subscription are added at checkout where the law requires.</>,
              <>
                We may change the price. We will tell you by email at least 30 days before a new price applies to you, and you can cancel before then if you don&apos;t want to continue.
              </>,
            ]}
          />
          <h3>If a payment fails</h3>
          <p>
            We will email you and the payment will be tried again. While it is unpaid, your villa becomes read-only: you can still see and print everything, but you can&apos;t add or change anything.
            If the subscription ends because it stays unpaid, access stops until you pay again. Your records are kept, so you can carry on where you left off once you pay.
          </p>
        </>
      ),
    },
    {
      id: "cancel",
      title: "Cancelling and refunds",
      body: (
        <>
          <Points
            items={[
              <>You can cancel at any time from the Subscription page in the app, or by contacting us. There is no contract and no cancellation fee.</>,
              <>When you cancel, you keep full use of {name} until the end of the month you have already paid for. You are not charged again.</>,
              <>
                Payments are for a month at a time and are not refunded for months already started or partly used, except where the law requires it.
              </>,
              <>
                If you were charged by mistake, for example twice for the same month, or after you cancelled, contact us within 30 days and we will refund the charge to your card.
              </>,
            ]}
          />
        </>
      ),
    },
    {
      id: "data",
      title: "Your records",
      body: (
        <>
          <p>
            The records you put into {name}, such as rooms, bookings, guests, payments, expenses, bills and staff details, belong to you. You give us permission to store and process them only to provide
            the service to you, to keep it secure and to support you.
          </p>
          <Points
            items={[
              <>We keep each villa&apos;s records separate. Other villas cannot see yours.</>,
              <>We do not sell your records or use them for advertising.</>,
              <>You can download your bookings, expenses and payslips as spreadsheets (CSV) from the Reports page at any time.</>,
              <>
                How we handle personal information is explained in our <Link href="/privacy">Privacy Policy</Link>.
              </>,
            ]}
          />
        </>
      ),
    },
    {
      id: "guests-staff",
      title: "Information about your guests and staff",
      body: (
        <>
          <p>
            When you enter details about your guests and staff, you decide what is collected and why. Under Sri Lanka&apos;s Personal Data Protection Act, you are responsible for that information as its
            controller, and we look after it for you as your processor.
          </p>
          <p>You agree to:</p>
          <Points
            items={[
              <>only enter information you are allowed to collect and need for running your villa;</>,
              <>tell your guests and staff how you use their information, and answer their questions or requests about it;</>,
              <>keep staff pay records, such as EPF numbers, accurate and private.</>,
            ]}
          />
          <p>We will help you answer a guest&apos;s or staff member&apos;s request about their information where we reasonably can.</p>
        </>
      ),
    },
    {
      id: "use",
      title: "Acceptable use",
      body: (
        <>
          <p>Please use {name} fairly and lawfully. You must not:</p>
          <Points
            items={[
              <>use it for anything illegal, fraudulent or harmful, or to store information you have no right to hold;</>,
              <>try to get into another villa&apos;s account or records, or test, probe or get around our security;</>,
              <>overload, disrupt or attack the service, or use bots or scrapers on it;</>,
              <>copy, resell, rent out or reverse-engineer the software, or build a competing product from it;</>,
              <>use our name, logo or emails in a way that suggests you are us.</>,
            ]}
          />
          <p>If you find a security problem, please tell us privately so we can fix it.</p>
        </>
      ),
    },
    {
      id: "availability",
      title: "Availability and changes to the service",
      body: (
        <>
          <p>
            We work to keep {name} running all day, every day, and to fix problems quickly. Sometimes it may be unavailable, for example for maintenance or because of a problem with our hosting, internet
            or email providers. We will try to do planned work at quiet times and tell you in advance when we reasonably can.
          </p>
          <p>
            We improve {name} over time and may add, change or remove features. If we remove something important you rely on, we will tell you beforehand.
          </p>
        </>
      ),
    },
    {
      id: "ending",
      title: "Closing or suspending an account",
      body: (
        <>
          <Points
            items={[
              <>You can stop using {name} at any time. To close your account and delete your records, contact us.</>,
              <>
                We may pause or close an account if it stays unpaid, if these terms are seriously or repeatedly broken, if the account puts the service or other people at risk, or if the law requires
                it. Unless it&apos;s urgent or not allowed, we will tell you first and give you a chance to put things right.
              </>,
              <>
                When an account is closed, you can ask us for a copy of your records within 30 days. After that, we delete them as described in our <Link href="/privacy">Privacy Policy</Link>.
              </>,
            ]}
          />
        </>
      ),
    },
    {
      id: "liability",
      title: "Our responsibility to you",
      body: (
        <>
          <p>
            We provide {name} with reasonable care and skill. Apart from that, and as far as the law allows, it is provided &ldquo;as is&rdquo;: we can&apos;t promise it will never have errors or
            interruptions, or that it suits every purpose.
          </p>
          <p>As far as the law allows:</p>
          <Points
            items={[
              <>we are not responsible for lost bookings, profits, income or business opportunities, or for indirect losses;</>,
              <>we are not responsible for decisions you make based on what you enter, or for mistakes in the information you enter;</>,
              <>our total responsibility to you for any claim is limited to what you paid us for {name} in the three months before the claim arose.</>,
            ]}
          />
          <p>Nothing in these terms limits responsibility that the law does not allow us to limit, such as for fraud.</p>
          <p>
            You are responsible for claims made against us by your guests or staff that come from how you used {name} or the information you entered, unless they are caused by our own failure.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: (
        <p>
          We may update these terms, for example when we add features or the law changes. The date at the top shows the latest version. For important changes, we will email you at least 14 days before
          they take effect. If you keep using {name} after that, the new terms apply; if you don&apos;t agree, you can cancel before they start.
        </p>
      ),
    },
    {
      id: "law",
      title: "Law and disputes",
      body: (
        <p>
          These terms are governed by the laws of Sri Lanka. If you have a problem, please contact us first; most things can be sorted out quickly. If we can&apos;t resolve it together, the courts of
          Sri Lanka will decide.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact us",
      body: (
        <>
          <p>Questions about these terms or your account:</p>
          <ContactLines email={site.email} phone={site.phone} />
        </>
      ),
    },
  ];

  return (
    <SitePage site={site} alwaysOpen>
      <JsonLd
        items={[
          webPage("WebPage", "/terms", `Terms of Service | ${name}`, `The terms for using ${name}.`),
          breadcrumbs([{ name, path: "/" }, { name: "Terms of Service", path: "/terms" }]),
        ]}
      />
      <LegalDocument
        label="Legal"
        title="Terms of Service"
        other={{ href: "/privacy", label: "Read our Privacy Policy" }}
        summary={
          <>
            <p className="font-semibold">The short version</p>
            <p className="mt-2">
              {name} is a monthly subscription for each villa{price ? ` (${price} a month)` : ""}, paid by card and cancellable at any time. Your records belong to you, we keep them private and separate
              from other villas, and you can download them whenever you like. Please use it lawfully and look after your guests&apos; and staff&apos;s information. The full terms below are what count.
            </p>
          </>
        }
        sections={sections}
      />
    </SitePage>
  );
}
