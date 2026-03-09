# GuideMe

## Current State
The Subject Helper (SubjectHelperPage.tsx) is a 4-step flow (pick subject → pick class → describe problem → get answer) that searches Wikipedia live, rewrites the result in kid-friendly language with emojis, then shows YouTube channel links. It has no built-in curriculum knowledge base — every answer relies entirely on a Wikipedia API call.

## Requested Changes (Diff)

### Add
- A local GIGA dataset knowledge base (gigaDataset.ts) covering:
  - Math: Integers/Arithmetic, Fractions, Decimals, Algebra Basics — with rules, examples, worked questions, tips, XP, and game suggestions
  - Science: Biology (Cells, Circulatory System), Physics (Force & Motion, Light & Sound), Chemistry (States of Matter, Chemical Reactions), Earth & Space (Solar System, Water Cycle), Astronomy (Gravity)
  - English: Parts of Speech, Grammar (Sentence Structure, Tenses, Pronouns/Prepositions), Vocabulary (Synonyms/Antonyms/Homophones), Figures of Speech, Reading Comprehension, Writing, Literature
  - General Knowledge: Geography (Continents), History (Ancient Civilizations), Science Facts, Famous People, Current Affairs
  - Wellbeing: Emotions, Mindfulness, Study Habits, Self-Care, Motivation/Mindset
- A fuzzy keyword-matching function that searches the dataset for the best concept match based on the user's question text and selected subject
- A local result card component to render dataset answers (concept, explanation/rule, example, tips, suggested game with XP badge)
- Tutor-style AI response patterns for common question forms across all subjects

### Modify
- SubjectHelperPage.tsx search logic: first attempt local dataset match → if found (confidence above threshold), display local answer; if not found, fall back to Wikipedia live search
- The result display: local answers show concept name, rule/explanation, worked example, friendly tip, game suggestion with XP badge, then YouTube links below (same as now)
- Wikipedia fallback still rewrites results in kid-friendly language as before

### Remove
- Nothing removed — Wikipedia fallback is preserved

## Implementation Plan
1. Create `src/frontend/src/utils/gigaDataset.ts` with the full GIGA dataset structured as typed entries (subject, concept, keywords[], rule, explanation, examples[], tips[], gameSuggestion?, videoUrl?, xp)
2. Create a `findLocalAnswer(subject, query)` function in gigaDataset.ts that scores keyword matches and returns the best match above a confidence threshold
3. Update SubjectHelperPage.tsx:
   - Import findLocalAnswer and the local result type
   - In handleProblemSubmit, call findLocalAnswer first; if a match is returned, show it immediately (no loading delay needed); otherwise proceed to Wikipedia search
   - Add a LocalResultCard component that renders the dataset answer in the same styled card layout
4. Validate and deploy
