import z from "zod";

export const formSchema = z.object({
  quizTitle: z.string().min(1, "Quiz title is required"),
  yourName: z.string().min(1, "Your name is required"),
  category: z.string().min(1, "Category is required"),
  difficultyFactType: z.string().min(1, "Difficulty/Type is required"),
  questionsFacts: z
    .array(
      z.object({
        question: z.string().min(1, "Question/Fact is required"),
        answer: z.string().optional(),
      })
    )
    .min(1, "At least one question/fact is required"),
  additionalNotes: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const defaultValues: FormData = {
  quizTitle: "",
  yourName: "",
  category: "",
  difficultyFactType: "",
  questionsFacts: [{ question: "", answer: "" }],
  additionalNotes: "",
};
