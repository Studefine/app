import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { OnlineInquiry } from "../../components/OnlineInquiry";
import { PersonCard } from "../../components/PersonCard";
import Divider from "@mui/material/Divider";

const ContactsPage = () => {
  const studefineEmail = "info@studefine.hu";
  const discordLink = "https://discord.gg/EqN45Hgd";

  return (
    <Stack alignItems="center" direction="column" gap={5}>
      <Typography variant="h2">Lépj velünk kapcsolatba</Typography>
      <Stack direction="row" gap={10}>
        <OnlineInquiry />
        <Card>
          <CardHeader title="Elérhetőségek"></CardHeader>
          <CardContent>
            <Stack gap={3}>
              <Typography variant="body1" gutterBottom>
                email:{" "}
                <Link component="a" href={`mailto:${studefineEmail}`}>
                  {studefineEmail}
                </Link>
              </Typography>
              <Divider />
              <Typography variant="body1" gutterBottom>
                discord:{" "}
                <Link component="a" href={discordLink} target="_blank">
                  Studefine
                </Link>
              </Typography>
              <Divider />
              <Stack>
                <Typography variant="body2">Hívj minket bátran!</Typography>
                <Typography variant="body1" gutterBottom>
                  tel: 🙂
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Stack direction="column" alignItems="center" gap={2}>
        <Typography variant="subtitle1">Fejlesztők</Typography>
        <Stack direction="row" gap={10}>
          <PersonCard
            name="Németh Gábor"
            email="gabor.nemeth@studefine.hu"
            showEmail
          />
          <PersonCard
            name="Nagy Máté"
            email="mate.nagy@studefine.hu"
            showEmail
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactsPage;
