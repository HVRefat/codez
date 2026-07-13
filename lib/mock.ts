import type { Article, Category, Paginated, Report } from "./types";

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Cyber Security", slug: "cyber-security" },
  { id: 2, name: "Technology", slug: "technology" },
  { id: 3, name: "Crime Branch", slug: "crime-branch" },
  { id: 4, name: "Crime Analysis", slug: "crime-analysis" },
  { id: 5, name: "Scam Alerts", slug: "scam-alerts" },
];

const now = new Date("2026-07-13T09:00:00Z");
const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString();

export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Inside the SIM-Swap Rings Draining Mobile Banking Accounts in Dhaka",
    slug: "sim-swap-rings-mobile-banking-dhaka",
    category: "Cyber Security",
    excerpt:
      "A months-long trail of victim reports points to a coordinated fraud network exploiting weak telecom verification and MFM app trust.",
    content:
      "A months-long trail of victim reports points to a coordinated fraud network exploiting weak telecom verification and mobile financial services app trust. Investigators traced over a dozen incidents back to a small number of SIM replacement requests filed with forged documents, granting attackers control of victims' phone numbers and, by extension, their one-time passcodes.\n\nThe pattern is consistent: a victim's phone loses signal without warning, followed within the hour by unauthorized transfers from their mobile financial services wallet. By the time the victim reaches a service center, the funds are already gone, laundered through a chain of mule accounts.\n\nTelecom operators have since tightened re-issuance verification, but security researchers warn the underlying weakness — a single factor of authentication tied to a swappable SIM — remains structurally unsound.",
    cover_image: null,
    status: "published",
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: 2,
    title: "Ransomware-as-a-Service: The Franchise Model Behind This Year's Breaches",
    slug: "ransomware-as-a-service-franchise-model",
    category: "Cyber Security",
    excerpt:
      "Affiliate programs have turned ransomware into a distributed business, lowering the skill floor for attackers targeting regional enterprises.",
    content:
      "Affiliate programs have turned ransomware into a distributed business, lowering the skill floor for attackers targeting regional enterprises. Core developers lease malware kits and negotiation infrastructure to affiliates who handle initial access, taking a cut of any ransom paid.\n\nThis division of labor explains why breach volume keeps climbing even as arrests remove individual operators — the toolkit outlives any single actor. For defenders, the shift means fewer bespoke intrusions and more commoditized, repeatable attack chains, which paradoxically makes detection patterns more predictable if organizations invest in the right telemetry.",
    cover_image: null,
    status: "published",
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: 3,
    title: "Bangladesh's 5G Rollout Quietly Reaches Divisional Cities",
    slug: "bangladesh-5g-rollout-divisional-cities",
    category: "Technology",
    excerpt:
      "Beyond the capital, carriers are lighting up mid-band spectrum in a rollout that has drawn far less attention than its scale deserves.",
    content:
      "Beyond the capital, carriers are lighting up mid-band spectrum in a rollout that has drawn far less attention than its scale deserves. Coverage maps shared with regulators show live sites in Chattogram, Khulna, and Sylhet, with commercial device support still trailing infrastructure buildout.\n\nThe rollout's real test will be pricing — earlier 4G adoption curves in the region were shaped as much by data-plan affordability as by network availability.",
    cover_image: null,
    status: "published",
    created_at: daysAgo(4),
    updated_at: daysAgo(4),
  },
  {
    id: 4,
    title: "How Investigators Are Using Metadata to Crack Cold Cybercrime Cases",
    slug: "metadata-forensics-cold-cybercrime-cases",
    category: "Crime Analysis",
    excerpt:
      "EXIF data, file timestamps, and network logs are becoming the quiet backbone of case reconstruction long after the trail goes cold.",
    content:
      "EXIF data, file timestamps, and network logs are becoming the quiet backbone of case reconstruction long after the trail goes cold. In several reopened cases, investigators matched image metadata against device purchase records to place a suspect's hardware at a specific location weeks before an incident was reported.\n\nThe technique isn't new, but its systematic application — cross-referencing metadata across dozens of previously unconnected reports — is producing leads that manual review missed the first time.",
    cover_image: null,
    status: "published",
    created_at: daysAgo(6),
    updated_at: daysAgo(6),
  },
  {
    id: 5,
    title: "The Rise of Deepfake Voice Scams Targeting Small Business Owners",
    slug: "deepfake-voice-scams-small-business",
    category: "Scam Alerts",
    excerpt:
      "A cloned voice, a manufactured emergency, and a wire transfer request — the anatomy of a scam that now takes minutes to produce.",
    content:
      "A cloned voice, a manufactured emergency, and a wire transfer request — the anatomy of a scam that now takes minutes to produce. Consumer-grade voice cloning tools need only a few seconds of source audio, often lifted from a public social media video, to generate a convincing impersonation.\n\nSmall business owners are disproportionately targeted because fewer have the layered verification procedures larger firms use for financial approvals. Security researchers recommend a simple mitigation: a pre-agreed verbal codeword for any request involving funds movement, never confirmable over the same channel as the request.",
    cover_image: null,
    status: "published",
    created_at: daysAgo(8),
    updated_at: daysAgo(8),
  },
  {
    id: 6,
    title: "Inside Bangladesh's First Digital Forensics Lab Built for Mobile-First Crime",
    slug: "bangladesh-digital-forensics-lab-mobile-crime",
    category: "Crime Branch",
    excerpt:
      "A new unit is retooling investigative workflows around a simple fact: nearly every case now begins with a phone, not a computer.",
    content:
      "A new unit is retooling investigative workflows around a simple fact: nearly every case now begins with a phone, not a computer. The lab's caseload skews heavily toward mobile financial services fraud, messaging-app harassment, and SIM-related identity theft — categories that older forensic tooling, built around desktop hard drives, handled poorly.\n\nEarly results are promising: average case turnaround has dropped as investigators no longer wait on external labs for basic mobile extractions.",
    cover_image: null,
    status: "published",
    created_at: daysAgo(10),
    updated_at: daysAgo(10),
  },
  {
    id: 7,
    title: "Open-Source Intelligence Is Reshaping Local Crime Journalism",
    slug: "osint-reshaping-local-crime-journalism",
    category: "Crime Analysis",
    excerpt:
      "Reporters are borrowing OSINT tradecraft from security researchers to verify claims faster than official statements arrive.",
    content:
      "Reporters are borrowing OSINT tradecraft from security researchers to verify claims faster than official statements arrive. Geolocating a bystander video, cross-referencing a vehicle plate against public registries, or timestamping a social post against weather data — the techniques are the same ones used in threat intelligence, repurposed for editorial verification.\n\nThe shift raises its own ethical questions around privacy and sourcing, which newsrooms are still working out in real time.",
    cover_image: null,
    status: "published",
    created_at: daysAgo(12),
    updated_at: daysAgo(12),
  },
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 101,
    title: "Coordinated Phishing Campaign Impersonating Major Mobile Financial Service",
    slug: "phishing-campaign-mobile-financial-service",
    report_type: "scam-alert",
    summary:
      "SMS messages directing recipients to a lookalike login page have been reported by over 200 users in the past week.",
    content:
      "SMS messages directing recipients to a lookalike login page have been reported by over 200 users in the past week. The domain, registered less than a month ago, closely mimics the legitimate service's branding and URL structure.\n\nUsers who entered credentials on the page reported unauthorized transactions within hours. The legitimate provider has confirmed it never requests account verification via SMS link and has begun takedown proceedings against the domain.\n\nRecommended action: never enter mobile financial services credentials through a link received via SMS. Navigate directly via the official app.",
    severity: "high",
    status: "published",
    created_at: daysAgo(1),
  },
  {
    id: 102,
    title: "Customer Database Exposed by Misconfigured Cloud Storage Bucket",
    slug: "customer-database-exposed-cloud-storage",
    report_type: "breach",
    summary:
      "An unsecured storage bucket left customer names, phone numbers, and partial order histories publicly accessible for an estimated three weeks.",
    content:
      "An unsecured storage bucket left customer names, phone numbers, and partial order histories publicly accessible for an estimated three weeks before being flagged by a security researcher and quietly closed.\n\nThe affected company has not issued a public disclosure at time of writing. No payment card data appears to have been included in the exposed records, based on the schema observed in cached snapshots.\n\nThis report will be updated if the company issues a formal notification.",
    severity: "critical",
    status: "published",
    created_at: daysAgo(2),
  },
  {
    id: 103,
    title: "Fake Job Offer Network Targeting Recent Graduates on Messaging Apps",
    slug: "fake-job-offer-network-graduates",
    report_type: "fraud",
    summary:
      "Scammers posing as recruiters for international logistics firms are requesting upfront 'processing fees' via mobile wallet.",
    content:
      "Scammers posing as recruiters for international logistics firms are requesting upfront 'processing fees' via mobile wallet transfer before any interview takes place. Victims are contacted directly through messaging apps rather than professional networking platforms, a pattern that should itself raise suspicion.\n\nNo legitimate employer requires payment from a candidate as a condition of employment. Recipients of such offers are encouraged to report the originating number.",
    severity: "medium",
    status: "published",
    created_at: daysAgo(4),
  },
  {
    id: 104,
    title: "Malware-Laced APK Files Circulating Through Unofficial App Sharing Groups",
    slug: "malware-apk-unofficial-app-sharing-groups",
    report_type: "cybercrime",
    summary:
      "Modified versions of popular apps distributed outside official app stores contain a hidden SMS-forwarding component.",
    content:
      "Modified versions of popular apps distributed outside official app stores contain a hidden SMS-forwarding component capable of intercepting one-time passcodes. The apps are functionally identical to their legitimate counterparts, making detection difficult without inspecting requested permissions.\n\nUsers are advised to install applications only from official app stores and to review requested permissions before granting SMS access to any non-messaging app.",
    severity: "high",
    status: "published",
    created_at: daysAgo(5),
  },
  {
    id: 105,
    title: "Low-Volume Card Skimming Reports Near ATM Cluster in Commercial District",
    slug: "card-skimming-atm-cluster-commercial-district",
    report_type: "fraud",
    summary:
      "A handful of unauthorized withdrawal reports share a common thread: recent card use at the same ATM cluster.",
    content:
      "A handful of unauthorized withdrawal reports share a common thread: recent card use at the same ATM cluster within a two-week window. Physical inspection has not yet confirmed a skimming device, but the pattern is consistent with one.\n\nCustomers who used ATMs in the affected cluster in the past month are advised to monitor statements closely and consider a precautionary card reissue.",
    severity: "low",
    status: "published",
    created_at: daysAgo(9),
  },
  {
    id: 106,
    title: "Investment Group Chat Scam Promising Guaranteed Daily Returns",
    slug: "investment-group-chat-guaranteed-returns",
    report_type: "scam-alert",
    summary:
      "A recurring scam format uses screenshots of fabricated returns to recruit new depositors into a collapsing pyramid structure.",
    content:
      "A recurring scam format uses screenshots of fabricated returns to recruit new depositors into a collapsing pyramid structure disguised as a trading signal group. Early joiners are paid out from new deposits to generate credible testimonials, a classic Ponzi mechanic accelerated by group messaging reach.\n\nAny investment opportunity promising fixed, guaranteed daily returns regardless of market conditions should be treated as a near-certain scam.",
    severity: "medium",
    status: "published",
    created_at: daysAgo(11),
  },
];

export function paginate<T>(items: T[], page: number, limit: number): Paginated<T> {
  const total = items.length;
  const total_pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    page,
    limit,
    total,
    total_pages,
  };
}
