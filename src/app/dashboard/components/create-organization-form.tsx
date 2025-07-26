"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod/v4";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useState } from "react";
import { Loader2, SparkleIcon } from "lucide-react";

import { organization } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  slug: z.string().min(2).max(50),
});

export function CreateOrganizationForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await organization.create({
        name: values.name,
        slug: values.slug,
      });

      toast.success("Organization created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create organization");
    } finally {
      window.location.href = "/dashboard";
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-end gap-4">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="my-org" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            size="sm"
            className="h-9 w-fit"
            onClick={() => {
              const titleValue = form.getValues("name");

              const slug = slugify(titleValue);
              form.setValue("slug", slug, { shouldValidate: true });
            }}
          >
            <span className="text-xs">Generate Slug </span>{" "}
            <SparkleIcon className="ml-1" size={16} />
          </Button>
        </div>

        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Create Organization"
          )}
        </Button>
      </form>
    </Form>
  );
}
