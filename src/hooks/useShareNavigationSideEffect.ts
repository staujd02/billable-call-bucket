import { NavigationContainerRef } from "@react-navigation/native";
import { useEffect } from "react";
import { ShareTextRoute } from "../../types/routes";
import useShare from "./useShare";

const useShareNavigationSideEffect = (ref: React.RefObject<NavigationContainerRef>) => {

  const sharedContent = useShare();

  useEffect(() => {
    if(ref && ref.current)
      ref.current.navigate('ShareConsumer', {
        sharedContent: {
          text: sharedContent?.text,
          extraData: sharedContent?.extraData,
        }
      } as ShareTextRoute);
  }, [sharedContent]);

}

export default useShareNavigationSideEffect;