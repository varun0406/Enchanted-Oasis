import { CourseNotifOnClient } from "@/lib/types";
import MotionDiv from "../MotionDiv";
import classNames from "classnames";
import { Avatar, Badge, Flex, Spacer, Text } from "@chakra-ui/react";
import { formatDateTime, getRoleColor } from "@/lib/functions";
import AdminNotifStyles from "@/components/NotifItem/NotifItem.module.css";
import Link from "next/link";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
export default function CourseNotifItem({
  notification,
  mutate,
}: {
  notification: CourseNotifOnClient;
  mutate: () => void;
}) {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <div className={classNames(AdminNotifStyles.notifItem)}>
      <div className={AdminNotifStyles.header}>
        {/* Avatar, name, email */}
        <Flex gap={4}>
          <Avatar src={notification.creator.profilePicture} />
          <div>
            <Text fontSize="sm">{notification.creator.name}</Text>
            <Text fontSize="sm" color={"hsl(var(--nc)  )"}>
              {notification.creator.email}
            </Text>
          </div>
        </Flex>
      </div>
      <Link
        className={AdminNotifStyles.link}
        href={`/Everyone/Notification/${notification._id}?courseId=${courseId}`}
      >
        <div className={AdminNotifStyles.body}>
          {/* Title and Content */}
          <span className={AdminNotifStyles.title}>
            <Text fontWeight="bold" fontSize="1.1em">
              {notification.title}
            </Text>
          </span>
          <Text fontSize="sm" color={"hsl(var(--pc) /70% )"}>
            {notification.body}
          </Text>
        </div>
      </Link>

      <div className={AdminNotifStyles.footer}>
        {/* Date and time without icons */}

        <Text fontSize="sm" color="hsl(var(--nc) )">
          {formatDateTime(new Date(notification.date))}
        </Text>

        {/* Badge */}
        <Flex>
          <div className={AdminNotifStyles.badgesWrapper}>
            <Badge colorScheme={notification.badgeColor}>
              {" "}
              {notification.badgeText}{" "}
            </Badge>
          </div>
          <Spacer />
          <button className={AdminNotifStyles.del} aria-label="delete">
            <DeleteIcon />
          </button>
        </Flex>
      </div>
    </div>
  );
}
