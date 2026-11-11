import { appLink } from "@/lib/links";
import type { Site } from "@/lib/server/site";
import { money } from "@/lib/utils";
import { Callout, DocLink, H2, NextCards, Shot, Step, Steps, Terms, UI } from "../ui";

type P = { site: Site };

export function Introduction({ site }: P) {
  const name = site.name;
  return (
    <>
      <p>
        {name} keeps everything about running a small villa in one place: the booking calendar, guests, payments and balances, receipts and invoices, expenses, bills, staff payslips and
        reports. It works in the web browser on your phone, tablet or computer, so there is nothing to install.
      </p>
      <Shot src="dashboard" alt="The Home screen, with today's numbers, bills to pay and each room's status" caption="The Home screen: what's happening today, at a glance." />

      <H2>How the app is organised</H2>
      <p>The menu on the left (or the bar at the bottom of your phone) has a page for each part of your villa:</p>
      <Terms
        rows={[
          ["Home", "Today's check-ins and check-outs, bills to pay, money still to collect, and this month so far."],
          ["Calendar", "Every room, every night. Tap a free night to book it."],
          ["Bookings", "Upcoming, current and completed stays."],
          ["Guests", "Everyone who has stayed, with their history."],
          ["Expenses", "What you spend on the villa, by category."],
          ["Bills", "Electricity, water, internet and other bills that come round again, with reminders."],
          ["Staff", "Your staff and their monthly payslips, with EPF and ETF."],
          ["Money", "This month's revenue, expenses, profit and occupancy."],
          ["Reports", "Income, expenses and occupancy over any period, with spreadsheet downloads."],
          ["Rooms, Amenities, Villa settings", "How your villa is set up: rooms and prices, extras, times and details."],
          ["Subscription", "Your plan, your card and your payment records."],
        ]}
      />
      <p>
        The <UI>New booking</UI> button is always at the top of the menu on a computer, and floats above the bottom bar on a phone.
      </p>

      <H2>A few words we use</H2>
      <Terms
        rows={[
          ["Entire villa", "A booking for the whole villa. It keeps every room for that guest, so no single room can be booked on those nights."],
          ["Room booking", "A booking for one room. The other rooms stay free, but the entire villa can't be booked on those nights."],
          ["Advance", "Money the guest paid before arriving, such as a deposit. It's recorded on the booking."],
          ["Balance", "What the guest still has to pay. Guests must pay it in full before you check them out."],
          ["Amenities", "Extras you offer, like breakfast or an airport pickup, added to a booking's bill."],
        ]}
      />

      <H2>Where to start</H2>
      <NextCards
        items={[
          { to: "create-account", title: "Create your account", text: "Register your villa and confirm your email." },
          { to: "setup-checklist", title: "Set up in 10 minutes", text: "The first things to do, in order." },
          { to: "new-booking", title: "Make a booking", text: "Book the entire villa or a single room." },
          { to: "faq", title: "Questions and answers", text: `Quick answers about ${name}.` },
        ]}
      />
    </>
  );
}

