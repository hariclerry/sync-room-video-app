import { LuCalendarArrowDown } from 'react-icons/lu';
import { FaFileVideo } from 'react-icons/fa6';
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaHome, FaUserPlus } from 'react-icons/fa';
import { IconType } from 'react-icons';

export type Item = {
    title: string,
    icon: IconType,
    link: string
}

export const content: Item[] = [
   {
    title: 'Home',
    icon: FaHome,
    link: '/'
   },
   {
    title: 'Upcoming',
    icon: RiCalendarScheduleFill,
     link: '/upcoming'
   },
   {
    title: 'Previous',
    icon: LuCalendarArrowDown,
     link: '/previous'
   },
   {
    title: 'Recordings',
    icon: FaFileVideo,
     link: '/recordings'
   },
   {
    title: 'Personal Room',
    icon: FaUserPlus,
     link: '/personal'
   }
]

// Dummy participant avatars
export const dummyParticipantAvatars = [
  { id: '1', name: 'Harriet' },
  { id: '2', name: 'Emma' },
  { id: '3', name: 'Alice' },
  { id: '4', name: 'Gideon' },
  { id: '5', name: 'Eve' }
];

export const avatarBgColors = ['purple.700','gray.700', 'blue.700', 'orange.600', 'red.800', ];