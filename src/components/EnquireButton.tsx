'use client'

import { Button } from './ui/button'
import { MailQuestion } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { trpc } from '@/trpc/client'
import { Popover, PopoverContent } from './ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'

import { sendEnquiryEmail } from '@/actions/sendEnquiryEmail'

interface EnquireButtonProps {
    vendorId: string
    userEmail: string
}

const EnquireButton = ({vendorId, userEmail}: EnquireButtonProps) => {
    const [open, setOpen] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState(userEmail)
    const [contact, setContact] = useState('')
    const [message, setMessage] = useState('')

    const [enq, setEnq] = useState({
      email: userEmail
    })

    const handleNameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setEmail(event.target.value)
    }
    const handleContactChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setContact(event.target.value)
    }
    const handleMSGChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setMessage(event.target.value)
    }


    const handleSubmit = async () => {
        addLead.mutate({
            vendorId: vendorId,
            name: name,
            email: email,
            contact: contact,
            message: message,
            source: 'Sarang Sayang',
            status: 'not contacted',
            priority: 'medium',
            remarks: '-'
            });

        await sendEnquiryEmail(enq)

        setName('')
        setEmail('')
        setContact('')
        setMessage('')
        
        toast.success('Enquiry Submitted!')
      }

    const addLead = trpc.addLead.useMutation()

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
            <Button>
                <MailQuestion className="mr-2 h-4 w-4" /> Enquire Now
            </Button>
        </PopoverTrigger>
        <PopoverContent>
          {/* <form action={async (enq) => {
            await sendEnquiryEmail(enq)
          }}> */}
            <div className="flex items-center space-x-2 py-4">
              <div className="grid flex-1 gap-3">
                  <div className="space-y-2">
                      <h4 className="font-bold leading-none">Submit an Enquiry!</h4>
                      <p className="text-sm text-muted-foreground">
                          Fill in your details and message.
                      </p>
                  </div>
                <div>
                  <Label htmlFor="name">
                    Name
                  </Label>
                  <Input value={name} onChange={handleNameChange} className="w-[200px]" type="name" placeholder="Name" />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email
                  </Label>
                  <Input name='email' value={email} onChange={handleEmailChange} className="w-[200px]" type="email" />
                </div>

                <div>
                  <Label htmlFor="contact">
                    Contact
                  </Label>
                  <Input value={contact} onChange={handleContactChange} className="w-[200px]" type="contact" placeholder="Contact" />
                </div>

                <div>
                  <Label htmlFor="message">
                    Message
                  </Label>
                  <Textarea value={message} onChange={handleMSGChange} placeholder="What are you looking for?" />
                </div>

                <Button type="submit" variant="secondary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          {/* </form> */}
        </PopoverContent>
    </Popover>
  )
}

export default EnquireButton