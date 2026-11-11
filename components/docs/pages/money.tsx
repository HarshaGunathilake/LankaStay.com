import { Callout, DocLink, H2, H3, Shot, Step, Steps, Terms, UI } from "../ui";

export function Expenses() {
  return (
    <>
      <p>
        Write down what you spend on the villa, and
        <DocLink to="money">Money</DocLink> and <DocLink to="reports">Reports</DocLink> work out your profit. Expenses are shown a month at a time, with the total spent at the top.
      </p>
      <Shot src="expenses" alt="The Expenses page for a month, with the total spent and each expense with its category" />

      <H2>Add an expense</H2>
      <Steps>
        <Step title={<>Press <UI>Add expense</UI></>}>
          <p>On the Expenses page, or in Quick actions on Home.</p>
        </Step>
        <Step title="Fill it in">
          <Terms
            rows={[
              ["Amount", "In rupees."],
              ["Category", "Electricity, Water, Cleaning, Maintenance, Groceries, Staff, Internet or Other."],
              ["What was it for", "For example, Pool cleaning."],
              ["Date", "When you paid. Today unless you change it."],
              ["Note", "Anything worth remembering. Optional."],
              ["Receipt", "Optional: choose the photo or PDF of the receipt to note its file name with the expense."],
            ]}
          />
          <Shot src="expense-add" alt="The Add expense form with amount, category, what it was for, date and note" />
        </Step>
        <Step title={<>Press <UI>Add expense</UI></>}>
          <p>
            You&apos;ll see <em>Expense added</em>.
          </p>
        </Step>
      </Steps>

      <H2>Expenses added for you</H2>
      <ul>
        <li>
          Paying a <DocLink to="bills">bill</DocLink> adds it to Expenses, in the category you chose for that bill.
        </li>
        <li>
          Paying a <DocLink to="staff-payslips">payslip</DocLink> adds it under <strong>Staff</strong>.
        </li>
      </ul>
      <p>So you don&apos;t enter them twice.</p>

      <H2>Delete an expense</H2>
      <p>
        Press the bin next to it, then <UI>Delete</UI>. To remove a bill payment, undo it on the Bills page instead, so the bill shows as unpaid again.
      </p>
    </>
  );
}

export function Bills() {
  return (
    <>
      <p>
        Add the bills that come round again (electricity, water, internet, phone, TV, insurance) once, and
        the app reminds you each time one is due. Paying one adds it to your expenses.
      </p>
      <Shot src="bills" alt="The Bills page with bills to pay, each with Pay, and your bills with when they are due" />

      <H2>Add a bill</H2>
      <Steps>
        <Step title={<>Open <UI>Bills</UI> and press <UI>Add bill</UI></>} />
        <Step title="Fill it in">
          <Terms
            rows={[
              ["Bill", "Its name, for example Electricity."],
              ["Usual amount", "Filled in when you mark it paid. You can change it then if this time's bill is different."],
              ["How often?", "Every month, every 3 months, or every year."],
              ["Due on", "The day of the month (and for yearly bills, the month). Shorter months use their last day."],
              ["Starting from", "The first month it's due."],
              ["Goes into Expenses as", "The expense category, for example Electricity."],
              ["Note", "For example, the account number or where you pay it."],
            ]}
          />
          <Shot src="bill-add" alt="The Add bill form" />
        </Step>
        <Step title={<>Press <UI>Add bill</UI></>} />
      </Steps>

      <H2>When a bill is due</H2>
      <Terms
        rows={[
          ["On the Bills page", <>Under <strong key="a">To pay</strong>: overdue bills and those due in the next 7 days, each with a <UI key="b">Pay</UI> button.</>],
          ["On Home", "The same list, under Bills to pay."],
          ["In the menu and the Home header", "A red number shows how many bills are overdue or due in the next 3 days."],
        ]}
      />

      <H2>Pay a bill</H2>
      <Steps>
        <Step title={<>Press <UI>Pay</UI> next to the bill</>} />
        <Step title="Check the amount and the date you paid" />
        <Step title={<>Press <UI>Mark paid</UI></>}>
          <p>
            You&apos;ll see <em>… paid and added to expenses</em>. The bill moves to <strong>Paid lately</strong>, and the next one is scheduled.
          </p>
        </Step>
      </Steps>
      <Shot src="bill-pay" alt="Paying a bill: the amount paid and the date" />

      <H3>Nothing to pay this time?</H3>
      <p>
        Press <UI>Skip this one</UI>, for example when there was no bill, or you already entered it in Expenses. It won&apos;t be added again.
      </p>
      <H3>Made a mistake?</H3>
      <p>Under <strong>Paid lately</strong>, undo a payment. It&apos;s removed from Expenses, and the bill shows as due again.</p>

      <H2>Stop a bill</H2>
      <p>
        Open the bill and turn off <UI>Still paying this bill</UI>. The reminders stop and past payments are kept.
      </p>
    </>
  );
}

