"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ServicesProps {
  form: UseFormReturn<any>;
}

const LEVELS = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "Secondary 1",
  "Secondary 2",
  "Secondary 3",
  "Secondary 4",
  "Secondary 5",
  "Junior College 1",
  "Junior College 2",
];

const SUBJECTS = [
  "Math",
  "English",
  "Additional Math",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "General Paper",
];

const STREAMS = ["G1", "G2", "G3", "Express", "NA", "NT"];

const CLASS_SIZES = ["Small Group", "Big Group", "1-to-1"];

const DELIVERY_MODES = ["Onsite", "Online", "Hybrid"];

export function Services({ form }: ServicesProps) {
  const services = form.watch("services") || [];

  const addService = () => {
    const currentServices = form.getValues("services") || [];
    form.setValue("services", [
      ...currentServices,
      {
        name: "",
        description: "",
        tags: [],
        pricing: {
          price: "",
          currency: "SGD",
          unit: "hour",
          variantName: "Standard Rate",
        },
      },
    ]);
  };

  const removeService = (index: number) => {
    const currentServices = form.getValues("services");
    form.setValue(
      "services",
      currentServices.filter((_: any, i: number) => i !== index)
    );
  };

  const addTag = (serviceIndex: number, tag: string) => {
    const currentTags = form.getValues(`services.${serviceIndex}.tags`) || [];
    if (!currentTags.includes(tag)) {
      form.setValue(`services.${serviceIndex}.tags`, [...currentTags, tag]);
    }
  };

  const removeTag = (serviceIndex: number, tagToRemove: string) => {
    const currentTags = form.getValues(`services.${serviceIndex}.tags`);
    form.setValue(
      `services.${serviceIndex}.tags`,
      currentTags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  return (
    <div className="space-y-6">
      {services.map((service: any, index: number) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Service {index + 1}</CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeService(index)}
            >
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name={`services.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Primary 1 Math Tuition"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`services.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your service..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index, tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select onValueChange={(value) => addTag(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => addTag(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => addTag(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {STREAMS.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => addTag(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASS_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => addTag(index, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {DELIVERY_MODES.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`services.${index}.pricing.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`services.${index}.pricing.variantName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Standard Rate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" onClick={addService}>
        Add Service
      </Button>
    </div>
  );
}