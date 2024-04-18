import React, { PropsWithChildren } from "react";
import { User } from "../types/types";
import { Avatar, Card, CardContent, CardHeader, Link } from "@mui/material";
import { red } from "@mui/material/colors";

interface PersonCardProps
  extends PropsWithChildren<Omit<User, "roles" | "id">> {
  showEmail?: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  children,
  name,
  email,
  showEmail = false,
}) => {
  return (
    <Card>
      <CardHeader
        title={name}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {name
              .split(" ")
              .map((str) => str.at(0))
              .concat()}
          </Avatar>
        }
        subheader={
          <Link component="a" href={`mailto:${email}`}>
            {showEmail ? email : " "}
          </Link>
        }
      />
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  );
};
