import { trpc } from "@/trpc/client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { priorities, statuses } from "@/app/data/data";
import { Button } from "../ui/button";
import { PlusSquare } from "lucide-react";

interface CRMAddLeadProps {
  vendorId: string;
}

const CRMAddLead = ({ vendorId }: CRMAddLeadProps) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [source, setSource] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [remarks, setRemarks] = React.useState("");

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
    setRemarks(event.target.value);
  };

  const handleSubmit = () => {
    addLead.mutate({
      vendorId: vendorId,
      name: name,
      email: email,
      contact: contact,
      message: "-",
      source: source,
      status: status,
      priority: priority,
      remarks: remarks,
    });
    setName("");
    setEmail("");
    setContact("");
    setSource("");
    setStatus("");
    setPriority("");
    setRemarks("");
  };

  const addLead = trpc.addLead.useMutation();

  return (
    <TableRow className="bg-gradient-to-r from-pink-100 to-cyan-100 shadow-md">
      {/* Form */}
      <TableCell>
        <div>Today</div>
      </TableCell>
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
      <TableCell>
        <Input
          value={source}
          onChange={handleSourceChange}
          className="w-full"
          type="source"
          placeholder="Source"
        />
      </TableCell>
      <TableCell>
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
          value={remarks}
          onChange={handleRemarksChange}
          className="w-[150px]"
          placeholder="Type your remarks here."
        />
      </TableCell>
      <TableCell>
        <PlusSquare
          className="text-slate-500 hover:text-slate-400 cursor-pointer"
          onClick={() => {
            handleSubmit();
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default CRMAddLead;
