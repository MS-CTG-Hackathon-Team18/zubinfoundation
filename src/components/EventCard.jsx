import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image";


const EventCard = ({Picture, Title, DateTime, Location, Description}) => {
  return ( 
    <Card className="hover:cursor-pointer w-80 h-auto">
      <div className="m-8 flex justify-start align-middle relative w-64 h-48 overflow-hidden">
        <Image
          src={Picture}
          alt="Picture of the author"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="mr-4">
        <CardHeader className="overflow-hidden truncate">
          <CardTitle>{Title}</CardTitle>
          <CardDescription>Event Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Event Content</p>
        </CardContent>
        <CardFooter>
          <div >
            <p>{Location}</p>
            <p>{DateTime}</p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default EventCard;