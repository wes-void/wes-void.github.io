/* Starter set of example loops for the loops library. Mission-driven framing.
   Each loop has exactly 5 steps to fit the circular diagram. Editable content. */

import { INDUSTRIES } from '../../lib/qualification';

export type LoopIconName =
  | 'draft'
  | 'publish'
  | 'measure'
  | 'learn'
  | 'adjust'
  | 'inbox'
  | 'check'
  | 'tag'
  | 'calendar'
  | 'user'
  | 'file'
  | 'search'
  | 'mail'
  | 'heart'
  | 'bell'
  | 'refresh';

export interface LoopStep {
  num: string;
  title: string;
  body: string;
  icon: LoopIconName;
}

export interface Loop {
  slug: string;
  name: string;
  category: string;
  cadence: string; // shown as the diagram center subtitle
  tagline: string; // one-line summary for the library card
  intro: string; // longer description for the detail page
  systems: string[]; // logo slugs in /images/logos
  steps: LoopStep[]; // exactly 5
  outcome: string; // closing line on the detail page
}

export const LOOPS: Loop[] = [
  {
    slug: 'weekly-post',
    name: 'The weekly post loop',
    category: 'Community',
    cadence: 'Repeats weekly',
    tagline: 'Grow your community with one repeatable post every week.',
    intro:
      'A repeatable workflow that turns one short post a week into steady community growth. It quietly connects your documents, your team chat, and your channels.',
    systems: ['googledrive', 'slack', 'instagram', 'facebook', 'youtube'],
    steps: [
      { num: '01', title: 'Draft', body: 'One short post about a real problem your work solves.', icon: 'draft' },
      { num: '02', title: 'Approve & publish', body: 'A quick sign-off, then it goes live on the channel.', icon: 'publish' },
      { num: '03', title: 'Measure', body: 'After a set window, count replies, saves, and questions.', icon: 'measure' },
      { num: '04', title: 'Learn', body: 'Compare to last week and read the strongest signal.', icon: 'learn' },
      { num: '05', title: 'Adjust one thing', body: 'Change a single element: the hook, format, or call to action.', icon: 'adjust' },
    ],
    outcome:
      'After about six weeks, one format clearly wins, and your team keeps running it. Likes are noise. Replies, saves, and new supporters are the point.',
  },
  {
    slug: 'donor-follow-up',
    name: 'The donor follow-up loop',
    category: 'Fundraising',
    cadence: 'After every gift',
    tagline: 'Every gift gets a timely, personal thank-you, on its own.',
    intro:
      'No gift goes unacknowledged. When a donation lands, this loop drafts a personal thank-you, records it, and queues the next touch so no relationship goes cold.',
    systems: ['hubspot', 'slack', 'googledrive'],
    steps: [
      { num: '01', title: 'Detect gift', body: 'A new gift lands in your donor system.', icon: 'inbox' },
      { num: '02', title: 'Draft thank-you', body: 'A personal note, prefilled with the gift details.', icon: 'draft' },
      { num: '03', title: 'Approve & send', body: 'A quick review, then it goes out.', icon: 'mail' },
      { num: '04', title: 'Log & tag', body: 'The gift and acknowledgment are recorded against the donor.', icon: 'tag' },
      { num: '05', title: 'Schedule next touch', body: 'A follow-up is queued so no donor goes cold.', icon: 'calendar' },
    ],
    outcome:
      'Donors feel seen within a day, every time, without anyone scrambling to remember who to thank.',
  },
  {
    slug: 'grant-deadline',
    name: 'The grant deadline loop',
    category: 'Funding',
    cadence: 'Rolling',
    tagline: 'Never miss a grant deadline or scramble at the last minute.',
    intro:
      'Every grant due date in one place, each with an owner and the materials it needs. Deadlines stop being a surprise and submissions stop being a fire drill.',
    systems: ['googlecalendar', 'googledrive', 'slack'],
    steps: [
      { num: '01', title: 'Track deadlines', body: 'Every grant due date in one place.', icon: 'calendar' },
      { num: '02', title: 'Assign owner', body: 'Each deadline gets a person responsible.', icon: 'user' },
      { num: '03', title: 'Draft materials', body: 'Required documents assembled from your files.', icon: 'file' },
      { num: '04', title: 'Review', body: 'A final check before submission.', icon: 'search' },
      { num: '05', title: 'Submit & record', body: 'Submitted, with the outcome logged for next time.', icon: 'check' },
    ],
    outcome:
      'Funding work runs on a calendar, not on adrenaline, and every submission makes the next one easier.',
  },
  {
    slug: 'volunteer-onboarding',
    name: 'The volunteer onboarding loop',
    category: 'People',
    cadence: 'Per new volunteer',
    tagline: 'Turn a new sign-up into a contributing volunteer, smoothly.',
    intro:
      'A warm, consistent welcome for every new volunteer: an onboarding tracker that keeps their first weeks on course, the right access, a first task that fits, and a check-in so they stick around.',
    systems: ['googledrive', 'slack', 'hubspot'],
    steps: [
      { num: '01', title: 'Intake', body: 'A new volunteer signs up, and a tracker for their first weeks opens.', icon: 'inbox' },
      { num: '02', title: 'Welcome', body: 'A warm welcome with what to expect, who is who, and where to start.', icon: 'mail' },
      { num: '03', title: 'Provision access', body: 'Added to the tools and channels they need.', icon: 'check' },
      { num: '04', title: 'Assign first task', body: 'Matched to a starter task that fits.', icon: 'tag' },
      { num: '05', title: 'Check in', body: 'A scheduled check-in after the first week.', icon: 'heart' },
    ],
    outcome:
      'Volunteers feel set up and valued from day one, and fewer drift away before they ever contribute.',
  },
  {
    slug: 'weekly-numbers',
    name: 'The weekly numbers loop',
    category: 'Leadership',
    cadence: 'Repeats weekly',
    tagline: 'The numbers leadership needs, prepared and sent on their own.',
    intro:
      'The same clear snapshot every week, pulled from your systems, reviewed, and delivered, so leadership always has the picture without anyone building a report by hand.',
    systems: ['hubspot', 'quickbooks', 'googledrive'],
    steps: [
      { num: '01', title: 'Pull the numbers', body: 'Key figures gathered from your systems.', icon: 'refresh' },
      { num: '02', title: 'Compile', body: 'Assembled into the same clear format each week.', icon: 'file' },
      { num: '03', title: 'Review', body: 'A quick sanity check before it goes out.', icon: 'search' },
      { num: '04', title: 'Send', body: 'Delivered to the team on schedule.', icon: 'publish' },
      { num: '05', title: 'Flag changes', body: 'Anything notable is called out, not buried.', icon: 'bell' },
    ],
    outcome:
      'Everyone starts the week from the same numbers, and no one loses a morning assembling them.',
  },
  {
    slug: 'inbound-request',
    name: 'The inbound request loop',
    category: 'Operations',
    cadence: 'Per request',
    tagline: 'Every inbound request reaches the right person and gets a reply.',
    intro:
      'Requests stop falling into inboxes and DMs. Each one is captured, ranked by what matters most, routed to the right person with a reply already drafted, and worked to done, in the open.',
    systems: ['slack', 'hubspot', 'googledrive'],
    steps: [
      { num: '01', title: 'Capture', body: 'Every request lands in one place.', icon: 'inbox' },
      { num: '02', title: 'Rank & route', body: 'Sorted by what matters most, then sent to the right person.', icon: 'tag' },
      { num: '03', title: 'Acknowledge', body: 'A prompt, human reply, drafted in your voice and ready to send.', icon: 'mail' },
      { num: '04', title: 'Resolve', body: 'Worked to done, visible to the team.', icon: 'check' },
      { num: '05', title: 'Close & learn', body: 'Logged so patterns surface over time.', icon: 'learn' },
    ],
    outcome:
      'Nothing slips through, response times drop, and the team can see where the work actually stands.',
  },
  {
    slug: 'supporter-listening',
    name: 'The supporter listening loop',
    category: 'Fundraising',
    cadence: 'Repeats monthly',
    tagline: 'Let your appeals come from supporters’ own words.',
    intro:
      'A few real conversations a month, mined for what actually moves people, then folded back into how you ask. Your messaging stops being guesswork.',
    systems: ['hubspot', 'slack', 'googledrive'],
    steps: [
      { num: '01', title: 'Pick five', body: 'Choose five supporters to talk with this month.', icon: 'user' },
      { num: '02', title: 'Ask', body: 'A short, genuine conversation about why they give.', icon: 'mail' },
      { num: '03', title: 'Capture themes', body: 'Notes, survey replies, and other feedback distilled into the patterns that keep coming up.', icon: 'file' },
      { num: '04', title: 'Sharpen the ask', body: 'Rewrite the appeal around what actually resonates.', icon: 'draft' },
      { num: '05', title: 'Test & compare', body: 'Run it against the old version and keep the winner.', icon: 'measure' },
    ],
    outcome:
      'Your appeals come from supporters’ own words, and they get sharper every month instead of going stale.',
  },
  {
    slug: 'impact-story',
    name: 'The impact story loop',
    category: 'Communications',
    cadence: 'Repeats monthly',
    tagline: 'Turn the work you do into stories you can reuse everywhere.',
    intro:
      'Your impact stops living in people’s heads. Each month one real moment becomes a verified, consent-checked story you can reuse in newsletters, grants, and reports.',
    systems: ['googledrive', 'slack', 'instagram'],
    steps: [
      { num: '01', title: 'Gather moments', body: 'Collect the month’s wins, quotes, and photos from the team.', icon: 'inbox' },
      { num: '02', title: 'Draft the story', body: 'Shape one real moment into a short, honest story.', icon: 'draft' },
      { num: '03', title: 'Verify', body: 'Confirm names, consent, and details with the people involved.', icon: 'check' },
      { num: '04', title: 'Publish', body: 'Share it where supporters and funders will see it.', icon: 'publish' },
      { num: '05', title: 'File for reuse', body: 'Save it so it can feed a newsletter, grant, or report later.', icon: 'tag' },
    ],
    outcome:
      'Impact becomes a library you can draw on anytime, instead of a scramble every time someone needs a story.',
  },
  {
    slug: 'grant-prospecting',
    name: 'The grant prospecting loop',
    category: 'Funding',
    cadence: 'Rolling',
    tagline: 'Chase the grants worth winning, not whichever one surfaced last.',
    intro:
      'New funding opportunities, surfaced and qualified before anyone sinks time into them. The strong ones flow straight into your deadline loop.',
    systems: ['googledrive', 'googlecalendar', 'slack'],
    steps: [
      { num: '01', title: 'Scan', body: 'Surface new grants that fit your mission.', icon: 'search' },
      { num: '02', title: 'Qualify', body: 'Score fit, amount, and effort before anyone commits.', icon: 'measure' },
      { num: '03', title: 'Brief', body: 'A one-page go/no-go brief for the strong ones.', icon: 'file' },
      { num: '04', title: 'Decide', body: 'A quick call: pursue, watch, or pass.', icon: 'user' },
      { num: '05', title: 'Queue', body: 'Pursued grants drop into the deadline loop.', icon: 'calendar' },
    ],
    outcome:
      'You pursue the grants worth winning, and nothing promising slips past unnoticed.',
  },
  {
    slug: 'findability',
    name: 'The findability loop',
    category: 'Marketing',
    cadence: 'Repeats monthly',
    tagline: 'Make sure the people looking for your cause actually find you.',
    intro:
      'A steady pass at where people can’t find you, in search and in AI answers, fixing the highest-impact gap each cycle and confirming it closed.',
    systems: ['googledrive', 'slack'],
    steps: [
      { num: '01', title: 'Find gaps', body: 'See where people can’t find you, in search and AI answers.', icon: 'search' },
      { num: '02', title: 'Prioritize', body: 'Rank the gaps by how many people they reach.', icon: 'measure' },
      { num: '03', title: 'Fix one', body: 'Update the page or answer that moves the needle most.', icon: 'draft' },
      { num: '04', title: 'Publish', body: 'Push the change live.', icon: 'publish' },
      { num: '05', title: 'Recheck', body: 'Confirm the gap closed before moving to the next.', icon: 'refresh' },
    ],
    outcome:
      'The people searching for your cause find you, one closed gap at a time.',
  },
  {
    slug: 'staff-handoff',
    name: 'The staff handoff loop',
    category: 'Operations',
    cadence: 'Per handoff',
    tagline: 'Keep work moving through vacations, leave, and turnover.',
    intro:
      'When someone steps away, their work doesn’t. Open threads get captured, owned, and confirmed so nothing walks out the door with one person.',
    systems: ['googledrive', 'slack', 'hubspot'],
    steps: [
      { num: '01', title: 'Capture context', body: 'What’s in flight, where it lives, and what’s next.', icon: 'file' },
      { num: '02', title: 'Name the owner', body: 'Each open thread gets a clear next person.', icon: 'user' },
      { num: '03', title: 'Walk through', body: 'A short handoff so nothing is assumed.', icon: 'mail' },
      { num: '04', title: 'Confirm access', body: 'The new owner can actually reach everything.', icon: 'check' },
      { num: '05', title: 'Check in', body: 'A follow-up once they’ve picked it up.', icon: 'bell' },
    ],
    outcome:
      'Work survives vacations and turnover, instead of stalling every time someone is out.',
  },
  {
    slug: 'board-update',
    name: 'The board update loop',
    category: 'Leadership',
    cadence: 'Repeats monthly',
    tagline: 'Send the board a clear update, and capture what they decide.',
    intro:
      'The same clear board update every month, assembled from your systems and reviewed, with decisions logged so they don’t get lost after the meeting.',
    systems: ['googledrive', 'quickbooks', 'slack'],
    steps: [
      { num: '01', title: 'Pull highlights', body: 'Gather progress, numbers, and decisions needed.', icon: 'refresh' },
      { num: '02', title: 'Draft', body: 'Assemble the same clear format each month.', icon: 'file' },
      { num: '03', title: 'Review', body: 'A quick check with leadership before it goes out.', icon: 'search' },
      { num: '04', title: 'Send', body: 'Delivered to the board ahead of the meeting.', icon: 'publish' },
      { num: '05', title: 'Track decisions', body: 'Log what the board decided so it isn’t lost.', icon: 'tag' },
    ],
    outcome:
      'Your board shows up informed, and decisions get made instead of deferred.',
  },
  {
    slug: 'data-cleanup',
    name: 'The data cleanup loop',
    category: 'Operations',
    cadence: 'Per import',
    tagline: 'Turn a messy export into clean, trustworthy data, on a copy.',
    intro:
      'Bad data quietly breaks every report built on it. This loop takes a messy list, cleans it on a copy, and shows you exactly what changed before anything replaces the original.',
    systems: ['googledrive', 'quickbooks', 'hubspot'],
    steps: [
      { num: '01', title: 'Copy', body: 'Work on a duplicate so the original is never touched.', icon: 'file' },
      { num: '02', title: 'Clean', body: 'Fix duplicates, formats, and gaps against clear rules.', icon: 'adjust' },
      { num: '03', title: 'Flag', body: 'Anything ambiguous is surfaced, not guessed.', icon: 'bell' },
      { num: '04', title: 'Approve', body: 'You see exactly what changed before it is kept.', icon: 'check' },
      { num: '05', title: 'Record', body: 'The cleaned file and a change log are saved.', icon: 'tag' },
    ],
    outcome:
      'Reports finally rest on data you can trust, and you can always see what was changed and why.',
  },
  {
    slug: 'ask-the-data',
    name: 'The data question loop',
    category: 'Knowledge',
    cadence: 'On demand',
    tagline: 'Ask a plain-language question and get an answer from your own numbers.',
    intro:
      'The answer is usually sitting in a spreadsheet no one has time to open. Ask a question in plain language and this loop reads the data, answers it, and shows its work.',
    systems: ['googledrive', 'quickbooks'],
    steps: [
      { num: '01', title: 'Ask', body: 'Pose the question in plain language.', icon: 'search' },
      { num: '02', title: 'Read', body: 'The loop pulls the right rows from your files.', icon: 'file' },
      { num: '03', title: 'Answer', body: 'A clear answer, with the numbers behind it.', icon: 'measure' },
      { num: '04', title: 'Show the work', body: 'See exactly which data the answer came from.', icon: 'check' },
      { num: '05', title: 'Save', body: 'Keep the question so it is one click next time.', icon: 'refresh' },
    ],
    outcome:
      'Anyone can get a straight answer from the data, without waiting on the one person who knows the spreadsheet.',
  },
  {
    slug: 'research-digest',
    name: 'The research digest loop',
    category: 'Knowledge',
    cadence: 'Per topic',
    tagline: 'Turn dense material into a clear briefing you can actually use.',
    intro:
      'Someone always needs to get up to speed fast. This loop reads the dense source material and turns it into a short, honest briefing, with the sources kept so you can check its work.',
    systems: ['googledrive', 'slack'],
    steps: [
      { num: '01', title: 'Gather sources', body: 'Collect the documents, links, and notes on the topic.', icon: 'inbox' },
      { num: '02', title: 'Read & distill', body: 'Pull out what actually matters.', icon: 'search' },
      { num: '03', title: 'Draft the digest', body: 'A clear, short briefing anyone can follow.', icon: 'draft' },
      { num: '04', title: 'Cite', body: 'Every point traces back to its source.', icon: 'check' },
      { num: '05', title: 'Share & file', body: 'Send it out and keep it for the next person.', icon: 'publish' },
    ],
    outcome:
      'The whole team gets up to speed in minutes, from a briefing you can trust and reuse.',
  },
  {
    slug: 'cash-flow',
    name: 'The cash flow loop',
    category: 'Finance',
    cadence: 'Repeats weekly',
    tagline: 'See your cash low point coming, weeks before it arrives.',
    intro:
      'Running low on runway should never be a surprise. Each week this loop refreshes a simple forecast from your actuals and calls out when cash gets tight, while there is still time to act.',
    systems: ['quickbooks', 'googledrive'],
    steps: [
      { num: '01', title: 'Pull actuals', body: 'Latest income and expenses from your books.', icon: 'refresh' },
      { num: '02', title: 'Project', body: 'Roll them forward into a simple forecast.', icon: 'measure' },
      { num: '03', title: 'Find the low point', body: 'Spot the week cash gets tightest.', icon: 'search' },
      { num: '04', title: 'Review', body: 'A quick check before it goes to leadership.', icon: 'check' },
      { num: '05', title: 'Flag & log', body: 'Call out the risk and save the week’s view.', icon: 'bell' },
    ],
    outcome:
      'You see the tight weeks coming with room to plan, instead of discovering them the hard way.',
  },
  {
    slug: 'budget-check',
    name: 'The budget check loop',
    category: 'Finance',
    cadence: 'Repeats monthly',
    tagline: 'Know where you are over or under budget, before month-end panic.',
    intro:
      'Plan versus reality, every month, without building the comparison by hand. This loop lines up budget against actuals, explains the gaps, and flags what needs a decision.',
    systems: ['quickbooks', 'googledrive', 'slack'],
    steps: [
      { num: '01', title: 'Gather', body: 'Pull the plan, the actuals, and the close notes.', icon: 'refresh' },
      { num: '02', title: 'Compare', body: 'Line up budget against actuals, line by line.', icon: 'measure' },
      { num: '03', title: 'Explain', body: 'Note the reason behind each real gap.', icon: 'file' },
      { num: '04', title: 'Flag', body: 'Surface the variances that need a call.', icon: 'bell' },
      { num: '05', title: 'Send & log', body: 'Deliver the summary and keep it on record.', icon: 'publish' },
    ],
    outcome:
      'Overspend gets caught while you can still act on it, and every month’s numbers are already on file.',
  },
  {
    slug: 'meeting-followup',
    name: 'The meeting follow-up loop',
    category: 'Meetings',
    cadence: 'After every meeting',
    tagline: 'Every meeting turns into clear actions, owned and tracked.',
    intro:
      'The decisions made in a meeting should not fade by the afternoon. This loop turns the notes into owned action items, routes them to your tools, and checks they actually move.',
    systems: ['googlecalendar', 'slack', 'googledrive'],
    steps: [
      { num: '01', title: 'Capture', body: 'Pull the decisions and next steps from the notes.', icon: 'file' },
      { num: '02', title: 'Assign', body: 'Each action gets a clear owner.', icon: 'user' },
      { num: '03', title: 'Route', body: 'Send items into the tools where work happens.', icon: 'tag' },
      { num: '04', title: 'Confirm', body: 'Owners see what is theirs and by when.', icon: 'mail' },
      { num: '05', title: 'Track', body: 'Follow up on anything still open.', icon: 'bell' },
    ],
    outcome:
      'What gets decided in the room actually gets done, without someone chasing notes afterward.',
  },
  {
    slug: 'meeting-brief',
    name: 'The meeting prep loop',
    category: 'Meetings',
    cadence: 'Before every meeting',
    tagline: 'Walk into every meeting already briefed, with an agenda ready.',
    intro:
      'No more scrambling five minutes before a call. This loop reads the calendar, gathers the context that matters, and hands you an agenda and a brief before each meeting.',
    systems: ['googlecalendar', 'googledrive', 'slack'],
    steps: [
      { num: '01', title: 'Read the calendar', body: 'See what is coming and who is in it.', icon: 'calendar' },
      { num: '02', title: 'Gather context', body: 'Pull the relevant history, docs, and threads.', icon: 'file' },
      { num: '03', title: 'Draft the brief', body: 'A short read-in and a suggested agenda.', icon: 'draft' },
      { num: '04', title: 'Review', body: 'A quick look before it lands.', icon: 'search' },
      { num: '05', title: 'Deliver', body: 'In your hands ahead of the meeting.', icon: 'mail' },
    ],
    outcome:
      'You show up prepared every time, and meetings start on the point instead of the recap.',
  },
  {
    slug: 'event-playbook',
    name: 'The event playbook loop',
    category: 'Operations',
    cadence: 'Per event',
    tagline: 'Run every event off the same proven playbook, not memory.',
    intro:
      'Events live or die on the details. This loop runs each one off a repeatable playbook: tasks, owners, and timing tracked to the day, with what you learn folded back in for next time.',
    systems: ['googlecalendar', 'googledrive', 'slack'],
    steps: [
      { num: '01', title: 'Load the playbook', body: 'Start from the proven checklist for this kind of event.', icon: 'file' },
      { num: '02', title: 'Assign & schedule', body: 'Owners and dates on every task.', icon: 'calendar' },
      { num: '03', title: 'Track', body: 'See what is done and what is at risk, day by day.', icon: 'measure' },
      { num: '04', title: 'Run the day', body: 'The plan drives the event, not adrenaline.', icon: 'check' },
      { num: '05', title: 'Debrief & update', body: 'Capture what to change and fold it into the playbook.', icon: 'learn' },
    ],
    outcome:
      'Each event runs smoother than the last, because the playbook gets better every time.',
  },
  {
    slug: 'customer-onboarding',
    name: 'The customer onboarding loop',
    category: 'People',
    cadence: 'Per new customer',
    tagline: 'Give every new customer a clean, consistent first week.',
    intro:
      'First impressions set the whole relationship. This loop gives every new customer the same strong start: the right access, the paperwork done, and a check-in so nothing stalls before value lands.',
    systems: ['hubspot', 'googledrive', 'slack'],
    steps: [
      { num: '01', title: 'Kickoff', body: 'A new customer is signed, and their onboarding opens.', icon: 'inbox' },
      { num: '02', title: 'Welcome', body: 'A warm welcome with what to expect and who to reach.', icon: 'mail' },
      { num: '03', title: 'Set up', body: 'Accounts, access, and paperwork prepared and sent.', icon: 'check' },
      { num: '04', title: 'First value', body: 'Guided to the first win that proves it was worth it.', icon: 'tag' },
      { num: '05', title: 'Check in', body: 'A scheduled check-in before the first week is out.', icon: 'heart' },
    ],
    outcome:
      'Every customer starts strong and feels looked after, and fewer churn before they ever see the value.',
  },
];

