# Area of Quadrilaterals — Voice-Over Script

Every spoken line in the mission, in play order, keyed to the **page numbers**
of the in-game section jump menu (the numbers shown beside each section name in
the header drop-down). Pages run 1–30.

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

Every line below has been cut from the master recording (`voice.mp3`) into a
clip of its own under **`assets/VO/`**, named `<ID>-<first words>.mp3` — for
example `P04-06-lets-try-and-find-its-area.mp3`. 114 clips in all, mono,
128 kbps, ~6.4 MB together.

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
| P30-03 | The parallel sides are 30 cm and 40 cm, and the height is 15 cm. | **reachable in the game** (page 30, second wrong try) — needs recording |
| X-01 … X-06 | the appendix lines below | those scenes are not in the running order |

### Global feedback bank (used on almost every page)

| ID | Type | Line |
|---|---|---|
| FB-01 | FEEDBACK | That’s Correct |
| FB-02 | FEEDBACK | Try again |
| FB-03 | REWARD | Well Done! |

These three are written into the heading box after a drop, a tap or a
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

Feedback on this page: FB-01, FB-02, FB-03.

## Page 3 — Triangles · base and height

| ID | Type | Line | Where |
|---|---|---|---|
| P03-01 | NARRATION | Triangles can look different, but their area depends on the base and height. | Heading |
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
| P04-09 | NARRATION | Now, the quadrilateral is divided into two triangles. Let’s look at each triangle. | Heading — **re-record** (was "The quadrilateral is divided into two triangles."; the old clip plays under the new line until then) |
| P04-13 | NARRATION | Let’s say the base of this triangle is b. | Heading, Triangle 1 forward — **needs recording** |
| P04-14 | NARRATION | And its height is h₁. | Heading — **needs recording** |
| P04-15 | NARRATION | So, its area will be … | Heading; the line writes itself beside the shape — **needs recording** |
| P04-16 | NARRATION | This triangle has the same base b. | Heading, Triangle 2 forward (after Next) — **needs recording** |
| P04-17 | NARRATION | And its height is h₂. | Heading — **needs recording** |
| P04-18 | NARRATION | So, its area will be … *(reuse of P04-15)* | Heading |
| P04-10 | NARRATION | Let’s put in each triangle’s area. | Heading (after Next) |
| P04-11 | NARRATION | Both triangles share the same base b. | Heading |
| P04-19 | NARRATION | The base b is the diagonal. | Heading; a copy of the rule's b becomes "Diagonal" — **needs recording** |
| P04-20 | NARRATION | And h₁ + h₂ is the sum of the perpendicular heights. | Heading; the bracket becomes "Sum of perpendicular heights" — **needs recording** |
| P04-12 | NARRATION | So this is the area of the quadrilateral! | Heading |

## Page 5 — Quadrilateral · the other diagonal

| ID | Type | Line | Where |
|---|---|---|---|
| P05-01 | INSTRUCTION | Let’s try a different way! | Heading |
| P05-02 | FEEDBACK | Try again! Join the top and bottom corners. | Heading, on a wrong pair of corners |
| P05-03 | NARRATION | Two new triangles! Let’s find their areas. | Heading |
| P05-04 | INSTRUCTION | Complete the formula for the area of the quadrilateral. | Heading, once the shape has moved aside — **needs recording** |
| P05-06 | NARRATION | So this is the area of the quadrilateral! *(reuse of P04-12)* | Heading, once both boxes are right |

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
| P09-02 | FEEDBACK | That’s Correct! This is a parallelogram. | Banner, green |
| P09-03 | HINT | Check it has two parallel sides. | Banner, red |
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

## Page 11 — Parallelogram · the formula

| ID | Type | Line | Where |
|---|---|---|---|
| P11-01 | INSTRUCTION | Which of these is the area of the parallelogram? | Heading |
| P11-02 | FEEDBACK | That’s Correct! Area of a parallelogram = base × height. | Heading |

