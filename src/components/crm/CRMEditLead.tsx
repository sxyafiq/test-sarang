import { trpc } from "@/trpc/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PencilRuler } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { priorities, statuses } from "@/app/data/data";
import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import { Chat, Lead, User } from "@/payload-types";
import VendorChat from "../chat/VendorChat";

interface CRMDataPullProps {
  lead: Lead;
}

const CRMEditLead = ({ lead }: CRMDataPullProps) => {
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [contact, setContact] = useState(lead.contact);
  const [source, setSource] = useState(lead.source);
  const [status, setStatus] = useState(lead.status);
  const [priority, setPriority] = useState(lead.priority);
  const [remarks, setRemarks] = useState(lead.remarks);

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };
  const handleContactChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContact(event.target.value);
  };
  const handleSourceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSource(event.target.value);
  };
  const handleRemarksChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // @ts-ignore
    setRemarks(event.target.value);
  };

  const updateLead = trpc.updateLead.useMutation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact Details</TableHead>
          <TableHead>Chat</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Remarks</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableCell>
          <div className="flex flex-col gap-3">
            <Input
              value={name}
              onChange={handleNameChange}
              className="w-full"
              type="name"
              placeholder="Name"
            />
            <Input
              value={email}
              onChange={handleEmailChange}
              className="w-full"
              type="email"
              placeholder="Email"
            />
            <Input
              value={contact}
              onChange={handleContactChange}
              className="w-full"
              type="contact"
              placeholder="Contact"
            />
          </div>
        </TableCell>
        {lead.chat ? (
          <TableCell>
            <div className="w-full flex justify-center">
              <VendorChat
                chat={lead.chat as Chat}
                //@ts-ignore
                user={lead.chat.user as User}
              />
            </div>
          </TableCell>
        ) : (
          <TableCell>
            <p className="text-slate-500 italic">No Chats Found</p>
          </TableCell>
        )}
        <TableCell>
          {source === "Sarang Sayang" ? (
            <Input
              value={source}
              onChange={handleSourceChange}
              className="w-full"
              type="source"
              placeholder="Source"
              disabled
            />
          ) : (
            <Input
              value={source}
              onChange={handleSourceChange}
              className="w-full"
              type="source"
              placeholder="Source"
            />
          )}
        </TableCell>
        <TableCell>
          {/* @ts-ignore */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(({ label, value, icon2 }) => (
                <SelectItem value={value} key={value}>
                  <div className="flex items-center gap-3">
                    <p>{icon2}</p>
                    <p>{label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          {/* @ts-ignore */}
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Priorities" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map(({ label, value, icon2 }) => (
                <SelectItem value={value} key={value}>
                  <div className="flex items-center gap-3">
                    <p>{icon2}</p>
                    <p>{label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Textarea
            //@ts-ignore
            value={remarks}
            onChange={handleRemarksChange}
            className="w-[150px]"
            placeholder="Type your remarks here."
          />
        </TableCell>
        <TableCell>
          <SheetClose>
            <Button
              variant="ghost"
              onClick={() => {
                updateLead.mutate({
                  id: lead.id,
                  name: name,
                  contact: contact,
                  email: email,
                  source: source,
                  status: status,
                  priority: priority,
                  //@ts-ignore
                  remarks: remarks,
                });
              }}
            >
              <PencilRuler className="text-slate-400" />
            </Button>
          </SheetClose>
        </TableCell>
      </TableBody>
    </Table>
  );
};

export default CRMEditLead;
