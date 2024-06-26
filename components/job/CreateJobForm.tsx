"use client";

import {
  Form,
  Input,
  Select,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui";
import { createJob } from "@/actions";
import { useForm } from "react-hook-form";
import Editor from "@/components/common/Editor";
import { draftToMarkdown } from "markdown-draft-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostJobSchema, JobFieldsType } from "@/lib/schema";

import LoadingButton from "@/components/common/LoadingButton";
import { JobType, JobStyle, Company, Location } from "@prisma/client";

import ComboSelect from "./ComboSelect";

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

  async function handleSubmit(values: JobFieldsType) {
    try {
      await createJob(values);
    } catch (error) {
      alert("Something went wrong! Please check your input values.");
    }
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
          name="locationId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Location</FormLabel>
              <ComboSelect
                data={locations}
                value={field.value}
                onChange={field.onChange}
                getDisplayValue={(location) =>
                  location ? `${location?.city}, ${location?.country}` : ""
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Company</FormLabel>
              <ComboSelect
                data={companies}
                value={field.value}
                onChange={field.onChange}
                getDisplayValue={(company) => company?.name || ""}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-2">
          <FormField
            control={form.control}
            name="applicationEmail"
            render={({ field }) => (
              <FormItem className="grow sm:max-w-[50%]">
                <FormLabel>Application Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="example@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicationURL"
            render={({ field }) => (
              <FormItem className="grow sm:max-w-[50%]">
                <FormLabel>Application URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="http://example.com"
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger("applicationEmail");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Editor
                  ref={field.ref}
                  onChange={(d) => field.onChange(draftToMarkdown(d))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. 100,000" type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" loading={form.formState.isSubmitting}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
