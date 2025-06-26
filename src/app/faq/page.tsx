import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeCheck, Heart } from "lucide-react";

const faq = () => {
  return (
    <MaxWidthWrapper className="flex-1 space-y-4 pt-6 py-20">
      <div className="flex items-center justify-between space-y-2 pb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
          <p className="text-muted-foreground">
            Have questions still unanswered? Contact us at{" "}
            <span className="underline italic">admin@sarangsayang.com</span>
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight">Users</h2>
        <Accordion type="single" collapsible className="w-full mt-3">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Sarang Sayang?</AccordionTrigger>
            <AccordionContent>
              Sarang Sayang is Singapore&apos;s largest Malay Wedding Directory.
              It acts as an online platform that houses malay wedding vendors
              for all things Malay weddings. Our mission is to help and empower
              our Malay community by making wedding planning easier for all
              couples. We connect Malay wedding vendors to couples planning for
              their dream wedding through the convenience of one platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How can I get more information about any packages?
            </AccordionTrigger>
            <AccordionContent>
              Some vendors have not claimed their profile and some vendors would
              prefer if clients contact them directly. You can click &apos;Chat
              Now&apos; and our vendors will reach out to you as soon as
              possible.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Do users have to pay to use Sarang Sayang?
            </AccordionTrigger>
            <AccordionContent>
              No. Currently, there are no options for users to purchase any
              packages directly through Sarang Sayang. All payments for any
              packages are discussed and paid directly to the vendor through
              their own channels. Users and vendors are welcomed to create a
              profile and use all of Sarang Sayang&apos;s services for free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              What does the blue and gold checkmarks mean?
            </AccordionTrigger>
            <AccordionContent>
              <div className="py-6 grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
                <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="p-6 h-30 w-60 flex flex-col gap-2 items-start justify-center rounded-lg bg-white shadow-md">
                      <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                        Sarang Sayang
                      </h3>
                      <p className="text-sm text-gray-500">Category</p>
                      <Heart
                        aria-hidden="true"
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-gray-900">
                      Non-Offical Vendor
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground text-balance">
                      Non-Official Sarang Sayang vendors have not claimed their
                      profiles and are not active vendors.
                    </p>
                  </div>
                </div>

                <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="p-6 h-30 w-60 flex flex-col gap-2 items-start justify-center rounded-lg bg-white shadow-md">
                      <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                        Sarang Sayang
                        <span>
                          <BadgeCheck
                            aria-hidden="true"
                            className="h-6 w-6 flex-shrink-0 text-blue-400"
                          />
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">Category</p>
                      <Heart
                        aria-hidden="true"
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-gray-900">
                      Official Vendor
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground text-balance">
                      Official Sarang Sayang vendors are vendors who have
                      claimed their profile.
                    </p>
                  </div>
                </div>

                <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="p-6 h-30 w-60 flex flex-col gap-2 items-start justify-center rounded-lg bg-white shadow-md">
                      <h3 className="flex items-center gap-1 font-medium text-sm text-gray-700">
                        Sarang Sayang
                        <span>
                          <BadgeCheck
                            aria-hidden="true"
                            className="h-6 w-6 flex-shrink-0 text-yellow-400"
                          />
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">Category</p>
                      <Heart
                        aria-hidden="true"
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-gray-900">
                      Supervendor
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground text-balance">
                      Supervendors have claimed their profiles and are very
                      active in updating their packages and replying enquiries.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can I plan my wedding with my partner?
            </AccordionTrigger>
            <AccordionContent>
              You sure can! On your wedding overview tab, you can insert your
              partner&apos;s e-mail address and all the details you have worked
              on in our &quot;plan&quot; section will be synced with theirs.
              Make sure your partner has already registered an account with
              Sarang Sayang too.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              Why do some vendor pages have packages and some do not?
            </AccordionTrigger>
            <AccordionContent className="text-balance">
              As much as we do encourage our vendors to upload their packages,
              we do respect their decision on how they choose to share them with
              their clients so feel free to start a chat with them!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>
              Is Sarang Sayang a registered business under ACRA?
            </AccordionTrigger>
            <AccordionContent>
              Yes we are! We are a Sole Proprietor, incorporated in Singapore
              with UEN 53479247B
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="pt-10">
        <h2 className="text-xl font-bold tracking-tigh">Vendors</h2>
        <Accordion type="single" collapsible className="w-full mt-3">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I claim my vendor?</AccordionTrigger>
            <AccordionContent>
              If you see your vendor listed within your category, you can click
              &quot;Claim this vendor&quot;, fill in the details required and
              our team will contact you at the soonest. Once approved, you will
              be invited to update your details and packages accordingly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              My vendor isn&apos;t listed. How do I become a Sarang Sayang
              vendor?
            </AccordionTrigger>
            <AccordionContent>
              Click &quot;Don&apos;t see your vendor?&quot; on any vendor
              browsing pages, fill in some details and we&apos;ll make it happen
              once we can verify your company!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Does Sarang Sayang take a cut in any of your packages sales?
            </AccordionTrigger>
            <AccordionContent>
              No! We do not take any cuts through the leads you get from Sarang
              Sayang. We only provide the platform for you to expand your
              audience and engage with your leads directly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </MaxWidthWrapper>
  );
};

export default faq;
