import { Callout, DocLink, H2, H3, Shot, ShotRow, Step, Steps, Terms, UI } from "../ui";

export function NewBooking() {
  return (
    <>
      <p>
        A booking takes three short steps: <strong>what</strong> to book, <strong>when</strong>, and <strong>who</strong> is staying.
        The app blocks nights that are already taken, so nothing gets booked twice.
      </p>
      <Callout type="note" title="Entire villa or a room?">
        <p>
          A booking for the <strong>entire villa</strong> keeps every room for that guest. A booking for <strong>one room</strong> leaves the other rooms free, but the entire villa
          can&apos;t then be booked on those nights. To give one group two rooms, make a booking for each room, or book the entire villa.
        </p>
      </Callout>

      <H2>Step 1: What would you like to book?</H2>
      <p>
        Press <UI>New booking</UI>, then <UI>Select</UI> under <strong>Entire Villa</strong> or <strong>Individual Room</strong>. Not sure yet? Press{" "}
        <UI>Not sure yet? Start with the dates</UI> to see what is free on the days you need.
      </p>
      <Shot src="nb-1-what" alt="Step 1: Entire Villa or Individual Room, each with a Select button" />

      <H2>Step 2: When is the stay?</H2>
      <Steps>
        <Step title="Tap the arrival day, then the leaving day">
          <p>Crossed-out days are already booked. Use the arrows to move between months.</p>
        </Step>
        <Step title="For a room, choose which one">
          <p>
            Rooms that are free show a <UI>Select</UI> button. A room that is taken says who has it, with a link to that booking.
          </p>
        </Step>
        <Step title={<>Press <UI>Continue</UI></>} />
      </Steps>
      <Shot src="nb-2-room" alt="Step 2: a month calendar to pick the dates, and the rooms with Select buttons" />

      <H2>Step 3: Who is staying?</H2>
      <Steps>
        <Step title="Enter the guest">
          <p>
            Full name and phone; email and country are optional. If the phone number is already on file, the booking is added to that guest&apos;s history instead of making a new
            guest.
          </p>
          <Shot src="nb-3-guest" alt="Step 3: the stay summary and the guest's name, phone, email and country" />
        </Step>
        <Step title="How many guests, and any extras">
          <p>
            Set adults and children. Add amenities with <UI>+</UI>, for example 2 breakfasts. If there are more guests than the room usually sleeps, the app says so, and you can still go
            ahead.
          </p>
          <Shot src="nb-3b-extras" alt="Adults, children, and the list of amenities with plus and minus buttons" />
        </Step>
        <Step title="Where the booking came from">
          <p>
            <UI>Direct</UI>, <UI>Booking.com</UI>, <UI>Airbnb</UI>, <UI>WhatsApp</UI>, <UI>Phone</UI> or <UI>Other</UI>. Reports use this to show where your income comes from.
          </p>
        </Step>
        <Step title="Payment">
          <p>
            The total is worked out for you: the nightly price times the nights, plus extras. To give this guest a different price, press <UI>Change price</UI>; only this booking changes.
          </p>
          <p>
            Under <strong>How much has the guest paid?</strong> enter the advance, or press <UI>Nothing yet</UI>, <UI>Half</UI> or <UI>Full amount</UI>. The balance updates as you go.
          </p>
          <Shot src="nb-3c-payment" alt="Where the booking came from, the total with Change price, how much the guest has paid, and the balance" />
        </Step>
        <Step title={<>Add any special requests, then press <UI>Confirm booking</UI></>} />
      </Steps>

      <H2>After confirming</H2>
      <p>The confirmation screen tells you what changed on the calendar, for example which rooms can still be booked for those dates.</p>
      <Shot src="nb-4-confirmed" alt="Booking confirmed, with what is still free and buttons for the receipt, the calendar and the booking" />
      <Terms
        rows={[
          [<UI key="1">View confirmation receipt</UI>, <>A receipt to print, save as PDF or send on WhatsApp. See <DocLink to="receipts-whatsapp">Receipts and invoices</DocLink>.</>],
          [<UI key="2">See it on the calendar</UI>, "Opens the calendar on those dates."],
          [<UI key="3">View booking</UI>, "Opens the booking to change it or record a payment."],
        ]}
      />

      <H2>Other ways to start a booking</H2>
      <ul>
        <li>
          On the <DocLink to="calendar">calendar</DocLink>, tap a free night: the room and arrival day are filled in.
        </li>
        <li>
          On a guest, press <UI>New booking for …</UI> to book a returning guest.
        </li>
      </ul>
    </>
  );
}

