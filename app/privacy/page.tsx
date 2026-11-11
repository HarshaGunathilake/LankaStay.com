import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/site/json-ld";
import { ContactLines, LegalDocument, Points, type LegalSection } from "@/components/site/legal";
import { SitePage } from "@/components/site/site-page";
import { LEGAL } from "@/lib/legal";
import { breadcrumbs, pageMeta, webPage } from "@/lib/server/seo";
import { loadSite } from "@/lib/server/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await loadSite();
  return pageMeta({
    siteName: site.name,
    index: site.indexable,
    title: `Privacy Policy | ${site.name}`,
    description: `How ${site.name} collects, uses and protects personal information: villa owners, their guests and staff, and visitors to this website.`,
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
  const site = await loadSite();
  const name = site.name;
  const { operator, place } = LEGAL;

  const sections: LegalSection[] = [
    {
      id: "who",
      title: "Who we are",
      body: (
        <>
          <p>
            {name} is provided by {operator}, {place} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy explains what personal information we handle, why, and the choices and rights you have. It
            follows Sri Lanka&apos;s Personal Data Protection Act, No. 9 of 2022.
          </p>
          <p>It covers:</p>
          <Points
            items={[
              <>villa owners and managers who use the {name} app;</>,
              <>guests and staff whose details villa owners enter into the app;</>,
              <>people who visit this website, contact us or join our waiting list.</>,
            ]}
          />
        </>
      ),
    },
    {
      id: "roles",
      title: "Our role",
      body: (
        <>
          <p>
            <strong>For villa owners and website visitors</strong>, we decide how your information is used, so we are its <em>controller</em>.
          </p>
          <p>
            <strong>For guests and staff</strong>, the villa owner decides what to record about you and why. The villa is the <em>controller</em> and we are its <em>processor</em>: we store and
            process the information only to provide {name} to the villa, following its instructions and this policy. If you are a guest or staff member, please contact the villa first about your
            information. We will help where we can.
          </p>
        </>
      ),
    },
    {
      id: "collect",
      title: "What we collect",
      body: (
        <>
          <h3>When you register and use the app</h3>
          <Points
            items={[
              <>Your name, email address and phone number, and your villa&apos;s name and location.</>,
              <>Your password, stored only in a scrambled (hashed) form that no one, including us, can read.</>,
              <>
                The records you enter for your villa: rooms and prices, bookings, payments received, extras, invoices, expenses (with the file name of any receipt you note), bills, settings and
                reports.
              </>,
              <>Guest details you enter: name, phone number, email address, country, and their stays and payments.</>,
              <>Staff details you enter: name, job, phone number, pay, EPF number if you add it, and payslips.</>,
            ]}
          />
          <h3>When you pay</h3>
          <p>
            Card payments are handled by Dodo Payments, our payment partner and merchant of record. They collect your card and billing details under their own privacy policy. We never see or store
            your full card number. From them we receive and keep your customer reference, your subscription status, and the amounts and dates of your payments.
          </p>
          <h3>Automatically</h3>
          <Points
            items={[
              <>A sign-in cookie that keeps you signed in (see Cookies below).</>,
              <>
                Your IP address and browser details when you use the app, to keep it secure, limit repeated attempts such as password guessing, and investigate problems. Our hosting provider also keeps
                short-term technical logs.
              </>,
              <>A record of the emails we send you (which email, when, and whether it was delivered), and of important actions in your account, such as payments and changes to your subscription.</>,
            ]}
          />
          <h3>From this website</h3>
          <Points
            items={[
              <>When you use the Contact us form: your name, email address, phone number and villa name if you give them, and your message.</>,
              <>When you join our waiting list: your email address.</>,
            ]}
          />
          <p>
            We do not use analytics, advertising or tracking tools on this website or in the app, and we do not buy information about you from anyone.
          </p>
        </>
      ),
    },
    {
      id: "use",
      title: "How we use it",
      body: (
        <>
          <Points
            items={[
              <>To create and run your account, and to show your villa&apos;s records to you and the people you let use it.</>,
              <>To take your subscription payments and manage your subscription.</>,
              <>
                To send emails about your account: confirming your email address, password resets, payment receipts and problems, and the monthly report if you switch it on.
              </>,
              <>To answer your questions and give you support.</>,
              <>To keep {name} secure, prevent misuse and fix problems.</>,
              <>To improve {name}, using what we learn from support requests and how features are used, without sharing your records.</>,
              <>To tell people on our waiting list when {name} opens.</>,
              <>To meet our legal obligations, for example keeping payment records for tax.</>,
            ]}
          />
          <p>
            We do not sell personal information, and we do not use your villa&apos;s records, guests or staff for marketing. We do not send you marketing emails unless you have asked for them, and every such
            email lets you stop them.
          </p>
          <h3>Our legal reasons</h3>
          <p>
            We use information because we need it to provide the service you signed up for (our contract with you), because we have a legitimate interest in running a secure and reliable service, because
            the law requires it, or because you agreed, as when you join the waiting list. You can withdraw that agreement at any time.
          </p>
        </>
      ),
    },
    {
      id: "share",
      title: "Who we share it with",
      body: (
        <>
          <p>We share information only with service providers who help us run {name}, and only what they need:</p>
          <Points
            items={[
              <>our hosting and database providers, who store the app and its data;</>,
              <>our email provider, who delivers the emails the app sends;</>,
              <>Dodo Payments, who processes subscription payments.</>,
            ]}
          />
          <p>They may use the information only to provide their service to us, and must keep it secure and confidential.</p>
          <p>We may also share information:</p>
          <Points
            items={[
              <>when the law, a court or a government authority requires it;</>,
              <>to protect the rights, safety or property of our users, the public or us;</>,
              <>with a new owner if {name} or {operator}&apos;s business is sold or reorganised, who must keep protecting it as this policy says. We will tell you if this happens.</>,
            ]}
          />
          <p>
            Your villa&apos;s guests and staff are never shown to other villas. Messages you send to guests or staff on WhatsApp go from your own phone and WhatsApp account; we don&apos;t receive them.
          </p>
        </>
      ),
    },
    {
      id: "transfers",
      title: "Where it is stored",
      body: (
        <p>
          Some of our service providers have their servers outside Sri Lanka, so your information may be stored and processed in other countries. When it is, we use providers who protect it with security
          and confidentiality commitments at least as strong as this policy, as Sri Lanka&apos;s data protection law requires.
        </p>
      ),
    },
    {
      id: "keep",
      title: "How long we keep it",
      body: (
        <Points
          items={[
            <>Your account and villa records: for as long as your account is open.</>,
            <>
              After an account is closed: you can ask for a copy within 30 days; after that, we delete the villa&apos;s records within 90 days, including from our backups as they are replaced.
            </>,
            <>Payment and subscription records: as long as tax and accounting law requires, even after the account is closed.</>,
            <>Sign-in sessions: they end after 12 hours, or 30 days if you choose &ldquo;Keep me signed in&rdquo;. Password reset links stop working after an hour, and email confirmation links after 24 hours.</>,
            <>Messages sent through the Contact us form: up to two years, so we can follow up.</>,
            <>Waiting list emails: until we have told you that {name} is open, or sooner if you ask us to remove yours.</>,
          ]}
        />
      ),
    },
    {
      id: "security",
      title: "How we protect it",
      body: (
        <>
          <Points
            items={[
              <>Everything is sent over encrypted (HTTPS) connections.</>,
              <>Passwords are stored hashed, never as plain text.</>,
              <>Each villa&apos;s records are kept separate, and every request is checked so that a villa can only reach its own records.</>,
              <>Only a few people at {operator} can reach the systems, and only when needed to run or support {name}.</>,
              <>Repeated wrong passwords are slowed down, and sessions end when you sign out.</>,
            ]}
          />
          <p>
            No system is perfectly secure. If we learn of a breach that puts your information at risk, we will tell you and the authorities as the law requires, and act quickly to limit it.
          </p>
        </>
      ),
    },
    {
      id: "rights",
      title: "Your rights",
      body: (
        <>
          <p>Under Sri Lanka&apos;s Personal Data Protection Act, you can ask us to:</p>
          <Points
            items={[
              <>tell you whether we hold information about you and give you a copy;</>,
              <>correct information that is wrong or incomplete;</>,
              <>delete your information, when we no longer need it or have no lawful reason to keep it;</>,
              <>stop or limit using it in some ways, or object to how we use it;</>,
              <>withdraw your agreement where we rely on it, such as for the waiting list.</>,
            ]}
          />
          <p>
            Villa owners can see, change and download most of their information in the app themselves. For anything else, contact us. We may ask you to confirm who you are, and we will reply within the
            time the law allows. If you are a guest or staff member, please ask the villa first; we will help them answer.
          </p>
          <p>
            If you are unhappy with how we handled your information, please tell us so we can put it right. You can also complain to the Data Protection Authority of Sri Lanka.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies",
      body: (
        <>
          <p>We use only the cookies needed for {name} to work. We don&apos;t use advertising or tracking cookies, so there is nothing to opt out of.</p>
          <Points
            items={[
              <>
                <strong>Sign-in cookie</strong> (app): keeps you signed in, and ends when you sign out or your session ends.
              </>,
              <>
                <strong>Platform admin sign-in cookie</strong> (app): the same, for our own team.
              </>,
              <>
                <strong>Preview cookie</strong> (this website): only set if our team opens a private preview link, so they can check the site before it launches.
              </>,
            ]}
          />
        </>
      ),
    },
    {
      id: "children",
      title: "Children",
      body: (
        <p>
          {name} is for businesses and adults. Villa accounts must be opened by people aged 18 or over. Villas may record the details of guests of any age as part of a booking; that information is
          handled as described above.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: (
        <p>
          We may update this policy when {name} or the law changes. The date at the top shows the latest version. If a change affects how we use your information in an important way, we will tell villa
          owners by email before it takes effect.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact us",
      body: (
        <>
          <p>For questions about your information or this policy, or to use any of your rights:</p>
          <ContactLines email={site.email} phone={site.phone} />
          <p>
            See also our <Link href="/terms">Terms of Service</Link>.
          </p>
        </>
      ),
    },
  ];

  return (
    <SitePage site={site} alwaysOpen>
      <JsonLd
        items={[
          webPage("WebPage", "/privacy", `Privacy Policy | ${name}`, `How ${name} handles personal information.`),
          breadcrumbs([{ name, path: "/" }, { name: "Privacy Policy", path: "/privacy" }]),
        ]}
      />
      <LegalDocument
        label="Legal"
        title="Privacy Policy"
        other={{ href: "/terms", label: "Read our Terms of Service" }}
        summary={
          <>
            <p className="font-semibold">The short version</p>
            <p className="mt-2">
              We collect what we need to run {name}: your account details, the records you keep for your villa, and your payments through our payment partner. We use it only to provide and support the
              service. We don&apos;t sell it, we don&apos;t use tracking or advertising cookies, and each villa&apos;s records are kept separate. You can ask to see, correct or delete your information at
              any time.
            </p>
          </>
        }
        sections={sections}
      />
    </SitePage>
  );
}
