import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import ArrowLeftIconSvg from "../../icons/ArrowLeftIconSvg";

const BackBtn = ({ onPress = () => {} }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeftIconSvg />
    </TouchableOpacity>
  );
};

export default BackBtn;
