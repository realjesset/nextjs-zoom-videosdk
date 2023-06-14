/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUserStore from "@/stores/user";
import { api, type RouterInputs } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const CreateSession = () => {
  const { userId, username } = useUserStore(({ userId: userId, username }) => ({
    userId,
    username,
  }));
  const router = useRouter();
  const { mutate: create } = api.session.create.useMutation({
    onSuccess: () => {
      toast.success("Session created!");
      void router.push("/");
    },
    onError: (err) => {
      toast.error("Error creating session, please try again later");
      console.error(err);
    },
  });
  console.log(userId, username);
  const form = useForm<RouterInputs["session"]["create"]>({
    resolver: zodResolver(
      z.object({
        name: z.string(),
        hostId: z.string(),
        hostname: z.string(),
      })
    ),
    defaultValues: {
      name: "",
      hostId: userId,
      hostname: username,
    },
  });

  const onSubmit = (values: RouterInputs["session"]["create"]) => {
    create({
      ...values,
      hostId: userId || "",
      hostname: username || "",
    });
  };

  return (
    <div className="grid h-screen place-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Session Name</FormLabel>
                {JSON.stringify(formState.errors)}
                <FormControl>
                  <Input
                    placeholder="test lobby"
                    className="input-primary"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Users will be able to find your session by this name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="btn-primary btn w-full">
            Create Session
          </button>
        </form>
      </Form>
    </div>
  );
};

export default CreateSession;