export function Calendar() {
  return (
    <>
      <p>The calendar shows the entire villa and every room down the side, and the days across, so you can see at a glance what is free and who is staying.</p>
      <Shot src="calendar" alt="The calendar: the entire villa and each room down the side, days across, bookings as coloured blocks" />

      <H2>Moving around</H2>
      <ul>
        <li>
          Use <UI>Earlier week</UI> and <UI>Later week</UI>, or press <UI>Today</UI> to come back.
        </li>
        <li>On a phone, swipe sideways to see more days.</li>
        <li>Tap a booking to open it.</li>
      </ul>

      <H2>What the colours mean</H2>
      <Terms
        rows={[
          ["Available", "Free. Tap the night to start a booking for that room (or the entire villa) from that day."],
          ["Booked", "A guest has it."],
          ["Check-in today", "The guest arrives today."],
          ["Completed", "The guest has checked out."],
          ["Unavailable", "Can't be booked: the entire villa is taken by one guest, or a room is taken so the entire villa isn't free."],
        ]}
      />
      <Callout type="tip">
        <p>The key is at the bottom of the calendar, under <em>What the colours mean</em>.</p>
      </Callout>
      <Shot src="m-calendar" phone alt="The calendar on a phone" caption="On a phone, swipe for more days." />
    </>
  );
}

export function ManageBookings() {
  return (
    <>
      <p>
        <UI>Bookings</UI> lists every booking in three tabs. Tap one to open it beside the list.
      </p>
      <Terms
        rows={[
          ["Upcoming", "Guests who haven't arrived yet, soonest first."],
          ["Current", "Guests staying now, including anyone checking out today."],
          ["Completed", "Stays that have finished."],
        ]}
      />
      <Shot src="bookings" alt="The Bookings page with the Upcoming, Current and Completed tabs and booking cards" />

      <H2>Open a booking</H2>
      <p>The booking shows the guest, the stay (dates, check-in and check-out times, nights and guests), the payment, notes, and what you can do next.</p>
      <ShotRow>
        <Shot src="booking-sheet" alt="An open booking: guest, stay dates and the payment with total, paid and balance" />
        <Shot src="booking-sheet-actions" alt="The bottom of an open booking: the receipt, Send on WhatsApp, Check in, Edit booking and Cancel booking" />
      </ShotRow>

      <H2>Change a booking</H2>
      <Steps>
        <Step title={<>Open the booking and press <UI>Edit booking</UI></>} />
        <Step title="Change what you need">
          <p>
            The dates, what is booked (the entire villa or another room), check-in and check-out times, adults and children, where it came from, extras, the total and notes. The
            booking keeps its own nightly price when you change the dates; moving to another room uses that room&apos;s price.
          </p>
        </Step>
        <Step title={<>Press <UI>Save changes</UI></>}>
          <p>
            You&apos;ll see <em>Booking updated</em>. If the new dates or room clash with another booking, the app says so and nothing is changed.
          </p>
        </Step>
      </Steps>

      <H2>Cancel a booking</H2>
      <Steps>
        <Step title={<>Open the booking and press <UI>Cancel booking</UI></>} />
        <Step title={<>Confirm with <UI>Cancel booking</UI></>}>
          <p>The dates open up again for other guests. Press <UI>Keep booking</UI> if you changed your mind.</p>
        </Step>
      </Steps>
    </>
  );
}

export function Payments() {
  return (
    <>
      <p>
        Every booking keeps its <strong>total</strong>, what the guest has <strong>paid</strong>, and the <strong>balance</strong> still to pay. You record payments as they come in:
        an advance when they book, the rest at check-out, or anything in between.
      </p>

      <H2>Payment status</H2>
      <Terms
        rows={[
          ["Unpaid", "Nothing paid yet."],
          ["Partially paid", "An advance or part payment is recorded; there's a balance."],
          ["Paid", "Paid in full."],
        ]}
      />

      <H2>Record a payment</H2>
      <Steps>
        <Step title={<>Open the booking and press <UI>Record a payment</UI></>} />
        <Step title="Enter the amount received">
          <p>
            Or press <UI>Full balance</UI> to fill in everything still owed.
          </p>
        </Step>
        <Step title={<>Press <UI>Save payment</UI></>}>
          <p>
            You&apos;ll see <em>Payment recorded</em>, and the balance goes down.
          </p>
        </Step>
      </Steps>
      <Shot src="record-payment" alt="Recording a payment on an open booking: the amount received, Full balance and Save payment" />

      <H2>Where to see what is owed</H2>
      <ul>
        <li>
          <strong>Home</strong>: <em>Payments pending</em> lists bookings with a balance, and the total still to collect.
        </li>
        <li>
          <strong>Money</strong>: <em>Still to collect from guests</em>.
        </li>
        <li>
          <strong>Reports</strong>: the bookings spreadsheet has the balance of every booking.
        </li>
      </ul>
      <Callout type="warning">
        <p>
          Guests must pay the full balance before you can check them out. See <DocLink to="check-in-out">Check-in and check-out</DocLink>.
        </p>
      </Callout>
    </>
  );
}

