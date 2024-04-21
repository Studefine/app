import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { IBreadCrumb } from "../types/types";
import { NavBreadCrumb } from "./NavBreadCrumb";

export const BreadCrumbSelect: React.FC<{ breadcrumbs: IBreadCrumb[] }> = ({
  breadcrumbs,
}) => {
  const [mainBreadcrumb, ...restBreadcrumbs] = breadcrumbs;

  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        sx={{ flexShrink: 0 }}
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <NavBreadCrumb {...mainBreadcrumb} disabled={!restBreadcrumbs.length} />
        {restBreadcrumbs.length && (
          <Button
            sx={{
              ":hover": {
                backgroundColor: ({ palette }) => palette.primary.light,
              },
              display: "flex",
              textAlign: "left",
              backgroundColor: "white",
              fontWeight: "bold",
              color: "black",
              padding: (theme) => `0 ${theme.spacing(2)}`,
              borderRadius: 3,
            }}
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        )}
      </ButtonGroup>
      <Popper
        placement={"bottom-start"}
        open={open}
        anchorEl={anchorRef.current}
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                marginLeft: -1,
                backgroundColor: "#00000088",
                backgroundImage: "unset",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  sx={{
                    padding: 1,
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    gap: 1,
                  }}
                  autoFocusItem
                >
                  {restBreadcrumbs.map((breadcrumb, index) => (
                    <NavBreadCrumb key={index} {...breadcrumb} />
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};
