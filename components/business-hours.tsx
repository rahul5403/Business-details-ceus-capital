"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface BusinessHoursProps {
  form: UseFormReturn<any>;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function BusinessHours({ form }: BusinessHoursProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DAYS.map((day, index) => (
            <div key={day} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`businessHours.${index}.openTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{day} Opening Time</FormLabel>
                    <FormControl>
                      <Input type="time" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`businessHours.${index}.closeTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{day} Closing Time</FormLabel>
                    <FormControl>
                      <Input type="time" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}