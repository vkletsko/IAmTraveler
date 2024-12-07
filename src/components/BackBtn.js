import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";

import ArrowLeftIconSvg from "../../icons/ArrowLeftIconSvg";

const BackBtn = ({ onPress = () => {}, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeftIconSvg {...props} />
    </TouchableOpacity>
  );
};

export default BackBtn;
