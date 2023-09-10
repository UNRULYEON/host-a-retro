import { ReactNode } from "react";

export type RetroTheme = {
  title: string;
  description?: string;
  instructions: ReactNode[];
  source: string;
};

const retroThemes: RetroTheme[] = [
  {
    title: "Well, Not so well, New ideas",
    description:
      "Well, Not So Well, New Ideas is commonly used to bring conversations about the positive notes, the improvements and suggestions that the team has in mind.",
    instructions: [
      <>
        Split the canvas into three areas:
        <ul className="ml-4 list-disc">
          <li>
            <strong>Well</strong> - things that went well, that moves us
            forward, helps us get better. We want to repeat these!
          </li>
          <li>
            <strong>Not so well</strong> - things that went wrong, that need
            improvement, that hold us back. We want to eliminate or avoid these!
          </li>
          <li>
            <strong>New ideas</strong> - things that we should consider trying,
            suggestions, new ideas.
          </li>
        </ul>
      </>,
      "Ask participants to add notes to each of the three areas.",
      "Conversations and action items.",
    ],
    source: "https://www.funretrospectives.com/well-not-so-well-and-new-ideas/",
  },
  {
    title: "Easy As Pie",
    description:
      "Easy As Pie is a good retrospective activity to look for improvements, to apologize for personal mistakes, to present new ideas and to recognise the good things.",
    instructions: [
      "Draw a large pie on a whiteboard with five slices.",
      <>
        Label the five pie slices and describe them as follows:
        <ul className="ml-4 list-disc">
          <li>
            <strong>Humble Pie</strong> - Admit a wrong that occurred and
            apologize for the mistake.
          </li>
          <li>
            <strong>Shoo Fly Pie</strong> - Identify something negative that is
            hampering the team and you want to remove.
          </li>
          <li>
            <strong>Cutie Pie</strong> - Submit an appreciation for someone or
            something.
          </li>
          <li>
            <strong>Pie in the Sky</strong> - Present an idea that may be
            'impossible' - a stretch goal, fanciful idea, or plan.
          </li>
          <li>
            <strong>Easy As Pie</strong> - Recognize something that was simple
            and pleasurable that you believe the team should continue doing.
          </li>
        </ul>
      </>,
      "Ask the participants think about each slice of the pie, take notes on sticky notes(one idea or thought per sticky note) and then place on the pie slice accordingly.",
      "Group conversation about the notes.",
    ],
    source: "https://www.funretrospectives.com/easy-as-pie/",
  },
  {
    title: "The Good, the Bad and the Ugly",
    description:
      "The Good, the Bad and the Ugly is a retrospective activity commonly used to boost conversations about improvements.",
    instructions: [
      <>
        Split the canvas into three areas:
        <ul className="ml-4 list-disc">
          <li>
            <strong>The Good</strong> - things that went well, and we should
            repeat, do more of it
          </li>
          <li>
            <strong>The Bad</strong> - things that should have never happened,
            and we must get rid of it
          </li>
          <li>
            <strong>The Ugly</strong> - things that did not go so well, and we
            should look for improvements, turning it into it beautiful
          </li>
        </ul>
      </>,
      "Ask the participants to add notes to each of the three areas",
      "Conversations and action items",
    ],
    source: "https://www.funretrospectives.com/the-good-the-bad-and-the-ugly/",
  },
  {
    title: "The 3 Ls: Liked, Learned, Lacked",
    description:
      "The 3Ls is a great data gathering activity, especially for retrospectives for a longer period of time.",
    instructions: [
      <>
        Split the canvas in three areas:
        <ul className="ml-4 list-disc">
          <li>
            <strong>Liked</strong> - things you really liked.
          </li>
          <li>
            <strong>Learned</strong> - things you have learned.
          </li>
          <li>
            <strong>Lacked</strong> - things you wish had happened.
          </li>
        </ul>
      </>,
      "Ask participants to individually write notes on sticky notes for each of the areas.",
      "Discuss with the group about the notes.",
    ],
    source: "https://www.funretrospectives.com/the-3-ls-liked-learned-lacked/",
  },
];

export default retroThemes;