export function CheckInOut() {
  return (
    <>
      <p>
        Checking guests in and out keeps the Home screen and calendar right, and check-out is where you add last-minute extras and settle the bill.
      </p>

      <H2>Check a guest in</H2>
      <p>
        On arrival day, the guest is under <em>Today&apos;s activity</em> on Home. Press <UI>Check in</UI> there, or open the booking and press <UI>Check in</UI>. You&apos;ll see{" "}
        <em>… checked in</em>.
      </p>
      <Shot src="checkin-button" alt="An open booking with the Check in button" />

      <H2>Check a guest out</H2>
      <Steps>
        <Step title={<>Press <UI>Check out</UI></>}>
          <p>On Home under <em>Today&apos;s activity</em>, or on the open booking. Only guests who are checked in can check out.</p>
        </Step>
        <Step title="Add anything they had during the stay">
          <p>
            Under <strong>Anything to add?</strong> add amenities with <UI>+</UI>. For things that aren&apos;t on the list, like drinks or laundry, type a name and a price under{" "}
            <strong>Something else</strong> and press <UI>Add to the bill</UI>. The bill updates as you go.
          </p>
          <Shot src="checkout-1" alt="The check-out screen with Anything to add? and the amenities" />
        </Step>
        <Step title="Settle the final bill">
          <p>
            The final bill shows the stay, each extra, the total, what&apos;s already paid, and what&apos;s <strong>still to pay</strong>. Enter the payment under <strong>Payment received now</strong>{" "}
            and press <UI>Record</UI>.
          </p>
          <Shot src="checkout-2" alt="The final bill with the stay, total, already paid and still to pay, and Payment received now" />
        </Step>
        <Step title={<>Press <UI>Check out</UI></>}>
          <p>The invoice opens, ready to print or send on WhatsApp.</p>
        </Step>
      </Steps>
      <Callout type="warning" title="Payment needed before check-out">
        <p>If there&apos;s still a balance, the app stops and asks you to record the full payment first. This makes sure no stay ends with money owed.</p>
      </Callout>
    </>
  );
}

export function ReceiptsWhatsapp() {
  return (
    <>
      <p>Every booking has two documents, numbered for you:</p>
      <Terms
        rows={[
          ["Confirmation receipt (BK-…)", "For any booking: the stay, guests, total, what's paid and the balance. Send it when the guest books or pays an advance."],
          ["Invoice (INV-…)", "After check-out: the final bill with every extra."],
        ]}
      />
      <ShotRow>
        <Shot src="confirmation" alt="A booking confirmation receipt ready to print" caption="Confirmation receipt" />
        <Shot src="invoice" alt="An invoice ready to print" caption="Invoice" />
      </ShotRow>

      <H2>Print or save as PDF</H2>
      <Steps>
        <Step title={<>Open the booking and press <UI>Confirmation receipt</UI> (or <UI>Invoice</UI> after check-out)</>} />
        <Step title={<>Press <UI>Print or save as PDF</UI></>}>
          <p>
            Choose your printer, or <em>Save as PDF</em> to keep a copy or attach it to an email.
          </p>
        </Step>
      </Steps>

      <H2>Send on WhatsApp</H2>
      <p>
        Press <UI>Send on WhatsApp</UI> on the booking or the document. WhatsApp opens with the details written out (dates, times, total, paid and balance) and addressed to the
        guest&apos;s phone number. Check it, then press send in WhatsApp.
      </p>
      <Callout type="note">
        <p>
          Messages go from your own WhatsApp.
          Nothing is sent until you press send. For local numbers starting with 07, the 94 country code is added for you.
        </p>
      </Callout>
    </>
  );
}

export function Guests() {
  return (
    <>
      <p>
        Every guest you book is saved with their contact details and stay history, so a returning guest takes seconds to book. Search by name or phone at the top of <UI>Guests</UI>.
      </p>
      <Shot src="guests" alt="The Guests page with a search box and each guest's stays" />

      <H2>A guest&apos;s details and history</H2>
      <p>Tap a guest to see their phone, email and country, how many stays they&apos;ve had, how much they&apos;ve spent, and every booking.</p>
      <Shot src="guest-sheet" alt="A guest's details with total stays, total spent and booking history" />

      <H3>Book a returning guest</H3>
      <p>
        Press <UI>New booking for …</UI> on the guest. Or just enter the same phone number when making a booking: it&apos;s added to the same guest.
      </p>

      <H2>Add or change a guest</H2>
      <ul>
        <li>
          To add someone before they book, press <UI>Add guest</UI> (on Guests, or in Quick actions on Home).
        </li>
        <li>
          To fix a name or number, open the guest and press <UI>Edit details</UI>.
        </li>
      </ul>
      <Callout type="note">
        <p>
          Guest details belong to your villa and are never shown to other villas. You&apos;re responsible for them as the villa owner; see our <a href="/privacy">Privacy Policy</a>.
        </p>
      </Callout>
    </>
  );
}
