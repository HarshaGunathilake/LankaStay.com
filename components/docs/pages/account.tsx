import { Fragment } from "react";
import type { Site } from "@/lib/server/site";
import { money } from "@/lib/utils";
import { Callout, DocLink, H2, H3, Shot, ShotRow, Step, Steps, Terms, UI } from "../ui";

type P = { site: Site };

export function Subscription({ site }: P) {
  const price = site.signup.monthlyAmount > 0 ? money(site.signup.monthlyAmount) : "the monthly price";
  return (
    <>
      <p>
        {site.name} is a monthly subscription for each villa, {price} a month, with every feature included. You pay by card through Dodo Payments, our payment partner, and your card is
        charged automatically each month until you cancel.
      </p>
      <Shot src="subscription" alt="The Subscription page: the plan, price and status, the next payment, the card, and payment records" />

      <H2>What the Subscription page shows</H2>
      <Terms
        rows={[
          ["Plan and status", "Your monthly price, and whether the subscription is active, on a free trial, or has a payment due."],
          ["Next payment due", "When your card is charged next. During a free trial, the first charge."],
          ["Paid until", "The last day covered by your latest payment."],
          ["Payment", <>How you pay, with <UI key="m">Manage card and billing</UI>.</>],
          ["Payment records", "Every payment, the date, and the month it covers."],
        ]}
      />

      <H2>Change your card, or see invoices</H2>
      <Steps>
        <Step title={<>Press <UI>Manage card and billing</UI></>}>
          <p>Dodo Payments&apos; secure billing page opens.</p>
        </Step>
        <Step title="Change your card, download invoices, or cancel">
          <p>When you&apos;re done, go back to {site.name}.</p>
        </Step>
      </Steps>

      <H2>Cancel your subscription</H2>
      <p>
        Press <UI>Manage card and billing</UI> and cancel there. You keep full use of {site.name} until the end of the month you&apos;ve paid for (or the end of your free trial), and
        you aren&apos;t charged again. There&apos;s no contract and no cancellation fee.
      </p>
      <Callout type="note" title="Your records are kept">
        <p>When the subscription ends, the villa switches off, but nothing is deleted. Sign in and subscribe again at any time to carry on where you left off.</p>
      </Callout>

      <H2>If a card payment fails</H2>
      <Steps>
        <Step title="We email you, and the payment is tried again">
          <p>
            The Subscription page says <em>Your last card payment did not go through</em>.
          </p>
        </Step>
        <Step title="Your villa becomes read-only">
          <p>You can still see and print everything, but adding or changing anything is paused until it&apos;s paid. A strip at the top of each page says so.</p>
        </Step>
        <Step title={<>Press <UI>Update card</UI> and fix the card</>}>
          <p>As soon as the payment goes through, everything works again.</p>
        </Step>
      </Steps>
      <Callout type="warning">
        <p>If the payment keeps failing, the subscription ends and the villa switches off until you pay again. Your records are kept.</p>
      </Callout>

      <H2>Price changes</H2>
      <p>
        If the price changes, we email you at least 30 days before the new price applies to you, so you can cancel first if you prefer. See the <a href="/terms">Terms of Service</a>.
      </p>

      <H3>Questions about a payment?</H3>
      <p>
        <a href="/contact">Contact us</a>. If you were charged by mistake, for example twice for the same month, tell us within 30 days and we&apos;ll refund it.
      </p>
    </>
  );
}

export function Phone() {
  return (
    <>
      <p>
        Everything works on a phone, in the web browser. The menu moves to a bar along the bottom, and the <UI>New booking</UI> button floats just above it.
      </p>
      <ShotRow>
        <Shot src="m-dashboard" phone alt="The Home screen on a phone, with the bar along the bottom" caption="Home, with the bar along the bottom." />
        <Shot src="m-more" phone alt="The More page on a phone, listing Expenses, Bills, Staff, Money and the other pages" caption="More: everything else." />
      </ShotRow>

      <H2>Where everything is</H2>
      <Terms
        rows={[
          ["The bottom bar", "Home, Calendar, Bookings, Guests and More."],
          ["More", "Expenses, Bills, Staff, Money, Reports, Rooms, Amenities, Villa settings and Subscription, and Sign out at the bottom."],
          ["Red number on More", "Bills that are overdue or due in the next 3 days."],
        ]}
      />

      <H2>Add it to your home screen</H2>
      <p>Open the app like any other app, with one tap:</p>
      <Terms
        rows={[
          ["iPhone (Safari)", <>Sign in, press the <strong key="a">Share</strong> button, then <strong key="b">Add to Home Screen</strong>.</>],
          ["Android (Chrome)", <>Sign in, press the <strong key="a">⋮</strong> menu, then <strong key="b">Add to Home screen</strong>.</>],
        ]}
      />
      <Callout type="tip">
        <p>Tick <UI>Keep me signed in</UI> on your own phone so you stay signed in for 30 days.</p>
      </Callout>

      <H2>Sending to guests and staff</H2>
      <p>
        On a phone, <UI>Send on WhatsApp</UI> opens the WhatsApp app with the message ready. See <DocLink to="receipts-whatsapp">Receipts, invoices and WhatsApp</DocLink>.
      </p>
    </>
  );
}

export function Faq({ site }: P) {
  const name = site.name;
  const qa: [string, React.ReactNode][] = [
    [
      "Can a room be booked twice by mistake?",
      <>No. Taken nights are crossed out when you book, and the app won&apos;t save a booking that clashes, including an entire-villa booking over a booked room.</>,
    ],
    [
      "Does it connect to Booking.com or Airbnb?",
      <>
        Not automatically. You enter bookings from Booking.com, Airbnb, WhatsApp or anywhere else yourself, and choose where each came from, so <DocLink to="reports">Reports</DocLink> can
        show your income by source.
      </>,
    ],
    [
      "Can my manager or caretaker use it?",
      <>Yes, you can let people who work at your villa sign in with your account. You&apos;re responsible for what is done in it, so choose a strong password.</>,
    ],
    ["I have two villas. Can I use one account?", <>Each villa needs its own account and subscription, with a different email address.</>],
    [
      "Can I get my records out?",
      <>
        Yes. Download bookings, expenses and a monthly summary as spreadsheets from <DocLink to="reports">Reports</DocLink>, or get them by email every month.
      </>,
    ],
    ["Does it work without the internet?", <>No, it needs a connection. It works on mobile data and uses very little.</>],
    ["Which currency does it use?", <>Sri Lankan rupees (LKR), for prices, payments and reports.</>],
    [
      "How do I change my email address?",
      <>
        <a href="/contact">Contact us</a> and we&apos;ll change it for you.
      </>,
    ],
    [
      "How do I close my account?",
      <>
        Cancel your subscription (see <DocLink to="subscription">Subscription and billing</DocLink>), then <a href="/contact">contact us</a> to delete your records. You can ask for a copy
        first.
      </>,
    ],
    [
      `Is my data safe with ${name}?`,
      <>
        Each villa&apos;s records are kept separate, everything is sent encrypted, and passwords are stored scrambled. See our <a href="/privacy">Privacy Policy</a>.
      </>,
    ],
  ];
  return (
    <>
      {qa.map(([q, a]) => (
        <Fragment key={q}>
          <H2>{q}</H2>
          <p className="!mt-3">{a}</p>
        </Fragment>
      ))}
      <p className="!mt-12">
        Something else? <a href="/contact">Ask us</a>. We reply ourselves.
      </p>
    </>
  );
}
