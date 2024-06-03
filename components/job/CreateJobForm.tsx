"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostJobSchema, JobFieldsType } from "@/actions";

export default function CreateJobForm() {
  const form = useForm<JobFieldsType>({
    resolver: zodResolver(PostJobSchema),
  });

  function handleSubmit(values: JobFieldsType) {
    console.log(values);
  }

  return null;
}
