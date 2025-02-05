import { render, screen } from "@testing-library/react-native";
import PermissionTest from "../permission";

describe("Permission", () => {
  test("should match the snapshot", () => {
    const component = render(<PermissionTest />);
    expect(component.getAllByRole("button")).toHaveLength(1);
    expect(component.getByText("request permissions")).toBeOnTheScreen();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