export function StaffPayslips() {
  return (
    <>
      <p>
        Add the people who work at your villa, then make each month&apos;s payslip in a minute: salary or daily wage, additions, deductions, and EPF and ETF worked out for you. Print it
        or send it on WhatsApp.
      </p>
      <Shot src="staff" alt="The Staff page for a month: net pay, cost to the villa and still to pay, and a card for each staff member with their payslip" />
      <Terms
        rows={[
          ["Net pay", "What your staff take home this month, on the payslips made so far."],
          ["Cost to the villa", "Net pay plus the 8% EPF taken from their pay, plus the 12% EPF and 3% ETF you add."],
          ["Still to pay", "Net pay on payslips not marked paid yet. Underneath, how many staff don't have a payslip for the month."],
        ]}
      />

      <H2>Add a staff member</H2>
      <Steps>
        <Step title={<>Open <UI>Staff</UI> and press <UI>Add staff</UI></>} />
        <Step title="Fill in their details">
          <Terms
            rows={[
              ["Name and job", "For example, Sunil Perera, Caretaker."],
              ["Phone", "Used to send the payslip on WhatsApp."],
              ["How are they paid?", <>A <strong key="a">salary for a month</strong>, or a <strong key="b">wage for one day</strong> (paid for the days they work).</>],
              ["EPF and ETF", "Turn on if they are registered, and add their EPF number."],
            ]}
          />
          <Shot src="staff-add" alt="The Add staff member form" />
        </Step>
        <Step title={<>Press <UI>Add staff member</UI></>} />
      </Steps>

      <H2>Make a payslip</H2>
      <Steps>
        <Step title={<>Press <UI>Payslip for …</UI> on the staff member</>}>
          <p>Choose the month. For someone on a daily wage, set the days worked.</p>
        </Step>
        <Step title="Add any additions and deductions">
          <p>
            <strong>Additions</strong> are paid on top: <UI>Overtime</UI>, <UI>Bonus</UI>, <UI>Allowance</UI>, <UI>Service charge</UI> or <UI>Other</UI>. <strong>Deductions</strong> are taken
            off: <UI>Salary advance</UI>, <UI>Loan repayment</UI>, <UI>Unpaid leave</UI> or <UI>Other</UI>.
          </p>
          <Shot src="payslip-make" alt="Making a payslip: the month, days worked, daily wage, additions and deductions" />
        </Step>
        <Step title="Check the net pay">
          <p>The payslip shows the basic pay, additions, deductions, EPF and the net pay, and what you pay on top.</p>
        </Step>
        <Step title="Paid already?">
          <p>
            Turn on <UI>Paid now</UI> and set the date. The payslip is added to <DocLink to="expenses">Expenses</DocLink> under Staff. If you pay later, open the payslip and press{" "}
            <UI>Mark as paid</UI> then.
          </p>
        </Step>
      </Steps>

      <H2>How EPF and ETF are worked out</H2>
      <Terms
        rows={[
          ["EPF, employee 8%", "Taken from their pay. Worked out on the basic pay less deductions; additions such as overtime or a bonus are not included."],
          ["EPF, employer 12%", "You pay it on top, on the same amount."],
          ["ETF, employer 3%", "You pay it on top, on the same amount."],
        ]}
      />
      <Callout type="warning">
        <p>
          The payslip uses the standard rates. You&apos;re responsible for checking that what you pay and report to the EPF and ETF follows the rules in force at the time.
        </p>
      </Callout>

      <H2>Print or send the payslip</H2>
      <p>
        Open the payslip from the staff member&apos;s card, then press <UI>Print or save as PDF</UI>, or <UI>Send on WhatsApp</UI> to send it to the phone number you saved for them.
      </p>
      <Shot src="payslip" alt="A finished payslip with earnings, deductions, net pay and the employer's EPF and ETF" />

      <H2>When someone leaves</H2>
      <p>
        Edit the staff member and turn off <UI>Still works here</UI>. Their past payslips are kept.
      </p>
    </>
  );
}

