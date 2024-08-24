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
    <Card>
      <div className="m-8 flex justify-start align-middle relative w-72 h-48 overflow-hidden">
        <Image
          src={Picture}
          alt="Picture of the author"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </div>
    </Card>
  );
}
 
export default EventCard;