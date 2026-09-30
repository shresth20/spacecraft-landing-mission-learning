# Area of Quadrilaterals — Voice-Over Script

Every spoken line in the mission, in play order, keyed to the **page numbers**
of the in-game section jump menu (the numbers shown beside each section name in
the header drop-down). Pages run 1–30. Two pages have since been cut from the game
(page 6, and page 16 folded into page 15), so from page 6 on the jump menu's
own numbers run lower than these; this script keeps its numbering so the clip
IDs stay stable.

- **ID** — suggested filename stem for the recorded clip (`P04-06.mp3`).
- **Type** — `INSTRUCTION` (tells the learner to act), `NARRATION` (explains
  what is on screen), `FEEDBACK` (answers a learner's choice), `HINT` (nudge
  after a wrong answer), `REWARD` (praise).
- **Where** — which box the line is typed into on screen, so the read can be
  paced to it.

Lines are typed out character by character as they play. Where a voice-over
clip exists the typing is paced to the clip's length, so a longer read simply
types more slowly — no re-timing needed. All apostrophes below are the
typographic `’` used in the source.

---

## Recording notes

- **Speaker:** Swiftee, the bird mascot. One voice throughout — there is no
  second narrator.
- **Register:** warm, encouraging, unhurried. Lines that start with "Let's" or
  "Let us" are the mascot thinking alongside the learner, not commanding.
- **Maths notation:** read `½` as "half", `d₁` / `d₂` as "d one" / "d two",
  `h₁` / `h₂` as "h one" / "h two", `×` as "times", `sq. cm` as "square
  centimetres", `90°` as "ninety degrees".
- **Reuse:** identical strings are marked *(reuse of …)*. One recording can
  serve all of them, but a separate take per page is safer if the surrounding
  pacing differs.

### Audio already in the project

Every line below has been cut from a master recording into a clip of its own
under **`assets/VO/`**, named `<ID>-<first words>.mp3` — for example
`P04-06-lets-try-and-find-its-area.mp3`. All clips are mono, 128 kbps.

There are two recordings, in two voices:

- **Pages 1–8** (P01-01 … P08-02, FB-01 … FB-04) are cut from the **new
  voice**, `voice 1-2.mp3` (29 Sep 2026). This take also covers every line on
  those pages that was marked *needs recording* before — the page 4 working
  (P04-13 … P04-20), the page 5 formula boxes (P05-04 … P05-09) and the page 7
  answers (P07-02 … P07-04).
- **Pages 9–30** are still the clips cut from the **old voice** (`voice.mp3`).
  They keep playing until the new voice records those pages; the four lines
  the two pages share ("What shape is this?", "So, its area will be …",
  "Let’s put in each triangle’s area." and the feedback bank) now play in
  the new voice wherever they appear.

The four hand-made clips that used to sit in `assets/audio/` have been
replaced by these and removed; that folder now holds only the four sound
effects (`correct-answer.ogg`, `incorrect-answer.ogg`, `confetti-sound.ogg`,
`button-click.ogg`). The two naming mismatches noted here before — "Drag each
**block**…" against an on-screen "Drag each **name**…", and "Drag each
area…" against "Great! Now let’s recall their area formulas." — are settled:
each line now has a clip of the words actually on the screen.

### How a clip reaches its line

