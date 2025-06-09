"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { defaultValues, formSchema, FormData } from "./lib/valadation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Input from "@/components/Input";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionsFacts",
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log("Form submitted with data:", data);
    // Here you can handle the form submission, e.g., send data to an API
    // Create a new user with two posts in a
    // single transaction
    const request = await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    if (!request.ok) {
      console.error("Error creating quiz:", response);
      toast.error("Failed to create quiz. Please try again.");
      return;
    }
    toast.success("Quiz created successfully!");
    reset(defaultValues);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300">
        <div className="flex flex-col sm:flex-row space-y-3 items-center justify-between py-8">
          <h1 className="text-4xl font-extrabold text-center text-purple-800 tracking-tight">
            📚 Fun Knowledge Creator
          </h1>
          <Button className="w-fit" variant="outline" asChild>
            <Link href="/quiz">Explore quizzes</Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Quiz Title */}
          <Input
            register={register}
            errors={errors}
            name="quizTitle"
            label="Quiz/Fact Collection Title"
            placeholder="e.g., Amazing Animal Facts"
          />

          {/* Creator Name */}
          <Input
            register={register}
            errors={errors}
            name="yourName"
            label="Your Name"
            placeholder="e.g., Curiosity Seeker"
          />

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              {...register("category")}
              id="category"
              name="category"
              className="mt-1 text-slate-600 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-white"
            >
              <option value="">Select a Category</option>
              <option value="science">Science & Nature</option>
              <option value="history">History</option>
              <option value="pop-culture">Pop Culture</option>
              <option value="geography">Geography</option>
              <option value="sports">Sports</option>
              <option value="art">Art & Literature</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Difficulty/Type Dropdown */}
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Difficulty / Fact Type
            </label>
            <select
              {...register("difficultyFactType")}
              id="difficultyFactType"
              name="difficultyFactType"
              className="mt-1 text-slate-600 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-white"
            >
              <option value="">Select Difficulty/Type</option>
              <option value="easy">Easy Facts</option>
              <option value="medium">Medium Quizzes</option>
              <option value="hard">Hard Challenges</option>
              <option value="true-false">True/False Questions</option>
              <option value="multiple-choice">Multiple Choice</option>
            </select>
            {errors.difficultyFactType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.difficultyFactType.message}
              </p>
            )}
          </div>

          {/* Dynamic Question Fields */}
          <div className="space-y-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              Questions / Facts
            </h3>
            {fields.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-3 items-end">
                <div className="flex-grow w-full">
                  <label
                    htmlFor={`question-${index + 1}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Question/Fact {index + 1}
                  </label>
                  <input
                    {...register(`questionsFacts.${index}.question`)}
                    type="text"
                    id={`question-${index + 1}`}
                    name={`questionsFacts.${index}.question`}
                    placeholder="e.g., What is the capital of France?"
                    className="block text-slate-600 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                  {errors.questionsFacts?.[index]?.question && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.questionsFacts[index].question.message}
                    </p>
                  )}
                </div>

                <div className="flex-grow w-full">
                  <label
                    htmlFor={`answer-1`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Answer (Optional)
                  </label>
                  <input
                    {...register(`questionsFacts.${index}.answer`)}
                    type="text"
                    id={`answer-${index + 1}`}
                    name={`questionsFacts.${index}.answer`}
                    placeholder="e.g., Paris"
                    className="block text-slate-600 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex-shrink-0 w-fit cursor-pointer self-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg mt-2 md:mt-0"
                    title="Remove Question"
                  >
                    Remove fact
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => append({ question: "", answer: "" })}
              type="button"
              className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Another Question/Fact
            </button>
          </div>

          {/* Additional Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Additional Notes (Optional)
            </label>
            <textarea
              {...register("additionalNotes")}
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              placeholder="Any extra details or credits..."
              className="mt-1 text-slate-600 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            ></textarea>
          </div>

          {/* <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words">
            {JSON.stringify(watch(), null, 2)}
          </pre> */}

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            // onClick={() => reset(defaultValues)}
            type="submit"
            className="w-full bg-purple-700 cursor-pointer flex justify-center items-center hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 ease-in-out text-lg tracking-wide focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Quiz/Fact Collection"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
