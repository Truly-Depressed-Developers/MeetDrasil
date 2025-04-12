'use client';

import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateTimePicker24h } from '@/components/eventForm/DateTimePicker';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { trpc } from '@/trpc/client';
import { showToast } from '@/lib/showToast';
import { redirect } from 'next/navigation';

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().default(''),
    tags: z.array(z.string()).min(1, { message: 'Tags are required' }),
    city: z.string().min(1, { message: 'City is required' }),
    latitude: z.coerce.number().min(-90).max(90, {
      message: 'Latitude must be between -90 and 90',
    }),
    longitude: z.coerce.number().min(-180).max(180, {
      message: 'Longitude must be between -180 and 180',
    }),
    startDate: z.date().refine((date) => date > new Date(), {
      message: 'Start date must be in the future',
    }),
    endDate: z.date().refine((date) => date > new Date(), {
      message: 'End date must be in the future',
    }),
    minCapacity: z.coerce.number().optional(),
    maxCapacity: z.coerce.number().optional(),
    price: z.coerce.number().optional(),
    images: z.array(z.string()).optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

export default function EventForm() {
  const [isCapacityEnabled, setIsCapacityEnabled] = useState(false);
  const [isPriceEnabled, setIsPriceEnabled] = useState(false);

  const hobbies = trpc.hobby.getAll.useQuery();
  const mutation = trpc.event.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      tags: [''],
      city: '',
      latitude: 0,
      longitude: 0,
      startDate: new Date(),
      endDate: new Date(),
      minCapacity: undefined,
      maxCapacity: undefined,
      price: undefined,
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await mutation.mutateAsync(values);

    const showToastNotification = async () => {
      const toastData = {
        title: 'Success',
        description: 'Added successfully',
      };

      await showToast(toastData);
      redirect(`/event/${res.id}`);
    };

    showToastNotification();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Event Name" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Event Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobbies</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val: string) => {
                    field.onChange([val]);
                  }}
                  value={field.value[0]}
                  defaultValue={field.value[0]}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hobbies.data?.map((hobby) => (
                      <SelectItem value={`${hobby.id}`} key={hobby.id}>
                        {hobby.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-end gap-x-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Event City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Set location</Button>
        </div>
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Event Latitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Event Longitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DateTimePicker24h value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DateTimePicker24h value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-x-4">
            <FormLabel className="text-base">Capacity</FormLabel>
            <label className="flex items-center gap-x-2 text-sm">
              <Switch
                checked={isCapacityEnabled}
                onCheckedChange={(isChecked: boolean) => {
                  setIsCapacityEnabled(isChecked);
                  form.setValue('minCapacity', isChecked ? 0 : undefined);
                  form.setValue('maxCapacity', isChecked ? 1 : undefined);
                }}
              />
            </label>
          </div>

          {isCapacityEnabled && (
            <div className="flex gap-x-4">
              <FormField
                control={form.control}
                name="minCapacity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Minimum Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Event Minimum Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Maximum Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Event Maximum Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-x-4">
            <FormLabel className="text-base">Price</FormLabel>
            <label className="flex items-center gap-x-2 text-sm">
              <Switch
                checked={isPriceEnabled}
                onCheckedChange={(isChecked: boolean) => {
                  setIsPriceEnabled(isChecked);
                  form.setValue('price', isChecked ? 0 : undefined);
                }}
              />
            </label>
          </div>

          {isPriceEnabled && (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Event Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button type="submit" className="w-full">
          Create Event
        </Button>
      </form>
    </Form>
  );
}
