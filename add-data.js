const fs = require('fs');
const path = require('path');

// VOCABULARY
const newVocab = [
  {
    "id": "pervasive",
    "word": "Pervasive",
    "category": "Evaluation verbs",
    "meaning": "Spreading widely throughout an area or a group of people.",
    "whenToUse": "When an idea, theme, or atmosphere is present everywhere in the text.",
    "whenNotToUse": "When something only happens once or in one scene.",
    "examples": ["The pervasive sense of dread in the opening chapters foreshadows the tragic climax."],
    "synonyms": ["Omnipresent", "Ubiquitous", "Widespread"],
    "commonMistakes": "Using it for physical objects rather than abstract concepts or atmospheres.",
    "replaces": ["everywhere", "all over the place"]
  },
  {
    "id": "inexorable",
    "word": "Inexorable",
    "category": "Tone words",
    "meaning": "Impossible to stop or prevent.",
    "whenToUse": "When discussing fate, time, or a tragic downfall that cannot be avoided.",
    "whenNotToUse": "When characters have free will and can easily change their situation.",
    "examples": ["The inexorable passage of time acts as the true antagonist of the novel."],
    "synonyms": ["Relentless", "Unstoppable", "Inevitable"],
    "commonMistakes": "Confusing it with 'stubborn' (which applies to people, not forces).",
    "replaces": ["unstoppable", "can't be stopped"]
  },
  {
    "id": "ephemeral",
    "word": "Ephemeral",
    "category": "Evaluation verbs",
    "meaning": "Lasting for a very short time.",
    "whenToUse": "When discussing the fleeting nature of youth, beauty, or happiness in poetry.",
    "whenNotToUse": "When referring to permanent or long-lasting structural issues.",
    "examples": ["The poet captures the ephemeral beauty of the cherry blossoms, symbolizing the fragility of life."],
    "synonyms": ["Fleeting", "Transient", "Momentary"],
    "commonMistakes": "Using it to describe something small rather than something short-lived.",
    "replaces": ["short", "temporary"]
  },
  {
    "id": "pragmatic",
    "word": "Pragmatic",
    "category": "Tone words",
    "meaning": "Dealing with things sensibly and realistically based on practical rather than theoretical considerations.",
    "whenToUse": "When a character or narrator makes choices based on survival or logic rather than emotion.",
    "whenNotToUse": "When describing romantic, idealistic, or emotional choices.",
    "examples": ["Her pragmatic approach to marriage contrasts sharply with the protagonist's romantic idealism."],
    "synonyms": ["Practical", "Realistic", "Sensible"],
    "commonMistakes": "Confusing it with 'cynical'—pragmatism isn't inherently negative, just practical.",
    "replaces": ["practical", "realistic", "logical"]
  },
  {
    "id": "ostentatious",
    "word": "Ostentatious",
    "category": "Evaluation verbs",
    "meaning": "Characterized by vulgar or pretentious display; designed to impress or attract notice.",
    "whenToUse": "When analyzing characters who show off their wealth or status, often to critique upper-class vanity.",
    "whenNotToUse": "When describing genuine elegance or understated beauty.",
    "examples": ["The ostentatious descriptions of Gatsby's parties serve to highlight the superficiality of the Jazz Age."],
    "synonyms": ["Showy", "Pretentious", "Flamboyant"],
    "commonMistakes": "Using it merely to mean 'expensive' rather than 'showy to the point of being tasteless'.",
    "replaces": ["showy", "fancy", "flashy"]
  },
  {
    "id": "melancholic",
    "word": "Melancholic",
    "category": "Tone words",
    "meaning": "Feeling or expressing pensive sadness.",
    "whenToUse": "When the tone is quietly sad, reflective, and sorrowful, rather than aggressively angry or tragic.",
    "whenNotToUse": "When describing sudden, violent grief.",
    "examples": ["The melancholic imagery of the setting sun perfectly mirrors the protagonist's fading hopes."],
    "synonyms": ["Sorrowful", "Despondent", "Mournful"],
    "commonMistakes": "Using it interchangeably with 'depressed'; melancholic often implies a poetic, lingering sadness.",
    "replaces": ["sad", "gloomy"]
  },
  {
    "id": "nostalgic",
    "word": "Nostalgic",
    "category": "Tone words",
    "meaning": "Characterized by or exhibiting feelings of sentimental longing for the past.",
    "whenToUse": "When a character or narrator romantically yearns for a previous era or childhood.",
    "whenNotToUse": "When the past is remembered with horror or trauma.",
    "examples": ["The speaker's nostalgic tone reveals a deep dissatisfaction with the modernized, industrial present."],
    "synonyms": ["Sentimental", "Wistful", "Reminiscent"],
    "commonMistakes": "Assuming nostalgia is always a happy feeling; it often contains a bittersweet ache for what is lost.",
    "replaces": ["missing the past", "looking back"]
  },
  {
    "id": "ambiguous",
    "word": "Ambiguous",
    "category": "Evaluation verbs",
    "meaning": "Open to more than one interpretation; having a double meaning.",
    "whenToUse": "When an author intentionally leaves an ending, motive, or symbol unclear to provoke thought.",
    "whenNotToUse": "When you just don't understand the text. Ambiguity is a deliberate authorial choice.",
    "examples": ["The ambiguous ending forces the reader to confront their own moral assumptions about justice."],
    "synonyms": ["Equivocal", "Cryptic", "Enigmatic"],
    "commonMistakes": "Writing 'The author is ambiguous' instead of 'The ending is ambiguous'. Authors aren't ambiguous, their texts are.",
    "replaces": ["confusing", "unclear", "hard to understand"]
  },
  {
    "id": "subdued",
    "word": "Subdued",
    "category": "Tone words",
    "meaning": "Quiet and rather reflective or depressed.",
    "whenToUse": "When a previously loud or energetic text/character becomes quiet, muted, or restrained.",
    "whenNotToUse": "When describing a vibrant, energetic climax.",
    "examples": ["Following the violent climax, the syntax becomes sparse and the tone heavily subdued, reflecting the aftermath of trauma."],
    "synonyms": ["Restrained", "Muted", "Somber"],
    "commonMistakes": "Confusing it with 'boring'. Subdued is a powerful, deliberate quietness.",
    "replaces": ["quiet", "calm", "toned down"]
  },
  {
    "id": "ominous",
    "word": "Ominous",
    "category": "Tone words",
    "meaning": "Giving the impression that something bad or unpleasant is going to happen.",
    "whenToUse": "When describing pathetic fallacy (e.g. dark clouds) or foreshadowing that hints at tragedy.",
    "whenNotToUse": "When the bad event has already happened.",
    "examples": ["The ominous silence of the village creates an atmosphere of mounting suspense."],
    "synonyms": ["Foreboding", "Sinister", "Menacing"],
    "commonMistakes": "Using it to describe something that is currently hurting the character, rather than the *threat* of hurt.",
    "replaces": ["scary", "creepy", "bad feeling"]
  },
  {
    "id": "poignant",
    "word": "Poignant",
    "category": "Evaluation verbs",
    "meaning": "Evoking a keen sense of sadness or regret.",
    "whenToUse": "When a moment in the text is deeply moving, often because it touches on universal human vulnerabilities.",
    "whenNotToUse": "When a scene is purely action-driven or comedic.",
    "examples": ["The final reunion is a poignant reminder of the time stolen from them by the war."],
    "synonyms": ["Moving", "Touching", "Heartrending"],
    "commonMistakes": "Mispronouncing it in your head (it's POYN-yant) or using it for mildly sad things.",
    "replaces": ["sad", "touching", "emotional"]
  },
  {
    "id": "meticulous",
    "word": "Meticulous",
    "category": "Evaluation verbs",
    "meaning": "Showing great attention to detail; very careful and precise.",
    "whenToUse": "When analyzing an author's highly detailed imagery or a character's obsessive behavior.",
    "whenNotToUse": "When a text is messy, fragmented, or stream-of-consciousness.",
    "examples": ["The author's meticulous description of the surgical tools emphasizes the clinical coldness of the institution."],
    "synonyms": ["Painstaking", "Careful", "Exact"],
    "commonMistakes": "Using it to mean 'good'. It specifically means detailed and precise.",
    "replaces": ["detailed", "careful"]
  },
  {
    "id": "cynical",
    "word": "Cynical",
    "category": "Tone words",
    "meaning": "Believing that people are motivated by self-interest; distrustful of human sincerity or integrity.",
    "whenToUse": "When a narrator or character views society with bitter distrust and assumes the worst of others.",
    "whenNotToUse": "When a character is just temporarily angry or sad.",
    "examples": ["The narrator's cynical observations strip away the romantic illusion of the Victorian upper class."],
    "synonyms": ["Misanthropic", "Skeptical", "Pessimistic"],
    "commonMistakes": "Confusing cynicism with simple sadness. Cynicism is specifically about distrusting motives.",
    "replaces": ["negative", "distrustful", "pessimistic"]
  },
  {
    "id": "resolute",
    "word": "Resolute",
    "category": "Tone words",
    "meaning": "Admirably purposeful, determined, and unwavering.",
    "whenToUse": "When a character refuses to give up or change their mind in the face of adversity.",
    "whenNotToUse": "When a character is stubbornly making a bad decision (use 'obstinate' instead).",
    "examples": ["Despite the insurmountable odds, her resolute tone in the final chapter signifies her ultimate empowerment."],
    "synonyms": ["Determined", "Unwavering", "Steadfast"],
    "commonMistakes": "Using it for characters who are just being stubborn out of ignorance.",
    "replaces": ["determined", "strong-willed", "not giving up"]
  },
  {
    "id": "apathetic",
    "word": "Apathetic",
    "category": "Tone words",
    "meaning": "Showing or feeling no interest, enthusiasm, or concern.",
    "whenToUse": "When an author critiques society's indifference to suffering, or when a character gives up emotionally.",
    "whenNotToUse": "When someone is actively working against something.",
    "examples": ["The crowd's apathetic response to the violence highlights the moral decay of the dystopian society."],
    "synonyms": ["Indifferent", "Unresponsive", "Passive"],
    "commonMistakes": "Confusing it with 'pathetic' (which means pitiful). Apathetic means lacking emotion.",
    "replaces": ["doesn't care", "bored", "lazy"]
  },
  {
    "id": "frivolous",
    "word": "Frivolous",
    "category": "Evaluation verbs",
    "meaning": "Not having any serious purpose or value.",
    "whenToUse": "When critiquing upper-class excess, superficial characters, or meaningless distractions in a text.",
    "whenNotToUse": "When describing important, serious themes.",
    "examples": ["The frivolous conversations at the dinner party starkly contrast with the impending doom of the war outside."],
    "synonyms": ["Superficial", "Trivial", "Silly"],
    "commonMistakes": "Using it to describe something actively evil or malicious. Frivolous implies harmless but useless.",
    "replaces": ["silly", "useless", "pointless"]
  },
  {
    "id": "stoic",
    "word": "Stoic",
    "category": "Tone words",
    "meaning": "Enduring pain or hardship without showing feelings or complaining.",
    "whenToUse": "When a character suffers in silence, often masking deep emotional trauma under a calm exterior.",
    "whenNotToUse": "When a character is openly crying or complaining.",
    "examples": ["His stoic demeanor cracks only in the final stanza, revealing the profound depth of his grief."],
    "synonyms": ["Enduring", "Forbearing", "Impassive"],
    "commonMistakes": "Confusing stoicism with actually not caring (apathy). Stoic implies you feel the pain but hide it.",
    "replaces": ["not showing emotion", "brave", "quiet"]
  },
  {
    "id": "capricious",
    "word": "Capricious",
    "category": "Evaluation verbs",
    "meaning": "Given to sudden and unaccountable changes of mood or behavior.",
    "whenToUse": "When describing unpredictable characters, volatile settings, or the arbitrary nature of fate/gods.",
    "whenNotToUse": "When something follows a logical, predictable pattern.",
    "examples": ["The capricious nature of the sea mirrors the unpredictable and dangerous relationship between the two lovers."],
    "synonyms": ["Fickle", "Volatile", "Unpredictable"],
    "commonMistakes": "Using it to describe someone who simply changed their mind once.",
    "replaces": ["unpredictable", "changeable", "moody"]
  },
  {
    "id": "nuanced",
    "word": "Nuanced",
    "category": "Evaluation verbs",
    "meaning": "Characterized by subtle shades of meaning or expression.",
    "whenToUse": "When an author doesn't just present 'good vs evil', but rather a complex, grey-area situation.",
    "whenNotToUse": "When a text is heavily allegorical or black-and-white in its morality.",
    "examples": ["Instead of condemning the antagonist, the author offers a nuanced portrayal of their traumatic childhood."],
    "synonyms": ["Subtle", "Complex", "Refined"],
    "commonMistakes": "Calling a text nuanced but failing to explain what the two opposing nuances actually are.",
    "replaces": ["detailed", "complex", "not simple"]
  },
  {
    "id": "paradigm",
    "word": "Paradigm",
    "category": "Evaluation verbs",
    "meaning": "A typical example or pattern of something; a model.",
    "whenToUse": "When discussing societal norms, frameworks of thinking, or shifts in power structures.",
    "whenNotToUse": "When talking about small, everyday habits.",
    "examples": ["The protagonist's rebellion represents a shift in the cultural paradigm, threatening the patriarchal order."],
    "synonyms": ["Model", "Standard", "Archetype"],
    "commonMistakes": "Overusing it to sound smart when 'example' or 'system' would suffice.",
    "replaces": ["example", "system", "pattern"]
  }
];

