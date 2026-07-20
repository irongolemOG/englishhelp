const fs = require('fs');
const path = require('path');

const newVocab = [
  {
    "id": "ineffable",
    "word": "Ineffable",
    "category": "Evaluation verbs",
    "meaning": "Too great or extreme to be expressed or described in words.",
    "whenToUse": "When an experience (like profound grief or divine awe) transcends the limits of language.",
    "whenNotToUse": "When a character just can't think of the right word.",
    "examples": ["The sublime beauty of the landscape evoked an ineffable sense of peace."],
    "synonyms": ["Indescribable", "Beyond words", "Inexpressible"],
    "commonMistakes": "Using it for everyday things.",
    "replaces": ["unexplainable", "hard to describe"]
  },
  {
    "id": "sublime",
    "word": "Sublime",
    "category": "Evaluation verbs",
    "meaning": "Of such excellence, grandeur, or beauty as to inspire great admiration or awe, often mixed with terror.",
    "whenToUse": "When analyzing Romantic poetry describing vast, overwhelming nature (like mountains or oceans).",
    "whenNotToUse": "When something is just 'very nice'.",
    "examples": ["The poet's encounter with the sublime on the mountain peak shrinks human ego to insignificance."],
    "synonyms": ["Awe-inspiring", "Majestic", "Transcendent"],
    "commonMistakes": "Forgetting that 'the sublime' historically includes an element of terror or overwhelming power, not just beauty.",
    "replaces": ["beautiful", "amazing", "great"]
  },
  {
    "id": "ethereal",
    "word": "Ethereal",
    "category": "Tone words",
    "meaning": "Extremely delicate and light in a way that seems too perfect for this world.",
    "whenToUse": "When describing ghosts, spirits, or fragile, heavenly beauty.",
    "whenNotToUse": "When describing something strong, earthly, or grounded.",
    "examples": ["The ethereal lighting of the scene gives the heroine an almost angelic innocence."],
    "synonyms": ["Otherworldly", "Delicate", "Ghostly"],
    "commonMistakes": "Using it to describe solid, heavy objects.",
    "replaces": ["pretty", "light", "ghost-like"]
  },
  {
    "id": "inscrutable",
    "word": "Inscrutable",
    "category": "Evaluation verbs",
    "meaning": "Impossible to understand or interpret.",
    "whenToUse": "When a character's face, motives, or the universe itself offers absolutely no clues to its meaning.",
    "whenNotToUse": "When something is just slightly confusing.",
    "examples": ["The antagonist remains a terrifying force because his motives are entirely inscrutable."],
    "synonyms": ["Enigmatic", "Unreadable", "Mysterious"],
    "commonMistakes": "Using it for texts that are just poorly written.",
    "replaces": ["confusing", "hard to read"]
  },
  {
    "id": "resonant",
    "word": "Resonant",
    "category": "Evaluation verbs",
    "meaning": "Evoking or suggesting enduring images, memories, or emotions.",
    "whenToUse": "When a symbol, line, or theme echoes deeply throughout the rest of the text or into the reader's life.",
    "whenNotToUse": "When an event is quickly forgotten.",
    "examples": ["The final image of the green light is highly resonant, echoing Gatsby's unfulfilled desires."],
    "synonyms": ["Evocative", "Profound", "Echoing"],
    "commonMistakes": "Using it to describe actual loud sounds instead of emotional echoes.",
    "replaces": ["meaningful", "sticks with you"]
  },
  {
    "id": "insidious",
    "word": "Insidious",
    "category": "Evaluation verbs",
    "meaning": "Proceeding in a gradual, subtle way, but with harmful effects.",
    "whenToUse": "When corruption, disease, or evil spreads slowly without being noticed until it is too late.",
    "whenNotToUse": "When a villain attacks someone openly and violently.",
    "examples": ["The insidious nature of the propaganda slowly eroded the citizens' capacity for critical thought."],
    "synonyms": ["Stealthy", "Treacherous", "Subtle (but evil)"],
    "commonMistakes": "Confusing it with 'hideous' (ugly).",
    "replaces": ["sneaky", "secretly bad"]
  },
  {
    "id": "overt",
    "word": "Overt",
    "category": "Evaluation verbs",
    "meaning": "Done or shown openly; plainly or readily apparent, not secret or hidden.",
    "whenToUse": "When an author or character makes their intentions blatantly obvious.",
    "whenNotToUse": "When discussing subtle symbolism or subtext.",
    "examples": ["The overt racism of the townspeople creates an immediate atmosphere of hostility."],
    "synonyms": ["Explicit", "Blatant", "Conspicuous"],
    "commonMistakes": "Confusing it with covert (its exact opposite).",
    "replaces": ["obvious", "in your face"]
  },
  {
    "id": "covert",
    "word": "Covert",
    "category": "Evaluation verbs",
    "meaning": "Not openly acknowledged or displayed.",
    "whenToUse": "When analyzing subtext, hidden agendas, or subtle manipulation between characters.",
    "whenNotToUse": "When someone is shouting their feelings.",
    "examples": ["The covert hostility in their polite dinner conversation generates immense dramatic tension."],
    "synonyms": ["Secret", "Subtle", "Clandestine"],
    "commonMistakes": "Confusing it with overt.",
    "replaces": ["hidden", "secret", "subtle"]
  },
  {
    "id": "idiosyncratic",
    "word": "Idiosyncratic",
    "category": "Evaluation verbs",
    "meaning": "A mode of behavior or way of thought peculiar to an individual.",
    "whenToUse": "When a character has a very specific, quirky, or unique way of speaking or acting.",
    "whenNotToUse": "When a character is a generic stereotype.",
    "examples": ["The narrator's idiosyncratic syntax reflects her fragmented grip on reality."],
    "synonyms": ["Peculiar", "Quirky", "Distinctive"],
    "commonMistakes": "Using it to mean 'idiotic'.",
    "replaces": ["unique", "weird", "specific"]
  },
  {
    "id": "ubiquitous",
    "word": "Ubiquitous",
    "category": "Evaluation verbs",
    "meaning": "Present, appearing, or found everywhere.",
    "whenToUse": "When a theme, symbol, or oppressive force is inescapable within the world of the text.",
    "whenNotToUse": "When something is rare or hidden.",
    "examples": ["The ubiquitous posters of Big Brother serve as a constant reminder of the regime's omniscience."],
    "synonyms": ["Omnipresent", "Pervasive", "Universal"],
    "commonMistakes": "Using it for physical people (a person can't literally be ubiquitous).",
    "replaces": ["everywhere", "all around"]
  }
];

