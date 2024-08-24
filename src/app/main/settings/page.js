"use client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import Navigationbar from "@/components/Navigationbar";

export default function settings() {
  const [activeSection, setActiveSection] = React.useState("profile");
  const [date, setDate] = React.useState(new Date());
  const handleToggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <Navigationbar />
      <div className="mt-5 mx-10 border rounded-lg">
        <div className="mx-10 my-5">
          <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight">
            Settings
          </h2>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-400">
            Manage your account settings and set e-mail preferences.
          </h4>
          <hr className="my-5 border-gray-300" />
        </div>

        <div className="flex flex-row mx-10">
          <div>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col">
                <NavigationMenuItem>
                  <button
                    onClick={() => handleToggleSection("profile")}
                    className={navigationMenuTriggerStyle()}
                  >
                    Profile
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => handleToggleSection("account")}
                    className={navigationMenuTriggerStyle()}
                  >
                    Account
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => handleToggleSection("appearance")}
                    className={navigationMenuTriggerStyle()}
                  >
                    Appearance
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button
                    onClick={() => handleToggleSection("notification")}
                    className={navigationMenuTriggerStyle()}
                  >
                    Notification
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="w-full">
            {activeSection === "profile" && (
              <div className="mt-5 mx-10">
                <h3 className="text-xl font-bold">Profile Details</h3>
                <p>This is how others will see you on the site.</p>
                <hr className="my-5 border-gray-300" />
                <div className="my-5">
                  <h4 className="text-base font-semibold">Username</h4>
                  <Input placeholder="username" className="w-1/2 my-[10px]" />
                  <p className="text-sm font-medium text-gray-500">
                    This is your public display name. It can be your real name
                    or a pseudonym. You can only change this once every 30 days.
                  </p>
                </div>
                <div className="my-5">
                  <h4 className="text-base font-semibold">Email</h4>
                  <Input
                    type="email"
                    placeholder="your email"
                    className="w-1/2 my-[10px]"
                  />
                  <p className="text-sm font-medium text-gray-500">
                    You can manage verified email addresses in your email
                    settings.
                  </p>
                </div>
                <div className="my-5">
                  <h4 className="text-base font-semibold">Bio</h4>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none my-[10px]"
                  />
                  <p className="text-sm font-medium text-gray-500">
                    You can @mention other users and organizations to link to
                    them.
                  </p>
                </div>
                <Button className="my-[10px]">Update profile</Button>
              </div>
            )}
            {activeSection === "account" && (
              <div className="mt-5 mx-10">
                <h3 className="text-xl font-bold">Account</h3>
                <p>
                  Update your account settings. Set your preferred language and
                  timezone.
                </p>
                <hr className="my-5 border-gray-300" />
                <div className="my-5">
                  <h4 className="text-base font-semibold">Name</h4>
                  <Input placeholder="Your name" className="w-1/2 my-[10px]" />
                  <p className="text-sm font-medium text-gray-500">
                    This is the name that will be displayed on your profile and
                    in emails.
                  </p>
                </div>
                <div className="my-5">
                  <h4 className="text-base font-semibold mb-[10px]">
                    Date of birth
                  </h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm font-medium text-gray-500 mt-[10px]">
                    Your date of birth is used to calculate your age.
                  </p>
                </div>
                <div className="my-5">
                  <h4 className="text-base font-semibold mb-[10px]">
                    Language
                  </h4>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select languaes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">English</SelectItem>
                      <SelectItem value="dark">Chinese</SelectItem>
                      <SelectItem value="system">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-medium text-gray-500 mt-[10px]">
                    This is the language that will be used in the dashboard.
                  </p>
                </div>
                <Button className="my-[10px]">Update account</Button>
              </div>
            )}
            {activeSection === "appearance" && (
              <div className="mt-5 mx-10">
                <h3 className="text-xl font-bold">Appearance</h3>
                <p>
                  Customize the appearance of the app. Automatically switch
                  between day and night themes.
                </p>
                <hr className="my-5 border-gray-300" />
                <div className="my-5">
                  <h4 className="text-base font-semibold mb-[10px]">Font</h4>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select fonts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Inter</SelectItem>
                      <SelectItem value="dark">Manrope</SelectItem>
                      <SelectItem value="system">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-medium text-gray-500 mt-[10px]">
                    Set the font you want to use in the dashboard.
                  </p>
                </div>
                <div className="my-5">
                  <h4 className="text-base font-semibold mb-[10px]">Theme</h4>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select colors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Black</SelectItem>
                      <SelectItem value="dark">Blue</SelectItem>
                      <SelectItem value="system">Yellow</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-medium text-gray-500 mt-[10px]">
                    Select the theme for the dashboard.
                  </p>
                </div>

                <Button className="my-[10px]">Update preferences</Button>
              </div>
            )}
            {activeSection === "notification" && (
              <div className="mt-5 mx-10">
                <h3 className="text-xl font-bold">Notification</h3>
                <p>Configure how you receive notifications.</p>
                <hr className="my-5 border-gray-300" />
                <div className="my-5">
                  <h4 className="text-base font-semibold mb-[10px]">
                    Notify me about...
                  </h4>
                  <div className="flex items-center space-x-2 my-[10px]">
                    <Checkbox id="nm" />
                    <label
                      htmlFor="nm"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      All new messages
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-[10px]">
                    <Checkbox id="dm" />
                    <label
                      htmlFor="dm"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Direct messages and mentions
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 my-[10px]">
                    <Checkbox id="nothing" />
                    <label
                      htmlFor="nothing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nothing
                    </label>
                  </div>
                </div>
                <div className="my-5">
                  <h4 className="text-base font-semibold mb-[10px]">
                    Email Notifications
                  </h4>
                  <Switch />
                </div>
                <Button className="my-[10px]">Update notifications</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