export function getLoop(slug: string): Loop | undefined {
  return LOOPS.find((l) => l.slug === slug);
}

/* Agency level: how autonomously a loop runs today. Loops start human-run and
   evolve to semi-agentic, then fully agentic, as Threshold proves them out.
   Human-only loops are being converted, so they aren't a destination here. */
export type AgencyLevel = 'semi' | 'agentic';

export const AGENCY: Record<string, AgencyLevel> = {
  'weekly-post': 'semi',
  'donor-follow-up': 'agentic',
  'grant-deadline': 'semi',
  'volunteer-onboarding': 'semi',
  'weekly-numbers': 'agentic',
  'inbound-request': 'agentic',
  'supporter-listening': 'semi',
  'impact-story': 'semi',
  'grant-prospecting': 'agentic',
  'findability': 'agentic',
  'staff-handoff': 'semi',
  'board-update': 'agentic',
  'data-cleanup': 'semi',
  'ask-the-data': 'agentic',
  'research-digest': 'agentic',
  'cash-flow': 'semi',
  'budget-check': 'agentic',
  'meeting-followup': 'agentic',
  'meeting-brief': 'agentic',
  'event-playbook': 'semi',
  'customer-onboarding': 'semi',
};

export const AGENCY_META: Record<AgencyLevel, { label: string; blurb: string }> = {
  semi: {
    label: 'Semi-agentic',
    blurb: 'Runs with a human in the loop for the key decisions.',
  },
  agentic: {
    label: 'Fully agentic',
    blurb: 'Runs end to end on its own, with people setting direction and spot-checking.',
  },
};

