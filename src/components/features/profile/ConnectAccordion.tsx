"use client";
import { TUser } from "@/src/types/TUser";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import Link from "next/link";

const ConnectAccordion = ({ user }: { user: TUser }) => {


  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title={
          <p className="text-sm text-default-500">
            {user?.followers.length} Followers
          </p>
        }
      >
        {user?.followers.map((f: any) => (
          <div key={f?._id} className="my-2 flex items-center">
            <Avatar src={f?.photoUrl} className="w-10 h-10 text-large mr-2" />{" "}
            <Link href={`/author/${f?._id}`} className="hover:underline">
              {f?.name}
            </Link>
          </div>
        ))}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title={
          <p className="text-sm text-default-500">
            {user?.following.length} Following
          </p>
        }
      >
        {user?.following.map((f: any) => (
          <div key={f?._id} className="my-2 flex items-center">
            <Avatar src={f?.photoUrl} className="w-10 h-10 text-large mr-2" />{" "}
            <Link href={`/author/${f?._id}`} className="hover:underline">
              {f?.name}
            </Link>
          </div>
        ))}
      </AccordionItem>
    </Accordion>
  );
};

export default ConnectAccordion;
