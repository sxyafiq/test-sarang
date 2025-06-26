"use client";

import { Itinerary } from "@/payload-types";
import { ChangeEvent, SetStateAction, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { trpc } from "@/trpc/client";
import { CalendarIcon, Check, Delete } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

interface ItineraryPullContProps {
  itinerary: Itinerary;
}

const ItineraryPullCont = ({ itinerary }: ItineraryPullContProps) => {
  const [time, setTime] = useState(itinerary.time);
  const [event, setEvent] = useState(itinerary.event);
  const [location, setLocation] = useState(itinerary.location);
  const [involved, setInvolved] = useState(itinerary.involved);
  const [details, setDetails] = useState(itinerary.details);

  const [timeButton, setTimeButton] = useState("bg-emerald-200");
  const [eventButton, setEventButton] = useState("bg-emerald-200");
  const [locationButton, setLocationButton] = useState("bg-emerald-200");
  const [involvedButton, setInvolvedButton] = useState("bg-emerald-200");
  const [detailsButton, setDetailsButton] = useState("bg-emerald-200");

  function convertToFourDigitNumber(number: number) {
    if (number && number < 100) {
      return "00" + number;
    } else if (number > 999) {
      return number;
    }

    return "0" + number;
  }

  const handleTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.valueAsNumber);
    setTimeButton("bg-amber-200 ease-in-out duration-300");
  };

  const handleEvent = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEvent(event.target.value);
    setEventButton("bg-amber-200 ease-in-out duration-300");
  };

  const handleLocation = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLocation(event.target.value);
    setLocationButton("bg-amber-200 ease-in-out duration-300");
  };

  const handleInvolved = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInvolved(event.target.value);
    setInvolvedButton("bg-amber-200 ease-in-out duration-300");
  };

  const handleDetails = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setDetails(event.target.value);
    setDetailsButton("bg-amber-200 ease-in-out duration-300");
  };

  const edit = trpc.editItinerary.useMutation();
  const del = trpc.removeItinerary.useMutation();

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col gap-3">
          <div className="flex w-full items-center space-x-1">
            <Input
              type="number"
              step="15"
              value={convertToFourDigitNumber(time)}
              onChange={(e) => handleTime(e)}
            />
            <Button
              variant="outline"
              size="icon"
              className={timeButton}
              onClick={() => {
                edit.mutate({
                  id: itinerary.id,
                  time: time,
                });
                setTimeButton("bg-emerald-200 ease-in-out duration-300");
              }}
            >
              <Check className="h-3" />
            </Button>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full items-center space-x-1">
          <Input value={event} onChange={(e) => handleEvent(e)} />
          <Button
            variant="outline"
            size="icon"
            className={eventButton}
            onClick={() => {
              edit.mutate({
                id: itinerary.id,
                event: event,
              });
              setEventButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full items-center space-x-1">
          <Input value={location} onChange={(e) => handleLocation(e)} />
          <Button
            variant="outline"
            size="icon"
            className={locationButton}
            onClick={() => {
              edit.mutate({
                id: itinerary.id,
                location: location,
              });
              setLocationButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-3">
          <div className="flex w-full items-center space-x-1">
            <Input value={involved} onChange={(e) => handleInvolved(e)} />
            <Button
              variant="outline"
              size="icon"
              className={involvedButton}
              onClick={() => {
                edit.mutate({
                  id: itinerary.id,
                  involved: involved,
                });
                setInvolvedButton("bg-emerald-200 ease-in-out duration-300");
              }}
            >
              <Check className="h-3" />
            </Button>
          </div>
          <div className="flex w-full items-center space-x-1">
            <Input value={details} onChange={(e) => handleDetails(e)} />
            <Button
              variant="outline"
              size="icon"
              className={detailsButton}
              onClick={() => {
                edit.mutate({
                  id: itinerary.id,
                  details: details,
                });
                setDetailsButton("bg-emerald-200 ease-in-out duration-300");
              }}
            >
              <Check className="h-3" />
            </Button>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Delete
            className="text-red-400 w-5 h-5 cursor-pointer hover:text-red-600"
            onClick={() =>
              del.mutate({
                id: itinerary.id,
              })
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ItineraryPullCont;