## Page 12 — Parallelogram · your own go

| ID | Type | Line | Where |
|---|---|---|---|
| P12-01 | INSTRUCTION | Now it’s your turn! Find the area of this parallelogram. | Heading |

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

| ID | Type | Line | Where |
|---|---|---|---|
| P15-01 | NARRATION | Here, is a Rhombus. | Heading |
| P15-02 | INSTRUCTION | Choose the correct area of the orange triangle. | Heading |
| P15-03 | FEEDBACK | That’s Correct! | Heading |
| P15-04 | INSTRUCTION | Choose the correct area of the purple triangle. | Heading |
| P15-05 | FEEDBACK | That’s Correct! *(reuse of P15-03)* | Heading |

## Page 16 — Rhombus · the sum

| ID | Type | Line | Where |
|---|---|---|---|
| P16-01 | INSTRUCTION | Let’s find the area of the whole rhombus. | Heading |
| P16-02 | INSTRUCTION | Put in what each triangle’s area is. | Heading |
| P16-03 | NARRATION | Both parts have ½ × d₁ in them, so take it out. | Heading |
| P16-04 | NARRATION | And h₁ and h₂ together make the whole of d₂. | Heading |
| P16-05 | NARRATION | So the area of a rhombus is ½ × d₁ × d₂. | Heading |

## Page 17 — Rhombus · with numbers

| ID | Type | Line | Where |
|---|---|---|---|
| P17-01 | INSTRUCTION | Drag the two lengths into the formula. | Heading |
| P17-02 | FEEDBACK | That’s Correct! *(reuse of P15-03)* | Heading |

## Page 18 — Rhombus · practice 1

| ID | Type | Line | Where |
|---|---|---|---|
| P18-01 | INSTRUCTION | Choose the correct area. | Heading |
| P18-02 | FEEDBACK | That’s Correct! *(reuse of P15-03)* | Heading |

## Page 19 — Rhombus · practice 2

| ID | Type | Line | Where |
|---|---|---|---|
| P19-01 | INSTRUCTION | This rhombus has an area of 240 sq. cm. Find the other diagonal. | Heading |
| P19-02 | FEEDBACK | That’s Correct! ½ × 30 × d₂ = 240, so d₂ is 16 cm. | Heading |

## Page 20 — Rhombus · practice 3

The board halves; Swiftee asks from a panel on the right.

| ID | Type | Line | Where |
|---|---|---|---|
| P20-01 | INSTRUCTION | What is the area of the rhombus? | Panel, beside Swiftee |
| P20-02 | HINT | The diagonals are 24 cm and 15 cm. | Hint line under the answers (second wrong try) |

On-screen only — the working that solves itself after the right answer:
"Area = ½ × 24 × 15", "Area = 12 × 15", "Area = 180 sq. cm".

## Page 21 — Rhombus · practice 4

| ID | Type | Line | Where |
|---|---|---|---|
| P21-01 | INSTRUCTION | Which formula can you use here? | Heading |
| P21-02 | FEEDBACK | That’s Correct! No diagonals are given, so use base × height. | Heading |

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
| P23-01 | FEEDBACK | Almost! A kite has two pairs of equal sides next to each other. Check the shape carefully. | Banner, red |
| P23-02 | FEEDBACK | Almost! A parallelogram has two pairs of parallel sides. Check the shape carefully. | Banner, red |
| P23-03 | FEEDBACK | Correct! Look at the shape — it has only one pair of parallel sides. | Banner, green |

## Page 24 — Trapezium · pick them out

| ID | Type | Line | Where |
|---|---|---|---|
| P24-01 | INSTRUCTION | Select all the trapeziums. | Heading |

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

