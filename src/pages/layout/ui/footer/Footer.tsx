import { Tabs } from "@mantine/core";
import { ComponentPropsWithRef } from "react";
import { useNavigate, useParams } from "react-router";

type FooterProps = ComponentPropsWithRef<"footer">;
export const Footer = ({ ...rest }: FooterProps) => {
  const navigate = useNavigate();
  const { tabValue } = useParams();
  return (
    <footer {...rest}>
      <Tabs
        component={"nav"}
        value={tabValue}
        onChange={(value) => navigate(`/${value}`)}
      >
        <Tabs.List grow component={"ul"}>
          <Tabs.Tab color="yellow" component={"li"} value="training-session">
            Тренировки
          </Tabs.Tab>
          <Tabs.Tab color="pink" component={"li"} value="charts">
            Charts
          </Tabs.Tab>
          <Tabs.Tab color="green" component={"li"} value="templates">
            Workout Templates
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </footer>
  );
};