export function MoneyPage() {
  return (
    <>
      <p>
        <UI>Money</UI> is a simple look at one month. Use the arrows to go to another month.
      </p>
      <Shot src="money" alt="The Money page: revenue, expenses, estimated profit, occupancy and still to collect" />
      <Terms
        rows={[
          ["Revenue", "The value of the nights guests stay in the month, including extras. A stay across two months is split between them; cancelled bookings don't count."],
          ["Expenses", "Everything in Expenses for the month, including paid bills and payslips."],
          ["Estimated profit", "Revenue minus expenses."],
          ["Occupancy", "The share of room nights that are booked. An entire-villa booking counts every room."],
          ["Still to collect from guests", "Balances on all bookings that aren't fully paid."],
        ]}
      />
      <Callout type="tip">
        <p>
          For more than one month, charts, and figures by room or by booking source, use <DocLink to="reports">Reports</DocLink>.
        </p>
      </Callout>
    </>
  );
}

export function Reports() {
  return (
    <>
      <p>Reports shows how the villa is doing over any period: income, expenses, profit and occupancy, where income comes from, and where money goes.</p>
      <Shot src="reports" alt="The Reports page: the period, income, expenses, profit and occupancy" />

      <H2>Choose the period</H2>
      <p>
        At the top: <UI>This month</UI>, <UI>Last month</UI>, <UI>3 months</UI>, <UI>6 months</UI>, <UI>12 months</UI>, <UI>This year</UI>, or <UI>Choose months</UI> for any range.
      </p>

      <H2>What&apos;s on the page</H2>
      <Terms
        rows={[
          ["Income, Expenses, Profit, Occupancy", "The totals for the period."],
          ["Income and expenses by month", "A chart. Point at or tap a month to see its figures."],
          ["Expenses by category", "Where the money went."],
          ["Income by room", "Which rooms (and the entire villa) earn the most."],
          ["Income by booking source", "Direct, Booking.com, Airbnb, WhatsApp, Phone or Other."],
          ["Monthly table", "Each month's bookings, nights booked, income, expenses and profit."],
          ["Still to collect", "Balances guests still owe."],
        ]}
      />
      <Shot src="reports-full" alt="The full Reports page with the chart, breakdowns and monthly table" caption="The whole page, scrolled." />

      <H2>Download spreadsheets</H2>
      <Steps>
        <Step title={<>Press <UI>Export CSV</UI></>} />
        <Step title="Choose what to download">
          <Terms
            rows={[
              ["Monthly summary", "Income, expenses and profit per month."],
              ["Bookings", "Every booking, with amounts and balances."],
              ["Expenses", "Every expense, with its category."],
            ]}
          />
        </Step>
      </Steps>
      <p>CSV files open in Excel, Google Sheets or Numbers. Each covers the period you chose.</p>

      <H2>Get the report by email every month</H2>
      <Steps>
        <Step title={<>Open <UI>Villa settings</UI> → <UI>Monthly report</UI></>} />
        <Step title={<>Turn on <UI>Email me a report every month</UI></>}>
          <p>
            On the 1st of each month you get last month&apos;s income, expenses, profit and occupancy, with every booking, expense and payslip attached as a spreadsheet.
          </p>
        </Step>
        <Step title="Also send it to someone (optional)">
          <p>Your accountant or a partner, for example.</p>
        </Step>
      </Steps>
      <Shot src="settings-report" alt="The Monthly report settings: the switch, who it's sent to, and Send a report now" />
      <Callout type="tip">
        <p>
          Under <strong>Send a report now</strong>, choose any month and press <UI>Email this report</UI> to see what it looks like.
        </p>
      </Callout>
    </>
  );
}