const newDevices = [
  {
    "id": "allegory",
    "name": "Allegory",
    "definition": "A story, poem, or picture that can be interpreted to reveal a hidden meaning, typically a moral or political one.",
    "simpleExplanation": "A story where everything (characters, events) stands for a bigger real-world issue.",
    "advancedExplanation": "An extended narrative metaphor where the surface story operates parallel to a deeper, often didactic, sociopolitical or moral framework.",
    "purpose": "To critique real-world institutions or human nature safely through fiction.",
    "whyAuthorsUseIt": "To bypass the reader's defensive biases, allowing them to judge a real-world issue objectively by disguising it as a fable.",
    "psychologicalEffect": "Creates a dual-layered reading experience, forcing the brain to constantly translate the fiction back to reality.",
    "readerEffect": "The reader grasps complex political or moral truths through a simplified narrative.",
    "emotionalEffect": "Realization, outrage, or moral clarity.",
    "commonExamUses": ["Animal Farm (Russian Revolution)", "The Crucible (McCarthyism)", "Fables"],
    "commonMistakes": ["Confusing allegory with symbol. A symbol is one object; an allegory is the ENTIRE story acting as a symbol."],
    "differenceFromSimilar": "Symbolism is localized. Allegory is structural and encompasses the entire plot.",
    "literaryExample": "Animal Farm by George Orwell.",
    "everydayExample": "The Boy Who Cried Wolf (an allegory for the consequences of lying).",
    "realExamples": [{"quote": "The entire plot of Animal Farm.", "source": "George Orwell", "difficulty": "Intermediate"}],
    "interactiveExercise": {
      "question": "What is the primary function of an allegory?",
      "options": ["To hide secrets from children.", "To provide a simplified narrative framework that critiques complex real-world political or moral systems.", "To make the story longer."],
      "correctIndex": 1,
      "explanation": "Allegories use fiction as a vehicle for real-world critique."
    },
    "practiceSentence": "Operating as a political allegory, the text critiques...",
    "ibLevel7Analysis": "By structuring the narrative as a pastoral allegory, Orwell bypasses the reader's immediate political prejudices. This allows him to dissect the insidious mechanics of totalitarian corruption with clinical precision, framing the failure of the Russian Revolution not as an isolated historical event, but as an inevitable consequence of human greed.",
    "memoryTrick": "Allegory = ALL a GORY story (the whole story means something else).",
    "difficultyLevel": "Advanced",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Symbolism", "Metaphor"],
    "tags": ["Form", "Theme", "Structure"]
  },
  {
    "id": "allusion",
    "name": "Allusion",
    "definition": "An expression designed to call something to mind without mentioning it explicitly; an indirect or passing reference.",
    "simpleExplanation": "A subtle reference to a famous person, place, book, or historical event.",
    "advancedExplanation": "An intertextual device that borrows the emotional resonance or cultural authority of a previous work, compressing vast amounts of meaning into a single passing reference.",
    "purpose": "To create a shared cultural connection, elevate the text, or draw a parallel between characters and historical figures.",
    "whyAuthorsUseIt": "To instantly establish a mood or trait by associating it with something the reader already knows (like calling a traitor 'Judas').",
    "psychologicalEffect": "Rewards the reader for their cultural knowledge, making them feel like an insider.",
    "readerEffect": "The reader instantly imports the context of the alluded work into the current text.",
    "emotionalEffect": "Awe, irony, or deep resonance.",
    "commonExamUses": ["Biblical allusions", "Mythological allusions", "Historical references"],
    "commonMistakes": ["Confusing it with 'illusion' (a magic trick or fake image).", "Not explaining WHAT the allusion imports into the text."],
    "differenceFromSimilar": "An allusion references outside literature/history. An illusion is a deceptive appearance.",
    "literaryExample": "\"He was a real Romeo with the ladies.\"",
    "everydayExample": "\"Don't act like a Scrooge!\"",
    "realExamples": [{"quote": "The title 'Of Mice and Men' alluding to Robert Burns' poem 'To a Mouse'.", "source": "John Steinbeck", "difficulty": "Intermediate"}],
    "interactiveExercise": {
      "question": "Why does an author use a Biblical allusion rather than just inventing a new metaphor?",
      "options": ["Because they are unoriginal.", "To instantly harness thousands of years of cultural and emotional weight, elevating the seriousness of their own text.", "Because they have to."],
      "correctIndex": 1,
      "explanation": "Allusions act as shortcuts to massive amounts of thematic weight."
    },
    "practiceSentence": "The allusion to [X] serves to parallel the protagonist's journey with...",
    "ibLevel7Analysis": "The poet's subtle allusion to the Garden of Eden does more than establish a natural setting; it inextricably links the lovers' relationship to the concept of original sin. This intertextual echo foreshadows their inevitable fall from grace, casting a shadow of fatalistic doom over their temporary paradise.",
    "memoryTrick": "Allusion = to ALLUDE (refer to) something.",
    "difficultyLevel": "Intermediate",
    "frequencyInExams": "High",
    "relatedDevices": ["Intertextuality", "Foreshadowing"],
    "tags": ["Context", "Theme"]
  },
  {
    "id": "euphemism",
    "name": "Euphemism",
    "definition": "A mild or indirect word or expression substituted for one considered to be too harsh or blunt when referring to something unpleasant or embarrassing.",
    "simpleExplanation": "A polite way of saying something uncomfortable, like 'passed away' instead of 'died'.",
    "advancedExplanation": "A linguistic evasion that reveals a society's or character's inability to confront painful truths, often used in literature to highlight repression, prudishness, or the sanitized language of war.",
    "purpose": "To soften a blow, hide a truth, or reveal a character's cowardice/politeness.",
    "whyAuthorsUseIt": "To show that a character or society is terrified of reality and prefers to live behind polite fictions.",
    "psychologicalEffect": "Creates a sterile distance between the speaker and the harsh reality.",
    "readerEffect": "The reader recognizes the truth being hidden and judges the speaker for hiding it.",
    "emotionalEffect": "Can be polite, cowardly, or darkly satirical.",
    "commonExamUses": ["War poetry (critiquing military jargon)", "Victorian literature (sexual repression)", "Political double-speak"],
    "commonMistakes": ["Just saying 'it makes it sound nicer'. You must ask WHY the character feels the need to make it sound nicer."],
    "differenceFromSimilar": "Hyperbole exaggerates. Euphemism downplays or covers up.",
    "literaryExample": "Calling civilian casualties 'collateral damage'.",
    "everydayExample": "Saying someone was 'let go' instead of 'fired'.",
    "realExamples": [{"quote": "He is at rest.", "source": "Common phrase for death", "difficulty": "Beginner"}],
    "interactiveExercise": {
      "question": "What does a government's heavy use of euphemisms in a dystopian novel reveal?",
      "options": ["That the government is very polite.", "That the government relies on linguistic manipulation to distance the populace from the violent reality of its actions.", "That they have a good vocabulary."],
      "correctIndex": 1,
      "explanation": "In literature, euphemisms are often weapons of control, sanitizing horrific acts."
    },
    "practiceSentence": "The character's reliance on euphemism reveals their inability to...",
    "ibLevel7Analysis": "The bureaucratic euphemism 'neutralized' strips the act of murder of its moral weight. By employing this sanitized, mechanical diction, the author exposes the chilling psychological detachment of the state, demonstrating how language is weaponized to obscure atrocities and suppress empathy.",
    "memoryTrick": "EU = Good (like Euphoria). Euphemism = making something sound Good.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Understatement", "Litotes"],
    "tags": ["Diction", "Tone"]
  },
  {
    "id": "onomatopoeia",
    "name": "Onomatopoeia",
    "definition": "The formation of a word from a sound associated with what is named.",
    "simpleExplanation": "Words that sound like the sound they describe (e.g. boom, crash, sizzle).",
    "advancedExplanation": "An auditory device that breaks the barrier between text and reality, forcing the reader to physically simulate the auditory environment of the narrative, thereby increasing visceral immersion.",
    "purpose": "To bring a scene to life auditorily, making the action feel immediate and tangible.",
    "whyAuthorsUseIt": "To bypass visual description and assault the reader's senses directly with sound.",
    "psychologicalEffect": "Triggers the auditory cortex in the brain, making the reading experience multi-sensory.",
    "readerEffect": "The reader 'hears' the text rather than just reading it.",
    "emotionalEffect": "Immersion, chaos, violence, or natural beauty.",
    "commonExamUses": ["War poetry", "Descriptions of nature", "Creating a chaotic atmosphere"],
    "commonMistakes": ["Pointing it out without analyzing the *atmosphere* it creates. Does the 'buzz' create a lazy summer feel, or an annoying, tense feel?"],
    "differenceFromSimilar": "Alliteration is repeated sounds. Onomatopoeia is a word that literally translates a real-world sound.",
    "literaryExample": "\"The moan of doves in immemorial elms, / And murmuring of innumerable bees.\" (Tennyson)",
    "everydayExample": "Bang, pop, hiss, sizzle.",
    "realExamples": [{"quote": "I heard a Fly buzz - when I died -", "source": "Emily Dickinson", "difficulty": "Intermediate"}],
    "interactiveExercise": {
      "question": "Why does Dickinson use the onomatopoeic 'buzz' in a poem about death?",
      "options": ["To show that flies are annoying.", "To intrude upon the solemn, silent moment of death with a mundane, physical, and irritating sound of the living world.", "To make the poem rhyme."],
      "correctIndex": 1,
      "explanation": "The 'buzz' grounds a highly spiritual moment in ugly, physical reality."
    },
    "practiceSentence": "The onomatopoeic word '[X]' heightens the sensory experience by...",
    "ibLevel7Analysis": "Dickinson's use of the onomatopoeic 'buzz' acts as a grotesque intrusion into the sacred moment of death. Rather than a grand spiritual transition, the auditory reality of a scavenging insect grounds the poem in mundane, physical mortality, subverting the reader's expectations of a peaceful afterlife.",
    "memoryTrick": "Onomatopoeia is a really loud, chaotic word for loud, chaotic sounds.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Alliteration", "Assonance"],
    "tags": ["Sound", "Imagery"]
  },
  {
    "id": "pathetic-fallacy",
    "name": "Pathetic Fallacy",
    "definition": "The attribution of human feelings and responses to inanimate things or animals, especially in art and literature.",
    "simpleExplanation": "When the weather or setting reflects the mood of the characters (e.g. raining at a funeral).",
    "advancedExplanation": "A specific subset of personification where the natural world acts as a macrocosmic mirror for human psychological states, establishing an inescapable, encompassing atmosphere.",
    "purpose": "To amplify the emotional intensity of a scene by making the entire universe seem to participate in the character's feelings.",
    "whyAuthorsUseIt": "To externalize internal emotions, making abstract feelings visible and tangible through the setting.",
    "psychologicalEffect": "Creates a sense of claustrophobia or harmony, depending on the mood, as there is no escape from the emotion—even the sky feels it.",
    "readerEffect": "The reader subconsciously adopts the mood before the characters even speak.",
    "emotionalEffect": "Melancholy, terror, joy, or impending doom.",
    "commonExamUses": ["Gothic literature (storms = chaos)", "Romanticism (nature = harmony)", "Foreshadowing"],
    "commonMistakes": ["Using 'pathetic' in the modern sense (meaning 'sad or weak'). Here, pathetic comes from 'pathos' (emotion).", "Confusing it with general personification (a dancing teacup is personification, a weeping stormcloud is pathetic fallacy)."],
    "differenceFromSimilar": "Personification = giving any human trait to an object. Pathetic Fallacy = specifically giving HUMAN EMOTION to the WEATHER/NATURE.",
    "literaryExample": "The violent storm that breaks out when Frankenstein's monster comes to life.",
    "everydayExample": "The sun coming out right when a character falls in love.",
    "realExamples": [{"quote": "The night has been unruly: where we lay, / Our chimneys were blown down... / Some say, the earth / Was feverous and did shake.", "source": "Shakespeare, Macbeth", "difficulty": "Intermediate"}],
    "interactiveExercise": {
      "question": "What is the function of the pathetic fallacy on the night of Duncan's murder?",
      "options": ["To show that Scotland has bad weather.", "To demonstrate that the murder of a King is such a crime against nature that the earth itself is physically reacting in horror.", "To make Macbeth cold."],
      "correctIndex": 1,
      "explanation": "In Shakespeare, the natural world mirrors the moral world. A murder of a king breaks the universe."
    },
    "practiceSentence": "The author utilizes pathetic fallacy to externalize...",
    "ibLevel7Analysis": "The relentless rain does not merely set a dreary scene; it operates as pathetic fallacy, serving as an objective correlative for the protagonist's inescapable grief. By externalizing her internal psychological state onto the landscape, the author creates a claustrophobic atmosphere where the sorrow is total and inescapable.",
    "memoryTrick": "Pathos = Emotion. Pathetic Fallacy = The weather has emotions.",
    "difficultyLevel": "Intermediate",
    "frequencyInExams": "High",
    "relatedDevices": ["Personification", "Imagery", "Foreshadowing"],
    "tags": ["Setting", "Mood", "Figurative Language"]
  },
  {
    "id": "sibilance",
    "name": "Sibilance",
    "definition": "A literary device where strongly stressed consonants are created deliberately by producing air from vocal tracts through the use of lips and tongue (hissing sounds).",
    "simpleExplanation": "The repetition of 's', 'sh', or soft 'c' sounds to create a hissing effect.",
    "advancedExplanation": "A specific form of consonance that exploits the acoustic properties of fricatives to evoke the auditory presence of snakes, wind, secrets, or sinister whispering.",
    "purpose": "To create a sinister, secretive, or alternatively, a soothing, aquatic atmosphere.",
    "whyAuthorsUseIt": "To phonetically mimic the action being described (like whispering or wind) and to manipulate the reader's breath.",
    "psychologicalEffect": "The hissing sound can trigger primal associations with danger (snakes) or secrecy (whispers).",
    "readerEffect": "The reader is forced to 'hiss' the words, bringing them physically into the sinister or soothing mood.",
    "emotionalEffect": "Sinister dread, secrecy, or the soft lull of water/sleep.",
    "commonExamUses": ["Descriptions of villains", "Poetry about water or sleep", "Creating a creepy tone"],
    "commonMistakes": ["Assuming sibilance is ALWAYS evil. It can also mimic the soothing sound of the ocean ('the soft sighing of the sea')."],
    "differenceFromSimilar": "Alliteration is the start of words. Sibilance is the repetition of the 'S' sound specifically, anywhere in the words.",
    "literaryExample": "\"And the silken sad uncertain rustling of each purple curtain...\" (Edgar Allan Poe)",
    "everydayExample": "She sells seashells by the seashore.",
    "realExamples": [{"quote": "Season of mists and mellow fruitfulness, / Close bosom-friend of the maturing sun...", "source": "John Keats, To Autumn", "difficulty": "Intermediate"}],
    "interactiveExercise": {
      "question": "In Keats' poem, does the sibilance ('Season', 'mists', 'fruitfulness', 'sun') sound evil?",
      "options": ["Yes, autumn is evil.", "No, here the soft 's' sounds create a slow, soothing, sleepy rhythm reflecting the lethargy of late autumn.", "It has no effect."],
      "correctIndex": 1,
      "explanation": "Sibilance can be harsh (hissing) OR soft (sighing/soothing). Always look at the context."
    },
    "practiceSentence": "The sibilance of the 's' sound mimics the...",
    "ibLevel7Analysis": "The heavy sibilance in 'sinister, silent shadows' forces the reader to physically hiss the line, phonetically mimicking the serpentine, treacherous nature of the antagonist. This auditory manipulation ensures the reader feels the creeping threat on a sensory level before the narrative explicitly reveals it.",
    "memoryTrick": "Sibilance = SSSSS sounds.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "High",
    "relatedDevices": ["Alliteration", "Consonance"],
    "tags": ["Sound", "Poetry", "Atmosphere"]
  }
];

try {
  const vocabPath = path.join(__dirname, 'src', 'data', 'vocabulary.json');
  const devicesPath = path.join(__dirname, 'src', 'data', 'devices.json');
  
  const existingVocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
  const existingDevices = JSON.parse(fs.readFileSync(devicesPath, 'utf8'));

  const existingVocabIds = new Set(existingVocab.map(v => v.id));
  const existingDeviceIds = new Set(existingDevices.map(d => d.id));

  const filteredVocab = newVocab.filter(v => !existingVocabIds.has(v.id));
  const filteredDevices = newDevices.filter(d => !existingDeviceIds.has(d.id));

  fs.writeFileSync(vocabPath, JSON.stringify([...existingVocab, ...filteredVocab], null, 2));
  fs.writeFileSync(devicesPath, JSON.stringify([...existingDevices, ...filteredDevices], null, 2));

  console.log('Successfully added', filteredVocab.length, 'vocab words and', filteredDevices.length, 'devices.');
} catch (e) {
  console.error('Failed:', e);
}
