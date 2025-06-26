import { BadgeCheck } from 'lucide-react'

interface BadgeProps {
    vendorRole: string
}

const Badge = ({vendorRole}: BadgeProps) => {

  return (
    <>
        {vendorRole === "vendor" ? <BadgeCheck aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-blue-400'/> : null}
        {vendorRole === "supervendor" ? <BadgeCheck aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-yellow-400'/> : null}
    </>
  )
}

export default Badge