// DEVICES
const newDevices = [
  {
    "id": "metaphor",
    "name": "Metaphor",
    "definition": "A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable.",
    "simpleExplanation": "Saying one thing IS another thing to create a strong comparison.",
    "advancedExplanation": "A cognitive tool that maps the attributes of a 'vehicle' onto a 'tenor', forcing the reader to synthesize the two and view the subject through a completely new, often emotional, lens.",
    "purpose": "To create vivid imagery, convey abstract concepts through concrete terms, and evoke specific emotional responses.",
    "whyAuthorsUseIt": "To avoid explaining things literally, instead giving the reader an image that carries instant emotional weight and connotations.",
    "psychologicalEffect": "Forces the brain to find the connection between two dissimilar things, creating a powerful 'aha' moment of realization.",
    "readerEffect": "The reader visualizes the subject in a much more intense, visceral way.",
    "emotionalEffect": "Varies entirely based on the vehicle (e.g., comparing a man to a lion creates awe/fear; to a rat creates disgust).",
    "commonExamUses": ["Character descriptions", "Setting the atmosphere", "Expressing abstract emotions (like grief)"],
    "commonMistakes": ["Just identifying it without analyzing the connotations of the vehicle.", "Confusing it with a simile (which uses 'like' or 'as')."],
    "differenceFromSimilar": "Unlike a simile, a metaphor equates the two things directly, making the comparison stronger and more absolute.",
    "literaryExample": "\"All the world's a stage, and all the men and women merely players.\" (Shakespeare)",
    "everydayExample": "He is a shining star.",
    "realExamples": [
      {
        "quote": "The sun in the west was a drop of burning gold that slid nearer and nearer the sill of the world.",
        "source": "William Golding, Lord of the Flies",
        "difficulty": "Intermediate"
      }
    ],
    "interactiveExercise": {
      "question": "What is the primary effect of comparing the classroom to a 'zoo'?",
      "options": [
        "To suggest there are literal animals in the room.",
        "To map the connotations of chaos, wildness, and lack of civilization onto the students.",
        "To show that the teacher likes animals."
      ],
      "correctIndex": 1,
      "explanation": "The metaphor relies on the vehicle ('zoo') to impart its chaotic connotations onto the tenor ('classroom')."
    },
    "practiceSentence": "Through the metaphor of [X], the author implies...",
    "ibLevel7Analysis": "By employing the metaphor of a 'gilded cage', the author masterfully captures the protagonist's paradox of privilege and imprisonment. The 'gold' connotes wealth and societal envy, while 'cage' forcefully maps the reality of entrapment onto her domestic life, exposing the superficiality of her aristocratic existence.",
    "memoryTrick": "Metaphor = Meta (change) + Phor (carry) - carrying meaning from one thing to another.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "Very High",
    "relatedDevices": ["Simile", "Conceit", "Extended Metaphor"],
    "tags": ["Imagery", "Figurative Language", "Comparison"]
  },
  {
    "id": "simile",
    "name": "Simile",
    "definition": "A figure of speech involving the comparison of one thing with another thing of a different kind, using 'like' or 'as'.",
    "simpleExplanation": "Comparing two things using 'like' or 'as'.",
    "advancedExplanation": "A comparative device that explicitly acknowledges the artifice of the comparison, often allowing for more distance and conscious reflection than a metaphor.",
    "purpose": "To make a description more vivid and easily understandable by relating it to something familiar.",
    "whyAuthorsUseIt": "To clarify a complex emotion or visual by drawing a direct, easily digestible parallel for the reader.",
    "psychologicalEffect": "Provides a conceptual bridge for the reader, making the unfamiliar feel instantly familiar.",
    "readerEffect": "The reader gains immediate visual clarity regarding a character or setting.",
    "emotionalEffect": "Varies based on the comparison, but often creates a sudden flash of understanding.",
    "commonExamUses": ["Describing unfamiliar settings", "Character introductions", "Poetic imagery"],
    "commonMistakes": ["Listing the simile without explaining WHY that specific comparison was chosen."],
    "differenceFromSimilar": "A metaphor says X *is* Y. A simile says X is *like* Y. Similes are explicitly comparative.",
    "literaryExample": "\"I wandered lonely as a cloud...\" (William Wordsworth)",
    "everydayExample": "She is as brave as a lion.",
    "realExamples": [
      {
        "quote": "The very mystery of him excited her curiosity like a door that had neither lock nor key.",
        "source": "Oscar Wilde, The Picture of Dorian Gray",
        "difficulty": "Intermediate"
      }
    ],
    "interactiveExercise": {
      "question": "Why does the author use a simile instead of just describing the character's anger directly?",
      "options": [
        "Because similes are required in poetry.",
        "Because saying 'he was angry like a volcano' maps the destructive, uncontrollable connotations of a volcano onto his emotion.",
        "To make the sentence longer."
      ],
      "correctIndex": 1,
      "explanation": "Similes don't just state facts; they attach the emotional weight of the compared object to the subject."
    },
    "practiceSentence": "The simile 'like a [X]' serves to highlight...",
    "ibLevel7Analysis": "The simile comparing the old man's hands to 'twisted roots' does more than provide visual imagery; it organically connects him to the earth, connoting a lifetime of weathered endurance and anchoring him as a permanent, almost natural fixture of the rural landscape.",
    "memoryTrick": "Simile has an 'i' and an 'l' = 'like'.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "Very High",
    "relatedDevices": ["Metaphor", "Imagery", "Analogy"],
    "tags": ["Imagery", "Figurative Language", "Comparison"]
  },
  {
    "id": "personification",
    "name": "Personification",
    "definition": "The attribution of a personal nature or human characteristics to something nonhuman, or the representation of an abstract quality in human form.",
    "simpleExplanation": "Giving human qualities to things that aren't human (like animals, objects, or weather).",
    "advancedExplanation": "An anthropomorphic technique that projects human consciousness onto the inanimate world, often used to reflect a character's internal psychological state (pathetic fallacy) or to frame nature as an active, sometimes hostile, participant in the narrative.",
    "purpose": "To make abstract concepts relatable, to create atmosphere, or to show how a character's emotions color their perception of the world.",
    "whyAuthorsUseIt": "To breathe life into the setting, making it an active force rather than a passive backdrop.",
    "psychologicalEffect": "Creates a sense of animism, making the reader feel that the environment is watching or reacting.",
    "readerEffect": "The reader feels a deeper emotional connection (or threat) from the setting.",
    "emotionalEffect": "Can create comfort (a welcoming home) or terror (a hostile, creeping fog).",
    "commonExamUses": ["Setting descriptions (Pathetic Fallacy)", "Describing the power of nature", "Poetry about abstract concepts (Death, Time)"],
    "commonMistakes": ["Confusing it with zoomorphism (giving animal traits to humans).", "Failing to analyze *what kind* of human trait is given (is the wind angry? mournful? gentle?)."],
    "differenceFromSimilar": "Pathetic fallacy is a specific type of personification where the weather/nature reflects human emotions.",
    "literaryExample": "\"Because I could not stop for Death – He kindly stopped for me –\" (Emily Dickinson)",
    "everydayExample": "The wind howled through the night.",
    "realExamples": [
      {
        "quote": "The houses were blind, their windows shut tight against the storm.",
        "source": "Unknown",
        "difficulty": "Beginner"
      }
    ],
    "interactiveExercise": {
      "question": "What is the effect of personifying the houses as 'blind'?",
      "options": [
        "It implies the townspeople inside cannot physically see.",
        "It creates a sense of vulnerability, isolation, and deliberate ignorance toward the outside threat.",
        "It shows that the houses are old."
      ],
      "correctIndex": 1,
      "explanation": "Giving the houses human 'blindness' transfers the psychological state of willful ignorance to the setting itself."
    },
    "practiceSentence": "By personifying the [object] as [human trait], the author creates a sense of...",
    "ibLevel7Analysis": "Dickinson's personification of Death as a 'kindly' carriage driver subverts traditional gothic expectations. By attributing polite, gentlemanly qualities to humanity's greatest fear, she strips Death of its terror, framing mortality not as a violent end, but as a courteous, inevitable escort into eternity.",
    "memoryTrick": "PERSON-ification = turning things into a PERSON.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "High",
    "relatedDevices": ["Pathetic Fallacy", "Anthropomorphism", "Zoomorphism"],
    "tags": ["Imagery", "Figurative Language", "Setting"]
  },
  {
    "id": "hyperbole",
    "name": "Hyperbole",
    "definition": "Exaggerated statements or claims not meant to be taken literally.",
    "simpleExplanation": "Massive exaggeration for effect.",
    "advancedExplanation": "A rhetorical device of extreme exaggeration used to heighten emotional impact, create satirical distance, or demonstrate the unreliable, overwhelmed nature of a first-person narrator.",
    "purpose": "To emphasize the magnitude of a feeling, event, or trait, often to the point of absurdity.",
    "whyAuthorsUseIt": "To convey the subjective intensity of an experience rather than the objective reality.",
    "psychologicalEffect": "Stretches the reader's imagination to its limit, forcing them to feel the extremity of the emotion.",
    "readerEffect": "The reader recognizes the impossibility but absorbs the underlying emotional truth.",
    "emotionalEffect": "Humor, sheer terror, overwhelming love, or deep exhaustion.",
    "commonExamUses": ["Satire and caricature", "Romantic poetry", "Expressions of extreme grief or panic"],
    "commonMistakes": ["Taking it literally and assuming the author is just lying.", "Forgetting to explain what the exaggeration reveals about the character's mindset."],
    "differenceFromSimilar": "Understatement (litotes) is the exact opposite of hyperbole.",
    "literaryExample": "\"I loved Ophelia: forty thousand brothers could not, with all their quantity of love, make up my sum.\" (Shakespeare, Hamlet)",
    "everydayExample": "I have a million things to do today.",
    "realExamples": [
      {
        "quote": "A day was twenty-four hours long but seemed longer. There was no hurry, for there was nowhere to go, nothing to buy and no money to buy it with.",
        "source": "Harper Lee, To Kill a Mockingbird",
        "difficulty": "Intermediate"
      }
    ],
    "interactiveExercise": {
      "question": "What is the purpose of Hamlet claiming he has the love of 'forty thousand brothers'?",
      "options": [
        "He is mathematically calculating his love.",
        "The hyperbole emphasizes his desperate, unhinged grief and his desire to prove his superiority over Laertes.",
        "He literally believes he is forty thousand men."
      ],
      "correctIndex": 1,
      "explanation": "The extreme exaggeration highlights Hamlet's manic emotional state and his competitive grief."
    },
    "practiceSentence": "The hyperbolic statement '[quote]' emphasizes the sheer magnitude of...",
    "ibLevel7Analysis": "The narrator's hyperbolic assertion that she 'died a thousand times' does more than quantify her embarrassment; it reveals a fragile, highly dramatic adolescent psyche where social missteps are equated with literal, repeated mortality, capturing the intense subjectivity of youth.",
    "memoryTrick": "Hyper = excessive. Bole = throw. Throwing things out of proportion.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Understatement", "Satire", "Caricature"],
    "tags": ["Rhetoric", "Figurative Language", "Humor"]
  },
  {
    "id": "alliteration",
    "name": "Alliteration",
    "definition": "The occurrence of the same letter or sound at the beginning of adjacent or closely connected words.",
    "simpleExplanation": "Words starting with the same sound placed close together.",
    "advancedExplanation": "A phonetic structural device used to interlink words conceptually, dictate the tempo of a line, or mimic the auditory qualities of the subject being described (e.g., harsh 'k' sounds for violence).",
    "purpose": "To create rhythm, draw attention to a specific phrase, or mimic a sound related to the theme.",
    "whyAuthorsUseIt": "To make poetry musical, or to aggressively highlight a specific string of words so they stick in the reader's memory.",
    "psychologicalEffect": "Creates a subconscious phonetic link between the alliterated words, forcing the brain to associate their meanings.",
    "readerEffect": "The reader slows down or speeds up depending on the sound, and remembers the phrase more easily.",
    "emotionalEffect": "Varies by sound (sibilance/s = sinister or soothing; plosive/p/b = violent, aggressive).",
    "commonExamUses": ["Poetry analysis (sound and rhythm)", "Advertising/Persuasive speeches", "Descriptive prose"],
    "commonMistakes": ["Identifying it without explaining the EFFECT of the specific sound (e.g., 'The author uses alliteration to make it flow' = Level 4)."],
    "differenceFromSimilar": "Assonance is repeated vowel sounds inside words; consonance is repeated consonant sounds anywhere; alliteration is specifically the *start* of the word.",
    "literaryExample": "\"From forth the fatal loins of these two foes...\" (Shakespeare, Romeo and Juliet)",
    "everydayExample": "Peter Piper picked a peck of pickled peppers.",
    "realExamples": [
      {
        "quote": "The fair breeze blew, the white foam flew, / The furrow followed free...",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner",
        "difficulty": "Intermediate"
      }
    ],
    "interactiveExercise": {
      "question": "What is the effect of the 'f' sound alliteration in 'fatal loins of these two foes'?",
      "options": [
        "It makes the line sound pretty.",
        "The fricative 'f' sound creates a harsh, spitting rhythm that emphasizes the bitterness and venom of the family feud.",
        "It forces the actor to breathe heavily."
      ],
      "correctIndex": 1,
      "explanation": "You must analyze the *type* of sound. 'F' is a harsh, breathy fricative that can sound aggressive or frustrated."
    },
    "practiceSentence": "The alliteration of the harsh [letter] sound mimics the...",
    "ibLevel7Analysis": "The plosive alliteration in 'battered, bleeding, and broken' creates a percussive, violent auditory rhythm. By forcing the reader's lips to repeatedly pop on the harsh 'b' consonant, the author phonetically simulates the physical blows suffered by the protagonist, making the violence visceral rather than merely descriptive.",
    "memoryTrick": "All-iteration = All the same letters at the start.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "Very High",
    "relatedDevices": ["Assonance", "Consonance", "Sibilance"],
    "tags": ["Sound", "Poetry", "Rhythm"]
  },
  {
    "id": "assonance",
    "name": "Assonance",
    "definition": "The repetition of the sound of a vowel in non-rhyming stressed syllables near enough to each other for the echo to be discernible.",
    "simpleExplanation": "Repeating vowel sounds inside words to create an internal rhyme or mood.",
    "advancedExplanation": "A subtle phonetic device that creates internal harmony or dissonance. Elongated vowel sounds (like 'o' or 'oo') can create a melancholic, dragging pace, while short vowels (like 'i' or 'e') can create a sharp, frantic energy.",
    "purpose": "To control pacing, establish mood, and create musicality without the obviousness of end-rhyme.",
    "whyAuthorsUseIt": "To subconsciously influence the reader's emotional state by manipulating the physical shape of their mouth and breath as they read.",
    "psychologicalEffect": "Creates a haunting, echoing effect in the mind, often emphasizing themes of sorrow, distance, or unity.",
    "readerEffect": "The reader feels the mood (gloomy, energetic, tense) through the physical act of vocalizing the text.",
    "emotionalEffect": "Long vowels = sorrow, lethargy, distance. Short vowels = panic, speed, sharpness.",
    "commonExamUses": ["Poetry analysis", "Stream of consciousness prose", "Elevated, lyrical descriptions"],
    "commonMistakes": ["Saying it just 'sounds nice'. You must link the vowel sound to the mood."],
    "differenceFromSimilar": "Alliteration is the start of the word; Assonance is the vowels inside the word.",
    "literaryExample": "\"Hear the mellow wedding bells\" (Edgar Allan Poe)",
    "everydayExample": "The rain in Spain stays mainly in the plain.",
    "realExamples": [
      {
        "quote": "And so, all the night-tide, I lie down by the side / Of my darling—my darling—my life and my bride...",
        "source": "Edgar Allan Poe, Annabel Lee",
        "difficulty": "Advanced"
      }
    ],
    "interactiveExercise": {
      "question": "What is the effect of the repeating 'i' sound (night-tide, lie, side, life, bride) in Poe's poem?",
      "options": [
        "It speeds up the poem to show happiness.",
        "The long 'i' sound forces the mouth open into a wail, creating a drawn-out, mournful echo that mirrors his eternal grief.",
        "It makes the poem rhyme randomly."
      ],
      "correctIndex": 1,
      "explanation": "Long vowel sounds physically force a slower reading pace and often mimic sounds of moaning or sorrow."
    },
    "practiceSentence": "The assonance of the long [vowel] sound creates a lingering sense of...",
    "ibLevel7Analysis": "Poe relies heavily on the assonance of the elongated 'o' sound ('moaning', 'cold', 'old'). This phonetic choice forces a sluggish, dragging articulation from the reader, aurally mimicking the hollow, inescapable depression that has consumed the speaker's mind.",
    "memoryTrick": "AssOnAnce = focuses on VOWELS (A, O, E).",
    "difficultyLevel": "Intermediate",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Alliteration", "Consonance", "Internal Rhyme"],
    "tags": ["Sound", "Poetry", "Rhythm"]
  },
  {
    "id": "foreshadowing",
    "name": "Foreshadowing",
    "definition": "A warning or indication of a future event.",
    "simpleExplanation": "Giving hints about what is going to happen later in the story.",
    "advancedExplanation": "A structural narrative device used to build suspense, create fatalistic inevitability, or prepare the reader's subconscious for a thematic shift. It ensures that plot twists feel earned rather than arbitrary.",
    "purpose": "To build tension, create a sense of inevitable tragedy, and unify the narrative structure.",
    "whyAuthorsUseIt": "To keep the reader hooked and to make the climax feel thematically resonant and predetermined.",
    "psychologicalEffect": "Implants a seed of anxiety or anticipation in the reader's mind, making them hyper-aware of symbols and setting.",
    "readerEffect": "The reader feels a sense of dread or excitement, anticipating the payoff.",
    "emotionalEffect": "Suspense, anxiety, or a sense of inescapable doom.",
    "commonExamUses": ["Analyzing the opening paragraphs of a novel", "Pathetic fallacy used as a warning", "Symbolic omens"],
    "commonMistakes": ["Spotting foreshadowing on a first read (you usually only spot it in hindsight).", "Not explaining *how* it prepares the reader thematically."],
    "differenceFromSimilar": "Unlike a flashback (looking back), foreshadowing looks forward, planting seeds for the future.",
    "literaryExample": "In 'Of Mice and Men', the death of Candy's old dog heavily foreshadows the tragic fate of Lennie.",
    "everydayExample": "The sky turned dark and the wind picked up just as they walked into the abandoned house.",
    "realExamples": [
      {
        "quote": "A cold wind blew through the corridor, extinguishing the single candle just as she reached for the door handle.",
        "source": "Generic Gothic Prose",
        "difficulty": "Beginner"
      }
    ],
    "interactiveExercise": {
      "question": "Why would an author foreshadow a tragic ending rather than just surprising the reader?",
      "options": [
        "Because surprises are bad writing.",
        "To establish a fatalistic tone, making the tragedy feel inevitable and therefore more emotionally devastating.",
        "To make the book shorter."
      ],
      "correctIndex": 1,
      "explanation": "Tragedy is often more impactful when the reader knows it's coming but is powerless to stop it."
    },
    "practiceSentence": "The subtle imagery of [X] acts as foreshadowing, establishing a tone of...",
    "ibLevel7Analysis": "The early, seemingly innocuous description of the decaying oak tree operates as structural foreshadowing. By establishing imagery of internal rot masked by a strong exterior, the author prepares the reader for the patriarch's eventual psychological collapse, framing his downfall as an inevitable natural decay rather than a sudden accident.",
    "memoryTrick": "Fore (before) + Shadow = Seeing the shadow of something before it arrives.",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "High",
    "relatedDevices": ["Motif", "Symbolism", "Pathetic Fallacy"],
    "tags": ["Structure", "Plot", "Suspense"]
  },
  {
    "id": "oxymoron",
    "name": "Oxymoron",
    "definition": "A figure of speech in which apparently contradictory terms appear in conjunction.",
    "simpleExplanation": "Two opposite words put right next to each other.",
    "advancedExplanation": "A condensed paradox that creates immediate cognitive dissonance. It reflects complex, contradictory psychological states or highlights the absurdity of a situation where two opposing truths exist simultaneously.",
    "purpose": "To reveal a hidden truth, express conflicted emotions, or create dramatic tension within a single phrase.",
    "whyAuthorsUseIt": "To show that a character's feelings are divided, or that a situation is inherently illogical or paradoxical.",
    "psychologicalEffect": "Forces the reader to pause and reconcile two concepts that shouldn't exist together, creating a moment of intellectual friction.",
    "readerEffect": "Intrigue, confusion, or a deep understanding of emotional complexity.",
    "emotionalEffect": "Tension, inner conflict, or surrealism.",
    "commonExamUses": ["Shakespearean character monologues", "Descriptions of toxic relationships", "War poetry"],
    "commonMistakes": ["Confusing it with juxtaposition. Oxymoron is usually just two words (adjective + noun) right next to each other. Juxtaposition is broader."],
    "differenceFromSimilar": "Juxtaposition places scenes or ideas together. Oxymoron places two conflicting words in direct grammatical conjunction (e.g. 'deafening silence').",
    "literaryExample": "\"O brawling love! O loving hate!\" (Shakespeare, Romeo and Juliet)",
    "everydayExample": "Bittersweet, terribly good, acting naturally.",
    "realExamples": [
      {
        "quote": "Parting is such sweet sorrow...",
        "source": "Shakespeare, Romeo and Juliet",
        "difficulty": "Intermediate"
      }
    ],
    "interactiveExercise": {
      "question": "What does the oxymoron 'sweet sorrow' reveal about Juliet's state of mind?",
      "options": [
        "She is confused about what time it is.",
        "It captures the painful duality of love: the agony of saying goodbye mixed with the joy of knowing they love each other.",
        "She likes being sad."
      ],
      "correctIndex": 1,
      "explanation": "Oxymorons perfectly capture complex, mixed human emotions that a single word cannot."
    },
    "practiceSentence": "The oxymoron '[X]' highlights the inherent contradiction of...",
    "ibLevel7Analysis": "The oxymoronic phrase 'deafening silence' encapsulates the psychological weight of the protagonist's isolation. By pairing extreme volume with absolute absence, the author illustrates how the lack of communication has become an overwhelming, almost physically painful force, louder than any actual noise.",
    "memoryTrick": "Oxymoron = Oxy (sharp) + Moron (dull). The word itself is an oxymoron!",
    "difficultyLevel": "Beginner",
    "frequencyInExams": "Medium",
    "relatedDevices": ["Juxtaposition", "Paradox"],
    "tags": ["Figurative Language", "Contrast", "Diction"]
  }
];

const vocabPath = path.join(__dirname, 'src', 'data', 'vocabulary.json');
const devicesPath = path.join(__dirname, 'src', 'data', 'devices.json');

try {
  const existingVocab = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
  const existingDevices = JSON.parse(fs.readFileSync(devicesPath, 'utf8'));

  // filter out duplicates
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
