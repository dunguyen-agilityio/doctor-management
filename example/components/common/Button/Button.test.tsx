import { render, screen } from "@testing-library/react-native";
import Button from ".";

test("basic test", () => {
  const component = render(<Button />);
  //   expect(screen.getAllByRole("button")).toBeOnTheScreen();
  expect(component.toJSON()).toMatchSnapshot();
});