export function CreateAccount({ site }: P) {
  const trial = site.signup.open ? site.signup.trialDays : 0;
  return (
    <>
      <p>
        Anyone with a villa in Sri Lanka can register. It takes about two minutes{trial > 0 ? `, and the first ${trial} days are free` : ""}.
      </p>

      <H2>Register your villa</H2>
      <Steps>
        <Step title={<>Open the Register page</>}>
          <p>
            Go to <a href={appLink("/register")}>{appLink("/register").replace(/^https?:\/\//, "")}</a>, or press <UI>Register</UI> at the top of this website.
          </p>
        </Step>
        <Step title="Fill in your details">
          <p>
            Your villa&apos;s name, its location, your name, your email address, your phone number and a password of at least 8 characters. Use an email address you can open now: we send a
            link to it.
          </p>
          <Shot src="register" alt="The Register page with the villa name, location, your name, email, phone and password fields" />
        </Step>
        <Step title="Accept the terms and press Create account">
          <p>
            Tick the box to accept the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>, then press <UI>Create account</UI>. You are signed in straight away.
          </p>
        </Step>
      </Steps>

      <H2>Confirm your email address</H2>
      <p>Before anything else, we check that the email address is yours.</p>
      <Steps>
        <Step title="Open the email we sent you">
          <p>
            It comes from {site.name} with the subject <em>Confirm your email for {site.name}</em>. If it isn&apos;t in your inbox after a minute, look in the spam or promotions folder.
          </p>
        </Step>
        <Step title={<>Press <UI>Confirm my email</UI> in the email</>}>
          <p>The page that opens says <em>Email confirmed</em>. Press <UI>Continue</UI> to go to your villa.</p>
        </Step>
      </Steps>
      <Shot src="verify-email" alt="The Confirm your email screen with the I've confirmed it and Send the email again buttons" caption="Until you confirm, the app shows this screen." />
      <Terms
        rows={[
          [<UI key="a">I&apos;ve confirmed it</UI>, "Press this after confirming in another tab or on your phone, to carry on here."],
          [<UI key="b">Send the email again</UI>, "Sends a new link. Only the newest link works, and each link works for 24 hours."],
          [<UI key="c">Wrong email? Change it</UI>, "Fix a typo in your email address and send the link there instead."],
        ]}
      />

      <H2>What happens next</H2>
      <p>
        You land on your villa&apos;s Home screen with a popup to {trial > 0 ? "start your free trial" : "subscribe"}. You can start now, or press <UI>Look around first</UI> to explore
        with a short guided tour. Adding rooms and bookings starts working once you have {trial > 0 ? "started the trial" : "subscribed"}.
      </p>
      <NextCards items={[{ to: "free-trial", title: trial > 0 ? "Start your free trial" : "Start your subscription", text: "Add your card and open your villa." }]} />
    </>
  );
}

export function FreeTrial({ site }: P) {
  const trial = site.signup.open ? site.signup.trialDays : 0;
  const price = site.signup.monthlyAmount > 0 ? money(site.signup.monthlyAmount) : "the monthly price";
  return (
    <>
      <p>
        {trial > 0 ? (
          <>
            New villas get <strong>{trial} days free</strong>. You add a card when you start, but nothing is charged until the trial ends. After that it&apos;s {price} a month, and you can
            cancel at any time.
          </>
        ) : (
          <>
            {site.name} is {price} a month for each villa, with every feature included. You can cancel at any time.
          </>
        )}
      </p>
      <Shot src="subscribe-popup" alt={`The popup that offers the ${trial || 30}-day free trial, with Add card and start free trial and Look around first`} caption="The popup you see after confirming your email." />

      <H2>Start the trial</H2>
      <Steps>
        <Step title={<>Press <UI>{trial > 0 ? "Add card and start free trial" : "Subscribe"}</UI></>}>
          <p>
            In the popup, or from the <UI>Start free trial</UI> button at the top of any page. You can also go to <UI>Subscription</UI> in the menu.
          </p>
        </Step>
        <Step title="Enter your card on the secure payment page">
          <p>
            Card payments are handled by Dodo Payments, our payment partner. Your card details go straight to them and never reach {site.name}.
            {trial > 0 ? " Your bank may show a check for a small or zero amount to confirm the card; you are not charged for the trial." : ""}
          </p>
        </Step>
        <Step title="Come back to the app">
          <p>
            You&apos;re sent back to the Subscription page, which shows <em>Confirming…</em> for a moment. Then your villa opens and everything works: rooms, bookings, expenses and the
            rest.
          </p>
        </Step>
      </Steps>
      <Shot src="subscription-trial-offer" alt="The Subscription page before adding a card, with the Add card and start free trial button" />

      {trial > 0 ? (
        <>
          <H2>During and after the trial</H2>
          <ul>
            <li>The Subscription page shows <em>Free trial</em>, the last free day and the date of the first charge.</li>
            <li>We email you about 3 days before the first charge.</li>
            <li>When the trial ends, your card is charged {price}, and then every month on the same day.</li>
            <li>
              To stop, cancel before the trial ends and you pay nothing. See <DocLink to="subscription">Subscription and billing</DocLink>.
            </li>
          </ul>
        </>
      ) : null}

      <H2>Looking around first</H2>
      <p>
        Press <UI>Look around first</UI> to explore before {trial > 0 ? "starting the trial" : "paying"}. A short guided tour shows where everything is. You can open every page, but
        saving anything (a room, a booking, an expense) asks you to {trial > 0 ? "start the trial" : "subscribe"} first.
      </p>
      <Shot src="tour-welcome" alt="The guided tour's welcome card, with Show me around and Skip for now" caption="The guided tour points at each part of the app in turn." />
      <Callout type="note">
        <p>
          The tour shows once. If you skip it, everything it covers is in these guides; start with <DocLink to="setup-checklist">Set up in 10 minutes</DocLink>.
        </p>
      </Callout>
    </>
  );
}

export function SetupChecklist() {
  return (
    <>
      <p>Do these once, in this order, and you&apos;re ready to take bookings. Each step links to its full guide.</p>
      <Steps>
        <Step title="Check your villa details">
          <p>
            Open <UI>Villa settings</UI>. Check the villa name, location and phone, and your name (it&apos;s used for the greeting on Home). See <DocLink to="villa-settings">Villa settings</DocLink>.
          </p>
        </Step>
        <Step title="Set check-in and check-out times">
          <p>
            In <UI>Villa settings</UI> → <UI>Stays and price</UI>. They are printed on receipts and used for every booking.
          </p>
        </Step>
        <Step title="Set the price for the entire villa">
          <p>Same tab: the price per night when one guest takes the whole villa, and the most guests it sleeps.</p>
        </Step>
        <Step title="Add your rooms">
          <p>
            <UI>Rooms</UI> → <UI>Add room</UI>: a name, a short description, the price per night and how many people it sleeps. See <DocLink to="rooms">Rooms</DocLink>.
          </p>
        </Step>
        <Step title="Add your extras (optional)">
          <p>
            <UI>Amenities</UI> → <UI>Add amenity</UI>: breakfast, an airport pickup, a BBQ evening… with a price. See <DocLink to="amenities">Amenities and extras</DocLink>.
          </p>
        </Step>
        <Step title="Enter the bookings you already have">
          <p>
            Press <UI>New booking</UI> for each guest who has already booked, including any advance they paid. See <DocLink to="new-booking">Make a booking</DocLink>.
          </p>
        </Step>
        <Step title="Add your bills and staff (optional)">
          <p>
            <DocLink to="bills">Bills</DocLink> reminds you when electricity, water or internet are due. <DocLink to="staff-payslips">Staff</DocLink> makes the monthly payslips.
          </p>
        </Step>
      </Steps>
      <Callout type="tip">
        <p>
          Until rooms and an entire-villa price are set, Home shows a <em>Finish setting up your villa</em> box with buttons that take you straight there.
        </p>
      </Callout>
    </>
  );
}

export function HomeScreen() {
  return (
    <>
      <p>
        Home is the first thing you see after signing in. It answers: who&apos;s arriving and leaving today, which rooms are free tonight, what needs paying, and how the month is going.
      </p>
      <Shot src="dashboard" alt="The top of the Home screen: today's check-ins, check-outs, guests staying and rooms available" />

      <H2>Today in numbers</H2>
      <p>
        Four tiles: <strong>check-ins</strong> today, <strong>check-outs</strong> today, <strong>guests staying</strong> tonight and <strong>rooms available</strong> tonight.
      </p>

      <H2>Bills to pay</H2>
      <p>
        Bills that are overdue or due in the next few days, with a <UI>Pay</UI> button. A red number at the top of the page and on <UI>Bills</UI> in the menu shows how many are overdue or due in the next 3 days. See{" "}
        <DocLink to="bills">Bills and reminders</DocLink>.
      </p>

      <H2>Villa availability today</H2>
      <p>Whether the entire villa is free tonight, and each room&apos;s status: available, or who is checking in or out.</p>

      <H2>Today&apos;s activity</H2>
      <p>
        Each guest checking in or out today, with <UI>View booking</UI> and a <UI>Check in</UI> or <UI>Check out</UI> button. See <DocLink to="check-in-out">Check-in and check-out</DocLink>.
      </p>

      <H2>The rest of the page</H2>
      <Terms
        rows={[
          ["Quick actions", <>Buttons for <UI key="1">New booking</UI>, <UI key="2">Add expense</UI> and <UI key="3">Add guest</UI>.</>],
          ["Upcoming bookings", "The next guests to arrive. Tap one to open it."],
          ["Payments pending", "Bookings that still have a balance, and the total still to collect."],
          ["This month so far", "Revenue, expenses and estimated profit for the month."],
          ["Latest expenses", "The last few things you spent money on."],
          ["Your subscription", "Your plan, the next payment date and the latest payments."],
        ]}
      />
      <Callout type="note">
        <p>When a subscription payment is due soon or late, a coloured strip near the top says so, with a link to the Subscription page.</p>
      </Callout>
    </>
  );
}

export function SignIn({ site }: P) {
  return (
    <>
      <H2>Sign in</H2>
      <Steps>
        <Step title={<>Go to the sign-in page</>}>
          <p>
            Open <a href={appLink("/login")}>{appLink("/login").replace(/^https?:\/\//, "")}</a>, or press <UI>Sign in</UI> at the top of this website.
          </p>
        </Step>
        <Step title="Enter your email address and password">
          <p>
            Leave <UI>Keep me signed in</UI> ticked on your own phone or computer. Untick it on a shared computer.
          </p>
        </Step>
      </Steps>
      <Shot src="login" alt="The sign-in page with email, password and Keep me signed in" />
      <Terms
        rows={[
          ["Keep me signed in ticked", "You stay signed in for 30 days on that device."],
          ["Not ticked", "You are signed out after 12 hours."],
        ]}
      />
      <Callout type="note">
        <p>After several wrong passwords in a row, sign-in for that email pauses for a few minutes, to stop guessing.</p>
      </Callout>

      <H2>Forgot your password?</H2>
      <Steps>
        <Step title={<>Press <UI>Forgot your password?</UI> on the sign-in page</>} />
        <Step title={<>Enter your email address and press <UI>Send reset link</UI></>}>
          <Shot src="forgot-password" alt="The Forgot your password page with the email field" />
        </Step>
        <Step title="Open the email and choose a new password">
          <p>The link works once, and for 1 hour. If it has expired, ask for a new one.</p>
        </Step>
      </Steps>

      <H2>Change your password</H2>
      <p>
        Signed in, go to <UI>Villa settings</UI> → <UI>Password</UI>. Enter your current password and the new one twice. Changing it signs you out on every other phone or computer.
      </p>

      <H2>Sign out</H2>
      <p>
        On a computer, <UI>Sign out</UI> is at the bottom of the menu on the left. On a phone, open <UI>More</UI> and scroll to the bottom.
      </p>
      <Callout type="warning" title="Can't sign in at all?">
        <p>
          If {site.name} says your villa is switched off or your subscription has ended, see <DocLink to="subscription">Subscription and billing</DocLink>, or{" "}
          <a href="/contact">contact us</a>.
        </p>
      </Callout>
    </>
  );
}
