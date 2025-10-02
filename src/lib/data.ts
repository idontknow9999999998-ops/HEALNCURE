import type { Category, Quote } from './types';

export const categories: Category[] = [
  {
    id: 1,
    slug: 'depression',
    title: 'Depression',
    description: 'A mood disorder causing a persistent feeling of sadness and loss of interest.',
    details: {
      causes: ['Genetics', 'Brain chemistry', 'Life events', 'Medical conditions'],
      symptoms: ['Persistent sadness', 'Loss of interest in activities', 'Changes in sleep or appetite', 'Fatigue'],
      effects: ['Impaired social functioning', 'Work or school problems', 'Increased risk of suicide', 'Physical health problems'],
    },
  },
  {
    id: 2,
    slug: 'anxiety',
    title: 'Anxiety',
    description: 'Intense, excessive, and persistent worry and fear about everyday situations.',
    details: {
      causes: ['Genetics', 'Brain chemistry', 'Stressful life events', 'Personality factors'],
      symptoms: ['Feeling nervous, restless or tense', 'Increased heart rate', 'Rapid breathing', 'Sweating'],
      effects: ['Avoidance of situations', 'Impaired quality of life', 'Panic attacks', 'Increased risk of depression'],
    },
  },
  {
    id: 3,
    slug: 'stress',
    title: 'Stress',
    description: 'A feeling of emotional or physical tension from any event or thought that makes you feel frustrated, angry, or nervous.',
    details: {
      causes: ['Work or school pressure', 'Financial problems', 'Relationship issues', 'Major life changes'],
      symptoms: ['Headaches', 'Upset stomach', 'Muscle tension', 'Difficulty sleeping'],
      effects: ['High blood pressure', 'Heart disease', 'Weakened immune system', 'Mental health disorders'],
    },
  },
  {
    id: 4,
    slug: 'overthinking',
    title: 'Overthinking',
    description: 'The habit of repeatedly thinking about the same thoughts, which are often worrisome or negative.',
    details: {
      causes: ['Anxiety', 'Perfectionism', 'Past trauma', 'Uncertainty'],
      symptoms: ['Inability to stop worrying', 'Reliving past mistakes', 'Second-guessing decisions', 'Analysis paralysis'],
      effects: ['Mental exhaustion', 'Increased stress and anxiety', 'Difficulty making decisions', 'Sleep problems'],
    },
  },
  {
    id: 5,
    slug: 'insomnia',
    title: 'Insomnia',
    description: 'A common sleep disorder that can make it hard to fall asleep, hard to stay asleep, or cause you to wake up too early.',
    details: {
      causes: ['Stress', 'Poor sleep habits', 'Mental health disorders', 'Medical conditions'],
      symptoms: ['Difficulty falling asleep at night', 'Waking up during the night', 'Feeling tired upon waking', 'Daytime fatigue'],
      effects: ['Lower performance at work or school', 'Slowed reaction time', 'Increased risk of accidents', 'Health problems'],
    },
  },
  {
    id: 6,
    slug: 'grief',
    title: 'Grief',
    description: 'A natural response to loss. It’s the emotional suffering you feel when something or someone you love is taken away.',
    details: {
      causes: ['Death of a loved one', 'Loss of a job', 'End of a relationship', 'Serious illness'],
      symptoms: ['Sadness', 'Anger', 'Guilt', 'Shock and disbelief'],
      effects: ['Depression', 'Anxiety', 'Physical symptoms like fatigue', 'Difficulty concentrating'],
    },
  },
    {
    id: 7,
    slug: 'burnout',
    title: 'Burnout',
    description: 'A state of emotional, physical, and mental exhaustion caused by excessive and prolonged stress.',
    details: {
      causes: ['Excessive workload', 'Lack of control', 'Unclear job expectations', 'Lack of social support'],
      symptoms: ['Feeling tired and drained most of the time', 'Feeling cynical about your job', 'Sense of ineffectiveness', 'Detachment'],
      effects: ['Reduced productivity', 'Increased errors', 'Health problems', 'Negative impact on personal life'],
    },
  },
  {
    id: 8,
    slug: 'self-esteem',
    title: 'Self-Esteem',
    description: 'Your overall opinion of yourself — how you feel about your abilities and limitations.',
    details: {
      causes: ['Childhood experiences', 'Life events', 'Peer groups', 'Media influence'],
      symptoms: ['Negative self-talk', 'Comparing oneself to others', 'Fear of failure', 'Difficulty accepting compliments'],
      effects: ['Relationship problems', 'Anxiety and depression', 'Poor academic or work performance', 'Lack of resilience'],
    },
  },
  {
    id: 9,
    slug: 'loneliness',
    title: 'Loneliness',
    description: 'An unpleasant emotional response to perceived social isolation.',
    details: {
      causes: ['Social isolation', 'Life transitions', 'Mental health issues', 'Poor social skills'],
      symptoms: ['Feeling empty', 'Feeling left out', 'Craving social contact', 'Low self-worth'],
      effects: ['Increased risk of depression', 'Sleep problems', 'Weakened immune system', 'Poor cardiovascular health'],
    },
  },
  {
    id: 10,
    slug: 'anger-management',
    title: 'Anger Management',
    description: 'The process of learning to recognize signs that you\'re becoming angry, and taking action to calm down and deal with the situation in a positive way.',
    details: {
      causes: ['Stress', 'Frustration', 'Injustice', 'Personal problems'],
      symptoms: ['Increased heart rate', 'Tense muscles', 'Yelling or shouting', 'Irritability'],
      effects: ['Damaged relationships', 'Workplace issues', 'Health problems', 'Legal trouble'],
    },
  },
];

export const quotes: Quote[] = [
  { id: 1, text: "The sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.", author: "S. Ajna" },
  { id: 2, text: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi" },
  { id: 3, text: "The best way out is always through.", author: "Robert Frost" },
  { id: 4, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { id: 5, text: "Your present circumstances don't determine where you can go; they merely determine where you start.", author: "Nido Qubein" },
  { id: 6, text: "Just when the caterpillar thought the world was over, it became a butterfly.", author: "Proverb" },
  { id: 7, text: "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.", author: "Albus Dumbledore" },
  { id: 8, text: "You have to be at your strongest when you’re feeling at your weakest.", author: "Unknown" },
  { id: 9, text: "This is a wonderful day. I've never seen this one before.", author: "Maya Angelou" },
  { id: 10, text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { id: 11, text: "Breathe. You're going to be okay. You've gotten through all of your worst days.", author: "Unknown" },
  { id: 12, text: "The oak fought the wind and was broken, the willow bent when it must and survived.", author: "Robert Jordan" },
  { id: 13, text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { id: 14, text: "Sometimes the most important thing in a whole day is the rest we take between two deep breaths.", author: "Etty Hillesum" },
  { id: 15, text: "What you think, you become. What you feel, you attract. What you imagine, you create.", author: "Buddha" },
  { id: 16, text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { id: 17, text: "You are stronger than you know. More capable than you ever dreamed. And you are loved more than you could possibly imagine.", author: "Unknown" },
  { id: 18, text: "Feel the feeling but don't become the emotion. Witness it. Allow it. Release it.", author: "Crystal Andrus" },
  { id: 19, text: "The pain you feel today is the strength you feel tomorrow.", author: "Unknown" },
  { id: 20, text: "Every day may not be good, but there is something good in every day.", author: "Alice Morse Earle" },
];
