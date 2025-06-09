import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Quiz 1: Science - Easy - Multiple Choice
  await prisma.questionFact.createMany({
    data: [
      {
        quizId: "6844aa1db71429ee99d091f7", // Science
        question: "What is the largest organ in the human body?",
        answer: "Skin",
      },
      {
        quizId: "6844aa1db71429ee99d091f8", // History
        question: "In what year did World War II end?",
        answer: "1945",
      },
      {
        quizId: "6844aa1db71429ee99d091f9", // Pop Culture
        question: 'Who sang the hit song "Single Ladies (Put a Ring on It)"?',
        answer: "Beyoncé",
      },
      {
        quizId: "6844aa1db71429ee99d091f7", // Science
        question: "What is the chemical symbol for gold?",
        answer: "Au",
      },
      {
        quizId: "6844aa1db71429ee99d091f8", // History
        question: "Who was the first president of the United States?",
        answer: "George Washington",
      },
      {
        quizId: "6844aa1db71429ee99d091f9", // Pop Culture
        question: 'What streaming service released "Stranger Things"?',
        answer: "Netflix",
      },
      {
        quizId: "6844aa1db71429ee99d091f7", // Science
        question: "What gas do plants absorb from the atmosphere?",
        answer: "Carbon Dioxide",
      },
      {
        quizId: "6844aa1db71429ee99d091f8", // History
        question: "Which ancient civilization built the pyramids of Giza?",
        answer: "Egyptians",
      },
      {
        quizId: "6844aa1db71429ee99d091f9", // Pop Culture
        question: "Who played the character Harry Potter in the film series?",
        answer: "Daniel Radcliffe",
      },
      {
        quizId: "6844aa1db71429ee99d091f7", // Science
        question: "What is the boiling point of water in Celsius?",
        answer: "100 degrees Celsius",
      },
      {
        quizId: "6844aa1db71429ee99d091f8", // History
        question: "What year did the Titanic sink?",
        answer: "1912",
      },
      {
        quizId: "6844aa1db71429ee99d091f9", // Pop Culture
        question:
          'What is the name of the fictional continent in "Game of Thrones"?',
        answer: "Westeros",
      },
      {
        quizId: "6844aa1db71429ee99d091f7", // Science
        question: "What is the hardest natural substance on Earth?",
        answer: "Diamond",
      },
      {
        quizId: "6844aa1db71429ee99d091f8", // History
        question: "Who was the Roman emperor when Jesus Christ was crucified?",
        answer: "Tiberius",
      },
      {
        quizId: "6844aa1db71429ee99d091f9", // Pop Culture
        question: 'Which band released the album "Abbey Road"?',
        answer: "The Beatles",
      },
    ],
  });
}
main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
