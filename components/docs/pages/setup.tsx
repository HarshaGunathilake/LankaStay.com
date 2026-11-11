import { Callout, DocLink, H2, Shot, Step, Steps, Terms, UI } from "../ui";

export function VillaSettings() {
  return (
    <>
      <p>
        <UI>Villa settings</UI> holds your villa&apos;s details, how stays work, the monthly report email and your password. It has four tabs.
      </p>
      <Shot src="settings" alt="Villa settings with the Villa details, Stays and price, Monthly report and Password tabs" />

      <H2>Villa details</H2>
      <Terms
        rows={[
          ["Villa name", "Shown in the app, on receipts, invoices and payslips."],
          ["Location", "For example, Mirissa, Matara."],
          ["Phone", "The villa's phone number, printed on receipts."],
          ["Your name", "Used for the greeting on the Home screen."],
        ]}
      />

      <H2>Stays and price</H2>
      <Terms
        rows={[
          ["Booking the entire villa", "The price per night when one guest takes the whole villa, and the most guests it sleeps. Room prices are set on the Rooms page."],
          ["Check-in and check-out", "The time guests can arrive from, and the time they leave by. Used for every booking and printed on receipts."],
        ]}
      />
      <Steps>
        <Step title="Change what you need">
          <p>
            An <em>Unsaved changes</em> bar appears at the bottom.
          </p>
        </Step>
        <Step title={<>Press <UI>Save changes</UI></>}>
          <p>You&apos;ll see <em>Settings saved</em>.</p>
        </Step>
      </Steps>
      <Callout type="note">
        <p>Prices you change apply to new bookings. Bookings you already made keep the price they were made with.</p>
      </Callout>

      <H2>Monthly report</H2>
      <p>
        Turn on <UI>Email me a report every month</UI> to get last month&apos;s figures by email on the 1st, with spreadsheets attached. See{" "}
        <DocLink to="reports">Reports and exports</DocLink>.
      </p>

      <H2>Password</H2>
      <p>
        Enter your current password and the new one twice, then press <UI>Change password</UI>. You stay signed in here, and every other phone or computer is signed out.
      </p>
    </>
  );
}

export function Rooms() {
  return (
    <>
      <p>
        Each room you add can be booked on its own. Together, they make up the entire villa, which has its own price in <DocLink to="villa-settings">Villa settings</DocLink>.
      </p>
      <Shot src="rooms" alt="The Rooms page listing each room with its price, number of guests and Taking bookings switch" />

      <H2>Add a room</H2>
      <Steps>
        <Step title={<>Open <UI>Rooms</UI> and press <UI>Add room</UI></>} />
        <Step title="Fill in the room">
          <Terms
            rows={[
              ["Room name", "For example, Ocean View Room."],
              ["Short description", "For example, Ocean view. Shown when choosing a room."],
              ["Price per night", "In rupees."],
              ["Guests", "How many people the room usually sleeps. If a booking has more, the app points it out, and you can still go ahead."],
            ]}
          />
          <Shot src="room-add" alt="The Add room form with room name, short description, price per night and guests" />
        </Step>
        <Step title={<>Press <UI>Add room</UI></>}>
          <p>The room can be booked straight away.</p>
        </Step>
      </Steps>

      <H2>Change a room</H2>
      <p>
        Press <UI>Edit room</UI> on the room, change the name, description, price or guests, and press <UI>Save changes</UI>. Bookings already made keep their price.
      </p>

      <H2>Stop taking bookings for a room</H2>
      <p>
        Turn off <UI>Taking bookings</UI> on the room, for example during repairs or a break. The room is hidden from new bookings; bookings it already has stay as they are. Turn it back
        on at any time.
      </p>
      <Callout type="note">
        <p>Rooms can&apos;t be deleted, so their past bookings and reports stay complete. Switch a room off instead.</p>
      </Callout>
    </>
  );
}

export function Amenities() {
  return (
    <>
      <p>
        Amenities are the extras you offer: breakfast, a rice and curry dinner, an airport pickup, scooter hire, surf lessons, a BBQ evening. Add them to a booking and they go on the bill
        and the invoice.
      </p>
      <Shot src="amenities" alt="The Amenities page listing extras with their prices" />

      <H2>Add an amenity</H2>
      <Steps>
        <Step title={<>Open <UI>Amenities</UI> and press <UI>Add amenity</UI></>} />
        <Step title="Enter the name, the price, and how it's charged">
          <Terms
            rows={[
              ["Per booking", "Once for the stay, like an airport pickup or a BBQ evening."],
              ["Per person", "For each person, like breakfast or a dinner."],
              ["Per day", "For each day, like scooter hire."],
            ]}
          />
          <p>When you add it to a booking you choose how many, for example 4 breakfasts.</p>
          <Shot src="amenity-add" alt="The Add amenity form with name, price and how it's charged" />
        </Step>
        <Step title={<>Press <UI>Add amenity</UI></>} />
      </Steps>

      <H2>Adding extras to a booking</H2>
      <p>
        When you <DocLink to="new-booking">make a booking</DocLink>, every amenity is listed with <UI>+</UI> and <UI>−</UI> buttons. During the stay or at check-out you can add more, or
        something that isn&apos;t on the list, like drinks or laundry. See <DocLink to="check-in-out">Check-in and check-out</DocLink>.
      </p>

      <H2>Stop offering an amenity</H2>
      <p>
        Turn off <UI>Offered to guests</UI> to hide it from new bookings, or remove it. Bookings that already include it keep it.
      </p>
    </>
  );
}
