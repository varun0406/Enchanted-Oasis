import { ObjectId } from "mongodb";
import { Session } from "next-auth";

export type Role = "Student" | "Faculty" | "Admin";
export type UserCol = {
  _id: ObjectId;
  name: string;
  role: Role;
  email: string;
  passwordHash: string;
  house: string;
  profilePicture: string;
  phone: string;
  rollNumber: string;

  courses: string[]; // array of course ids

  notifications: {
    [notificationId: string]: {
      seen: boolean;
    };
  }; // array of notification ids

  unseenNotificationsCount: number; // number of notifications not seen by this user
};

export type MySession = {
  user: {
    id: ObjectId;
    role: Role;
    name: string;
    email: string;
    image: string;
  };
} | null;

export type ReceivedUserDataOnClient = Omit<
  UserCol,
  | "courses"
  | "notifications"
  | "seenNotifications"
  | "notificationsCount"
  | "seenNotificationsCount"
  | "passwordHash"
>;
export type SentUserDataFromClient = Omit<
  UserCol,
  | "courses"
  | "notifications"
  | "unseenNotificationsCount"
  | "passwordHash"
  | "_id"
  | "profilePicture"
> & {
  password: string;
  profilePicture: File | null;
};

export type HouseCol = {
  _id: ObjectId;
  name: string;
  points: number;
};

export const userProjection = {
  _id: 1,
  name: 1,
  phone: 1,
  email: 1,
  house: 1,
  role: 1,
  profilePicture: 1,
  rollNumber: 1,
};

export type AdminNotificationCol = {
  _id: ObjectId;
  title: string;
  body: string; // supports markdown
  date: Date;
  badgeText: string; // badge text
  badgeColor: string; // badge color
  seenBy: string[]; // array of user ids,
  seenByCount: number; // number of users who ave seen this notification
  creatorId: ObjectId; // id of the user who created this notification
  audience: "Students" | "Faculty" | "All"; // audience of the notification
};

export type AdminNotificationOnClient = Omit<AdminNotificationCol, "seenBy"> & {
  seen?: boolean;
  creator: ReceivedUserDataOnClient;
};
