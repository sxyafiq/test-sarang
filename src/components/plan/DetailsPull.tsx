"use client";

import { trpc } from "@/trpc/client";
import { Check, CheckCheck, CheckSquare2, Square } from "lucide-react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Package, Vendor, Plan, Like } from "@/payload-types";
import { categories } from "@/app/data/data";
import { Checkbox } from "../ui/checkbox";
import { VENDOR_CATEGORIES } from "@/config";
import WeddingCountdown from "./WeddingCountdown";
import PackageCheckbox from "./PackageCheckbox";
import SyncUsers from "./SyncUsers";

interface DetailsPullProps {
  plan: Plan;
  likesData: Like[];
  userId: string;
}

const DetailsPull = ({ plan, likesData, userId }: DetailsPullProps) => {
  const updatePlan = trpc.updatePlan.useMutation();
  const updatePackage = trpc.planAddPackage.useMutation();

  const [brideName, setBrideName] = useState(plan.brideName || "");
  const [groomName, setGroomName] = useState(plan.groomName || "");
  const [brideButton, setBrideButton] = useState("bg-emerald-200");
  const [groomButton, setGroomButton] = useState("bg-emerald-200");
  const [venue, setVenue] = useState(false);
  const [bridals, setBridals] = useState(false);
  const [photovideo, setPhotovideo] = useState(false);
  const [mua, setMua] = useState(false);
  const [henna, setHenna] = useState(false);
  const [emcee, setEmcee] = useState(false);
  const [misc, setMisc] = useState(false);

  const setChecklist = (packages: Package[]) => {
    setVenue(false);
    setBridals(false);
    setPhotovideo(false);
    setEmcee(false);
    setHenna(false);
    setMua(false);
    setMisc(false);
    for (let i = 0; i < packages.length; i++) {
      if (packages[i].services) {
        //@ts-ignore
        for (let x = 0; x < packages[i].services.length; x++) {
          //@ts-ignore
          if (packages[i].services[x] === "venues") {
            setVenue(true);
            //@ts-ignore
          } else if (packages[i].services[x] === "bridals") {
            setBridals(true);
            //@ts-ignore
          } else if (packages[i].services[x] === "photovideo") {
            setPhotovideo(true);
            //@ts-ignore
          } else if (packages[i].services[x] === "emceesperformers") {
            setEmcee(true);
            //@ts-ignore
          } else if (packages[i].services[x] === "henna") {
            setHenna(true);
            //@ts-ignore
          } else if (packages[i].services[x] === "mua") {
            setMua(true);
            //@ts-ignore
          } else if (packages[i].services[x] === "misc") {
            setMisc(true);
          }
        }
      }
    }
  };

  const [weddingDate, setWeddingDate] = useState<Date>(
    //@ts-ignore
    new Date(plan.weddingDate) || new Date()
  );

  function handleBrideNameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setBrideName(event.target.value);
    setBrideButton("bg-amber-200 ease-in-out duration-300");
  }

  function handleGroomNameChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setGroomName(event.target.value);
    setGroomButton("bg-amber-200 ease-in-out duration-300");
  }

  const handleWeddingDateChange = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const formattedDate = selectedDate.toISOString();

    setWeddingDate(new Date(formattedDate));

    updatePlan.mutate({
      id: plan.id,
      weddingDate: formattedDate,
    });
  };

  function addOneDay(date: string) {
    const stringtodate = new Date(date);
    stringtodate.setDate(stringtodate.getDate() + 1);
    return stringtodate;
  }

  const getShortlist = (category: string) => {
    if (category === "venues" && plan.venue) {
      //@ts-ignore
      return plan.venue as Vendor;
    } else if (category === "agents" && plan.agent) {
      //@ts-ignore
      return plan.agent as Vendor;
    } else if (category === "bridals" && plan.bridal) {
      //@ts-ignore
      return plan.bridal as Vendor;
    } else if (category === "photovideo" && plan.photovideo) {
      //@ts-ignore
      return plan.photovideo as Vendor;
    } else if (category === "emceesperformers" && plan.emceesperformers) {
      //@ts-ignore
      return plan.emceesperformers as Vendor;
    } else if (category === "henna" && plan.henna) {
      //@ts-ignore
      return plan.henna as Vendor;
    } else if (category === "mua" && plan.mua) {
      //@ts-ignore
      return plan.mua as Vendor;
    } else if (category === "misc" && plan.misc) {
      //@ts-ignore
      return plan.misc as Vendor;
    }
  };

  const handleShortlistChange = (event: string, category: string) => {
    const selectedValue = event;

    if (category === "venues") {
      updatePlan.mutate({
        id: plan.id,
        venue: selectedValue,
      });
    } else if (category === "agents") {
      updatePlan.mutate({
        id: plan.id,
        agent: selectedValue,
      });
    } else if (category === "bridals") {
      updatePlan.mutate({
        id: plan.id,
        bridal: selectedValue,
      });
    } else if (category === "photovideo") {
      updatePlan.mutate({
        id: plan.id,
        photovideo: selectedValue,
      });
    } else if (category === "henna") {
      updatePlan.mutate({
        id: plan.id,
        henna: selectedValue,
      });
    } else if (category === "mua") {
      updatePlan.mutate({
        id: plan.id,
        mua: selectedValue,
      });
    } else if (category === "emceesperformers") {
      updatePlan.mutate({
        id: plan.id,
        emceesperformers: selectedValue,
      });
    } else if (category === "misc") {
      updatePlan.mutate({
        id: plan.id,
        misc: selectedValue,
      });
    }
  };

  const vendCatLabel = (string: string) => {
    const category = VENDOR_CATEGORIES.find((cat) => cat.value === string);

    if (!category) {
      return null;
    }

    return category.label;
  };

  const checkForPkgSL = (sl: Package[], currentPkg: string) => {
    for (let x = 0; x < sl.length; x++) {
      if (sl[x].id === currentPkg) {
        return (
          <PackageCheckbox
            slcheck={true}
            planId={plan.id}
            currentPkg={currentPkg}
          />
        );
      }
    }

    return (
      <PackageCheckbox
        slcheck={false}
        planId={plan.id}
        currentPkg={currentPkg}
      />
    );
  };

  useEffect(() => {
    if (plan.packages && plan.packages.length > 0) {
      setChecklist(plan.packages as Package[]);
    } else if (plan.packages && plan.packages.length === 0) {
      setVenue(false);
      setBridals(false);
      setPhotovideo(false);
      setEmcee(false);
      setHenna(false);
      setMua(false);
      setMisc(false);
    }
  }, [plan.packages]);

  return (
    <>
      <div className="w-full rounded-lg p-7 bg-gradient-to-r from-pink-100 to-cyan-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 flex flex-col justify-around">
            <Label htmlFor="brideName">Bride&apos;s Name</Label>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input
                id="brideName"
                value={brideName}
                className="text-center"
                onChange={handleBrideNameChange}
              />
              <Button
                variant="outline"
                size="icon"
                className={brideButton}
                onClick={() => {
                  updatePlan.mutate({
                    id: plan.id,
                    brideName: brideName,
                  });
                  setBrideButton("bg-emerald-200 ease-in-out duration-300");
                }}
              >
                <Check className="h-4" />
              </Button>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-around">
            <Label htmlFor="groomName">Groom&apos;s Name</Label>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input
                id="groomName"
                value={groomName}
                className="text-center"
                onChange={handleGroomNameChange}
              />
              <Button
                variant="outline"
                size="icon"
                className={groomButton}
                onClick={() => {
                  updatePlan.mutate({
                    id: plan.id,
                    groomName: groomName,
                  });
                  setGroomButton("bg-emerald-200 ease-in-out duration-300");
                }}
              >
                <Check className="h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="px-6">
          <SyncUsers plan={plan} userId={userId} />
        </div>
      </div>

      <div className="mt-10 w-full rounded-lg p-6 bg-gradient-to-r from-pink-100 to-cyan-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
          <div className="flex flex-col items-center justify-center p-6">
            <h2 className="font-semibold">Wedding Countdown</h2>
            {plan.weddingDate ? (
              <WeddingCountdown date={addOneDay(plan.weddingDate)} />
            ) : (
              <div className="p-6 flex flex-col gap-1 items-center justify-center">
                <div className="flex flex-row items-center gap-6">
                  <div className="p-10 border-neutral-300 border-1 shadow-md rounded-xl flex flex-row gap-2 items-center justify-center bg-slate-50">
                    <h1 className="font-semibold text-3xl">-</h1>
                    <div>
                      <p className="font-light text-xs text-slate-500">Days</p>
                      <p className="font-light text-xs text-slate-500">Left</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Image
              src="https://i.giphy.com/media/gaJPlAdO21ns6Z2M3e/giphy-downsized.gif"
              alt="WeddingExcited"
              width={250}
              height={250}
              className="mt-3"
            />
          </div>
          <div className="flex flex-col items-center gap-4 justify-center py-6">
            <h2 className="font-semibold">Wedding Date</h2>
            <Calendar
              mode="single"
              required
              selected={weddingDate}
              // @ts-ignore
              onSelect={handleWeddingDateChange}
              className="rounded-md border p-10 my-3 bg-slate-50"
              initialFocus
            />
          </div>
        </div>
      </div>

      <div className="mt-10 w-full rounded-lg py-10 px-6 md:px-20 flex flex-col items-center bg-gradient-to-r from-pink-100 to-cyan-100">
        <h2 className="font-semibold w-full">Wedding Checklist</h2>
        <div className="grid grid-cols-4 w-full">
          <div className="hidden bg-white/40 sticky top-20 h-[600px] md:grid grid-cols-1 gap-4 p-5 rounded-lg shadow-sm mt-6">
            <div className="flex gap-3 items-center p-2">
              {venue ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Venue</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {bridals ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Bridal</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {photovideo ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Photo & Video</p>
            </div>

            <div className="flex gap-3 items-center p-2">
              {henna ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Henna</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {mua ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Make Up Artist</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {emcee ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Emcees & Performers</p>
            </div>
            <div className="flex gap-3 items-center p-2">
              {misc ? (
                <CheckSquare2 className="w-4 h-4" />
              ) : (
                <Square className="w-4 h-4" />
              )}
              <p>Misc</p>
            </div>
          </div>
          <div className="flex flex-col md:items-end z-10 col-span-4 md:col-span-3">
            {categories.map((category) => (
              <div key={category.value} className="py-6 md:w-[90%]">
                <Label className="flex gap-2 items-center">
                  <span>{category.icon}</span> {category.label}
                </Label>
                <Select
                  value={getShortlist(category.value)?.id}
                  onValueChange={(event) =>
                    handleShortlistChange(event, category.value)
                  }
                >
                  <SelectTrigger className="h-32 mt-3 px-10 bg-sky-50 shadow-lg">
                    <SelectValue placeholder="Shortlist a vendor from your wishlist" />
                  </SelectTrigger>
                  <SelectContent>
                    {likesData.map((like) =>
                      //@ts-ignore
                      like.vendor.category === category.value ? (
                        // @ts-ignore
                        <SelectItem value={like.vendor.id} key={like.id}>
                          <div className="flex flex-row gap-4 items-center px-6">
                            <Image
                              //@ts-ignore
                              src={like.vendor.images[0].image.url}
                              width={100}
                              height={100}
                              //@ts-ignore
                              alt={`${like.vendor.name}-image`}
                              className="aspect-square hidden lg:block"
                              style={{ objectFit: "cover" }}
                            />
                            {/* @ts-ignore */}
                            <p className="font-semibold">{like.vendor.name}</p>
                          </div>
                        </SelectItem>
                      ) : null
                    )}
                  </SelectContent>
                </Select>
                {/* @ts-ignore */}
                {getShortlist(category.value)?.packages?.length > 0 ? (
                  <div className="hidden md:block bg-white/60 pt-6 mx-4 px-4 py-3 shadow-sm">
                    <p className="text-center text-slate-400 italic">
                      Shortlist a package below
                    </p>
                    <div className="py-3 w-full">
                      {getShortlist(category.value)?.packages?.map(
                        (listedPackage) => (
                          <div
                            className="p-3 grid grid-cols-2 lg:grid-cols-3"
                            // @ts-ignore
                            key={listedPackage.name}
                          >
                            <div className="flex items-center col-span-2">
                              {plan.packages && plan.packages.length > 0 ? (
                                checkForPkgSL(
                                  plan.packages as Package[],
                                  //@ts-ignore
                                  listedPackage.id
                                )
                              ) : (
                                <Checkbox
                                  onClick={() => {
                                    updatePackage.mutate({
                                      id: plan.id,
                                      //@ts-ignore
                                      packageId: listedPackage.id,
                                    });
                                    setChecklist(plan.packages as Package[]);
                                  }}
                                  className="mx-5"
                                />
                              )}
                              <p className="font-medium w-[90%]">
                                {/* @ts-ignore */}
                                {listedPackage.name}
                              </p>
                            </div>
                            <div className="grid grid-cols-1  gap-2">
                              {/* @ts-ignore */}
                              {listedPackage.services?.map((service) => (
                                <p
                                  className="flex gap-1 items-center"
                                  key={service}
                                >
                                  <span>
                                    <CheckCheck className="w-4 h-4 text-lime-600" />
                                  </span>
                                  {vendCatLabel(service)}
                                </p>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPull;