| ID | Type | Line | Where |
|---|---|---|---|
| P27-01 | INSTRUCTION | Let’s find the area of this trapezium. | Heading |
| P27-02 | INSTRUCTION | Which measurement is a, the shorter parallel side? | Question line in the panel |
| P27-03 | HINT | Look at the shorter parallel side. | Hint under the question |
| P27-04 | INSTRUCTION | Which measurement is b, the longer parallel side? | Question line in the panel |
| P27-05 | HINT | Look at the longer parallel side. | Hint under the question |
| P27-06 | INSTRUCTION | What is the height? | Question line in the panel |
| P27-07 | HINT | Look at the perpendicular height. | Hint under the question |
| P27-08 | INSTRUCTION | What is the area of the trapezium? | Heading |
| P27-09 | HINT | Add the two parallel sides: 8 cm + 14 cm. | Hint under the answers |
| P27-10 | INSTRUCTION | Let’s simplify it, step by step. | Heading |
| P27-11 | FEEDBACK | That’s Correct! *(reuse of P15-03)* | Heading |

On-screen only — the working that simplifies itself: "Area = ½ × ( 8 + 14 ) × 6",
"Area = ½ × 22 × 6", "Area = 11 × 6", "Area = 66 sq. cm".

## Page 28 — Trapezium · practice 1

| ID | Type | Line | Where |
|---|---|---|---|
| P28-01 | INSTRUCTION | Look at the trapezium and choose the correct values. | Heading |
| P28-02 | HINT | Add the two parallel sides: 13 + 20. | Hint, first wrong try |
| P28-03 | HINT | The parallel sides are 13 cm and 20 cm — add them. | Hint, second wrong try |
| P28-04 | HINT | 13 + 20 = 33, so the sum of the parallel sides is 33 cm. | Hint, third wrong try |
| P28-05 | HINT | Look at the dotted perpendicular line. | Hint, first wrong try (height) |
| P28-06 | HINT | The dotted line runs straight from the top parallel side down to the bottom one. | Hint, second wrong try (height) |
| P28-07 | HINT | The dotted perpendicular height is the one marked 10 cm. | Hint, third wrong try (height) |

On-screen only — the two question labels: "Sum of parallel sides is", "Height is".

## Page 29 — Trapezium · practice 2

| ID | Type | Line | Where |
|---|---|---|---|
| P29-01 | INSTRUCTION | What is the area of the trapezium? *(reuse of P27-08)* | Heading |
| P29-02 | HINT | Use ½ × sum of parallel sides × height. | Hint, first wrong try |
| P29-03 | HINT | Work out ½ × 33 × 10. | Hint, second wrong try |
| P29-04 | HINT | Half of 10 is 5, and 33 × 5 = 165 sq. cm. | Hint, third wrong try |
| P29-05 | FEEDBACK | That’s Correct! *(reuse of P15-03)* | Heading |

On-screen only — the working: "Area = ½ × 33 × 10", "Area = 33 × 5",
"Area = 165 sq. cm".

## Page 30 — Trapezium · practice 3 (check for understanding)

The final question. Swiftee asks from the right-hand panel.

| ID | Type | Line | Where |
|---|---|---|---|
| P30-01 | INSTRUCTION | What is the area of the trapezium? *(reuse of P27-08)* | Panel, beside Swiftee |
| P30-02 | HINT | Use ½ × (sum of the parallel sides) × height. | Hint, first wrong try |
| P30-03 | HINT | The parallel sides are 30 cm and 40 cm, and the height is 15 cm. | Hint, second wrong try |

On-screen only — the working: "Area = ½ × (30 + 40) × 15", "Area = ½ × 70 × 15",
"Area = 525 sq. cm".

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
| Line slots on pages 1–30 | 123 |
| Of which reuse an earlier recording | 11 |
| **New recordings needed (pages 1–30)** | **112** |
| Shared feedback lines (FB-01…FB-03) | 3 |
| Appendix lines (not currently played) | 6 |
| Clips already recorded | 2 (plus 2 unused) |

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
Try again
Well Done!

