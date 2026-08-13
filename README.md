# SREC Safe Campus

Build a sleek, highly modern "Drug-Free Society & Campus Awareness Portal" for Sri Ramakrishna Engineering College (SREC) with dynamic Light/Dark Mode toggle and liquid ambient glass effects.

Visual Style & Ambience:

- Ambient Vibes: Floating animated background mesh gradient orbs that give depth and liquid light refractions across the background.

- Dynamic Theme System: Include a Theme Toggle button in the navbar (Sun/Moon icon). 

- Contrast Safety: Ensure all text colors shift dynamically using CSS variables or Tailwind dark: modifiers so text NEVER camouflages in Light or Dark mode.

  - Dark Mode: Slate background (#0b0f19), translucent glass cards, crisp white primary text, glowing cyan/teal accents.

  - Light Mode: Frost white/ice background (#f8fafc), white glass cards with slate border, deep navy/charcoal primary text (#0f172a), high-contrast teal accents.

Key Components & Placeholders:

1. GLASS NAVBAR WITH THEME TOGGLE

- Sticky header featuring:

  - Left: Placeholder box for [SREC College Logo] and college name.

  - Center: Section anchor links (Awareness, Principal, Pledge, Helplines, Quiz).

  - Right: Theme Toggle (Light/Dark mode) + Glowing Red "EMERGENCY SOS" button.

2. HERO SECTION & VIDEO PLAYER

- Headline: "Shatter the Chain. Choose Life." with dynamic rotating word subtitle.

- Subheading: "An Official Student Initiative for a Drug-Free Campus".

- HTML5 Video Player container set to load source "/drug-free.mp4" with autoplay, loop, muted, and custom glass play/unmute controls.

- Quick CTAs: "Take Anti-Drug Pledge" and "Emergency Helplines".

3. EDUCATIONAL HUB & BENTO GRID

- Causes of drug abuse, psychological symptoms, and mental health impact.

- Interactive Bento Grid for Drug Types (Opioids, Stimulants, Depressants, Synthetics) with filter tabs and detail modal popups.

4. PRINCIPAL'S ENDORSEMENT CARD

- Glassmorphic card titled "Principal's Message":

  - Placeholder box for [Principal Photo - Dr. A. Soundarrajan].

  - Bio highlights (25+ years experience, PSG Teacher of the Year, ISACA Academic Advocate) and quote supporting a zero-tolerance campus.

5. INTERACTIVE ANTI-DRUG PLEDGE & CERTIFICATE GENERATOR

- Form inputs: Student Name, Roll Number, Department, and Pledge Checkbox.

- On submit: Confetti animation + live printable "Certificate of Appreciation" glass card with name, department, date, and print button.

6. COIMBATORE HELPLINES & HOSPITALS

- Click-to-dial cards with copy buttons for: MANAS 1933, State Helpline 10581, Police 112/100, and EB-CID +91 94981 04304.

- Info section for Anti-Narcotics Task Force (ANTF) & EB-CID.

- Local Hospital grid (Coimbatore Medical College Hospital, PSG Hospitals, KMCH) with call and direction buttons.

7. MEDIA HUB, QUIZ ENGINE & SOS MODAL

- Bento grid of square news cards with hover glass overlays.

- 5-question interactive quiz with score badges and retake option.

- SOS Modal triggered by navbar button.

Ensure all buttons, theme state transitions, modals, forms, and quiz functions work properly without any text readability or contrast issues.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6996c54f-5660-42a2-921e-6a159d70d72e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
