import { Component, ExtraProps } from "hast-util-to-jsx-runtime/lib/components";
import React, {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FC,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";
import { IElement } from "../../types/types";
import { Paper, Typography } from "@mui/material";
import Popper from "@mui/material/Popper";
import { useGetTopic } from "../../pages/TopicsPage/hooks/useGetTopic";
import { useGetPhrase } from "../../pages/hooks/PhrasePage/useGetPhrase";
import Markdown from "react-markdown";

function analyzeLink(link: string): [boolean, string, string] {
  const match = link.match(
    /^https:\/\/studefine.hu\/(phrases|groups|topics)\/(\d+)/,
  );

  if (match) {
    const [, type, id] = match;
    return [true, type, id];
  }
  return [false, "", ""];
}

type IMDLink = Component<JSX.IntrinsicElements["a"] & ExtraProps>;

interface IStudefineLink
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  type: string;
  id: string;
  sign: string;
  text: string;
}

interface IElementPopper {
  id: IElement["id"];
  open: boolean;
  anchor: React.MutableRefObject<HTMLElement | undefined>;
}

const TopicPopper: FC<IElementPopper> = ({ id, open, anchor }) => {
  const { data } = useGetTopic(id);

  if (!data) return null;
  return (
    <Popper id={id} open={open} anchorEl={anchor.current}>
      <Paper sx={{ border: 1, p: 1, backgroundColor: "background.paper" }}>
        <Typography>The content of the Popper.</Typography>
      </Paper>
    </Popper>
  );
};
const PhrasePopper: FC<IElementPopper & { sign: string }> = ({
  id,
  open,
  anchor,
  sign,
}) => {
  const { data } = useGetPhrase(id);

  if (!data) return null;
  return (
    <Popper id={id} open={open} anchorEl={anchor.current}>
      <Paper sx={{ border: 1, p: 1, backgroundColor: "background.paper" }}>
        <Markdown className="markdown75">
          {sign === "?"
            ? data.vcpd.plainDefinitions.find(
                ({ id }) => id === data.vcpd.active,
              )?.definition
            : data.definition}
        </Markdown>
      </Paper>
    </Popper>
  );
};
const GroupPopper: FC<IElementPopper> = ({ id, open, anchor }) => {
  const { data } = useGetTopic(id);

  if (!data) return null;
  return (
    <Popper id={id} open={open} anchorEl={anchor.current}>
      <Paper sx={{ border: 1, p: 1, backgroundColor: "background.paper" }}>
        <Typography>The content of the Popper.</Typography>
      </Paper>
    </Popper>
  );
};

const StudefineLink: FC<IStudefineLink> = ({
  type,
  id,
  sign,
  text,
  href,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLElement>();
  const onMouseOver: MouseEventHandler<any> = (e) => {
    anchor.current = e.currentTarget;
    setOpen(true);
  };
  const onMouseLeave: MouseEventHandler<any> = () => {
    setOpen(false);
  };

  return (
    <>
      {type === "topics" && <TopicPopper id={id} open={open} anchor={anchor} />}
      {type === "phrases" && (
        <PhrasePopper id={id} open={open} anchor={anchor} sign={sign} />
      )}
      {type === "groups" && <GroupPopper id={id} open={open} anchor={anchor} />}
      <a
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        href={href}
        {...props}
      >
        {text}
      </a>
    </>
  );
};

export const MDLink: IMDLink = ({ href, children, ...props }) => {
  const [isStudefine, type, id, sign, text] = useMemo(() => {
    const [isStudefine, type, id] = analyzeLink(href!);
    if (!isStudefine || !children || typeof children !== "string")
      return [false, "", "", "", ""];
    return [isStudefine, type, id, children.charAt(0), children.slice(1)];
  }, [children, href]);

  return isStudefine ? (
    <StudefineLink type={type} id={id} sign={sign} text={text} />
  ) : (
    <a href={href} {...props}>
      {children}
    </a>
  );
};
