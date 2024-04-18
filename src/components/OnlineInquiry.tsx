import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { ComingSoonChip } from "./ComingSoonChip";
import { bindField } from "../utils/bindField";
import React from "react";

interface OnlineInquiryForm {
  name: string;
  email: string;
  message: string;
}

export const OnlineInquiry = () => {
  const { control, handleSubmit } = useForm<OnlineInquiryForm>({});
  const submit = (data: OnlineInquiryForm) => {
    // todo write the logic
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        sx={{
          ".MuiCardHeader-title": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
        title={
          <>
            Hagyj nekünk üzenetet <ComingSoonChip />
          </>
        }
        subheader={"Kíváncsiak vagyunk a véleményedre"}
      />
      <CardContent>
        <Typography fontSize={"small"}>
          Ha bármi ötleted van, hogy mitől lenne jobb ez az oldal, vagy ha el
          akarod mondani a véleményedet, tapasztalataidat, kérlek írd meg
          nekünk.
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <TextField
            disabled
            {...bindField(control, "name")}
            label="Név"
            size="small"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            disabled
            {...bindField(control, "email")}
            label="Email"
            size="small"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            disabled
            {...bindField(control, "message")}
            label="üzenet"
            size="small"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </form>
      </CardContent>
      <CardActions>
        <Button type="submit" color="primary" disabled>
          Küldés
        </Button>
      </CardActions>
    </Card>
  );
};
