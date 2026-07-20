const fs = require('fs');
const path = require('path');

const newDevices = [
  {
    "id": "zoomorphism",
    "name": "Zoomorphism",
    "definition": "The attribution of animal properties to non-animals, including humans, events, or gods.",
    "simpleExplanation": "Describing a human (or object) as if they were an animal.",
    "advancedExplanation": "A dehumanizing or primal descriptive technique that strips a subject of its higher rational faculties, reducing it to pure instinct, violence, or subservience.",
    "purpose": "To degrade a character, emphasize their primal instincts, or highlight their lack of humanity.",
    "whyAuthorsUseIt": "To instantly communicate that a character is operating on instinct (fear, hunger, violence) rather than logic.",
    "psychologicalEffect": "Creates a visceral reaction in the reader, either disgust or primal terror.",
    "readerEffect": "The reader stops viewing the character as a rational human being.",
    "emotionalEffect": "Disgust, fear, or a sense of brutal reality.",
    "commonExamUses": ["War poetry (soldiers described as cattle)", "Dystopian literature", "Describing villains"],
    "commonMistakes": ["Confusing it with personification (which gives human traits to animals, the exact opposite)."],
    "differenceFromSimilar": "Personification makes things human. Zoomorphism makes humans into animals.",
    "literaryExample": "\"What passing-bells for these who die as cattle?\" (Wilfred Owen)",
    "everydayExample": "He barked orders at his team.",
    "realExamples": [{"quote": "The men ran like pigs to the slaughter.", "source": "Various", "difficulty": "Beginner"}],
    "interactiveExercise": {
      "question": "Why does Wilfred Owen describe the dying soldiers as 'cattle'?",
      "options": ["To show they lived on a farm.", "To highlight how the war machine has stripped them of their individuality, slaughtering them en masse without dignity.", "To make the poem rhyme."],
      "correctIndex": 1,
      "explanation": "Zoomorphism degrades the subject. Calling them cattle shows they are just meat for the slaughter, not heroic individuals."
    },
    "practiceSentence": "The zoomorphic description of [X] as a [animal] strips them of...",
    "ibLevel7Analysis": "By employing zoomorphism and comparing the soldiers to 'cattle', Owen forcefully strips the men of their heroic individuality. This primal imagery exposes the brutal reality of industrialized warfare, which processes human lives with the same mass, unfeeling efficiency as an abattoir.",
    "memoryTrick": "ZOO-morphism = Turning them into something from a ZOO.",
    "difficultyLevel": "Intermediate",
    "frequencyInExams": "High",
    "relatedDevices": ["Personification", "Dehumanization"],
    "tags": ["Imagery", "Figurative Language"]
  },
  {
    "id": "litotes",
    "name": "Litotes",
    "definition": "Ironical understatement in which an affirmative is expressed by the negative of its contrary.",
    "simpleExplanation": "Saying something is good by saying it's 'not bad'.",
    "advancedExplanation": "A rhetorical form of understatement that uses a double negative to subtly emphasize a point while maintaining a veneer of modesty, stoicism, or dry humor.",
    "purpose": "To emphasize a point by deliberately downplaying it, forcing the reader to mentally correct the understatement.",
    "whyAuthorsUseIt": "To create a stoic, dry, or sarcastic tone, especially when characters are trying to downplay intense emotion.",
    "psychologicalEffect": "Forces the reader to recognize the gap between the mild statement and the intense reality.",
    "readerEffect": "The reader feels a sense of dark humor or respects the character's stoicism.",
    "emotionalEffect": "Dry humor, stoic sadness, or sarcasm.",
    "commonExamUses": ["Stoic narrators", "British literature", "Downplaying tragedy"],
    "commonMistakes": ["Pronouncing it wrong (it's LIE-tuh-teez).", "Confusing it with simple understatement (litotes specifically uses the negative, e.g. 'not bad')."],
    "differenceFromSimilar": "Hyperbole exaggerates. Litotes drastically understates using a negative.",
    "literaryExample": "\"I am not unaware how the productions of the Grub Street brotherhood have of late years fallen under many prejudices.\" (Jonathan Swift)",
    "everydayExample": "\"It's not rocket science.\" or \"You won't be sorry.\"",
    "realExamples": [{"quote": "He's no fool.", "source": "Common phrase", "difficulty": "Beginner"}],
    "interactiveExercise": {
      "question": "What tone does litotes create when a survivor of a horrific accident says, 'It wasn't my best day'?",
      "options": ["A joyful tone.", "A darkly comedic, stoic tone that emphasizes the trauma by drastically understating it.", "A confusing tone."],
      "correctIndex": 1,
      "explanation": "Litotes often highlights extreme situations by casually refusing to acknowledge their extremity."
    },
    "practiceSentence": "The author uses litotes to deliberately understate...",
    "ibLevel7Analysis": "The narrator's reliance on litotes—describing the devastating loss as 'not a minor inconvenience'—creates a powerful sense of emotional suppression. This rhetorical understatement highlights his inability to directly confront his grief, using dry linguistic structures to construct a wall of stoic detachment.",
    "memoryTrick": "LITOTES sounds like 'Little'—making something seem little (understatement).",
    "difficultyLevel": "Advanced",
    "frequencyInExams": "Low",
    "relatedDevices": ["Understatement", "Euphemism"],
    "tags": ["Rhetoric", "Tone", "Irony"]
  },
  {
    "id": "chiasmus",
    "name": "Chiasmus",
    "definition": "A rhetorical or literary figure in which words, grammatical constructions, or concepts are repeated in reverse order.",
    "simpleExplanation": "Saying a phrase and then repeating it backwards (A-B-B-A structure).",
    "advancedExplanation": "A highly structured rhetorical device that creates a sense of closed logic, inevitability, or paradox. By crossing the syntax over itself, the author traps the reader within a perfect, inescapable cycle.",
    "purpose": "To create a memorable, philosophically profound statement that feels completely 'solved' or absolute.",
    "whyAuthorsUseIt": "To suggest that two concepts are inextricably linked or mirror images of each other.",
    "psychologicalEffect": "The mirrored structure feels incredibly satisfying and logically sound to the human brain, even if the premise is paradoxical.",
    "readerEffect": "The reader accepts the statement as a profound, undeniable truth.",
    "emotionalEffect": "Awe, finality, or intellectual satisfaction.",
    "commonExamUses": ["Shakespearean dialogue", "Political speeches (JFK)", "Poetry about balance"],
    "commonMistakes": ["Confusing it with standard repetition. Chiasmus MUST cross over (A is to B, as B is to A)."],
    "differenceFromSimilar": "Anaphora repeats at the start. Chiasmus repeats the entire structure in reverse.",
    "literaryExample": "\"Fair is foul, and foul is fair.\" (Shakespeare, Macbeth)",
    "everydayExample": "\"Ask not what your country can do for you; ask what you can do for your country.\" (JFK)",
    "realExamples": [{"quote": "Never let a Fool Kiss You or a Kiss Fool You.", "source": "Mardy Grothe", "difficulty": "Beginner"}],
    "interactiveExercise": {
      "question": "Why do the witches in Macbeth speak in chiasmus ('Fair is foul, and foul is fair')?",
      "options": ["To show they have bad grammar.", "To structurally establish the complete inversion of morality in the play, showing that good and evil have been flipped.", "Because it rhymes."],
      "correctIndex": 1,
      "explanation": "The mirrored, crossing structure perfectly represents the twisting and inversion of the natural order."
    },
    "practiceSentence": "The chiasmus of [phrase] creates a sense of...",
    "ibLevel7Analysis": "The witches' chant, 'Fair is foul, and foul is fair,' utilizes chiasmus to structurally embody the play's central theme of moral inversion. By crossing the syntax over itself, Shakespeare creates a claustrophobic, paradoxical linguistic loop, warning the reader that in Macbeth's Scotland, the boundaries between good and evil have been irreparably twisted.",
    "memoryTrick": "Chiasmus comes from the Greek letter 'Chi' (X). The words cross over each other like an X.",
    "difficultyLevel": "Advanced",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Paradox", "Parallelism"],
    "tags": ["Structure", "Rhetoric"]
  },
  {
    "id": "asyndeton",
    "name": "Asyndeton",
    "definition": "The omission or absence of a conjunction between parts of a sentence.",
    "simpleExplanation": "Listing things with commas and completely leaving out 'and' or 'or'.",
    "advancedExplanation": "A syntactic device that strips sentences of their connective tissue, drastically accelerating the pacing. It can simulate panic, the chaotic sensory overload of a scene, or a rapid, fragmented thought process.",
    "purpose": "To speed up the rhythm, create a sense of overwhelming multiplicity, or make a statement feel blunt and final.",
    "whyAuthorsUseIt": "To make a list feel endless (because there is no 'and' to signal the end), or to mimic the frantic speed of a battle or panic attack.",
    "psychologicalEffect": "Creates a breathless, hurried feeling in the reader's mind, denying them the natural pause that conjunctions provide.",
    "readerEffect": "The reader reads faster and feels the chaos or urgency of the moment.",
    "emotionalEffect": "Panic, speed, chaos, or blunt aggression.",
    "commonExamUses": ["War scenes", "Stream of consciousness", "Action sequences"],
    "commonMistakes": ["Confusing it with polysyndeton (the overuse of conjunctions, which slows things down)."],
    "differenceFromSimilar": "Polysyndeton = many conjunctions (slows down). Asyndeton = no conjunctions (speeds up).",
    "literaryExample": "\"I came, I saw, I conquered.\" (Julius Caesar)",
    "everydayExample": "Reduce, reuse, recycle.",
    "realExamples": [{"quote": "He was a bag of bones, a floppy doll, a broken stick, a maniac.", "source": "Jack Kerouac, On the Road", "difficulty": "Intermediate"}],
    "interactiveExercise": {
      "question": "What is the effect of leaving out the 'and' in Caesar's 'I came, I saw, I conquered'?",
      "options": ["It shows he doesn't know grammar.", "It makes the victories seem rapid, effortless, and inevitably linked, like a single swift motion.", "It makes the speech longer."],
      "correctIndex": 1,
      "explanation": "The lack of conjunctions speeds up the pacing, reflecting the speed and ruthlessness of his conquest."
    },
    "practiceSentence": "By employing asyndeton, the author accelerates the pacing to mirror...",
    "ibLevel7Analysis": "The author's use of asyndeton during the battle sequence—stripping the syntax of any stabilizing conjunctions—forces a frantic, breathless reading pace. This structural acceleration denies the reader any linguistic rest, perfectly mimicking the sensory overload and chaotic panic experienced by the protagonist.",
    "memoryTrick": "Asyndeton = A (without) Syndeton (conjunctions). Without 'and'.",
    "difficultyLevel": "Advanced",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Polysyndeton", "Parataxis"],
    "tags": ["Structure", "Syntax", "Pacing"]
  },
  {
    "id": "zeugma",
    "name": "Zeugma",
    "definition": "A figure of speech in which a word applies to two others in different senses or to two others of which it semantically suits only one.",
    "simpleExplanation": "Using one verb to control two very different things (one literal, one metaphorical).",
    "advancedExplanation": "A sophisticated linguistic trick that forces the reader to rapidly shift between literal and abstract thought within a single sentence. It often highlights the tragic or absurd consequences of an action.",
    "purpose": "To surprise the reader, create dark humor, or simultaneously show the physical and emotional toll of an event.",
    "whyAuthorsUseIt": "To violently crash the physical world into the emotional world, showing how a single action damages both.",
    "psychologicalEffect": "Creates a jarring 'double take' as the brain realizes the verb has shifted its meaning halfway through the sentence.",
    "readerEffect": "The reader appreciates the wit or feels the sudden weight of the emotional consequence.",
    "emotionalEffect": "Dark humor, tragedy, or profound realization.",
    "commonExamUses": ["Satire", "Descriptions of grief", "Complex character introspection"],
    "commonMistakes": ["Failing to recognize the shift between the literal and the figurative meaning."],
    "differenceFromSimilar": "It is related to punning or double entendres, but zeugma strictly involves syntax (one verb controlling two nouns).",
    "literaryExample": "\"He lost his coat and his temper.\"",
    "everydayExample": "She broke his car and his heart.",
    "realExamples": [{"quote": "Or stain her honour, or her new brocade.", "source": "Alexander Pope, The Rape of the Lock", "difficulty": "Advanced"}],
    "interactiveExercise": {
      "question": "What is Pope satirizing when he worries a woman might stain her 'honour' or her 'new brocade' (dress)?",
      "options": ["He is worried about laundry.", "He is mocking high society's warped priorities by equating the loss of moral virtue with getting a stain on an expensive dress.", "He thinks dresses are more important than honor."],
      "correctIndex": 1,
      "explanation": "Zeugma is often used in satire to show how ridiculous a character's priorities are by putting something trivial next to something serious."
    },
    "practiceSentence": "The zeugma highlights the discrepancy between...",
    "ibLevel7Analysis": "Pope’s masterful use of zeugma—where 'stain' applies simultaneously to the abstract concept of 'honour' and the literal 'brocade'—serves as a biting satirical critique of aristocracy. By structurally equating a moral failure with a fashion faux pas, he exposes the superficiality of a society that values appearances as highly as virtue.",
    "memoryTrick": "Zeugma sounds like ZIG-ZAG. The meaning zig-zags from literal to metaphorical.",
    "difficultyLevel": "Advanced",
    "frequencyInExams": "Low",
    "relatedDevices": ["Pun", "Satire"],
    "tags": ["Syntax", "Satire", "Humor"]
  }
];

try {
  const devicesPath = path.join(__dirname, 'src', 'data', 'devices.json');
  const existingDevices = JSON.parse(fs.readFileSync(devicesPath, 'utf8'));
  
  const existingDeviceIds = new Set(existingDevices.map(d => d.id));
  const filteredDevices = newDevices.filter(d => !existingDeviceIds.has(d.id));

  fs.writeFileSync(devicesPath, JSON.stringify([...existingDevices, ...filteredDevices], null, 2));

  console.log('Successfully added', filteredDevices.length, 'MORE devices.');
} catch (e) {
  console.error('Failed:', e);
}
