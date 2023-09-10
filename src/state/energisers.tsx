export type Energiser = {
  title: string;
  description?: string;
  instructions: string[];
  source: string;
};

const energisers: Energiser[] = [
  {
    title: "Increment by one",
    description:
      "Increment by one is a simple and fun energizer to get some good laughs. It has a subtle message on the need to align about basic rules.",
    instructions: [
      "Ask the group to form a circle (if you are remote, make sure everyone has their mics open)",
      "Explain the activity: “I will start by saying the number '1', someone else has to say '2', then someone else says '3' and so on. We cannot combine the order of the people talking. If two people say the same number, we go back to starting in the number '1'.",
      "Start by saying the number '1'",
    ],
    source: "https://www.funretrospectives.com/increment-by-one/",
  },
  {
    title: "I went to the beach and took…",
    description:
      "“I went to the beach and took…” is a simple energizer to verify everyone's attention. It is easy to explain, fast, simple and only requires verbal communication. There is no need to write or to read notes.",
    instructions: [
      "Start by saying “I went to the beach and took…”",
      "Then say one thing you would take to the beach (e.g., “a chair”)",
      "Call someone else to continue the story.",
      "The person has to repeat the whole sentence, add “and” and one more thing (e.g., “I went to the beach and took a chair, and my sunglasses”)",
      "Go back to step 3 until everyone has participated in the story.",
    ],
    source: "https://www.funretrospectives.com/went-to-the-beach-and/",
  },
  {
    title: "Isn't that crazy?",
    description:
      "The Isn't that crazy energizer is amazing for getting people talking and collaboratively creating a story (usually a funny one). It fosters engagement and everyone participation while being very easy to deliver as it is done verbally.",
    instructions: [
      "Instruct the participants to form a circle",
      "Identify the order in wich the communication will flow (e.g. clockwise).",
      "One person starts by saying “isn’t that crazy?”",
      "The next person has to continue the story by adding 3 words",
      "Then the next and so forth until the story ends.",
    ],
    source: "https://www.funretrospectives.com/isnt-that-crazy/",
  },
  {
    title: "Visual phone",
    description:
      "Visual Phone is a great energizer to get everyone engaged while fostering a conversation about communication and its interpretations.",
    instructions: [
      "Break the large group into sets of three people (one or two groups can have four people).",
      "Place three sticky notes and a pen in front of each person.",
      "Ask everyone to write a sentence (on the sticky note), then place a blank sticky note on top of it (at this time, only the author of the sentence knows it).",
      "Everyone passes the sticky note clockwise.",
      "Each person reads the sentence from the sticky note in front of them, and then creates a representative drawing for the sentence (on the blank sticky note).",
      "Everyone passes the sticky notes clockwise.",
      "On a new sticky note, each person writes a sentence for the drawing in front of them, and places it on top of the sticky note set (now the set has three sticky notes: the original sentence, the drawing, and the new sentence).",
      "Everyone passes the sticky note set clockwise (for the groups of three people, the set should end up in front of the original sentence writer).",
      "Open the sticky note set so everyone can see the sentences and their respective drawings.",
    ],
    source: "https://www.funretrospectives.com/visual-phone/",
  },
];

export default energisers;