export function getAgency(slug: string): AgencyLevel {
  return AGENCY[slug] ?? 'semi';
}

/* Ties the assessment tools to the library. Each First Loop Designer goal
   archetype (see FIRST_LOOP_GOALS in lib/assessment) maps to the library loops
   that exemplify it, so a recommendation from the Friction, Readiness, or
   Designer tool can always point at concrete, real loops. Friction dimensions
   and Readiness caps both resolve to a goal id first (FRICTION_DIMENSION_GOAL /
   goalIdForCap), so this single map serves all three. Loops that don't fit an
   ops archetype (content/fundraising) are intentionally left off. */
export const GOAL_LOOPS: Record<string, string[]> = {
  followup: ['meeting-followup', 'donor-follow-up', 'supporter-listening'],
  reporting: ['weekly-numbers', 'board-update', 'budget-check', 'cash-flow'],
  coordination: ['inbound-request', 'staff-handoff', 'event-playbook', 'grant-deadline'],
  intake: ['customer-onboarding', 'volunteer-onboarding'],
  cleanup: ['data-cleanup', 'ask-the-data'],
  visibility: ['findability', 'research-digest', 'ask-the-data'],
  custom: [],
};

/* Audience framing. Most loops are general-SMB; a handful are worded for
   nonprofits (donor / grant / volunteer / supporter). loopsForGoal keeps the
   nonprofit-only loops out of recommendations for non-nonprofit industries so
   an agency never gets "donor follow-up"; nonprofits still see the full set. */