— Page 3 · Triangles, base and height —
Triangles can look different, but their area depends on the base and height.
Let’s observe their base and height.

— Page 4 · Quadrilateral, one diagonal —
What shape is this?
Incorrect. A triangle has 3 sides.
Incorrect. A pentagon has 5 sides.
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

— Page 6 · Quadrilateral, with measurements —
Here is a different quadrilateral.
Let’s look at its base and heights.
Choose the base and height for each triangle.

— Page 7 · Quadrilateral, your own go —
Now it’s your turn! Find the area of this quadrilateral.
The sum of the perpendicular heights is
Diagonal length is
The area of the quadrilateral is

— Page 8 · Aside, special quadrilaterals —
We know how to find the area of a general quadrilateral.
Now, let’s find the area of some special quadrilaterals!

— Page 9 · Parallelogram, its sides —
That’s Correct! This is a parallelogram.
Check it has two parallel sides.
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

— Page 11 · Parallelogram, the formula —
Which of these is the area of the parallelogram?
That’s Correct! Area of a parallelogram = base × height.

— Page 12 · Parallelogram, your own go —
Now it’s your turn! Find the area of this parallelogram.
The base of the parallelogram is
The height is
The area of the parallelogram is

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
Choose the correct area of the orange triangle.
That’s Correct!
Choose the correct area of the purple triangle.

— Page 16 · Rhombus, the sum —
Let’s find the area of the whole rhombus.
Put in what each triangle’s area is.
Both parts have ½ × d₁ in them, so take it out.
And h₁ and h₂ together make the whole of d₂.
So the area of a rhombus is ½ × d₁ × d₂.

— Page 17 · Rhombus, with numbers —
Drag the two lengths into the formula.

— Page 18 · Rhombus, practice 1 —
Choose the correct area.

— Page 19 · Rhombus, practice 2 —
This rhombus has an area of 240 sq. cm. Find the other diagonal.
That’s Correct! ½ × 30 × d₂ = 240, so d₂ is 16 cm.

— Page 20 · Rhombus, practice 3 —
What is the area of the rhombus?
The diagonals are 24 cm and 15 cm.

— Page 21 · Rhombus, practice 4 —
Which formula can you use here?
That’s Correct! No diagonals are given, so use base × height.

— Page 22 · Aside, on to the trapezium —
We found the area of a rhombus!
Ready for the next challenge?
Let’s find the area of another special quadrilateral!

— Page 23 · Trapezium, its name —
Almost! A kite has two pairs of equal sides next to each other. Check the shape carefully.
Almost! A parallelogram has two pairs of parallel sides. Check the shape carefully.
Correct! Look at the shape — it has only one pair of parallel sides.

— Page 24 · Trapezium, pick them out —
Select all the trapeziums.

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
Which measurement is a, the shorter parallel side?
Look at the shorter parallel side.
Which measurement is b, the longer parallel side?
Look at the longer parallel side.
What is the height?
Look at the perpendicular height.
What is the area of the trapezium?
Add the two parallel sides: 8 cm + 14 cm.
Let’s simplify it, step by step.

— Page 28 · Trapezium, practice 1 —
Look at the trapezium and choose the correct values.
Sum of parallel sides is
Height is
Add the two parallel sides: 13 + 20.
The parallel sides are 13 cm and 20 cm — add them.
13 + 20 = 33, so the sum of the parallel sides is 33 cm.
Look at the dotted perpendicular line.
The dotted line runs straight from the top parallel side down to the bottom one.
The dotted perpendicular height is the one marked 10 cm.

— Page 29 · Trapezium, practice 2 —
Use ½ × sum of parallel sides × height.
Work out ½ × 33 × 10.
Half of 10 is 5, and 33 × 5 = 165 sq. cm.

— Page 30 · Trapezium, practice 3 —
Use ½ × (sum of the parallel sides) × height.
The parallel sides are 30 cm and 40 cm, and the height is 15 cm.
```
