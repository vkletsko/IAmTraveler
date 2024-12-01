import { TouchableOpacity } from "react-native";
import LogoutIcon from "../../icons/LogoutIconSvg";

const LogoutButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LogoutIcon />
    </TouchableOpacity>
  );
};

export default LogoutButton;
