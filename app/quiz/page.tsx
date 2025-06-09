import React from "react";
import { QuizComponent } from "@/components/QuizComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchData() {
  const res = await fetch(process.env.URL + "/api/quiz", {
    method: "GET",
    cache: "no-store", // Ensure fresh data on each request
  });
  const data = await res.json();
  return data;
}

export default async function quizExplorer() {
  const quizData = await fetchData();

  const quizzes = quizData?.quizzes;
  console.log(quizzes);
  return (
    <div>
      <div className="flex items-center justify-center py-8 bg-gray-100">
        <Button variant="outline" asChild>
          <Link href="/">Create quiz</Link>
        </Button>
      </div>
      {quizzes
        ? // @ts-expect-error quizzes is possibly undefined
          quizzes.map((quiz) => <QuizComponent key={quiz.id} quizData={quiz} />)
        : "No quizzes found."}
    </div>
  );
}
