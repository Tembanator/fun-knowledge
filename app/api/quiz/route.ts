import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      quizTitle,
      yourName,
      category,
      difficultyFactType,
      questionsFacts,
      additionalNotes,
    } = body;

    const newQuiz = await prisma.quiz.create({
      data: {
        quizTitle,
        yourName,
        category,
        difficultyFactType,
        additionalNotes,
        questionsFacts: {
          // @ts-expect-error generating type error due to Prisma's handling of nested writes
          create: questionsFacts.map((qf) => ({
            question: qf.question,
            answer: qf.answer,
          })),
        },
      },
      include: {
        questionsFacts: true, // Include the created questionsFacts in the response
      },
    });
    return NextResponse.json({ newQuiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Failed to create quiz" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questionsFacts: true, // Include the related questionsFacts
      },
    });
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}