export type LoopAudience = 'nonprofit' | 'general';

const NONPROFIT_LOOPS = new Set<string>([
  'donor-follow-up',
  'grant-deadline',
  'volunteer-onboarding',
  'supporter-listening',
  'impact-story',
  'grant-prospecting',
]);

export function getAudience(slug: string): LoopAudience {
  return NONPROFIT_LOOPS.has(slug) ? 'nonprofit' : 'general';
}

function isNonprofitIndustry(industryLabel?: string): boolean {
  if (!industryLabel) return false;
  return INDUSTRIES.find((o) => o.label === industryLabel)?.value === 'community_nonprofit';
}

export function loopsForGoal(
  goalId: string,
  opts: { industry?: string; limit?: number } = {},
): Loop[] {
  const { industry, limit = 3 } = opts;
  const nonprofit = isNonprofitIndustry(industry);
  const slugs = GOAL_LOOPS[goalId] ?? [];
  return slugs
    .map(getLoop)
    .filter((l): l is Loop => Boolean(l))
    .filter((l) => nonprofit || getAudience(l.slug) === 'general')
    .slice(0, limit);
}

/* Display labels for the vendored logo slugs in /images/logos. */
export const SYSTEM_LABELS: Record<string, string> = {
  hubspot: 'CRM',
  slack: 'Slack',
  googlecalendar: 'Calendars',
  googledrive: 'Documents',
  quickbooks: 'Finance',
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
};
