"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessHours } from "@/components/business-hours";
import { Services } from "@/components/services";
import { toast } from "sonner";
import { useState } from "react";

const businessFormSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Business description must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  googlePlaceId: z.string().optional(),
  facebookPageId: z.string().optional(),
  facebookLink: z.string().url().optional().or(z.literal("")),
  instagramLink: z.string().url().optional().or(z.literal("")),
  whatsappLink: z.string().url().optional().or(z.literal("")),
  averageRating: z.string().transform((val) => (val ? parseFloat(val) : undefined)).optional(),
  address: z.object({
    buildingName: z.string(),
    streetName: z.string(),
    unitNumber: z.string(),
    postalCode: z.string(),
    fullAddress: z.string(),
    latitude: z.string().transform((val) => parseFloat(val)),
    longitude: z.string().transform((val) => parseFloat(val)),
  }),
  businessHours: z.array(
    z.object({
      day: z.string(),
      openTime: z.string(),
      closeTime: z.string(),
    })
  ),
  services: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      pricing: z.object({
        price: z.string().transform((val) => (val ? parseFloat(val) : 0)),
        currency: z.string().default("SGD"),
        unit: z.string().default("hour"),
        variantName: z.string(),
      }),
    })
  ),
});

type BusinessFormValues = z.infer<typeof businessFormSchema>;

export function BusinessForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("business");

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      businessName: "",
      description: "",
      email: "",
      googlePlaceId: "",
      facebookPageId: "",
      facebookLink: "",
      instagramLink: "",
      whatsappLink: "",
      averageRating: undefined,
      businessHours: [
        { day: "Monday", openTime: "09:00:00", closeTime: "18:00:00" },
        { day: "Tuesday", openTime: "09:00:00", closeTime: "18:00:00" },
        { day: "Wednesday", openTime: "09:00:00", closeTime: "18:00:00" },
        { day: "Thursday", openTime: "09:00:00", closeTime: "18:00:00" },
        { day: "Friday", openTime: "09:00:00", closeTime: "18:00:00" },
        { day: "Saturday", openTime: "09:00:00", closeTime: "18:00:00" },
        { day: "Sunday", openTime: "09:00:00", closeTime: "18:00:00" },
      ],
      services: [],
      address: {
        buildingName: "",
        streetName: "",
        unitNumber: "",
        postalCode: "",
        fullAddress: "",
        latitude: undefined,
        longitude: undefined,
      },
    },
  });

  const validateBusinessDetails = async () => {
    const businessFields = [
      "businessName",
      "description",
      "email",
      "address.buildingName",
      "address.streetName",
      "address.unitNumber",
      "address.postalCode",
      "address.fullAddress",
      "address.latitude",
      "address.longitude",
    ];

    const result = await form.trigger(businessFields as any);
    return result;
  };

  const handleNext = async () => {
    if (activeTab === "business") {
      const isValid = await validateBusinessDetails();
      if (isValid) {
        setActiveTab("hours");
      } else {
        toast.error("Please fill in all required business details correctly.");
      }
    } else if (activeTab === "hours") {
      setActiveTab("services");
    }
  };

  const handlePrevious = () => {
    if (activeTab === "hours") {
      setActiveTab("business");
    } else if (activeTab === "services") {
      setActiveTab("hours");
    }
  };

  async function onSubmit(values: BusinessFormValues) {
    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:3000/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit business details");
      }

      console.log("Submitted business details:", values);
      toast.success("Business details submitted successfully!");
      form.reset();
      setActiveTab("business");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit business details. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="hours">Business Hours</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Mr Cat Academy" {...field} />
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
                      <FormLabel>Business Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your business..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="googlePlaceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Place ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facebookPageId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Page ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="facebookLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Page Link</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagramLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram Page Link</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="whatsappLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Link</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="averageRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Rating</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Business Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address.buildingName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Building Name/Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.streetName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address.unitNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address.fullAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Auto-generated from the fields above
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="address.latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.000001"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address.longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.000001"
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
              </CardContent>
            </Card>
            <div className="flex justify-end mt-6">
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="hours">
            <BusinessHours form={form} />
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <Services form={form} />
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Business Details"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}