Nothing in the mission names an audio file. `script.js` holds one registry,
`VO_FILE`, keyed by **the line itself**, and every typewriter asks it before
it types. So a line said on six pages ("That’s Correct!") finds its clip
wherever it appears, a line built at run time ("Try again! Join the *left* and
*right* corners.") finds its own, and a line with no clip simply types at its
own pace in silence. Each line is typed across ~82% of its clip, so the last
word lands a little before the voice finishes the sentence.

### Not on the master recording

| ID | Line | Why |
|---|---|---|
| P09-13 | Parallelogram has two pairs of parallel sides. | page 9 verdict, third sentence — needs recording |
| P09-14 | This is not a trapezium. | page 9, wrong name, second sentence — needs recording |
| P09-15 | Trapezium has only one pair of parallel sides. | page 9, wrong name, third sentence — needs recording |
| P30-03 | The parallel sides are 30 cm and 40 cm, and the height is 15 cm. | no longer said (page 30’s hints were cut, 30 Sep 2026) |
| X-01 … X-06 | the appendix lines below | those scenes are not in the running order |

### Global feedback bank (used on almost every page)

| ID | Type | Line |
|---|---|---|
| FB-01 | FEEDBACK | That’s Correct |
| FB-03 | REWARD | Well Done! |
| FB-04 | FEEDBACK | Not quite! |

FB-02, "Try again", is removed on purpose (2026-09-30) and must not be
recorded or wired back in: a wrong answer gets the buzzer and the shake, plus
Swiftee's own sentence about what is wrong wherever the page has one. The
full-sentence nudges P04-08 and P05-02 ("Try again! Join the … corners.") are
their own lines and stay.

These are written into the heading box after a drop, a tap or a
drop-down answer, on pages 2, 4–7, 9–12, 14–21, 23–24, 27–30. Record once; they
are reused verbatim everywhere.

---

## Page 1 — Welcome

Swiftee hops into the middle of the landscape and speaks from a speech bubble.

| ID | Type | Line | Where |
|---|---|---|---|
| P01-01 | NARRATION | Hey there! | Speech bubble |
| P01-02 | INSTRUCTION | Let’s start with a quick warm-up! | Speech bubble |

## Page 2 — Warm-up · name the shapes

| ID | Type | Line | Where |
|---|---|---|---|
| P02-01 | NARRATION | Here are a few common shapes. | Heading |
| P02-02 | INSTRUCTION | Drag each name to the matching shape. | Heading (round 1 briefing — clip exists) |
| P02-03 | INSTRUCTION | Great! Now let’s recall their area formulas. | Heading (round 2 briefing — clip exists) |

Feedback on this page: FB-01, FB-03. A wrong drop is answered by the buzzer
and the shake only.

## Page 3 — Triangles · base and height

| ID | Type | Line | Where |
|---|---|---|---|
| P03-01 | NARRATION | Triangles can look different. But their area depends on the base and height. | Heading |
| P03-02 | INSTRUCTION | Let’s observe their base and height. | Heading |

## Page 4 — Quadrilateral · one diagonal

| ID | Type | Line | Where |
|---|---|---|---|
| P04-01 | INSTRUCTION | What shape is this? | Swiftee's box, above the three names (the names appear first, then the question) |
| P04-02 | FEEDBACK | Not quite! A triangle has 3 sides. | Same box, red |
| P04-03 | FEEDBACK | Not quite! A pentagon has 5 sides. | Same box, red |
| P04-04 | FEEDBACK | Correct. A quadrilateral has 4 sides. | Same box, green |
| P04-05 | NARRATION | This is a general quadrilateral. | Swiftee's line beside the shape |
| P04-06 | INSTRUCTION | Let’s try and find its area! | Swiftee's line beside the shape |
| P04-07 | INSTRUCTION | Join the corners to draw a diagonal. | Heading (Swiftee comes up with it, having left after P04-06) |
| P04-08 | FEEDBACK | Try again! Join the left and right corners. | Heading, on a wrong pair of corners |
| P04-09 | NARRATION | Now, the quadrilateral is divided into two triangles. Let’s look at each triangle. | Heading |
| P04-13 | NARRATION | Let’s say the base of this triangle is b. | Heading, Triangle 1 forward |
| P04-14 | NARRATION | And its height is h₁. | Heading |
| P04-15 | NARRATION | So, its area will be … | Heading; the line writes itself beside the shape |
| P04-16 | NARRATION | This triangle has the same base b. | Heading, Triangle 2 forward (after Next) |
| P04-17 | NARRATION | And its height is h₂. | Heading |
| P04-18 | NARRATION | So, its area will be … *(reuse of P04-15)* | Heading |
| P04-10 | NARRATION | Let’s put in each triangle’s area. | Heading (after Next) |
| P04-11 | NARRATION | Both triangles share the same base b. | Heading |
| P04-19 | NARRATION | The base b is the diagonal. | Heading; a copy of the rule's b becomes "Diagonal" |
| P04-20 | NARRATION | And h₁ + h₂ is the sum of the perpendicular heights. | Heading; the bracket becomes "Sum of perpendicular heights" |
| P04-12 | NARRATION | So this is the area of the quadrilateral! | Heading |

## Page 5 — Quadrilateral · the other diagonal

| ID | Type | Line | Where |
|---|---|---|---|
| P05-01 | INSTRUCTION | Let’s try a different way! | Heading |
| P05-02 | FEEDBACK | Try again! Join the top and bottom corners. | Heading, on a wrong pair of corners |
| P05-03 | NARRATION | Two new triangles! Let’s find their areas. | Heading |
| P05-04 | INSTRUCTION | Complete the formula for the area of the quadrilateral. | Heading, once the shape has moved aside |
| P05-05 | INSTRUCTION | Choose the diagonal of the quadrilateral. | Heading, the first box |
| P05-06 | FEEDBACK | This is the height of the orange triangle. | Heading, red — on h₁ in the first box |
| P05-07 | FEEDBACK | This is the height of the purple triangle. | Heading, red — on h₂ in the first box |
| P05-08 | INSTRUCTION | Choose the sum of the perpendicular heights. | Heading, the second box |
| P05-09 | FEEDBACK | We add the two heights, not the diagonal. | Heading, red — on a wrong sum |
| P05-10 | NARRATION | So this is the area of the quadrilateral! *(reuse of P04-12)* | Heading, once both boxes are right |

On-screen only (no VO): the rule in words is typed out,
"Area of Quadrilateral = ½ × (Diagonal) × (Sum of perpendicular heights)";
after P05-04 a copy of it slides down and its two bracketed parts turn into
drop-downs (placeholders "diagonal" and "sum of perpendicular heights") —
the first offers b / h₁ / h₂, the second h₁ + h₂ / b + h₁ / b + h₂.

## Page 6 — Quadrilateral · with measurements

| ID | Type | Line | Where |
|---|---|---|---|
| P06-01 | NARRATION | Here is a different quadrilateral. | Heading |
| P06-02 | NARRATION | Let’s look at its base and heights. | Heading |
| P06-03 | INSTRUCTION | Choose the base and height for each triangle. | Heading |

## Page 7 — Quadrilateral · your own go

| ID | Type | Line | Where |
|---|---|---|---|
| P07-01 | INSTRUCTION | Now it’s your turn! Find the area of this quadrilateral. | Heading |
| P07-02 | FEEDBACK | Not quite! Look at the measure of the heights. | Heading, on a wrong sum; the heights glow gold |
| P07-03 | FEEDBACK | Not quite! Look at the measure of the diagonal. | Heading, on a wrong diagonal; the diagonal glows gold |
| P07-04 | FEEDBACK | Area of a general quadrilateral = ½ × diagonal × sum of perpendicular heights. | Heading, on a wrong area |

On-screen only — the three drop-down question labels: "The sum of the
perpendicular heights is", "Diagonal length is", "The area of the
quadrilateral is". Record these too if the questions are to be read aloud.

## Page 8 — Aside · special quadrilaterals

Board goes; Swiftee speaks from its speech bubble on the landscape.

| ID | Type | Line | Where |
|---|---|---|---|
| P08-01 | NARRATION | We know how to find the area of a general quadrilateral. | Speech bubble |
| P08-02 | INSTRUCTION | Now, let’s find the area of some special quadrilaterals! | Speech bubble |

## Page 9 — Parallelogram · its sides

| ID | Type | Line | Where |
|---|---|---|---|
| P09-01 | INSTRUCTION | What shape is this? *(reuse of P04-01)* | Swiftee's banner beside the shape |
| P09-02 | FEEDBACK | Correct! | Banner, green — the verdict is said a sentence at a time; this plays the "That’s Correct!" half of the old take |
| P09-12 | FEEDBACK | This is a parallelogram. | Banner, green — the other half of the old take |
| P09-13 | FEEDBACK | Parallelogram has two pairs of parallel sides. | Banner, green — **needs recording** |
| P09-03 | HINT | Not quite! *(FB-04)* | Banner, red |
| P09-14 | HINT | This is not a trapezium. | Banner, red — **needs recording** |
| P09-15 | HINT | Trapezium has only one pair of parallel sides. | Banner, red — **needs recording** |
| P09-04 | NARRATION | Look at the top and bottom sides. | Banner |
| P09-05 | NARRATION | They run side by side and never meet. | Banner |
| P09-06 | NARRATION | The left and right sides do the same! | Banner |
| P09-07 | NARRATION | Now let’s compare their lengths. | Banner |
| P09-08 | NARRATION | The top side fits the bottom side exactly! | Banner |
| P09-09 | NARRATION | And the left side fits the right side too! | Banner |
| P09-10 | NARRATION | Opposite sides are parallel to each other. | Fact list on the board |
| P09-11 | NARRATION | Opposite sides are equal in length. | Fact list on the board |

## Page 10 — Parallelogram · its area

| ID | Type | Line | Where |
|---|---|---|---|
| P10-01 | NARRATION | Here is a parallelogram. | Heading |
| P10-02 | NARRATION | This is the base of the parallelogram. | Heading |
| P10-03 | NARRATION | Here comes the height! | Heading |
| P10-04 | INSTRUCTION | Let us divide this into two triangles. | Heading |
| P10-05 | NARRATION | Let’s look at Triangle 1. | Heading |
| P10-06 | NARRATION | Its area is ½ × base × height. | Heading |
| P10-07 | NARRATION | Its base is b. | Heading |
| P10-08 | NARRATION | And its height is h. | Heading |
| P10-09 | NARRATION | Now let’s look at Triangle 2. | Heading |
| P10-10 | NARRATION | Its area is also ½ × base × height. | Heading |
| P10-11 | NARRATION | It has the same base b. | Heading |
| P10-12 | NARRATION | And the same height h. | Heading |
| P10-13 | NARRATION | The parallelogram is made of both triangles. | Heading |
| P04-10 | NARRATION | Let’s put in each triangle’s area. | Heading (page 4’s clip, reused) |
| P10-14 | NARRATION | Two halves of b × h make one whole b × h. | Heading |
| P10-15 | NARRATION | That is base × height! | Heading |
| P10-16 | NARRATION | So this is the area of the parallelogram! | Heading |

P10-05 … P10-16 (the two triangles' working) have no clip yet — they were
not on either recording and type in silence. **Needs recording.**

## Page 11 — Parallelogram · the formula

| ID | Type | Line | Where |
|---|---|---|---|
| P11-01 | INSTRUCTION | Which of these is the area of the parallelogram? | Swiftee's box in the right half, the shape on the left (the question first, then the three formulas one at a time under it) |
| P11-03 | FEEDBACK | Not quite! That is the area of just one triangle. | Same box, red — on ½ × base × height — **needs recording** |
| P11-04 | FEEDBACK | Not quite! That is twice the area of the parallelogram. | Same box, red — on 2 × base × height — **needs recording** |
| P11-02 | FEEDBACK | That’s Correct! Area of a parallelogram = base × height. | Same box, green; Swiftee stays with it until Next, then the formulas go and it hops up to the heading |

## Page 12 — Parallelogram · your own go

| ID | Type | Line | Where |
|---|---|---|---|
| P12-01 | INSTRUCTION | Now it’s your turn! Find the area of this parallelogram. | Heading |
| P12-02 | FEEDBACK | Not quite! Look at the measure of the base. | Heading, on a wrong base; the base glows gold — **needs recording** |
| P12-03 | FEEDBACK | That’s Correct! The base is 8 cm. | Heading, on the right base — **needs recording** |
| P12-04 | FEEDBACK | Not quite! Look at the measure of the height. | Heading, on a wrong height; the height glows gold — **needs recording** |
| P12-05 | FEEDBACK | That’s Correct! The height is 5 cm. | Heading, on the right height — **needs recording** |
| P12-06 | FEEDBACK | Not quite! Area of a parallelogram = base × height. | Heading, on a wrong area; the base and the height glow gold — **needs recording** |
| P12-07 | FEEDBACK | That’s Correct! The area is 8 × 5 = 40 sq. cm. | Heading, on the right area; then Well Done! and confetti — **needs recording** |

Until these are recorded they type in silence; a right answer still says
"That’s Correct" (FB-01) as its line types.

On-screen only — drop-down labels: "The base of the parallelogram is", "The
height is", "The area of the parallelogram is".

## Page 13 — Aside · on to the rhombus

| ID | Type | Line | Where |
|---|---|---|---|
| P13-01 | NARRATION | We now know how to find the area of a parallelogram. | Speech bubble |
| P13-02 | INSTRUCTION | Let us now try finding the area of a special parallelogram. | Speech bubble |

## Page 14 — Rhombus · its sides

| ID | Type | Line | Where |
|---|---|---|---|
| P14-01 | INSTRUCTION | Drag the points to make each angle 90 degrees. | Heading |
| P14-02 | NARRATION | All four sides are equal in length! | Heading |
| P14-03 | NARRATION | And the diagonals meet at a right angle (90°). | Heading |
| P14-04 | NARRATION | A parallelogram with these properties is called a rhombus. | Heading |
| P14-05 | NARRATION | This is the special parallelogram called Rhombus. | Swiftee's line beside the shape |

## Page 15 — Rhombus · its area

Worked the way page 4 works the quadrilateral (29 Sep 2026). The formula quiz
that used to open this page is cut, and page 16's working is now this page's
second half: Next on page 14 comes straight here. Swiftee stays at the heading
for every line and leaves after the last one; the page then zooms in a little
and Next appears.

| ID | Type | Line | Where |
|---|---|---|---|
| P15-01 | NARRATION | Here, is a Rhombus. | Heading, once the shape has tilted and d₁ and d₂ are drawn |
| P16-01 | INSTRUCTION | Let’s find the area of the whole rhombus. | Heading; d₂ steps back and the two halves shade |
| P15-06 | NARRATION | Let’s look at Triangle 1. *(same words as P10-05)* | Heading; "Area of Triangle 1 = ½ × base × height" writes itself beside the shape |
| P15-07 | NARRATION | Its base is the diagonal d₁. | Heading; the upper half comes forward with a heavy border and d₁ floats onto "base" |
| P04-14 | NARRATION | And its height is h₁. *(page 4’s clip, reused)* | Heading; h₁ drops from the crossing and floats onto "height" |
| P15-08 | NARRATION | Now let’s look at Triangle 2. *(same words as P10-09)* | Heading (after Next); "Area of Triangle 2 = ½ × base × height" |
| P15-09 | NARRATION | It has the same base d₁. | Heading; the lower half comes forward, d₁ floats onto "base" |
| P04-17 | NARRATION | And its height is h₂. *(page 4’s clip, reused)* | Heading; h₂ drops and floats onto "height" |
| P04-10 | NARRATION | Let’s put in each triangle’s area. *(page 4’s clip, reused)* | Heading (after Next); line 3, "Area of Rhombus = Area of Triangle 1 + Area of Triangle 2", becomes ½ × d₁ × h₁ + ½ × d₁ × h₂ |
| P16-03 | NARRATION | Both parts have ½ × d₁ in them, so take it out. | Heading; ½ × d₁ × (h₁ + h₂) |
| P16-04 | NARRATION | And h₁ and h₂ together make the whole of d₂. | Heading; ½ × d₁ × d₂ |
| P15-10 | NARRATION | And d₁ × d₂ is the product of the diagonals. | Heading; line 4, a copy of line 3 after its "=", becomes "= ½ × Product of Diagonals" |
| P16-05 | NARRATION | So the area of a rhombus is ½ × d₁ × d₂. | Heading; confetti, then Swiftee leaves |

P15-06 … P15-10 have no clip yet — they were not on either recording and type
in silence. **Needs recording.** P15-06 and P15-08 are the same words as
P10-05 and P10-09 (also unrecorded), so one take serves both pages.

No longer said anywhere: P15-02 "Choose the correct area of the orange
triangle.", P15-04 "Choose the correct area of the purple triangle." and
P16-02 "Put in what each triangle’s area is." — the quiz they belonged to is
cut, and page 4’s P04-10 takes P16-02’s place. Their clips are still in
`assets/VO/` but nothing plays them. P15-03’s clip ("That’s Correct!") is
kept: it is the take pages 17, 18, 27 and 29 play.

## Page 16 — Rhombus · the sum

Merged into page 15 (29 Sep 2026); it is no longer in the jump menu.

## Page 17 — Rhombus · with numbers

| ID | Type | Line | Where |
|---|---|---|---|
| P17-01 | INSTRUCTION | Drag the two lengths into the formula. | Heading |
| P17-02 | FEEDBACK | Not quite! The length written under the shape is d₁. | Heading, on a wrong length in the first slot — **needs recording** |
| P17-03 | FEEDBACK | That’s Correct! The first diagonal is 16 cm. Now drag d₂ into the formula. | Heading, on 16 cm in the first slot — **needs recording** |
| P17-04 | FEEDBACK | Not quite! The length written beside the shape is d₂. | Heading, on a wrong length in the second slot — **needs recording** |
| P17-05 | FEEDBACK | Fill d₁ first, then d₂. | Heading, on a drop into the locked second slot — **needs recording** |
| P17-06 | FEEDBACK | That’s Correct! *(plays P15-03’s clip; the quiz it was recorded for is cut)* | Heading, on both lengths in |

## Page 18 — Rhombus · practice 1

| ID | Type | Line | Where |
|---|---|---|---|
| P18-01 | INSTRUCTION | Choose the correct area. | Swiftee’s box, beside the answers (page 4’s way, 30 Sep 2026) |
| P18-02 | FEEDBACK | Not quite! That is 16 × 12 without the half. Look at the formula again. | The box, on 192 — **needs recording** |
| P18-03 | FEEDBACK | Not quite! That is 16 + 12. The diagonals are multiplied, not added. | The box, on 28 — **needs recording** |
| P18-04 | FEEDBACK | That’s Correct! Half of 16 × 12 is 96 sq. cm. | The box, on 96 — **needs recording** |

## Page 19 — Rhombus · practice 2

| ID | Type | Line | Where |
|---|---|---|---|
| P19-01 | INSTRUCTION | Find the other diagonal. | Swiftee’s box, beside the answers (30 Sep 2026: the first sentence, "This rhombus has an area of 240 sq. cm.", is now written over the shape instead, on screen only) — **needs recording** |
| P19-02 | FEEDBACK | Not quite! Half of 30 × 8 is only 120 sq. cm. | The box, on 8 cm — **needs recording** |
| P19-03 | FEEDBACK | Not quite! Half of 30 × 32 is 480 sq. cm. That is too much. | The box, on 32 cm — **needs recording** |
| P19-04 | FEEDBACK | That’s Correct! ½ × 30 × d₂ = 240, so d₂ is 16 cm. | The box, on 16 cm |

## Page 20 — Rhombus · practice 3

Page 16’s flow (30 Sep 2026): the rhombus draws itself in the middle, glides left, and Swiftee asks from its box on the right. The hint line and the self-solving working are gone; every answer is met with a sentence in the box.

| ID | Type | Line | Where |
|---|---|---|---|
| P20-01 | INSTRUCTION | What is the area of the rhombus? | Swiftee’s box, beside the answers |
| P20-02 | FEEDBACK | Not quite! That is 24 × 15 without the half. | The box, on 360 — **needs recording** |
| P20-03 | FEEDBACK | Not quite! That is 24 + 15. The diagonals are multiplied, not added. | The box, on 39 — **needs recording** |
| P20-04 | FEEDBACK | That’s Correct! Half of 24 × 15 is 180 sq. cm. | The box, on 180 — **needs recording** |

## Page 21 — Rhombus · practice 4

| ID | Type | Line | Where |
|---|---|---|---|
| P21-01 | INSTRUCTION | Which formula can you use here? | Swiftee’s box, beside the answers (page 4’s way, 30 Sep 2026) |
| P21-02 | FEEDBACK | Not quite! No diagonals are given here. Look at what is marked. | The box, on the diagonals formula — **needs recording** |
| P21-03 | FEEDBACK | That’s Correct! No diagonals are given, so use base × height. | The box, on base × height |

## Page 22 — Aside · on to the trapezium

| ID | Type | Line | Where |
|---|---|---|---|
| P22-01 | REWARD | We found the area of a rhombus! | Speech bubble |
| P22-02 | NARRATION | Ready for the next challenge? | Speech bubble |
| P22-03 | INSTRUCTION | Let’s find the area of another special quadrilateral! | Speech bubble |

## Page 23 — Trapezium · its name

Swiftee stands beside a "This is a [ ▾ ]" sentence. The prompt itself is shown
as a "Tap here" cue on the empty box rather than spoken, so only the three
answers are voiced.

| ID | Type | Line | Where |
|---|---|---|---|
| P23-01 | FEEDBACK | A kite has two pairs of equal sides next to each other. Check the shape carefully. | Swiftee's box, red. The "Almost!" is cut (30 Sep 2026); the clip still opens with it — **re-record** |
| P23-02 | FEEDBACK | A parallelogram has two pairs of parallel sides. Check the shape carefully. | Swiftee's box, red. Same — **re-record** |
| P23-03 | FEEDBACK | Correct! Look at the shape — it has only one pair of parallel sides. | Banner, green |

## Page 24 — Trapezium · pick them out

| ID | Type | Line | Where |
|---|---|---|---|
| P24-01 | INSTRUCTION | Select all the trapeziums. | Heading |
| — | FEEDBACK | Not quite! *(FB-04)* | Voice only, on a card that is not a trapezium — nothing is typed (30 Sep 2026) |
| P24-02 | FEEDBACK | This shape has no parallel sides. A trapezium has one pair. | Voice only, straight after FB-04 while the card is shown in the middle — nothing is typed. The clip in `assets/VO` is a stand-in made with edge-tts (en-US-JennyNeural, 30 Sep 2026) — **re-record in Swiftee’s voice** |
| P24-03 | FEEDBACK | Well done! You found all the trapeziums. | Heading, once the third trapezium is picked; the line and the bird go before Next (30 Sep 2026) — **needs recording** |

## Page 25 — Trapezium · its area

The scalene trapezium's derivation, narrated beat by beat. Swiftee speaks from
the heading for the whole of this page.

| ID | Type | Line | Where |
|---|---|---|---|
| P25-01 | INSTRUCTION | Let us try to find the area of this trapezium. | Heading |
| P25-02 | NARRATION | Its parallel sides are a and b, and its height is h. | Heading |
| P25-03 | NARRATION | Let us slide it across, to make room beside it. | Heading |
| P25-04 | NARRATION | Now let us take a copy of it. | Heading |
| P25-05 | NARRATION | The copy slides over and flips upside down. | Heading |
| P25-06 | NARRATION | Side a of the copy is equal to side a. | Heading |
| P25-07 | NARRATION | And side b of the copy is equal to side b. | Heading |
| P25-08 | NARRATION | Its height is the same h too. | Heading |
| P25-09 | NARRATION | The two trapeziums fit together to make a parallelogram! | Heading |
| P25-10 | NARRATION | So the parallelogram has base a + b and height h. | Heading |

## Page 26 — Trapezium · the formula

Swiftee hops down beside the working on the right half of the board.

| ID | Type | Line | Where |
|---|---|---|---|
| P26-01 | NARRATION | The area of the whole parallelogram is: | Swiftee's line beside the working |
| P26-02 | NARRATION | Our trapezium is exactly half of this parallelogram. | Same |
| P26-03 | NARRATION | So, the area of the trapezium is: | Same |
| P26-04 | NARRATION | This works for every trapezium! | Same |

## Page 27 — Trapezium · find the values

Page 15’s flow (30 Sep 2026): Swiftee stays at the heading for the whole
page. The trapezium draws itself and takes its three measurements, the
board halves and the formula builds itself on the right with a, b and h as
empty boxes; the three lengths are dragged in, in that order, and every drop
is answered in a sentence in the heading. With all three in, the working
simplifies itself straight away in the row the lengths stood in. The
drop-down, the hint line and the area question are gone.

| ID | Type | Line | Where |
|---|---|---|---|
| P27-01 | INSTRUCTION | Let’s find the area of this trapezium. | Heading, once the shape is measured |
| P27-12 | INSTRUCTION | Drag the three lengths into the formula. | Heading, once the lengths are dealt — **needs recording** |
| P27-13 | FEEDBACK | Not quite! a is the shorter parallel side. | Heading, on a wrong length in a — **needs recording** |
| P27-14 | FEEDBACK | That’s Correct! a is 8 cm. Now drag b into the formula. | Heading, on 8 in a — **needs recording** |
| P27-15 | FEEDBACK | Not quite! b is the longer parallel side. | Heading, on a wrong length in b — **needs recording** |
| P27-16 | FEEDBACK | That’s Correct! b is 14 cm. Now drag h into the formula. | Heading, on 14 in b — **needs recording** |
| P27-17 | FEEDBACK | Not quite! h is the perpendicular height. | Heading, on a wrong length in h — **needs recording** |
| P27-18 | FEEDBACK | Fill a first. Then b and then h. | Heading, on a drop into a box that is still locked — **needs recording** |
| P27-11 | FEEDBACK | That’s Correct! *(reuse of P15-03)* | Heading, all three in |
| P27-10 | INSTRUCTION | Let’s simplify it, step by step. | Heading; the working in the lengths’ row |

On-screen only — the working that simplifies itself: "Area = ½ × ( 8 + 14 ) × 6",
"Area = ½ × 22 × 6", "Area = 11 × 6", "Area = 66 sq. cm".

No longer said anywhere (30 Sep 2026): P27-02 to P27-07, the three questions
and their hints — the drag is asked once, page 15’s way, and the verdicts
above take the hints’ place — and P27-08 and P27-09, the area question and
its hint, which this page no longer asks. Their clips are still in
`assets/VO/`; P27-06 "What is the height?" now plays on page 28, and P27-08
on pages 29 and 30.

## Page 28 — Trapezium · practice 1

Page 16’s flow (30 Sep 2026): the trapezium draws itself and takes its three
measurements, the board halves, and Swiftee hops down into the right half
and asks from its box; the three answers to each question come up one by
one under it, every verdict is a sentence in the same box — red for a wrong
pick, green for the right one — and the answers not chosen go as the right
one is. The two drop-downs and the hints under them are gone.

| ID | Type | Line | Where |
|---|---|---|---|
| P28-01 | INSTRUCTION | Look at the trapezium and choose the correct values. | Swiftee’s box, beside the answers |
| P28-08 | INSTRUCTION | What is the sum of the parallel sides? | The box — **needs recording** |
| P28-09 | FEEDBACK | Not quite! That is 20 + 10. Add the two parallel sides: 13 + 20. | The box, on 30 cm — **needs recording** |
| P28-10 | FEEDBACK | Not quite! That is 13 + 10. Add the two parallel sides: 13 + 20. | The box, on 23 cm — **needs recording** |
| P28-11 | FEEDBACK | That’s Correct! 13 + 20 = 33. The sum of the parallel sides is 33 cm. | The box, on 33 cm — **needs recording** |
| P27-06 | INSTRUCTION | What is the height? *(page 27’s clip, reused)* | The box; the dotted height is lit as it is asked |
| P28-12 | FEEDBACK | Not quite! 13 cm is the top parallel side. Look at the dotted perpendicular line. | The box, on 13 cm — **needs recording** |
| P28-13 | FEEDBACK | Not quite! 20 cm is the bottom parallel side. Look at the dotted perpendicular line. | The box, on 20 cm — **needs recording** |
| P28-14 | FEEDBACK | That’s Correct! The dotted perpendicular height is 10 cm. | The box, on 10 cm — **needs recording** |

No longer said anywhere (30 Sep 2026): P28-02 to P28-07, the stepped hints,
and the two on-screen labels "Sum of parallel sides is" and "Height is".

## Page 29 — Trapezium · practice 2

On the board page 28 left standing — the same trapezium, both values lit on
it, and the bird still in its box (30 Sep 2026). The area is asked from the
box with three answers; the answers go once the right one is chosen, and
the working solves itself in their place.

| ID | Type | Line | Where |
|---|---|---|---|
| P29-01 | INSTRUCTION | What is the area of the trapezium? *(reuse of P27-08)* | Swiftee’s box |
| P29-06 | FEEDBACK | Not quite! That is 33 × 10 without the half. | The box, on 330 — **needs recording** |
| P29-07 | FEEDBACK | Not quite! That is 33 + 10. Multiply the sum of the parallel sides by the height. | The box, on 43 — **needs recording** |
| P29-08 | FEEDBACK | That’s Correct! Half of 33 × 10 is 165 sq. cm. | The box, on 165 — **needs recording** |

On-screen only — the working: "Area = ½ × (13 + 20) × 10", "Area = ½ × 33 × 10",
"Area = 33 × 5", "Area = 165 sq. cm".

No longer said anywhere (30 Sep 2026): P29-02 to P29-05, the stepped hints
and the closing "That’s Correct!" — the verdict on 165 says it.

## Page 30 — Trapezium · practice 3 (check for understanding)

The final question, page 16’s way (30 Sep 2026): the trapezium draws itself
and takes its measurements, the board halves, and Swiftee asks from its box
in the right half with three answers under it. Every verdict is a sentence
in the box; once the right one is chosen the answers go, and the working
solves itself in their place.

| ID | Type | Line | Where |
|---|---|---|---|
| P30-01 | INSTRUCTION | What is the area of the trapezium? *(reuse of P27-08)* | Swiftee’s box |
| P30-04 | FEEDBACK | Not quite! That is 70 × 15 without the half. | The box, on 1050 — **needs recording** |
| P30-05 | FEEDBACK | Not quite! That is 30 × 15. Add both parallel sides first. | The box, on 450 — **needs recording** |
| P30-06 | FEEDBACK | That’s Correct! Half of (30 + 40) × 15 is 525 sq. cm. | The box, on 525 — **needs recording** |

On-screen only — the working: "Area = ½ × (30 + 40) × 15", "Area = ½ × 70 × 15",
"Area = 525 sq. cm".

No longer said anywhere (30 Sep 2026): P30-02 and P30-03, the two hints.

---

## Appendix — written but not currently played

These lines exist in the build and are reachable if the sections are put back
into the running order. Record them only if that is planned.

### The name-matching step after page 24 (`trapMatch`)

| ID | Type | Line |
|---|---|---|
| X-01 | INSTRUCTION | Drag each name to the correct shape. |

Currently plays with the page 2 round 1 clip when reached; page 24 hands
straight on to page 25 instead.

### The stand-alone step-by-step working (`trapSteps`, superseded)

| ID | Type | Line |
|---|---|---|
| X-02 | INSTRUCTION | Follow each simplification step. |

Its working is now the tail of page 27.

### The right-angled trapezium derivation (`rtrapArea` / `rtrapHalf`)

Same ten-then-four beats as pages 25 and 26, with four lines that differ
because two copies make a **rectangle** rather than a parallelogram.

| ID | Type | Line |
|---|---|---|
| X-03 | NARRATION | The two trapeziums fit together to make a rectangle! |
| X-04 | NARRATION | So the rectangle is a + b long and h wide. |
| X-05 | NARRATION | The area of the whole rectangle is: |
| X-06 | NARRATION | Our trapezium is exactly half of this rectangle. |

The other ten lines are identical to P25-01…P25-08 and P26-03…P26-04.

### The isosceles trapezium derivation (`isoArea` / `isoHalf`)

Word for word the same as pages 25 and 26 — two copies make a parallelogram
there too. No new recordings needed.

---

## Totals

| | Count |
|---|---|
| Line slots on pages 1–30 | 126 |
| Of which reuse an earlier recording | 14 |
| **New recordings needed (pages 1–30)** | **112** |
| Shared feedback lines (FB-01…FB-03) | 3 |
| Appendix lines (not currently played) | 6 |
| Clips in `assets/VO/` | 131 (pages 1–8 in the new voice, pages 9–30 in the old) |

---

## Flat list — for sending to the VO artist

Every line once, in play order, no duplicates. Page numbers kept as markers so
a line can be traced back to the section above; drop them if the artist wants
only the script.

```
— Page 1 · Welcome —
Hey there!
Let’s start with a quick warm-up!

— Page 2 · Warm-up, name the shapes —
Here are a few common shapes.
Drag each name to the matching shape.
Great! Now let’s recall their area formulas.

— Feedback, reused on almost every page —
That’s Correct
Well Done!
Not quite!

— Page 3 · Triangles, base and height —
Triangles can look different. But their area depends on the base and height.
Let’s observe their base and height.

— Page 4 · Quadrilateral, one diagonal —
What shape is this?
Not quite! A triangle has 3 sides.
Not quite! A pentagon has 5 sides.
Correct. A quadrilateral has 4 sides.
This is a general quadrilateral.
Let’s try and find its area!
Join the corners to draw a diagonal.
Try again! Join the left and right corners.
Now, the quadrilateral is divided into two triangles. Let’s look at each triangle.
Let’s say the base of this triangle is b.
And its height is h₁.
So, its area will be …
This triangle has the same base b.
And its height is h₂.
Let’s put in each triangle’s area.
Both triangles share the same base b.
The base b is the diagonal.
And h₁ + h₂ is the sum of the perpendicular heights.
So this is the area of the quadrilateral!

— Page 5 · Quadrilateral, the other diagonal —
Let’s try a different way!
Try again! Join the top and bottom corners.
Two new triangles! Let’s find their areas.
Complete the formula for the area of the quadrilateral.
Choose the diagonal of the quadrilateral.
This is the height of the orange triangle.
This is the height of the purple triangle.
Choose the sum of the perpendicular heights.
We add the two heights, not the diagonal.

— Page 6 · Quadrilateral, with measurements —
Here is a different quadrilateral.
Let’s look at its base and heights.
Choose the base and height for each triangle.

— Page 7 · Quadrilateral, your own go —
Now it’s your turn! Find the area of this quadrilateral.
The sum of the perpendicular heights is
Diagonal length is
The area of the quadrilateral is
Not quite! Look at the measure of the heights.
Not quite! Look at the measure of the diagonal.
Area of a general quadrilateral = ½ × diagonal × sum of perpendicular heights.

— Page 8 · Aside, special quadrilaterals —
We know how to find the area of a general quadrilateral.
Now, let’s find the area of some special quadrilaterals!

— Page 9 · Parallelogram, its sides —
Correct!
This is a parallelogram.
Parallelogram has two pairs of parallel sides.
Not quite!
This is not a trapezium.
Trapezium has only one pair of parallel sides.
Look at the top and bottom sides.
They run side by side and never meet.
The left and right sides do the same!
Now let’s compare their lengths.
The top side fits the bottom side exactly!
And the left side fits the right side too!
Opposite sides are parallel to each other.
Opposite sides are equal in length.

— Page 10 · Parallelogram, its area —
Here is a parallelogram.
This is the base of the parallelogram.
Here comes the height!
Let us divide this into two triangles.
Let’s look at Triangle 1.
So, its area will be …
Its base is b.
And its height is h.
Now let’s look at Triangle 2.
So, its area will be …
It has the same base b.
And the same height h.
The parallelogram is made of both triangles.
Let’s put in each triangle’s area.
Two halves of b × h make one whole b × h.
That is base × height!
So this is the area of the parallelogram!

— Page 11 · Parallelogram, the formula —
Which of these is the area of the parallelogram?
That’s Correct! Area of a parallelogram = base × height.

— Page 12 · Parallelogram, your own go —
Now it’s your turn! Find the area of this parallelogram.
The base of the parallelogram is
Not quite! Look at the measure of the base.
That’s Correct! The base is 8 cm.
The height is
Not quite! Look at the measure of the height.
That’s Correct! The height is 5 cm.
The area of the parallelogram is
Not quite! Area of a parallelogram = base × height.
That’s Correct! The area is 8 × 5 = 40 sq. cm.

— Page 13 · Aside, on to the rhombus —
We now know how to find the area of a parallelogram.
Let us now try finding the area of a special parallelogram.

— Page 14 · Rhombus, its sides —
Drag the points to make each angle 90 degrees.
All four sides are equal in length!
And the diagonals meet at a right angle (90°).
A parallelogram with these properties is called a rhombus.
This is the special parallelogram called Rhombus.

— Page 15 · Rhombus, its area —
Here, is a Rhombus.
Let’s find the area of the whole rhombus.
Its base is the diagonal d₁.
It has the same base d₁.
Both parts have ½ × d₁ in them, so take it out.
And h₁ and h₂ together make the whole of d₂.
And d₁ × d₂ is the product of the diagonals.
So the area of a rhombus is ½ × d₁ × d₂.

— Page 17 · Rhombus, with numbers —
Drag the two lengths into the formula.
Not quite! The length written under the shape is d₁.
That’s Correct! The first diagonal is 16 cm. Now drag d₂ into the formula.
Not quite! The length written beside the shape is d₂.
Fill d₁ first, then d₂.
That’s Correct!

— Page 18 · Rhombus, practice 1 —
Choose the correct area.
Not quite! That is 16 × 12 without the half. Look at the formula again.
Not quite! That is 16 + 12. The diagonals are multiplied, not added.
That’s Correct! Half of 16 × 12 is 96 sq. cm.

— Page 19 · Rhombus, practice 2 —
Find the other diagonal.
Not quite! Half of 30 × 8 is only 120 sq. cm.
Not quite! Half of 30 × 32 is 480 sq. cm. That is too much.
That’s Correct! ½ × 30 × d₂ = 240, so d₂ is 16 cm.

— Page 20 · Rhombus, practice 3 —
What is the area of the rhombus?
Not quite! That is 24 × 15 without the half.
Not quite! That is 24 + 15. The diagonals are multiplied, not added.
That’s Correct! Half of 24 × 15 is 180 sq. cm.

— Page 21 · Rhombus, practice 4 —
Which formula can you use here?
Not quite! No diagonals are given here. Look at what is marked.
That’s Correct! No diagonals are given, so use base × height.

— Page 22 · Aside, on to the trapezium —
We found the area of a rhombus!
Ready for the next challenge?
Let’s find the area of another special quadrilateral!

— Page 23 · Trapezium, its name —
What shape is this?
A kite has two pairs of equal sides next to each other. Check the shape carefully.
A parallelogram has two pairs of parallel sides. Check the shape carefully.
Correct! Look at the shape — it has only one pair of parallel sides.

— Page 24 · Trapezium, pick them out —
Select all the trapeziums.
This shape has no parallel sides. A trapezium has one pair.
Well done! You found all the trapeziums.

— Page 25 · Trapezium, its area —
Let us try to find the area of this trapezium.
Its parallel sides are a and b, and its height is h.
Let us slide it across, to make room beside it.
Now let us take a copy of it.
The copy slides over and flips upside down.
Side a of the copy is equal to side a.
And side b of the copy is equal to side b.
Its height is the same h too.
The two trapeziums fit together to make a parallelogram!
So the parallelogram has base a + b and height h.

— Page 26 · Trapezium, the formula —
The area of the whole parallelogram is:
Our trapezium is exactly half of this parallelogram.
So, the area of the trapezium is:
This works for every trapezium!

— Page 27 · Trapezium, find the values —
Let’s find the area of this trapezium.
Drag the three lengths into the formula.
Not quite! a is the shorter parallel side.
That’s Correct! a is 8 cm. Now drag b into the formula.
Not quite! b is the longer parallel side.
That’s Correct! b is 14 cm. Now drag h into the formula.
Not quite! h is the perpendicular height.
Fill a first. Then b and then h.
Let’s simplify it, step by step.

— Page 28 · Trapezium, practice 1 —
Look at the trapezium and choose the correct values.
What is the sum of the parallel sides?
Not quite! That is 20 + 10. Add the two parallel sides: 13 + 20.
Not quite! That is 13 + 10. Add the two parallel sides: 13 + 20.
That’s Correct! 13 + 20 = 33. The sum of the parallel sides is 33 cm.
What is the height?
Not quite! 13 cm is the top parallel side. Look at the dotted perpendicular line.
Not quite! 20 cm is the bottom parallel side. Look at the dotted perpendicular line.
That’s Correct! The dotted perpendicular height is 10 cm.

— Page 29 · Trapezium, practice 2 —
What is the area of the trapezium?
Not quite! That is 33 × 10 without the half.
Not quite! That is 33 + 10. Multiply the sum of the parallel sides by the height.
That’s Correct! Half of 33 × 10 is 165 sq. cm.

— Page 30 · Trapezium, practice 3 —
What is the area of the trapezium?
Not quite! That is 70 × 15 without the half.
Not quite! That is 30 × 15. Add both parallel sides first.
That’s Correct! Half of (30 + 40) × 15 is 525 sq. cm.
```
