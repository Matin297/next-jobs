"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  Input,
  Button,
  Select,
  Textarea,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui";
import { JobType, JobStyle } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostJobSchema, JobFieldsType } from "@/actions";
import { Company, Location } from "@prisma/client";

interface CreateJobFormProps {
  companies: Company[];
  locations: Location[];
}

export default function CreateJobForm({
  companies,
  locations,
}: CreateJobFormProps) {
  const form = useForm<JobFieldsType>({
    resolver: zodResolver(PostJobSchema),
  });

  function handleSubmit(values: JobFieldsType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className="m-auto flex max-w-lg flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Lorem Ipsum" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Lorem ipsum dolor sit..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option hidden value="">
                    Select an option
                  </option>
                  {Object.values(JobType).map((type) => (
                    <option key={type} className="capitalize" value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Style</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option hidden value="">
                    Select an option
                  </option>
                  {Object.values(JobStyle).map((type) => (
                    <option key={type} className="capitalize" value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option hidden value="">
                    Select an option
                  </option>
                  {companies.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option hidden value="">
                    Select an option
                  </option>
                  {locations.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Submit</Button>
      </form>
    </Form>
  );
}
